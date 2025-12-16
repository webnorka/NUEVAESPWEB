"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Vote, Crown, Building2, Scale, ArrowRightLeft, Gavel } from "lucide-react";

export function SystemComparator() {
    const [system, setSystem] = useState<"regimen" | "democracia">("regimen");

    return (
        <section className="py-24 bg-zinc-950 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                        La Gran Mentira
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Nos dijeron que la Transición trajo la democracia. Nos mintieron. <br />
                        Compara tú mismo la realidad política de España con una verdadera Democracia Formal.
                    </p>
                </div>

                {/* Switcher */}
                <div className="flex justify-center mb-12">
                    <div className="bg-zinc-900/80 p-1.5 rounded-full border border-white/10 flex relative backdrop-blur-md">
                        <button
                            onClick={() => setSystem("regimen")}
                            className={`px-8 py-3 rounded-full text-sm font-bold tracking-widest transition-all duration-500 relative z-20 ${system === "regimen" ? "text-white" : "text-gray-500 hover:text-white"
                                }`}
                        >
                            RÉGIMEN ACTUAL
                        </button>
                        <button
                            onClick={() => setSystem("democracia")}
                            className={`px-8 py-3 rounded-full text-sm font-bold tracking-widest transition-all duration-500 relative z-20 ${system === "democracia" ? "text-zinc-950" : "text-gray-500 hover:text-white"
                                }`}
                        >
                            DEMOCRACIA FORMAL
                        </button>

                        {/* Slide Background */}
                        <motion.div
                            layout
                            className={`absolute top-1.5 bottom-1.5 rounded-full z-10 ${system === "regimen" ? "bg-red-600 left-1.5 w-[165px]" : "bg-white right-1.5 w-[190px]"
                                }`}
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    </div>
                </div>

                {/* Comparison Card */}
                <div className="max-w-5xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={system}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className={`rounded-3xl border-2 p-8 md:p-12 shadow-2xl ${system === "regimen"
                                ? "bg-zinc-900/50 border-red-500/30 shadow-red-900/10"
                                : "bg-white/5 border-white/20 shadow-white/5"
                                }`}
                        >
                            <div className="grid md:grid-cols-3 gap-12 items-center">
                                {/* Left Column: Origin */}
                                <div className="space-y-6 text-center">
                                    <h3 className={`text-sm font-bold uppercase tracking-widest ${system === "regimen" ? "text-red-400" : "text-blue-400"}`}>
                                        Origen del Poder
                                    </h3>
                                    <div className="flex justify-center">
                                        {system === "regimen" ? (
                                            <div className="relative">
                                                <Building2 className="w-20 h-20 text-zinc-700" />
                                                <Crown className="w-10 h-10 text-yellow-500 absolute -top-4 -right-4 animate-pulse" />
                                                <p className="mt-4 font-bold text-white text-lg">Cúpulas de Partido</p>
                                            </div>
                                        ) : (
                                            <div className="relative">
                                                <Users className="w-20 h-20 text-white" />
                                                <Vote className="w-10 h-10 text-green-400 absolute -top-2 -right-2" />
                                                <p className="mt-4 font-bold text-white text-lg">Sociedad Civil</p>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        {system === "regimen"
                                            ? "El jefe del partido hace las listas. TÚ no eliges a tui representante, solo ratificas la lista del líder."
                                            : "Elección directa de representante por distrito. Tú lo eliges, tú lo puedes revocar."}
                                    </p>
                                </div>

                                {/* Center Column: Mechanism */}
                                <div className="flex justify-center">
                                    <div className={`w-full h-[2px] relative hidden md:block ${system === "regimen" ? "bg-red-500/20" : "bg-white/20"}`}>
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-950 p-3 rounded-full border border-white/10">
                                            <ArrowRightLeft className={`w-6 h-6 ${system === "regimen" ? "text-red-500 rotate-45" : "text-white"}`} />
                                        </div>
                                    </div>
                                    {/* Mobile Divider */}
                                    <div className="md:hidden w-[2px] h-16 bg-white/10 my-4" />
                                </div>

                                {/* Right Column: Result */}
                                <div className="space-y-6 text-center">
                                    <h3 className={`text-sm font-bold uppercase tracking-widest ${system === "regimen" ? "text-red-400" : "text-blue-400"}`}>
                                        Consecuencia
                                    </h3>
                                    <div className="flex justify-center">
                                        {system === "regimen" ? (
                                            <div className="relative">
                                                <Gavel className="w-20 h-20 text-red-600/50" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-4xl font-black text-white">?</span>
                                                </div>
                                                <p className="mt-4 font-bold text-white text-lg">Fusión de Poderes</p>
                                            </div>
                                        ) : (
                                            <div className="relative">
                                                <Scale className="w-20 h-20 text-blue-400" />
                                                <p className="mt-4 font-bold text-white text-lg">Separación de Poderes</p>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        {system === "regimen"
                                            ? "El Ejecutivo nombra al Judicial y controla el Legislativo. No hay control, solo impunidad y corrupción sistémica."
                                            : "El Legislativo controla al Ejecutivo. La Justicia es independiente. El poder vigila al poder."}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/5 text-center">
                                <span className={`inline-block px-4 py-1 rounded text-xs font-mono tracking-widest uppercase ${system === "regimen" ? "bg-red-900/30 text-red-400" : "bg-green-900/30 text-green-400"
                                    }`}>
                                    {system === "regimen" ? "RESULTADO: ESTADO DE PARTIDOS" : "RESULTADO: REPÚBLICA CONSTITUCIONAL"}
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

export default SystemComparator;
