"use client";

import { useState, useEffect } from "react";
import { MapPin, Check, Loader2, ChevronDown, ShieldCheck, Globe } from "lucide-react";
import { updateDistrict } from "@/lib/actions/citizen";
import { cn } from "@/lib/utils";
import { TacticalModal } from "@/components/ui/TacticalModal";

const CCAA_LIST = [
    "Andalucía", "Aragón", "Asturias", "Baleares", "Canarias", "Cantabria",
    "Castilla-La Mancha", "Castilla y León", "Cataluña", "Comunidad Valenciana",
    "Extremadura", "Galicia", "Madrid", "Murcia", "Navarra", "País Vasco",
    "La Rioja", "Ceuta", "Melilla"
];

interface DistrictCardProps {
    initialRegion: string | null;
    initialLocality: string | null;
    initialZip: string | null;
}

export function DistrictCard({ initialRegion, initialLocality, initialZip }: DistrictCardProps) {
    const [loading, setLoading] = useState(false);
    const [zipLoading, setZipLoading] = useState(false);
    const [region, setRegion] = useState(initialRegion || "");
    const [locality, setLocality] = useState(initialLocality || "");
    const [zip, setZip] = useState(initialZip || "");
    const [isEditing, setIsEditing] = useState(!initialZip);
    const [showConsentModal, setShowConsentModal] = useState(false);

    // ZIP Lookup Logic
    useEffect(() => {
        const lookupZip = async () => {
            if (zip.length === 5) {
                setZipLoading(true);
                try {
                    const response = await fetch(`https://api.zippopotam.us/es/${zip}`);
                    if (response.ok) {
                        const data = await response.json();
                        const place = data.places[0];
                        setLocality(place['place name']);
                        setRegion(place['state']);
                    }
                } catch (error) {
                    console.error("ZIP lookup failed:", error);
                } finally {
                    setZipLoading(false);
                }
            }
        };
        lookupZip();
    }, [zip]);

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateDistrict({
                region,
                locality,
                zipCode: zip
            });
            setIsEditing(false);
            setShowConsentModal(false);
        } catch (error) {
            console.error("Error updating district:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={cn(
                "bg-zinc-900/50 border p-6 rounded-sm transition-all duration-500 group h-full flex flex-col",
                !isEditing ? "border-emerald-600/30 shadow-[0_0_20px_rgba(16,185,129,0.05)]" : "border-white/10 hover:border-emerald-600/50"
            )}>
                <div className="flex items-center gap-3 mb-4">
                    <MapPin className={cn(
                        "w-5 h-5 transition-colors",
                        !isEditing ? "text-emerald-600" : "text-zinc-500"
                    )} />
                    <h3 className="font-bold text-white text-sm uppercase tracking-wider">Vinculación Territorial</h3>
                </div>

                {isEditing ? (
                    <div className="space-y-4 flex-1">
                        <p className="text-zinc-500 text-xs leading-relaxed font-mono">
                            <span className="text-emerald-500 mr-2"> {">"} </span>
                            Introduce tu Código Postal para auto-localizar tu zona de acción.
                        </p>

                        <div className="space-y-3">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="CÓDIGO POSTAL (5 DÍGITOS)"
                                    maxLength={5}
                                    value={zip}
                                    onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
                                    className="w-full bg-black border border-white/10 rounded-sm py-2 px-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-600 placeholder:text-zinc-700 underline underline-offset-4 decoration-white/20"
                                />
                                {zipLoading && (
                                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 animate-spin" />
                                )}
                            </div>

                            <div className="relative">
                                <select
                                    value={region}
                                    onChange={(e) => setRegion(e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded-sm py-2 pl-3 pr-10 text-xs font-mono text-white focus:outline-none focus:border-emerald-600 appearance-none"
                                >
                                    <option value="" disabled>Comunidad Autónoma...</option>
                                    {CCAA_LIST.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                            </div>

                            <input
                                type="text"
                                placeholder="LOCALIDAD / CIUDAD"
                                value={locality}
                                onChange={(e) => setLocality(e.target.value)}
                                className="w-full bg-black border border-white/10 rounded-sm py-2 px-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-600"
                            />

                            <button
                                onClick={() => setShowConsentModal(true)}
                                disabled={!zip || !region || !locality || zip.length < 5}
                                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                            >
                                Vincular Distrito
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col">
                        <div className="mb-6">
                            <div className="text-[10px] font-mono text-zinc-600 uppercase mb-1">Zona Asignada</div>
                            <p className="text-zinc-200 text-sm leading-relaxed">
                                <span className="text-white font-bold">{locality}</span>, {region}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-white/5 border border-white/5 p-3 rounded-sm">
                                <div className="text-[8px] font-mono text-zinc-500 uppercase mb-1">C. Postal</div>
                                <div className="text-xs font-mono text-white">{zip}</div>
                            </div>
                            <div className="bg-white/5 border border-white/5 p-3 rounded-sm">
                                <div className="text-[8px] font-mono text-zinc-500 uppercase mb-1">Nivel</div>
                                <div className="text-xs font-mono text-emerald-500">Localizado</div>
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-mono text-zinc-600 uppercase">Estado Sincronización</span>
                                <span className="text-emerald-500 text-[10px] font-mono font-black tracking-[0.2em] flex items-center gap-2">
                                    <ShieldCheck className="w-3 h-3" /> ACTIVO
                                </span>
                            </div>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-[10px] font-mono text-zinc-500 hover:text-white transition-colors uppercase underline underline-offset-4"
                            >
                                Editar
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Consent Modal */}
            <TacticalModal
                isOpen={showConsentModal}
                onClose={() => setShowConsentModal(false)}
                title="Consentimiento de Datos"
                confirmLabel="Aceptar y Vincular"
                onConfirm={handleSave}
                confirmVariant="success"
                loading={loading}
            >
                <div className="space-y-6">
                    <div className="flex items-center gap-3 text-emerald-500 bg-emerald-500/10 p-4 border border-emerald-500/20">
                        <Globe className="w-5 h-5 flex-shrink-0" />
                        <span className="text-xs font-black uppercase tracking-widest">Protocolo de Organización Territorial</span>
                    </div>

                    <div className="space-y-4 font-mono text-xs leading-relaxed">
                        <p>
                            Al vincular tu distrito, autorizas a Nueva España a:
                        </p>
                        <ul className="space-y-3">
                            <li className="flex gap-3">
                                <div className="w-1 h-1 bg-emerald-500 mt-1 flex-shrink-0" />
                                <span>Almacenar tu ubicación por zona (sin coordenadas exactas) para organizar la logística del movimiento.</span>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-1 h-1 bg-emerald-500 mt-1 flex-shrink-0" />
                                <span>Permitir que administradores del sistema visualicen la densidad de ciudadanos en tu localidad.</span>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-1 h-1 bg-emerald-500 mt-1 flex-shrink-0" />
                                <span>Futuro: Habilitar canales de comunicación exclusivos para tu distrito ministerial.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="text-[10px] text-zinc-500 bg-black p-3 border border-white/5 font-mono">
                        CONFIDENCIALIDAD: Tus datos nunca serán compartidos con terceros fuera de la red de confianza de Nueva España.
                    </div>
                </div>
            </TacticalModal>
        </>
    );
}
