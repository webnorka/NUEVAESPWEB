"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    MapPin,
    ScrollText,
    ShieldAlert,
    Terminal
} from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
    { name: "Vista General", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Ciudadanos", href: "/admin/citizens", icon: Users },
    { name: "Nodos de Red", href: "/admin/nuclei", icon: MapPin },
    { name: "Auditoría", href: "/admin/audit", icon: ScrollText },
];

export function AdminSubHeader() {
    const pathname = usePathname();

    return (
        <div className="sticky top-16 z-40 w-full bg-zinc-950/80 backdrop-blur-md border-b border-white/10 overflow-x-auto scrollbar-none">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="flex items-center justify-between h-14 gap-8">
                    {/* Admin Identity */}
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="w-7 h-7 rounded-sm bg-primary/20 border border-primary/30 flex items-center justify-center">
                            <ShieldAlert className="w-4 h-4 text-primary" />
                        </div>
                        <div className="hidden sm:block">
                            <div className="font-black text-xs tracking-tighter uppercase whitespace-nowrap">
                                NE <span className="text-primary">ADMIN_CENTER</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex items-center gap-1 h-full">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-2 px-4 h-full transition-all duration-300 group relative ${isActive
                                            ? 'text-white'
                                            : 'text-zinc-500 hover:text-white'
                                        }`}
                                >
                                    <link.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : 'group-hover:text-primary'}`} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                                        {link.name}
                                    </span>

                                    {isActive && (
                                        <motion.div
                                            layoutId="admin-nav-active"
                                            className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* System Info */}
                    <div className="hidden md:flex items-center gap-3 shrink-0">
                        <Terminal className="w-3 h-3 text-zinc-600" />
                        <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.3em]">SEC_OPS // 2.1.B</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
