"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: React.ReactNode;
    footerAction?: React.ReactNode;
}

export function InfoModal({ isOpen, onClose, title, content, footerAction }: InfoModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-secondary w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl border border-white/10 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-secondary/50">
                            <h2 className="text-2xl font-bold text-white leading-tight">
                                {title}
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto p-6 custom-scrollbar flex-1">
                            <div className="prose prose-invert max-w-none text-gray-300">
                                {content}
                            </div>
                        </div>

                        {/* Footer */}
                        {footerAction && (
                            <div className="p-6 border-t border-white/10 bg-secondary/50 flex justify-end gap-3">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors font-medium"
                                >
                                    Cerrar
                                </button>
                                {footerAction}
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
