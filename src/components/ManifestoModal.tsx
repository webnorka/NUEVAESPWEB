"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen } from "lucide-react";

interface ManifestoModalProps {
    content: string;
    trigger?: React.ReactNode;
}

export function ManifestoModal({ content, trigger }: ManifestoModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Simple Markdown Parser (fallback for npm issues)
    const renderContent = (text: string) => {
        return text.split('\n').map((line, index) => {
            if (line.startsWith('# ')) {
                return <h1 key={index} className="text-3xl font-bold mb-4 mt-6 text-primary">{line.replace('# ', '')}</h1>;
            }
            if (line.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold mb-3 mt-5 text-foreground">{line.replace('## ', '')}</h2>;
            }
            if (line.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-semibold mb-2 mt-4 text-foreground/90">{line.replace('### ', '')}</h3>;
            }
            if (line.startsWith('> ')) {
                return <blockquote key={index} className="border-l-4 border-primary pl-4 italic text-gray-300 my-4 bg-white/5 p-4 rounded-r">{line.replace('> ', '')}</blockquote>;
            }
            if (line.startsWith('- ')) {
                return <li key={index} className="ml-6 list-disc mb-1 text-gray-300">{line.replace('- ', '')}</li>;
            }
            if (line.trim() === '---') {
                return <hr key={index} className="my-8 border-white/10" />;
            }
            if (line.trim() === '') {
                return <br key={index} />;
            }
            // Bold text formatting
            const parts = line.split(/(\*\*.*?\*\*)/g);
            return (
                <p key={index} className="mb-2 text-gray-300 leading-relaxed">
                    {parts.map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
                        }
                        return part;
                    })}
                </p>
            );
        });
    };

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
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-secondary w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl border border-white/10 flex flex-col"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-secondary">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <BookOpen className="text-primary" />
                                    Manifiesto de Libertad
                                </h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X />
                                </button>
                            </div>

                            <div className="overflow-y-auto p-8 custom-scrollbar">
                                <article className="prose prose-invert prose-lg max-w-none">
                                    {renderContent(content)}
                                </article>
                            </div>

                            <div className="p-6 border-t border-white/10 bg-secondary text-right">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
