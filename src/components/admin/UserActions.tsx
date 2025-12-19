"use client";

import { useState } from "react";
import { ShieldCheck, Ban, Loader2 } from "lucide-react";
import { updateUserRole, banUser } from "@/lib/actions/admin";

interface UserActionsProps {
    userId: string;
    currentRole: string;
}

export function UserActions({ userId, currentRole }: UserActionsProps) {
    const [loading, setLoading] = useState(false);

    const handlePromote = async () => {
        if (!confirm("¿Seguro que quieres cambiar el rol de este usuario?")) return;
        setLoading(true);
        try {
            const nextRole = currentRole === 'admin' ? 'user' : 'admin';
            await updateUserRole(userId, nextRole);
        } catch (error) {
            console.error(error);
            alert("Error al actualizar el rol");
        }
        setLoading(false);
    };

    const handleBan = async () => {
        if (!confirm("¿Seguro que quieres suspender a este usuario?")) return;
        setLoading(true);
        try {
            await banUser(userId);
        } catch (error) {
            console.error(error);
            alert("Error al suspender al usuario");
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-end gap-2">
            {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-zinc-500" />
            ) : (
                <>
                    <button
                        onClick={handlePromote}
                        title={currentRole === 'admin' ? "Degradar a Usuario" : "Promover a Administrador"}
                        className={`p-1.5 transition-colors ${currentRole === 'admin' ? 'text-zinc-500 hover:text-white' : 'text-zinc-500 hover:text-emerald-500'}`}
                    >
                        <ShieldCheck className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleBan}
                        title="Suspender Ciudadano"
                        className="p-1.5 text-zinc-500 hover:text-red-500 transition-colors"
                    >
                        <Ban className="w-4 h-4" />
                    </button>
                </>
            )}
        </div>
    );
}
