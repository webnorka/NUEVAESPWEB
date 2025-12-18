import { SceneManager } from "@/components/NarrativeEngine";
import { FloatingHUD } from "@/components/vanguard/FloatingHUD";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Narrativa | Nueva España",
    description: "Una experiencia inmersiva sobre la realidad política de España.",
};

export default function NarrativaPage() {
    return (
        <main className="bg-black text-white selection:bg-red-600 selection:text-white overflow-x-hidden min-h-screen relative">
            <FloatingHUD />
            <SceneManager />
        </main>
    );
}
