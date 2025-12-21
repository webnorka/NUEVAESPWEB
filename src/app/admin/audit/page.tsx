import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { RealtimeActivity } from "@/components/admin/RealtimeActivity";
import { ScrollText, Terminal, Activity } from "lucide-react";

export default async function AuditAdminPage() {
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

    // Fetch initial logs (full history or at least a larger batch for this page)
    const { data: rawLogs } = await supabase
        .from("activity_logs")
        .select("*, profiles:user_id(username, full_name)")
        .order("created_at", { ascending: false })
        .limit(50);

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <ScrollText className="w-5 h-5 text-primary" />
                        <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
                            Registros de <span className="text-primary">Auditor&iacute;a</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Terminal className="w-3 h-3 text-zinc-600" />
                        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                            System_Event_Log // Sec_Admin_04
                        </p>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-white/5 p-3 px-4 rounded-sm flex items-center gap-3">
                    <Activity className="w-4 h-4 text-primary animate-pulse" />
                    <div>
                        <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest leading-none">Log_Flow</div>
                        <div className="text-xs font-bold text-white tracking-widest">EN TIEMPO REAL</div>
                    </div>
                </div>
            </div>

            <div className="bg-zinc-950 border border-white/10 rounded-sm overflow-hidden">
                <div className="p-4 bg-white/[0.02] border-b border-white/10">
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] text-center">
                        Mostrando los últimos 50 eventos críticos del sistema
                    </p>
                </div>
                {/* Reusing RealtimeActivity but in a full-width container for this page */}
                <div className="min-h-[600px]">
                    <RealtimeActivity initialLogs={rawLogs as any} />
                </div>
            </div>

            <div className="text-center">
                <button className="px-6 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/5 text-[10px] font-mono text-zinc-500 hover:text-white transition-all uppercase tracking-[0.3em]">
                    Cargar Historial Completo // Archive_Access
                </button>
            </div>
        </div>
    );
}
