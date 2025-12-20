"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Terminal, ArrowRight, Construction } from 'lucide-react';

export type BannerLevel = 'INFO' | 'WARNING' | 'URGENT' | 'VANGUARD';

interface VanguardDialogProps {
    id: string;
    level?: BannerLevel;
    message: string;
    submessage?: string;
    persistent?: boolean;
}

export function VanguardDialog({
    id,
    level = 'VANGUARD',
    message,
    submessage,
    persistent = true
}: VanguardDialogProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const handleDismiss = useCallback(() => {
        if (persistent) {
            localStorage.setItem(`ne_banner_${id}`, 'true');
        }
        setIsVisible(false);
        document.body.style.overflow = 'unset';
    }, [id, persistent]);

    useEffect(() => {
        setIsMounted(true);
        const hasSeen = localStorage.getItem(`ne_banner_${id}`);
        if (!hasSeen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        }

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleDismiss();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [id, handleDismiss]);

    if (!isMounted || !isVisible) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                {/* Backdrop with extreme blur */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
                />

                {/* Dialog Content */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="relative w-full max-w-lg"
                >
                    {/* Decorative Border Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-red-900/50 rounded-xl blur-lg opacity-30" />

                    <div className="relative bg-zinc-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                        {/* Header/Status Bar */}
                        <div className="bg-white/5 border-b border-white/5 px-6 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-primary" />
                                <span className="font-mono text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-400">
                                    System Notification // {id}
                                </span>
                            </div>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-primary/20" />
                                <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="p-8 space-y-6">
                            <div className="flex justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                                    <Construction className="w-16 h-16 text-primary relative" />
                                </div>
                            </div>

                            <div className="text-center space-y-3">
                                <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
                                    {message}
                                </h2>
                                <p className="text-zinc-400 font-mono text-sm leading-relaxed">
                                    {submessage || "Nuestra infraestructura digital está siendo reconfigurada para garantizar la soberanía del ciudadano."}
                                </p>
                            </div>

                            {/* Action Area */}
                            <div className="pt-4">
                                <button
                                    onClick={handleDismiss}
                                    className="group relative w-full py-4 bg-primary text-white font-black uppercase tracking-widest text-sm overflow-hidden rounded-sm transition-all hover:shadow-[0_0_30px_rgba(190,18,60,0.4)]"
                                >
                                    <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 mix-blend-difference" />
                                    <span className="relative flex items-center justify-center gap-2">
                                        Procesar Entrada <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="bg-primary/5 px-8 py-4 flex items-center justify-center border-t border-white/5">
                            <span className="text-[9px] font-mono text-primary uppercase font-bold tracking-[0.3em]">
                                Vanguard OS v2.1.0 // Access Secured
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
