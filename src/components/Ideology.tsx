"use client";

import { Scale, Users, ShieldAlert, ScrollText, XCircle, CheckCircle2 } from "lucide-react";
import TiltedCard from "./reactbits/TiltedCard";

const features = [
    {
        title: "Separación de Poderes",
        lie: "El Gobierno controla a los Jueces.",
        truth: "Independencia Judicial Real.",
        desc: "En el Régimen del 78, el Ejecutivo nombra al Judicial. Nosotros exigimos elecciones separadas para el Consejo General del Poder Judicial.",
        icon: Scale,
        color: "text-blue-500"
    },
    {
        title: "Representación Política",
        lie: "Votas listas, no personas.",
        truth: "Diputado de Distrito.",
        desc: "Hoy los diputados obedecen al Jefe de Partido. Exigimos el sistema mayoritario uninominal: un ciudadano, un voto, un representante responsable.",
        icon: Users,
        color: "text-green-500"
    },
    {
        title: "Estado de Partidos",
        lie: "Los partidos son el Estado.",
        truth: "Sociedad Civil Fuerte.",
        desc: "La partitocracia ha colonizado las instituciones. Debemos expulsar a los partidos del Estado y devolver el control a la Nación.",
        icon: ShieldAlert,
        color: "text-red-500"
    },
    {
        title: "Libertad Constituyente",
        lie: "Reforma es sumisión.",
        truth: "Ruptura Democrática.",
        desc: "No queremos parchear la Constitución. Buscamos un periodo de Libertad Constituyente para que la Nación decida su forma de gobierno.",
        icon: ScrollText,
        color: "text-yellow-500"
    }
];

export function Ideology() {
    return (
        <section id="ideology" className="py-32 bg-zinc-950 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-24">
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
                        ROMPE EL <span className="text-red-600 line-through decoration-4 decoration-white">MITO</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Nos vendieron una democracia plena. <br />
                        La realidad es una oligarquía de partidos. <br />
                        <span className="text-white font-bold">Elige la verdad.</span>
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 px-4 md:px-0">
                    {features.map((feature, index) => (
                        <div key={index} className="relative group">
                            <TiltedCard
                                containerClassName="h-[400px] w-full"
                                itemClassName="bg-zinc-900 border border-white/10 p-8 flex flex-col justify-between"
                                showCaption={false}
                            >
                                <div>
                                    <div className={`w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6`}>
                                        <feature.icon className={`w-8 h-8 ${feature.color}`} />
                                    </div>

                                    <h3 className="text-3xl font-black text-white mb-2 uppercase italic">
                                        {feature.title}
                                    </h3>

                                    <div className="space-y-4 my-6">
                                        <div className="flex items-start gap-3 opacity-50 text-red-400">
                                            <XCircle className="w-5 h-5 mt-1 shrink-0" />
                                            <div>
                                                <p className="font-mono text-xs uppercase tracking-wider mb-1">La Mentira Actual</p>
                                                <p className="font-bold leading-tight line-through decoration-red-500/50">{feature.lie}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3 text-green-400">
                                            <CheckCircle2 className="w-5 h-5 mt-1 shrink-0" />
                                            <div>
                                                <p className="font-mono text-xs uppercase tracking-wider mb-1">Nuestra Propuesta</p>
                                                <p className="font-bold leading-tight text-white">{feature.truth}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-500 leading-relaxed border-t border-white/5 pt-6">
                                    {feature.desc}
                                </p>
                            </TiltedCard>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
