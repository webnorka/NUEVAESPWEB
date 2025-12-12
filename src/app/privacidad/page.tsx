import { siteConfig } from "@config";

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-24 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
                {siteConfig.legal.privacyPolicy.title}
            </h1>
            <div className="prose prose-invert prose-lg">
                <p className="text-gray-300 leading-relaxed">
                    {siteConfig.legal.privacyPolicy.content}
                </p>
            </div>
        </div>
    );
}
