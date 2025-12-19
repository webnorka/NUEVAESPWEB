"use client";

import { motion } from 'framer-motion';

export function FloatingHUD() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
            {/* Corner Bracket TL */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-white/10"
            />
            {/* Corner Bracket BR */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-white/10"
            />

            {/* Floating Data Nodes */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -40, 0],
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                        duration: 5 + i,
                        repeat: Infinity,
                        delay: i * 2,
                        ease: "linear"
                    }}
                    className="absolute font-mono text-[8px] text-primary/40 tracking-widest uppercase"
                    style={{
                        top: `${20 + i * 25}%`,
                        left: `${10 + i * 30}%`
                    }}
                >
                    [ REGISTRO: {(Math.random() * 1000).toFixed(0)} ]
                    <br />
                    ESTADO: ACTIVO
                </motion.div>
            ))}

            {/* Central Scope (Subtle) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/[0.03] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1px] w-32 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
    );
}
