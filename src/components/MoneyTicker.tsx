"use client";

import { useEffect, useState, useRef } from "react";

interface MoneyTickerProps {
    initialAmount: number; // Base amount (e.g., start of year)
    perSecond: number;     // Amount added per second
    label: string;
    subLabel?: string;
    colorClass?: string;
}

export function MoneyTicker({ initialAmount, perSecond, label, subLabel, colorClass = "text-white" }: MoneyTickerProps) {
    const [currentAmount, setCurrentAmount] = useState(initialAmount);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const frameRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);

    // Intersection Observer to pause when not visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Synchronize with parent's calculated initialAmount when it's first set
    useEffect(() => {
        setCurrentAmount(initialAmount);
    }, [initialAmount]);

    useEffect(() => {
        if (!isVisible) {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
            lastTimeRef.current = 0; // Reset last time when coming back to view
            return;
        }

        const update = (time: number) => {
            if (!lastTimeRef.current) lastTimeRef.current = time;
            const delta = (time - lastTimeRef.current) / 1000; // seconds
            lastTimeRef.current = time;

            setCurrentAmount(prev => prev + (perSecond * delta));
            frameRef.current = requestAnimationFrame(update);
        };

        frameRef.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frameRef.current);
    }, [perSecond, isVisible]);

    // Format currency
    const format = (val: number) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div ref={containerRef} className="flex flex-col items-center justify-center p-4">
            <span className={`text-3xl md:text-4xl font-mono font-bold ${colorClass} tabular-nums`}>
                {format(currentAmount)}
            </span>
            <span className="text-sm font-bold text-white mt-1">{label}</span>
            {subLabel && <span className="text-xs text-gray-400 mt-1">{subLabel}</span>}
            <div className="text-xs text-gray-500 mt-2 font-mono">
                +{perSecond.toFixed(2)}€ / seg
            </div>
        </div>
    );
}
