"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
    {
        question: "¿Qué es la 'Libertad Política Colectiva'?",
        answer: "Es la capacidad de la nación para decidir su forma de gobierno y redactar su constitución. Actualmente, los españoles tenemos libertades civiles, pero no libertad política para constituir nuestro Estado."
    },
    {
        question: "¿Por qué decimos que no hay democracia en España?",
        answer: "Porque no se cumplen los dos requisitos formales: separación de poderes en origen y representación política del elector. Vivimos en una oligarquía de partidos o partitocracia."
    },
    {
        question: "¿Qué es la abstención activa?",
        answer: "Es una acción política consciente de no legitimar con el voto un sistema corrupto. No es pasividad, es deslegitimación del régimen para forzar un cambio de reglas de juego."
    },
    {
        question: "¿Cuál es la solución propuesta?",
        answer: "Abrir un periodo de Libertad Constituyente donde la nación elija representantes para redactar una nueva Constitución que garantice la separación de poderes y la representación."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 bg-background">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Preguntas Frecuentes</h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-white/10 rounded-lg overflow-hidden bg-secondary/20"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="font-semibold text-lg">{faq.question}</span>
                                <ChevronDown
                                    className={cn(
                                        "w-5 h-5 transition-transform duration-300",
                                        openIndex === index ? "rotate-180" : ""
                                    )}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
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
