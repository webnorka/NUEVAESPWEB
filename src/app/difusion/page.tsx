"use client";

import { motion } from "framer-motion";
import { Download, Share2, FileText, Image as ImageIcon, Video, Megaphone, ShieldCheck, Target, ExternalLink } from "lucide-react";

export default function DifusionPage() {
    const resources = [
        {
            category: "Inteligencia Táctica",
            desc: "Documentación fundamental para el combate ideológico.",
            icon: FileText,
            color: "text-accent",
            borderColor: "border-accent/20",
            bg: "bg-accent/5",
            items: [
                { title: "Manifiesto Fundacional.pdf", size: "1.2 MB" },
                { title: "Argumentario Básico.pdf", size: "850 KB" },
                { title: "Guía de Abstención.pdf", size: "2.4 MB" }
            ]
        },
        {
            category: "Kit de Propaganda",
            desc: "Activos digitales para el despliegue en redes sociales.",
            icon: ImageIcon,
            color: "text-primary",
            borderColor: "border-primary/20",
            bg: "bg-primary/5",
            items: [
                { title: "Pack Instagram Stories.zip", size: "15 MB" },
                { title: "Headers Twitter/X.zip", size: "5 MB" },
                { title: "Memes y Gráficos.zip", size: "45 MB" }
            ]
        },
        {
            category: "Contenido Multimedia",
            desc: "Material audiovisual para difusión masiva.",
            icon: Video,
            color: "text-success",
            borderColor: "border-success/20",
            bg: "bg-success/5",
            items: [
                { title: "Spot: La Mentira.mp4", size: "120 MB" },
                { title: "Entrevista Completa.mp3", size: "45 MB" }
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col pt-20">
            <div className="flex-grow flex flex-col relative overflow-hidden">
                {/* Tactical Overlays */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/5 via-background to-background pointer-events-none" />

                <div className="container mx-auto px-4 py-20 relative z-10">
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-sm bg-success/10 border border-success/20 text-success text-[10px] font-mono uppercase tracking-[0.3em] mb-8"
                        >
                            <Megaphone className="w-4 h-4 animate-pulse" />
                            <span>Repositorio de Activos Operativos // Central de Difusión</span>
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.85] mb-8 uppercase">
                            Centro de <br />
                            <span className="text-success italic">Difusión</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted leading-relaxed max-w-2xl mx-auto font-medium italic">
                            La verdad es el arma más letal. Descarga estos recursos y conviértete en un nodo de transmisión en la guerra por la información.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 max-w-7xl mx-auto">
                        {resources.map((section, idx) => (
                            <motion.div
                                key={section.category}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`bg-surface/20 border ${section.borderColor} rounded-sm p-8 relative overflow-hidden group hover:bg-surface/40 transition-all duration-500 flex flex-col`}
                            >
                                {/* Scanning Effect */}
                                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-1/2 -translate-y-full group-hover:animate-[scan_3s_linear_infinite]" />
                                </div>

                                <div className={`w-12 h-12 ${section.bg} ${section.color} border border-white/5 flex items-center justify-center mb-8 rounded-sm group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                                    <section.icon className="w-6 h-6" />
                                </div>

                                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-foreground mb-4">{section.category}</h3>
                                <p className="text-sm text-muted mb-8 font-medium italic leading-relaxed">{section.desc}</p>

                                <div className="space-y-3 flex-grow">
                                    {section.items.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between group/item p-4 rounded-sm bg-background/50 border border-white/5 hover:border-white/20 hover:bg-background transition-all cursor-pointer">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="w-8 h-8 rounded-sm bg-surface flex items-center justify-center border border-white/5 shrink-0 group-hover/item:border-white/20 transition-colors">
                                                    <Download className="w-4 h-4 text-muted group-hover/item:text-foreground transition-colors" />
                                                </div>
                                                <div className="truncate">
                                                    <p className="font-bold text-xs truncate text-foreground/90 group-hover/item:text-foreground">{item.title}</p>
                                                    <p className="text-[10px] font-mono text-muted/50 uppercase tracking-widest">{item.size}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-[10px] font-mono text-muted/30 uppercase tracking-[0.2em]">Asset Depot: Ready</span>
                                    <Target className={`w-4 h-4 ${section.color} opacity-20 group-hover:opacity-100 transition-opacity animate-pulse`} />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Final Share Component */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-surface/30 border border-white/10 rounded-sm p-12 text-center relative overflow-hidden group max-w-5xl mx-auto shadow-2xl"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-success/50 to-transparent" />

                        <div className="relative z-10">
                            <h3 className="text-3xl font-black uppercase italic tracking-tighter text-foreground mb-4">Amplifica la Señal</h3>
                            <p className="text-muted mb-10 max-w-2xl mx-auto font-medium italic">
                                Comparte este punto de acceso táctico. Cada descarga es una brecha en su sistema de control.
                            </p>

                            <div className="flex flex-wrap justify-center gap-6">
                                {[
                                    { label: "Twitter / X", color: "bg-[#000000] border-white/20", icon: ExternalLink },
                                    { label: "WhatsApp", color: "bg-[#25D366]/20 border-[#25D366]/40", icon: ExternalLink },
                                    { label: "Telegram", color: "bg-[#0088cc]/20 border-[#0088cc]/40", icon: ExternalLink }
                                ].map((btn, i) => (
                                    <button key={i} className={`px-8 py-3 ${btn.color} border text-foreground font-black uppercase italic tracking-widest rounded-sm hover:scale-105 transition-all text-xs flex items-center gap-2 group/btn`}>
                                        <btn.icon className="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
                                        {btn.label}
                                    </button>
                                ))}
                                <button className="px-8 py-3 bg-foreground text-background font-black uppercase italic tracking-widest rounded-sm hover:scale-105 transition-all text-xs">
                                    Copiar Enlace Táctico
                                </button>
                            </div>
                        </div>

                        {/* Tactical HUD decoration */}
                        <div className="absolute bottom-4 left-4 font-mono text-[8px] text-muted/20 uppercase tracking-[0.3em]">
                            Source: decentralized_net
                        </div>
                        <div className="absolute bottom-4 right-4 font-mono text-[8px] text-muted/20 uppercase tracking-[0.3em]">
                            Ver: 2.0.4-TACTICAL
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
