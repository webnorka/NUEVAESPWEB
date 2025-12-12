# Análisis de Implementación: SEO y Analíticas (Plausible)

Este documento detalla la estrategia para mejorar el posicionamiento (SEO) e integrar analíticas respetuosas con la privacidad (Plausible) en el proyecto `WEB_NE_V2` (Next.js 16).

## 1. Estrategia SEO (Next.js 16)

El objetivo es maximizar la visibilidad en Google manteniendo el rendimiento y la mantenibilidad.

### Componentes Clave
1.  **Metadata API**: Migrar/Optimizar el uso de `generateMetadata` en `layout.tsx` y `page.tsx` para títulos dinámicos y descripciones.
2.  **Open Graph (OG) y Twitter Cards**: Estandarizar imágenes de previsualización para redes sociales.
3.  **Sitemap y Robots**: Generación automática usando `sitemap.ts` y `robots.ts` (Nativo de Next.js).
4.  **Datos Estructurados (JSON-LD)**: Inyectar esquemas de `Organization` y `Article` para que Google entienda mejor el contenido (Rich Snippets).

### Implementación Propuesta
Crear un componente `SeoManager` o utilidades en `site.config.ts` que centralicen la configuración, evitando duplicidad de texto.

## 2. Integración de Plausible Analytics

Plausible es una alternativa ligera y open-source a Google Analytics, sin cookies y conforme a GDPR.

### Opciones de Despliegue
1.  **SaaS (Plausible.io)**: Más fácil, pero de pago.
2.  **Self-Hosted (VPS actual)**: Gratuito, pero requiere más recursos (Docker, ClickHouse, Postgres).
    *   *Recomendación*: Dado que la VPS actual (`38.242.133.148`) es un servidor único y ya aloja la web y base de datos, desplegar el stack completo de Plausible aquí podría saturarla.
    *   *Alternativa Ligera*: Usar una instancia de Plausible alojada externamente o empezar con la versión Cloud. Si se desea **Self-Hosted estricto**, se recomienda una VPS pequeña separada o asegurar al menos 4GB RAM en la actual.

### Integración Técnica (Frontend)
Para evitar bloqueadores de anuncios (AdBlockers) y mejorar la precisión:
-   Usar `next/script` con estrategia `afterInteractive`.
-   **Proxying (Recomendado)**: Configurar `next.config.ts` para redirigir peticiones de analítica a través del propio dominio (`/js/script.js` -> `plausible.io/js/script.js`). Esto mejora la captura de datos sin violar privacidad.

## 3. Seguridad y Accesibilidad

### Seguridad
-   **Content Security Policy (CSP)**: Configurar headers en `next.config.ts` permitiendo scripts solo de nuestro dominio y de Plausible.
-   **Referrer-Policy**: `strict-origin-when-cross-origin`.

### Accesibilidad (A11y)
-   **Lighthouse CI**: Integrar auditoría en el flujo de GitHub Actions.
-   **HTML Semántico**: Asegurar uso correcto de `<main>`, `<article>`, `<header>`, etc.

---

## Plan de Trabajo

### Fase 1: Base SEO
- [ ] Crear `src/app/sitemap.ts` y `src/app/robots.ts`.
- [ ] Refinar `site.config.ts` para incluir claves de SEO (palabras clave, autores).
- [ ] Implementar Metadata base en `RootLayout`.

### Fase 2: Plausible
- [ ] Decidir Hosting (Cloud vs Self-Hosted). *Asumiremos integración de script genérico por ahora*.
- [ ] Crear componente `<Analytics />` usando `next/script`.
- [ ] Configurar Proxy en `next.config.ts`.

### Fase 3: Optimización
- [ ] Añadir JSON-LD a la página principal.
- [ ] Auditar con Google Lighthouse.

## Archivos Afectados
- `next.config.ts`
- `src/app/layout.tsx`
- `src/app/sitemap.ts` (Nuevo)
- `src/app/robots.ts` (Nuevo)
- `src/components/analytics/PlausibleTracker.tsx` (Nuevo)
