// --- INSTRUCCIONES ---
// Copia y pega este código dentro del nodo "Calcular Semana1" (Node ID: week)
// Sustituye todo el código JavaScript existente por este.

const items = $input.all();
const newItem = items[0].json;

// --- CÓDIGO MODIFICADO PARA FORZAR SEMANA 52 ---

// 1. Definimos manualmente la semana y el año que queremos forzar
const forcedWeek = 52;
const forcedYear = 2025; // Como estamos a 23 de Diciembre de 2025, usamos 2025.

// 2. Construimos el nombre de la carpeta
const weekFolderName = `Semana ${String(forcedWeek).padStart(2, '0')} - ${forcedYear}`;

// 3. Asignamos este nombre al ítem, ignorando la fecha real del archivo
newItem['weekFolderName'] = weekFolderName;

// (Opcional) Guardamos la fecha original por si la necesitas para otro paso, pero la carpeta será la forzada.
let dateStr = newItem.fechaReunion || new Date().toISOString().split('T')[0];
if (dateStr.includes('/')) { dateStr = dateStr.replace(/\//g, '-'); }
newItem['originalDate'] = dateStr;

return [{ json: newItem }];
