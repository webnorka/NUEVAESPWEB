"use client";

import { motion } from "framer-motion";
import { Vote, MapPin, Users, Calendar } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AsociacionesPage() {
    // Mock locations for the map
    const locations = [
        { top: "40%", left: "48%", city: "Madrid", count: 42 },
        { top: "30%", left: "75%", city: "Barcelona", count: 35 },
        { top: "75%", left: "40%", city: "Sevilla", count: 18 },
        { top: "25%", left: "55%", city: "Zaragoza", count: 12 },
        { top: "65%", left: "70%", city: "Valencia", count: 24 },
        { top: "20%", left: "30%", city: "Bilbao", count: 15 },
        { top: "80%", left: "45%", city: "Málaga", count: 14 }
    ];

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <div className="flex-grow py-24 px-4 container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center justify-center p-3 bg-blue-500/10 text-blue-500 rounded-full mb-6"
                    >
                        <Vote className="w-8 h-8" />
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Red Civil Nacional</h1>
                    <p className="text-xl text-muted-foreground">
                        No estás solo. Cientos de asociaciones civiles ya se están organizando al margen de los partidos. Encuentra tu núcleo más cercano.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12 items-start">
                    {/* Map Mockup Column */}
                    <div className="lg:col-span-2 relative min-h-[500px] bg-card/50 border border-border rounded-3xl overflow-hidden p-8 flex items-center justify-center">
                        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />

                        {/* Abstract Map Container */}
                        <div className="relative w-full h-[400px] md:h-[500px] max-w-2xl">
                            {/* Stylized Spain SVG Map */}
                            <div className="absolute inset-0 flex items-center justify-center translate-y-4 opacity-40 pointer-events-none">
                                <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-blue-500/20 stroke-blue-500/40 stroke-[0.5]">
                                    {/* Abstract Polygon identifying Spain/Iberian Peninsula */}
                                    <path d="M 20 15 L 60 10 L 85 25 L 90 50 L 75 80 L 45 90 L 15 80 L 5 45 Z" />
                                </svg>
                            </div>

                            {/* Nodes */}
                            {locations.map((loc, i) => (
                                <motion.div
                                    key={loc.city}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: i * 0.1, type: "spring" }}
                                    style={{ top: loc.top, left: loc.left }}
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                                >
                                    <div className="relative">
                                        <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
                                        <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-20" />

                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-background border border-border px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                            <p className="font-bold text-sm">{loc.city}</p>
                                            <p className="text-xs text-muted-foreground">{loc.count} núcleos activos</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur border border-border p-4 rounded-xl text-xs text-muted-foreground">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                <span>Núcleo Activo</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-gray-600" />
                                <span>En Formación</span>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Upcoming Meetings & List */}
                    <div className="space-y-6">
                        <div className="bg-card border border-border p-6 rounded-2xl">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-blue-500" />
                                Próximas Reuniones
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { city: "Madrid Centor", date: "15 Oct, 19:00", loc: "Ateneo Civil" },
                                    { city: "Barcelona Norte", date: "17 Oct, 18:30", loc: "Centro Cívico" },
                                    { city: "Valencia Puerto", date: "18 Oct, 20:00", loc: "Sala Marina" }
                                ].map((meet, i) => (
                                    <div key={i} className="flex gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-500/10 text-blue-500 rounded-lg flex flex-col items-center justify-center text-xs font-bold leading-none">
                                            <span>OCT</span>
                                            <span className="text-lg">{meet.date.split(" ")[0]}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm">{meet.city}</h4>
                                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                                <MapPin className="w-3 h-3" />
                                                {meet.loc}
                                            </p>
                                            <p className="text-xs text-muted-foreground">{meet.date.split(", ")[1]}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 py-2 text-sm text-blue-500 font-medium hover:underline">
                                Ver calendario completo
                            </button>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-2xl">
                            <h3 className="text-xl font-bold mb-2">¿No hay grupo en tu zona?</h3>
                            <p className="text-blue-100 text-sm mb-4">
                                Sé el primero en iniciar un núcleo de control ciudadano en tu distrito.
                            </p>
                            <button className="w-full py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-colors">
                                Iniciar Núcleo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
