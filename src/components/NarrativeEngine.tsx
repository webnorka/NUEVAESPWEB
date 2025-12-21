"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { NARRATIVE_DATA, NarrativeStep } from '@/data/narrative';
import { TextReveal } from './vanguard/TextReveal';
import { MagneticCard } from './vanguard/MagneticCard';
import { VisualSiren } from './vanguard/VisualSiren';
import { GlitchIntro } from './vanguard/GlitchIntro';
import { ArrowRight, Shield, AlertTriangle, ChevronRight } from 'lucide-react';

export function SceneManager() {
    const router = useRouter();
    const [showIntro, setShowIntro] = useState(true);
    const [currentStepId, setCurrentStepId] = useState('start');
    const step = NARRATIVE_DATA.find(s => s.id === currentStepId);

    if (!step) return null;

    const handleNext = (id: string) => {
        if (id.startsWith('/')) {
            router.push(id);
        } else {
            setCurrentStepId(id);
        }
    };

    return (
        <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-background">
            <AnimatePresence>
                {showIntro && <GlitchIntro onComplete={() => setShowIntro(false)} />}
            </AnimatePresence>

            <VisualSiren />

            <AnimatePresence mode="wait">
                <motion.div
                    key={step.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="z-10 w-full max-w-6xl px-6 flex flex-col items-center justify-center min-h-0"
                >
                    {step.type === 'statement' && (
                        <div className="flex flex-col items-center">
                            <TextReveal text={step.content} subtext="NUEVA ESPAÑA // COMUNICADO" />
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
                                onClick={() => step.nextId && handleNext(step.nextId)}
                                className="group relative px-8 py-4 bg-primary text-primary-foreground text-lg font-bold tracking-tight overflow-hidden rounded-sm hover:scale-[1.02] transition-transform duration-200 shadow-lg shadow-primary/20"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                <span className="relative flex items-center gap-2">
                                    Iniciar Operación <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </motion.button>
                        </div>
                    )}

                    {(step.type === 'chat' || step.type === 'visual') && (
                        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center w-full">
                            <div className="space-y-4 md:space-y-6 text-center lg:text-left">
                                <motion.div
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-primary font-mono text-[10px] uppercase font-bold tracking-widest"
                                >
                                    <Shield className="w-3 h-3" /> Comunicación Directa
                                </motion.div>
                                <h2 className="text-[clamp(1.2rem,4vw,3.5rem)] font-black text-white italic uppercase leading-[0.95] tracking-tighter">
                                    {step.content}
                                </h2>

                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-[100px] animate-pulse" />
                                <MagneticCard
                                    className="aspect-square max-h-[35vh] md:max-h-[45vh] flex items-center justify-center"
                                    onClick={() => step.nextId && handleNext(step.nextId)}
                                >
                                    <div className="text-center space-y-6">
                                        <AlertTriangle className="w-20 h-20 text-primary mx-auto animate-bounce" />
                                        <div className="space-y-2">
                                            <p className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.2em]">Pulsar elemento para continuar</p>
                                            <p className="text-white text-2xl font-black uppercase tracking-tighter">Acción Política</p>
                                        </div>
                                    </div>
                                </MagneticCard>
                            </div>
                        </div>
                    )}

                    {step.type === 'choice' && (
                        <div className="flex flex-col items-center">
                            <motion.h3
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-[clamp(1.1rem,3vw,2rem)] font-black text-white uppercase italic tracking-tighter mb-4 text-center"
                            >
                                {step.content}
                            </motion.h3>
                            <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl py-4">
                                {step.options?.map((opt, i) => (
                                    <MagneticCard
                                        key={opt.nextId}
                                        className="h-32 md:h-40"
                                        onClick={() => handleNext(opt.nextId)}
                                    >
                                        <div className="h-full flex flex-col justify-between p-2">
                                            <span className="text-3xl font-black text-white/5 group-hover:text-primary/20 transition-colors">0{i + 1}</span>
                                            <p className="text-lg font-bold text-white group-hover:text-primary transition-colors">{opt.label}</p>
                                            <div className="mt-4 h-px bg-white/10 group-hover:bg-primary/50 transition-colors" />
                                        </div>
                                    </MagneticCard>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Cinematic HUD Overlay */}
            <div className="fixed inset-0 pointer-events-none border-[1px] border-white/5 m-4 md:m-8" />
        </div>
    );
}
