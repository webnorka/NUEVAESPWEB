# 🧪 Guía de Prueba: Flujo CI/CD Completo

Esta guía te ayudará a verificar que el flujo de CI/CD automatizado con Dokploy está funcionando correctamente.

---

## 📋 Pre-requisitos

Antes de comenzar, asegúrate de haber completado:

- [ ] Configurado Auto Deploy en Dokploy (ver [deploy_automation_guide.md](file:///Users/webnorka/DESARROLLO/nuevaespweb/deploy_automation_guide.md))
- [ ] Webhook configurado en GitHub (opcional pero recomendado)
- [ ] Variables de entorno configuradas en Dokploy

---

## 🔍 Paso 1: Verificar Configuración del VPS

Ejecuta el script de verificación para inspeccionar Dokploy:

```bash
# Desde el directorio del proyecto
cat scripts/verify-dokploy.sh | ssh root@38.242.133.148 'bash -s'
```

**Salida esperada:**
- ✅ Dokploy corriendo
- ✅ Puerto expuesto (típicamente 3000)
- ✅ Aplicación NUEVAESPWEB visible

Si hay problemas, accede al VPS y verifica:
```bash
ssh root@38.242.133.148
docker ps | grep dokploy
```

---

## 🧪 Paso 2: Prueba con Cambio Mínimo

Vamos a hacer un cambio mínimo para verificar el flujo:

```bash
# 1. Agregar timestamp al README
echo -e "\n## 🚀 Last Deployment Test\n- Timestamp: $(date '+%Y-%m-%d %H:%M:%S')\n- Test: Auto-deploy verification" >> README.md

# 2. Ver el cambio
git diff README.md

# 3. Commitear
git add README.md
git commit -m "test: verify auto-deploy workflow - $(date '+%Y%m%d-%H%M%S')"

# 4. Push a GitHub
git push origin main
```

**Salida esperada:**
```
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 380 bytes | 380.00 KiB/s, done.
Total 3 (delta 2), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
To https://github.com/webnorka/NUEVAESPWEB.git
   abc1234..def5678  main -> main
```

---

## 📊 Paso 3: Monitorear Deploy en Dokploy

### Opción A: Panel Web de Dokploy

1. Abre el navegador y accede a Dokploy: `http://38.242.133.148:3000`
2. Navega a la aplicación **NUEVAESPWEB**
3. Ve a la pestaña **Deployments**
4. Observa el nuevo deployment:
   - **Estado inicial**: `Queued` o `Building`
   - **Durante build**: `Building` (3-5 min)
   - **Deploying**: `Deploying` (30s)
   - **Final**: `Running` ✅

### Opción B: Logs en Tiempo Real (SSH)

Conéctate al VPS y observa logs:

```bash
ssh root@38.242.133.148

# Ver logs de Dokploy
docker logs -f $(docker ps --filter "name=dokploy" -q)

# O específicamente de la app
docker logs -f $(docker ps --filter "name=nuevaesp" -q)
```

**Timeline esperado:**
- `00:00` - Push completado
- `00:05-00:15` - Dokploy detecta cambio (webhook) o `01:00-05:00` (polling)
- `00:15-04:00` - Build de Docker (npm install, next build, etc.)
- `04:00-04:30` - Deploy del contenedor
- `04:30-05:00` - Health checks
- **Total: ~5-6 minutos**

---

## ✅ Paso 4: Verificar en Producción

Una vez que el deploy muestra `Running`:

```bash
# Verificar que el sitio está activo
curl -I https://xn--nuevaespaa-19a.eu

# Debería devolver: HTTP/2 200 OK
```

O abre el navegador:
- URL: `https://xn--nuevaespaa-19a.eu`
- La aplicación debe cargar correctamente
- (Opcional) Si el cambio es visible, verificar que se refleja

---

## 🧹 Paso 5: Cleanup (Revertir cambio)

El cambio en README fue solo para prueba, revertirlo:

```bash
# Revert del último commit
git revert HEAD --no-edit

# Push
git push origin main
```

Esto activará **otro deploy automático**, confirmando nuevamente el flujo.

---

## 🐛 Troubleshooting

### ❌ El deploy NO se dispara

**Verificar webhook:**
```bash
# Revisar recent deliveries en GitHub
# https://github.com/webnorka/NUEVAESPWEB/settings/hooks
```

Si el webhook falla:
- Verificar que la URL es correcta
- Verificar que Dokploy está accesible desde internet
- Disparar manualmente en Dokploy como fallback

**Solución temporal:**
- Ir a Dokploy → NUEVAESPWEB → Deploy Now

### ❌ El build falla

1. Ver logs de build en Dokploy → Deployments → Ver logs
2. Errores comunes:
   - **Variables faltantes**: Verificar que `NEXT_PUBLIC_*` están configuradas
   - **Dependencias**: Verificar `package.json` y `package-lock.json`
   - **Dockerfile**: Verificar que `Dockerfile` no tiene errores

**Debug local:**
```bash
# Probar build localmente
docker build -t test-nuevaesp .

# Si falla, ver error exacto
```

### ❌ Deploy exitoso pero app no carga

1. Verificar logs de runtime:
   ```bash
   ssh root@38.242.133.148
   docker logs $(docker ps --filter "name=nuevaesp" -q) --tail 50
   ```

2. Verificar puerto:
   ```bash
   docker ps | grep nuevaesp
   # Debe mostrar: 0.0.0.0:XXXX->3000/tcp
   ```

3. Verificar variables de entorno en el contenedor:
   ```bash
   docker exec $(docker ps --filter "name=nuevaesp" -q) printenv | grep NEXT_PUBLIC
   ```

### 🔄 Rollback a versión anterior

Si el nuevo deploy tiene problemas:

1. En Dokploy → Deployments
2. Seleccionar un deployment anterior exitoso
3. Click en **Rollback**
4. Confirmar

---

## 📈 Métricas de Éxito

Al final de la prueba, deberías tener:

- [x] Push a GitHub exitoso
- [x] Dokploy detectó el cambio automáticamente
- [x] Build completado sin errores
- [x] Deploy ejecutado exitosamente
- [x] Aplicación accesible en producción
- [x] Logs sin errores críticos
- [x] Revert también desplegó automáticamente

---

## 🎯 Próximos Pasos

Una vez que el flujo está verificado:

1. **Usar el workflow normal** para desarrollo:
   ```bash
   # Editar → Commit → Push → Auto-deploy automático
   ```

2. **Monitorear deploys** en Dokploy cuando hagas cambios importantes

3. **Verificar en producción** después de cambios críticos

4. **Revisar logs** periódicamente para detectar problemas tempranos

---

## ✅ Checklist Final

- [ ] Script de verificación ejecutado exitosamente
- [ ] Cambio de prueba commiteado y pusheado
- [ ] Deploy automático detectado en Dokploy
- [ ] Build completado sin errores
- [ ] Aplicación corriendo en producción
- [ ] Revert ejecutado y desplegado
- [ ] Workflow completamente funcional

🎉 **¡Flujo CI/CD configurado y verificado exitosamente!**
