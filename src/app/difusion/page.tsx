"use client";

import { motion } from "framer-motion";
import { Download, Share2, FileText, Image as ImageIcon, Video, Megaphone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function DifusionPage() {
    const resources = [
        {
            category: "Documentos",
            icon: FileText,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            items: [
                { title: "Manifiesto Fundacional.pdf", size: "1.2 MB" },
                { title: "Argumentario Básico.pdf", size: "850 KB" },
                { title: "Guía de Abstención.pdf", size: "2.4 MB" }
            ]
        },
        {
            category: "Redes Sociales",
            icon: ImageIcon,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            items: [
                { title: "Pack Instagram Stories.zip", size: "15 MB" },
                { title: "Headers Twitter/X.zip", size: "5 MB" },
                { title: "Memes y Gráficos.zip", size: "45 MB" }
            ]
        },
        {
            category: "Multimedia",
            icon: Video,
            color: "text-red-500",
            bg: "bg-red-500/10",
            items: [
                { title: "Spot: La Mentira.mp4", size: "120 MB" },
                { title: "Entrevista Completa.mp3", size: "45 MB" }
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <div className="flex-grow py-24 px-4 container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center justify-center p-3 bg-emerald-500/10 text-emerald-500 rounded-full mb-6"
                    >
                        <Megaphone className="w-8 h-8" />
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Centro de Difusión</h1>
                    <p className="text-xl text-muted-foreground">
                        La verdad solo es poderosa cuando se comparte. Descarga este material y conviértete en un nodo de información libre.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {resources.map((section, idx) => (
                        <motion.div
                            key={section.category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all"
                        >
                            <div className={`w-12 h-12 ${section.bg} ${section.color} rounded-lg flex items-center justify-center mb-6`}>
                                <section.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-6">{section.category}</h3>
                            <ul className="space-y-4">
                                {section.items.map((item, i) => (
                                    <li key={i} className="flex items-center justify-between group p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors border border-transparent hover:border-border/50">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-8 h-8 rounded bg-background flex items-center justify-center border border-border shrink-0">
                                                <Download className="w-4 h-4 text-muted-foreground" />
                                            </div>
                                            <div className="truncate">
                                                <p className="font-medium text-sm truncate">{item.title}</p>
                                                <p className="text-xs text-muted-foreground">{item.size}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Share Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 text-center border border-primary/10"
                >
                    <h3 className="text-2xl font-bold mb-8 flex items-center justify-center gap-3">
                        <Share2 className="w-6 h-6" />
                        Comparte esta página ahora
                    </h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-6 py-3 bg-[#1DA1F2] hover:bg-[#1a91da] text-white rounded-lg font-bold transition-colors">
                            Twitter / X
                        </button>
                        <button className="px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg font-bold transition-colors">
                            WhatsApp
                        </button>
                        <button className="px-6 py-3 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-lg font-bold transition-colors">
                            Telegram
                        </button>
                        <button className="px-6 py-3 bg-foreground hover:bg-foreground/90 text-background rounded-lg font-bold transition-colors">
                            Copiar Enlace
                        </button>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </main>
    );
}
