"use client";

import { motion } from 'framer-motion';

export function GlitchIntro({ onComplete }: { onComplete: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            onAnimationComplete={onComplete}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
        >
            <div className="relative flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                        scale: [0.8, 1.1, 1],
                        opacity: 1
                    }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-32 h-32 md:w-48 md:h-48 bg-primary flex items-center justify-center relative overflow-hidden shadow-[0_0_60px_rgba(190,18,60,0.4)]"
                >
                    <motion.div
                        animate={{ opacity: [0, 1, 0.8, 1] }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="text-white font-black text-6xl md:text-8xl tracking-tighter italic"
                    >
                        NE
                    </motion.div>

                    {/* Scanning diagonal line */}
                    <motion.div
                        animate={{
                            y: ['-100%', '200%'],
                            opacity: [0, 0.5, 0]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent skew-y-12 h-20"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="mt-8 text-white font-mono text-[10px] uppercase tracking-[0.5em] opacity-40 text-center"
                >
                    Iniciando Sistema de Verdad
                </motion.div>
            </div>

            {/* Matrix-like noise overlays */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        </motion.div>
    );
}
