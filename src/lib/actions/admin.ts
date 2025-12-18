"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateUserRole(userId: string, newRole: string) {
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

    const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", userId);

    if (error) throw error;

    revalidatePath("/admin/dashboard");
    return { success: true };
}

export async function banUser(userId: string) {
    // In a real scenario, you might have a 'banned' column or update the role.
    // Here we'll just update a hypothetical 'role' to 'banned'.
    return await updateUserRole(userId, 'banned');
}
