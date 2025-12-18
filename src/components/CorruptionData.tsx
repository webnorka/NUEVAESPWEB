"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import { Receipt, AlertTriangle, TrendingUp, ShieldAlert, Cpu, Terminal } from "lucide-react";
import SpotlightCard from "./reactbits/SpotlightCard";
import { MoneyTicker } from "./MoneyTicker";
import { DataBreachBars } from "./vanguard/DataBreachBars";
import { siteConfig } from "@config";
import { SourcesModal } from "./SourcesModal";

const FALLBACK_CASES = [
    { name: "Coste Anual Corrupción", amount: 90000, color: "#dc2626" },
    { name: "Agujero Pensiones", amount: 66000, color: "#ea580c" },
    { name: "Duplicidades", amount: 26000, color: "#eab308" },
];

export function CorruptionData() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const corruptionCases = siteConfig.corruptionCases?.length ? siteConfig.corruptionCases.slice(0, 5) : FALLBACK_CASES;
    const metrics = [
        { key: "inefficiency", ...siteConfig.corruptionMetrics?.inefficiency },
        { key: "pensions", ...siteConfig.corruptionMetrics?.pensions },
        { key: "redundancy", ...siteConfig.corruptionMetrics?.redundancy },
    ].filter((m) => m?.initial !== undefined);

    const [showSources, setShowSources] = useState(false);

    return (
        <section id="data" className="py-24 bg-zinc-950 relative overflow-hidden">

            {/* Diagonal Stripes Background */}
            <div className="absolute inset-0 opacity-[0.02] bg-[repeating-linear-gradient(45deg,#fff,#fff_1px,transparent_1px,transparent_10px)] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-white/10 pb-8">
                    <div>
                        <div className="flex items-center gap-3 text-red-500 mb-2">
                            <Receipt className="w-6 h-6" />
                            <span className="font-mono text-sm uppercase tracking-widest">Factura al Ciudadano</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-none">
                            El Precio del <br /> Régimen
                        </h2>
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="text-gray-400 font-mono text-sm">
                            FECHA: {new Date().toLocaleDateString('es-ES')} <br />
                            CONCEPTO: MANTENIMIENTO ESTRUCTURA PARTITOCRÁTICA <br />
                            ESTADO: <span className="text-red-500 font-bold animate-pulse">IMPAGABLE</span>
                        </p>
                        <button
                            onClick={() => setShowSources(true)}
                            className="mt-4 text-xs font-mono text-gray-500 hover:text-white underline decoration-dotted underline-offset-4 transition-colors"
                        >
                            [VERIFICAR FUENTES Y EXPEDIENTES]
                        </button>
                    </div>
                </div>

                {/* VISUALIZACIÓN PRINCIPAL: TICKERS EN VIVO */}
                <div className="grid lg:grid-cols-3 gap-6 mb-12">
                    {metrics.map((metric, i) => (
                        <div key={metric.key} className="bg-zinc-900/50 border border-white/10 p-6 rounded-sm relative overflow-hidden group hover:border-white/20 transition-colors">
                            <div className={`absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity ${metric.colorClass}`}>
                                <TrendingUp className="w-12 h-12" />
                            </div>
                            <h3 className="text-gray-400 text-sm font-mono uppercase tracking-wider mb-2">{metric.label}</h3>
                            <div className="mb-2">
                                <MoneyTicker
                                    initialAmount={metric.initial}
                                    perSecond={metric.rate}
                                    colorClass={metric.colorClass ?? "text-white"}
                                    label=""
                                    subLabel=""
                                />
                            </div>
                            <p className="text-xs text-gray-500 border-t border-white/5 pt-4 mt-4">
                                {metric.subLabel}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-12 items-start">
                    {/* Visualización Vanguardista: Data Breach */}
                    <div className="lg:col-span-2 relative">
                        <div className="absolute -top-10 left-0 flex items-center gap-4 text-primary">
                            <Cpu className="w-4 h-4 animate-pulse" />
                            <span className="font-mono text-[10px] uppercase font-bold tracking-[0.3em]">
                                Recopilación de Registros Financieros // SECURED_HUB
                            </span>
                        </div>

                        <div className="bg-black/40 border border-white/5 p-6 md:p-10 rounded-sm relative group overflow-hidden">
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                            <div className="relative z-10">
                                <h3 className="text-xl md:text-2xl font-black text-white mb-10 flex items-center gap-3 italic uppercase tracking-tighter">
                                    <ShieldAlert className="text-primary w-6 h-6" />
                                    Grado de Extracción de Capital
                                </h3>

                                {isClient ? (
                                    <DataBreachBars data={corruptionCases} />
                                ) : (
                                    <div className="h-[400px] w-full flex items-center justify-center text-sm text-zinc-500 font-mono italic animate-pulse">
                                        [ACCEDIENDO A LOS ARCHIVOS DE HACIENDA...]
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Reflexiones y Contexto Social */}
                    <div className="space-y-6">
                        <div className="bg-zinc-900/80 border border-white/5 p-6 rounded-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Terminal className="w-12 h-12 text-primary" />
                            </div>
                            <h4 className="text-primary font-bold mb-4 uppercase tracking-widest text-[10px]">
                                Realidad Social // Análisis Proyectado
                            </h4>
                            <div className="space-y-8">
                                {siteConfig.socialImpact?.map((reflection, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 + (i * 0.2) }}
                                        className="border-b border-white/5 pb-4 last:border-0"
                                    >
                                        <p className="text-zinc-400 text-sm font-mono leading-relaxed group-hover:text-zinc-300 transition-colors">
                                            {">"} {reflection}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-primary/5 border border-primary/20 p-6 rounded-sm relative group overflow-hidden">
                            <motion.div
                                animate={{ opacity: [0.1, 0.3, 0.1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute inset-0 bg-primary/10"
                            />
                            <h4 className="text-white font-black mb-2 uppercase tracking-wide text-xs flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-primary" />
                                Conclusión del Diagnóstico
                            </h4>
                            <p className="text-zinc-300 text-sm italic relative z-10 leading-relaxed font-light">
                                "La deuda no es accidental; es el combustible necesario para mantener una estructura que ya no responde al ciudadano, sino a su propia supervivencia burocrática."
                            </p>
                        </div>

                        <button
                            onClick={() => setShowSources(true)}
                            className="w-full py-4 bg-zinc-950 hover:bg-primary/10 border border-white/5 text-zinc-500 hover:text-primary font-mono text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 group"
                        >
                            <Receipt className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            Verificar Fuentes y Expedientes
                        </button>
                    </div>
                </div>
            </div>

            <SourcesModal isOpen={showSources} onClose={() => setShowSources(false)} />
        </section>
    );
}
