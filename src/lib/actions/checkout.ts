"use server";

import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { siteConfig, DonationTier } from "@config";

export async function createCheckoutSession(tierId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Debes iniciar sesión para apoyar el proyecto");
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("stripe_customer_id")
        .eq("id", user.id)
        .single();

    const tier = (siteConfig.donations.tiers as DonationTier[]).find(t => t.id === tierId);
    if (!tier) {
        throw new Error("Nivel de apoyo no válido");
    }

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
        const customer = await stripe.customers.create({
            email: user.email,
            metadata: {
                supabase_user_id: user.id
            }
        });
        customerId = customer.id;

        await supabase
            .from("profiles")
            .update({ stripe_customer_id: customerId })
            .eq("id", user.id);
    }

    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        line_items: [
            {
                price: tier.stripePriceId,
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?status=success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?status=cancel`,
        metadata: {
            tierId: tierId,
            userId: user.id
        }
    });

    if (!session.url) {
        throw new Error("No se pudo crear la sesión de pago");
    }

    return redirect(session.url);
}
