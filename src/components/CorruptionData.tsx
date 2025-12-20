"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Receipt, AlertTriangle, TrendingUp, ShieldAlert, Cpu, Terminal, Wallet, FlaskConical, Home, Maximize2, X } from "lucide-react";
import SpotlightCard from "./reactbits/SpotlightCard";
import { MoneyTicker } from "./MoneyTicker";
import { DataBreachBars } from "./vanguard/DataBreachBars";
import { siteConfig } from "@config";
import { SourcesModal } from "./SourcesModal";
import { CalculationModal } from "./CalculationModal";

const ICON_MAP: Record<string, any> = {
    Wallet,
    FlaskConical,
    Home
};

// High performance Artistic Canvas for 400,000 particles (Wealth Leak)
// OPTIMIZED: Bake & Drift (CSS Animation) - 0 JS overhead after initial render
// ENHANCED: IntersectionObserver to pause animation when out of view
function HousingCanvas({ color = "rgba(220, 38, 38, 0.4)", scale = 1 }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

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

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !isVisible) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        // Draw once to an oversized canvas
        const count = 400000;
        const width = canvas.width = canvas.offsetWidth * 2.5; // Extra width for drift
        const height = canvas.height = canvas.offsetHeight * 2.5; // Extra height for drift
        const size = 1.0 * scale;

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = color;

        // One-time expensive operation
        for (let i = 0; i < count; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            ctx.fillRect(x, y, size, size);
        }

        // Add dynamic CSS for the drift
        const name = `drift-${Math.random().toString(36).substring(2, 11)}`;
        const style = document.createElement("style");
        style.innerHTML = `
            @keyframes ${name} {
                from { transform: translate(0, 0); }
                to { transform: translate(-20%, -20%); }
            }
            .canvas-drift-${name} {
                animation: ${name} 60s linear infinite;
                will-change: transform;
            }
            .canvas-paused {
                animation-play-state: paused !important;
            }
        `;
        document.head.appendChild(style);
        canvas.classList.add(`canvas-drift-${name}`);

        return () => {
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        };
    }, [color, scale, isVisible]); // Re-draw/re-animate only when it becomes visible

    return (
        <div ref={containerRef} className="w-full h-full overflow-hidden relative">
            <canvas
                ref={canvasRef}
                className={`absolute top-0 left-0 ${!isVisible ? 'canvas-paused' : ''}`}
                style={{ width: '150%', height: '150%' }}
            />
        </div>
    );
}

const FALLBACK_CASES = [
    { name: "Coste Anual Corrupción", amount: 90000, color: "#dc2626" },
    { name: "Agujero Pensiones", amount: 66000, color: "#ea580c" },
    { name: "Duplicidades", amount: 26000, color: "#eab308" },
];

// Helper Modal for 100k Housing Visual
const FullscreenHousingModal = ({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void
}) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col p-8 md:p-12 overflow-hidden"
            >
                <div className="flex justify-between items-start mb-12 border-b border-white/10 pb-8">
                    <div>
                        <div className="flex items-center gap-3 text-primary mb-2">
                            <Home className="w-5 h-5" />
                            <span className="font-mono text-xs uppercase tracking-[0.3em]">Cómputo Directo // Escala 1:1</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-foreground uppercase italic tracking-tighter">
                            {siteConfig.socialImpact?.[2]?.data?.count?.toLocaleString('es-ES') || '400.000'} Viviendas Sociales
                        </h2>
                        <p className="text-muted font-mono text-sm mt-2 max-w-2xl uppercase">
                            Cada punto en pantalla representa un hogar real que no fue construido debido al coste total de la ineficiencia (208.000 M€).
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 relative bg-black/40 border border-white/5 rounded-lg overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,#dc2626_0%,transparent_70%)]" />
                    <div className="w-full h-full p-12">
                        <HousingCanvas color="rgba(220, 38, 38, 0.6)" scale={1.5} />
                    </div>
                </div>

                <div className="mt-8 flex justify-between items-center opacity-50 font-mono text-[10px] tracking-widest text-muted uppercase">
                    <span>Registro: 208.000 M€ Fuga Anual</span>
                    <span>Nueva España // Inspección de Datos</span>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
);

export function CorruptionData() {
    const [isClient, setIsClient] = useState(false);
    const [isHousingModalOpen, setIsHousingModalOpen] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const corruptionCases = siteConfig.corruptionCases?.length ? siteConfig.corruptionCases.slice(0, 5) : FALLBACK_CASES;

    // Live calculation for metrics
    const [calculatedMetrics, setCalculatedMetrics] = useState<any[]>([]);

    useEffect(() => {
        if (!isClient) return;

        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const secondsElapsed = (now.getTime() - startOfYear.getTime()) / 1000;

        const updatedMetrics = [
            { key: "inefficiency", ...siteConfig.corruptionMetrics?.inefficiency },
            { key: "pensions", ...siteConfig.corruptionMetrics?.pensions },
            { key: "redundancy", ...siteConfig.corruptionMetrics?.redundancy },
        ].filter((m) => m?.rate !== undefined).map(m => ({
            ...m,
            initial: m.rate * secondsElapsed
        }));

        setCalculatedMetrics(updatedMetrics);
    }, [isClient]);

    const metrics = calculatedMetrics;

    const [showSources, setShowSources] = useState(false);
    const [selectedMetric, setSelectedMetric] = useState<any>(null);

    return (
        <section id="data" className="py-32 bg-background relative overflow-hidden">

            {/* Diagonal Stripes Background */}
            <div className="absolute inset-0 opacity-[0.02] bg-[repeating-linear-gradient(45deg,#fff,#fff_1px,transparent_1px,transparent_10px)] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-white/10 pb-8">
                    <div>
                        <div className="flex items-center gap-3 text-primary mb-2">
                            <Receipt className="w-6 h-6" />
                            <span className="font-mono text-sm uppercase tracking-widest">Factura al Ciudadano</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-foreground uppercase italic leading-[0.9] tracking-tighter">
                            Factura del <br /> <span className="text-primary">Régimen</span>
                        </h2>
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="text-muted font-mono text-sm">
                            FECHA: {new Date().toLocaleDateString('es-ES')} <br />
                            CONCEPTO: MANTENIMIENTO ESTRUCTURA PARTITOCRÁTICA <br />
                            ESTADO: <span className="text-primary font-bold animate-pulse">IMPAGABLE</span>
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
                        <div key={metric.key} className="bg-surface/50 border border-white/10 p-6 rounded-sm relative overflow-hidden group hover:border-white/20 transition-colors">
                            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity ${metric.colorClass}`}>
                                <TrendingUp className="w-12 h-12" />
                            </div>
                            <h3 className="text-muted text-sm font-mono uppercase tracking-wider mb-2">{metric.label}</h3>
                            <div className="mb-2">
                                <MoneyTicker
                                    initialAmount={metric.initial}
                                    perSecond={metric.rate}
                                    colorClass={metric.colorClass ?? "text-white"}
                                    label=""
                                    subLabel=""
                                />
                            </div>
                            <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-4">
                                <p className="text-[10px] text-muted uppercase font-mono tracking-tight leading-none max-w-[60%]">
                                    {metric.subLabel}
                                </p>
                                <button
                                    onClick={() => setSelectedMetric(metric)}
                                    className="text-[10px] bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 text-muted hover:text-foreground px-2 py-1 transition-all font-mono uppercase tracking-widest leading-none"
                                >
                                    Ver Cálculo
                                </button>
                            </div>
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
                                <h3 className="text-xl md:text-2xl font-black text-foreground mb-10 flex items-center gap-3 italic uppercase tracking-tighter">
                                    <ShieldAlert className="text-primary w-6 h-6" />
                                    Grado de Extracción de Capital
                                </h3>

                                {isClient ? (
                                    <DataBreachBars data={corruptionCases} />
                                ) : (
                                    <div className="h-[400px] w-full flex items-center justify-center text-sm text-muted font-mono italic animate-pulse">
                                        [ACCEDIENDO A LOS ARCHIVOS DE HACIENDA...]
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Reflexiones y Contexto Social */}
                    <div className="space-y-6">
                        <div className="bg-surface/80 border border-white/5 p-6 rounded-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Terminal className="w-12 h-12 text-primary" />
                            </div>
                            <h4 className="text-primary font-bold mb-4 uppercase tracking-widest text-[10px]">
                                Realidad Social // Análisis Proyectado
                            </h4>
                            <div className="space-y-6">
                                {siteConfig.socialImpact?.map((impact: any, i: number) => {
                                    const Icon = ICON_MAP[impact.icon] || Terminal;

                                    // Visual Components sub-renderers
                                    const renderVisual = () => {
                                        switch (impact.visualType) {
                                            case "banknotes":
                                                return (
                                                    <div className="mt-4 relative p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-lg overflow-hidden group/banknotes">
                                                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover/banknotes:opacity-100 transition-opacity" />

                                                        <div className="relative z-10 flex items-center justify-between">
                                                            <div className="flex flex-col">
                                                                <span className="text-[10px] font-mono text-emerald-500/60 uppercase tracking-widest mb-1">Impacto Individual Anual</span>
                                                                <div className="flex items-baseline gap-1">
                                                                    <motion.span
                                                                        initial={{ opacity: 0 }}
                                                                        whileInView={{ opacity: 1 }}
                                                                        className="text-3xl font-black text-emerald-400 italic tracking-tighter"
                                                                    >
                                                                        4.333
                                                                    </motion.span>
                                                                    <span className="text-sm font-bold text-emerald-600">€</span>
                                                                </div>
                                                            </div>

                                                            {/* Stack of Bills Visual */}
                                                            <div className="relative w-20 h-12 flex items-center justify-center">
                                                                {[...Array(8)].map((_, idx) => (
                                                                    <motion.div
                                                                        key={idx}
                                                                        initial={{ opacity: 0, y: 20, rotate: 0 }}
                                                                        whileInView={{
                                                                            opacity: 1,
                                                                            y: -idx * 2,
                                                                            rotate: idx % 2 === 0 ? 2 : -2
                                                                        }}
                                                                        transition={{
                                                                            delay: 0.5 + (idx * 0.08),
                                                                            type: "spring",
                                                                            stiffness: 100
                                                                        }}
                                                                        className="absolute w-12 h-6 bg-emerald-500/20 border border-emerald-400/50 rounded-sm flex items-center justify-center backdrop-blur-sm"
                                                                    >
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/40" />
                                                                    </motion.div>
                                                                ))}
                                                                {/* Floating money particles */}
                                                                {[...Array(4)].map((_, idx) => (
                                                                    <motion.div
                                                                        key={`p-${idx}`}
                                                                        animate={{
                                                                            y: [-10, -40],
                                                                            x: [0, (idx % 2 === 0 ? 20 : -20)],
                                                                            opacity: [0, 1, 0],
                                                                            rotate: [0, 45]
                                                                        }}
                                                                        transition={{
                                                                            duration: 2,
                                                                            delay: idx * 0.5,
                                                                            repeat: Infinity,
                                                                            ease: "easeOut"
                                                                        }}
                                                                        className="absolute w-3 h-1.5 bg-emerald-400/30 rounded-full blur-[1px]"
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Total Aggregated Label */}
                                                        <div className="mt-3 pt-3 border-t border-success/10 flex justify-between items-center">
                                                            <span className="text-[9px] font-mono text-muted uppercase">Fuga Total Estimada</span>
                                                            <span className="text-[10px] font-mono text-success font-bold">208.000.000.000€</span>
                                                        </div>
                                                    </div>
                                                );
                                            case "comparison":
                                                return (
                                                    <div className="mt-4 flex flex-col gap-2 group/comparison">
                                                        <div className="flex justify-between text-[10px] font-mono mb-1">
                                                            <span className="text-red-400 font-bold uppercase tracking-widest">Gasto en Pensiones</span>
                                                            <span className="text-blue-400 font-bold uppercase tracking-widest">Inversión I+D</span>
                                                        </div>
                                                        <div className="h-6 w-full bg-zinc-900 border border-white/10 rounded-sm overflow-hidden flex relative">
                                                            {/* Segmento Pensiones (80%) */}
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                whileInView={{ width: "80%" }}
                                                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                                                className="h-full bg-red-500/40 border-r border-white/20 relative group-hover/comparison:bg-red-500/50 transition-colors"
                                                            >
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <span className="text-[10px] font-black text-white/50">80%</span>
                                                                </div>
                                                            </motion.div>
                                                            {/* Segmento I+D (20%) */}
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                whileInView={{ width: "20%" }}
                                                                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                                                className="h-full bg-blue-500/40 relative group-hover/comparison:bg-blue-500/50 transition-colors"
                                                            >
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <span className="text-[10px] font-black text-white/50">20%</span>
                                                                </div>
                                                            </motion.div>
                                                        </div>
                                                        <div className="text-[9px] font-mono text-zinc-500 text-center uppercase tracking-tighter opacity-60">
                                                            Escala Real // Fuente oficial de presupuestos
                                                        </div>
                                                    </div>
                                                );
                                            case "grid":
                                                return (
                                                    <div className="mt-4 p-2 bg-zinc-950/80 border border-primary/20 rounded-lg group/grid overflow-hidden relative">
                                                        <motion.div
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            onClick={() => setIsHousingModalOpen(true)}
                                                            className="relative h-[120px] w-full bg-black/40 rounded border border-white/5 cursor-pointer group/canvas"
                                                        >
                                                            <HousingCanvas />
                                                            <div className="absolute inset-0 bg-primary/0 group-hover/canvas:bg-primary/5 transition-colors flex items-center justify-center">
                                                                <Maximize2 className="w-6 h-6 text-white/0 group-hover/canvas:text-white/40 transition-all transform scale-50 group-hover/canvas:scale-100" />
                                                            </div>
                                                        </motion.div>
                                                        <div className="flex justify-between items-center text-[9px] font-mono mt-2 uppercase">
                                                            <span className="text-primary/60 font-bold tracking-widest">[ CLIC PARA INSPECCIÓN ]</span>
                                                            <span className="text-muted">{impact.data.count.toLocaleString('es-ES')} viviendas</span>
                                                        </div>
                                                    </div>
                                                );
                                            default:
                                                return null;
                                        }
                                    };

                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 + (i * 0.1) }}
                                            className="group/item border-b border-white/5 pb-6 last:border-0"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1 p-1.5 bg-primary/10 rounded-sm border border-primary/20 group-hover/item:border-primary/50 transition-colors">
                                                    <Icon className="w-3.5 h-3.5 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-muted text-xs font-mono leading-relaxed group-hover/item:text-foreground transition-colors">
                                                        {impact.text}
                                                    </p>
                                                    {renderVisual()}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="bg-primary/5 border border-primary/20 p-6 rounded-sm relative group overflow-hidden">
                            <motion.div
                                animate={{ opacity: [0.05, 0.15, 0.05] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute inset-0 bg-primary/10"
                            />
                            <h4 className="text-foreground font-black mb-2 uppercase tracking-wide text-xs flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-primary" />
                                Conclusión del Diagnóstico
                            </h4>
                            <p className="text-muted text-sm italic relative z-10 leading-relaxed font-light">
                                "La deuda no es accidental; es el combustible necesario para mantener una estructura que ya no responde al ciudadano, sino a su propia supervivencia burocrática."
                            </p>
                        </div>

                        <button
                            onClick={() => setShowSources(true)}
                            className="w-full py-4 bg-background hover:bg-primary/10 border border-white/5 text-muted hover:text-primary font-mono text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 group"
                        >
                            <Receipt className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            Verificar Fuentes y Expedientes
                        </button>
                    </div>
                </div>
            </div>

            <SourcesModal isOpen={showSources} onClose={() => setShowSources(false)} />
            <CalculationModal
                isOpen={!!selectedMetric}
                onClose={() => setSelectedMetric(null)}
                metric={selectedMetric}
            />
            <FullscreenHousingModal
                isOpen={isHousingModalOpen}
                onClose={() => setIsHousingModalOpen(false)}
            />
        </section >
    );
}
