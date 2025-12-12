import { siteConfig } from "@config";
import { MoveRight, CheckCircle2, Circle, Clock } from "lucide-react";

export default function RoadmapPage() {
    return (
        <div className="min-h-screen bg-background py-20 px-4">
            <div className="container mx-auto max-w-4xl">
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Hoja de Ruta
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        El camino hacia la libertad política no es improvisado. Tenemos un plan claro para la ruptura democrática.
                    </p>
                </header>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

                    <div className="space-y-12">
                        {siteConfig.roadmap.steps.map((step, index) => {
                            const isActive = step.status === "active";
                            const isCompleted = step.status === "completed";

                            return (
                                <div key={index} className={`relative flex flex-col md:flex-row gap-8 items-start ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>

                                    {/* Timeline Dot */}
                                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background z-10 flex items-center justify-center">
                                        <div className={`w-3 h-3 rounded-full ${isActive ? "bg-primary animate-pulse" : isCompleted ? "bg-green-500" : "bg-gray-600"}`} />
                                    </div>

                                    {/* Content Card */}
                                    <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] p-6 rounded-xl border transition-all duration-300 ${isActive
                                            ? "bg-white/5 border-primary/50 shadow-[0_0_30px_rgba(190,18,60,0.1)]"
                                            : "bg-white/5 border-white/10 hover:bg-white/10"
                                        }`}>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`text-sm font-bold uppercase tracking-wider ${isActive ? "text-primary" : "text-gray-500"
                                                }`}>
                                                {step.phase}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                                                <Clock className="w-3 h-3" />
                                                {step.date}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold mb-3 text-white">
                                            {step.title}
                                        </h3>

                                        <p className="text-gray-400 leading-relaxed">
                                            {step.description}
                                        </p>

                                        {isActive && (
                                            <div className="mt-4 inline-flex items-center gap-2 text-sm text-primary font-medium">
                                                Fase en curso <MoveRight className="w-4 h-4" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
