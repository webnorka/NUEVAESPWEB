export interface NarrativeStep {
    id: string;
    type: 'chat' | 'statement' | 'choice' | 'visual';
    sender?: 'system' | 'citizen' | 'resistance';
    content: string;
    nextId?: string;
    options?: { label: string; nextId: string }[];
    animation?: 'fade' | 'slide' | 'zoom';
}

export const NARRATIVE_DATA: NarrativeStep[] = [
    {
        id: 'start',
        type: 'statement',
        content: '¿Vives en una democracia o en una ilusión?',
        animation: 'zoom',
        nextId: 'intro-1'
    },
    {
        id: 'intro-1',
        type: 'chat',
        sender: 'resistance',
        content: 'La mayoría de la gente piensa que elegir entre dos colores es libertad. Pero el sistema está diseñado para que gane quien gane, pierdas tú.',
        nextId: 'question-1'
    },
    {
        id: 'question-1',
        type: 'choice',
        content: 'Cuando vas a votar, ¿sientes que el político realmente te debe algo a TI?',
        options: [
            { label: 'Sí, para eso le voto.', nextId: 'reply-naive' },
            { label: 'No, solo responden ante su partido.', nextId: 'reply-aware' }
        ]
    },
    {
        id: 'reply-naive',
        type: 'chat',
        sender: 'resistance',
        content: 'Ese es el gran engaño. Su jefe de partido le pone en la lista, no tú. Él le debe su cargo al jefe, no a tu voto.',
        nextId: 'problem-core'
    },
    {
        id: 'reply-aware',
        type: 'chat',
        sender: 'resistance',
        content: 'Exacto. Eres un espectador, no un ciudadano. El sistema de listas cerradas es el muro que separa al pueblo del poder.',
        nextId: 'problem-core'
    },
    {
        id: 'problem-core',
        type: 'visual',
        content: 'LA CORRUPCIÓN ES EL SISTEMA',
        animation: 'slide',
        nextId: 'solution-intro'
    },
    {
        id: 'solution-intro',
        type: 'statement',
        content: 'Sin separación de poderes, solo hay dueños del Estado.',
        animation: 'fade',
        nextId: 'call-action'
    },
    {
        id: 'call-action',
        type: 'choice',
        content: 'Ha llegado el momento de dejar de legitimar la mentira. ¿Qué eliges?',
        options: [
            { label: 'Quiero la Verdad (Ideario)', nextId: '/roadmap' },
            { label: 'Quiero Acción (Unirme)', nextId: '/auth/signup' }
        ]
    }
];
