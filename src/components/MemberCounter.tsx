"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, UserPlus } from "lucide-react";
import { siteConfig } from "@config";

export function MemberCounter() {
    // Starting mock count from config or default
    const [count, setCount] = useState(siteConfig.memberCounter.startCount);
    const [lastIncrement, setLastIncrement] = useState<{ id: number; platform: string } | null>(null);

    // Simulated live updates
    useEffect(() => {
        const platforms = ["Telegram", "Twitter", "Discord", "Web"];

        const interval = setInterval(() => {
            // Configurable chance
            if (Math.random() <= siteConfig.memberCounter.incrementChance) {
                // Random increment between 1 and max
                const inc = Math.floor(Math.random() * siteConfig.memberCounter.maxIncrement) + 1;
                setCount(prev => prev + inc);

                // Trigger visual "toast" for new member
                const platform = platforms[Math.floor(Math.random() * platforms.length)];
                setLastIncrement({ id: Date.now(), platform });

                // Clear toast after 2s
                setTimeout(() => setLastIncrement(null), 2000);
            }
        }, siteConfig.memberCounter.updateInterval);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative inline-flex flex-col items-center">

            {/* Pop-up Notification for new User */}
            <AnimatePresence>
                {lastIncrement && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: -40, scale: 1 }}
                        exit={{ opacity: 0, y: -60 }}
                        className="absolute top-0 pointer-events-none"
                    >
                        <div className="flex items-center gap-2 bg-emerald-500/90 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                            <UserPlus size={14} />
                            <span>+1 desde {lastIncrement.platform}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:bg-white/15 transition-colors cursor-default group">
                <div className="bg-primary/20 p-2 rounded-full group-hover:bg-primary/40 transition-colors">
                    <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col items-start leading-none">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tabular-nums">
                        {count.toLocaleString("es-ES")}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                        Miembros Activos
                    </span>
                </div>
            </div>
        </div>
    );
}
