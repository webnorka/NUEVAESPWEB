import { Hero } from "@/components/Hero";
import { Ideology } from "@/components/Ideology";
import { CorruptionData } from "@/components/CorruptionData";
import { Movements } from "@/components/Movements";
import { VanguardCTA } from "@/components/VanguardCTA";
import { FAQ } from "@/components/FAQ";
import { DonationCTA } from "@/components/DonationCTA";
import { getManifestoContent } from "@/lib/docs";

export default async function Home() {
  const manifestoContent = await getManifestoContent();

  return (
    <div className="flex flex-col gap-0">
      <Hero manifestoContent={manifestoContent} />
      <DonationCTA />
      <Movements />
      <Ideology />
      <CorruptionData />
      <VanguardCTA />
      <FAQ />
    </div>
  );
}

