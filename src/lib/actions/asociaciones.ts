"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Nucleus } from "@/types/asociaciones";

export async function getNuclei() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("nuclei")
        .select("*")
        .eq("is_active", true)
        .order("member_count", { ascending: false });

    if (error) {
        console.error("Error fetching nuclei:", error);
        return [];
    }
    return data as Nucleus[];
}

export async function createNucleus(data: {
    name: string,
    description: string,
    city: string,
    lat: number,
    lng: number
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Unauthorized");

    const { data: nucleus, error } = await supabase
        .from("nuclei")
        .insert({
            ...data,
            created_by: user.id
        })
        .select()
        .single();

    if (error) throw error;

    // Automatically join as admin/moderator
    await supabase.from("nucleus_members").insert({
        nucleus_id: nucleus.id,
        user_id: user.id,
        role: "admin"
    });

    revalidatePath("/asociaciones");
    return { success: true, nucleus };
}

export async function joinNucleus(nucleusId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Unauthorized");

    const { error } = await supabase
        .from("nucleus_members")
        .insert({
            nucleus_id: nucleusId,
            user_id: user.id,
            role: "member"
        });

    if (error) throw error;

    revalidatePath("/asociaciones");
    return { success: true };
}

export async function leaveNucleus(nucleusId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Unauthorized");

    const { error } = await supabase
        .from("nucleus_members")
        .delete()
        .eq("nucleus_id", nucleusId)
        .eq("user_id", user.id);

    if (error) throw error;

    revalidatePath("/asociaciones");
    return { success: true };
}

export async function getUserNuclei() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from("nucleus_members")
        .select("nucleus_id")
        .eq("user_id", user.id);

    if (error) return [];
    return data.map(m => m.nucleus_id);
}
