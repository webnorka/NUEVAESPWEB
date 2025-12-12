"use client";


import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { ManifestoModal } from "@/components/ManifestoModal";
import { MemberCounter } from "@/components/MemberCounter";
import { siteConfig } from "@config";

interface HeroProps {
    manifestoContent: string;
}

export function Hero({ manifestoContent }: HeroProps) {
    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-background">
            {/* Background Gradient/Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background z-0" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 z-0" />

            <div className="container relative z-10 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mb-8">
                        <MemberCounter />
                    </div>

                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20">
                        {siteConfig.hero.badge}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400">
                        {siteConfig.hero.title} <br /> {siteConfig.hero.subtitle}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        {siteConfig.hero.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <ManifestoModal
                            content={manifestoContent}
                            trigger={
                                <button className="px-8 py-4 bg-primary text-white rounded-lg font-bold hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(190,18,60,0.3)] hover:shadow-[0_0_30px_rgba(190,18,60,0.5)] cursor-pointer">
                                    {siteConfig.hero.ctaPrimary}
                                </button>
                            }
                        />
                        <Link
                            href="#movements"
                            className="px-8 py-4 bg-secondary text-white rounded-lg font-bold border border-white/10 hover:bg-secondary/80 transition-all"
                        >
                            {siteConfig.hero.ctaSecondary}
                        </Link>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 animate-bounce"
            >
                <ArrowDown size={32} />
            </motion.div>
        </section>
    );
}
