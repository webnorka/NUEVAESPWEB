"use client";

import { motion } from "framer-motion";
import { Scale, Users, ShieldAlert, ScrollText } from "lucide-react";

const features = [
    {
        icon: <Scale className="w-10 h-10 text-primary" />,
        title: "Separación de Poderes",
        description: "La independencia judicial y legislativa es imposible sin una separación de poderes en origen. El ejecutivo no puede elegir al judicial."
    },
    {
        icon: <Users className="w-10 h-10 text-accent" />,
        title: "Representación Directa",
        description: "El diputado debe deberse a sus electores de distrito, no al jefe del partido. Exigimos el fin del sistema proporcional de listas."
    },
    {
        icon: <ShieldAlert className="w-10 h-10 text-red-500" />,
        title: "Contra la Partitocracia",
        description: "El Estado de Partidos ha secuestrado la nación. Los partidos son órganos del estado, no de la sociedad civil."
    },
    {
        icon: <ScrollText className="w-10 h-10 text-blue-400" />,
        title: "Libertad Constituyente",
        description: "Solo un periodo de Libertad Constituyente puede dar lugar a una Constitución legítima redactada por la nación."
    }
];

export function Ideology() {
    return (
        <section id="ideology" className="py-24 bg-secondary/30 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Nuestro Ideario</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Los pilares fundamentales para construir una democracia formal en España.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-secondary p-8 rounded-xl border border-white/5 hover:border-primary/50 transition-colors group"
                        >
                            <div className="mb-6 bg-background/50 w-16 h-16 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
