"use client";

import Link from "next/link";
import { siteConfig, socialLinks } from "@config";
import { Github, Twitter, Mail, Activity, Send } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand / Mission */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-red-600 flex items-center justify-center text-white font-black text-xs">NE</div>
                            <span className="font-bold text-white tracking-widest">NUEVA ESPAÑA</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            Plataforma civil para la conquista de la libertad política colectiva y el establecimiento de una democracia formal en España.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.slice(0, 3).map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.url}
                                    className={`text-gray-500 transition-colors ${link.colorClass}`}
                                    aria-label={link.name}
                                >
                                    <link.icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Navegación</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link href="#data" className="hover:text-red-500 transition-colors">Datos de Corrupción</Link></li>
                            <li><Link href="#ideology" className="hover:text-red-500 transition-colors">Ideario</Link></li>
                            <li><Link href="#movements" className="hover:text-red-500 transition-colors">Acción Directa</Link></li>
                            <li><Link href="#faq" className="hover:text-red-500 transition-colors">Preguntas Frecuentes</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Legal</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link href="#" className="hover:text-white transition-colors">Aviso Legal</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Privacidad</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Cookies</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Transparencia</Link></li>
                        </ul>
                    </div>

                    {/* CTA / Newsletter */}
                    <div className="bg-zinc-900/50 p-6 border border-white/5 rounded-sm">
                        <h4 className="flex items-center gap-2 text-white font-bold mb-2 uppercase tracking-wider text-sm">
                            <Activity className="w-4 h-4 text-red-500" />
                            Estado de la Resistencia
                        </h4>
                        <p className="text-xs text-gray-500 mb-6 font-mono">
                            Únete a la lista de difusión segura. Sin spam, solo instrucciones.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="correo@seguro.com"
                                className="bg-black border border-white/10 text-white px-3 py-2 text-sm w-full focus:outline-none focus:border-red-500 transition-colors"
                            />
                            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 transition-colors">
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-600 font-mono">
                        © {new Date().getFullYear()} NUEVA ESPAÑA. TODOS LOS DERECHOS RESERVADOS.
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-gray-700 font-mono uppercase tracking-widest">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        SISTEMA ONLINE // V.2.0.4-BETA
                    </div>
                </div>
            </div>
        </footer>
    );
}
