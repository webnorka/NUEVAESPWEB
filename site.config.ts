import { Twitter, Instagram, Youtube, Send, MessageCircle, Mail, LucideIcon } from "lucide-react";

// ===================================
// CONFIGURACIÓN PRINCIPAL DE LA WEB
// ===================================

export interface DonationTier {
    id: string;
    name: string;
    price: number;
    currency: string;
    description: string;
    color: string;
    badgeColor: string;
    stripePriceId: string;
}

export interface RoadmapStep {
    phase: string;
    title: string;
    date: string;
    description: string;
    status: "active" | "pending" | "completed";
}

export const siteConfig = {
    // 1. GENERAL
    name: "NUEVA ESPAÑA",
    logoText: [
        { text: "NUEVA", className: "text-white" },
        { text: "_ES", className: "text-primary" },
        { text: "PA", className: "text-yellow-500" },
        { text: "ÑA_", className: "text-primary" }
    ],
    domain: "nuevaespaña.eu",
    title: "Nueva España - Verdad y Libertad",
    description: "Plataforma para el renacimiento de la libertad política y la representación ciudadana.",
    keywords: ["Nueva España", "Libertad Política", "Abstención Activa", "Democracia Formal", "Separación de Poderes", "República Constitucional"],
    authors: [{ name: "Movimiento Nueva España", url: "https://nuevaespaña.eu" }],

    links: {
        signup: "/auth/signup",
        login: "/auth/login",
        dashboard: "/dashboard",
        ideology: "/#ideology",
        movements: "/#movements",
        data: "/#data",
        faq: "/#faq",
        abstencion: "/abstencion",
        difusion: "/difusion",
        asociaciones: "/asociaciones",
        narrativa: "/narrativa",
        privacy: "/privacidad",
        legal: "/aviso-legal"
    },

    openGraph: {
        type: "website",
        locale: "es_ES",
        url: "https://nuevaespaña.eu",
        siteName: "NUEVA ESPAÑA",
    },

    devPort: 3000,

    // 2. VISUAL
    memberCounter: {
        startCount: 10,
        updateInterval: 1500,
        incrementChance: 0.6,
        maxIncrement: 3
    },

    hero: {
        badge: "Libertad Política Colectiva",
        title: "LA VERDAD",
        subtitle: "NOS HARÁ LIBRES",
        description: "No buscamos reformar el sistema. Buscamos la ruptura democrática para instituir una verdadera democracia en España.",
        ctaPrimary: "Descubre el Ideario",
        ctaSecondary: "Únete a la Acción"
    },

    // 3. MOVIMIENTOS
    movements: {
        abstencion: {
            title: "Abstención Activa",
            desc: "No votes hasta que haya representación. Deslegitima el sistema rechazando las listas de partido.",
            action: "Me Comprometo",
            modalData: {
                title: "Deslegitimar para Constituir",
                paragraphs: [
                    "La Abstención Activa no es pasividad ni pereza; es un acto político beligerante de rechazo al sistema.",
                    "Nuestro objetivo estratégico es superar el 50% del censo electoral en abstención.",
                    "Esta crisis es la condición necesaria para forzar la apertura de un periodo de Libertad Constituyente."
                ]
            }
        },
        difusion: {
            title: "Difusión Masiva",
            desc: "Rompe el cerco mediático. La verdad sobre la Transición es nuestra única arma.",
            action: "Descargar Material",
            modalData: {
                title: "Romper el Consenso Prohibido",
                paragraphs: [
                    "El 'Mito de la Transición' oculta que no hubo ruptura con el franquismo.",
                    "Tu misión es ser el altavoz de la verdad.",
                    "Descarga nuestros argumentos, gráficos y vídeos."
                ]
            }
        },
        asociacion: {
            title: "Asociaciones Civiles",
            desc: "Organízate en tu distrito. El control al poder nace de la sociedad civil independiente.",
            action: "Buscar Distrito",
            modalData: {
                title: "Hacia el Distrito Uninominal",
                paragraphs: [
                    "La democracia formal exige que el diputado represente a su distrito.",
                    "Debemos organizarnos en Juntas de Distrito y Asociaciones Civiles independientes del Estado.",
                    "La base de la República Constitucional es el ciudadano que fiscaliza el poder."
                ]
            }
        }
    },

    corruptionMetrics: {
        inefficiency: {
            initial: 90000000000,
            rate: 2853.88,
            label: "Corrupción Sistémica",
            subLabel: "Coste estimado (8% PIB según Parlamento Europeo)",
            colorClass: "text-red-600"
        },
        pensions: {
            initial: 62476000000,
            rate: 1981.10,
            label: "Déficit Real de Pensiones",
            subLabel: "Déficit contributivo total (Seg. Social + Estado)",
            colorClass: "text-orange-600"
        },
        redundancy: {
            initial: 52000000000,
            rate: 1648.90,
            label: "Gasto Político e Ineficiencia",
            subLabel: "Duplicidades y transferencias de sostenimiento",
            colorClass: "text-yellow-500"
        }
    },

    corruptionCases: [
        { name: "Coste Anual Corrupción", amount: 90000, color: "#dc2626", impact: "Equivale a 450 hospitales" },
        { name: "Agujero Pensiones (Año)", amount: 66000, color: "#ea580c", impact: "Déficit estructural" },
        { name: "Rescate Bancario (Total)", amount: 60000, color: "#7c3aed", impact: "Dinero nunca recuperado" },
        { name: "Duplicidades (Año)", amount: 26000, color: "#eab308", impact: "Gasto en burocracia paralela" },
        { name: "Estructura Partidaria", amount: 5000, color: "#2563eb", impact: "Mantenimiento de sedes y cargos" }
    ],

    socialImpact: [
        {
            text: "Sumando corrupción, duplicidades y el agujero de pensiones (208.000 M€/año), cada ciudadano pierde 4.333€ anuales.",
            icon: "Wallet",
            visualType: "banknotes",
            data: { amount: 4333, label: "Paga Extra" }
        },
        {
            text: "El agujero de las pensiones equivale a 4 veces el presupuesto total en I+D.",
            icon: "FlaskConical",
            visualType: "comparison",
            data: { ratio: 4, labelA: "Pensiones", labelB: "I+D" }
        },
        {
            text: "El coste total de la ineficiencia (208.000 M€) equivale a perder 400.000 viviendas sociales cada año.",
            icon: "Home",
            visualType: "grid",
            data: { count: 400000, label: "Viviendas" }
        }
    ],

    justiceStats: {
        independentJudges: 0,
        independentLabel: "Jueces elegidos sin intervención política (CGPJ)",
        controlPercent: 100,
        controlLabel: "Control Partidista del Poder Judicial"
    },

    roadmap: {
        steps: [
            { phase: "Fase 1", title: "Consciencia", date: "Actualidad", description: "Difusión masiva.", status: "active" }
        ] as RoadmapStep[]
    },

    legal: {
        privacyPolicy: {
            title: "Política de Privacidad",
            content: "No recopilamos datos personales de navegación..."
        },
        legalNotice: {
            title: "Aviso Legal",
            content: "Nueva España es una iniciativa ciudadana sin ánimo de lucro..."
        }
    },

    donations: {
        cryptoWallet: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfJH756K",
        tiers: [
            {
                id: "bronze",
                name: "Bronce",
                price: 5,
                currency: "EUR",
                description: "Apoyo básico para el mantenimiento.",
                color: "text-amber-700",
                badgeColor: "bg-amber-700/20 border-amber-700/30 text-amber-700",
                stripePriceId: "price_1SrY1JFWa7WMiJl2vgbekDQT"
            },
            {
                id: "silver",
                name: "Plata",
                price: 15,
                currency: "EUR",
                description: "Contribución para expansión nuclear.",
                color: "text-zinc-400",
                badgeColor: "bg-zinc-400/20 border-zinc-400/30 text-zinc-400",
                stripePriceId: "price_1SrY1KFWa7WMiJl2o3VcM4xt"
            },
            {
                id: "gold",
                name: "Oro",
                price: 30,
                currency: "EUR",
                description: "Impulso total a la Libertad.",
                color: "text-yellow-500",
                badgeColor: "bg-yellow-500/20 border-yellow-500/30 text-yellow-500",
                stripePriceId: "price_1SrY1LFWa7WMiJl2bgeO2Gm5"
            }
        ] as DonationTier[]
    }
};

export interface SocialLink {
    name: string;
    icon: LucideIcon;
    url: string;
    colorClass: string;
    description: string;
}

export const socialLinks: SocialLink[] = [
    { name: "Twitter / X", icon: Twitter, url: "#", colorClass: "hover:text-sky-400", description: "Actualidad" },
    { name: "Instagram", icon: Instagram, url: "#", colorClass: "hover:text-pink-500", description: "Imágenes" },
    { name: "YouTube", icon: Youtube, url: "#", colorClass: "hover:text-red-500", description: "Contenido" },
    { name: "Telegram", icon: Send, url: "#", colorClass: "hover:text-blue-400", description: "Canal" },
    { name: "Discord", icon: MessageCircle, url: "#", colorClass: "hover:text-indigo-400", description: "Coordina" },
    { name: "Newsletter", icon: Mail, url: "#", colorClass: "hover:text-emerald-400", description: "Boletín" }
];
