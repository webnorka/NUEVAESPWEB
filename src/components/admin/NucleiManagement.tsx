"use client";

import { useState } from "react";
import {
    MapPin,
    Plus,
    Edit2,
    Trash2,
    Globe,
    Navigation,
    Loader2,
    X,
    CheckCircle2
} from "lucide-react";
import { createNucleus, updateNucleus, deleteNucleus } from "@/lib/actions/node";
import { motion, AnimatePresence } from "framer-motion";

interface Nucleus {
    id: string;
    name: string;
    city: string;
    region: string;
    lat: number;
    lng: number;
    description: string;
    member_count: number;
    is_active: boolean;
}

interface NucleiManagementProps {
    initialNodes: Nucleus[];
}

export function NucleiManagement({ initialNodes }: NucleiManagementProps) {
    const [nodes, setNodes] = useState(initialNodes);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingNode, setEditingNode] = useState<Nucleus | null>(null);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        city: "",
        region: "",
        lat: 0,
        lng: 0,
        description: ""
    });

    const resetForm = () => {
        setFormData({ name: "", city: "", region: "", lat: 0, lng: 0, description: "" });
        setEditingNode(null);
        setIsFormOpen(false);
    };

    const handleEdit = (node: Nucleus) => {
        setEditingNode(node);
        setFormData({
            name: node.name,
            city: node.city,
            region: node.region || "",
            lat: node.lat,
            lng: node.lng,
            description: node.description || ""
        });
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingNode) {
                await updateNucleus(editingNode.id, formData);
            } else {
                await createNucleus(formData);
            }
            // In a real app, we'd probably re-fetch or use the return data
            window.location.reload(); // Quick way to sync
        } catch (error) {
            console.error(error);
            alert("Error al procesar el nodo");
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("¿Seguro que quieres eliminar este núcleo permanentemente?")) return;
        setLoading(true);
        try {
            await deleteNucleus(id);
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Error al eliminar");
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-black uppercase tracking-tight">Nodos Geogr&aacute;ficos</h2>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest transition-all"
                >
                    <Plus className="w-4 h-4" />
                    A&ntilde;adir Nodo
                </button>
            </div>

            {/* Nodes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nodes.map((node) => (
                    <div
                        key={node.id}
                        className="bg-zinc-900/50 border border-white/5 p-6 rounded-sm relative group hover:border-primary/20 transition-all"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-black text-lg text-white uppercase tracking-tight">{node.name}</h3>
                                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                                    <MapPin className="w-3 h-3 text-primary" />
                                    {node.city}, {node.region}
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <button onClick={() => handleEdit(node)} className="p-2 text-zinc-600 hover:text-white transition-colors">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(node.id)} className="p-2 text-zinc-600 hover:text-red-500 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="p-2 bg-black/40 rounded-sm border border-white/5">
                                <span className="block text-[8px] text-zinc-600 uppercase font-mono tracking-tighter">Latitud</span>
                                <span className="text-xs font-mono text-zinc-300">{node.lat}</span>
                            </div>
                            <div className="p-2 bg-black/40 rounded-sm border border-white/5">
                                <span className="block text-[8px] text-zinc-600 uppercase font-mono tracking-tighter">Longitud</span>
                                <span className="text-xs font-mono text-zinc-300">{node.lng}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-mono">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_theme(colors.emerald.500)]" />
                                <span className="text-zinc-500 uppercase">Activo</span>
                            </div>
                            <div className="text-primary font-black uppercase tracking-widest">
                                {node.member_count} Ciudadanos
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Form */}
            <AnimatePresence>
                {isFormOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={resetForm}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-zinc-950 border border-white/10 p-8 rounded-sm w-full max-w-xl relative overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />

                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter">
                                        {editingNode ? "Editar" : "Crear"} <span className="text-primary">Nodo</span>
                                    </h3>
                                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">
                                        Protocolo_Geogr&aacute;fico_v2.0
                                    </p>
                                </div>
                                <button onClick={resetForm} className="p-2 text-zinc-500 hover:text-white transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Alias del Nodo</label>
                                        <input
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-black border border-white/10 p-3 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-bold tracking-tight"
                                            placeholder="EJ. NÚCLEO CENTRAL MADRID"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Ciudad</label>
                                        <input
                                            required
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            className="w-full bg-black border border-white/10 p-3 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all uppercase"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Regi&oacute;n</label>
                                        <input
                                            required
                                            value={formData.region}
                                            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                                            className="w-full bg-black border border-white/10 p-3 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all uppercase"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Latitud</label>
                                        <input
                                            required
                                            type="number"
                                            step="0.000001"
                                            value={formData.lat}
                                            onChange={(e) => setFormData({ ...formData, lat: parseFloat(e.target.value) })}
                                            className="w-full bg-black border border-white/10 p-3 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-mono"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Longitud</label>
                                        <input
                                            required
                                            type="number"
                                            step="0.000001"
                                            value={formData.lng}
                                            onChange={(e) => setFormData({ ...formData, lng: parseFloat(e.target.value) })}
                                            className="w-full bg-black border border-white/10 p-3 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-mono"
                                        />
                                    </div>
                                </div>

                                <button
                                    disabled={loading}
                                    className="w-full py-4 bg-primary text-black font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Navigation className="w-5 h-5 fill-current" />
                                    )}
                                    {editingNode ? "Actualizar Posici&oacute;n" : "Desplegar Nodo"}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
