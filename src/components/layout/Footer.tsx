import Link from "next/link";
import { siteConfig, socialLinks } from "@config";

export function Footer() {
    return (
        <footer className="bg-secondary py-12 border-t border-white/10">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 items-start">
                    <div className="space-y-3">
                        <h3 className="text-xl font-bold">{siteConfig.name}</h3>
                        <p className="text-sm text-gray-400">
                            {siteConfig.description}
                        </p>
                        <div className="flex gap-2">
                            {socialLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.url}
                                    target={link.url.startsWith("http") ? "_blank" : undefined}
                                    rel={link.url.startsWith("http") ? "noreferrer" : undefined}
                                    className={`p-2 rounded-lg border border-white/5 hover:border-white/20 transition-colors ${link.colorClass}`}
                                    aria-label={link.name}
                                >
                                    <link.icon className="w-4 h-4" />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Enlaces</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="#ideology" className="hover:text-white">Ideograma</Link></li>
                            <li><Link href="#data" className="hover:text-white">Datos de Corrupción</Link></li>
                            <li><Link href="/roadmap" className="hover:text-white">Roadmap</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Contacto</h4>
                        <p className="text-sm text-gray-400">
                            Únete a la causa. La verdad nos hará libres.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            {siteConfig.domain}
                        </p>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
                    <span>© {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.</span>
                    <div className="flex gap-6">
                        <Link href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link>
                        <Link href="/aviso-legal" className="hover:text-white transition-colors">Aviso Legal</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
