# Análisis y Corrección del Flujo de Informes Semanales (n8n)

## 1. Diagnóstico de Errores

He analizado el JSON y tu descripción. El flujo tiene tres puntos críticos de fallo que están causando la inestabilidad.

### A. Búsqueda demasiado amplia (Falsos Positivos)
**Problema:** El nodo "Buscar Carpeta Semana" usa la query `name = '...'`.
**Consecuencia:** Esto busca en **toda** tu unidad de Google Drive (y las compartidas contigo). Si tienes una carpeta antigua o una copia de seguridad en otro lugar con el mismo nombre (ej: "Semana 53 - 2026"), la encontrará y el flujo continuará incorrectamente con esa carpeta errónea.
**Solución:** Debes restringir la búsqueda estrictamente a la **Carpeta Padre**.

### B. El flujo se detiene cuando no encuentra nada (Falsos Negativos / Bloqueo)
**Problema:** El nodo Google Drive tiene la opción `Always Output Data` desactivada (por defecto).
**Consecuencia:** Cuando la búsqueda no devuelve resultados (la semana no existe), el nodo **no produce ninguna salida**. En n8n, cuando un nodo no devuelve items, la ejecución de esa rama se detiene inmediatamente. Por eso el nodo "Detectar carpeta semana" nunca llega a ejecutarse, y el email de aviso nunca se envía.
**Solución:** Activar `Always Output Data` en el nodo de búsqueda.

### C. Lógica de Detección e IF frágil
**Problema:** El nodo "Detectar carpeta semana" y el "If" posterior dependen de cómo maneja n8n los items vacíos.
**Solución:** Normalizar la salida a un booleano claro `folderExists: true/false` y simplificar el IF.

---

## 2. Solución Paso a Paso

### Paso 1: Configurar el ID de la Carpeta Padre
Necesitas el ID de la carpeta donde se crean las carpetas semanales.
1. Ve a Google Drive.
2. Entra en la carpeta "Informes semanales" (o la carpeta padre correspondiente).
3. Copia el código final de la URL (ej: `.../folders/1abcDEfg...` -> `1abcDEfg...`).

### Paso 2: Corregir el Nodo "Buscar Carpeta Semana"
Debemos cambiar la query para que sea "quirúrgica".

- **Search Method:** `Query`
- **Query String:** Copia y pega esto (reemplaza `ID_CARPETA_PADRE` con el ID real):
  ```
  mimeType = 'application/vnd.google-apps.folder' and name = '{{ $json.weekFolderName }}' and 'ID_CARPETA_PADRE' in parents and trashed = false
  ```
- **Always Output Data (IMPORTANTE):** Activa este interruptor en la configuración del nodo. Esto asegura que si no encuentra nada, devuelva un item vacío y el flujo continúe.

### Paso 3: Corregir el Nodo "Detectar carpeta semana" (Code)
Vamos a hacerlo robusto para que entienda que si recibe un objeto vacío, significa que NO existe.

**Código nuevo:**
```javascript
const items = $input.all();

// Si el nodo anterior devuelve items pero el primero no tiene ID, significa que no encontró nada
// (siempre y cuando 'Always Output Data' esté activo)
const firstItem = items[0]?.json;
const foundFolder = firstItem && firstItem.id;

return [{
  json: {
    weekFolderExists: !!foundFolder, // Convierte a boolean puro (true/false)
    weekFolderId: foundFolder ? firstItem.id : null
  }
}];
```

### Paso 4: Corregir el Nodo "If2"
Ahora la condición es binaria y limpia.

- **Condition:**
  - Value 1: `{{ $json.weekFolderExists }}`
  - Operator: `Boolean` -> `is True` (o simplemente comprueba que sea true).
  
---

## 3. Resumen de la Lógica Corregida

1. **Trigger:** Se activa.
2. **Nombre Semana:** Calcula "Semana X".
3. **Buscar:** Busca en Drive.
   - ¿Existe en la carpeta padre? -> Devuelve datos de la carpeta.
   - ¿No existe? -> Devuelve un item vacío (gracias a Always Output Data).
4. **Code:**
   - Recibe datos -> `weekFolderExists = true`
   - Recibe vacío -> `weekFolderExists = false`
5. **IF:**
   - `true` -> Camino superior (Procesar).
   - `false` -> Camino inferior (Enviar Email).

Esta estructura es "a prueba de balas" porque controla explícitamente la ausencia de datos en lugar de dejar que el flujo muera.
