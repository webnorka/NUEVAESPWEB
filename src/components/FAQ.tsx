"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ShieldQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
    {
        question: "¿Qué es la 'Libertad Política Colectiva'?",
        answer: "Es la capacidad de la nación para decidir su forma de gobierno y redactar su constitución. Actualmente, los españoles tenemos libertades civiles, pero no libertad política para constituir nuestro Estado."
    },
    {
        question: "¿Por qué NO hay democracia en España?",
        answer: "Porque faltan los dos requisitos innegociables: 1) Separación de poderes en origen (el Ejecutivo no puede nombrar al Judicial). 2) Representación política directa (el diputado debe deberse a su distrito, no al jefe de partido)."
    },
    {
        question: "¿Qué es la Abstención Activa?",
        answer: "Es un acto político de beligerancia. No es quedarse en casa 'pasando'. Es ir activamente a deslegitimar el sistema negando el consentimiento a las listas de partido hasta que cambien las reglas de juego."
    },
    {
        question: "¿Cuál es la solución?",
        answer: "Forzar un periodo de Libertad Constituyente. Una vez deslegitimado el régimen por la abstención masiva, se debe abrir un proceso donde la nación elija representantes para redactar una nueva Constitución."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 bg-zinc-950 border-t border-white/5 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-white/20 to-transparent" />

            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex flex-col items-center mb-16 text-center">
                    <div className="bg-zinc-900 p-4 rounded-full border border-white/10 mb-6">
                        <ShieldQuestion className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                        INTERROGATORIO
                    </h2>
                    <p className="text-zinc-500 mt-4">Desmontando la retórica oficial.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={cn(
                                "border border-white/5 rounded-sm overflow-hidden transition-all duration-300",
                                openIndex === index ? "bg-zinc-900 border-white/20" : "bg-zinc-900/30 hover:bg-zinc-900/50"
                            )}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left group"
                            >
                                <span className={cn(
                                    "font-bold text-lg transition-colors font-mono",
                                    openIndex === index ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                                )}>
                                    <span className="text-red-600 mr-4">0{index + 1}.</span>
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={cn(
                                        "w-5 h-5 text-zinc-500 transition-transform duration-300",
                                        openIndex === index ? "rotate-180 text-white" : ""
                                    )}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="p-6 pt-0 pl-16 text-gray-300 leading-relaxed border-t border-white/5 font-light">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
