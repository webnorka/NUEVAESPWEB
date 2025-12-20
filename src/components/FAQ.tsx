"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ShieldQuestion, FileText, Siren, CornerDownRight, Crosshair } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
    {
        id: "Q-01",
        question: "¿Qué es la 'Libertad Política Colectiva'?",
        answer: "Es el poder de la Nación para constituirse a sí misma. No se trata de tus derechos individuales (ir donde quieras, decir lo que quieras), sino del derecho de todos nosotros a decidir CÓMO nos gobernamos. Sin esto, solo somos súbditos con privilegios, no ciudadanos libres.",
        status: "CONCEPT_CRITICAL"
    },
    {
        id: "Q-02",
        question: "¿Por qué NO hay democracia en España?",
        answer: "Faltan las dos condiciones SINE QUA NON: 1) Separación de Poderes (el Gobierno nombra a los jueces). 2) Representación Directa (el diputado obedece al Jefe de Partido, no a ti). Lo que tenemos es una Partitocracia o Estado de Partidos.",
        status: "SYSTEM_FAILURE"
    },
    {
        id: "Q-03",
        question: "¿Qué es la Abstención Activa?",
        answer: "Es un acto de GUERRA PACÍFICA. No es quedarse en casa por pereza. Es ir a las urnas (o no ir) con la intención explícita de deslegitimar el Régimen. Sin votantes, su teatro se derrumba. Es retirar el consentimiento para forzar el cambio.",
        status: "ACTION_REQUIRED"
    },
    {
        id: "Q-04",
        question: "¿Cuál es la solución?",
        answer: "Un Periodo de Libertad Constituyente. Tras deslegitimar el Régimen actual, se abre un proceso donde la Nación elige representantes SOLO para hacer una Constitución nueva, separada del Gobierno, y luego se disuelven. Solo así nace una Democracia.",
        status: "PROTOCOL_ALPHA"
    }
];

export function FAQ() {
    const [selected, setSelected] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);

    return (
        <section id="faq" className="py-32 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-zinc-950 to-zinc-950 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-900/50 to-transparent opacity-50" />

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="flex flex-col items-center mb-16 text-center">
                    <div className="flex items-center gap-3 mb-4 text-red-500/80">
                        <Siren className="w-5 h-5 animate-pulse" />
                        <span className="font-mono text-xs uppercase tracking-[0.2em]">Registro de Interrogatorio</span>
                        <Siren className="w-5 h-5 animate-pulse" />
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-4 italic">
                        Desclasificando <span className="text-red-600">La Verdad</span>
                    </h2>
                    <p className="text-zinc-500 max-w-2xl text-lg">
                        Acceso al archivo central. Respuestas directas a las mentiras del Régimen.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 h-auto lg:h-[600px]">
                    {/* LEFT COLUMN: QUESTION LIST */}
                    <div className="lg:col-span-5 flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
                        {faqs.map((faq, index) => (
                            <button
                                key={index}
                                onClick={() => setSelected(index)}
                                className={cn(
                                    "w-full text-left p-6 border-l-2 transition-all duration-300 relative group overflow-hidden",
                                    selected === index
                                        ? "bg-zinc-900 border-red-600"
                                        : "bg-zinc-900/30 border-zinc-800 hover:bg-zinc-900/60 hover:border-zinc-700"
                                )}
                            >
                                {/* Active 'Scan' Effect */}
                                {selected === index && (
                                    <motion.div
                                        layoutId="scan-line"
                                        className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent z-0"
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                    />
                                )}

                                <div className="relative z-10 flex items-start gap-4">
                                    <span className={cn(
                                        "font-mono text-xs mt-1",
                                        selected === index ? "text-red-500 font-bold" : "text-zinc-600 group-hover:text-zinc-500"
                                    )}>
                                        {faq.id}
                                    </span>
                                    <div>
                                        <h3 className={cn(
                                            "font-bold text-lg leading-tight mb-2 transition-colors",
                                            selected === index ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                                        )}>
                                            {faq.question}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <span className={cn(
                                                "text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm font-mono",
                                                selected === index ? "bg-red-500/20 text-red-400" : "bg-zinc-800 text-zinc-600"
                                            )}>
                                                {faq.status}
                                            </span>
                                        </div>
                                    </div>
                                    <ChevronRight className={cn(
                                        "absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300",
                                        selected === index ? "text-red-500 translate-x-0" : "text-zinc-700 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:-translate-x-2"
                                    )} />
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* RIGHT COLUMN: ANSWER PANE (DESKTOP) */}
                    <div className="lg:col-span-7 relative hidden lg:block">
                        <div className="h-full bg-black border border-zinc-800 p-8 md:p-12 relative flex flex-col justify-center overflow-hidden">
                            {/* Terminal Decorations */}
                            <div className="absolute top-4 left-4 flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-900/50" />
                                <div className="w-3 h-3 rounded-full bg-zinc-800" />
                                <div className="w-3 h-3 rounded-full bg-zinc-800" />
                            </div>
                            <div className="absolute top-4 right-6 text-zinc-700 font-mono text-xs">
                                ENCRYPTED_CONNECTION_SECURE
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selected}
                                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                                    transition={{ duration: 0.3 }}
                                    className="relative z-10"
                                >
                                    <div className="mb-6 flex items-center gap-4 text-red-500/50">
                                        <FileText className="w-8 h-8" />
                                        <div className="h-px bg-red-900/30 flex-grow" />
                                        <span className="font-mono text-sm">EVIDENCE_LOG_{faqs[selected].id}</span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-red-600 pl-6">
                                        {faqs[selected].question}
                                    </h3>

                                    <div className="font-mono text-lg text-green-400/90 leading-relaxed space-y-4">
                                        <p>
                                            <span className="text-green-600 mr-2">{">"}</span>
                                            {faqs[selected].answer}
                                        </p>
                                        <div className="w-4 h-6 bg-green-500/50 animate-pulse inline-block align-middle ml-1" />
                                    </div>

                                    <div className="mt-12 flex items-center gap-4 text-zinc-600 font-mono text-xs">
                                        <CornerDownRight className="w-4 h-4" />
                                        <span>FUENTE VERIFICADA: RC_ARCHIVE_2024</span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Background Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.5)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20" />
                        </div>
                    </div>

                    {/* MOBILE DISPLAY (Shows corresponding answer below list selection on mobile - Simplified) */}
                    <div className="lg:hidden col-span-12 mt-4 bg-black border border-zinc-800 p-6 rounded-sm">
                        <div className="flex items-center gap-2 text-red-500 mb-4 font-mono text-xs uppercase">
                            <CornerDownRight className="w-4 h-4" />
                            Respuesta del Archivo
                        </div>
                        <p className="font-mono text-green-400 text-sm leading-relaxed">
                            <span className="text-green-600 mr-2">{">"}</span>
                            {faqs[selected].answer}
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
