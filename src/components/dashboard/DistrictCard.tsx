"use client";

import { useState } from "react";
import { MapPin, Check, Loader2, ChevronDown } from "lucide-react";
import { updateDistrict } from "@/lib/actions/citizen";
import { cn } from "@/lib/utils";

const SPAIN_DISTRICTS = [
    { id: "madrid", name: "Madrid" },
    { id: "barcelona", name: "Barcelona" },
    { id: "valencia", name: "Valencia" },
    { id: "sevilla", name: "Sevilla" },
    { id: "zaragoza", name: "Zaragoza" },
    { id: "malaga", name: "Málaga" },
    { id: "murcia", name: "Murcia" },
    { id: "palma", name: "Palma" },
    { id: "bilbao", name: "Bilbao" },
    { id: "alicante", name: "Alicante" },
    { id: "otros", name: "Otros / Rural" },
];

interface DistrictCardProps {
    initialDistrict: string | null;
    initialZip: string | null;
}

export function DistrictCard({ initialDistrict, initialZip }: DistrictCardProps) {
    const [loading, setLoading] = useState(false);
    const [district, setDistrict] = useState(initialDistrict);
    const [zip, setZip] = useState(initialZip || "");
    const [isEditing, setIsEditing] = useState(!initialDistrict);

    const handleUpdate = async () => {
        if (!district) return;
        setLoading(true);
        try {
            await updateDistrict(district, zip);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating district:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn(
            "bg-zinc-900/50 border p-6 rounded-sm transition-all duration-500 group h-full flex flex-col",
            district && !isEditing ? "border-emerald-600/30" : "border-white/10 hover:border-emerald-600/50"
        )}>
            <div className="flex items-center gap-3 mb-4">
                <MapPin className={cn(
                    "w-5 h-5 transition-colors",
                    district && !isEditing ? "text-emerald-600" : "text-zinc-500"
                )} />
                <h3 className="font-bold text-white text-sm uppercase tracking-wider">Vinculación Territorial</h3>
            </div>

            {isEditing ? (
                <div className="space-y-4 flex-1">
                    <p className="text-zinc-500 text-xs leading-relaxed">
                        Selecciona tu zona de acción para coordinar con otros ciudadanos de tu distrito ministerial.
                    </p>

                    <div className="space-y-3">
                        <div className="relative">
                            <select
                                value={district || ""}
                                onChange={(e) => setDistrict(e.target.value)}
                                className="w-full bg-black border border-white/10 rounded-sm py-2 pl-3 pr-10 text-xs font-mono text-white focus:outline-none focus:border-emerald-600 appearance-none"
                            >
                                <option value="" disabled>Seleccionar Distrito...</option>
                                {SPAIN_DISTRICTS.map((d) => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                        </div>

                        <input
                            type="text"
                            placeholder="CÓDIGO POSTAL (OPCIONAL)"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-sm py-2 px-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-600"
                        />

                        <button
                            onClick={handleUpdate}
                            disabled={loading || !district}
                            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                        >
                            {loading && <Loader2 className="w-3 h-3 animate-spin" />}
                            Vincular Distrito
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col">
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                        Estás vinculado al distrito de <span className="text-white font-bold">{SPAIN_DISTRICTS.find(d => d.id === district)?.name}</span>.
                        Tu presencia fortalece la resistencia local.
                    </p>

                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-mono text-zinc-600 uppercase">Estado</span>
                            <span className="text-emerald-500 text-[10px] font-mono font-black tracking-[0.2em] flex items-center gap-2">
                                <Check className="w-3 h-3" /> VINCULADO
                            </span>
                        </div>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-[10px] font-mono text-zinc-500 hover:text-white transition-colors uppercase underline underline-offset-4"
                        >
                            Cambiar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
