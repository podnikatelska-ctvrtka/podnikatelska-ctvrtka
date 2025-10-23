# 🚨 QUICK RESTORE GUIDE

**"Rozesrali jsme to mobilem, jak to vrátím zpátky?"** 😅

---

## 🎯 DESKTOP KURZ - RESTORE

### **KROK 1: Zjisti co je rozesrané**

Otevři `/components/CourseDemoV3.tsx` a zkontroluj:

```tsx
// ❌ ŠPATNĚ (rozesráno mobilem):
<div className="max-w-4xl mx-auto"> {/* TOO NARROW! */}
  <BusinessModelCanvasSimple />
</div>

// ✅ SPRÁVNĚ (funkční desktop):
<div className="max-w-[1600px] mx-auto"> {/* WIDE ENOUGH! */}
  <BusinessModelCanvasSimple />
</div>
```

---

### **KROK 2: Zkontroluj Canvas layout**

**Lekce 16 (Interaktivní cvičení):**
```tsx
// Musí být:
<div className="max-w-[1600px] mx-auto px-6">
  <BusinessModelCanvasSimple />
</div>
```

**BusinessModelCanvasSimple.tsx:**
```tsx
// Canvas grid:
<div className="grid grid-cols-5 gap-4 min-w-[1200px]">
  {/* 9 bloků canvasu */}
</div>
```

**Lekce 10 (Canvas Validator):**
```tsx
// Scaled preview:
<div className="max-w-6xl mx-auto">
  <div className="scale-75 origin-top">
    <BusinessModelCanvasSimple readOnly />
  </div>
</div>
```

---

### **KROK 3: Restore z dokumentace**

1. Otevři `/ARCHIVE/course-components/README.md`
2. Najdi sekci "DESKTOP CANVAS LAYOUT SPECS"
3. Zkopíruj správné hodnoty
4. Aplikuj do komponent

---

## 📚 MINIKURZ - RESTORE

### **KROK 1: Zkontroluj routing**

```tsx
// App.tsx - musí být:
if (hash.startsWith('#priprava') || hash.startsWith('#minikurz') || 
    path === '/priprava' || path === '/minikurz') {
  return <MiniCourse />;
}
```

### **KROK 2: Zkontroluj MiniCourse.tsx**

```tsx
// Musí obsahovat všechny 3 lekce:
const lessons: Lesson[] = [
  { day: 1, title: "Získejte zpětnou vazbu za 24h", ... },
  { day: 2, title: "Zvyšte tržby bez reklam", ... },
  { day: 3, title: "Vaše strategie za 15 minut", ... },
];
```

### **KROK 3: Restore z dokumentace**

1. Otevři `/ARCHIVE/minikurz/README.md`
2. Zkontroluj strukturu lekcí
3. Ověř že upsell CTA funguje (Den 3)

---

## 🎯 13 REKLAM - RESTORE

### **KROK 1: Zkontroluj soubory**

```bash
# Musí existovat:
/ULTIMATE_13_ADS_DEPLOYMENT_STRATEGY.md
/components/Ultimate10Ads.tsx
/components/Final6Angles.tsx
/components/TenNewAngles.tsx
/components/All6AdSets.tsx
```

### **KROK 2: Restore z archivu**

1. Otevři `/ARCHIVE/ads/ULTIMATE_13_ADS_DEPLOYMENT_STRATEGY_v1_2025-01-21.md`
2. Zkopíruj celý obsah
3. Přepiš `/ULTIMATE_13_ADS_DEPLOYMENT_STRATEGY.md`

---

## 📧 EMAIL SEKVENCE - RESTORE

⚠️ **PROBLEM:** Původní sekvence byla ztracena!

### **MOŽNOSTI:**

1. **Zkontroluj produkci** (Smartemailing/Make.com)
   - Možná je tam uložená
   - Export z platformy

2. **Vytvoř novou** (zítra)
   - Použij `/SOCIAL_MEDIA_CONTENT_PLAN.md` jako základ
   - 3 emaily (Den 0, 1, 2)
   - Upsell v Email #3

3. **Placeholder:**
   - `/ARCHIVE/emails/EMAIL_SEQUENCES_PLACEHOLDER_2025-01-21.md`

---

## 🚨 KRITICKÉ KONTROLY

### **✅ DESKTOP KURZ FUNGUJE KDYŽ:**

1. **Canvas width:** `max-w-[1600px]` (Lekce 16)
2. **Canvas grid:** `min-w-[1200px]`
3. **Validator:** `scale(0.75)` preview
4. **NO horizontal scrollbar!**
5. **Sidebar vlevo, content vpravo**

### **✅ MINIKURZ FUNGUJE KDYŽ:**

1. **3 lekce:** Den 1, 2, 3
2. **Copyable templates:** Click to copy
3. **Upsell CTA:** Na konci Dne 3
4. **Public access:** No auth required
5. **URL works:** `/priprava` a `/minikurz`

### **✅ REKLAMY FUNGUJÍ KDYŽ:**

1. **13 ads:** 8 COLD + 5 WARM
2. **Deployment strategy:** 3 fáze (Testing / Scale / Full)
3. **Budget:** 900 Kč/den total
4. **KPI benchmarks:** Definovány

---

## 💡 PREVENCE

### **PRAVIDLA PRO BUDOUCNOST:**

1. **PŘED ZMĚNOU:**
   - Zkontroluj `/ARCHIVE/`
   - Přečti dokumentaci komponenty
   - Testuj desktop PŘED mobilem

2. **PŘI ZMĚNĚ:**
   - Změny aplikuj postupně
   - Testuj každou změnu samostatně
   - Commituj často (pokud máš Git)

3. **PO ZMĚNĚ:**
   - Otestuj desktop layout
   - Otestuj mobile layout
   - Zkontroluj že jsi nic nerozesral

4. **KDYŽ NĚCO ROZESREŠ:**
   - Klid! 😅
   - Otevři `/ARCHIVE/`
   - Použij tento guide
   - Restore z dokumentace

---

## 📞 HELP!

**Pokud stále nejde:**

1. **Přečti si `/ARCHIVE/INDEX.md`**
   - Kompletní přehled všeho v archivu

2. **Najdi správnou dokumentaci:**
   - Kurz: `/ARCHIVE/course-components/README.md`
   - Minikurz: `/ARCHIVE/minikurz/README.md`
   - Reklamy: `/ARCHIVE/ads/...`

3. **Zkontroluj `/WORK_CONTEXT.md`:**
   - Co se právě dělá
   - Co se nedělá
   - Frozen components

4. **V krajním případě:**
   - Zeptej se AI: "Podívej se do /ARCHIVE/ a restore desktop kurz"
   - AI má instrukci NIKDY NEMAZAT soubory z /ARCHIVE/

---

**Bottom line:** ARCHIVE = tvůj lifesaver! 🆘✅

Pokud něco rozesreš, TAM najdeš jak to vrátit zpátky! 🎯
