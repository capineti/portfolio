// ============================================================================
// FIGMA PLUGIN - HEADLESS ORCHESTRA (SILVER v2.1 - VARIABLES SUPPORT)
// ============================================================================

figma.showUI(__html__, { width: 450, height: 600 });

console.log("🚀 Plugin loaded - v2.1 (Variables Support)");

// ============================================================================
// UTILIDADES
// ============================================================================

function safeNumber(val) {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') return parseInt(val) || 0;
  return 0;
}

function hexToRgb(hex) {
  const defaultColor = { r: 1, g: 1, b: 1 };
  if (!hex || typeof hex !== 'string') return defaultColor;
  hex = hex.trim().toLowerCase();

  if (hex === 'transparent') return null;
  if (hex.startsWith('#')) hex = hex.slice(1);
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  if (hex.length !== 6) return defaultColor;

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  return { r, g, b };
}

// --- VARIABLES HELPER (NUEVO) ---
// Busca una variable local por nombre (ej: "spacing/400" o "color/primary")
async function findVariableByName(name, type) {
  try {
    const localVars = await figma.variables.getLocalVariablesAsync(type);
    const match = localVars.find(v => v.name === name || v.name.includes(name));
    return match ? match.id : null;
  } catch (e) {
    return null;
  }
}

// Vincula una propiedad del nodo a una variable
async function bindVariable(node, field, varName, type) {
  if (!varName) return;
  const varId = await findVariableByName(varName, type);
  if (varId) {
    try {
      node.setBoundVariable(field, varId);
    } catch (e) {
      console.warn(`Could not bind ${varName} to ${field}`);
    }
  }
}

async function loadFontSafe(family, style) {
  try {
    await figma.loadFontAsync({ family, style });
  } catch (e) {
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  }
}

async function findComponent(key, name) {
  if (key) {
    try {
      const imported = await figma.importComponentByKeyAsync(key);
      if (imported) return imported;
    } catch (e) { }
  }
  return null;
}

// ============================================================================
// SERIALIZER (INGESTA)
// ============================================================================
function serializeNode(node) {
  // ... (Mismo código de v2.0)
  // Simplificado para ahorrar espacio en esta vista, la lógica esencial se mantiene
  const data = {
    id: node.id,
    name: node.name,
    type: node.type,
    width: node.width,
    height: node.height,
    layoutMode: node.layoutMode || 'NONE',
    primaryAxisAlignItems: node.primaryAxisAlignItems,
    counterAxisAlignItems: node.counterAxisAlignItems,
    fills: node.fills && node.fills.length ? 'HasFills' : 'None',
    key: node.key || null
  };

  if (node.children) {
    data.childrenCount = node.children.length;
    data.structure = node.children.map(c => `${c.type}: ${c.name}`).slice(0, 5);
  }
  return data;
}

// ============================================================================
// RENDER ENGINE (GENERACION)
// ============================================================================

async function renderNode(nodeData) {
  if (!nodeData) return null;

  // 1. TEXT
  if (nodeData.type === "TEXT_NODE") {
    const textNode = figma.createText();
    await loadFontSafe("Inter", "Regular");
    textNode.characters = nodeData.text || "Text";
    textNode.fontSize = nodeData.fontSize || 16;
    if (nodeData.role === "Title") textNode.fontSize = 32;

    if (nodeData.fontColor) {
      const rgb = hexToRgb(nodeData.fontColor);
      if (rgb) textNode.fills = [{ type: 'SOLID', color: rgb }];
    }
    return textNode;
  }

  // 2. COMPONENTE
  if (nodeData.type === "COMPONENT") {
    const component = await findComponent(nodeData.key, nodeData.text);
    if (component) {
      const instance = component.createInstance();
      instance.name = nodeData.text || component.name;
      instance.layoutGrow = 0;
      instance.primaryAxisSizingMode = "AUTO";
      instance.counterAxisSizingMode = "AUTO";

      const textLayer = instance.findOne(n => n.type === "TEXT");
      if (textLayer && nodeData.props?.text) {
        await loadFontSafe(textLayer.fontName.family, textLayer.fontName.style);
        textLayer.characters = nodeData.props.text;
      }
      return instance;
    }
    const frame = figma.createFrame();
    frame.resize(100, 40);
    frame.name = "Missing: " + (nodeData.text || "Comp");
    return frame;
  }

  // 3. IMAGE
  if (nodeData.type === "IMAGE") {
    const imageFrame = figma.createFrame();
    imageFrame.name = nodeData.name || "Image Placeholder";
    const w = safeNumber(nodeData.width) || 120;
    const h = safeNumber(nodeData.height) || 120;

    if (nodeData.width === "FILL") imageFrame.layoutAlign = "STRETCH";
    else imageFrame.resize(w, h); // fixed

    imageFrame.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];

    // Si viene URL real (Agente de Imagen)
    if (nodeData.imageUrl) {
      // En un caso real aquí descargaríamos la imagen, 
      // por ahora simulamos con texto.
      // figma.createImageAsync(nodeData.imageUrl)...
    }

    const label = figma.createText();
    await loadFontSafe("Inter", "Bold");
    label.characters = "🖼️ " + (nodeData.text || "Img");
    imageFrame.appendChild(label);

    imageFrame.layoutMode = "VERTICAL";
    imageFrame.primaryAxisAlignItems = "CENTER";
    imageFrame.counterAxisAlignItems = "CENTER";
    return imageFrame;
  }

  // 4. FRAME
  if (nodeData.type === "FRAME") {
    const frame = figma.createFrame();
    frame.name = nodeData.name || "Frame";
    frame.layoutMode = nodeData.layoutMode === "HORIZONTAL" ? "HORIZONTAL" : "VERTICAL";

    // --- VARIABLES BINDING MAGIC ---
    // El Agente de Espaciado enviará "spacingVar" en lugar de "itemSpacing" (num)

    // GAPS
    if (nodeData.itemSpacingVar) {
      await bindVariable(frame, 'itemSpacing', nodeData.itemSpacingVar, 'FLOAT');
    } else if (nodeData.itemSpacing) {
      frame.itemSpacing = safeNumber(nodeData.itemSpacing);
    }

    // PADDING
    if (nodeData.padding) {
      if (typeof nodeData.padding === 'object') {
        // Si es objeto, checamos si trae variables por lado
        const { top, bottom, left, right, allVar } = nodeData.padding;

        if (allVar) {
          await bindVariable(frame, 'paddingTop', allVar, 'FLOAT');
          await bindVariable(frame, 'paddingBottom', allVar, 'FLOAT');
          await bindVariable(frame, 'paddingLeft', allVar, 'FLOAT');
          await bindVariable(frame, 'paddingRight', allVar, 'FLOAT');
        } else {
          frame.paddingTop = top || 0;
          frame.paddingBottom = bottom || 0;
          frame.paddingLeft = left || 0;
          frame.paddingRight = right || 0;
        }
      } else {
        const p = safeNumber(nodeData.padding);
        frame.paddingLeft = p; frame.paddingRight = p; frame.paddingTop = p; frame.paddingBottom = p;
      }
    }

    // Background
    if (nodeData.background) {
      // ... (mismo background logic)
      const rgb = hexToRgb(nodeData.background);
      if (rgb) frame.fills = [{ type: 'SOLID', color: rgb }];
    }

    if (nodeData.primaryAxisAlignItems) frame.primaryAxisAlignItems = nodeData.primaryAxisAlignItems;
    if (nodeData.counterAxisAlignItems) frame.counterAxisAlignItems = nodeData.counterAxisAlignItems;

    if (nodeData.width === "FILL" || (typeof nodeData.width === 'number' && nodeData.width > 999)) {
      frame.layoutAlign = "STRETCH";
      frame.primaryAxisSizingMode = "FIXED";
    } else {
      frame.primaryAxisSizingMode = "AUTO";
    }

    if (nodeData.children) {
      for (const childData of nodeData.children) {
        const child = await renderNode(childData);
        if (child) {
          if (frame.layoutMode === "HORIZONTAL") child.layoutGrow = 0;
          if (frame.name.includes("Navbar")) child.layoutAlign = "INHERIT";
          frame.appendChild(child);
        }
      }
    }
    return frame;
  }
  return null;
}

// MAIN MSG HANDLER
figma.ui.onmessage = async (msg) => {
  // Ingest
  if (msg.type === 'get-selection') {
    const selection = figma.currentPage.selection;
    if (selection.length > 0) {
      const data = selection.map(n => serializeNode(n));
      figma.ui.postMessage({ type: 'selection-response', success: true, data });
    } else {
      figma.ui.postMessage({ type: 'selection-response', success: false });
    }
  }

  // Gen
  if (msg.type === 'draw-layout') {
    await loadFontSafe("Inter", "Regular");
    const data = msg.data;
    const desktop = figma.createFrame();
    desktop.name = "Orchestra Output";
    desktop.resize(1440, 900);
    desktop.layoutMode = "VERTICAL";

    // Background
    if (data.background) {
      const rgb = hexToRgb(data.background);
      if (rgb) desktop.fills = [{ type: 'SOLID', color: rgb }];
    } else {
      desktop.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    }

    if (data.children) {
      for (const kid of data.children) {
        const node = await renderNode(kid);
        if (node) {
          desktop.appendChild(node);
          node.layoutAlign = "STRETCH";
        }
      }
    }
    figma.viewport.scrollAndZoomIntoView([desktop]);
    figma.notify("🎻 Symphonic UI Generated");
  }
};