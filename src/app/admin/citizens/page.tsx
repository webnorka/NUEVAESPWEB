import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { CitizenManagement } from "@/components/admin/CitizenManagement";
import { RealtimeActivity } from "@/components/admin/RealtimeActivity";
import { Users, Terminal } from "lucide-react";

export default async function CitizensAdminPage() {
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

    // Fetch all users
    const { data: users, error: usersError } = await supabase
        .from("profiles")
        .select("*")
        .order("full_name", { ascending: true });

    if (usersError) {
        console.error("Error fetching citizens:", usersError);
    }

    // Fetch initial logs for the realtime feed
    const { data: rawLogs } = await supabase
        .from("activity_logs")
        .select("*, profiles:user_id(username, full_name)")
        .order("created_at", { ascending: false })
        .limit(10);

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <Users className="w-5 h-5 text-primary" />
                        <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
                            Gesti&oacute;n de <span className="text-primary">Ciudadanos</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Terminal className="w-3 h-3 text-zinc-600" />
                        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                            Base_de_Datos_Poblacional // Sec_Admin_02
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <CitizenManagement initialUsers={users || []} />
                </div>
                <div className="lg:col-span-4">
                    <RealtimeActivity initialLogs={rawLogs as any} />
                </div>
            </div>
        </div>
    );
}
