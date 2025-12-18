"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, User, UserPlus } from "lucide-react";

export function SignUpForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const supabase = createClient();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (error) {
            setError(error.message);
        } else {
            setSuccess(true);
        }
        setLoading(false);
    };

    if (success) {
        return (
            <div className="w-full max-w-md mx-auto p-8 bg-zinc-900/50 border border-emerald-500/20 backdrop-blur-xl rounded-sm text-center">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4 inline-block">
                    <Mail className="w-8 h-8 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Verifica tu Correo</h2>
                <p className="text-zinc-400 text-sm">
                    Hemos enviado un enlace de confirmación a <span className="text-white font-bold">{email}</span>.
                </p>
                <div className="mt-8">
                    <a href="/auth/login" className="text-emerald-500 hover:underline font-mono text-xs uppercase">Ir a Iniciar Sesión</a>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto p-8 bg-zinc-900/50 border border-white/10 backdrop-blur-xl rounded-sm">
            <div className="flex flex-col items-center mb-8">
                <div className="p-3 bg-red-600/10 border border-red-600/20 rounded-full mb-4">
                    <UserPlus className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Únete a la Acción</h2>
                <p className="text-zinc-500 text-sm mt-1">Crea tu cuenta para el registro civil móvil</p>
            </div>

            <form onSubmit={handleSignUp} className="space-y-6">
                <div>
                    <label className="block text-xs font-mono text-zinc-500 uppercase mb-2">Nombre Completo</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-sm py-3 pl-10 pr-4 text-white focus:outline-none focus:border-red-600 transition-colors"
                            placeholder="Juan Pérez"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-mono text-zinc-500 uppercase mb-2">Correo Electrónico</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-sm py-3 pl-10 pr-4 text-white focus:outline-none focus:border-red-600 transition-colors"
                            placeholder="tu@email.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-mono text-zinc-500 uppercase mb-2">Contraseña</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-sm py-3 pl-10 pr-4 text-white focus:outline-none focus:border-red-600 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs font-mono bg-red-500/10 p-3 border border-red-500/20"
                    >
                        ERROR: {error.toUpperCase()}
                    </motion.p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full group relative overflow-hidden bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-sm transition-all flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        "REGISTRARSE"
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-zinc-600 text-[10px] font-mono uppercase">
                    ¿Ya tienes una cuenta? <a href="/auth/login" className="text-red-600 hover:underline">Inicia Sesión</a>
                </p>
            </div>
        </div>
    );
}
