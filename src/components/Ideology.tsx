import { Scale, Users, ShieldAlert, ScrollText, XCircle, CheckCircle2 } from "lucide-react";

const features = [
    {
        title: "Separación de Poderes",
        lie: "El Gobierno controla a los Jueces.",
        truth: "Independencia Judicial Real.",
        desc: "En el Régimen del 78, el Ejecutivo nombra al Judicial. Nosotros exigimos elecciones separadas para el Consejo General del Poder Judicial.",
        icon: Scale,
        color: "text-accent",
        borderColor: "border-accent/20",
        hoverBorder: "group-hover:border-accent/50"
    },
    {
        title: "Representación Política",
        lie: "Votas listas, no personas.",
        truth: "Diputado de Distrito.",
        desc: "Hoy los diputados obedecen al Jefe de Partido. Exigimos el sistema mayoritario uninominal: un ciudadano, un voto, un representante responsable.",
        icon: Users,
        color: "text-success",
        borderColor: "border-success/20",
        hoverBorder: "group-hover:border-success/50"
    },
    {
        title: "Estado de Partidos",
        lie: "Los partidos son el Estado.",
        truth: "Sociedad Civil Fuerte.",
        desc: "La partitocracia ha colonizado las instituciones. Debemos expulsar a los partidos del Estado y devolver el control a la Nación.",
        icon: ShieldAlert,
        color: "text-primary",
        borderColor: "border-primary/20",
        hoverBorder: "group-hover:border-primary/50"
    },
    {
        title: "Libertad Constituyente",
        lie: "Reforma es sumisión.",
        truth: "Ruptura Democrática.",
        desc: "No queremos parchear la Constitución. Buscamos un periodo de Libertad Constituyente para que la Nación decida su forma de gobierno.",
        icon: ScrollText,
        color: "text-warning",
        borderColor: "border-warning/20",
        hoverBorder: "group-hover:border-warning/50"
    }
];

export function Ideology() {
    return (
        <section id="ideology" className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-5xl md:text-7xl font-black text-foreground mb-6 uppercase tracking-tighter italic">
                        Realidad <span className="text-primary">Vs.</span> Nueva España
                    </h2>
                    <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
                        Analizamos la estructura actual frente a los fundamentos de una democracia formal. <br />
                        <span className="text-foreground font-bold italic underline decoration-primary decoration-4 underline-offset-8">La ruptura es el primer paso hacia la libertad.</span>
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 lg:gap-8 px-4 md:px-0 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`group relative h-full bg-surface/30 border ${feature.borderColor} ${feature.hoverBorder} transition-all duration-300 hover:bg-surface/50 hover:shadow-2xl hover:-translate-y-1`}
                        >
                            <div className="p-8 flex flex-col h-full">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-8">
                                    <div className={`w-14 h-14 rounded-lg bg-background border border-white/5 flex items-center justify-center`}>
                                        <feature.icon className={`w-7 h-7 ${feature.color}`} />
                                    </div>
                                    <span className="font-mono text-muted/40 text-xs uppercase tracking-widest">0{index + 1}</span>
                                </div>

                                <h3 className="text-2xl font-black text-foreground mb-8 uppercase italic border-b border-white/5 pb-4">
                                    {feature.title}
                                </h3>

                                {/* Comparison Grid */}
                                <div className="grid grid-cols-1 gap-6 mb-8 flex-grow">
                                    <div className="relative pl-4 border-l-2 border-primary/30">
                                        <div className="absolute -left-[9px] top-0 text-primary">
                                            <XCircle className="w-4 h-4" />
                                        </div>
                                        <p className="font-mono text-[10px] text-primary uppercase tracking-wider mb-1">Situación Actual</p>
                                        <p className="text-lg font-medium text-muted line-through decoration-primary/30 decoration-2">{feature.lie}</p>
                                    </div>

                                    <div className="relative pl-4 border-l-2 border-success/50">
                                        <div className="absolute -left-[9px] top-0 text-success">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        <p className="font-mono text-[10px] text-success uppercase tracking-wider mb-1">Nueva España</p>
                                        <p className="text-lg font-bold text-foreground">{feature.truth}</p>
                                    </div>
                                </div>

                                {/* Description Footer */}
                                <div className="pt-6 border-t border-white/5 mt-auto">
                                    <p className="text-sm text-muted leading-relaxed font-medium italic">
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
