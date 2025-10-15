# 🎨 DESIGN SYSTÉM - Podnikatelská Čtvrtka

## 📏 TYPOGRAFIE

### Globální (tmavé pozadí aplikace)
```css
H1: 30px (1.875rem), font-700, color: #ffffff, line-height: 1.3
H2: 24px (1.5rem), font-700, color: #ffffff, line-height: 1.4
H3: 20px (1.25rem), font-600, color: #ffffff, line-height: 1.4
H4: 18px (1.125rem), font-600, color: #ffffff, line-height: 1.5
H5: 16px (1rem), font-600, color: #f3f4f6, line-height: 1.5
P: 16px (1rem), color: #d1d5db, line-height: 1.6
```

### Prose (bílé pozadí v lekcích)
```css
H1: 28px (1.75rem), font-700, color: #111827
H2: 24px (1.5rem), font-700, color: #1f2937
H3: 20px (1.25rem), font-600, color: #1f2937
H4: 18px (1.125rem), font-600, color: #374151
H5: 16px (1rem), font-600, color: #4b5563
P: 16px (1rem), color: #374151, line-height: 1.7
```

## 📦 INFO BOXY - JEDNOTNÉ VELIKOSTI

### 🔵 Modré boxy (info/tipy)
```jsx
className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4"
// Nadpis: font-bold text-blue-900 mb-3
// Text: text-blue-800
```

### 🟢 Zelené boxy (success/pozitivní)
```jsx
className="bg-green-50 border-2 border-green-200 rounded-xl p-4"
// Nadpis: font-bold text-green-900 mb-3
// Text: text-green-800
```

### 🟡 Žluté boxy (warning/upozornění)
```jsx
className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4"
// Nadpis: font-bold text-yellow-900 mb-3
// Text: text-yellow-800
```

### 🟣 Fialové boxy (pokročilé/premium)
```jsx
className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4"
// Nadpis: font-bold text-purple-900 mb-3
// Text: text-purple-800
```

### 🔴 Červené boxy (error/kritické)
```jsx
className="bg-red-50 border-2 border-red-200 rounded-xl p-4"
// Nadpis: font-bold text-red-900 mb-3
// Text: text-red-800
```

### 🟠 Oranžové boxy (akce/důležité)
```jsx
className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4"
// Nadpis: font-bold text-orange-900 mb-3
// Text: text-orange-800
```

## 📊 KARTY S DATY/VÝSLEDKY

### Velká karta (analýza, výsledky)
```jsx
className="bg-white/60 p-5 rounded-lg border border-gray-200"
// Nadpis: font-bold text-gray-900 mb-3 text-lg
// Text: text-gray-800
// Čísla: text-2xl nebo text-xl font-bold
```

### Střední karta (jednotlivé položky)
```jsx
className="bg-white/60 p-4 rounded-lg"
// Nadpis: font-bold text-gray-900 text-base
// Text: text-gray-700
```

### Malá karta (seznam, grid)
```jsx
className="bg-gray-50 p-3 rounded-lg border border-gray-200"
// Nadpis: font-medium text-gray-900
// Text: text-gray-700
```

## 🎯 AKČNÍ KROKY (3 kroky pattern)

```jsx
<div className="flex gap-3 items-start bg-white/60 p-4 rounded">
  <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
    1
  </span>
  <div>
    <strong className="text-gray-900">Nadpis akce</strong>
    <p className="text-gray-700 mt-1">
      Popis akce
    </p>
  </div>
</div>
```

## 📈 ČÍSELNÉ HODNOTY

### Revenue/Příjmy
```jsx
className="text-green-600 font-bold"
// Velikost podle kontextu: text-xl nebo text-2xl
```

### Costs/Náklady
```jsx
className="text-red-600 font-bold"
```

### Profit/Zisk (pozitivní)
```jsx
className="text-blue-600 font-bold"
```

### Profit/Ztráta (negativní)
```jsx
className="text-red-600 font-bold"
```

## 🏆 RANKING/POŘADÍ

### #1 místo
```jsx
className="bg-green-100 border-2 border-green-400"
// Text: text-green-700
```

### #2 místo
```jsx
className="bg-gray-50 border border-gray-200"
```

### #3 místo
```jsx
className="bg-yellow-50 border border-yellow-300"
```

## 📱 SPACING

### Kontejnery
```jsx
// Hlavní kontejner: p-6 nebo p-8
// Vnořené kontejnery: p-4 nebo p-5
// Malé boxy: p-3
```

### Mezery mezi elementy
```jsx
// Mezi sekcemi: space-y-6 nebo space-y-8
// Mezi boxy: space-y-4
// Mezi položkami v seznamu: space-y-2 nebo space-y-3
// Mezi texty v boxu: mb-3 nebo mb-4
```

## ✅ POUŽITÍ V KOMPONENTECH

### ProfitCalculator
- Všechny info boxy: p-4 nebo p-5
- Nadpisy v boxech: text-base nebo text-lg, font-bold
- Texty: normální (16px)
- Číselné hodnoty: text-base nebo text-xl

### FitValidatorV2
- Stejné pravidla jako ProfitCalculator
- Priority boxy: p-4
- Validační karty: p-4

### BusinessActionPlan
- Hlavní karty: p-8
- Info boxy: p-4
- Akční kroky: p-4, gap-3

### CanvasValidator
- Info boxy: p-4
- Validační zprávy: p-3 nebo p-4
- Výsledkové karty: p-5
