import { createClient } from "@/lib/supabase/server";
import { ShieldCheck, Ban, UserCog, Clock } from "lucide-react";

export async function ActivityFeed() {
    const supabase = await createClient();

    const { data: logs } = await supabase
        .from("activity_logs")
        .select(`
            *,
            profiles:user_id(username, full_name)
        `)
        .order("created_at", { ascending: false })
        .limit(10);

    const getIcon = (action: string) => {
        switch (action) {
            case 'ROLE_CHANGE': return UserCog;
            case 'USER_BAN': return Ban;
            default: return ShieldCheck;
        }
    };

    const getActionColor = (action: string) => {
        switch (action) {
            case 'ROLE_CHANGE': return 'text-blue-500';
            case 'USER_BAN': return 'text-red-500';
            default: return 'text-zinc-500';
        }
    };

    return (
        <div className="bg-zinc-900/30 border border-white/10 rounded-sm overflow-hidden h-full">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                    Línea de Vida
                </h2>
                <Clock className="w-4 h-4 text-zinc-500" />
            </div>

            <div className="p-0">
                {!logs || logs.length === 0 ? (
                    <div className="p-12 text-center text-zinc-600 font-mono text-xs uppercase tracking-widest">
                        Sin actividad registrada
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {logs.map((log) => {
                            const Icon = getIcon(log.action);
                            const colorClass = getActionColor(log.action);

                            return (
                                <div key={log.id} className="p-4 hover:bg-white/[0.02] transition-colors">
                                    <div className="flex items-start gap-3">
                                        <div className={`mt-1 p-1.5 rounded-sm bg-zinc-800 border border-white/5 ${colorClass}`}>
                                            <Icon className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 truncate">
                                                    {log.profiles?.username || 'Sistema'}
                                                </span>
                                                <span className="text-[9px] font-mono text-zinc-600 shrink-0">
                                                    {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <p className="text-xs text-zinc-300 font-medium leading-relaxed">
                                                {log.action === 'ROLE_CHANGE' && (
                                                    <>Cambió rol de <span className="text-white">@{log.details?.target_username}</span> a <span className="text-blue-400 capitalize">{log.details?.new_role}</span></>
                                                )}
                                                {log.action === 'USER_BAN' && (
                                                    <>Baneó permanentemente a <span className="text-red-500 font-bold">@{log.details?.target_username}</span></>
                                                )}
                                                {!['ROLE_CHANGE', 'USER_BAN'].includes(log.action) && log.action}
                                            </p>
                                            <div className="mt-2 text-[9px] font-mono text-zinc-600 uppercase flex items-center gap-2">
                                                <span className="px-1.5 py-0.5 bg-white/5 rounded-sm border border-white/5 tracking-wider">
                                                    IP: {log.ip_address}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="p-4 bg-white/5 border-t border-white/10 text-center">
                <button className="text-[10px] font-mono text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.2em]">
                    Auditoría Completa ▾
                </button>
            </div>
        </div>
    );
}
