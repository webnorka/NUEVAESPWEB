"use client";

import { motion } from "framer-motion";
import { ArrowDown, Fingerprint, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ManifestoModal } from "@/components/ManifestoModal";
import { siteConfig } from "@config";

interface HeroProps {
    manifestoContent: string;
}

export function Hero({ manifestoContent }: HeroProps) {
    return (
        <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-black selection:bg-red-600 selection:text-white">
            {/* 1. Cinematic Background Layers */}
            <div className="absolute inset-0 z-0">
                {/* Static Noise Overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-noise mix-blend-overlay"></div>

                {/* Radial Gradient Focus */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/10 via-black to-black"></div>

                {/* Grid Lines - subtle, technical feel */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:160px_160px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className="container relative z-20 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    {/* Badge / Identity */}
                    <div className="flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                        </span>
                        <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">
                            Movimiento Civil de Resistencia
                        </span>
                    </div>

                    {/* Main Title Block - Brutalist Typography */}
                    <h1 className="flex flex-col items-center justify-center md:gap-2 mb-8">
                        <span className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tracking-tighter leading-[0.9]">
                            {siteConfig.hero.title}
                        </span>
                        <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-red-600 tracking-tighter">
                            {siteConfig.hero.subtitle}
                        </span>
                    </h1>

                    {/* Subtitle / Hook */}
                    <div className="max-w-3xl mx-auto mb-12 relative">
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-transparent opacity-50 hidden md:block" />
                        <p className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed pl-0 md:pl-6 text-balance">
                            {siteConfig.hero.description}
                        </p>
                    </div>

                    {/* Action Area */}
                    <div className="flex flex-col sm:flex-row gap-6 items-center w-full justify-center">
                        <ManifestoModal
                            content={manifestoContent}
                            trigger={
                                <button className="group relative px-8 py-4 bg-white text-black text-lg font-bold tracking-tight overflow-hidden rounded-sm hover:scale-[1.02] transition-transform duration-200">
                                    <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                    <span className="relative flex items-center gap-2">
                                        <Fingerprint className="w-5 h-5" />
                                        {siteConfig.hero.ctaPrimary}
                                    </span>
                                </button>
                            }
                        />
                        <Link
                            href={siteConfig.links.narrativa}
                            className="group relative px-8 py-4 border border-red-600 text-red-600 text-lg font-bold tracking-tight overflow-hidden rounded-sm hover:scale-[1.02] transition-transform duration-200"
                        >
                            <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            <span className="relative flex items-center gap-2 group-hover:text-white transition-colors">
                                <ArrowRight className="w-5 h-5" />
                                Nueva Narrativa
                            </span>
                        </Link>
                        <Link
                            href={siteConfig.links.movements}
                            className="px-8 py-4 text-gray-300 hover:text-white font-medium border-b border-transparent hover:border-red-500 transition-colors flex items-center gap-2 group"
                        >
                            {siteConfig.hero.ctaSecondary}
                            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-600">Descubre la verdad</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-red-600 to-transparent"></div>
            </motion.div>
        </section>
    );
}
