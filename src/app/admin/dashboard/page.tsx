import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
    ShieldAlert,
    Activity,
    Terminal,
    Users,
    MapPin,
    AlertTriangle
} from "lucide-react";
import { AdminMetrics } from "@/components/admin/AdminMetrics";
import { RealtimeActivity } from "@/components/admin/RealtimeActivity";

export default async function AdminDashboard() {
    const supabase = await createClient();

    // Verify admin role 
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/auth/login");

    const { data: profile } = await supabase
        .from("profiles")
        .select("role, username")
        .eq("id", user.id)
        .single();

    if (profile?.role !== 'admin') redirect("/dashboard");

    // Initial stats for metrics
    const { count: totalUsers } = await supabase.from("profiles").select("*", { count: 'exact', head: true });
    const { count: adminCount } = await supabase.from("profiles").select("*", { count: 'exact', head: true }).eq('role', 'admin');
    const { data: rawLogs } = await supabase
        .from("activity_logs")
        .select("*, profiles:user_id(username, full_name)")
        .order("created_at", { ascending: false })
        .limit(15);

    const initialStats = {
        total: totalUsers || 0,
        admins: adminCount || 0,
        active24h: "89%"
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <Terminal className="w-5 h-5 text-primary" />
                        <h1 className="text-3xl font-black uppercase tracking-tighter">
                            VISTA <span className="text-primary">GENERAL</span>
                        </h1>
                    </div>
                    <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                        Panel de Control Maestro // Acceso_Nivel_9
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="bg-zinc-900 border border-white/5 p-3 px-4 rounded-sm flex items-center gap-3">
                        <Activity className="w-4 h-4 text-emerald-500" />
                        <div>
                            <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest leading-none">Status_Sys</div>
                            <div className="text-xs font-bold text-emerald-400">OPERACIONAL</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <AdminMetrics initialStats={initialStats} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Operations Area (Placeholder for Charts) */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-zinc-950 border border-white/10 rounded-sm p-8 min-h-[400px] relative overflow-hidden flex flex-col items-center justify-center text-center">
                        <div className="relative z-10 space-y-4">
                            <Activity className="w-12 h-12 text-zinc-800 mx-auto animate-pulse" />
                            <h3 className="text-xl font-black uppercase tracking-widest text-zinc-400">Analítica de Movimiento</h3>
                            <p className="text-zinc-600 font-mono text-xs max-w-md mx-auto">
                                Integrando módulos de visualización en tiempo real... Las gráficas de crecimiento aparecerán aquí en breve.
                            </p>
                            <div className="pt-4">
                                <span className="px-4 py-1.5 border border-white/5 text-[10px] text-zinc-700 font-mono rounded-full uppercase tracking-widest">
                                    Compilando_Módulo_Charts
                                </span>
                            </div>
                        </div>

                        {/* Technical Background Deco */}
                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]" />
                        </div>
                    </div>

                    {/* Quick Access Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-sm hover:border-primary/30 transition-all group">
                            <Users className="w-8 h-8 text-zinc-700 mb-4 group-hover:text-primary transition-colors" />
                            <h4 className="font-black uppercase tracking-tight mb-1">Gesti&oacute;n de Ciudadanos</h4>
                            <p className="text-xs text-zinc-500 mb-4 font-medium">Control total sobre roles, accesos y suspensión de cuentas.</p>
                            <button className="text-[10px] font-mono text-primary uppercase tracking-widest border-b border-primary/30 pb-0.5">Acceder M&oacute;dulo ↗</button>
                        </div>
                        <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-sm hover:border-primary/30 transition-all group">
                            <MapPin className="w-8 h-8 text-zinc-700 mb-4 group-hover:text-primary transition-colors" />
                            <h4 className="font-black uppercase tracking-tight mb-1">C&eacute;lulas Regionales</h4>
                            <p className="text-xs text-zinc-500 mb-4 font-medium">Visualización y gestión de nodos geográficos del Mapa de Red.</p>
                            <button className="text-[10px] font-mono text-primary uppercase tracking-widest border-b border-primary/30 pb-0.5">Acceder M&oacute;dulo ↗</button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Activity */}
                <div className="lg:col-span-4">
                    <RealtimeActivity initialLogs={rawLogs as any} />
                </div>
            </div>
        </div>
    );
}
