# 🎯 META PIXEL - SLEDUJ KONVERZE A VYŘEŠ ADVANTAGE+!

## ✅ **PROČ TO FUNGUJE:**

```
❌ BEZ PIXELU:
   → FB optimalizuje na: Lajky, komentáře
   → = Důchodci co mají celý den! ☠️

✅ S PIXELEM + KONVERZE:
   → FB optimalizuje na: Lidi co ZADAJÍ EMAIL!
   → FB se učí kdo konvertuje
   → Hledá PODOBNÉ lidi
   → = AUTOMATICKY vyhneš důchodcům! 🎯
```

---

## 🚀 **SETUP - 3 KROKY:**

### **KROK 1: ZÍSKEJ META PIXEL ID**

```
1. ☐ Jdi na: https://business.facebook.com/events_manager

2. ☐ Vlevo: "Data Sources" → "Pixels"

3. ☐ Klikni "Add" → "Create a Pixel"

4. ☐ Název: "Podnikatelská Čtvrtka Pixel"

5. ☐ Klikni "Create"

6. ☐ ZKOPÍRUJ PIXEL ID:
   → Vypadá jako: 1234567890123456
   → ULOŽ SI HO! ⬅️ POTŘEBUJEŠ!
```

---

### **KROK 2: PŘIDEJ PIXEL NA WEB**

#### **A) Otevři `/lib/metaPixel.ts`**

```typescript
// Najdi řádek:
export const META_PIXEL_ID = 'YOUR_PIXEL_ID_HERE';

// ZMĚŇ NA:
export const META_PIXEL_ID = '1234567890123456'; // ⬅️ TVOJE PIXEL ID!
```

#### **B) Přidej do `/App.tsx`**

Na ZAČÁTEK souboru (k importům):

```typescript
import { initMetaPixel, trackPageView } from "./lib/metaPixel";
```

Pak v `useEffect` (kolem řádku 128):

```typescript
useEffect(() => {
  // 📊 META PIXEL: Inicializace
  initMetaPixel();
  
  // Tracking page view
  trackPageView();
  
  // ... zbytek useEffect kódu ...
}, []);
```

---

### **KROK 3: TRACKUJ LEAD EVENT (opt-in)**

#### **A) Najdi komponentu `/components/PrelaunchEmailCapture.tsx`**

```typescript
// Na začátek souboru přidej import:
import { trackLead } from "../lib/metaPixel";
```

#### **B) V handleSubmit funkci**

Najdi místo kde je úspěšný opt-in (po `setSuccess(true)` nebo podobně):

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // ... tvůj existující kód ...
  
  // Po úspěšném opt-in:
  setSuccess(true);
  
  // ✅ PŘIDEJ TUTO ŘÁDKU:
  trackLead(email); // ⬅️ TRACK LEAD EVENT!
  
  toast.success("Email uložen!");
  
  // ... zbytek kódu ...
};
```

#### **C) Pokud máš více míst s opt-in**

Přidej `trackLead(email)` VŠUDE kde user zadává email:
- PrelaunchEmailCapture
- EarlyAccessSale
- QuickEmailCaptureModal
- atd.

---

## 🎯 **KROK 4: NASTAV FB KAMPAŇ**

### **NOVÁ KAMPAŇ - S KONVERZEMI!**

```
1. ☐ FB Ads Manager → "Create"

2. ☐ CÍL: "Conversions" ⬅️ NE Traffic! NE Sales!
   → Vyber "CONVERSIONS"!

3. ☐ Conversion Event:
   → "Lead" ✅
   → NE "Purchase"!
   → NE "PageView"!

4. ☐ Publikum:
   → Použij tvůj uložený okruh
   → Věk 25-55
   → Zájmy podnikatelské

5. ☐ ADVANTAGE+:
   → Advantage+ publikum = VYPNI! ❌
   → Advantage+ kreativa = VYPNI! ❌

6. ☐ Budget: 200 Kč/den

7. ☐ PUBLIKUJ! 🚀
```

---

## 📊 **JAK TO FUNGUJE:**

### **LEARNING PHASE (den 1-7):**

```
FB POTŘEBUJE MIN 50 KONVERZÍ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. FB ukazuje reklamu různým lidem

2. Sleduje KDO zadá email (Lead event)

3. Analyzuje ty lidi:
   → Věk, zájmy, chování, atd.

4. NAJDE VZOR:
   → "Aha! Lidi 30-45 se zájmem o marketing
      zadávají email NEJVÍC!"

5. HLEDÁ PODOBNÉ:
   → Ukazuje reklamu VÍCE takovým lidem!

6. OPTIMALIZUJE:
   → Méně důchodců (netestovali!)
   → Více kvalitních leadů! ✅
```

---

## ✅ **VÝHODY:**

```
✅ FB SE UČÍ kdo konvertuje
✅ Automaticky VYHNEŠ důchodcům
✅ LEPŠÍ kvalita leadů
✅ NIŽŠÍ cena za lead (CPL)
✅ VYŠŠÍ CTR (protože cílí správně)
✅ ŽÁDNÉ Advantage+ kecy! (respektuje cílení!)
```

---

## 🎯 **METRICS - CO SLEDOVAT:**

### **V FB ADS MANAGER:**

```
✅ LEAD EVENT:
   → Columns → "Customize Columns"
   → Přidej: "Website Leads"
   → TOTO JE TVOJE METRIKA! 🎯

✅ COST PER LEAD (CPL):
   → Cíl: 30-60 Kč/lead
   → Výborné: <30 Kč/lead

✅ CONVERSION RATE:
   → Cíl: 5-15% (z kliků)
   → Výborné: >15%

✅ CTR:
   → Cíl: >1.5%
   → Výborné: >2.5%
```

---

## 🔧 **TESTOVÁNÍ:**

### **OVĚŘ ŽE TO FUNGUJE:**

```
1. ☐ Otevři web: https://podnikatelskactvrtka.cz

2. ☐ Otevři Chrome DevTools (F12)

3. ☐ Console → Vypiš:
   fbq('track', 'Lead', {test: true})

4. ☐ Jdi do Events Manager:
   → https://business.facebook.com/events_manager
   → Měl bys vidět "Test Event"! ✅

5. ☐ Zkus OPRAVDOVÝ opt-in:
   → Zadej email na landing page
   → Events Manager → "Live Events"
   → Měl bys vidět "Lead" event! 🎯

6. ☐ Pokud vidíš → FUNGUJE! ✅
```

---

## 📋 **CHECKLIST:**

```
☐ Meta Pixel ID získané
☐ Pixel ID přidané do `/lib/metaPixel.ts`
☐ `initMetaPixel()` v App.tsx
☐ `trackLead(email)` v opt-in formulářích
☐ Otestované v Events Manager (vidím Lead event)
☐ FB kampaň vytvořená:
   ☐ Cíl: "Conversions"
   ☐ Event: "Lead"
   ☐ Publikum: 25-55, podnikatelé
   ☐ Advantage+ vypnuto
☐ SPUŠTĚNO! 🚀
```

---

## 🎯 **PROČ JE TO LEPŠÍ NEŽ TRAFFIC:**

```
TRAFFIC KAMPAŇ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Optimalizuje na: Kliky
❌ Problém: FB nezná KDO dělá akci
❌ Může cílit na: Curiosity clicks (lidi co jen koukají)

CONVERSIONS KAMPAŇ (Lead):
━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Optimalizuje na: Lidi co ZADAJÍ EMAIL!
✅ FB ví: Tento člověk dal email = kvalitní lead!
✅ Hledá: PODOBNÉ lidi (věk, zájmy, chování)
✅ Výsledek: Lepší kvalita, nižší cena! 🎯

→ PRO LEAD GEN = VŽDYCKY CONVERSIONS! ✅
```

---

## 💡 **BONUSY:**

### **TRACK I DALŠÍ AKCE:**

V `/lib/metaPixel.ts` máš připravené:

```typescript
// Klik na CTA (Objednat nyní)
trackInitiateCheckout();

// Přechod na order page
trackViewContent('Order Page');

// Po nákupu (z FAPI webhooku)
trackPurchase(4999, orderId);
```

**KDE TO PŘIDAT:**

```typescript
// V CTA buttonu (HeroSection, EarlyAccessSale):
onClick={() => {
  trackInitiateCheckout();
  window.location.href = '/objednavka';
}}

// V ThankYouPage (po nákupu):
useEffect(() => {
  trackPurchase(4999, orderId);
}, []);
```

---

## 🚨 **TROUBLESHOOTING:**

### **"Events Manager neukazuje Lead event"**

```
ŘEŠENÍ:
1. Počkej 5-10 minut (delay je normální)
2. Zkontroluj Console (F12) - vidíš errory?
3. Zkontroluj Pixel ID (správný?)
4. Otevři Network tab → filter "fbevents"
   → Měl bys vidět requesty! ✅
```

### **"FB říká že pixel není nainstalován"**

```
ŘEŠENÍ:
1. Zkontroluj že initMetaPixel() se volá
2. Console → piš: window.fbq
   → Měla by být funkce! ✅
3. Zkus hard refresh (Ctrl+Shift+R)
4. Zkontroluj adblocker (vypni!)
```

---

## 🎯 **TL;DR - QUICK START:**

```
1️⃣ ZÍSKEJ PIXEL ID:
   → Events Manager → Create Pixel
   → Zkopíruj ID

2️⃣ PŘIDEJ DO KÓDU:
   → /lib/metaPixel.ts → META_PIXEL_ID = 'tvoje_id'
   → App.tsx → initMetaPixel()
   → Opt-in formuláře → trackLead(email)

3️⃣ OTESTUJ:
   → Zadej email → Events Manager → vidíš Lead? ✅

4️⃣ VYTVOŘ KAMPAŇ:
   → Cíl: Conversions
   → Event: Lead
   → Publikum: 25-55, podnikatelé
   → SPUSŤ! 🚀

5️⃣ SLEDUJ:
   → Cost per Lead (CPL)
   → Conversion Rate
   → CTR

→ HOTOVO! FB TEĎKA OPTIMALIZUJE NA SPRÁVNÉ LIDI! 🎯
```

---

## 📊 **OČEKÁVANÉ VÝSLEDKY:**

```
PO 3-7 DNECH:
━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ CPL: 30-60 Kč/lead
✅ CTR: 2-4%
✅ Conversion Rate: 10-20%
✅ Kvalita leadů: VYSOKÁ! 🎯
✅ Žádní důchodci! ✅

PO 14 DNECH (optimalizováno):
━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ CPL: 20-40 Kč/lead
✅ CTR: 3-5%
✅ Conversion Rate: 15-25%
✅ FB našel ideální publikum! 🚀

→ TO CHCEŠ! 💰
```

---

**→ TOHLE JE ŘEŠENÍ NA ADVANTAGE+ PROBLÉM! 🎯**

**→ FB NEMŮŽE IGNOROVAT PIXEL DATA! ✅**

**→ SLEDUJ KONVERZE = SLEDUJ PENÍZE! 💰**
