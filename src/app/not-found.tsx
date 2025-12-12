import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <div className="bg-primary/10 p-6 rounded-full mb-6 animate-pulse">
                <AlertTriangle className="w-16 h-16 text-primary" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">404</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-lg">
                Lo sentimos, esta página ha desaparecido como la verdad en los medios oficiales.
            </p>
            <Link
                href="/"
                className="px-8 py-3 bg-primary text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
            >
                Volver a la Resistencia
            </Link>
        </div>
    );
}
