import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
    Users,
    ShieldAlert,
    Activity,
    Search,
    Filter,
    ShieldCheck,
    Ban
} from "lucide-react";
import { UserActions } from "@/components/admin/UserActions";

export default async function AdminDashboard() {
    const supabase = await createClient();

    // Verify admin role again (server-side safety)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/auth/login");

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== 'admin') redirect("/dashboard");

    // Fetch users for the management table
    const { data: allUsers } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

    // Mock stats for visualization
    const stats = [
        { name: "Ciudadanos Totales", value: allUsers?.length || 0, icon: Users, color: "text-blue-500" },
        { name: "Admins Activos", value: allUsers?.filter(u => u.role === 'admin').length || 0, icon: ShieldAlert, color: "text-red-500" },
        { name: "Actividad 24h", value: "84%", icon: Activity, color: "text-emerald-500" },
    ];

    return (
        <div className="min-h-screen bg-black pt-24 pb-12 px-4 text-white">
            <div className="container mx-auto max-w-7xl">
                {/* Admin Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                            <ShieldAlert className="w-8 h-8 text-red-600" />
                            Centro de <span className="text-red-600">Control Central</span>
                        </h1>
                        <p className="text-zinc-500 font-mono text-xs mt-2 uppercase tracking-widest">
                            NUEVA ESPAÑA // PROTOCOLO DE ADMINISTRACIÓN NIVEL 1
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {stats.map((stat) => (
                        <div key={stat.name} className="bg-zinc-900/50 border border-white/10 p-6 rounded-sm backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-4">
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Métrica Sincronizada</span>
                            </div>
                            <div className="text-4xl font-black tracking-tighter mb-1">{stat.value}</div>
                            <div className="text-xs text-zinc-400 uppercase font-bold tracking-wider">{stat.name}</div>
                        </div>
                    ))}
                </div>

                {/* Users Management Section */}
                <div className="bg-zinc-900/30 border border-white/10 rounded-sm overflow-hidden">
                    <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                            Gestión de Ciudadanos
                        </h2>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <input
                                    type="text"
                                    placeholder="BUSCAR ID O NOMBRE..."
                                    className="w-full bg-black border border-white/10 rounded-sm py-2 pl-10 pr-4 text-xs font-mono text-white focus:outline-none focus:border-red-600 transition-colors"
                                />
                            </div>
                            <button className="p-2 border border-white/10 rounded-sm hover:bg-white/5 transition-colors">
                                <Filter className="w-4 h-4 text-zinc-400" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-white/10">
                                    <th className="px-6 py-4 font-black">Ciudadano</th>
                                    <th className="px-6 py-4 font-black">ID Usuario</th>
                                    <th className="px-6 py-4 font-black">Rol</th>
                                    <th className="px-6 py-4 font-black">Registro</th>
                                    <th className="px-6 py-4 font-black text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {allUsers?.map((user) => (
                                    <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-sm tracking-tight">{user.full_name || "SIN NOMBRE"}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-xs font-mono text-zinc-400">@{user.username || "sin_id"}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded-full border ${user.role === 'admin'
                                                ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                                : user.role === 'banned'
                                                    ? 'bg-zinc-800 text-zinc-500 border-white/5'
                                                    : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                                }`}>
                                                {user.role?.toUpperCase() || 'USER'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-mono text-zinc-500">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <UserActions userId={user.id} currentRole={user.role || 'user'} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 bg-white/5 border-t border-white/10 text-center">
                        <button className="text-[10px] font-mono text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.2em]">
                            Ver todos los ciudadanos registrados ▾
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
