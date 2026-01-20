# 🚀 Despliegue en Coolify - NUEVAESPWEB

Esta guía explica cómo desplegar y gestionar el proyecto `NUEVAESPWEB` en tu VPS usando Coolify.

---

## 1. Preparación en Coolify

Dentro del panel de Coolify:
1.  **Crea un nuevo Recurso**: Selecciona "Public Repository" o "Private Repository" según tu caso.
2.  **Configura el Repositorio**: Apunta a `https://github.com/webnorka/NUEVAESPWEB`.
3.  **Configura el Build Pack**: Selecciona **Docker** (Coolify detectará el `Dockerfile` automáticamente).

---

## 2. Variables de Entorno (CRÍTICO)

Para que Next.js funcione correctamente con Supabase, debes añadir estas variables en la sección **Environment Variables** de Coolify:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu instancia de Supabase | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable Key (sb_publishable_...) | `sb_publishable_...` |
| `SUPABASE_SECRET_KEY` | Secret Key (sb_secret_...) | `sb_secret_...` |

> [!IMPORTANT]
> Debes marcar estas variables como de tipo **Build variable** (o asegurar que estén disponibles durante el build) para que Next.js las compile dentro del bundle del cliente.

---

## 3. Configuración del Dockerfile

El proyecto ya está optimizado con un `Dockerfile` multi-stage que utiliza el modo `standalone` de Next.js para minimizar el tamaño de la imagen.

- **Puerto**: La aplicación escucha en el puerto **3000**.
- **Destino del Build**: `/app/.next/standalone`

---

## 4. Gestión Local del Proyecto

Tienes el proyecto clonado localmente en `/nuevaespweb`.

### Comandos Útiles:

- **Instalar dependencias**: `npm install`
- **Correr en desarrollo**: `npm run dev`
- **Probar build de Docker localmente**:
  ```bash
  docker build --build-arg NEXT_PUBLIC_SUPABASE_URL=TU_URL --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_KEY -t nuevaespweb .
  ```

### Flujo de Trabajo:
1. Realiza cambios en la carpeta `nuevaespweb`.
2. Haz `commit` y `push` a GitHub.
3. Coolify detectará el cambio y reiniciará el despliegue automáticamente.

---

## 5. Troubleshooting

- **Error de variables `undefined` en el cliente**: Asegúrate de haber añadido las variables en Coolify **antes** de disparar el build.
- **Error de memoria**: Si el build falla en el VPS, asegúrate de que el servidor tenga al menos 2GB de RAM o configuración de swap.
