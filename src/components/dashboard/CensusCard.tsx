"use client";

import { useState } from "react";
import { Shield, Check, Loader2, AlertCircle } from "lucide-react";
import { registerInCensus, unregisterFromCensus } from "@/lib/actions/citizen";
import { cn } from "@/lib/utils";
import { TacticalModal } from "@/components/ui/TacticalModal";

interface CensusCardProps {
    isRegistered: boolean;
    registeredAt: string | null;
}

export function CensusCard({ isRegistered: initialIsRegistered, registeredAt: initialRegisteredAt }: CensusCardProps) {
    const [loading, setLoading] = useState(false);
    const [registered, setRegistered] = useState(initialIsRegistered);
    const [date, setDate] = useState(initialRegisteredAt);
    const [showCommitModal, setShowCommitModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        try {
            await registerInCensus();
            setRegistered(true);
            setDate(new Date().toISOString());
            setShowCommitModal(false);
        } catch (error) {
            console.error("Error registering in census:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUnregister = async () => {
        setLoading(true);
        try {
            await unregisterFromCensus();
            setRegistered(false);
            setDate(null);
            setShowWithdrawModal(false);
        } catch (error) {
            console.error("Error unregistering from census:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={cn(
                "bg-zinc-900/50 border p-6 rounded-sm transition-all duration-500 group relative overflow-hidden h-full flex flex-col",
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

                <p className="text-zinc-400 text-sm leading-relaxed mb-6 relative z-10 flex-1">
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
                            <button
                                onClick={() => setShowWithdrawModal(true)}
                                className="text-[10px] font-mono text-zinc-500 hover:text-red-500 transition-colors uppercase underline underline-offset-4"
                            >
                                Retirar Firma
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setShowCommitModal(true)}
                            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            Firmar Censo de Resistencia
                        </button>
                    )}
                </div>
            </div>

            {/* Commitment Modal */}
            <TacticalModal
                isOpen={showCommitModal}
                onClose={() => setShowCommitModal(false)}
                title="Compromiso Ciudadano"
                confirmLabel="Confirmar Firma"
                onConfirm={handleRegister}
                confirmVariant="success"
                loading={loading}
            >
                <div className="space-y-4 font-mono">
                    <p className="text-white font-bold border-l-2 border-red-600 pl-4">
                        Al registrarte en el Censo de Resistencia, declaras:
                    </p>
                    <ul className="space-y-2 text-xs">
                        <li className="flex gap-2">
                            <span className="text-red-600 font-bold">[1]</span>
                            <span>Tu deslegitimación activa del actual sistema de partidos.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-red-600 font-bold">[2]</span>
                            <span>Tu compromiso con la libertad política colectiva.</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-red-600 font-bold">[3]</span>
                            <span>Tu consentimiento para que estos datos se utilicen internamente para medir la fuerza del movimiento.</span>
                        </li>
                    </ul>
                    <p className="text-[10px] text-zinc-500 italic mt-4">
                        * Esta acción es reversible en cualquier momento desde tu panel de mando.
                    </p>
                </div>
            </TacticalModal>

            {/* Withdrawal Modal */}
            <TacticalModal
                isOpen={showWithdrawModal}
                onClose={() => setShowWithdrawModal(false)}
                title="Retirar Consentimiento"
                confirmLabel="Confirmar Retirada"
                onConfirm={handleUnregister}
                confirmVariant="danger"
                loading={loading}
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-red-500 mb-4 bg-red-500/10 p-4 border border-red-500/20">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-xs font-bold uppercase tracking-wider">Atención: Acción Irreversible</span>
                    </div>
                    <p className="text-sm">
                        ¿Estás seguro de que deseas retirar tu firma del Censo de Resistencia? Tus datos serán eliminados de la métrica de fuerza global de forma inmediata.
                    </p>
                </div>
            </TacticalModal>
        </>
    );
}
