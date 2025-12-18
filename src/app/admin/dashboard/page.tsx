import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
    ShieldAlert,
    Search,
    Filter,
    Users,
    Activity,
    Terminal
} from "lucide-react";
import { UserActions } from "@/components/admin/UserActions";
import { AdminMetrics } from "@/components/admin/AdminMetrics";
import { RealtimeActivity } from "@/components/admin/RealtimeActivity";

export default async function AdminDashboard() {
    const supabase = await createClient();

    // Verify admin role 
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/auth/login");

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== 'admin') redirect("/dashboard");

    // Fetch initial users for the management table
    const { data: allUsers } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

    // Fetch initial logs for the realtime feed
    const { data: rawLogs } = await supabase
        .from("activity_logs")
        .select("*, profiles:user_id(username, full_name)")
        .order("created_at", { ascending: false })
        .limit(15);

    const initialLogs = rawLogs || [];

    // Initial stats for metrics
    const initialStats = {
        total: allUsers?.length || 0,
        admins: allUsers?.filter(u => u.role === 'admin').length || 0,
        active24h: "89%" // Mock for now, could be real if counting sessions
    };

    return (
        <div className="min-h-screen bg-black pt-24 pb-12 px-4 text-white selection:bg-primary/30">
            <div className="container mx-auto max-w-7xl animate-in fade-in duration-1000">
                {/* Admin Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div className="relative">
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-primary/50 blur-sm" />
                        <h1 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4">
                            <ShieldAlert className="w-10 h-10 text-primary" />
                            Admin <span className="text-primary">Control Hub</span>
                        </h1>
                        <div className="flex items-center gap-3 mt-2">
                            <Terminal className="w-3 h-3 text-zinc-600" />
                            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                                Vanguard OS // System_Admin_Secure_Channel // 2.1.0
                            </p>
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-sm flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Admin Global</span>
                            <span className="text-xs font-black text-white italic tracking-tight">@{profile.role.toUpperCase()}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                            <Users className="w-4 h-4 text-primary" />
                        </div>
                    </div>
                </div>

                {/* Real-time Metrics Layer */}
                <AdminMetrics initialStats={initialStats} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Users Management: 8 Columns */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-zinc-950 border border-white/10 rounded-sm overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.01]">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-black uppercase tracking-tight">
                                        Registro de Ciudadanos
                                    </h2>
                                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-mono font-bold border border-primary/20 rounded-full">
                                        DB_ACC_GRV
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    <div className="relative flex-1 md:w-64">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                        <input
                                            type="text"
                                            placeholder="FILTRAR POR ID O ALIAS..."
                                            className="w-full bg-black border border-white/5 rounded-sm py-2 pl-10 pr-4 text-xs font-mono text-zinc-300 focus:outline-none focus:border-primary/50 transition-all placeholder:text-zinc-700"
                                        />
                                    </div>
                                    <button className="p-2.5 border border-white/5 rounded-sm hover:bg-white/5 transition-colors group">
                                        <Filter className="w-4 h-4 text-zinc-600 group-hover:text-primary transition-colors" />
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white/[0.02] text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-white/10">
                                            <th className="px-6 py-5 font-black">Identidad Ciudadana</th>
                                            <th className="px-6 py-5 font-black text-center">Protocolo</th>
                                            <th className="px-6 py-5 font-black text-right">Intervención</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {allUsers?.map((u) => (
                                            <tr key={u.id} className="hover:bg-primary/[0.02] transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-sm bg-zinc-900 border border-white/5 flex items-center justify-center text-xs font-mono text-zinc-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                            {u.username?.slice(0, 1).toUpperCase() || "N"}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-sm tracking-tight text-zinc-200 group-hover:text-white transition-colors">
                                                                {u.full_name || "NOMBRE NO REGISTRADO"}
                                                            </div>
                                                            <div className="text-[10px] font-mono text-zinc-600">@{u.username || "anon_sys"}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`text-[9px] font-mono font-black px-2.5 py-1 rounded-sm border ${u.role === 'admin'
                                                        ? 'bg-primary/10 text-primary border-primary/20'
                                                        : u.role === 'banned'
                                                            ? 'bg-zinc-800 text-zinc-500 border-white/5 grayscale'
                                                            : 'bg-zinc-900 text-zinc-400 border-white/10'
                                                        }`}>
                                                        {u.role?.toUpperCase() || 'CIUDADANO'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <UserActions userId={u.id} currentRole={u.role || 'user'} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="p-4 bg-black border-t border-white/5 text-center">
                                <button className="text-[9px] font-mono text-zinc-600 hover:text-primary transition-all uppercase tracking-[0.4em]">
                                    Cargar Expedientes Adicionales // End_Of_Buffer
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Activity Feed: 4 Columns */}
                    <div className="lg:col-span-4 h-full">
                        <div className="sticky top-24 h-full">
                            <RealtimeActivity initialLogs={initialLogs as any} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
