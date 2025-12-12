"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@config";

function Logo() {
    return (
        <span className="text-xl font-bold tracking-tighter flex items-center">
            {siteConfig.logoText?.length
                ? siteConfig.logoText.map((chunk, idx) => (
                    <span key={idx} className={cn("text-foreground", chunk.className)}>
                        {chunk.text}
                    </span>
                ))
                : siteConfig.name}
        </span>
    );
}

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Ideograma", href: "#ideology" },
        { name: "Movimientos", href: "#movements" },
        { name: "Datos", href: "#data" },
        { name: "FAQ", href: "#faq" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors">
                    <Logo />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium hover:text-primary transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-secondary p-4 absolute top-16 left-0 right-0 border-b border-white/10">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
