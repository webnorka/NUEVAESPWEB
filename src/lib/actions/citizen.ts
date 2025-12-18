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

export async function updateDistrict(districtId: string, zipCode?: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { error } = await supabase
        .from("profiles")
        .update({
            district_id: districtId,
            zip_code: zipCode || null
        })
        .eq("id", user.id);

    if (error) throw error;

    revalidatePath("/dashboard");
    return { success: true };
}
