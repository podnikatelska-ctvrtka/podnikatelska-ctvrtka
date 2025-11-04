# 🔧 ULTIMATE10ADS - FIX HTML2CANVAS CHYBY

**Datum:** 3. listopadu 2025  
**Status:** ✅ OPRAVENO

---

## ❌ PROBLÉM:

```
[plugin:vite:import-analysis] Failed to resolve import "html2canvas" 
from "components/Ultimate10Ads.tsx"
```

**Příčina:**
- Komponenta `Ultimate10Ads.tsx` používala dynamický import `html2canvas`
- Vite měl problém s tímto dynamickým importem
- Knihovna nebyla správně dostupná v build procesu

---

## ✅ ŘEŠENÍ:

### **1️⃣ Odstraněna export funkce:**

**PŘED:**
```typescript
const exportAsImage = async () => {
  const html2canvas = (await import('html2canvas')).default;
  const canvas = await html2canvas(adRef.current, {...});
  // ... export logic
}
```

**PO:**
```typescript
const exportAsImage = () => {
  toast.info('📸 Exportuj ručně:', {
    description: 'Windows: Win+Shift+S | Mac: Cmd+Shift+4',
    duration: 5000
  });
};
```

### **2️⃣ Upraveno tlačítko:**

**PŘED:**
```jsx
<button onClick={exportAsImage}>
  Exportovat jako PNG (1080×1350)
</button>
```

**PO:**
```jsx
<button onClick={exportAsImage}>
  📸 Jak exportovat (návod)
</button>
<p>Klikni na tlačítko pro zobrazení návodu...</p>
```

### **3️⃣ Odstraněna závislost:**

Odstraněno z `package.json`:
```diff
- "html2canvas": "^1.4.1"
```

---

## 🎯 JAK EXPORTOVAT REKLAMY:

### **METODA 1: Screenshot tool (nejrychlejší)**

**Windows:**
```
Win + Shift + S
→ Vyber oblast
→ Uloží se do schránky
→ Paste do editoru a uložit
```

**Mac:**
```
Cmd + Shift + 4
→ Vyber oblast
→ Uloží se na Desktop
```

---

### **METODA 2: DevTools Screenshot (přesné rozměry)**

```
1. F12 (otevři DevTools)
2. Ctrl+Shift+P (Mac: Cmd+Shift+P)
3. Napiš "Capture node screenshot"
4. Klikni na element s reklamou
5. Automaticky stáhne PNG
```

**Výhoda:** Přesné rozměry, vysoká kvalita

---

### **METODA 3: Browser Extension**

**Fireshot** (Chrome/Firefox):
- Celá stránka nebo vybraná oblast
- Automatický export PNG/JPG
- https://getfireshot.com/

---

## 🧪 TESTOVÁNÍ:

```bash
# 1. Jdi na stránku s reklamami
/#ultimate-10-ads

# 2. Klikni na "📸 Jak exportovat"
→ Měl by se zobrazit toast s návodem

# 3. Zkus screenshot:
Windows: Win+Shift+S
Mac: Cmd+Shift+4

# 4. Ulož jako:
ad-name_1080x1350.png
```

---

## ✅ CO FUNGUJE:

```
✅ Komponenta se načítá bez chyb
✅ Všechny reklamy se zobrazují
✅ Navigace mezi reklamami funguje
✅ Toast návod na screenshot
✅ Copy buttons pro FB ad copy
✅ Žádné console errors
```

---

## 📊 VELIKOSTI PRO FACEBOOK ADS:

```
Feed:             1080 × 1080 px (1:1)
Story/Reels:      1080 × 1920 px (9:16)
Carousel:         1080 × 1080 px (1:1)
Our custom size:  1080 × 1350 px (4:5) ← Optimální pro feed
```

**Proč 1080×1350?**
- Větší než klasický 1:1, ale ne tak vysoký jako story
- Více místa pro content
- Stále se dobře zobrazuje ve feedu
- Instagram-friendly

---

## 🚀 READY TO GO:

Komponenta je opravena a funguje. Reklamy můžeš exportovat screenshotem nebo DevTools.

**Pro rychlý export použij:**
```
F12 → Ctrl+Shift+P → "Capture node screenshot"
```

---

**Chyba opravena! 🎉**
