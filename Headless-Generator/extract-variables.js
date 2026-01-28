// ============================================================================
// FIGMA PLUGIN - VARIABLES EXTRACTOR
// ============================================================================
// Este script extrae las variables de Figma y las formatea para Pinecone

figma.showUI(__html__, { width: 500, height: 600 });

console.log("🚀 Variables Extractor loaded");

// Función para extraer todas las variables de Figma
async function extractFigmaVariables() {
    console.log("📊 Extracting Figma variables...");

    const localVariables = figma.variables.getLocalVariables();
    const variablesByType = {
        spacing: [],
        colors: [],
        numbers: [],
        strings: []
    };

    for (const variable of localVariables) {
        const variableData = {
            id: variable.id,
            name: variable.name,
            description: variable.description || "",
            resolvedType: variable.resolvedType,
            values: {}
        };

        // Obtener valores para cada modo
        for (const [modeId, value] of Object.entries(variable.valuesByMode)) {
            variableData.values[modeId] = value;
        }

        // Clasificar por tipo
        if (variable.resolvedType === "FLOAT") {
            // Detectar si es spacing por el nombre
            if (variable.name.toLowerCase().includes('spacing') ||
                variable.name.toLowerCase().includes('space') ||
                variable.name.toLowerCase().includes('gap') ||
                variable.name.toLowerCase().includes('padding') ||
                variable.name.toLowerCase().includes('margin')) {
                variablesByType.spacing.push(variableData);
            } else {
                variablesByType.numbers.push(variableData);
            }
        } else if (variable.resolvedType === "COLOR") {
            variablesByType.colors.push(variableData);
        } else if (variable.resolvedType === "STRING") {
            variablesByType.strings.push(variableData);
        }
    }

    console.log("✅ Variables extracted:", {
        spacing: variablesByType.spacing.length,
        colors: variablesByType.colors.length,
        numbers: variablesByType.numbers.length,
        strings: variablesByType.strings.length
    });

    return variablesByType;
}

// Función para formatear variables para Pinecone
function formatVariablesForPinecone(variablesByType) {
    const formatted = [];

    // Formatear spacing variables
    if (variablesByType.spacing.length > 0) {
        let spacingText = "SPACING VARIABLES:\n";
        for (const v of variablesByType.spacing) {
            const modeId = Object.keys(v.values)[0];
            const value = v.values[modeId];
            spacingText += `- "${v.name}": ${value}px${v.description ? ` (${v.description})` : ''}\n`;
        }

        formatted.push({
            id: `variables-spacing`,
            text: spacingText,
            metadata: {
                type: "design-tokens",
                category: "spacing"
            }
        });
    }

    // Formatear color variables
    if (variablesByType.colors.length > 0) {
        let colorsText = "COLOR VARIABLES:\n";
        for (const v of variablesByType.colors) {
            const modeId = Object.keys(v.values)[0];
            const value = v.values[modeId];

            // Convertir RGBA a HEX
            if (value && typeof value === 'object' && 'r' in value) {
                const r = Math.round(value.r * 255);
                const g = Math.round(value.g * 255);
                const b = Math.round(value.b * 255);
                const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
                colorsText += `- "${v.name}": ${hex}${v.description ? ` (${v.description})` : ''}\n`;
            }
        }

        formatted.push({
            id: `variables-colors`,
            text: colorsText,
            metadata: {
                type: "design-tokens",
                category: "colors"
            }
        });
    }

    return formatted;
}

// Función para generar el texto descriptivo para n8n
function generateVariablesDescription(variablesByType) {
    let description = "## DESIGN TOKENS DISPONIBLES\n\n";

    // Spacing
    if (variablesByType.spacing.length > 0) {
        description += "### Spacing Variables:\n";
        for (const v of variablesByType.spacing) {
            const modeId = Object.keys(v.values)[0];
            const value = v.values[modeId];
            description += `- \`"${v.name}"\` = ${value}px\n`;
        }
        description += "\n";
    }

    // Colors
    if (variablesByType.colors.length > 0) {
        description += "### Color Variables:\n";
        for (const v of variablesByType.colors) {
            const modeId = Object.keys(v.values)[0];
            const value = v.values[modeId];

            if (value && typeof value === 'object' && 'r' in value) {
                const r = Math.round(value.r * 255);
                const g = Math.round(value.g * 255);
                const b = Math.round(value.b * 255);
                const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
                description += `- \`"${v.name}"\` = ${hex}\n`;
            }
        }
        description += "\n";
    }

    description += "**IMPORTANTE:** Usa estos nombres EXACTOS en el JSON para spacing y colors.";

    return description;
}

// Comando principal
figma.ui.onmessage = async (msg) => {
    if (msg.type === 'extract-variables') {
        try {
            console.log("🔍 Starting variable extraction...");

            const variables = await extractFigmaVariables();
            const pineconeFormat = formatVariablesForPinecone(variables);
            const description = generateVariablesDescription(variables);

            // Enviar a la UI
            figma.ui.postMessage({
                type: 'variables-extracted',
                data: {
                    raw: variables,
                    pineconeFormat: pineconeFormat,
                    description: description
                }
            });

            console.log("✅ Variables extraction complete");

        } catch (err) {
            console.error("❌ Error extracting variables:", err);
            figma.notify("Error: " + err.message);
        }
    }
};
