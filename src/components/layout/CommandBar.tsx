"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Crosshair, Terminal, FileText, Activity, LayoutDashboard, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

const navItems = [
    { name: "DATOS", href: "#data", icon: Activity },
    { name: "IDEARIO", href: "#ideology", icon: Terminal },
    { name: "ACCIÓN", href: "#movements", icon: Crosshair },
    { name: "INTERROGATORIO", href: "#faq", icon: FileText },
];

export function CommandBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);

        const checkRole = async (userId: string) => {
            const { data } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", userId)
                .single();
            setIsAdmin(data?.role === 'admin');
        };

        const getUserData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (user) checkRole(user.id);
        };
        getUserData();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (currentUser) {
                checkRole(currentUser.id);
            } else {
                setIsAdmin(false);
            }
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            subscription.unsubscribe();
        };
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                scrolled ? "bg-black/80 backdrop-blur-md border-white/10 py-2" : "bg-transparent border-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo / Brand */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center text-white font-black hover:bg-white hover:text-black transition-colors">
                        NE
                    </div>
                    <div className="hidden md:flex flex-col leading-none">
                        <span className="font-bold text-white tracking-widest text-sm">NUEVA</span>
                        <span className="font-mono text-xs text-red-500 tracking-[0.2em] group-hover:text-white transition-colors">ESPAÑA</span>
                    </div>
                </Link>

                {/* Desktop HUD Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="px-4 py-2 flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white hover:bg-white/5 rounded-sm transition-all border border-transparent hover:border-white/10"
                        >
                            <item.icon className="w-3 h-3" />
                            {item.name}
                        </Link>
                    ))}
                    <div className="w-px h-6 bg-white/10 mx-2" />
                    {user ? (
                        <div className="flex items-center gap-2">
                            {isAdmin && (
                                <Link href="/admin/dashboard" className="px-4 py-1.5 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white text-[10px] font-black tracking-widest uppercase rounded-sm transition-all flex items-center gap-2 border border-red-500/20">
                                    <ShieldAlert className="w-3.5 h-3.5" />
                                    Centro de Control
                                </Link>
                            )}
                            <Link href="/dashboard" className="px-4 py-1.5 bg-zinc-800 hover:bg-white hover:text-black text-white text-xs font-bold tracking-widest uppercase rounded-sm transition-all flex items-center gap-2">
                                <LayoutDashboard className="w-3 h-3" />
                                Portal
                            </Link>
                        </div>
                    ) : (
                        <Link href="/auth/signup" className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-widest uppercase rounded-sm transition-colors animate-pulse">
                            Unirse
                        </Link>
                    )}
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-white hover:bg-white/10 rounded-sm"
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-black border-b border-white/10 p-4 md:hidden shadow-2xl"
                    >
                        <nav className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 p-3 text-sm font-mono text-gray-300 hover:text-white hover:bg-white/5 rounded-sm border border-transparent hover:border-white/10"
                                >
                                    <item.icon className="w-4 h-4 text-red-500" />
                                    {item.name}
                                </Link>
                            ))}
                            {user ? (
                                <>
                                    {isAdmin && (
                                        <Link
                                            href="/admin/dashboard"
                                            onClick={() => setIsOpen(false)}
                                            className="mt-2 w-full py-3 bg-red-600 text-white font-black tracking-widest uppercase text-sm rounded-sm flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                                        >
                                            <ShieldAlert className="w-4 h-4" />
                                            CENTRO DE CONTROL
                                        </Link>
                                    )}
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setIsOpen(false)}
                                        className="mt-2 w-full py-3 bg-zinc-800 text-white font-bold tracking-widest uppercase text-sm rounded-sm flex items-center justify-center gap-3 transition-transform active:scale-95 border border-white/10"
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        MI PORTAL
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    href="/auth/signup"
                                    onClick={() => setIsOpen(false)}
                                    className="mt-2 w-full py-3 bg-red-600 text-white font-bold tracking-widest uppercase text-sm rounded-sm flex items-center justify-center transition-transform active:scale-95"
                                >
                                    UNIRSE A LA RESISTENCIA
                                </Link>
                            )}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
