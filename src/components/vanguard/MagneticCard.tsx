"use client";

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

export function MagneticCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    function handleMouseMove(event: React.MouseEvent) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((event.clientX - centerX) * 0.2);
        y.set((event.clientY - centerY) * 0.2);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={`relative group ${className}`}
        >
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 rounded-full" />
            <div className="relative border border-white/10 bg-white/5 backdrop-blur-md p-8 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:bg-white/[0.07]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                {children}
            </div>
        </motion.div>
    );
}
