"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { User, Loader2, CheckCircle2, AlertCircle, Save } from "lucide-react";

interface ProfileSettingsProps {
    initialProfile: {
        id: string;
        full_name: string | null;
        username: string | null;
    };
}

export function ProfileSettings({ initialProfile }: ProfileSettingsProps) {
    const [fullName, setFullName] = useState(initialProfile.full_name || "");
    const [username, setUsername] = useState(initialProfile.username || "");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const supabase = createClient();

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");

        const { error } = await supabase
            .from("profiles")
            .update({
                full_name: fullName,
                username: username,
                updated_at: new Date().toISOString(),
            })
            .eq("id", initialProfile.id);

        if (error) {
            setStatus("error");
            setErrorMessage(error.message);
        } else {
            setStatus("success");
            setTimeout(() => setStatus("idle"), 3000);
        }
        setLoading(false);
    };

    return (
        <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/5 rounded-full">
                    <User className="w-5 h-5 text-zinc-400" />
                </div>
                <h3 className="font-bold text-white text-sm uppercase tracking-wider">Configuración de Perfil</h3>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-2">Nombre Completo</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-sm py-2 px-3 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
                        placeholder="Tu nombre real"
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-2">Nombre de Usuario (ID Ciudadano)</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-sm py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-600 transition-colors font-mono"
                        placeholder="usuario_ne"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full group relative overflow-hidden bg-white text-black hover:bg-zinc-200 font-bold py-2.5 rounded-sm transition-all flex items-center justify-center gap-2 text-xs"
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                GUARDAR CAMBIOS
                            </>
                        )}
                    </button>
                </div>

                {status === "success" && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-emerald-500 text-[10px] font-mono bg-emerald-500/10 p-2 border border-emerald-500/20"
                    >
                        <CheckCircle2 className="w-3 h-3" />
                        PERFIL ACTUALIZADO CORRECTAMENTE
                    </motion.div>
                )}

                {status === "error" && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-500 text-[10px] font-mono bg-red-500/10 p-2 border border-red-500/20"
                    >
                        <AlertCircle className="w-3 h-3" />
                        ERROR: {errorMessage.toUpperCase()}
                    </motion.div>
                )}
            </form>
        </div>
    );
}
