import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event;

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
        return new NextResponse("Webhook Secret not configured", { status: 500 });
    }

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err: any) {
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as any;
        let userId = session.metadata.userId;
        const tierId = session.metadata.tierId;
        const customerEmail = session.customer_details?.email;
        const stripeCustomerId = session.customer;

        // If no userId in metadata, try to find user by email using the service role client
        if (!userId && customerEmail) {
            const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
            if (!listError) {
                const user = users.find(u => u.email === customerEmail);
                if (user) {
                    userId = user.id;
                }
            }
        }

        if (userId && tierId) {
            const { error } = await supabase
                .from("profiles")
                .update({
                    support_tier: tierId,
                    stripe_customer_id: stripeCustomerId
                })
                .eq("id", userId);

            if (error) {
                console.error("Error updating profile tier:", error);
                return new NextResponse("Error updating profile", { status: 500 });
            }
        }
    }

    if (event.type === "customer.subscription.deleted") {
        const subscription = event.data.object as any;
        // Find user by customer ID and reset tier
        const { data: profile } = await supabase
            .from("profiles")
            .select("id")
            .eq("stripe_customer_id", subscription.customer)
            .single();

        if (profile) {
            await supabase
                .from("profiles")
                .update({ support_tier: "none" })
                .eq("id", profile.id);
        }
    }

    return new NextResponse(null, { status: 200 });
}
