# 📱 MOBILE REALITY CHECK - CO JE A CO NENÍ
**Date:** 2025-01-24  
**Status:** 🔍 INVESTIGATION

---

## **🚨 PŘEKVAPIVÉ ZJIŠTĚNÍ:**

### **✅ `isMobile` EXISTUJE!**

```tsx
// ✅ ŘÁDEK 1146 v CourseDemoV3.tsx
const [isMobile, setIsMobile] = useState(
  typeof window !== 'undefined' && window.innerWidth < 768
);

// ✅ ŘÁDEK 1150-1157: Resize listener
useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

### **✅ `isMobile` SE POUŽÍVÁ!**

```tsx
// ✅ ŘÁDEK 2377: Mobile single section
{isMobile && (
  <div className="space-y-4">
    <MobileSingleSection ... />
  </div>
)}

// ✅ ŘÁDEK 2345: Desktop CTA
{!isMobile && (
  <div className="bg-gradient-to-br...">
    Desktop CTA
  </div>
)}
```

---

## **❓ TAKŽE CO JE PROBLÉM?**

Pokud `isMobile` **EXISTUJE** a **POUŽÍVÁ SE**, proč si uživatel stěžuje že mobil nefunguje?

### **MOŽNÉ DŮVODY:**

1. **CSS LAYOUT OVERFLOW**
   - Desktop layout se nezměnil pro mobil
   - Sidebar překrývá obsah
   - Horizontal scroll
   
2. **TOUCH TARGETS MALÉ**
   - Tlačítka < 48px
   - Nejde kliknout na malé prvky
   
3. **FONT SIZE**
   - Inputy < 16px = iOS auto-zoom
   
4. **KALKULAČKY WIDE LAYOUT**
   - Grid layout nefunguje na úzkých obrazovkách
   
5. **CANVAS PŘÍLIŠ MALÝ**
   - 9 boxů na malé obrazovce = nečitelné
   
6. **LANDSCAPE MODE**
   - V landscape režimu je layout rozbitý
   
7. **SPECIFICKÉ KOMPONENTY**
   - Některé komponenty nemají mobile optimalizaci
   - Např. ProfitCalculator, TargetCalculator, Tools

---

## **🧪 CO POTŘEBUJEME ZJISTIT:**

### **1. OTEVŘI KURZ NA MOBILU**

```
URL: https://yoursite.com/#course-v3?token=xxx
```

**ZKONTROLUJ:**
- [ ] Vidíš `MobileSingleSection` nebo desktop layout?
- [ ] Je sidebar viditelný nebo skrytý?
- [ ] Dá se scrollovat horizontálně?
- [ ] Jsou tlačítka dostatečně velká?
- [ ] Funguje kalkulačka?
- [ ] Dá se přidávat položky do Canvas?

---

### **2. OTEVŘI DEVTOOLS → MOBILE VIEW**

```
1. Otevři Chrome DevTools (F12)
2. Klikni na "Toggle device toolbar" (Ctrl+Shift+M)
3. Vyber "iPhone 12 Pro" (390x844)
4. Refresh page
```

**ZKONTROLUJ KONZOLI:**
```js
// Přidej do CourseDemoV3.tsx (řádek 1147):
console.log('📱 isMobile:', isMobile, 'width:', window.innerWidth);
```

**EXPECTED:**
```
📱 isMobile: true width: 390
```

---

### **3. TESTUJ CONDITIONAL RENDERING**

**TEST A: Desktop view (>768px)**
```
Šířka: 1200px
OČEKÁVÁNO:
✅ isMobile = false
✅ Desktop CTA viditelná
❌ MobileSingleSection NENÍ viditelná
```

**TEST B: Mobile view (<768px)**
```
Šířka: 390px
OČEKÁVÁNO:
✅ isMobile = true
❌ Desktop CTA NENÍ viditelná
✅ MobileSingleSection viditelná
```

---

## **🎯 CO UŽIVATEL OPRAVDU VIDÍ?**

**SCÉNÁŘ 1: Mobilní komponenty SE zobrazují, ale UX je špatný**

PŘÍZNAKY:
- ✅ `MobileSingleSection` je viditelná
- ❌ Layout je stále wide (overflow)
- ❌ Touch targets jsou malé
- ❌ Inputy způsobují zoom na iOS

**ŘEŠENÍ:**
→ Přidat CSS media queries do `/styles/globals.css`
→ Fix touch targets, font size, layout
→ **DESKTOP ZŮSTANE NEDOTČENÝ**

---

**SCÉNÁŘ 2: Mobilní komponenty SE NEZOBRAZUJÍ (isMobile = false)**

PŘÍZNAKY:
- ❌ Desktop layout na mobilu
- ❌ `MobileSingleSection` není viditelná
- ❌ Sidebar překrývá obsah

**MOŽNÉ DŮVODY:**
1. SSR issue (window.innerWidth při SSR = undefined)
2. Resize listener nefunguje
3. Browser cache (starý build)

**ŘEŠENÍ:**
→ Debug `isMobile` hodnotu (console.log)
→ Check initial state vs. after resize
→ Clear cache a refresh

---

**SCÉNÁŘ 3: Mobilní komponenty SE zobrazují na NĚKTERÝCH stránkách**

PŘÍZNAKY:
- ✅ Landing page má mobile optimalizaci
- ❌ Kurz nemá mobile optimalizaci
- ❌ Některé lekce fungují, jiné ne

**MOŽNÉ DŮVODY:**
1. Conditional rendering jen pro NĚKTERÉ lekce
2. `showCanvas` logic blokuje mobile view
3. Různé moduly mají různou implementaci

**ŘEŠENÍ:**
→ Check každý modul zvlášť
→ Find rozdíly mezi Modul 1 vs. Modul 2 vs. Modul 3
→ Unify mobile approach

---

## **📋 DEBUG CHECKLIST:**

### **KROK 1: Přidej console.log**

```tsx
// ✅ PŘIDAT na řádek 1147 v CourseDemoV3.tsx
const [isMobile, setIsMobile] = useState(
  typeof window !== 'undefined' && window.innerWidth < 768
);

// ✅ PŘIDAT HNED PO TOMTO:
useEffect(() => {
  console.log('📱 MOBILE DEBUG:', {
    isMobile,
    windowWidth: window.innerWidth,
    userAgent: navigator.userAgent,
    orientation: orientation
  });
}, [isMobile, orientation]);
```

---

### **KROK 2: Otevři konzoli na mobilu**

**OPTION A: Remote debugging (Android)**
```
1. Připoj telefon k PC (USB)
2. Otevři Chrome → chrome://inspect
3. Klikni "Inspect" na svém zařízení
4. Vidíš konzoli z mobilu!
```

**OPTION B: Eruda console (iOS/Android)**
```tsx
// Přidat do App.tsx (jen pro debug!)
import { useEffect } from 'react';

useEffect(() => {
  // Pouze pro debug mobilu
  if (window.innerWidth < 768) {
    const script = document.createElement('script');
    script.src = '//cdn.jsdelivr.net/npm/eruda';
    document.body.appendChild(script);
    script.onload = () => (window as any).eruda.init();
  }
}, []);
```

---

### **KROK 3: Screenshot test**

**DESKTOP (>768px):**
1. Otevři kurz
2. Screenshot celé stránky
3. Verify: Desktop CTA viditelná, MobileSingleSection NENÍ

**MOBILE (<768px):**
1. Otevři kurz
2. Screenshot celé stránky
3. Verify: MobileSingleSection viditelná, Desktop CTA NENÍ

---

## **🚀 NEXT STEPS (BASED ON FINDINGS):**

### **IF SCÉNÁŘ 1 (Mobile components visible, bad UX):**
→ **ŘEŠENÍ:** CSS media queries v `/styles/globals.css`
→ **RISK:** ✅ ŽÁDNÉ (media queries neovlivní desktop)
→ **TIME:** 15 minut

### **IF SCÉNÁŘ 2 (isMobile = false):**
→ **ŘEŠENÍ:** Debug + fix `isMobile` detection
→ **RISK:** ⚠️ STŘEDNÍ (může ovlivnit desktop rendering)
→ **TIME:** 30 minut

### **IF SCÉNÁŘ 3 (Some pages work, others don't):**
→ **ŘEŠENÍ:** Unify mobile approach across all modules
→ **RISK:** ⚠️ VYSOKÉ (mnoho změn v kódu)
→ **TIME:** 60+ minut

---

## **💡 DOPORUČENÍ:**

**NEJBEZPEČNĚJŠÍ PŘÍSTUP:**

1. **NEJDŘÍV:** Zjisti CO SE OPRAVDU DĚJE
   - Přidej console.log
   - Otevři mobil
   - Screenshot
   
2. **POTOM:** Identify problém (Scénář 1, 2, nebo 3)

3. **NAKONEC:** Vyber řešení podle problému

---

**ALTERNATIVNÍ PŘÍSTUP (uživatelův návrh):**

Vytvořit **ÚPLNĚ NOVÝ SOUBOR** `/components/CourseDemoV3_Mobile.tsx`:

**PROS:**
- ✅ Desktop 100% nedotčený
- ✅ Zero risk
- ✅ Jasná separace

**CONS:**
- ❌ Code duplication
- ❌ Maintenance burden (2x komponenty)
- ❌ Bugfixy musí být v obou souborech

---

## **❓ CO TEĎKA?**

**OPTION A:** Debug current implementation (zjistit co nefunguje)  
**OPTION B:** Create separate mobile file (bezpečné, ale duplicitní)  
**OPTION C:** CSS-only fixes (nejrychlejší, nejbezpečnější)

---

**WAITING FOR USER INPUT:**

1. Co PŘESNĚ nefunguje na mobilu?
2. Můžeš otevřít kurz na mobilu a říct co vidíš?
3. Dáš screenshot z mobilu?
4. Nebo chceš prostě separate mobile file bez debug?

---

**Last Updated:** 2025-01-24  
**Status:** 🔍 WAITING FOR USER INPUT  
**Next:** Debug OR Create separate file
