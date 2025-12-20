"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, ExternalLink, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@config";

interface SourcesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const sources = [
    {
        title: "Informe del Grupo Verdes/ALE (2018)",
        desc: "Estudio sobre el coste de la corrupción en la UE. Identifica a España como uno de los países más afectados, con un coste estimado del 8% del PIB.",
        url: "https://www.greens-efa.eu/priorities/corruption/",
        type: "PDF Oficial"
    },
    {
        title: "Ejecución Presupuestaria Seguridad Social (2024)",
        desc: "Datos oficiales de transferencias del Estado a la Tesorería General. Muestra que las pensiones no se sostienen solo con cotizaciones.",
        url: "https://www.seg-social.es/",
        type: "Presupuestos Generales"
    },
    {
        title: "Sentencias Caso ERE y Gürtel",
        desc: "Sentencias firmes del Tribunal Supremo que acreditan los sistemas de financiación ilegal y malversación sistémica.",
        url: "https://www.poderjudicial.es/search/index.jsp",
        type: "Judicial"
    }
];

export function SourcesModal({ isOpen, onClose }: SourcesModalProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleEscape);
        }
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 shadow-2xl overflow-hidden"
                >
                    {/* Header: Classified Style */}
                    <div className="bg-red-900/20 border-b border-red-500/30 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <ShieldAlert className="text-red-500 w-5 h-5 animate-pulse" />
                            <h3 className="font-mono font-bold text-red-500 tracking-widest uppercase">
                                EXPEDIENTE: FUENTES ACREDITADAS
                            </h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                        <p className="text-gray-400 text-sm">
                            La veracidad es nuestra arma. Aquí están las pruebas que sustentan la denuncia.
                        </p>

                        <div className="grid gap-4">
                            {sources.map((source, idx) => (
                                <div key={idx} className="bg-black/40 border border-white/5 p-4 hover:border-white/20 transition-all group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-white group-hover:text-red-400 transition-colors">
                                            {source.title}
                                        </h4>
                                        <span className="text-[10px] uppercase font-mono bg-white/10 px-2 py-1 rounded text-gray-400">
                                            {source.type}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4 font-mono leading-relaxed">
                                        {source.desc}
                                    </p>
                                    <Link
                                        href={source.url}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 text-xs text-white hover:underline decoration-red-500 underline-offset-4"
                                    >
                                        <ExternalLink className="w-3 h-3" />
                                        CONSULTAR DOCUMENTO ORIGINAL
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 border-t border-white/10 bg-black/20 text-center">
                        <p className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em]">
                            CONFIDENCIALIDAD: PÚBLICA // ACCESO: NIVEL CIUDADANO
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
