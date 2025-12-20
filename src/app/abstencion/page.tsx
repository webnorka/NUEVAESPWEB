"use client";

import { motion } from "framer-motion";
import { Ban, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AbstencionPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send data to your backend
        setTimeout(() => setSubmitted(true), 1000);
    };

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <div className="flex-grow flex items-center justify-center relative overflow-hidden py-24">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background via-background/90 to-background z-0" />

                <div className="container mx-auto px-4 relative z-10 w-full max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="grid md:grid-cols-2 gap-12 items-center"
                    >
                        {/* Left Column: Text */}
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
                                <Ban className="w-4 h-4" />
                                <span>Acción Directa</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                                Abstención <span className="text-red-600">Activa</span>
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                No validamos un sistema corrupto. Al registrarte, te unes a la red de ciudadanos que retiran su consentimiento para forzar un cambio real.
                            </p>

                            <ul className="space-y-4 pt-4">
                                {[
                                    "Deslegitimación del régimen actual",
                                    "Organización por distritos",
                                    "Sin cuotas ni afiliación política"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-medium">
                                        <CheckCircle2 className="w-5 h-5 text-red-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Column: Form */}
                        <div className="bg-card border border-border p-8 rounded-2xl shadow-2xl">
                            {!submitted ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <h3 className="text-xl font-bold">Únete a la Resistencia Civil</h3>

                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium">Nombre</label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                                            placeholder="Tu nombre"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">Correo Electrónico</label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                                            placeholder="correo@ejemplo.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="zip" className="text-sm font-medium">Código Postal</label>
                                        <input
                                            type="text"
                                            id="zip"
                                            required
                                            maxLength={5}
                                            className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                                            placeholder="28001"
                                        />
                                        <p className="text-xs text-muted-foreground">Para conectarte con tu distrito.</p>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 group"
                                    >
                                        Comprometerme
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </form>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center py-12 space-y-4"
                                >
                                    <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold">¡Gracias por tu valor!</h3>
                                    <p className="text-muted-foreground">
                                        Te hemos enviado un correo de confirmación. Revisa tu bandeja de entrada para los siguientes pasos.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="text-sm text-primary hover:underline mt-4"
                                    >
                                        Volver al inicio
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
