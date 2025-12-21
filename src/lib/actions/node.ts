"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

async function logActivity(supabase: any, action: string, entityId: string | null = null, details: any = {}) {
    const headerList = await headers();
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

export async function createNucleus(data: { name: string, city: string, region: string, lat: number, lng: number, description?: string }) {
    const supabase = await createClient();

    // Verify admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== 'admin') throw new Error("Admin privileges required");

    const { data: nucleus, error } = await supabase
        .from("nuclei")
        .insert({
            ...data,
            created_by: user.id
        })
        .select()
        .single();

    if (error) throw error;

    await logActivity(supabase, "NUCLEUS_CREATE", nucleus.id, { name: data.name, city: data.city });

    revalidatePath("/admin/nuclei");
    return { success: true, data: nucleus };
}

export async function updateNucleus(id: string, data: Partial<{ name: string, city: string, region: string, lat: number, lng: number, description?: string, is_active: boolean }>) {
    const supabase = await createClient();

    // Verify admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== 'admin') throw new Error("Admin privileges required");

    const { error } = await supabase
        .from("nuclei")
        .update(data)
        .eq("id", id);

    if (error) throw error;

    await logActivity(supabase, "NUCLEUS_UPDATE", id, data);

    revalidatePath("/admin/nuclei");
    return { success: true };
}

export async function deleteNucleus(id: string) {
    const supabase = await createClient();

    // Verify admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== 'admin') throw new Error("Admin privileges required");

    const { error } = await supabase
        .from("nuclei")
        .delete()
        .eq("id", id);

    if (error) throw error;

    await logActivity(supabase, "NUCLEUS_DELETE", id);

    revalidatePath("/admin/nuclei");
    return { success: true };
}
