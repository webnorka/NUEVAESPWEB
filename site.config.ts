
import { Twitter, Instagram, Youtube, Send, MessageCircle, Mail, LucideIcon } from "lucide-react";

// ===================================
// CONFIGURACIÓN PRINCIPAL DE LA WEB
// ===================================
// Edita este archivo para ajustar textos, enlaces y comportamiento
// sin necesidad de tocar el código de los componentes.

export const siteConfig = {
    // 1. GENERAL
    // -------------------------
    name: "NUEVA ESPAÑA",
    logoText: [
        // Primer bloque debe verse blanco; se usaba una clase inexistente (`text-white-100`) que
        // quedaba sin estilo y heredaba el rojo del contenedor. Usamos el utilitario válido de Tailwind.
        { text: "NUEVA", className: "text-white" },
        { text: "_ES", className: "text-primary" }, // Texto base
        { text: "PA", className: "text-yellow-500" },    // Amarillo (Bandera)
        { text: "ÑA_", className: "text-primary" }        // Texto base
    ],
    domain: "nuevaespaña.eu",
    title: "Nueva España - Verdad y Libertad",
    description: "Plataforma para el renacimiento de la libertad política y la representación ciudadana.",

    // Puerto de desarrollo (Informativo - cambiar en package.json)
    devPort: 3000,

    // 2. VISUAL
    // -------------------------
    // Configuración del contador de miembros
    memberCounter: {
        startCount: 10,      // Número inicial
        updateInterval: 1500,   // Tiempo entre actualizaciones (ms)
        incrementChance: 0.6,   // Probabilidad de nuevos miembros (0.0 - 1.0)
        maxIncrement: 3         // Máximo de miembros por 'tick'
    },

    // Textos y etiquetas
    hero: {
        badge: "Libertad Política Colectiva",
        title: "LA VERDAD",
        subtitle: "NOS HARÁ LIBRES",
        description: "No buscamos reformar el sistema. Buscamos la ruptura democrática para instituir una verdadera democracia en España.",
        ctaPrimary: "Descubre el Ideario",
        ctaSecondary: "Únete a la Acción"
    },

    // 3. MOVIMIENTOS (Hover texts y títulos)
    movements: {
        abstencion: {
            title: "Abstención Activa",
            desc: "No votes hasta que haya representación. Deslegitima el sistema rechazando las listas de partido.",
            action: "Me Comprometo",
            modalData: {
                title: "Deslegitimar para Constituir",
                paragraphs: [
                    "La Abstención Activa no es pasividad ni pereza; es un acto político beligerante de rechazo al sistema. En una partitocracia, votar no es elegir, es ratificar listas cerradas confeccionadas por los jefes de partido.",
                    "Nuestro objetivo estratégico es superar el 50% del censo electoral en abstención. Al retirar el consentimiento, desnudamos al régimen de su autoridad moral y política, provocando una crisis de legitimidad irreversible.",
                    "Esta crisis es la condición necesaria para forzar la apertura de un periodo de Libertad Constituyente, donde la nación pueda decidir libremente su forma de gobierno y establecer reglas que garanticen la separación de poderes."
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
                    "El 'Mito de la Transición' oculta que no hubo ruptura con el franquismo, sino una reforma pactada para repartirse el Estado. Los medios de comunicación son los guardianes de este consenso.",
                    "Tu misión es ser el altavoz de la verdad. Explica a tu entorno que la corrupción no es un fallo del sistema, sino su naturaleza: sin separación de poderes, la corrupción es sistémica e impune.",
                    "Descarga nuestros argumentos, gráficos y vídeos. La hegemonía cultural de la partitocracia solo se rompe con la pedagogía de la libertad política."
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
                    "La democracia formal exige que el diputado represente a su distrito, no a su partido. Hoy, la sociedad civil está secuestrada por subvenciones y partidismo.",
                    "Debemos organizarnos en Juntas de Distrito y Asociaciones Civiles independientes del Estado. Su función no es gobernar, sino vigilar y controlar a los que gobiernan.",
                    "Empieza identificando vecinos con inquietudes similares. La base de la República Constitucional es el ciudadano que no pide favores, sino que exige derechos y fiscaliza el poder."
                ]
            }
        }
    },
    // 5. METRICAS DE CORRUPCIÓN
    // -------------------------
    corruptionMetrics: {
        inefficiency: {
            initial: 40000000000,
            rate: 1268,
            label: "Corrupción e Ineficiencia",
            subLabel: "Coste de oportunidad perdido",
            colorClass: "text-red-500"
        },
        pensions: {
            initial: 52000000000,
            rate: 1648,
            label: "Déficit de Pensiones",
            subLabel: "Deuda acumulada insostenible",
            colorClass: "text-orange-400"
        },
        redundancy: {
            initial: 97000000000,
            rate: 2800,
            label: "Duplicidades Autonómicas",
            subLabel: "Gasto político superfluo",
            colorClass: "text-yellow-400"
        }
    },

    corruptionCases: [
        { name: "ERE Andalucía", amount: 680, color: "#ef4444" },
        { name: "Caso Gürtel", amount: 120, color: "#3b82f6" },
        { name: "Caso Púnica", amount: 250, color: "#3b82f6" },
        { name: "Caso Palau", amount: 35, color: "#eab308" },
        { name: "Caso Malaya", amount: 380, color: "#a855f7" },
    ],

    justiceStats: {
        independentJudges: 0,
        independentLabel: "Jueces elegidos sin intervención política",
        controlPercent: 100,
        controlLabel: "Control de la Partitocracia sobre el Estado"
    },

    // 6. ROADMAP
    // -------------------------
    roadmap: {
        steps: [
            {
                phase: "Fase 1: Despertar",
                title: "Consciencia Colectiva",
                date: "Actualidad",
                description: "Difusión masiva de la mentira de la Transición. Creación de núcleos de abstencionarios en distritos clave.",
                status: "active" // active, pending, completed
            },
            {
                phase: "Fase 2: Organización",
                title: "Asociaciones Civiles",
                date: "2026",
                description: "Constitución de Juntas de Distrito independientes. Estructuración de la sociedad civil al margen del Estado.",
                status: "pending"
            },
            {
                phase: "Fase 3: Acción",
                title: "Hegemonía Abstencionaria",
                date: "2027",
                description: "Superar el 50% de abstención en elecciones generales. Deslegitimación total del régimen partitocrático.",
                status: "pending"
            },
            {
                phase: "Fase 4: Libertad",
                title: "Periodo Constituyente",
                date: "Futuro",
                description: "Apertura de un proceso de libertad constituyente para elegir la forma de gobierno y separar los poderes.",
                status: "pending"
            }
        ]
    },

    // 7. LEGAL
    // -------------------------
    legal: {
        privacyPolicy: {
            title: "Política de Privacidad",
            content: "En cumplimiento de la normativa vigente en materia de protección de datos, le informamos que no recopilamos datos personales de navegación. Los únicos datos tratados serán aquellos que usted nos facilite voluntariamente (por ejemplo, correo electrónico para newsletter), con la única finalidad de mantenerle informado sobre nuestras actividades. Usted puede ejercer sus derechos de acceso, rectificación, cancelación y oposición escribiendo a contacto@nuevaespana.es."
        },
        legalNotice: {
            title: "Aviso Legal",
            content: "Nueva España es una iniciativa ciudadana sin ánimo de lucro. Todos los contenidos de esta web son de libre difusión citando la fuente. No nos hacemos responsables del uso que terceros puedan hacer de la información aquí contenida. Esta plataforma no está financiada por ningún partido político, sindicato ni subvención pública."
        }
    }
};

// 4. REDES SOCIALES
// -------------------------
// Añade o quita redes aquí. El componente JoinMenu se actualizará automáticamente.

export interface SocialLink {
    name: string;
    icon: LucideIcon;
    url: string;
    colorClass: string; // Clase Tailwind para el color hover
    description: string;
}

export const socialLinks: SocialLink[] = [
    {
        name: "Twitter / X",
        icon: Twitter,
        url: "#",
        colorClass: "hover:text-sky-400",
        description: "Actualidad al minuto"
    },
    {
        name: "Instagram",
        icon: Instagram,
        url: "#",
        colorClass: "hover:text-pink-500",
        description: "Imágenes de la resistencia"
    },
    {
        name: "YouTube",
        icon: Youtube,
        url: "#",
        colorClass: "hover:text-red-500",
        description: "Contenido profundo"
    },
    {
        name: "Telegram",
        icon: Send,
        url: "#",
        colorClass: "hover:text-blue-400",
        description: "Canal sin censura"
    },
    {
        name: "Discord",
        icon: MessageCircle,
        url: "#",
        colorClass: "hover:text-indigo-400",
        description: "Coordina con nosotros"
    },
    {
        name: "Newsletter",
        icon: Mail,
        url: "#",
        colorClass: "hover:text-emerald-400",
        description: "Boletín semanal"
    }
];
