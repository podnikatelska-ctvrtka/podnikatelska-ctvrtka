# 🔒 VALIDACE - QUICK REFERENCE

**Rychlý přehled všech validací v kurzu**

---

## 📍 KDE JSOU VALIDACE

| Komponenta | Lekce | Typ | Co validuje |
|------------|-------|-----|-------------|
| **CanvasValidator** | 10 | ⚠️ Soft | Propojení barev |
| **ProfitCalculator** | 11 | 🔒 Hard | Příjmy + náklady |
| **FitValidatorV2** | 16 | 🔒 Hard | Customer + Value |

---

## 🎯 PRAVIDLA VALIDACE

### 1️⃣ Canvas Validator (Lekce 10)

**Typ:** ⚠️ Soft validation (warnings, může pokračovat)

**5 kritických pravidel (ERROR):**
```
1. Segment ↔ Hodnota (obousměrně, stejná barva)
2. Hodnota → Kanál (min. 1, stejná barva)
3. Hodnota → Příjem (stejná barva NEBO 🌐 global)
4. Hodnota → Náklad (stejná barva NEBO 🌐 global)
```

**Varování (WARNING):**
```
5. Hodnota → Vztah (doporučené, ne kritické)
6. Příjem/Náklad bez hodnoty (upozornění + tip)
```

**Příklad správného flow:**
```
🔵 Segment "IT firmy"
  → 🔵 Hodnota "Cloud consulting"
    → 🔵 Kanál "LinkedIn"
    → 🔵 Příjem "Konzultace - 50k" (nebo 🌐 global)
    → 🔵 Náklad "Marketér - 20k" (nebo 🌐 global)
```

**Kód:**
```tsx
// /components/CanvasValidator.tsx (řádek ~219-329)
VALIDATION_RULES[4]: {
  id: 'color-cross-validation',
  check: (data) => {
    // Kontroluje propojení barev
  }
}
```

---

### 2️⃣ Profit Calculator (Lekce 11)

**Typ:** 🔒 Hard validation (nelze pokračovat bez dat)

**Pravidlo:**
```tsx
if (totalRevenue === 0 || totalCosts === 0) {
  // 🔒 Tlačítko "Dokončit lekci" = DISABLED
  // 🟡 Žlutý varování box
}
```

**Varování:**
```
⚠️ Chybí příjmy nebo náklady

Pro dokončení lekce potřebujete vyplnit 
Zdroje příjmů a Strukturu nákladů v Modulu 1.

💡 Vraťte se do Modulu 1 → 
   Lekce 5 (Příjmy) a Lekce 9 (Náklady)
```

**Důvod:**
- Finanční analýza vyžaduje data
- Bez dat nemůže spočítat: zisk, marži, break-even, GAP

**Kód:**
```tsx
// /components/ProfitCalculator.tsx (řádek ~1075-1119)
{totalRevenue === 0 || totalCosts === 0 ? (
  // Žlutý box + disabled button
) : (
  // Zelený box + enabled button
)}
```

---

### 3️⃣ FIT Validator - Krok 1 (Lekce 16)

**Typ:** 🔒 Hard validation (nelze pokračovat bez dat)

**Pravidlo:**
```tsx
disabled={jobs.length === 0 || pains.length === 0 || gains.length === 0}
```

**Varování:**
```
⚠️ Chybí data: Musíte vyplnit VŠECHNY TŘI kategorie:
Jobs, Pains a Gains v Lekci 1 (Zákaznický profil).
Bez kompletních dat nemůžete pokračovat k prioritizaci.
```

**Důvod:**
- Prioritizace vyžaduje kompletní Customer Profile
- FIT Score by byl 0% bez všech kategorií

**Kód:**
```tsx
// /components/FitValidatorV2.tsx (řádek ~2064-2087)
<Button
  disabled={jobs.length === 0 || pains.length === 0 || gains.length === 0}
  onClick={() => setCurrentStep(2)}
>
  Pokračovat k prioritizaci
</Button>
```

---

### 4️⃣ FIT Validator - Krok 2 (Lekce 16)

**Typ:** 🔒 Hard validation (nelze pokračovat bez dat)

**Pravidlo:**
```tsx
disabled={products.length === 0 || painRelievers.length === 0 || gainCreators.length === 0}
```

**Varování:**
```
⚠️ Chybí hodnotová mapa: Musíte vyplnit VŠECHNY TŘI kategorie:
Produkty/Služby, Řešení obtíží a Tvorba přínosů v Lekci 2.
Bez kompletních dat nemůžete pokračovat k FIT validaci.
```

**Důvod:**
- FIT Score vyžaduje propojení Customer ↔ Value
- Bez Value Map nemůže spočítat FIT %

**Kód:**
```tsx
// /components/FitValidatorV2.tsx (řádek ~2557-2576)
<Button
  disabled={products.length === 0 || painRelievers.length === 0 || gainCreators.length === 0}
  onClick={() => setCurrentStep(3)}
>
  Pokračovat k validaci
</Button>
```

---

## 🚨 COMMON ERRORS

### Error 1: "Modrý segment bez hodnoty"
```
❌ Problém: Vytvořil segment, ale zapomněl hodnotu
✅ Řešení: Vytvoř modrou hodnotu k modrému segmentu
```

### Error 2: "Modrý příjem bez hodnoty"
```
⚠️ Warning (ne error): Vytvořil příjem bez hodnoty
✅ Řešení: Buď vytvoř modrou hodnotu, nebo změň na 🌐 global
💡 Tip: Začni od segmentů → hodnoty → kanály → příjmy
```

### Error 3: Tlačítko disabled v Profit Calculator
```
❌ Problém: totalRevenue === 0 nebo totalCosts === 0
✅ Řešení: Jdi do Lekce 5 (Příjmy) a Lekce 9 (Náklady)
```

### Error 4: Tlačítko disabled v FIT Validator (Krok 1)
```
❌ Problém: Chybí Jobs nebo Pains nebo Gains
✅ Řešení: Jdi do Lekce 14 (Zákaznický profil) a vyplň všechny tři
```

### Error 5: Tlačítko disabled v FIT Validator (Krok 2)
```
❌ Problém: Chybí Products nebo Pain Relievers nebo Gain Creators
✅ Řešení: Jdi do Lekce 15 (Hodnotová mapa) a vyplň všechny tři
```

---

## 🔧 DEBUGGING

### Check validace v konzoli:

```js
// Canvas Validator:
console.log('Segments:', canvasData.segments);
console.log('Values:', canvasData.value);
console.log('Channels:', canvasData.channels);
console.log('Revenue:', canvasData.revenue);
console.log('Costs:', canvasData.costs);

// Profit Calculator:
console.log('Total Revenue:', totalRevenue);
console.log('Total Costs:', totalCosts);

// FIT Validator:
console.log('Jobs:', jobs);
console.log('Pains:', pains);
console.log('Gains:', gains);
console.log('Products:', products);
console.log('Pain Relievers:', painRelievers);
console.log('Gain Creators:', gainCreators);
```

### Check Supabase data:

```sql
-- Canvas data:
SELECT * FROM user_canvas_data 
WHERE user_id = 'xxx' 
ORDER BY updated_at DESC;

-- FIT Progress:
SELECT * FROM value_proposition_canvas
WHERE user_id = 'xxx'
ORDER BY updated_at DESC;
```

---

## 📝 PŘIDÁNÍ NOVÉ VALIDACE

### Template:

```tsx
// 1. Definuj pravidlo
const NEW_VALIDATION = {
  id: 'my-validation',
  title: '🎯 Název validace',
  description: 'Co kontroluji',
  check: (data) => {
    // Validační logika
    if (/* chyba */) {
      return {
        passed: false,
        message: '❌ Chybová zpráva',
        tip: '💡 Jak to opravit'
      };
    }
    
    return {
      passed: true,
      message: '✅ Vše OK'
    };
  },
  severity: 'error' // nebo 'warning'
};

// 2. Přidej do pole
const VALIDATION_RULES = [
  ...existingRules,
  NEW_VALIDATION
];

// 3. Pro hard validation (blokace):
<Button
  disabled={/* tvoje podmínka */}
  onClick={/* akce */}
>
  Pokračovat
</Button>

// 4. Přidej varování:
{/* tvoje podmínka */ && (
  <Alert className="bg-amber-50 border-amber-200">
    <Info className="h-4 w-4" />
    <AlertDescription>
      <strong>⚠️ Varování:</strong> Text
    </AlertDescription>
  </Alert>
)}
```

---

## 🎯 BEST PRACTICES

### 1. Soft vs Hard validace:
```
⚠️ Soft (warnings): 
- Nedůležité chyby
- Doporučení
- Tipy na zlepšení
- Příklad: "Hodnota bez vztahů"

🔒 Hard (errors):
- Kritické chyby
- Blokují pokračování
- Vyžadují opravu
- Příklad: "Segment bez hodnoty"
```

### 2. Typy zpráv:
```tsx
// ❌ ERROR (kritické):
message: '❌ Segment bez hodnoty!'

// ⚠️ WARNING (doporučení):
message: '⚠️ Hodnota bez vztahů - jak si zákazníky udržíte?'

// ✅ SUCCESS (vše OK):
message: '✅ Barvy perfektně propojené!'

// 💡 TIP (jak opravit):
tip: 'Správné pořadí: 1) Segmenty → 2) Hodnoty → 3) Kanály'
```

### 3. Disabled button design:
```tsx
<Button
  disabled={condition}
  className={`${
    condition 
      ? 'bg-white/50 text-gray-500 cursor-not-allowed opacity-60'
      : 'bg-white text-green-700 hover:bg-green-50'
  }`}
>
  {condition ? '🔒 Dokončit (vyžaduje data)' : 'Dokončit →'}
</Button>
```

---

## 🚀 DEPLOYMENT CHECKLIST

Před nasazením nové validace:

- [ ] Otestovat happy path (vše vyplněno)
- [ ] Otestovat error path (chybí data)
- [ ] Otestovat edge cases (dlouhé texty, emoji...)
- [ ] Zkontrolovat UX zpráv (jasné instrukce?)
- [ ] Zkontrolovat disabled state (viditelný?)
- [ ] Mobile testing (čitelnost?)
- [ ] Dokumentace aktualizována
- [ ] Code review

---

**Last Updated:** 14. října 2025  
**Version:** 1.0
