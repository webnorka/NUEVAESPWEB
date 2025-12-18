"use client";

import { motion } from 'framer-motion';

export function VisualSiren() {
    return (
        <div className="fixed inset-0 -z-20 overflow-hidden bg-black pointer-events-none">
            {/* Chaotic Grid */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-x-[-10%] inset-y-[-10%] bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"
            />

            {/* Pulsing Core */}
            <motion.div
                animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scale: [0.8, 1.2, 0.8]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-primary/20 blur-[150px] rounded-full"
            />

            {/* Vertical Scanner Loops */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        opacity: [0, 1, 0],
                        y: [-200, 1000]
                    }}
                    transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "linear"
                    }}
                    className="absolute left-0 right-0 h-px bg-primary/50"
                    style={{ top: `${i * 20}%` }}
                />
            ))}

            {/* Digital Rain / Noise Sim */}
            <div className="absolute inset-0 mix-blend-overlay opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
}
