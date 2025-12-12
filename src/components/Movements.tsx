"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Megaphone, Ban, Vote } from "lucide-react";
import { InfoModal } from "@/components/InfoModal";
import { siteConfig } from "@config";

export function Movements() {
    const [modalConfig, setModalConfig] = useState<{
        isOpen: boolean;
        title: string;
        content: React.ReactNode;
        footerAction?: React.ReactNode;
    }>({
        isOpen: false,
        title: "",
        content: null
    });

    const closeModal = () => setModalConfig(prev => ({ ...prev, isOpen: false }));

    const openModal = (title: string, content: React.ReactNode, footerAction?: React.ReactNode) => {
        setModalConfig({
            isOpen: true,
            title,
            content,
            footerAction
        });
    };

    return (
        <section id="movements" className="py-24 bg-primary text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Movimientos Inmediatos</h2>
                    <p className="text-white/80 max-w-2xl mx-auto">
                        La teoría sin acción es estéril. Únete a las campañas activas para forzar el cambio.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* ABSTENCIÓN */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 text-center"
                    >
                        <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Ban className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{siteConfig.movements.abstencion.title}</h3>
                        <p className="text-white/80 mb-6">
                            {siteConfig.movements.abstencion.desc}
                        </p>
                        <button
                            onClick={() => openModal(
                                siteConfig.movements.abstencion.modalData.title,
                                <div className="space-y-4">
                                    {siteConfig.movements.abstencion.modalData.paragraphs.map((p, i) => (
                                        <p key={i} className="text-white/90 leading-relaxed">{p}</p>
                                    ))}
                                </div>,
                                <Link
                                    href="/abstencion"
                                    className="px-6 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 inline-block"
                                >
                                    {siteConfig.movements.abstencion.action}
                                </Link>
                            )}
                            className="w-full py-3 bg-white text-primary font-bold rounded hover:bg-gray-100 transition-colors"
                        >
                            Ver Detalles
                        </button>
                    </motion.div>

                    {/* DIFUSIÓN */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 text-center"
                    >
                        <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Megaphone className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{siteConfig.movements.difusion.title}</h3>
                        <p className="text-white/80 mb-6">
                            {siteConfig.movements.difusion.desc}
                        </p>
                        <button
                            onClick={() => openModal(
                                siteConfig.movements.difusion.modalData.title,
                                <div className="space-y-4">
                                    {siteConfig.movements.difusion.modalData.paragraphs.map((p, i) => (
                                        <p key={i} className="text-white/90 leading-relaxed">{p}</p>
                                    ))}
                                </div>,
                                <Link
                                    href="/difusion"
                                    className="px-6 py-2 bg-emerald-600 text-white font-bold rounded hover:bg-emerald-700 inline-block"
                                >
                                    {siteConfig.movements.difusion.action}
                                </Link>
                            )}
                            className="w-full py-3 bg-white text-primary font-bold rounded hover:bg-gray-100 transition-colors"
                        >
                            Material de Campaña
                        </button>
                    </motion.div>

                    {/* ASOCIACIONES */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 text-center"
                    >
                        <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Vote className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{siteConfig.movements.asociacion.title}</h3>
                        <p className="text-white/80 mb-6">
                            {siteConfig.movements.asociacion.desc}
                        </p>
                        <button
                            onClick={() => openModal(
                                siteConfig.movements.asociacion.modalData.title,
                                <div className="space-y-4">
                                    {siteConfig.movements.asociacion.modalData.paragraphs.map((p, i) => (
                                        <p key={i} className="text-white/90 leading-relaxed">{p}</p>
                                    ))}
                                </div>,
                                <Link
                                    href="/asociaciones"
                                    className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 inline-block"
                                >
                                    {siteConfig.movements.asociacion.action}
                                </Link>
                            )}
                            className="w-full py-3 bg-white text-primary font-bold rounded hover:bg-gray-100 transition-colors"
                        >
                            Organizarse
                        </button>
                    </motion.div>
                </div>
            </div>

            <InfoModal
                // ... (keep rest unchanged implicitly by targeting)

                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                title={modalConfig.title}
                content={modalConfig.content}
                footerAction={modalConfig.footerAction}
            />
        </section>
    );
}
