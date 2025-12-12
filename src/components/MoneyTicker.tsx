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
    const frameRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);

    useEffect(() => {
        // Mock start time as "beginning of year" or standard base
        // For visual effect, we just increment from the moment the component mounts/is viewed
        // but to make it look "live", we just add small increments.

        const update = (time: number) => {
            if (!lastTimeRef.current) lastTimeRef.current = time;
            const delta = (time - lastTimeRef.current) / 1000; // seconds
            lastTimeRef.current = time;

            setCurrentAmount(prev => prev + (perSecond * delta));
            frameRef.current = requestAnimationFrame(update);
        };

        frameRef.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frameRef.current);
    }, [perSecond]);

    // Format currency
    const format = (val: number) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
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
