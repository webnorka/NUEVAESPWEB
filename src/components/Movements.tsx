"use client";

import Link from "next/link";
import { useState } from "react";
import { Megaphone, Ban, Vote, ArrowRight } from "lucide-react";
import { InfoModal } from "@/components/InfoModal";
import { BentoGrid, BentoGridItem } from "./reactbits/BentoGrid";
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

    const MovementItem = ({ icon: Icon, config, colorClass, link }: { icon: any, config: any, colorClass: string, link: string }) => (
        <div
            onClick={() => openModal(
                config.modalData.title,
                <div className="space-y-4">
                    {config.modalData.paragraphs.map((p: string, i: number) => (
                        <p key={i} className="text-white/90 leading-relaxed">{p}</p>
                    ))}
                </div>,
                <Link
                    href={link}
                    className={`px-6 py-2 ${colorClass.replace('text-', 'bg-')} text-white font-bold rounded hover:opacity-90 inline-block`}
                >
                    {config.action}
                </Link>
            )}
            className="cursor-pointer group h-full flex flex-col justify-between"
        >
            <div>
                <div className={`w-12 h-12 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${colorClass}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-100 mb-2 group-hover:text-white transition-colors">
                    {config.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                    {config.desc}
                </p>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
                <span>Protocolo de Acción</span>
                <ArrowRight className="w-4 h-4" />
            </div>
        </div>
    );

    return (
        <section id="movements" className="py-24 bg-zinc-950 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">
                        Protocolos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Resistencia</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Selecciona tu misión. La pasividad es complicidad.
                    </p>
                </div>

                <BentoGrid className="max-w-6xl mx-auto">
                    {/* Grande - Abstención */}
                    <BentoGridItem
                        className="md:col-span-2 bg-zinc-900/50 border-red-900/20 hover:border-red-500/50 transition-all"
                        header={
                            <MovementItem
                                icon={Ban}
                                config={siteConfig.movements.abstencion}
                                colorClass="text-red-500"
                                link="/abstencion"
                            />
                        }
                    />

                    {/* Pequeño - Difusión */}
                    <BentoGridItem
                        className="md:col-span-1 bg-zinc-900/50 border-emerald-900/20 hover:border-emerald-500/50 transition-all"
                        header={
                            <MovementItem
                                icon={Megaphone}
                                config={siteConfig.movements.difusion}
                                colorClass="text-emerald-500"
                                link="/difusion"
                            />
                        }
                    />

                    {/* Pequeño - Asociación */}
                    <BentoGridItem
                        className="md:col-span-1 bg-zinc-900/50 border-blue-900/20 hover:border-blue-500/50 transition-all"
                        header={
                            <MovementItem
                                icon={Vote}
                                config={siteConfig.movements.asociacion}
                                colorClass="text-blue-500"
                                link="/asociaciones"
                            />
                        }
                    />

                    {/* Placeholder para futura expansión o CTA final */}
                    <BentoGridItem
                        className="md:col-span-2 bg-gradient-to-br from-zinc-900 to-black border-white/5 flex flex-col justify-center items-center text-center p-8 group cursor-pointer"
                        header={
                            <div className="flex flex-col items-center justify-center h-full">
                                <h3 className="text-2xl font-black text-white mb-2 uppercase">Únete a la Vanguardia</h3>
                                <p className="text-zinc-500 mb-6">Recibe instrucciones directas y material confidencial.</p>
                                <button className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors w-auto">
                                    Suscribirse
                                </button>
                            </div>
                        }
                    />
                </BentoGrid>
            </div>

            <InfoModal
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                title={modalConfig.title}
                content={modalConfig.content}
                footerAction={modalConfig.footerAction}
            />
        </section>
    );
}
