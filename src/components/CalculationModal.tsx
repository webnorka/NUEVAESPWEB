"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Info, Clock, Calculator, TrendingUp } from "lucide-react";

interface CalculationModalProps {
    isOpen: boolean;
    onClose: () => void;
    metric: {
        label: string;
        rate: number;
        subLabel: string;
        key: string;
    } | null;
}

export function CalculationModal({ isOpen, onClose, metric }: CalculationModalProps) {
    if (!isOpen || !metric) return null;

    const annualTotal = metric.rate * 31536000;

    // Time calculation
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const secondsElapsed = (now.getTime() - startOfYear.getTime()) / 1000;
    const currentAccumulated = metric.rate * secondsElapsed;

    const daysElapsed = Math.floor(secondsElapsed / 86400);
    const progressPercent = (secondsElapsed / 31536000) * 100;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/90 backdrop-blur-md"
                />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,1)] overflow-hidden rounded-sm"
                >
                    {/* Header: Technical/Military Style */}
                    <div className="bg-zinc-900 border-b border-white/10 p-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-6 bg-primary" />
                            <div>
                                <h3 className="font-black text-white uppercase tracking-tighter text-lg leading-tight">
                                    Desglose de Cálculo
                                </h3>
                                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                                    Métrica: {metric.label}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/5 rounded-full transition-colors group"
                        >
                            <X className="w-5 h-5 text-zinc-500 group-hover:text-white" />
                        </button>
                    </div>

                    <div className="p-8 space-y-8 max-h-[80vh] overflow-y-auto">
                        {/* Summary Card */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 border border-white/5">
                                <p className="text-[10px] text-zinc-500 font-mono uppercase mb-1">Coste Anual Estimado</p>
                                <p className="text-xl font-black text-white">
                                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(annualTotal)}
                                </p>
                            </div>
                            <div className="bg-primary/5 p-4 border border-primary/20">
                                <p className="text-[10px] text-primary/70 font-mono uppercase mb-1">Incremento por Segundo</p>
                                <p className="text-xl font-black text-primary">
                                    {metric.rate.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €/s
                                </p>
                            </div>
                        </div>

                        {/* Visual Logic Flow */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                <Calculator className="w-4 h-4 text-primary" />
                                Metodología de Tiempo Real
                            </h4>

                            <div className="space-y-4 font-mono text-xs">
                                <div className="flex items-start gap-4 text-zinc-400 group">
                                    <div className="mt-1 w-4 h-4 flex items-center justify-center border border-zinc-700 text-[8px] group-hover:border-primary transition-colors">1</div>
                                    <p className="flex-1 leading-relaxed">
                                        Se establece el coste anual total de <span className="text-white font-bold">{metric.label}</span> basado en fuentes oficiales y auditorías externas.
                                    </p>
                                </div>
                                <div className="flex items-start gap-4 text-zinc-400 group">
                                    <div className="mt-1 w-4 h-4 flex items-center justify-center border border-zinc-700 text-[8px] group-hover:border-primary transition-colors">2</div>
                                    <p className="flex-1 leading-relaxed">
                                        Dividimos el total anual entre los segundos exactos de un año normativo (31.536.000s) para obtener la <span className="text-primary font-bold">fuga de capital por segundo</span>.
                                    </p>
                                </div>
                                <div className="flex items-start gap-4 text-zinc-400 group">
                                    <div className="mt-1 w-4 h-4 flex items-center justify-center border border-zinc-700 text-[8px] group-hover:border-primary transition-colors">3</div>
                                    <p className="flex-1 leading-relaxed">
                                        El contador inicia su cálculo desde el <span className="text-white">1 de enero de {now.getFullYear()} a las 00:00:00</span>, multiplicando los segundos transcurridos por el ratio anterior.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Current Status Visualization */}
                        <div className="bg-zinc-900 border border-white/5 p-6 space-y-4">
                            <div className="flex justify-between items-end text-[10px] font-mono uppercase tracking-widest mb-1">
                                <span className="text-zinc-500">Progreso del Año ({daysElapsed} días)</span>
                                <span className="text-primary">{progressPercent.toFixed(2)}%</span>
                            </div>
                            <div className="h-1.5 bg-zinc-800 w-full overflow-hidden rounded-full">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercent}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-primary"
                                />
                            </div>

                            <div className="pt-4 border-t border-white/5 flex flex-col gap-1 items-center justify-center">
                                <p className="text-[9px] text-zinc-500 font-mono uppercase tracking-[0.2em]">Total Acumulado hasta este instante</p>
                                <p className="text-3xl font-black text-white tracking-tighter">
                                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(currentAccumulated)}
                                </p>
                            </div>
                        </div>

                        {/* Formula Box */}
                        <div className="p-4 bg-primary/10 border-l-4 border-primary italic font-mono text-xs text-zinc-300">
                            Formula: [Coste Anual / 31.536.000] * Segtranscurridos(Hoy - 1 Ene)
                        </div>
                    </div>

                    <div className="p-4 bg-zinc-900 border-t border-white/10 flex justify-between items-center text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
                        <span>Verificación: Nueva España Analysis Unit</span>
                        <span>Doc_ID: CALC_{metric.key.toUpperCase()}</span>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
