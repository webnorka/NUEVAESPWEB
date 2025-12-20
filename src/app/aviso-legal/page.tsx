import { siteConfig } from "@config";

export default function LegalNoticePage() {
    return (
        <div className="container mx-auto px-4 py-32 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.9] mb-12 text-white">
                {siteConfig.legal.legalNotice.title}
            </h1>
            <div className="prose prose-invert prose-xl">
                <p className="text-xl text-gray-400 leading-relaxed">
                    {siteConfig.legal.legalNotice.content}
                </p>
            </div>
        </div>
    );
}
