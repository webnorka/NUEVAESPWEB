# Guía de Despliegue (DEPLOY.md)

Este proyecto está configurado con **Despliegue Continuo (CD)**.
Cualquier cambio empujado a la rama `main` en GitHub se desplegará automáticamente en la VPS.

## 🚀 Flujo de Trabajo

1.  **Trabaja en local**: Haz tus cambios en el código.
2.  **Confirma cambios**: `git commit -am "Mensaje"`
3.  **Despliega**: `git push origin main`

¡Listo! GitHub Actions se encargará del resto (ver pestaña "Actions" en el repo).

---

## ⚙️ Configuración Única (Requerida)

Para que el sistema funcione, debemos autorizar a GitHub Actions para entrar a la VPS.

### 1. Clave Pública de GitHub Actions
He generado una clave específica para esto. Debes agregar esta línea al archivo `/root/.ssh/authorized_keys` en la VPS.

**Clave a copiar:**
```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIANIcfIoyw2HBB0EEbsnn4YM2jxHaploGN3Q2TeXwMxF action@github
```

**Comando rápido para hacerlo (desde tu terminal local):**
```bash
ssh root@38.242.133.148 "echo 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIANIcfIoyw2HBB0EEbsnn4YM2jxHaploGN3Q2TeXwMxF action@github' >> /root/.ssh/authorized_keys"
```

## 🛠 Estructura del Sistema

-   **Repositorio GitHub**: `WEB_NE_V2` (Privado)
-   **VPS**: `38.242.133.148`
-   **Directorio App**: `/var/www/WEB_NE_V2`
-   **Proceso Node**: Gestionado por PM2 (`web-ne-v2`)
-   **Servidor Web**: Nginx (Reverse Proxy puerto 80 -> 3000)

### Comandos de Utilidad en VPS (SSH)

| Acción | Comando |
| :--- | :--- |
| **Ver Logs** | `pm2 logs web-ne-v2` |
| **Reiniciar App** | `pm2 reload web-ne-v2` |
| **Actualizar Manual** | `bash /var/www/WEB_NE_V2/scripts/update_vps.sh` |
