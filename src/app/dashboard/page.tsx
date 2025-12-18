import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { User, LogOut, Shield, MapPin, Calendar, LayoutDashboard } from "lucide-react";
import { ProfileSettings } from "@/components/dashboard/ProfileSettings";

export default async function DashboardPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/auth/login");
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    return (
        <div className="min-h-screen bg-black pt-24 pb-12 px-4 text-white">
            <div className="container mx-auto max-w-6xl">
                {/* HUD Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-white/10 pb-8 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Estado: Operativo / Sesión Activa</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                            Panel de <span className="text-red-600">Mando</span>
                        </h1>
                    </div>

                    <form action="/auth/signout" method="post">
                        <button className="flex items-center gap-2 px-6 py-3 border border-white/10 text-white hover:bg-white/5 transition-colors font-mono text-xs uppercase group">
                            <LogOut className="w-4 h-4 group-hover:text-red-500 transition-colors" />
                            Cerrar Sesión
                        </button>
                    </form>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Profile & Settings */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-red-600/10 border border-red-600/20 rounded-full flex items-center justify-center text-red-600">
                                    <User className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg leading-tight">{profile?.full_name || "Miembro NE"}</h3>
                                    <p className="text-zinc-500 text-xs font-mono">{user.email}</p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-white/5">
                                <div className="flex justify-between items-center text-[10px] font-mono">
                                    <span className="text-zinc-500 uppercase">Rol:</span>
                                    <span className="text-emerald-500 font-bold tracking-widest">CIUDADANO</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-mono">
                                    <span className="text-zinc-500 uppercase">Registro:</span>
                                    <span className="text-white">{new Date(user.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        <ProfileSettings initialProfile={{
                            id: user.id,
                            full_name: profile?.full_name || null,
                            username: profile?.username || null
                        }} />
                    </div>

                    {/* Right Column: Stats & Action Cards */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-sm hover:border-red-600/50 transition-colors group">
                                <div className="flex items-center gap-3 mb-4">
                                    <Shield className="w-5 h-5 text-red-600" />
                                    <h3 className="font-bold text-white text-sm uppercase tracking-wider">Censo de Resistencia</h3>
                                </div>
                                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                                    Tu registro ayuda a deslegitimar el sistema. Pronto podrás ver el mapa de abstención activa por distritos.
                                </p>
                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-[10px] font-mono text-zinc-600 uppercase">Estado: Pendiente</span>
                                    <div className="w-2 h-2 bg-zinc-800 rounded-full" />
                                </div>
                            </div>

                            <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-sm hover:border-emerald-600/50 transition-colors group">
                                <div className="flex items-center gap-3 mb-4">
                                    <MapPin className="w-5 h-5 text-emerald-600" />
                                    <h3 className="font-bold text-white text-sm uppercase tracking-wider">Mi Distrito</h3>
                                </div>
                                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                                    Identifica tu distrito uninominal y coordina con otros ciudadanos de tu zona para la acción civil.
                                </p>
                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-[10px] font-mono text-zinc-600 uppercase">Acción Requerida</span>
                                    <span className="text-emerald-500 text-[10px] font-mono font-bold animate-pulse tracking-widest text-center">VINCULAR</span>
                                </div>
                            </div>
                        </div>

                        {/* Activity Feed placeholder */}
                        <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <Calendar className="w-5 h-5 text-zinc-500" />
                                <h3 className="font-bold text-zinc-500 text-[10px] uppercase tracking-widest">Bitácora de Actividad</h3>
                            </div>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-4 p-4 border-l-2 border-red-600 bg-white/5 rounded-r-sm">
                                        <div className="text-[10px] font-mono text-zinc-500 pt-1">08:00</div>
                                        <div>
                                            <p className="text-sm text-white font-medium">Actualización del Sistema de Monitorización</p>
                                            <p className="text-xs text-zinc-500 mt-1">Se han integrado nuevos datos de corrupción del sector público.</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
