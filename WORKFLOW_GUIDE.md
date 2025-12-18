# Guía de Flujo de Trabajo: Proyecto NEO1

Esta guía detalla el ciclo de vida completo del desarrollo y despliegue de la plataforma, optimizada para la soberanía de datos y la agilidad técnica.

---

## 1. Entorno de Desarrollo Local

Para trabajar en la plataforma localmente, asegúrate de tener tus variables de entorno configuradas en `.env.local`.

### Comandos Principales
- **Iniciar Servidor**: `npm run dev` (ejecuta `scripts/dev.ts`).
  - *Tip*: Este comando usa un puerto personalizado definido en `site.config.ts`.
- **Añadir Dependencias**: Usa `npm install`. Evita usar `yarn` o `pnpm` para mantener la consistencia del `package-lock.json`.

---

## 2. Gestión de Variables de Entorno (.env)

Los archivos `.env` son locales a cada máquina y **nunca se suben al repositorio**.

### Diferencia: Local vs VPS
| Contexto | Archivo | URL del Sitio | Uso |
| :--- | :--- | :--- | :--- |
| **Mac (Local)** | `.env.local` | `http://localhost:3000` | Pruebas y desarrollo. |
| **VPS (Producción)** | `.env` | `https://nuevaespaña.eu` | Usuarios reales. |

### Configuración en VPS (Sincronización fácil)
Para no tener que usar `nano` en el servidor, puedes subir tu archivo local directamente:
```bash
# Ejecuta esto en tu Mac
scp -i ~/.ssh/id_rsa_vpstest .env.local root@38.242.133.148:/var/www/nuevaespaña/.env
```
Tras subirlo, reconstruye el contenedor: `docker compose up -d --build`.

> [!TIP]
> Si cambias el `.env` en la VPS, recuerda que siempre debes reconstruir el contenedor para que Docker lea los cambios.

---

## 3. Gestión de Base de Datos (Supabase)

La base de datos es el corazón de la plataforma. Utilizamos Supabase para Auth y Almacenamiento.

### Proceso de Cambio en Base de Datos
1. **Modificación**: Si necesitas añadir tablas o roles (como hicimos con `ADMIN_ROLES_SCHEMA.sql`), hazlo siempre desde el **SQL Editor** de Supabase.
2. **Sincronización**: Una vez aplicado el SQL, los cambios son inmediatos para la API.
3. **RLS (Row Level Security)**: Cada tabla nueva debe tener políticas de RLS activadas. Por defecto, denegamos todo y permitimos solo lo necesario.

---

## 4. Flujo de Autenticación y Roles

- **Usuarios**: Se registran en `/auth/signup`. Sus datos básicos van a la tabla `profiles`.
- **Admins**: Para dar permisos de admin a un usuario, puedes hacerlo desde el **Panel de Admin** o manualmente en la tabla `profiles` cambiando `role` a `'admin'`.
- **Protección**: El archivo `src/middleware.ts` protege automáticamente las rutas `/dashboard` y `/admin`.

---

## 5. Despliegue Automatizado (Push-to-Deploy)

Hemos configurado un flujo profesional donde el servidor se actualiza solo cuando envías código.

### El Comando Mágico
```bash
git push vps main
```

### ¿Qué sucede tras bambalinas?
1. El código llega al repositorio "bare" en `/var/repo/web_ne.git` en la VPS.
2. Un **Git Hook** detecta el cambio en la rama `main`.
3. Se dispara el script centralizado `scripts/deploy.sh`.
4. Docker reconstruye la imagen (`--build`), levanta los contenedores y limpia imágenes antiguas.

> [!IMPORTANT]
> Haz siempre un `git push origin main` (GitHub) para respaldo y colaboración, y un `git push vps main` para despliegue real en producción.

---

## 6. Mantenimiento y Logs en el VPS

A veces las cosas no salen como esperamos. Aquí cómo investigar:

### Ver estado
Entra en la VPS y ve a `/var/www/nuevaespaña`:
```bash
docker compose ps
```

### Investigar Errores
```bash
# Ver los últimos logs
docker compose logs -f web

# Ver logs de Traefik (si hay problemas de SSL/Dominio)
cd /var/www/traefik && docker compose logs -f
```

---

## 🛰️ Tips de Experto

1. **Variables de Entorno**: Nunca subas el archivo `.env` real a Git. El servidor tiene su propio `.env` local.
2. **Imágenes**: Si notas que el VPS se queda sin espacio, `docker image prune -af` es tu mejor amigo. Nuestro script `deploy.sh` ya lo hace de forma segura por ti.
3. **Pre-visualización**: Antes de hacer push a la VPS, corre `npm run build` localmente para asegurarte de que no hay errores de TypeScript o de compilación que rompan el despliegue.
4. **Dominio NE**: Al trabajar con el dominio `nuevaespaña.eu`, recuerda que internamente los sistemas usan el formato punycode (`xn--nuevaespaa-19a.eu`). No te asustes si lo ves así en los logs de Traefik.

---

*Desarrollado para la Resistencia Digital de Nueva España.*
