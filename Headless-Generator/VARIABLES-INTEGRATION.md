# 🎨 Integración de Variables de Figma con Pinecone

## Objetivo
Enviar las variables de diseño de Figma (spacing, colors, etc.) a Pinecone para que la IA las conozca y las use automáticamente al generar interfaces.

---

## 📋 Paso 1: Extraer Variables de Figma

### 1.1 Crear el plugin extractor en Figma

1. En Figma, ve a **Plugins > Development > New Plugin**
2. Nombre: "Variables Extractor"
3. Reemplaza el contenido de `code.js` con `/Headless-Generator/extract-variables.js`
4. Reemplaza el contenido de `ui.html` con `/Headless-Generator/extract-variables-ui.html`
5. Guarda y ejecuta el plugin

### 1.2 Ejecutar la extracción

1. Abre el plugin "Variables Extractor"
2. Click en "Extract Figma Variables"
3. Verás:
   - **Stats**: Cantidad de variables por tipo
   - **Description**: Texto formateado para n8n
   - **Pinecone Format**: JSON para embeddings

---

## 📤 Paso 2: Enviar Variables a Pinecone

### Opción A: Manual (para testing)

1. Copia el JSON del "Pinecone Format"
2. Usa el Pinecone API o dashboard para crear embeddings:

```javascript
// Ejemplo con Pinecone SDK
const pinecone = new Pinecone({ apiKey: 'YOUR_API_KEY' });
const index = pinecone.index('your-index');

await index.upsert([
  {
    id: 'variables-spacing',
    values: await generateEmbedding(spacingText), // Usar OpenAI embeddings
    metadata: {
      type: 'design-tokens',
      category: 'spacing',
      text: spacingText
    }
  }
]);
```

### Opción B: Automatizado con n8n

Crea un flujo en n8n que:

1. **Trigger**: Webhook o Schedule
2. **HTTP Request**: Llama a un endpoint de Figma (si tienes API) o usa el JSON copiado
3. **OpenAI Embeddings**: Genera embeddings del texto
4. **Pinecone Upsert**: Sube los embeddings

---

## 🔗 Paso 3: Actualizar el Flujo de Generación

### 3.1 Modificar el flujo n8n existente

En tu flujo `Headless Generator - AIRBNB PERFECT.json`:

1. **Añadir nodo "Pinecone Query"** ANTES del nodo de Gemini
2. Query: "design tokens spacing colors variables"
3. Top K: 2-3 resultados
4. Conectar a Gemini

### 3.2 Actualizar el prompt de Gemini

Añade al inicio del prompt:

```
**DESIGN TOKENS DISPONIBLES:**
{{ $json.pineconeResults }}

Usa estos design tokens en tu JSON cuando sea apropiado.
```

---

## 🎯 Paso 4: Resultado Final

### Antes (sin variables):
```json
{
  "padding": 24,
  "spacing": 16
}
```

### Después (con variables):
```json
{
  "padding": "spacing-lg",
  "spacing": "spacing-md"
}
```

La IA ahora:
1. ✅ Conoce las variables disponibles en Figma
2. ✅ Las usa en el JSON generado
3. ✅ El plugin las resuelve automáticamente
4. ✅ Consistencia total con tu design system

---

## 🔄 Flujo Completo

```
1. Diseñador actualiza variables en Figma
   ↓
2. Plugin extrae variables
   ↓
3. n8n envía a Pinecone (embeddings)
   ↓
4. Usuario pide UI: "Dashboard tipo Airbnb"
   ↓
5. n8n busca en Pinecone:
   - Componentes disponibles
   - Variables de spacing/colors
   ↓
6. Gemini genera JSON usando variables reales
   ↓
7. Plugin renderiza en Figma con variables aplicadas
```

---

## 💡 Ventajas

1. **Sincronización automática**: Cambias una variable en Figma → se refleja en todas las UIs generadas
2. **Consistencia**: La IA usa tu design system real
3. **Mantenibilidad**: Un solo lugar para actualizar valores
4. **Escalabilidad**: Añades nuevas variables → la IA las conoce automáticamente

---

## 🚀 Próximos Pasos

1. [ ] Ejecutar el extractor de variables
2. [ ] Copiar el JSON de Pinecone Format
3. [ ] Crear embeddings y subirlos a Pinecone
4. [ ] Actualizar el flujo n8n para incluir query a Pinecone
5. [ ] Probar generando una UI y verificar que usa las variables

---

## 📝 Notas

- Las variables se extraen por **nombre**, así que usa nombres descriptivos
- El plugin busca variables con nombres como: `spacing-*`, `space-*`, `gap-*`, `padding-*`, `margin-*`
- Para colors, cualquier variable de tipo COLOR se incluye
- Puedes re-ejecutar el extractor cada vez que actualices variables
