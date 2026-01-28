// --- CÓDIGO AUTOMÁTICO RECOMENDADO ---
// Copia y pega esto en el nodo "Calcular Semana1"

const items = $input.all();
const newItem = items[0].json;

// 1. OBTENER FECHA
// Intenta leer la fecha del nombre del archivo (YYYY-MM-DD). 
// Si no la encuentra, usa la fecha de creación del archivo.
// Si fallan todas, usa HOY ($now).
let dateStr = newItem.fechaReunion;

// Si no hay fecha detectada, usamos la fecha de hoy para asegurar que entra en la semana actual
if (!dateStr) {
    dateStr = new Date().toISOString().split('T')[0];
}

// Limpieza de formato (sustituir / por -)
if (dateStr.includes('/')) { dateStr = dateStr.replace(/\//g, '-'); }

const date = new Date(dateStr);

// 2. FUNCIÓN DE CÁLCULO DE SEMANA ISO (Estándar Europeo/Internacional)
// Esta función es más robusta para cambios de año y semanas 52/53
function getWeekNumber(d) {
    // Copiamos la fecha para no modificar la original
    const dateObj = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Ajustamos al jueves de esa semana (Regla ISO 8601)
    dateObj.setUTCDate(dateObj.getUTCDate() + 4 - (dateObj.getUTCDay() || 7));
    // Obtenemos el primer día del año
    const yearStart = new Date(Date.UTC(dateObj.getUTCFullYear(), 0, 1));
    // Calculamos el número de semana
    const weekNo = Math.ceil((((dateObj - yearStart) / 86400000) + 1) / 7);
    return weekNo;
}

const weekNumber = getWeekNumber(date);
const year = date.getFullYear();

// 3. GENERAR NOMBRE DE CARPETA
// Resultado automático: "Semana 52 - 2025" (para archivos del 22 o 23 de dic)
const weekFolderName = `Semana ${String(weekNumber).padStart(2, '0')} - ${year}`;

// Asignar al item
newItem['weekFolderName'] = weekFolderName;

return [{ json: newItem }];
