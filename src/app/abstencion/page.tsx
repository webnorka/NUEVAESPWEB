"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Cpu, Target, Lock } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@config";

export default function AbstencionPage() {

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col pt-20">
            <div className="flex-grow flex flex-col relative overflow-hidden">
                {/* Tactical Background Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(225,29,72,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(225,29,72,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                {/* Header Section */}
                <div className="container mx-auto px-4 py-20 relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-sm bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono uppercase tracking-[0.3em] mb-8"
                        >
                            <ShieldAlert className="w-4 h-4 animate-pulse" />
                            <span>Protocolo de Deslegitimación ACTIVA // Fase II</span>
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.85] mb-8 uppercase">
                            Abstención <br />
                            <span className="text-primary italic">Activa</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted leading-relaxed max-w-2xl mx-auto font-medium italic">
                            Retira tu consentimiento. Deslegitima el teatro de la Partidocracia. La libertad no se pide, se ejerce dejando de ser súbdito.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-start max-w-7xl mx-auto">

                        {/* LEFT COLUMN: TACTICAL INFO */}
                        <div className="lg:col-span-7 space-y-8">
                            <div className="bg-surface/20 border border-white/5 p-8 rounded-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Cpu className="w-12 h-12" />
                                </div>
                                <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground mb-6 flex items-center gap-3">
                                    <Target className="w-5 h-5 text-primary" />
                                    Objetivos de la Misión
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        { title: "Deslegitimación", desc: "Reducir la base de consentimiento del Régimen del 78." },
                                        { title: "Control Civil", desc: "Organización por distritos para fiscalización real." },
                                        { title: "Libertad Política", desc: "Forzar un Periodo de Libertad Constituyente." },
                                        { title: "Sin Partidos", desc: "Independencia total de la estructura estatal actual." }
                                    ].map((item, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex items-center gap-2 text-primary">
                                                <div className="w-1 h-3 bg-primary" />
                                                <span className="font-bold text-xs uppercase tracking-widest">{item.title}</span>
                                            </div>
                                            <p className="text-sm text-muted font-medium italic">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-background border border-white/5 p-8 rounded-sm">
                                <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground mb-8">Protocolo de Actuación</h3>
                                <div className="space-y-6">
                                    {[
                                        "No participar en ningún proceso electoral del Régimen.",
                                        "Hacer pública la condición de abstencionista activo.",
                                        "Integrarse en los núcleos de control de distrito.",
                                        "Propagar los fundamentos de la Libertad Política Colectiva."
                                    ].map((step, i) => (
                                        <div key={i} className="flex gap-4 group">
                                            <span className="font-mono text-primary font-bold text-lg opacity-50 group-hover:opacity-100 transition-opacity">
                                                0{i + 1}
                                            </span>
                                            <div className="flex-grow pt-1">
                                                <p className="text-foreground font-medium italic group-hover:text-primary transition-colors">{step}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: RECRUITMENT FORM */}
                        <div className="lg:col-span-5 relative">
                            {/* Form Decoration */}
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-50" />

                            {/* RIGHT COLUMN: RECRUITMENT CTA */}
                            <div className="lg:col-span-5 relative">
                                {/* Decoration */}
                                <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-50" />

                                <div className="bg-surface border-2 border-primary/20 p-8 md:p-12 rounded-sm relative z-10 shadow-2xl overflow-hidden hover:border-primary/40 transition-colors duration-500">
                                    {/* Scanning Effect */}
                                    <div className="absolute inset-0 pointer-events-none opacity-20">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent h-1/2 -translate-y-full animate-[scan_4s_linear_infinite]" />
                                    </div>

                                    <div className="relative z-10 space-y-8">
                                        <div className="text-center">
                                            <div className="w-20 h-20 bg-primary/10 text-primary rounded-sm flex items-center justify-center mx-auto mb-8 border border-primary/20">
                                                <ShieldAlert className="w-10 h-10" />
                                            </div>
                                            <h3 className="text-3xl font-black uppercase italic tracking-tighter text-foreground mb-4">Unirse a la Resistencia</h3>
                                            <p className="text-muted leading-relaxed italic font-medium">
                                                Centralizamos nuestra base operativa para garantizar la seguridad y coordinación nacional. Regístrate en el portal oficial para activar tu núcleo de abstención.
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <Link
                                                href={`${siteConfig.links.signup}?commitment=active_abstention`}
                                                className="w-full py-5 bg-primary hover:bg-primary-muted text-primary-foreground font-black uppercase italic tracking-[0.3em] rounded-sm transition-all flex items-center justify-center gap-3 group active:scale-[0.98] shadow-lg shadow-primary/20"
                                            >
                                                <Target className="w-5 h-5 group-hover:scale-125 transition-transform" />
                                                Activar Mi Compromiso
                                            </Link>

                                            <div className="flex items-center justify-center gap-2 text-muted/30 font-mono text-[8px] uppercase tracking-widest pt-2">
                                                <Lock className="w-3 h-3" />
                                                <span>Encriptación de Nivel Civil // Canal Seguro</span>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-white/5">
                                            <p className="text-[10px] text-muted/40 font-mono text-center uppercase tracking-tight leading-relaxed">
                                                Al registrarte, serás asignado a tu sector geográfico y recibirás instrucciones tácticas específicas para tu distrito operacional.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Tactical HUD decoration */}
                                <div className="mt-8 border-t border-white/5 pt-4 flex justify-between items-center font-mono text-[8px] text-muted/20 uppercase tracking-widest">
                                    <span>Sec-Ops: Civil Resistance</span>
                                    <span>Unit: Active_Citizen</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
