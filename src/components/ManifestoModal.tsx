"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, ScrollText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { BlurText } from "./reactbits/BlurText";

interface ManifestoModalProps {
    content: string;
    trigger?: React.ReactNode;
}

export function ManifestoModal({ content, trigger }: ManifestoModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Prevent background scrolling when modal is open and handle Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleEscape);
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    return (
        <>
            <div onClick={() => setIsOpen(true)}>
                {trigger || (
                    <button className="px-8 py-4 bg-primary text-white rounded-lg font-bold hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(190,18,60,0.3)] hover:shadow-[0_0_30px_rgba(190,18,60,0.5)] flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Leer Manifiesto
                    </button>
                )}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl h-[85vh] bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0A0A0A]/95 backdrop-blur z-10">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <BookOpen className="w-6 h-6" />
                                    </div>
                                    <BlurText
                                        text="Manifiesto de la Nueva España"
                                        className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
                                        delay={100}
                                    />
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Content */}
                            <div
                                className="flex-1 overflow-y-auto p-8 custom-scrollbar overscroll-contain"
                                style={{
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: 'var(--primary) transparent'
                                }}
                            >
                                <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-primary prose-a:text-accent hover:prose-a:underline prose-blockquote:border-l-primary prose-blockquote:bg-white/5 prose-blockquote:p-4 prose-blockquote:rounded-r">
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-white/10 bg-[#0A0A0A] z-10 flex justify-end">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-medium transition-colors"
                                >
                                    Cerrar Documento
                                </button>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10 pointer-events-none" />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
