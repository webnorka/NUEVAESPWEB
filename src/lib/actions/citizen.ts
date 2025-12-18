"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function registerInCensus() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { error } = await supabase
        .from("profiles")
        .update({ census_registered_at: new Date().toISOString() })
        .eq("id", user.id);

    if (error) throw error;

    revalidatePath("/dashboard");
    return { success: true };
}

export async function unregisterFromCensus() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { error } = await supabase
        .from("profiles")
        .update({ census_registered_at: null })
        .eq("id", user.id);

    if (error) throw error;

    revalidatePath("/dashboard");
    return { success: true };
}

export async function updateDistrict(data: { region: string, locality: string, zipCode: string, districtId?: string }) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { error } = await supabase
        .from("profiles")
        .update({
            region: data.region,
            locality: data.locality,
            zip_code: data.zipCode,
            district_id: data.districtId || null
        })
        .eq("id", user.id);

    if (error) throw error;

    revalidatePath("/dashboard");
    return { success: true };
}

export async function getMovementStats() {
    const supabase = await createClient();

    // Total profiles
    const { count: total, error: totalError } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

    // Active (registered in census)
    const { count: active, error: activeError } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .not("census_registered_at", "is", null);

    if (totalError || activeError) {
        console.error("Error fetching stats:", totalError || activeError);
        return { total: 0, active: 0 };
    }

    return {
        total: total || 0,
        active: active || 0
    };
}
