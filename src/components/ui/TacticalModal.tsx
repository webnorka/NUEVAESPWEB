"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldAlert } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface TacticalModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    confirmLabel?: string;
    onConfirm?: () => void;
    confirmVariant?: "danger" | "success" | "neutral";
    loading?: boolean;
}

export function TacticalModal({
    isOpen,
    onClose,
    title,
    children,
    confirmLabel,
    onConfirm,
    confirmVariant = "neutral",
    loading = false
}: TacticalModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-zinc-950 border border-white/10 p-1 font-mono overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                    >
                        {/* Tactical border accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-600" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-600" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-600" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-600" />

                        {/* Header */}
                        <div className="flex items-center justify-between bg-zinc-900 px-4 py-3 border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <ShieldAlert className="w-4 h-4 text-red-600" />
                                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">
                                    {title}
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-white/10 text-zinc-500 hover:text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8">
                            <div className="text-sm text-zinc-400 leading-relaxed mb-8">
                                {children}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-3 border border-white/10 text-zinc-500 hover:text-white hover:bg-white/5 text-[10px] font-black uppercase tracking-widest transition-all"
                                >
                                    Cancelar
                                </button>
                                {confirmLabel && onConfirm && (
                                    <button
                                        onClick={onConfirm}
                                        disabled={loading}
                                        className={cn(
                                            "flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50",
                                            confirmVariant === "danger" && "bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(220,38,38,0.2)]",
                                            confirmVariant === "success" && "bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]",
                                            confirmVariant === "neutral" && "bg-white hover:bg-zinc-200 text-black"
                                        )}
                                    >
                                        {loading ? "Procesando..." : confirmLabel}
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Footer decorative line */}
                        <div className="px-8 pb-4">
                            <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent w-full" />
                            <div className="mt-2 text-[8px] text-zinc-700 text-center uppercase tracking-widest">
                                Protocolo de Comunicaciones Seguras v2.4
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
