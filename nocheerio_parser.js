const items = $input.all();
// Helper para eliminar etiquetas HTML
const stripTags = (html) => html.replace(/<[^>]+>/g, '').trim();

// Tomamos el item actual del batch
const item = items[0];
const html = item.json.raw_html || "";
const sectionId = item.json.section_id;

// Regex para capturar bloques <p> y <ul>
// Nota: Usamos Regex porque 'cheerio' no está habilitado por defecto en n8n
const blockRegex = /<(p|ul)\b[^>]*>([\s\S]*?)<\/\1>/gi;

const blocks = [];
let index = 0;
let match;

while ((match = blockRegex.exec(html)) !== null) {
    const tagName = match[1].toLowerCase();
    const innerHtml = match[2];

    if (tagName === 'p') {
        const text = stripTags(innerHtml);
        // Ignorar párrafos vacíos
        if (text) {
            blocks.push({
                block_id: `${sectionId}_block_${index++}`,
                type: "explanation",
                content: text,
                source: "W3C WAI"
            });
        }
    } else if (tagName === 'ul') {
        // Extraer items de la lista <li>
        const liRegex = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
        const listItems = [];
        let liMatch;
        while ((liMatch = liRegex.exec(innerHtml)) !== null) {
            const liText = stripTags(liMatch[1]);
            if (liText) listItems.push(liText);
        }

        if (listItems.length > 0) {
            blocks.push({
                block_id: `${sectionId}_list_${index++}`,
                type: "list",
                content: listItems,
                source: "W3C WAI"
            });
        }
    }
}

return [{
    json: {
        section_id: sectionId,
        title: item.json.title,
        blocks
    }
}];
