"use client";

import { Shield, ArrowRight, Star, Trophy, Crown } from "lucide-react";
import { siteConfig } from "@config";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { createCheckoutSession } from "@/lib/actions/checkout";

const tierIcons = {
    bronze: Star,
    silver: Trophy,
    gold: Crown
} as any;

function TierCard({ tier, idx }: { tier: any, idx: number }) {
    const Icon = tierIcons[tier.id] || Shield;

    // Mouse tracking for "glow" effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(220,38,38,0.15), transparent 80%)`;

    const onMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            onMouseMove={onMouseMove}
            className="group relative flex flex-col items-center p-12 bg-zinc-900/40 border border-white/5 transition-all rounded-sm backdrop-blur-xl overflow-hidden cursor-pointer"
            onClick={() => createCheckoutSession(tier.id)}
        >
            {/* Spotlight / Luminous Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                style={{
                    background: background,
                }}
            />

            {/* Glowing Border effect */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

            <div className="relative z-20 flex flex-col items-center text-center">
                <div className="relative mb-8">
                    {/* Badge Glow */}
                    <div className={`absolute inset-0 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full ${tier.id === 'gold' ? 'bg-yellow-500' : tier.id === 'silver' ? 'bg-zinc-400' : 'bg-red-600'}`} />
                    <Icon className={`w-16 h-16 ${tier.color} relative z-10 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6`} />
                </div>

                <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em] mb-4 group-hover:text-white transition-colors duration-300">{tier.name}</h3>

                <div className="text-7xl font-black text-white italic tracking-tighter mb-8 leading-none">
                    {tier.price}€
                </div>

                <div className="flex flex-col items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">+ INSIGNIA PERFIL</span>
                    <ArrowRight className="w-4 h-4 text-red-600 translate-y-0 group-hover:translate-y-1 transition-transform" />
                </div>
            </div>

            {/* Premium Button UI */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-zinc-800 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700 bg-red-600" />
        </motion.div>
    );
}

export function DonationCTA() {
    return (
        <section id="apoyo" className="py-32 bg-background relative overflow-hidden border-y border-white/5">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.03)_0%,transparent_70%)]" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-7xl md:text-9xl font-black text-white italic tracking-tighter leading-none"
                    >
                        SIN <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">SUBVENCIONES.</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {siteConfig.donations.tiers.map((tier: any, idx: number) => (
                        <TierCard key={tier.id} tier={tier} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
