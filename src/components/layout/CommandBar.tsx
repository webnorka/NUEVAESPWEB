"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Crosshair, Terminal, FileText, Activity, LayoutDashboard, ShieldAlert, Users, Zap, Heart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { getMovementStats } from "@/lib/actions/citizen";
import { siteConfig } from "@config";

const navItems = [
    { name: "DATOS", href: siteConfig.links.data, icon: Activity },
    { name: "IDEARIO", href: siteConfig.links.ideology, icon: Terminal },
    { name: "ACCIÓN", href: siteConfig.links.movements, icon: Crosshair },
    { name: "INTERROGATORIO", href: siteConfig.links.faq, icon: FileText },
    { name: "APOYO", href: siteConfig.links.donations, icon: Heart },
];

export function CommandBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [stats, setStats] = useState({ total: 0, active: 0 });
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

        const fetchStats = async () => {
            const data = await getMovementStats();
            setStats(data);
        };

        const getUserData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (user) checkRole(user.id);
        };

        getUserData();
        fetchStats();

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
                scrolled ? "bg-background/80 backdrop-blur-md border-white/10 py-2" : "bg-transparent border-transparent py-4"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo / Brand */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center text-primary-foreground font-black hover:bg-foreground hover:text-background transition-colors">
                            NE
                        </div>
                        <div className="hidden md:flex flex-col leading-none">
                            <span className="font-bold text-foreground tracking-widest text-sm italic">NUEVA</span>
                            <span className="font-mono text-xs text-primary tracking-[0.2em] group-hover:text-foreground transition-colors">ESPAÑA</span>
                        </div>
                    </Link>

                    {/* Movement Counters */}
                    <div className="hidden lg:flex items-center gap-6 border-l border-white/10 pl-8">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1.5 text-[8px] font-mono text-muted uppercase tracking-widest">
                                <Users className="w-2.5 h-2.5" /> Miembros
                            </div>
                            <div className="text-xs font-mono font-bold text-foreground leading-none mt-1">
                                {stats.total.toLocaleString()}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1.5 text-[8px] font-mono text-success uppercase tracking-widest">
                                <Zap className="w-2.5 h-2.5" /> Activos
                            </div>
                            <div className="text-xs font-mono font-bold text-success leading-none mt-1">
                                {stats.active.toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop HUD Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="px-4 py-2 flex items-center gap-2 text-xs font-mono text-muted hover:text-foreground hover:bg-white/5 rounded-sm transition-all border border-transparent hover:border-white/10 uppercase tracking-wide"
                        >
                            <item.icon className="w-3 h-3" />
                            {item.name}
                        </Link>
                    ))}
                    <div className="w-px h-6 bg-white/10 mx-2" />
                    {user ? (
                        <div className="flex items-center gap-2">
                            {isAdmin && (
                                <Link href="/admin/dashboard" className="px-4 py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground text-[10px] font-black tracking-widest uppercase rounded-sm transition-all flex items-center gap-2 border border-primary/20">
                                    <ShieldAlert className="w-3.5 h-3.5" />
                                    Centro de Control
                                </Link>
                            )}
                            <Link href="/dashboard" className="px-4 py-1.5 bg-surface hover:bg-foreground hover:text-background text-foreground text-xs font-bold tracking-widest uppercase rounded-sm transition-all flex items-center gap-2 border border-white/5">
                                <LayoutDashboard className="w-3 h-3" />
                                Portal
                            </Link>
                        </div>
                    ) : (
                        <Link href={siteConfig.links.signup} className="px-5 py-2 bg-primary hover:bg-primary-muted text-primary-foreground text-xs font-black tracking-[0.2em] uppercase rounded-sm transition-all hover:scale-105 italic">
                            Unirse
                        </Link>
                    )}
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <div className="flex items-center gap-3 pr-4 border-r border-white/10">
                        <div className="flex flex-col items-end">
                            <span className="text-[7px] font-mono text-muted uppercase tracking-tighter">Miembros</span>
                            <span className="text-[9px] font-mono font-bold text-foreground">{stats.total}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-foreground hover:bg-white/10 rounded-sm"
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-background border-b border-white/10 p-4 md:hidden shadow-2xl"
                    >
                        <nav className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 p-3 text-sm font-mono text-muted hover:text-foreground hover:bg-white/5 rounded-sm border border-transparent hover:border-white/10 uppercase tracking-widest"
                                >
                                    <item.icon className="w-4 h-4 text-primary" />
                                    {item.name}
                                </Link>
                            ))}
                            {user ? (
                                <>
                                    {isAdmin && (
                                        <Link
                                            href="/admin/dashboard"
                                            onClick={() => setIsOpen(false)}
                                            className="mt-2 w-full py-4 bg-primary text-primary-foreground font-black tracking-[0.3em] uppercase text-xs rounded-sm flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-[0_0_30px_rgba(225,29,72,0.2)] italic"
                                        >
                                            <ShieldAlert className="w-4 h-4" />
                                            CENTRO DE CONTROL
                                        </Link>
                                    )}
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setIsOpen(false)}
                                        className="mt-2 w-full py-4 bg-surface text-foreground font-black tracking-[0.3em] uppercase text-xs rounded-sm flex items-center justify-center gap-3 transition-transform active:scale-95 border border-white/5 italic"
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        MI PORTAL
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    href={siteConfig.links.signup}
                                    onClick={() => setIsOpen(false)}
                                    className="mt-2 w-full py-5 bg-primary text-primary-foreground font-black tracking-[0.3em] uppercase text-sm rounded-sm flex items-center justify-center transition-transform active:scale-95 italic"
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
