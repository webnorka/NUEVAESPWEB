"use client";

import type { MotionProps } from "framer-motion";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import React, { useRef } from "react";

interface TiltedCardProps extends MotionProps {
    children?: React.ReactNode;
    containerClassName?: string;
    itemClassName?: string;
    className?: string; // Add className prop
    captionText?: string;
    showCaption?: boolean;
}

export const TiltedCard = ({
    children,
    containerClassName = "",
    itemClassName = "",
    className = "",
    captionText = "",
    showCaption = false,
    ...props
}: TiltedCardProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useMotionTemplate`${mouseYSpring}deg`;
    const rotateY = useMotionTemplate`${mouseXSpring}deg`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct * 20);
        y.set(yPct * -20);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
            }}
            className={`relative w-full h-full cursor-col-resize ${containerClassName} ${className}`} // Include className
            {...props}
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
                className={`absolute inset-0 rounded-xl ${itemClassName}`}
            >
                {children}
            </div>

            {showCaption && (
                <figcaption className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] uppercase text-[#2d2d2d] opacity-100 z-50 sm:block">
                    {captionText}
                </figcaption>
            )}
        </motion.div>
    );
};

export default TiltedCard;
