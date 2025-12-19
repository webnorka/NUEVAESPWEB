"use client";

import { motion } from 'framer-motion';
import { Terminal, Activity, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataBreachBarsProps {
    data: {
        name: string;
        amount: number;
        color: string;
        impact?: string;
    }[];
}

export function DataBreachBars({ data }: DataBreachBarsProps) {
    const maxAmount = Math.max(...data.map(d => d.amount));

    return (
        <div className="space-y-8 py-4">
            {data.map((item, index) => (
                <motion.div
                    key={item.name}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: index * 0.2,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="group relative"
                >
                    {/* Label & Stats */}
                    <div className="flex justify-between items-end mb-2 px-1">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-[10px] text-zinc-500 font-bold">
                                    0{index + 1} // DATOS ESPAÑA
                                </span>
                                <h4 className="font-black text-white uppercase tracking-tighter text-sm md:text-base">
                                    {item.name}
                                </h4>
                            </div>
                            {item.impact && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 + 1 }}
                                    className="text-[10px] text-zinc-500 font-mono mt-1 italic hidden md:block"
                                >
                                    {">"} {item.impact}
                                </motion.span>
                            )}
                        </div>
                        <div className="text-right">
                            <span className="font-mono text-[10px] text-zinc-500 uppercase block leading-none mb-1">Impacto Estimado</span>
                            <span className={cn("font-black text-xl md:text-2xl italic leading-none")}>
                                {item.amount.toLocaleString()} <span className="text-[10px] font-mono not-italic opacity-50 ml-1 text-zinc-400">M€</span>
                            </span>
                        </div>
                    </div>

                    {/* Bar Container */}
                    <div className="relative h-12 w-full bg-zinc-900/30 border border-white/5 overflow-hidden group-hover:border-white/10 transition-colors">
                        {/* Background Tech Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_100%] opacity-50" />

                        {/* The Main Progress Bar */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.amount / maxAmount) * 100}%` }}
                            transition={{
                                duration: 1.5,
                                delay: index * 0.2 + 0.5,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            style={{ backgroundColor: item.color }}
                            className="absolute inset-y-0 left-0 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-end px-4 overflow-hidden"
                        >
                            {/* Animated Pulse for Critical Items */}
                            {item.amount > 50000 && (
                                <motion.div
                                    animate={{ opacity: [0, 0.5, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="absolute inset-0 bg-white"
                                />
                            )}

                            {/* Animated Stripes within the bar */}
                            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.5)_10px,rgba(0,0,0,0.5)_20px)]" />

                            {/* Scrolling Tech Text */}
                            <motion.span
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="relative z-10 font-mono text-[8px] text-black font-black uppercase tracking-widest hidden md:block"
                            >
                                ACCESO A LA VERDAD // RECUPERANDO SOBERANÍA
                            </motion.span>
                        </motion.div>

                        {/* Scanning Line */}
                        <motion.div
                            animate={{ x: ['0%', '1000%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-y-0 left-0 w-1 bg-white/20 blur-sm pointer-events-none"
                        />
                    </div>

                    {/* HUD Brackets decoration */}
                    <div className="absolute -left-2 -top-2 w-2 h-2 border-l border-t border-white/10" />
                    <div className="absolute -right-2 -bottom-2 w-2 h-2 border-r border-b border-white/10" />
                </motion.div>
            ))}

            {/* Footer Diagnostic */}
            <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap gap-6 items-center justify-center md:justify-start">
                <div className="flex items-center gap-2 opacity-40 grayscale hover:grayscale-0 transition-all cursor-crosshair">
                    <Terminal className="w-3 h-3 text-primary" />
                    <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest">Origen: Archivos de la Corrupción</span>
                </div>
                <div className="flex items-center gap-2 opacity-40 grayscale hover:grayscale-0 transition-all cursor-crosshair">
                    <Activity className="w-3 h-3 text-emerald-500" />
                    <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest">Estado: Información Actualizada</span>
                </div>
                <div className="flex items-center gap-2 opacity-40 grayscale hover:grayscale-0 transition-all cursor-crosshair">
                    <AlertCircle className="w-3 h-3 text-amber-500" />
                    <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest">Veracidad Contrastada: 100%</span>
                </div>
            </div>
        </div>
    );
}
