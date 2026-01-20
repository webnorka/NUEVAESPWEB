"use client";

import { siteConfig, DonationTier } from "@config";
import { Heart, Coins, Shield, CreditCard, Copy, Check } from "lucide-react";
import { useState } from "react";
import { createCheckoutSession } from "@/lib/actions/checkout";

export function DonationPanel({ currentTier }: { currentTier: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(siteConfig.donations.cryptoWallet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-sm">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-red-600" />
                    <h3 className="font-bold text-white text-[10px] uppercase tracking-widest">Apoyo al Proyecto</h3>
                </div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Sin subvenciones. Solo ciudadanos.</div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
                {(siteConfig.donations.tiers as DonationTier[]).map((tier) => (
                    <div
                        key={tier.id}
                        className={`p-5 border transition-all relative group ${currentTier === tier.id
                            ? 'bg-red-600/5 border-red-600/30'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                            }`}
                    >
                        {currentTier === tier.id && (
                            <div className="absolute -top-2 left-4 px-2 py-0.5 bg-red-600 text-[8px] font-bold text-white uppercase tracking-tighter">
                                Tu Nivel Actual
                            </div>
                        )}

                        <div className="flex items-center gap-2 mb-3">
                            <Shield className={`w-4 h-4 ${tier.color}`} />
                            <h4 className="font-black text-white uppercase text-sm tracking-tighter">{tier.name}</h4>
                        </div>

                        <p className="text-[10px] text-zinc-400 mb-6 leading-relaxed line-clamp-2">
                            {tier.description}
                        </p>

                        <div className="flex items-end gap-1 mb-6">
                            <span className="text-2xl font-black text-white leading-none">{tier.price}€</span>
                            <span className="text-[10px] text-zinc-500 font-mono mb-1">/ MES</span>
                        </div>

                        <button
                            onClick={async () => {
                                try {
                                    await createCheckoutSession(tier.id);
                                } catch (e) {
                                    alert("Error al iniciar sesión de pago");
                                }
                            }}
                            disabled={currentTier === tier.id}
                            className={`w-full py-2.5 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-widest transition-all ${currentTier === tier.id
                                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                                : 'bg-white text-black hover:bg-red-600 hover:text-white'
                                }`}
                        >
                            <CreditCard className="w-3 h-3" />
                            {currentTier === tier.id ? 'Activo' : 'Seleccionar'}
                        </button>
                    </div>
                ))}
            </div>

            {/* Crypto Support */}
            <div className="pt-8 border-t border-white/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-4 bg-black/40 border border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-yellow-500">
                            <Coins className="w-5 h-5" />
                        </div>
                        <div>
                            <h5 className="text-[11px] font-bold text-white uppercase tracking-tight">Apoyo vía Cripto (BTC/ETH)</h5>
                            <p className="text-[10px] text-zinc-500 font-mono mt-0.5 truncate max-w-[200px] md:max-w-none">
                                {siteConfig.donations.cryptoWallet}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleCopy}
                        className="flex items-center justify-center gap-2 px-6 py-2 border border-white/10 text-[10px] font-mono uppercase tracking-widest hover:bg-white/5 transition-colors min-w-[140px]"
                    >
                        {copied ? (
                            <>
                                <Check className="w-3 h-3 text-emerald-500" />
                                <span className="text-emerald-500">Copiado</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-3 h-3" />
                                Copiar Wallet
                            </>
                        )}
                    </button>
                </div>
                <p className="text-[9px] text-zinc-600 mt-4 text-center font-mono">
                    Las donaciones vía cripto son directas y no otorgan chapita automática. Si deseas el reconocimiento, contacta con administración con el hash de la transacción.
                </p>
            </div>
        </div>
    );
}
