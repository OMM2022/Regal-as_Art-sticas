# 🔍 Verificación de Anuncios - A-Ads

## 📍 Ubicación del Código de Anuncios

El código de anuncios de A-Ads (ID: 2392933) está integrado en **3 lugares** de la aplicación:

### 1️⃣ Vista de Previsualización (después de crear tarjeta)
- **Ubicación en código**: Línea 689-692 (`DEVELOPER_AD_CODE`)
- **Se muestra en**: Vista preview después de hacer clic en "Crear Tarjeta Musical"
- **URL de prueba**: https://omm2022.github.io/regalias-artisticas/

### 2️⃣ Tarjetas Compartidas (URL con parámetros)
- **Ubicación en código**: Línea 1009-1011 (dentro de `generateEmbedCode()`)
- **Se muestra en**: Cuando alguien abre una tarjeta desde un QR o link compartido
- **URL de ejemplo**: 
  ```
  https://omm2022.github.io/regalias-artisticas/?view=card&id=123&s=Cancion&a=Artista&u=URL_AUDIO&ads=CODIGO_USUARIO
  ```

### 3️⃣ Código HTML Embebido (para copiar/pegar)
- **Ubicación en código**: Mismo que punto 2
- **Se genera**: Al hacer clic en "Ver Código HTML"
- **Incluye**: El código completo de A-Ads dentro del HTML embebido

## ✅ Cómo Verificar que los Anuncios Funcionan

### Método 1: Verificación Visual
1. Abre: https://omm2022.github.io/regalias-artisticas/
2. Crea una tarjeta de prueba (cualquier canción)
3. **Busca el iframe de A-Ads** debajo del reproductor de música
4. Deberías ver: `<iframe data-aa='2392933' src='//ad.a-ads.com/2392933?size=320x50'>`

### Método 2: Verificación de Tarjeta Compartida
1. Crea una tarjeta
2. Escanea el QR o copia el enlace compartido
3. Abre en una nueva ventana/dispositivo
4. Verifica que el iframe de A-Ads esté presente en el código fuente (Ctrl+U)

### Método 3: Inspeccionar Código Fuente
```bash
# Buscar el código de A-Ads en la página desplegada
curl https://omm2022.github.io/regalias-artisticas/ | grep "data-aa='2392933'"
```

## 🤖 Para el Bot de A-Ads

### URL a Verificar
Proporciona esta URL al proveedor de anuncios:
```
https://omm2022.github.io/regalias-artisticas/
```

### Código Esperado
El bot debería encontrar este código en la página:
```html
<iframe data-aa='2392933' src='//ad.a-ads.com/2392933?size=320x50' 
        style='width:320px; height:50px; border:0px; padding:0; overflow:hidden; background-color: transparent;'>
</iframe>
```

## 🔧 Ubicación Exacta en el Código Fuente

### DEVELOPER_AD_CODE (línea 689-692)
```javascript
const DEVELOPER_AD_CODE = `
    <!-- A-Ads Async Code -->
    <iframe data-aa='2392933' src='//ad.a-ads.com/2392933?size=320x50' 
            style='width:320px; height:50px; border:0px; padding:0; overflow:hidden; background-color: transparent;'>
    </iframe>
`;
```

### Renderizado en Vista Preview (línea 848-856)
```javascript
const devAd = HIDE_DEVELOPER_AD ? '' : `
    <div class="developer-ad">
        <div class="developer-ad-content">
            ${DEVELOPER_AD_CODE}
        </div>
    </div>
`;
```

### Incluido en Código Embebido (línea 1009-1011)
```javascript
const devAdCode = HIDE_DEVELOPER_AD ? '' : `
    <div style="background: rgba(0,0,0,0.1); border-radius: 8px; padding: 10px; margin-top: 15px;">
        ${DEVELOPER_AD_CODE}
    </div>`;
```

## ⚠️ Solución de Problemas

### Si el bot NO encuentra el anuncio:

1. **Verifica que HIDE_DEVELOPER_AD = false**
   - Línea 697: `const HIDE_DEVELOPER_AD = false;`
   
2. **Limpia caché del navegador**
   - Ctrl + Shift + R (Windows/Linux)
   - Cmd + Shift + R (Mac)

3. **Verifica en modo incógnito**
   - Evita extensiones que bloqueen anuncios

4. **Espera unos minutos**
   - GitHub Pages puede tardar hasta 10 minutos en actualizar

### Si el bot sigue sin encontrarlo:

Proporciona una **URL específica de tarjeta** en lugar de la página principal:
1. Crea una tarjeta de prueba
2. Copia el enlace generado (ej: `?view=card&id=test&s=Prueba&a=Test&u=https://...`)
3. Proporciona esa URL completa al proveedor

## 📊 Estado Actual

- ✅ Código de A-Ads integrado en `DEVELOPER_AD_CODE`
- ✅ Visible en vista preview
- ✅ Incluido en tarjetas compartidas
- ✅ Presente en código HTML embebido
- ✅ Cambios desplegados en GitHub Pages
- ✅ ID de anuncio: 2392933
- ✅ Tamaño: 320x50

**Última actualización**: 9 de noviembre de 2025
**Commit**: Agregado código de anuncios A-Ads en DEVELOPER_AD_CODE para verificación del proveedor
