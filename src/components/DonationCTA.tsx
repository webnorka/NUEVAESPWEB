"use client";

import Link from "next/link";
import { Heart, Shield, Coins, ArrowRight } from "lucide-react";
import { siteConfig } from "@config";

export function DonationCTA() {
    return (
        <section id="apoyo" className="py-24 bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <div className="flex items-center justify-center gap-3 text-red-600 mb-6 font-mono text-sm uppercase tracking-[0.3em]">
                        <Heart className="w-5 h-5 fill-red-600/20" />
                        Apoyo Ciudadano
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none mb-6">
                        SIN SUBVENCIONES. <span className="text-red-600">SIN COMPROMISOS.</span>
                    </h2>
                    <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                        Este proyecto se financia exclusivamente mediante las aportaciones de ciudadanos libres. Tu apoyo garantiza nuestra independencia.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {siteConfig.donations.tiers.slice(0, 3).map((tier: any) => (
                        <div key={tier.id} className="bg-zinc-900/50 border border-white/5 p-6 rounded-sm hover:border-red-600/30 transition-all group">
                            <div className="flex items-center gap-2 mb-4">
                                <Shield className={`w-4 h-4 ${tier.color}`} />
                                <h4 className="font-bold text-white uppercase tracking-widest text-xs">{tier.name}</h4>
                            </div>
                            <div className="text-3xl font-black text-white mb-2 italic">{tier.price}€<span className="text-[10px] text-zinc-600 font-mono not-italic uppercase ml-1">/ mes</span></div>
                            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mb-6 leading-relaxed">
                                {tier.description}
                            </p>
                            <Link
                                href="/dashboard"
                                className="w-full py-3 bg-white/5 border border-white/10 text-white font-mono text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-red-600 group-hover:border-red-600 transition-all"
                            >
                                Seleccionar <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 border border-yellow-500/20">
                            <Coins className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold uppercase tracking-tight">Donaciones vía Cripto</h4>
                            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mt-1">
                                Para quienes prefieren la privacidad técnica absoluta.
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/dashboard"
                        className="px-8 py-4 bg-white text-black font-black uppercase text-xs tracking-[0.2em] transform hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] italic"
                    >
                        Ver Wallet
                    </Link>
                </div>
            </div>
        </section>
    );
}
