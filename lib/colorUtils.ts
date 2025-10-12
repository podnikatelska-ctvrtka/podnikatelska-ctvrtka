// 🎨 Utility pro převod HEX barev na názvy pro STICKY_COLORS
// Používá se ve VŠECH canvas komponentách

// 🌐 global = pro celý byznys (zdroje, náklady, partneři...)
// ❌ white = ODSTRANĚNO (matoucí duplicita s global)
// ❌ gray = ODSTRANĚNO (zbytečná, mátoucí)
export type ColorName = 'blue' | 'green' | 'yellow' | 'pink' | 'purple' | 'global' | 'red' | 'orange';

/**
 * Převede HEX barvu nebo string název na validní ColorName
 * Podporuje:
 * - HEX kódy: "#3b82f6" → "blue"
 * - String názvy: "green" → "green"
 * - Fallback na "blue" pokud není rozpoznáno
 */
export function hexToColorName(color: string | undefined): ColorName {
  if (!color) {
    return 'blue';
  }
  
  const colorLower = color.toLowerCase().trim();
  
  // Pokud už je to název barvy (ne hex), vrať ho přímo
  const validColors: ColorName[] = ['blue', 'green', 'yellow', 'pink', 'purple', 'global', 'red', 'orange'];
  
  // BACKWARD COMPATIBILITY: 'white' → 'global', 'gray' → 'blue' (pro starší data)
  if (colorLower === 'white') {
    return 'global';
  }
  if (colorLower === 'gray') {
    return 'blue'; // fallback na modrou
  }
  
  if (validColors.includes(colorLower as ColorName)) {
    return colorLower as ColorName;
  }
  
  // Jinak je to hex kód, převeď ho
  const hexMap: Record<string, ColorName> = {
    '#3b82f6': 'blue',
    '#22c55e': 'green',
    '#10b981': 'green',
    '#eab308': 'yellow',
    '#ec4899': 'pink',
    '#8b5cf6': 'purple',
    '#ffffff': 'global', // white → global
    '#d1d5db': 'global', // white → global
    '#6b7280': 'gray',
    '#ef4444': 'red',
    '#f59e0b': 'orange',
  };
  
  return hexMap[colorLower] || 'blue';
}
