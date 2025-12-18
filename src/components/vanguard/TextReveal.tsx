"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function TextReveal({ text, subtext }: { text: string; subtext?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="flex flex-col items-center justify-center py-2 md:py-4 px-4 text-center">
            <motion.h1
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(1.8rem,7vw,5rem)] font-black text-white uppercase tracking-tighter leading-[0.85] italic mb-2"
            >
                {text.split(' ').map((word, i) => (
                    <motion.span
                        key={i}
                        className="inline-block mr-4 last:mr-0"
                        initial={{ rotateX: 90 }}
                        animate={{ rotateX: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                    >
                        {word}
                    </motion.span>
                ))}
            </motion.h1>
            {subtext && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="text-primary font-mono text-xs md:text-sm font-bold tracking-[0.4em] uppercase"
                >
                    {subtext}
                </motion.p>
            )}
        </div>
    );
}
