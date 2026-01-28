# Plan de Implementación: Dataset W3C WAI Fundamentals

## Objetivo
Construir un dataset estructurado y trazable a partir de la documentación "Fundamentals" de W3C WAI para alimentar sistemas RAG/GPT.

## Directorio de Trabajo
`accessibility-fundamentals/data/documents/`

## Documentos Objetivo (Scope)
1. **Introduction to Web Accessibility**
2. **Accessibility is About People**
3. **How People with Disabilities Use the Web** (HUB)
4. **Stories of Web Users**
5. **Diverse Abilities and Barriers**
6. **Tools and Techniques**
7. **Accessibility Principles**

## Estructura del Workflow n8n
El workflow seguirá la especificación técnica proporcionada:

1. **Manual Trigger**
2. **Set (Document Config)**: Define URL y ID del documento.
3. **HTTP Request**: Obtiene el HTML.
4. **HTML Extract**: Extrae `h2` (headings) y `section` (contenido).
5. **Code (Map Sections)**: Mapea los arrays extraídos a objetos estructurados.
6. **Split In Batches**: Itera sección por sección.
7. **Code (Create Blocks)**: Usa `cheerio` para parsear `<p>` y `<ul>` en bloques JSON.
8. **Code (Assemble Document)**: Reemsambla todas las secciones procesadas en el JSON final.
9. **Write File**: Guarda el archivo en `data/documents/{document_id}.json`.

## Estado Actual
- [x] Estructura de carpetas creada.
- [ ] Workflow generado (`w3c_wai_fundamentals_workflow.json`).
- [ ] Validación de ejecución con el primer documento.

