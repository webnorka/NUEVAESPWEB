import { Hero } from "@/components/Hero";
import { Ideology } from "@/components/Ideology";
import { CorruptionData } from "@/components/CorruptionData";
import { Movements } from "@/components/Movements";
import { FAQ } from "@/components/FAQ";
import { getManifestoContent } from "@/lib/docs";

export default async function Home() {
  const manifestoContent = await getManifestoContent();

  return (
    <div className="flex flex-col gap-0">
      <Hero manifestoContent={manifestoContent} />
      <Ideology />
      <Movements />
      <CorruptionData />
      <FAQ />
    </div>
  );
}

