# 🚀 Despliegue en Dokploy - NUEVAESPWEB

Esta guía explica cómo desplegar el proyecto `NUEVAESPWEB` en tu servidor usando **Dokploy**.

---

## 1. Conexión del Repositorio
1. En el panel de Dokploy, crea una nueva **Aplicación**.
2. Conecta tu repositorio de GitHub: `webnorka/NUEVAESPWEB`.
3. Selecciona la rama `main`.

## 2. Configuración de Build (Docker)
Dokploy detectará automáticamente el `Dockerfile` en la raíz del proyecto.
- **Build Type**: Selecciona `Docker`.
- **Puerto**: La aplicación corre en el puerto **3000**.

## 3. Variables de Entorno (Obligatorio)
Añade las siguientes variables en la sección **Environment** de tu aplicación en Dokploy:

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon Key de Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Service Role Key (para webhooks) |
| `STRIPE_SECRET_KEY` | Secret Key de Stripe |
| `STRIPE_WEBHOOK_SECRET` | Webhook Secret (`whsec_...`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Publishable Key de Stripe |
| `NEXT_PUBLIC_SITE_URL` | `https://xn--nuevaespaa-19a.eu` |

> [!IMPORTANT]
> Al usar el `Dockerfile` proporcionado, Next.js se compila en modo `standalone`. Asegúrate de que todas las variables `NEXT_PUBLIC_` estén presentes **durante el build** para que se inyecten correctamente.

## 4. Despliegue
Una vez configurado, haz clic en **Deploy**. Dokploy descargará el código, construirá la imagen de Docker y levantará el contenedor de forma automática.


## 5. Troubleshooting
- **Logs**: Puedes ver los logs en tiempo real desde la pestaña `Logs` en Dokploy.
- **Red**: Si la app no carga, verifica que el puerto 3000 esté expuesto y que el dominio Punycode (`xn--nuevaespaa-19a.eu`) esté correctamente apuntado.

---

## 6. 🚀 Workflow de Desarrollo (Auto-Deploy)

Una vez configurado el auto-deploy (ver [deploy_automation_guide.md](file:///Users/webnorka/DESARROLLO/nuevaespweb/deploy_automation_guide.md)):

```bash
# 1. Hacer cambios localmente
# ... editar código ...

# 2. Commitear cambios
git add .
git commit -m "feat: descripción del cambio"

# 3. Push a GitHub
git push origin main

# 4. ✨ Dokploy detecta y despliega automáticamente
# Monitorear en: Panel de Dokploy → Deployments
```

**Timeline esperado**: ~4-6 minutos desde push hasta producción.

**Verificar deploy**:
- Logs en Dokploy → Deployments → Ver logs del último deploy
- Abrir `https://xn--nuevaespaa-19a.eu` para confirmar cambios

> [!TIP]
> Para configurar el auto-deploy completo, sigue la guía detallada en [deploy_automation_guide.md](file:///Users/webnorka/DESARROLLO/nuevaespweb/deploy_automation_guide.md).
