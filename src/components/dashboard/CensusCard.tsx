"use client";

import { useState } from "react";
import { Shield, Check, Loader2 } from "lucide-react";
import { registerInCensus } from "@/lib/actions/citizen";
import { cn } from "@/lib/utils";

interface CensusCardProps {
    isRegistered: boolean;
    registeredAt: string | null;
}

export function CensusCard({ isRegistered: initialIsRegistered, registeredAt: initialRegisteredAt }: CensusCardProps) {
    const [loading, setLoading] = useState(false);
    const [registered, setRegistered] = useState(initialIsRegistered);
    const [date, setDate] = useState(initialRegisteredAt);

    const handleRegister = async () => {
        setLoading(true);
        try {
            await registerInCensus();
            setRegistered(true);
            setDate(new Date().toISOString());
        } catch (error) {
            console.error("Error registering in census:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn(
            "bg-zinc-900/50 border p-6 rounded-sm transition-all duration-500 group relative overflow-hidden",
            registered ? "border-emerald-500/30" : "border-white/10 hover:border-red-600/50"
        )}>
            {/* Background pattern */}
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                <Shield className="w-24 h-24 rotate-12" />
            </div>

            <div className="flex items-center gap-3 mb-4 relative z-10">
                <Shield className={cn(
                    "w-5 h-5 transition-colors duration-500",
                    registered ? "text-emerald-500" : "text-red-600"
                )} />
                <h3 className="font-bold text-white text-sm uppercase tracking-wider">Censo de Resistencia</h3>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6 relative z-10">
                {registered
                    ? "Tu firma ha sido procesada. Formas parte de la métrica oficial de deslegitimación del sistema."
                    : "Tu registro ayuda a visualizar la fuerza real del movimiento fuera de los canales oficiales."}
            </p>

            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
                {registered ? (
                    <>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-mono text-zinc-600 uppercase">Estado</span>
                            <span className="text-emerald-500 text-[10px] font-mono font-black tracking-[0.2em] flex items-center gap-2">
                                <Check className="w-3 h-3" /> REGISTRADO
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-mono text-zinc-600 uppercase">Fecha de Firma</span>
                            <div className="text-[10px] font-mono text-white">
                                {date ? new Date(date).toLocaleDateString() : "--/--/--"}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleRegister}
                            disabled={loading}
                            className="w-full py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            {loading && <Loader2 className="w-3 h-3 animate-spin" />}
                            Firmar Censo de Resistencia
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
