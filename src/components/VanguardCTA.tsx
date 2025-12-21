"use client";

import Link from "next/link";
import { Target, Map } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@config";

export function VanguardCTA() {
    return (
        <section id="vanguard" className="py-16 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-r from-surface to-background border border-white/10 p-12 relative overflow-hidden group rounded-sm">
                        <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-all duration-700" />

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
                            <div className="flex-1">
                                <h3 className="text-3xl font-black text-foreground mb-4 uppercase italic tracking-tighter">¿Estás listo para la Vanguardia?</h3>
                                <p className="text-muted max-w-xl font-medium text-lg leading-relaxed">
                                    Recibe instrucciones directas, material confidencial y alertas de acción rápida. Sin spam, solo resistencia patriótica.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                                <Link
                                    href={siteConfig.links.signup}
                                    className="px-8 py-4 bg-primary text-primary-foreground font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-3 rounded-sm shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)]"
                                >
                                    <Target className="w-5 h-5" />
                                    <span>Unirse Ahora</span>
                                </Link>

                                <Link
                                    href="/roadmap"
                                    className="px-8 py-4 border border-white/10 bg-white/5 text-foreground font-black uppercase tracking-widest hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-3 rounded-sm"
                                >
                                    <Map className="w-5 h-5" />
                                    <span>Ver Roadmap</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
