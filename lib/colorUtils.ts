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

/**
 * Generuje barevné varianty pro UI komponenty
 * @param color - hex barva nebo colorName
 * @returns object s různými odstíny pro backgrounds, borders, text, atd.
 */
export function getColorVariants(color: string | undefined) {
  const colorName = hexToColorName(color);
  
  const variants: Record<ColorName, {
    bg: string; // světlý gradient background
    border: string; // border barva
    icon: string; // barva ikony/buttonu
    text: string; // tmavý text
    hover: string; // hover stav buttonu
  }> = {
    blue: {
      bg: 'linear-gradient(to bottom right, #dbeafe, #bfdbfe)',
      border: '#bfdbfe',
      icon: '#3b82f6',
      text: '#1e3a8a',
      hover: '#2563eb'
    },
    green: {
      bg: 'linear-gradient(to bottom right, #dcfce7, #bbf7d0)',
      border: '#bbf7d0',
      icon: '#22c55e',
      text: '#14532d',
      hover: '#16a34a'
    },
    yellow: {
      bg: 'linear-gradient(to bottom right, #fef9c3, #fde047)',
      border: '#fde047',
      icon: '#eab308',
      text: '#713f12',
      hover: '#ca8a04'
    },
    pink: {
      bg: 'linear-gradient(to bottom right, #fce7f3, #fbcfe8)',
      border: '#fbcfe8',
      icon: '#ec4899',
      text: '#831843',
      hover: '#db2777'
    },
    purple: {
      bg: 'linear-gradient(to bottom right, #f3e8ff, #e9d5ff)',
      border: '#e9d5ff',
      icon: '#8b5cf6',
      text: '#581c87',
      hover: '#7c3aed'
    },
    orange: {
      bg: 'linear-gradient(to bottom right, #ffedd5, #fed7aa)',
      border: '#fed7aa',
      icon: '#f59e0b',
      text: '#78350f',
      hover: '#d97706'
    },
    red: {
      bg: 'linear-gradient(to bottom right, #fee2e2, #fecaca)',
      border: '#fecaca',
      icon: '#ef4444',
      text: '#7f1d1d',
      hover: '#dc2626'
    },
    global: {
      bg: 'linear-gradient(to bottom right, #f3f4f6, #e5e7eb)',
      border: '#d1d5db',
      icon: '#6b7280',
      text: '#1f2937',
      hover: '#4b5563'
    }
  };
  
  return variants[colorName];
}
