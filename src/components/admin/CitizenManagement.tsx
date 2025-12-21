"use client";

import { useState } from "react";
import { Search, Filter, Users, ShieldAlert, ArrowUpDown } from "lucide-react";
import { UserActions } from "@/components/admin/UserActions";
import { motion, AnimatePresence } from "framer-motion";

interface Profile {
    id: string;
    username: string;
    full_name: string;
    role: string;
    census_registered_at: string;
}

interface CitizenManagementProps {
    initialUsers: Profile[];
}

export function CitizenManagement({ initialUsers }: CitizenManagementProps) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [users, setUsers] = useState(initialUsers);

    const filteredUsers = (users || []).filter(user => {
        const username = user.username || "";
        const fullName = user.full_name || "";

        const matchesSearch =
            username.toLowerCase().includes(search.toLowerCase()) ||
            fullName.toLowerCase().includes(search.toLowerCase());

        const matchesFilter =
            filter === "all" || user.role === filter;

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="bg-zinc-950 border border-white/10 rounded-sm overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-black uppercase tracking-tight">
                        Registro de Ciudadanos
                    </h2>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-mono font-bold border border-primary/20 rounded-full">
                        {filteredUsers.length} ACTIVOS
                    </span>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="FILTRAR POR ID O ALIAS..."
                            className="w-full bg-black border border-white/5 rounded-sm py-2 pl-10 pr-4 text-xs font-mono text-zinc-300 focus:outline-none focus:border-primary/50 transition-all placeholder:text-zinc-700"
                        />
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-black border border-white/5 rounded-sm py-2 px-3 text-[10px] font-mono text-zinc-400 uppercase tracking-widest focus:outline-none focus:border-primary/50"
                    >
                        <option value="all">Todos</option>
                        <option value="admin">Admins</option>
                        <option value="citizen">Ciudadanos (NE)</option>
                        <option value="user">Usuarios (Legacy)</option>
                        <option value="moderator">Moderadores</option>
                        <option value="banned">Baneados</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/[0.02] text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-white/10">
                            <th className="px-6 py-5 font-black">Identidad Ciudadana</th>
                            <th className="px-6 py-5 font-black text-center">Protocolo</th>
                            <th className="px-6 py-5 font-black text-center">Fecha de Ingreso</th>
                            <th className="px-6 py-5 font-black text-right">Intervención</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        <AnimatePresence mode="popLayout">
                            {filteredUsers.map((u) => (
                                <motion.tr
                                    key={u.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="hover:bg-primary/[0.02] transition-colors group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-sm bg-zinc-900 border border-white/5 flex items-center justify-center text-xs font-mono text-zinc-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                {u.username?.slice(0, 1).toUpperCase() || "N"}
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm tracking-tight text-zinc-200 group-hover:text-white transition-colors uppercase">
                                                    {u.full_name || "SIN NOMBRE"}
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
                                    <td className="px-6 py-4 text-center text-[10px] font-mono text-zinc-500">
                                        {u.census_registered_at ? new Date(u.census_registered_at).toLocaleDateString() : 'SIN FECHA'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <UserActions userId={u.id} currentRole={u.role || 'citizen'} />
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {filteredUsers.length === 0 && (
                <div className="p-12 text-center">
                    <Users className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
                    <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest">
                        No se han encontrado ciudadanos bajo estos parámetros
                    </p>
                </div>
            )}
        </div>
    );
}
