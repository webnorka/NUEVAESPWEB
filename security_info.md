# Security Review - WEB_NE_V2 (2025-12-21)

## Alcance
- Codigo app (Next.js / src)
- Configuracion de despliegue (scripts, Docker, Traefik)
- Migraciones Supabase
- Archivos en raiz del repo

## Hallazgos (ordenados por severidad)

### CRITICO
1) Llaves SSH privadas dentro del repo
- Evidencia: `action_key`, `deploy_key`
- Impacto: acceso remoto no autorizado al server/servicios vinculados; movimiento lateral y exfiltracion.
- Riesgo inmediato: si esas llaves siguen activas, el repo queda comprometido.

### ALTO
2) Panel Traefik expuesto y modo inseguro habilitado
- Evidencia: `scripts/setup_vps.sh` (flag `--api.insecure=true`, puerto `8080:8080`)
- Impacto: acceso remoto a dashboard con informacion sensible y posibles acciones administrativas.

3) SSH hardening debil: root + StrictHostKeyChecking=no
- Evidencia: `scripts/setup_vps.sh`
- Impacto: facilita MITM y compromiso de servidor.

4) RLS publica datos sensibles de asociacion y geolocalizacion
- Evidencia: `supabase/migrations/20251220_asociaciones_schema.sql`
- Impacto: cualquier usuario (o anon) puede leer miembros y coordenadas (lat/lng).

### MEDIO
5) Consultas administrativas desde cliente con anon key
- Evidencia: `src/components/admin/AdminMetrics.tsx`, `src/components/admin/RealtimeActivity.tsx`
- Impacto: si RLS no es estricta, fuga de actividad, conteos, IPs y metadatos.

6) `updateUserRole` acepta string libre + sin constraint DB
- Evidencia: `src/lib/actions/admin.ts`
- Impacto: roles invalidos o escalacion si la base no valida.

7) Logs de actividad aceptan IP de cabecera sin normalizar
- Evidencia: `src/lib/actions/admin.ts`
- Impacto: spoofing de IP en auditoria.

8) `getMovementStats` accesible sin auth
- Evidencia: `src/lib/actions/citizen.ts` (usado en `CommandBar`)
- Impacto: expone metrica agregada a visitantes si no se considera publica.

### BAJO
9) `.env.local` presente en el repo
- Evidencia: `.env.local`
- Impacto: riesgo de fuga accidental si se comitea o comparte.

10) Faltan cabeceras de seguridad base
- Evidencia: `next.config.ts`
- Impacto: superficie XSS / clickjacking / policy gaps.

11) Hook de deploy con `rm -rf $TARGET/*`
- Evidencia: `post-receive.sh`
- Impacto: riesgo operativo si variables se modifican o apuntan mal.

## Roadmap de soluciones

### 0-24 horas (bloqueantes)
- Revocar/rotar llaves SSH (`action_key`, `deploy_key`) y cualquier credencial asociada.
- Eliminar llaves del repo y purgar historial (BFG o git filter-repo).
- Cerrar panel Traefik: quitar `--api.insecure=true`, no exponer 8080, o proteger con auth+IP allowlist.
- Reforzar SSH: usuario no-root, `StrictHostKeyChecking=yes`, permitir solo llaves conocidas.
- Revisar RLS en tablas `nuclei`, `nucleus_members`, `profiles`, `activity_logs`.

### 1-2 semanas
- Mover consultas admin a server-only (Server Components / Route Handlers) usando service role solo en backend.
- Agregar validacion de roles (enum/constraint en DB + validacion en server action).
- Normalizar `x-forwarded-for` o registrar la IP real del proxy de confianza.
- Definir si stats/metros son publicos o autenticados y ajustar RLS.

### 1-2 meses
- Cabeceras de seguridad en `next.config.ts`: CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy.
- Escaneo de secretos y dependencias en CI (gitleaks + npm audit + SAST).
- Alertas de auditoria (picos de cambios de rol, bans, login anomalos).

## Implementaciones recomendadas (resumen tecnico)

### A) Rotacion de llaves y limpieza del repo
- Revocar llaves en servidores/servicios.
- Eliminar archivos del repo:
  - `action_key`, `deploy_key` (y sus `.pub` si aplica)
- Purga de historial (ejemplo):
  - `git filter-repo --path action_key --path deploy_key --invert-paths`
- Forzar rotacion de credenciales usadas por esas llaves.

### B) Hardening de Traefik
- Desactivar dashboard inseguro:
  - Quitar `--api.insecure=true`
- No publicar 8080 o proteger con middleware de auth + IP allowlist.
- Firewall: exponer solo 80/443.

### C) RLS y privacidad (Supabase)
- Si datos de miembros/coords son privados, requerir auth y/o rol:
  - `USING (auth.role() = 'authenticated')` o policy por pertenencia.
- Para `activity_logs`: solo admin puede leer.
- Evitar exponer `lat/lng` exactos si no es necesario (usar region o grid).

### D) Admin data fuera del cliente
- Mover `AdminMetrics` y `RealtimeActivity` a Server Components o API routes.
- Usar service role en backend (nunca en cliente).

### E) Validacion y logging
- Validar `newRole` contra enum permitido.
- Normalizar IP: usar primer IP valida de `x-forwarded-for` solo si el request viene del proxy de confianza.

### F) Cabeceras de seguridad
- Agregar en `next.config.ts`:
  - HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, CSP.

## Comentarios como dev (practicos)
- La mayor brecha es operacional (llaves SSH y panel expuesto). Eso se arregla primero.
- Las politicas RLS deben considerarse parte del codigo: versionarlas y testearlas como cualquier feature.
- Admin data en el cliente es un antipatron cuando se usa anon key; moverlo al server reduce riesgo y mejora el control.
- Definir claramente que datos son publicos vs privados evita fugas accidentales.
- A partir de aqui, un pipeline con gitleaks + RLS tests evita regresiones.

