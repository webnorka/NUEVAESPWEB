"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ShieldCheck, Ban, UserCog, Clock, Terminal, MapPin, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LogEntry {
    id: string;
    action: string;
    created_at: string;
    ip_address: string;
    details: any;
    entity_id: string | null;
    profiles?: {
        username: string;
        full_name: string;
    };
}

export function RealtimeActivity({ initialLogs = [] }: { initialLogs?: LogEntry[] }) {
    const [logs, setLogs] = useState<LogEntry[]>(initialLogs || []);
    const supabase = createClient();

    useEffect(() => {
        const channel = supabase
            .channel('admin_activity_feed')
            .on(
                'postgres_changes',
                { event: 'INSERT', table: 'activity_logs', schema: 'public' },
                async (payload) => {
                    // Fetch profile details for the new log
                    const { data: newLog } = await supabase
                        .from('activity_logs')
                        .select('*, profiles:user_id(username, full_name)')
                        .eq('id', payload.new.id)
                        .single();

                    if (newLog) {
                        setLogs(prev => [newLog, ...prev.slice(0, 14)]);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase]);

    const getIcon = (action: string) => {
        switch (action) {
            case 'ROLE_CHANGE': return UserCog;
            case 'USER_BAN': return Ban;
            case 'NUCLEUS_CREATE': return MapPin;
            case 'NUCLEUS_UPDATE': return MapPin;
            case 'NUCLEUS_DELETE': return Trash2;
            default: return ShieldCheck;
        }
    };

    const getActionColor = (action: string) => {
        switch (action) {
            case 'ROLE_CHANGE': return 'text-blue-500';
            case 'USER_BAN': return 'text-red-500';
            case 'NUCLEUS_CREATE': return 'text-emerald-500';
            case 'NUCLEUS_UPDATE': return 'text-amber-500';
            case 'NUCLEUS_DELETE': return 'text-rose-500';
            default: return 'text-zinc-500';
        }
    };

    return (
        <div className="bg-zinc-900/30 border border-white/10 rounded-sm overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-primary" />
                    Línea de Vida
                </h2>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">En Directo</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-white/5">
                <AnimatePresence initial={false}>
                    {logs.length === 0 ? (
                        <div className="p-12 text-center text-zinc-600 font-mono text-xs uppercase tracking-widest">
                            Sin actividad registrada
                        </div>
                    ) : (
                        <div className="divide-y divide-white/5">
                            {logs.map((log) => {
                                const Icon = getIcon(log.action);
                                const colorClass = getActionColor(log.action);

                                return (
                                    <motion.div
                                        key={log.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="p-4 hover:bg-white/[0.02] transition-colors relative group"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`mt-1 p-2 rounded-sm bg-zinc-800 border border-white/5 shadow-inner ${colorClass}`}>
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2 mb-1">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 truncate">
                                                        {log.profiles?.username || 'Sistema'}
                                                    </span>
                                                    <span className="text-[9px] font-mono text-zinc-600 shrink-0">
                                                        {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-zinc-300 font-medium leading-relaxed">
                                                    {log.action === 'ROLE_CHANGE' && (
                                                        <>Cambió rol de <span className="text-white">@{log.details?.target_username}</span> a <span className="text-blue-400 capitalize">{log.details?.new_role}</span></>
                                                    )}
                                                    {log.action === 'USER_BAN' && (
                                                        <>Suspendió permanentemente a <span className="text-red-500 font-bold">@{log.details?.target_username}</span></>
                                                    )}
                                                    {log.action === 'NUCLEUS_CREATE' && (
                                                        <>Desplegó nuevo nodo geográfico: <span className="text-emerald-400">{log.details?.name}</span> en <span className="text-zinc-400">{log.details?.city}</span></>
                                                    )}
                                                    {log.action === 'NUCLEUS_UPDATE' && (
                                                        <>Actualizó parámetros del nodo: <span className="text-amber-400">{log.details?.name || log.entity_id}</span></>
                                                    )}
                                                    {log.action === 'NUCLEUS_DELETE' && (
                                                        <>Eliminó el nodo de red: <span className="text-rose-500 font-bold">{log.entity_id}</span></>
                                                    )}
                                                    {!['ROLE_CHANGE', 'USER_BAN', 'NUCLEUS_CREATE', 'NUCLEUS_UPDATE', 'NUCLEUS_DELETE'].includes(log.action) && log.action}
                                                </p>
                                                <div className="mt-2 text-[9px] font-mono text-zinc-600 uppercase flex items-center gap-2">
                                                    <span className="px-1.5 py-0.5 bg-black/40 rounded-sm border border-white/5 tracking-wider">
                                                        IDENT: {log.id.slice(0, 8)}
                                                    </span>
                                                    <span className="px-1.5 py-0.5 bg-black/40 rounded-sm border border-white/5 tracking-wider">
                                                        IP: {log.ip_address}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </AnimatePresence>
            </div>

            <div className="p-4 bg-white/[0.03] border-t border-white/10 text-center">
                <button className="text-[10px] font-mono text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.2em] w-full">
                    Acceder a Registros de Auditoría ▾
                </button>
            </div>
        </div>
    );
}
