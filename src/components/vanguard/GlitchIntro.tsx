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
            <div className="relative">
                <motion.div
                    animate={{
                        skewX: [0, -20, 20, 0],
                        scale: [1, 1.1, 0.9, 1],
                        opacity: [1, 0.8, 1]
                    }}
                    transition={{ duration: 0.2, repeat: 10 }}
                    className="text-white font-black text-4xl md:text-6xl uppercase tracking-[0.5em] italic"
                >
                    NE_NARRATIVA
                </motion.div>

                <motion.div
                    animate={{ x: [-10, 10, -10] }}
                    transition={{ duration: 0.1, repeat: 20 }}
                    className="absolute top-0 left-0 text-primary mix-blend-screen font-black text-4xl md:text-6xl uppercase tracking-[0.5em] italic opacity-50"
                >
                    NE_NARRATIVA
                </motion.div>
            </div>

            {/* Matrix-like noise overlays */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        </motion.div>
    );
}
