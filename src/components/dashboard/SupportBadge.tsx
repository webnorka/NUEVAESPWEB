import { siteConfig, DonationTier } from "@config";
import { Shield } from "lucide-react";

interface SupportBadgeProps {
    tierId: string;
}

export function SupportBadge({ tierId }: SupportBadgeProps) {
    const tier = (siteConfig.donations.tiers as DonationTier[]).find(t => t.id === tierId);

    if (!tier || tierId === 'none') return null;

    return (
        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-widest ${tier.badgeColor}`}>
            <Shield className="w-3 h-3" />
            Apoyo {tier.name}
        </div>
    );
}
