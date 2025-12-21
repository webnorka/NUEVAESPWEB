"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Users, ShieldAlert, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminMetricsProps {
    initialStats: {
        total: number;
        admins: number;
        active24h: string;
    };
}

export function AdminMetrics({ initialStats }: AdminMetricsProps) {
    const [stats, setStats] = useState(initialStats);
    const [highlight, setHighlight] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        let channel: any;

        const setupSubscription = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            if (profile?.role !== 'admin') return;

            // Subscribe to changes in profiles table
            channel = supabase
                .channel('admin_metrics_sync')
                .on(
                    'postgres_changes',
                    { event: '*', table: 'profiles', schema: 'public' },
                    async () => {
                        // Refetch counts for accuracy
                        const { count: total } = await supabase
                            .from('profiles')
                            .select('*', { count: 'exact', head: true });

                        const { count: admins } = await supabase
                            .from('profiles')
                            .select('*', { count: 'exact', head: true })
                            .eq('role', 'admin');

                        setStats(prev => ({
                            ...prev,
                            total: total || prev.total,
                            admins: admins || prev.admins
                        }));

                        setHighlight('total');
                        setTimeout(() => setHighlight(null), 2000);
                    }
                )
                .subscribe();
        };

        setupSubscription();

        return () => {
            if (channel) supabase.removeChannel(channel);
        };
    }, [supabase]);

    const metrics = [
        { id: 'total', name: "Ciudadanos Totales", value: stats.total, icon: Users, color: "text-blue-500", glow: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]" },
        { id: 'admins', name: "Administradores", value: stats.admins, icon: ShieldAlert, color: "text-red-500", glow: "group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]" },
        { id: 'activity', name: "Actividad 24h", value: stats.active24h, icon: Activity, color: "text-emerald-500", glow: "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {metrics.map((stat) => (
                <motion.div
                    key={stat.name}
                    layout
                    className={`group relative bg-zinc-900/50 border border-white/10 p-6 rounded-sm backdrop-blur-sm transition-all duration-500 ${stat.glow} ${highlight === stat.id ? 'border-primary/50 bg-primary/5 scale-[1.02]' : ''}`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <stat.icon className={`w-6 h-6 ${stat.color} ${highlight === stat.id ? 'animate-bounce' : ''}`} />
                        <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${highlight === stat.id ? 'bg-primary animate-ping' : 'bg-zinc-800'}`} />
                            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Sincronizado</span>
                        </div>
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={stat.value}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-black tracking-tighter mb-1"
                        >
                            {stat.value}
                        </motion.div>
                    </AnimatePresence>
                    <div className="text-xs text-zinc-400 uppercase font-bold tracking-wider">{stat.name}</div>

                    {/* Stealth background progress line */}
                    <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-white/5 to-transparent w-full" />
                </motion.div>
            ))}
        </div>
    );
}
