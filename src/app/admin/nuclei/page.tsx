import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NucleiManagement } from "@/components/admin/NucleiManagement";
import { RealtimeActivity } from "@/components/admin/RealtimeActivity";
import { Globe, Terminal } from "lucide-react";

export default async function NucleiAdminPage() {
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

    // Fetch nuclei with member counts
    const { data: nodes } = await supabase
        .from("nuclei")
        .select(`
            *,
            member_count:nucleus_members(count)
        `)
        .order("created_at", { ascending: false });

    // Format nodes to include member_count as a simple number
    const formattedNodes = (nodes || []).map(node => ({
        ...node,
        member_count: node.member_count?.[0]?.count || 0
    }));

    // Fetch initial logs for the realtime feed
    const { data: rawLogs } = await supabase
        .from("activity_logs")
        .select("*, profiles:user_id(username, full_name)")
        .filter("action", "like", "NUCLEUS_%") // Specific nucleus logs if possible
        .order("created_at", { ascending: false })
        .limit(10);

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <Globe className="w-5 h-5 text-primary" />
                        <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
                            Nodos de la <span className="text-primary">Red</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Terminal className="w-3 h-3 text-zinc-600" />
                        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                            Infraestructura_Geogr&aacute;fica // Sec_Admin_03
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <NucleiManagement initialNodes={formattedNodes} />
                </div>
                <div className="lg:col-span-4">
                    <div className="sticky top-8">
                        <RealtimeActivity initialLogs={rawLogs as any} />
                    </div>
                </div>
            </div>
        </div>
    );
}
