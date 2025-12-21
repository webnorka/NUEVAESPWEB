"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    MapPin,
    ScrollText,
    ChevronLeft,
    ShieldAlert,
    Terminal,
    Settings
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarLinks = [
    { name: "Vista General", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Ciudadanos", href: "/admin/citizens", icon: Users },
    { name: "Nodos de Red", href: "/admin/nuclei", icon: MapPin },
    { name: "Auditoría", href: "/admin/audit", icon: ScrollText },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? 80 : 280 }}
            className="fixed left-0 top-0 bottom-0 bg-zinc-950 border-r border-white/10 z-50 flex flex-col transition-all duration-500 ease-in-out"
        >
            {/* Logo / Header */}
            <div className="p-6 border-b border-white/10 relative overflow-hidden">
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-10 h-10 rounded-sm bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                        <ShieldAlert className="w-6 h-6 text-primary" />
                    </div>
                    <AnimatePresence mode="wait">
                        {!isCollapsed && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="font-black text-lg tracking-tighter"
                            >
                                NE <span className="text-primary">ADMIN</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                {!isCollapsed && (
                    <div className="mt-2 flex items-center gap-2">
                        <Terminal className="w-3 h-3 text-zinc-600" />
                        <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">v2.1.b_secure</span>
                    </div>
                )}

                {/* Background Glow */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/5 blur-[50px] rounded-full" />
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-4 p-3 rounded-sm transition-all duration-300 group relative ${isActive
                                    ? 'bg-primary/10 text-white'
                                    : 'text-zinc-500 hover:text-white hover:bg-white/[0.03]'
                                }`}
                        >
                            <link.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary' : 'group-hover:text-primary'}`} />
                            <AnimatePresence mode="wait">
                                {!isCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="text-xs font-bold uppercase tracking-widest truncate"
                                    >
                                        {link.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>

                            {isActive && (
                                <motion.div
                                    layoutId="sidebar-active"
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-white/10 space-y-2">
                <button className="flex items-center gap-4 p-3 w-full text-zinc-500 hover:text-white hover:bg-white/[0.03] rounded-sm transition-all group">
                    <Settings className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span className="text-xs font-bold uppercase tracking-widest">Opciones</span>}
                </button>

                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="flex items-center gap-4 p-3 w-full text-zinc-600 hover:text-primary transition-all group"
                >
                    <ChevronLeft className={`w-5 h-5 shrink-0 transition-transform duration-500 ${isCollapsed ? 'rotate-180' : ''}`} />
                    {!isCollapsed && <span className="text-[10px] font-mono uppercase tracking-widest">Colapsar</span>}
                </button>
            </div>
        </motion.aside>
    );
}
