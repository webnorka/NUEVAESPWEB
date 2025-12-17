"use client";

import Link from "next/link";
import { useState } from "react";
import { Megaphone, Ban, Vote, ArrowRight, ShieldCheck, Target } from "lucide-react";
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

    const MovementCard = ({ icon: Icon, config, colorClass, link, borderColor, index }: { icon: any, config: any, colorClass: string, link: string, borderColor: string, index: number }) => (
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
            className={`group cursor-pointer relative bg-zinc-900/40 border ${borderColor} hover:border-opacity-100 hover:bg-zinc-900 transition-all duration-300 h-full flex flex-col`}
        >
            <div className="absolute top-0 right-0 p-4 opacity-50 font-mono text-xs text-zinc-600">
                PROT-{String(index + 1).padStart(2, '0')}
            </div>

            <div className="p-8 flex flex-col h-full">
                <div className={`w-16 h-16 rounded-xl bg-zinc-950 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${colorClass}`}>
                    <Icon className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight group-hover:text-zinc-100 transition-colors">
                    {config.title}
                </h3>

                <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">
                    {config.desc}
                </p>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
                        Protocolo de Acción
                    </span>
                    <ArrowRight className={`w-4 h-4 text-zinc-600 group-hover:translate-x-1 transition-transform ${colorClass}`} />
                </div>
            </div>

            {/* Corner accents */}
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-700/50 group-hover:border-white/50 transition-colors" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-700/50 group-hover:border-white/50 transition-colors" />
        </div>
    );

    return (
        <section id="movements" className="py-24 bg-zinc-950 relative border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">
                            Protocolos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Resistencia</span>
                        </h2>
                        <p className="text-zinc-500 font-mono uppercase tracking-widest text-sm">
                            Selecciona tu misión. La pasividad es complicidad.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {/* 01: Abstención */}
                    <MovementCard
                        index={0}
                        icon={Ban}
                        config={siteConfig.movements.abstencion}
                        colorClass="text-red-500"
                        borderColor="border-red-900/30"
                        link="/abstencion"
                    />

                    {/* 02: Difusión */}
                    <MovementCard
                        index={1}
                        icon={Megaphone}
                        config={siteConfig.movements.difusion}
                        colorClass="text-emerald-500"
                        borderColor="border-emerald-900/30"
                        link="/difusion"
                    />

                    {/* 03: Asociación */}
                    <MovementCard
                        index={2}
                        icon={Vote}
                        config={siteConfig.movements.asociacion}
                        colorClass="text-blue-500"
                        borderColor="border-blue-900/30"
                        link="/asociaciones"
                    />
                </div>

                {/* Final Call to Action - Separated for impact */}
                <div className="mt-16 max-w-7xl mx-auto">
                    <div className="bg-gradient-to-r from-zinc-900 to-black border border-white/10 p-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-all duration-700" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                            <div>
                                <h3 className="text-3xl font-black text-white mb-2 uppercase italic">¿Estás listo para la Vanguardia?</h3>
                                <p className="text-zinc-400 max-w-xl">
                                    Recibe instrucciones directas, material confidencial y alertas de acción rápida. Sin spam, solo resistencia parriotica.
                                </p>
                            </div>

                            <button className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors w-full md:w-auto flex items-center justify-center gap-3">
                                <Target className="w-5 h-5" />
                                <span>Unirse Ahora</span>
                            </button>
                        </div>
                    </div>
                </div>
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
