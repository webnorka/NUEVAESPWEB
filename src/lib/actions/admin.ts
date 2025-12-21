"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

async function logActivity(supabase: any, action: string, entityId: string | null = null, details: any = {}) {
    const headerList = await headers();
    // Normalize IP: get the first valid IP from x-forwarded-for if present
    const forwarded = headerList.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(',')[0].trim() : (headerList.get("x-real-ip") || "unknown");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("activity_logs").insert({
        user_id: user.id,
        action,
        entity_id: entityId,
        details,
        ip_address: ip
    });
}

export async function updateUserRole(userId: string, newRole: string) {
    const ALLOWED_ROLES = ['citizen', 'admin', 'moderator', 'banned'];

    if (!ALLOWED_ROLES.includes(newRole)) {
        throw new Error("Invalid role specified");
    }

    const supabase = await createClient();

    // Verify current user is admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { data: adminProfile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (adminProfile?.role !== 'admin') throw new Error("Admin privileges required");

    // Get old role for logging
    const { data: targetProfile } = await supabase
        .from("profiles")
        .select("role, username")
        .eq("id", userId)
        .single();

    const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", userId);

    if (error) throw error;

    await logActivity(supabase, "ROLE_CHANGE", userId, {
        old_role: targetProfile?.role,
        new_role: newRole,
        target_username: targetProfile?.username
    });

    revalidatePath("/admin/dashboard");
    return { success: true };
}

export async function banUser(userId: string) {
    const supabase = await createClient();

    // Verify current user is admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { data: adminProfile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (adminProfile?.role !== 'admin') throw new Error("Admin privileges required");

    const { data: targetProfile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", userId)
        .single();

    const { error } = await supabase
        .from("profiles")
        .update({ role: 'banned' })
        .eq("id", userId);

    if (error) throw error;

    await logActivity(supabase, "USER_BAN", userId, {
        target_username: targetProfile?.username
    });

    revalidatePath("/admin/dashboard");
    return { success: true };
}
