import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSubHeader } from "@/components/admin/AdminSubHeader";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/auth/login");

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== 'admin') redirect("/dashboard");

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Navigational Identity Layer (Horizontal Sub-header) */}
            <AdminSubHeader />

            {/* Core Operational Space */}
            <main className="flex-1 transition-all duration-500">
                <div className="min-h-screen relative p-4 md:p-8">
                    {/* Background Ambience */}
                    <div className="fixed inset-0 pointer-events-none">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/2 h-full blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-zinc-900/50 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
                    </div>

                    {/* Page Content */}
                    <div className="relative z-10 w-full max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
