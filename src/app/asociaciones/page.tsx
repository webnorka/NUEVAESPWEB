"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
    MapPin, Users, Calendar, ShieldCheck, Target, Radio, Search,
    PlusCircle, Loader2, Info, ChevronRight, LogOut, X
} from "lucide-react";
import { siteConfig } from "@config";
import { getNuclei, getUserNuclei, joinNucleus, leaveNucleus, createNucleus } from "@/lib/actions/asociaciones";
import { Nucleus } from "@/types/asociaciones";

export default function AsociacionesPage() {
    const [nuclei, setNuclei] = useState<Nucleus[]>([]);
    const [userNuclei, setUserNuclei] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [selectedNucleus, setSelectedNucleus] = useState<Nucleus | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [newNucleusCoords, setNewNucleusCoords] = useState<{ lat: number, lng: number } | null>(null);
    const [formData, setFormData] = useState({ name: "", description: "", city: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [allNuclei, myNuclei] = await Promise.all([
                    getNuclei(),
                    getUserNuclei()
                ]);
                setNuclei(allNuclei);
                setUserNuclei(myNuclei);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, []);

    const handleJoin = async (id: string) => {
        setActionLoading(id);
        try {
            await joinNucleus(id);
            setUserNuclei(prev => [...prev, id]);
            // Refresh member count locally
            setNuclei(prev => prev.map(n => n.id === id ? { ...n, member_count: n.member_count + 1 } : n));
        } catch (error) {
            console.error("Error joining:", error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleLeave = async (id: string) => {
        setActionLoading(id);
        try {
            await leaveNucleus(id);
            setUserNuclei(prev => prev.filter(nid => nid !== id));
            setNuclei(prev => prev.map(n => n.id === id ? { ...n, member_count: Math.max(0, n.member_count - 1) } : n));
        } catch (error) {
            console.error("Error leaving:", error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newNucleusCoords) return;
        setIsSubmitting(true);
        try {
            const result = await createNucleus({
                ...formData,
                lat: newNucleusCoords.lat,
                lng: newNucleusCoords.lng
            });
            if (result.nucleus) {
                const allNuclei = await getNuclei();
                setNuclei(allNuclei);
                setUserNuclei(prev => [...prev, result.nucleus.id]);
                setIsCreating(false);
                setNewNucleusCoords(null);
                setFormData({ name: "", description: "", city: "" });
            }
        } catch (error) {
            console.error("Error creating nucleus:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isCreating) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const lat = ((e.clientY - rect.top) / rect.height) * 100;
        const lng = ((e.clientX - rect.left) / rect.width) * 100;
        setNewNucleusCoords({ lat, lng });
    };

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col pt-20">
            <div className="flex-grow flex flex-col relative overflow-hidden">
                {/* Tactical HUD Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-accent/5 via-background to-background pointer-events-none" />

                <div className="container mx-auto px-4 py-20 relative z-10">
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-sm bg-accent/10 border border-accent/20 text-accent text-[10px] font-mono uppercase tracking-[0.3em] mb-8"
                        >
                            <Radio className="w-4 h-4 animate-pulse" />
                            <span>Red de Despliegue Civil // Control Territorial</span>
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.85] mb-8 uppercase">
                            Red Civil <br />
                            <span className="text-accent italic">Nacional</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted leading-relaxed max-w-2xl mx-auto font-medium italic">
                            No eres un individuo aislado, eres una célula de presión. Localiza tu núcleo de resistencia más cercano y toma el control de tu distrito.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-start max-w-7xl mx-auto">
                        {/* LEFT COLUMN: TACTICAL MAP */}
                        <div className="lg:col-span-8 relative">
                            <div className="bg-surface/20 border border-white/5 rounded-sm overflow-hidden p-8 md:p-12 relative group h-[600px] flex items-center justify-center shadow-2xl">
                                {/* Scanning Effect */}
                                <div className="absolute inset-0 pointer-events-none opacity-10">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent w-1/2 -translate-x-full group-hover:animate-[scan_5s_linear_infinite]" style={{ animationDirection: 'initial' }} />
                                </div>

                                {/* Abstract Map Decoration */}
                                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] pointer-events-none" />

                                <div
                                    className={`relative w-full h-full max-w-2xl ${isCreating ? 'cursor-crosshair' : ''}`}
                                    onClick={handleMapClick}
                                >
                                    {/* Stylized Spain SVG Map */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none filter blur-[1px]">
                                        <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-accent stroke-accent/40 stroke-[0.2]">
                                            <path d="M 20 15 L 60 10 L 85 25 L 90 50 L 75 80 L 45 90 L 15 80 L 5 45 Z" />
                                        </svg>
                                    </div>

                                    {/* Real Data Nodes */}
                                    {loading ? (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Loader2 className="w-10 h-10 text-accent animate-spin" />
                                        </div>
                                    ) : (
                                        nuclei.map((loc, i) => (
                                            <motion.div
                                                key={loc.id}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: i * 0.05, type: "spring" }}
                                                style={{ top: `${loc.lat}%`, left: `${loc.lng}%` }}
                                                className="absolute transform -translate-x-1/2 -translate-y-1/2 group/node cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedNucleus(loc);
                                                }}
                                            >
                                                <div className="relative">
                                                    <div className={`w-4 h-4 rounded-sm rotate-45 transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.5)] ${userNuclei.includes(loc.id) ? 'bg-primary scale-125' : 'bg-accent group-hover/node:scale-150'}`} />
                                                    <div className={`absolute inset-0 w-4 h-4 rounded-sm rotate-45 animate-ping opacity-30 ${userNuclei.includes(loc.id) ? 'bg-primary' : 'bg-accent'}`} />

                                                    {/* Tactical Tooltip */}
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-background border-2 border-accent/40 p-4 rounded-sm shadow-[0_0_30px_rgba(0,0,0,0.5)] opacity-0 group-hover/node:opacity-100 transition-all duration-300 whitespace-nowrap z-30 pointer-events-none translate-y-2 group-hover/node:translate-y-0">
                                                        <div className="flex items-center gap-2 mb-2 font-mono text-[8px] text-accent uppercase tracking-widest">
                                                            <ShieldCheck className="w-3 h-3" />
                                                            <span>Sector: {loc.city}</span>
                                                        </div>
                                                        <p className="font-black text-xl uppercase italic tracking-tighter text-foreground">{loc.name}</p>
                                                        <p className="text-[10px] font-mono text-muted uppercase tracking-widest mt-1">Miembros: {loc.member_count}</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}

                                    {/* New Nucleus Preview */}
                                    {newNucleusCoords && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            style={{ top: `${newNucleusCoords.lat}%`, left: `${newNucleusCoords.lng}%` }}
                                            className="absolute transform -translate-x-1/2 -translate-y-1/2"
                                        >
                                            <div className="w-6 h-6 border-2 border-primary border-dashed rounded-full animate-spin-slow flex items-center justify-center">
                                                <div className="w-2 h-2 bg-primary rounded-full" />
                                            </div>
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-primary text-black font-mono text-[8px] px-2 py-0.5 whitespace-nowrap uppercase tracking-widest">
                                                Nuevo Nodo
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Map Overlay Controls */}
                                <div className="absolute bottom-8 right-8 flex flex-col gap-4 font-mono text-[9px] text-muted-foreground uppercase tracking-widest bg-background/80 backdrop-blur-md p-6 border border-white/5 rounded-sm">
                                    <div className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-accent rotate-45" />
                                        <span>Núcleo Operativo</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-white/10 rotate-45" />
                                        <span>En Proceso de Enlace</span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between gap-6">
                                        <span>Zoom: 1.4x</span>
                                        <span>Layer: Ops_Grid</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: BRIEFINGS & ACTION */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-surface/40 border border-white/5 p-8 rounded-sm">
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-foreground mb-8 flex items-center gap-3">
                                    <Target className="w-6 h-6 text-accent" />
                                    Panel de Control
                                </h3>

                                <div className="space-y-6">
                                    {selectedNucleus ? (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="space-y-6"
                                        >
                                            <div className="p-4 bg-background border border-accent/20 rounded-sm">
                                                <div className="flex justify-between items-start mb-4">
                                                    <h4 className="text-xl font-black uppercase italic tracking-tighter">{selectedNucleus.name}</h4>
                                                    <button onClick={() => setSelectedNucleus(null)} className="text-muted hover:text-foreground">
                                                        <Radio className="w-4 h-4 rotate-45 transition-transform" />
                                                    </button>
                                                </div>
                                                <p className="text-sm text-muted italic mb-4">{selectedNucleus.description}</p>
                                                <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest">
                                                    <div className="flex items-center gap-2">
                                                        <Users className="w-3 h-3 text-accent" />
                                                        <span>{selectedNucleus.member_count} Activos</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-3 h-3 text-accent" />
                                                        <span>{selectedNucleus.city}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {userNuclei.includes(selectedNucleus.id) ? (
                                                <button
                                                    onClick={() => handleLeave(selectedNucleus.id)}
                                                    disabled={actionLoading === selectedNucleus.id}
                                                    className="w-full py-4 bg-surface border border-red-500/20 text-red-500 font-extrabold uppercase italic tracking-widest rounded-sm hover:bg-red-500/10 transition-all flex items-center justify-center gap-3 group"
                                                >
                                                    {actionLoading === selectedNucleus.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogOut className="w-5 h-5" />}
                                                    Abandonar Núcleo
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleJoin(selectedNucleus.id)}
                                                    disabled={actionLoading === selectedNucleus.id}
                                                    className="w-full py-4 bg-accent text-background font-extrabold uppercase italic tracking-widest rounded-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group shadow-lg shadow-accent/20"
                                                >
                                                    {actionLoading === selectedNucleus.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <PlusCircle className="w-5 h-5" />}
                                                    Unirse al Núcleo
                                                </button>
                                            )}
                                        </motion.div>
                                    ) : (
                                        <div className="py-20 text-center space-y-4 opacity-50">
                                            <Info className="w-8 h-8 mx-auto text-muted" />
                                            <p className="text-[10px] font-mono uppercase tracking-[0.2em]">Selecciona un núcleo en el mapa para ver el briefing operacional</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-accent to-accent-foreground p-1 rounded-sm overflow-hidden">
                                <div className="bg-background p-8 rounded-sm">
                                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-foreground mb-4">
                                        {isCreating ? 'Modo Despliegue' : '¿Zona sin Enlace?'}
                                    </h3>
                                    <p className="text-sm text-muted mb-8 font-medium italic leading-relaxed">
                                        {isCreating
                                            ? 'Haz clic en el mapa para situar las coordenadas de tu nuevo núcleo operativo.'
                                            : 'Si tu distrito aún no figura en el mapa, toma la iniciativa. Sé el primer nodo de control civil en tu territorio.'}
                                    </p>

                                    {isCreating ? (
                                        <div className="space-y-4">
                                            <button
                                                onClick={() => { setIsCreating(false); setNewNucleusCoords(null); }}
                                                className="w-full py-3 bg-surface border border-white/10 text-muted hover:text-foreground transition-all uppercase tracking-widest font-mono text-[10px] rounded-sm"
                                            >
                                                Cancelar Registro
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setIsCreating(true)}
                                            className="w-full py-4 bg-accent text-background font-black uppercase italic tracking-[0.2em] rounded-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                                        >
                                            <PlusCircle className="w-5 h-5" />
                                            Iniciar Núcleo
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Creation Modal Overlay */}
            <AnimatePresence>
                {newNucleusCoords && isCreating && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-surface border border-primary/30 w-full max-w-md p-8 rounded-sm shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4">
                                <button onClick={() => setNewNucleusCoords(null)} className="text-muted hover:text-primary transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex items-center gap-3 text-primary mb-8 font-mono text-xs uppercase tracking-[0.3em]">
                                <Radio className="w-4 h-4 animate-pulse" />
                                <span>Registro de Nueva Célula</span>
                            </div>

                            <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Detalles del Nodo</h2>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-8 font-mono">
                                Lat: {newNucleusCoords.lat.toFixed(2)} // Lng: {newNucleusCoords.lng.toFixed(2)}
                            </p>

                            <form onSubmit={handleCreate} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-muted uppercase tracking-widest">Identificador del Núcleo</label>
                                    <input
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="EJ: MADRID_NORTE_01"
                                        className="w-full bg-background border border-white/10 p-4 text-sm font-mono text-foreground focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-muted uppercase tracking-widest">Ciudad / Sector</label>
                                    <input
                                        required
                                        value={formData.city}
                                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                                        placeholder="EJ: ALCOBENDAS"
                                        className="w-full bg-background border border-white/10 p-4 text-sm font-mono text-foreground focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-muted uppercase tracking-widest">Breve Descripción Operativa</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        placeholder="Objetivos y modo de contacto..."
                                        className="w-full bg-background border border-white/10 p-4 text-sm font-medium text-foreground focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-primary text-black font-extrabold uppercase italic tracking-widest rounded-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                                >
                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <ChevronRight className="w-5 h-5" />}
                                    Confirmar Despliegue
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
