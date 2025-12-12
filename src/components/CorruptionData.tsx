"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ArrowDown } from "lucide-react";
import SpotlightCard from "./reactbits/SpotlightCard";
import CountUp from "./reactbits/CountUp";
import { MoneyTicker } from "./MoneyTicker";
import { siteConfig } from "@config";

const FALLBACK_CASES = [
    { name: "ERE Andalucía", amount: 680, color: "#ef4444" },
    { name: "Caso Gürtel", amount: 120, color: "#3b82f6" },
    { name: "Caso Púnica", amount: 250, color: "#3b82f6" },
    { name: "Caso Palau", amount: 35, color: "#eab308" },
    { name: "Caso Malaya", amount: 380, color: "#a855f7" },
];

export function CorruptionData() {
    const [isClient] = useState(() => typeof window !== "undefined");
    const corruptionCases = siteConfig.corruptionCases?.length ? siteConfig.corruptionCases : FALLBACK_CASES;
    const metrics = [
        { key: "inefficiency", ...siteConfig.corruptionMetrics?.inefficiency },
        { key: "pensions", ...siteConfig.corruptionMetrics?.pensions },
        { key: "redundancy", ...siteConfig.corruptionMetrics?.redundancy },
    ].filter((m) => m?.initial !== undefined);

    const justiceStats = siteConfig.justiceStats ?? {
        independentJudges: 0,
        independentLabel: "Jueces elegidos sin intervención política",
        controlPercent: 100,
        controlLabel: "Control de la Partitocracia sobre el Estado",
    };

    return (
        <section id="data" className="py-24 bg-zinc-950 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">La Realidad de la Partitocracia</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Datos que demuestran el coste de un sistema sin controles.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
                    {/* Gráfico de Corrupción */}
                    <SpotlightCard className="w-full h-[500px]" spotlightColor="rgba(239, 68, 68, 0.2)">
                        <h3 className="text-xl font-bold text-white mb-6">Coste de Grandes Casos (M€)</h3>
                        {isClient ? (
                            <ResponsiveContainer width="100%" height="85%">
                                <BarChart data={corruptionCases} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                    <XAxis type="number" stroke="#9ca3af" tickFormatter={(value) => `${value}M`} />
                                    <YAxis dataKey="name" type="category" stroke="#f3f4f6" width={100} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", color: "#f3f4f6" }}
                                        itemStyle={{ color: "#f3f4f6" }}
                                        formatter={(value: number) => [`${value} Millones €`, "Coste Estimado"]}
                                    />
                                    <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                                        {corruptionCases.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-sm text-gray-500">
                                Cargando visualización…
                            </div>
                        )}
                    </SpotlightCard>

                    {/* Diagrama de Poder */}
                    <div className="space-y-6">
                        <SpotlightCard className="w-full text-center" spotlightColor="rgba(59, 130, 246, 0.2)">
                            <h3 className="text-xl font-bold text-white mb-8">El Engaño de la Separación de Poderes</h3>

                            {/* Visualización de la Fusión */}
                            <div className="relative flex flex-col items-center">
                                {/* Cúpula Partidista */}
                                <div className="bg-white/10 p-4 rounded-xl border border-white/20 w-48 mb-8 backdrop-blur z-20">
                                    <span className="text-yellow-400 font-bold tracking-widest">JEFE DE PARTIDO</span>
                                </div>
                                <ArrowDown className="text-white/50 w-8 h-8 mb-4 animate-bounce" />

                                <div className="grid grid-cols-3 gap-4 w-full text-sm">
                                    <div className="flex flex-col items-center p-3 bg-red-500/10 rounded border border-red-500/20">
                                        <span className="font-bold text-red-400">EJECUTIVO</span>
                                        <span className="text-xs text-white/60 mt-2">Nombra al Gobierno</span>
                                    </div>
                                    <div className="flex flex-col items-center p-3 bg-blue-500/10 rounded border border-blue-500/20">
                                        <span className="font-bold text-blue-400">LEGISLATIVO</span>
                                        <span className="text-xs text-white/60 mt-2">Controla Listas</span>
                                    </div>
                                    <div className="flex flex-col items-center p-3 bg-purple-500/10 rounded border border-purple-500/20">
                                        <span className="font-bold text-purple-400">JUDICIAL</span>
                                        <span className="text-xs text-white/60 mt-2">Pacta el CGPJ</span>
                                    </div>
                                </div>
                                <div className="absolute inset-x-0 top-12 bottom-0 border-2 border-dashed border-white/5 rounded-xl -z-10" />
                            </div>
                            <p className="mt-8 text-sm text-gray-400 italic">
                                &ldquo;En España no hay tres poderes, hay tres funciones de un único poder: el de los partidos estatales.&rdquo;
                            </p>
                        </SpotlightCard>
                    </div>
                </div>

                {/* SECCIÓN DE DATOS EN TIEMPO REAL */}
                <div className="mt-16 bg-zinc-900/50 rounded-2xl p-8 border border-white/10 backdrop-blur-md">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">La Hemorragia del Estado</h3>
                    <p className="text-center text-gray-400 mb-12">Estimación de recursos perdidos en tiempo real (Base anual promediada)</p>

                    <div className="grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
                        {metrics.map((metric) => (
                            <MoneyTicker
                                key={metric.key}
                                initialAmount={metric.initial}
                                perSecond={metric.rate}
                                label={metric.label}
                                subLabel={metric.subLabel}
                                colorClass={metric.colorClass ?? "text-white"}
                            />
                        ))}
                    </div>
                </div>

                {/* TARJETAS ESTÁTICAS */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <SpotlightCard className="text-center" spotlightColor="rgba(255, 255, 255, 0.15)">
                        <span className="block text-4xl font-bold text-white mb-2 font-mono">
                            <CountUp to={justiceStats.independentJudges} />
                        </span>
                        <span className="text-sm text-gray-400">{justiceStats.independentLabel}</span>
                    </SpotlightCard>

                    <SpotlightCard className="text-center" spotlightColor="rgba(234, 179, 8, 0.15)">
                        <span className="block text-4xl font-bold text-accent mb-2 font-mono">
                            {justiceStats.controlPercent}%
                        </span>
                        <span className="text-sm text-gray-400">{justiceStats.controlLabel}</span>
                    </SpotlightCard>
                </div>
            </div>
        </section>
    );
}
