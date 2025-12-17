"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from "recharts";
import { Receipt, AlertTriangle, TrendingUp } from "lucide-react";
import SpotlightCard from "./reactbits/SpotlightCard";
import { MoneyTicker } from "./MoneyTicker";
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
                    {/* Gráfico de Barras "Hard Data" */}
                    <div className="lg:col-span-2 bg-black/40 border border-white/10 p-6 md:p-8 rounded-sm">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <AlertTriangle className="text-yellow-500 w-5 h-5" />
                            Comparativa de Costes Anuales (Estimados M€)
                        </h3>
                        <div className="h-[400px] w-full">
                            {isClient ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={corruptionCases} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#333" />
                                        <XAxis type="number" stroke="#666" tickFormatter={(value) => `${value / 1000}mM`} />
                                        <YAxis dataKey="name" type="category" stroke="#999" width={140} tick={{ fontSize: 12 }} />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                            contentStyle={{ backgroundColor: "#000", borderColor: "#333", color: "#fff" }}
                                            itemStyle={{ color: "#fff" }}
                                            formatter={(value: number) => [`${value.toLocaleString()} M€`, "Coste"]}
                                        />
                                        <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={30} animationDuration={1500}>
                                            {corruptionCases.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-sm text-gray-500 font-mono">
                                    [CALCULANDO PÉRDIDAS...]
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Nota de Contexto / Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-red-900/10 border-l-4 border-red-600 p-6">
                            <h4 className="text-red-500 font-bold mb-2 uppercase tracking-wide text-sm">El Dato Clave</h4>
                            <p className="text-gray-300 text-lg font-light">
                                La corrupción en España cuesta aproximadamente el <b className="text-white">8% del PIB</b> anual.
                            </p>
                            <p className="text-gray-500 text-sm mt-4">
                                Fuente: Grupo de Los Verdes/ALE (Parlamento Europeo, 2018).
                            </p>
                        </div>

                        <div className="bg-orange-900/10 border-l-4 border-orange-600 p-6">
                            <h4 className="text-orange-500 font-bold mb-2 uppercase tracking-wide text-sm">La Deuda Oculta</h4>
                            <p className="text-gray-300 text-lg font-light">
                                El Estado transfiere más de <b className="text-white">50.000 M€</b> al año a la Seguridad Social para evitar la quiebra técnica del sistema de pensiones.
                            </p>
                            <p className="text-gray-500 text-sm mt-4">
                                Fuente: Datos de ejecución presupuestaria 2024.
                            </p>
                        </div>

                        <button
                            onClick={() => setShowSources(true)}
                            className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-gray-400 font-mono text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                        >
                            <Receipt className="w-4 h-4" />
                            Ver Desglose de Fuentes
                        </button>
                    </div>
                </div>
            </div>

            <SourcesModal isOpen={showSources} onClose={() => setShowSources(false)} />
        </section>
    );
}
