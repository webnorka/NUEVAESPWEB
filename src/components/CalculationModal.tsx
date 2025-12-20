"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, TrendingUp } from "lucide-react";

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
    const [currentAmount, setCurrentAmount] = useState<number>(0);
    const frameRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);

    // Handle Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleEscape);
        }
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    // Initial calculation and synchronization
    useEffect(() => {
        if (isOpen && metric) {
            const now = new Date();
            const startOfYear = new Date(now.getFullYear(), 0, 1);
            const secondsElapsed = (now.getTime() - startOfYear.getTime()) / 1000;
            const initialAccumulated = metric.rate * secondsElapsed;

            setCurrentAmount(initialAccumulated);
            lastTimeRef.current = performance.now();

            const update = (time: number) => {
                const delta = (time - lastTimeRef.current) / 1000;
                lastTimeRef.current = time;
                setCurrentAmount((prev: number) => prev + (metric.rate * delta));
                frameRef.current = requestAnimationFrame(update);
            };

            frameRef.current = requestAnimationFrame(update);
        }

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [isOpen, metric]);

    if (!isOpen || !metric) return null;

    const annualTotal = metric.rate * 31536000;
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const secondsElapsed = (now.getTime() - startOfYear.getTime()) / 1000;
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
                    className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 30 }}
                    className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 shadow-[0_0_80px_rgba(0,0,0,1)] overflow-hidden rounded-sm"
                >
                    {/* Header: Institutional/Audit Style */}
                    <div className="bg-zinc-900/50 border-b border-white/10 p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-8 bg-primary rounded-full" />
                            <div>
                                <h3 className="font-black text-white uppercase tracking-tighter text-xl leading-tight">
                                    Protocolo de Fiscalización
                                </h3>
                                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.3em] font-bold mt-1">
                                    Concepto: {metric.label}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/5 rounded-full transition-colors group border border-white/5"
                        >
                            <X className="w-5 h-5 text-zinc-500 group-hover:text-white" />
                        </button>
                    </div>

                    <div className="p-8 space-y-10 max-h-[75vh] overflow-y-auto custom-scrollbar">
                        {/* Summary Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white/5 p-5 border border-white/5 relative group hover:border-white/10 transition-colors">
                                <div className="absolute top-2 right-2 opacity-20"><Clock className="w-4 h-4 text-zinc-400" /></div>
                                <p className="text-[10px] text-zinc-500 font-mono uppercase mb-2 tracking-widest">Dotación Anual Estimada</p>
                                <p className="text-2xl font-black text-white">
                                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(annualTotal)}
                                </p>
                            </div>
                            <div className="bg-primary/5 p-5 border border-primary/20 relative group hover:border-primary/40 transition-colors">
                                <div className="absolute top-2 right-2 opacity-40"><TrendingUp className="w-4 h-4 text-primary" /></div>
                                <p className="text-[10px] text-primary/70 font-mono uppercase mb-2 tracking-widest">Ratio de Fuga por Segundo</p>
                                <p className="text-2xl font-black text-primary">
                                    {metric.rate.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €/s
                                </p>
                            </div>
                        </div>

                        {/* Analysis Grid */}
                        <div className="space-y-6">
                            <h4 className="text-xs font-bold text-white uppercase tracking-[0.3em] flex items-center gap-3 border-l-2 border-primary pl-4">
                                Metodología de Fiscalización Dinámica
                            </h4>

                            <div className="space-y-6 font-mono text-[11px] pl-4">
                                <div className="flex items-start gap-4 text-zinc-400">
                                    <span className="text-primary font-bold">01/</span>
                                    <p className="flex-1 leading-relaxed">
                                        Se establece el coste anual consolidado de <span className="text-white font-bold">{metric.label}</span> mediante el análisis de fuentes de auditoría externa y datos presupuestarios oficiales.
                                    </p>
                                </div>
                                <div className="flex items-start gap-4 text-zinc-400">
                                    <span className="text-primary font-bold">02/</span>
                                    <p className="flex-1 leading-relaxed">
                                        Se prorratea el importe total entre las unidades de tiempo de un ejercicio fiscal estándar (31.536.000s) para determinar el <span className="text-primary font-bold">impacto inmediato</span>.
                                    </p>
                                </div>
                                <div className="flex items-start gap-4 text-zinc-400">
                                    <span className="text-primary font-bold">03/</span>
                                    <p className="flex-1 leading-relaxed">
                                        El algoritmo sincroniza el cálculo desde el inicio del ciclo fiscal actual (<span className="text-white">1 de enero de {now.getFullYear()}</span>), multiplicando el tiempo transcurrido por el ratio de fuga obtenido.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Live Counter Display */}
                        <div className="bg-zinc-900/80 border border-white/5 p-8 space-y-6 rounded-sm relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(190,18,60,0.05),transparent)] pointer-events-none" />

                            <div className="flex justify-between items-end text-[10px] font-mono uppercase tracking-[0.2em] mb-1">
                                <span className="text-zinc-500">Transcurso del Ejercicio Fiscal ({daysElapsed} días)</span>
                                <span className="text-primary font-bold">{progressPercent.toFixed(2)}%</span>
                            </div>
                            <div className="h-1 bg-zinc-800 w-full overflow-hidden rounded-full">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercent}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-primary shadow-[0_0_10px_rgba(190,18,60,0.4)]"
                                />
                            </div>

                            <div className="pt-6 border-t border-white/5 flex flex-col gap-2 items-center justify-center">
                                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.4em] font-bold">Coste Acumulado en Tiempo Real</p>
                                <p className="text-4xl md:text-5xl font-black text-white tracking-tighter tabular-nums text-center">
                                    {new Intl.NumberFormat('es-ES', {
                                        style: 'currency',
                                        currency: 'EUR',
                                        maximumFractionDigits: 0
                                    }).format(currentAmount)}
                                </p>
                            </div>
                        </div>

                        {/* Protocol Footer */}
                        <div className="p-4 bg-zinc-900 border border-white/5 rounded-sm flex flex-col gap-1">
                            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest border-b border-white/5 pb-1 mb-1">Protocolo de Cálculo</span>
                            <code className="text-[10px] text-primary italic font-mono lowercase">
                                [Audit_Base / 31.536.000] * ΔTime(Start_Fiscal_Cycle)
                            </code>
                        </div>
                    </div>

                    <div className="p-5 bg-zinc-900/80 border-t border-white/10 flex justify-between items-center text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                        <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Unidad de Análisis NE</span>
                        <span className="opacity-50 tracking-normal">Expediente: CALC_{metric.key.toUpperCase()} // SINCRO: ACTIVA</span>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
