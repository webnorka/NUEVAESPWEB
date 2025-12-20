"use client";

import Link from "next/link";
import { siteConfig, socialLinks } from "@config";
import { Github, Twitter, Mail, Activity, Send } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-background relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none"></div>

            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand / Mission */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary flex items-center justify-center text-primary-foreground font-black text-xs rounded-sm">NE</div>
                            <span className="font-bold text-foreground tracking-widest italic">NUEVA ESPAÑA</span>
                        </div>
                        <p className="text-muted text-sm leading-relaxed max-w-xs font-medium">
                            Plataforma civil para la conquista de la libertad política colectiva y el establecimiento de una democracia formal en España.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.slice(0, 3).map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.url}
                                    className={`text-muted/40 hover:text-primary transition-colors ${link.colorClass}`}
                                    aria-label={link.name}
                                >
                                    <link.icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-foreground font-black mb-6 uppercase tracking-widest text-xs italic">Navegación</h4>
                        <ul className="space-y-3 text-sm text-muted font-medium">
                            <li><Link href="#data" className="hover:text-primary transition-colors">Datos de Corrupción</Link></li>
                            <li><Link href="#ideology" className="hover:text-primary transition-colors">Ideario</Link></li>
                            <li><Link href="#movements" className="hover:text-primary transition-colors">Acción Directa</Link></li>
                            <li><Link href="#faq" className="hover:text-primary transition-colors">Preguntas Frecuentes</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-foreground font-black mb-6 uppercase tracking-widest text-xs italic">Legal</h4>
                        <ul className="space-y-3 text-sm text-muted font-medium">
                            <li><Link href={siteConfig.links.legal} className="hover:text-foreground transition-colors">Aviso Legal</Link></li>
                            <li><Link href={siteConfig.links.privacy} className="hover:text-foreground transition-colors">Privacidad</Link></li>
                            <li><Link href="#" className="hover:text-foreground transition-colors">Cookies</Link></li>
                            <li><Link href="#" className="hover:text-foreground transition-colors">Transparencia</Link></li>
                        </ul>
                    </div>

                    {/* CTA / Newsletter */}
                    <div className="bg-surface/50 p-6 border border-white/5 rounded-sm">
                        <h4 className="flex items-center gap-2 text-foreground font-black mb-4 uppercase tracking-widest text-xs italic">
                            <Activity className="w-4 h-4 text-primary" />
                            Estado de la Resistencia
                        </h4>
                        <p className="text-[10px] text-muted mb-6 font-mono uppercase tracking-tight">
                            Únete a la lista de difusión segura. Sin spam, solo instrucciones.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="correo@seguro.com"
                                className="bg-background border border-white/10 text-foreground px-3 py-2 text-xs w-full focus:outline-none focus:border-primary transition-colors placeholder:text-muted/20"
                            />
                            <button className="bg-primary hover:bg-primary-muted text-primary-foreground px-3 py-2 transition-colors rounded-sm">
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] text-muted/30 font-mono tracking-widest">
                        © {new Date().getFullYear()} NUEVA ESPAÑA. TODOS LOS DERECHOS RESERVADOS.
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-muted font-mono uppercase tracking-[0.3em]">
                        <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                        PLATAFORMA ACTIVA // FASE II
                    </div>
                </div>
            </div>
        </footer>
    );
}
