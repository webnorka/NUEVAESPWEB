"use client";

import Link from "next/link";
import { useState } from "react";
import { Megaphone, Ban, Vote, ArrowRight, ShieldCheck, Target } from "lucide-react";
import { InfoModal } from "@/components/InfoModal";
import { siteConfig } from "@config";

interface MovementConfig {
    title: string;
    desc: string;
    action: string;
    modalData: {
        title: string;
        paragraphs: string[];
    };
}

const MovementCard = ({ icon: Icon, config, colorClass, link, borderColor, index, openModal }: {
    icon: React.ComponentType<{ className?: string }>,
    config: MovementConfig,
    colorClass: string,
    link: string,
    borderColor: string,
    index: number,
    openModal: (title: string, content: React.ReactNode, footerAction?: React.ReactNode) => void
}) => (
    <div
        onClick={() => openModal(
            config.modalData.title,
            <div className="space-y-6 py-4">
                <div className="flex items-center gap-3 text-primary/60 font-mono text-[10px] uppercase tracking-[0.3em] mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Briefing de Operaciones</span>
                </div>
                {config.modalData.paragraphs.map((p: string, i: number) => (
                    <p key={i} className="text-foreground/90 leading-relaxed font-medium italic border-l-2 border-white/5 pl-4">{p}</p>
                ))}
            </div>,
            <Link
                href={link}
                className={`px-8 py-3 ${colorClass.replace('text-', 'bg-')} text-primary-foreground font-black uppercase italic tracking-widest rounded-sm hover:scale-105 transition-transform inline-block shadow-[0_0_20px_rgba(0,0,0,0.3)]`}
            >
                {config.action}
            </Link>
        )}
        className={`group cursor-pointer relative bg-surface/20 border ${borderColor} hover:bg-surface/40 transition-all duration-500 h-full flex flex-col rounded-sm overflow-hidden`}
    >
        {/* Scanning line effect on hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-1/2 -translate-y-full group-hover:animate-[scan_3s_linear_infinite]" />
        </div>

        <div className="absolute top-0 right-0 p-4 flex flex-col items-end gap-1">
            <span className="font-mono text-[8px] text-muted/30 uppercase tracking-[0.3em]">Status: Ready</span>
            <span className="font-mono text-[10px] text-primary/60 font-black">PROT-{String(index + 1).padStart(2, '0')}</span>
        </div>

        <div className="p-10 flex flex-col h-full relative z-10">
            <div className={`w-14 h-14 rounded-sm bg-background border border-white/5 flex items-center justify-center mb-8 group-hover:border-primary/30 transition-all duration-500 ${colorClass} shadow-inner`}>
                <Icon className="w-7 h-7 group-hover:scale-110 transition-transform duration-500" />
            </div>

            <h3 className="text-3xl font-black text-foreground mb-4 uppercase italic tracking-tighter group-hover:text-primary transition-colors duration-300">
                {config.title}
            </h3>

            <p className="text-muted/80 leading-relaxed mb-10 flex-grow font-medium text-sm italic">
                {config.desc}
            </p>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted/40 group-hover:text-foreground transition-colors">
                    Desplegar Protocolo
                </span>
                <div className={`p-2 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors`}>
                    <ArrowRight className={`w-4 h-4 text-muted group-hover:translate-x-1 transition-transform duration-300 ${colorClass}`} />
                </div>
            </div>
        </div>

        {/* Tactical border accents */}
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/5 group-hover:border-primary/40 transition-colors duration-500" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/5 group-hover:border-primary/40 transition-colors duration-500" />
    </div>
);

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
        <section id="movements" className="py-32 bg-background relative border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-24">
                    <h2 className="text-5xl md:text-7xl font-black text-foreground mb-6 uppercase tracking-tighter italic">
                        Protocolos de <span className="text-primary">Resistencia</span>
                    </h2>
                    <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed uppercase tracking-widest text-sm font-mono">
                        Selecciona tu misión. La pasividad es complicidad.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    <MovementCard
                        index={0}
                        icon={Ban}
                        config={siteConfig.movements.abstencion}
                        colorClass="text-primary"
                        borderColor="border-primary/20"
                        link={siteConfig.links.abstencion}
                        openModal={openModal}
                    />

                    <MovementCard
                        index={1}
                        icon={Megaphone}
                        config={siteConfig.movements.difusion}
                        colorClass="text-success"
                        borderColor="border-success/20"
                        link={siteConfig.links.difusion}
                        openModal={openModal}
                    />

                    <MovementCard
                        index={2}
                        icon={Vote}
                        config={siteConfig.movements.asociacion}
                        colorClass="text-accent"
                        borderColor="border-accent/20"
                        link={siteConfig.links.asociaciones}
                        openModal={openModal}
                    />
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
