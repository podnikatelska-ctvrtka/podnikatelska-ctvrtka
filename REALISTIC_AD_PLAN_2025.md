# 🎯 REALISTICKÝ REKLAMNÍ PLÁN 2025

**Datum:** 13. listopadu 2025  
**Realita:** Organický content je dead, FB/IG ignorují cílení, MUSÍME reklamy  
**Cíl:** Prodat kurz, vyřešit Advantage+ bullshit

---

## 📊 **REALITA - CO VÍME:**

```
✅ FAKTA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Organický content = dead (2025)
✓ FB skupiny = platit musíš
✓ MUSÍŠ jít přes reklamy
✓ Advantage+ = ignoruje cílení
✓ IG blokuje reklamy
✓ Žádná data = FB hádá

❌ CO NEFUNGUJE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
✗ Posting 3x týdně (už jsi zkoušel)
✗ FB skupiny bez peněz
✗ Čekat na organický reach
✗ Traffic kampaně (FB ignoruje)
✗ Doufat že FB poslechne

🎯 CO POTŘEBUJEŠ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ PRODÁVAT (ne budovat brand)
→ Data (kvůli FB optimalizaci)
→ Vyřešit Advantage+ zmrdy
→ ROI pozitivní ASAP
```

---

## 🔥 **ŘEŠENÍ - 2 KANÁLY:**

### **PROČ JEN 2?**

```
❌ 10 KANÁLŮ:
   → Rozmělnění budgetu
   → Rozmělnění času
   → Žádný kanál nemá dost dat
   → = FAIL všude

✅ 2 KANÁLY (focused):
   → Celý budget na 2 věci
   → Rychlejší learning
   → Rychleji data
   → Rychleji škálování
   → = WIN!

→ FOCUS = KLÍČ! 🎯
```

---

# 🎯 **KANÁL #1: META ADS (FB+IG) - S PIXELEM!**

## **PROČ:**
```
✅ Největší publikum (CZ)
✅ S pixelem MŮŽE fungovat
✅ Když funguje = škálovatelné
✅ Nelze ignorovat pixel data!
```

## **JAK VYŘEŠIT ADVANTAGE+ BULLSHIT:**

### **KROK 1: META PIXEL (CRITICAL!):**

```
BEZ PIXELU:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ FB neví KDO konvertuje
❌ FB hádá → ukazuje komukoliv
❌ = Důchodci co lajkují! ☠️

S PIXELEM:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ FB VÍ kdo dal email (Lead event)
✅ FB analyzuje ty lidi
✅ FB hledá PODOBNÉ
✅ = Automaticky vyhne důchodcům! 🎯

→ PIXEL = JEDINÁ CESTA! ✅
```

### **SETUP PIXELU:**

#### **A) Získej Pixel ID:**

```
1. ☐ https://business.facebook.com/events_manager

2. ☐ Data Sources → Pixels → "Add"

3. ☐ "Create a Pixel"

4. ☐ Název: "Podnikatelská Čtvrtka Pixel"

5. ☐ ZKOPÍRUJ PIXEL ID (16 číslic)
```

#### **B) Přidej do kódu:**

Otevři `/lib/metaPixel.ts` a změň:

```typescript
// NAJDI ŘÁDEK 9:
export const META_PIXEL_ID = 'YOUR_PIXEL_ID_HERE';

// ZMĚŇ NA:
export const META_PIXEL_ID = '1234567890123456'; // ⬅️ TVOJE ID!
```

#### **C) Přidej do App.tsx:**

Najdi useEffect (kolem řádku 128) a přidej:

```typescript
import { initMetaPixel, trackPageView } from "./lib/metaPixel";

useEffect(() => {
  // META PIXEL init
  initMetaPixel();
  trackPageView();
  
  // ... zbytek kódu ...
}, []);
```

#### **D) Trackuj Lead event:**

Otevři `/components/PrelaunchEmailCapture.tsx`:

```typescript
// Na začátek:
import { trackLead } from "../lib/metaPixel";

// V handleSubmit (po úspěšném opt-in):
const handleSubmit = async (e: React.FormEvent) => {
  // ... tvůj kód ...
  
  setSuccess(true);
  trackLead(email); // ⬅️ PŘIDEJ TUTO ŘÁDKU!
  
  // ... zbytek ...
};
```

#### **E) Otestuj:**

```
1. ☐ Otevři web: https://podnikatelskactvrtka.cz

2. ☐ F12 → Console → napiš:
   window.fbq('track', 'Lead', {test: true})

3. ☐ Events Manager → měl bys vidět test event! ✅

4. ☐ Zkus REÁLNÝ opt-in:
   → Zadej email
   → Events Manager → Live Events
   → Vidíš "Lead"? → FUNGUJE! ✅
```

---

### **KROK 2: CONVERSIONS KAMPAŇ (ne Traffic!):**

```
❌ TRAFFIC KAMPAŇ:
   → Optimalizuje na: Kliky
   → FB neví kdo konvertuje
   → = Curiosity clicks (lidi co jen koukají)

✅ CONVERSIONS KAMPAŇ:
   → Optimalizuje na: Lead events!
   → FB VÍ kdo dal email
   → Hledá podobné lidi
   → = Kvalitní leady! 🎯

→ CONVERSIONS = MUST! ✅
```

#### **A) Vytvoř kampaň:**

```
1. ☐ FB Ads Manager → "Create"

2. ☐ CÍL: "Conversions" ✅
   (NE Traffic! NE Sales!)

3. ☐ Conversion event: "Lead" ✅
   (měl bys vidět po pixel setupu)

4. ☐ Campaign name: "Čtvrtka - COLD Leads"
```

#### **B) Campaign settings:**

```
BUDGET:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Campaign Budget Optimization: ON ✅
Daily Budget: 600 Kč ✅

PROČ 600 Kč?
→ Min 500 Kč pro learning phase
→ FB potřebuje min ~50 konverzí
→ S 200 Kč = příliš pomalé!
→ S 600 Kč = 7-10 dní learning ✅

BID STRATEGY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Lowest cost (automatic) ✅
```

#### **C) Ad Set #1 - BROAD TARGETING:**

```
AD SET NAME:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
COLD - Broad 30-50

LOCATIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Česká republika ✅

AGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
30 - 50 ✅

GENDER:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
All genders ✅

DETAILED TARGETING:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ ŽÁDNÉ ZÁJMY! (Broad targeting!)

PROČ BROAD?
━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Méně parametrů = méně co FB ignoruje!
→ S pixelem: FB najde ideální lidi sám!
→ Často LEPŠÍ než detailed!
→ Rychlejší learning!

ADVANTAGE+:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Advantage+ Audience: OFF! ❌
Advantage+ Creative: OFF! ❌

PLACEMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Manual placements ✅

Vyber JEN:
✅ Facebook Feed
✅ Instagram Feed

Odškrtni:
❌ Stories
❌ Reels
❌ Messenger
❌ Audience Network
```

#### **D) Ad Set #2 - ZÁJMY (jako test):**

```
AD SET NAME:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
COLD - Podnikání 25-55

AGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
25 - 55 ✅

DETAILED TARGETING:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Entrepreneurship
✅ Small Business

(JEN 2 ZÁJMY! Ne víc!)

PLACEMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ FB Feed ONLY (ne IG)

PROČ JEN FB?
→ Test jestli detailed targeting funguje
→ FB má starší publikum (relevantnější)
```

#### **E) Reklamy:**

```
☐ Použij tvoje připravené copy:
   → /FB_ADS_COPY_TEXTY.md
   
☐ Vizuály:
   → /#ultimate-10-ads (screenshot + resize)
   
☐ Reklamy:
   → Ad 1: Denní ztráty (loss aversion)
   → Ad 2: Anti-guru (polarizující)
   → Ad 3: Před/Po (transformace)

☐ URL s UTM:
   https://podnikatelskactvrtka.cz/?utm_source=facebook&utm_medium=paid&utm_campaign=conversions&utm_content=cold1
```

---

### **KROK 3: MONITORING (CRITICAL!):**

#### **DEN 1: Breakdown by Age:**

```
1. ☐ FB Ads Manager → Ad Sets

2. ☐ Klikni "Breakdown" → "Age"

3. ☐ ZKONTROLUJ:

   ✅ DOBŘE:
      → Nejvíc impressions: 30-50
      → Lead events od 25-55
      → → FUNGUJE! Pokračuj! ✅
   
   ❌ ŠPATNĚ:
      → Nejvíc impressions: 65+
      → Lead events od důchodců
      → → KILL ASAP! FB ignoruje! ☠️
```

#### **DEN 3-7: Metrics:**

```
✅ SLEDUJ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cost per Lead (CPL):
→ Cíl: 40-80 Kč
→ Akceptovatelné: <100 Kč
→ Red flag: >120 Kč

CTR (Click-Through Rate):
→ Cíl: >2%
→ Akceptovatelné: 1.5-2%
→ Red flag: <1.2%

Conversion Rate (lead/click):
→ Cíl: >15%
→ Akceptovatelné: 10-15%
→ Red flag: <8%

Frequency:
→ Max: 2.5
→ Red flag: >3 (= ad fatigue)
```

#### **RED FLAGS - KILL CRITERIA:**

```
🚨 KILL POKUD (po 7 dnech):
━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Věk 65+ má nejvíc impressions
❌ CPL >150 Kč
❌ CTR <1%
❌ 0 konverzí po 100+ kliků
❌ Komentáře od důchodců

→ FB IGNORUJE CÍLENÍ!
→ PŘESUŇ BUDGET NA GOOGLE! 🔄
```

---

# 🎯 **KANÁL #2: GOOGLE ADS (SEARCH)**

## **PROČ:**

```
✅ High-intent traffic (lidi HLEDAJÍ!)
✅ Méně bullshitu než FB
✅ Měřitelné a prediktabilní
✅ B2B funguje lépe
✅ Backup pokud FB selže!
```

## **SETUP:**

### **KROK 1: Keywords:**

```
🎯 PRIMARY (exact match):
━━━━━━━━━━━━━━━━━━━━━━━━━━━
[business model canvas kurz]
[value proposition canvas]
[kurz pro podnikatele]
[online kurz byznys]

🎯 PHRASE MATCH:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
"jak najít cílovou skupinu"
"business strategie kurz"
"podnikatelský kurz online"

🎯 BROAD MATCH (pro discovery):
━━━━━━━━━━━━━━━━━━━━━━━━━━━
business model canvas
kurz pro začínající podnikatele
```

### **KROK 2: Kampaň:**

```
CAMPAIGN TYPE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Search ✅

CAMPAIGN NAME:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Čtvrtka - Search - BMC

BUDGET:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
400 Kč/den ✅

PROČ 400 Kč?
→ Očekávaný CPC: 8-15 Kč
→ = 25-50 kliků/den
→ = 3-8 leadů/den (při 15% CR)

LOCATIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Česká republika ✅

LANGUAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Czech ✅
```

### **KROK 3: Ad Copy:**

**AD VARIANT 1 - DIRECT:**

```
Headline 1: Business Model Canvas Kurz | 90 Minut
Headline 2: Jasná Strategie Pro Váš Byznys
Headline 3: První V ČR | Sleva 40%

Description 1:
90minutový online kurz. Business Model Canvas +
Value Proposition. Budete vědět komu prodávat.

Description 2:
První konkrétní metoda v ČR. Bez teorie, jen
výsledky. Sleva 40% pro prvních 50.

Display Path: podnikatelskactvrtka.cz/kurz

Final URL:
https://podnikatelskactvrtka.cz/?utm_source=google&utm_medium=cpc&utm_campaign=search-bmc&utm_content=direct
```

**AD VARIANT 2 - PROBLEM:**

```
Headline 1: Nevíte Komu Prodávat? | Řešení
Headline 2: 90 Minut = Jasno V Byznysu
Headline 3: Business Model Canvas | Česky

Description 1:
Přestaňte targetovat "všechny". Za 90 minut
budete vědět přesně komu prodávat a co nabízet.

Description 2:
Business Model + Value Proposition Canvas.
První kurz v češtině. Sleva 40% pro průkopníky.

Display Path: podnikatelskactvrtka.cz/reseni

Final URL:
https://podnikatelskactvrtka.cz/?utm_source=google&utm_medium=cpc&utm_campaign=search-bmc&utm_content=problem
```

### **KROK 4: Conversion Tracking:**

```
1. ☐ Google Ads → Tools → Conversions

2. ☐ "New conversion action"

3. ☐ Type: "Website"

4. ☐ Goal: "Submit lead form"

5. ☐ Value: 0 (budeme trackovat lead, ne purchase)

6. ☐ ZKOPÍRUJ tracking tag

7. ☐ PŘIDEJ na thank you page (po opt-in)
```

---

# 📊 **BUDGET SPLIT:**

```
CELKEM: 1000 Kč/den
━━━━━━━━━━━━━━━━━━━━━━━━━━━

META ADS:  600 Kč/den (60%)
GOOGLE:    400 Kč/den (40%)

PROČ TAKHLE?
━━━━━━━━━━━━━━━━━━━━━━━━━━━

→ Meta = větší publikum
→ Meta = potřebuje víc dat (learning)
→ Google = menší ale kvalitní traffic
→ Diverzifikace = safe!

POKUD META SELŽE (po 7 dnech):
━━━━━━━━━━━━━━━━━━━━━━━━━━━

META:      0 Kč/den (KILL!)
GOOGLE:  1000 Kč/den (100%)

→ Přesuň celý budget na Google!
```

---

# 📈 **OČEKÁVANÉ VÝSLEDKY:**

## **TÝDEN 1 (learning phase):**

```
META ADS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Spend: 4.200 Kč
Impressions: 30.000-50.000
Clicks: 150-250
CTR: 0.5-1.5% (nízké, learning!)
Leads: 5-15
CPL: 280-840 Kč (vysoký, learning!)

GOOGLE ADS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Spend: 2.800 Kč
Clicks: 180-350
CTR: 3-6%
Leads: 20-50
CPL: 56-140 Kč (lepší než Meta!)

CELKEM:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Spend: 7.000 Kč
Leads: 25-65
CPL: 108-280 Kč
Konverze na prodej: 0-3 (5-10%)
Revenue: 0-15K Kč
ROI: -100% až +100%

→ NORMÁLNÍ PRO LEARNING! ✅
```

## **TÝDEN 2 (optimized):**

```
META ADS (pokud funguje):
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Spend: 4.200 Kč
Leads: 30-70
CPL: 60-140 Kč (lepší!)

GOOGLE ADS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Spend: 2.800 Kč
Leads: 30-60
CPL: 47-93 Kč (zlepšuje se!)

CELKEM:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Spend: 7.000 Kč
Leads: 60-130
CPL: 54-117 Kč
Konverze: 3-10 (5-10%)
Revenue: 15-50K Kč
ROI: +100% až +600%

→ PROFITABLE! 🎯
```

## **TÝDEN 3-4 (škálování):**

```
POKUD META FUNGUJE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Zvýš budget: 1000 Kč/den
Google: 600 Kč/den
Celkem: 1600 Kč/den

POKUD META NEFUNGUJE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Meta: 0 Kč (KILL!)
Google: 1500 Kč/den (škáluj!)
Celkem: 1500 Kč/den

→ ŠKÁLUJ CO FUNGUJE! 🚀
```

---

# 🚨 **DECISION TREE:**

```
DEN 7: BREAKDOWN BY AGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━

META ukazuje 30-50? ✅
├─ ANO → Pokračuj! Sleduj CPL
│  
│  CPL <100 Kč? ✅
│  ├─ ANO → Škáluj! (+40% budget)
│  └─ NE → Optimalizuj (nové creative)
│  
└─ NE (ukazuje 65+) → KILL! ☠️
   └─ Přesuň budget na Google! 🔄


GOOGLE ADS: CPL?
━━━━━━━━━━━━━━━━━━━━━━━━━━━

CPL <120 Kč? ✅
├─ ANO → Škáluj! (+50% budget)
│  └─ Přidej keywords
│  
└─ NE (CPL >150 Kč)
   ├─ Pause broad match
   ├─ Focus na exact match
   └─ Optimalizuj landing page


CELKOVÝ ROI PO 14 DNECH:
━━━━━━━━━━━━━━━━━━━━━━━━━━━

ROI >100%? ✅
├─ ANO → ŠKÁLUJ! (double budget!)
│  
└─ NE (ROI <0%)
   ├─ Kill všechno
   ├─ Fix landing page / offer
   └─ Restart
```

---

# 📋 **AKČNÍ CHECKLIST:**

## **DNES (setup):**

```
META PIXEL:
☐ Získej Pixel ID (Events Manager)
☐ Přidej do /lib/metaPixel.ts
☐ Přidej initMetaPixel() do App.tsx
☐ Přidej trackLead() do PrelaunchEmailCapture
☐ Otestuj (F12 console + Events Manager)

META ADS:
☐ Conversions kampaň
☐ Event: Lead
☐ Budget: 600 Kč/den
☐ Ad Set 1: Broad 30-50
☐ Ad Set 2: Podnikání 25-55
☐ 3 reklamy (copy ready)
☐ Advantage+ OFF!

GOOGLE ADS:
☐ Search kampaň
☐ Keywords (BMC + podnikání)
☐ Budget: 400 Kč/den
☐ 2 ad variants
☐ Conversion tracking

→ LAUNCH! 🚀
```

## **DEN 1:**

```
META:
☐ Breakdown by Age (komu to ukazuje?)
☐ Check Pixel (Events Manager - vidím Leads?)

GOOGLE:
☐ Check CTR (měl by být 3-6%)
☐ Check search terms (relevantní?)

→ EARLY SIGNALS! 📊
```

## **DEN 7:**

```
META - DECISION POINT:
☐ Breakdown by Age:
   → 30-50? → Continue ✅
   → 65+? → KILL! ☠️

☐ CPL:
   → <100 Kč? → Škáluj! 📈
   → >150 Kč? → Kill nebo fix! 🔧

GOOGLE:
☐ CPL:
   → <120 Kč? → Škáluj! 📈
   → >150 Kč? → Optimize! 🔧

→ PIVOT OR SCALE! 🎯
```

## **DEN 14:**

```
OVERALL ROI:
☐ Revenue vs Spend?
   → Profit? → ŠKÁLUJ! 🚀
   → Loss? → Analyze nebo kill! 📊

WINNER CHANNEL:
☐ Meta lepší? → +budget Meta
☐ Google lepší? → +budget Google
☐ Oba fungují? → Škáluj oba! 💰

→ SCALE WINNERS! 🏆
```

---

# 💡 **KRITICKÉ TIPY:**

```
1. META PIXEL = NON-NEGOTIABLE!
   → Bez něj FB hádá
   → = Důchodci
   → = Fail

2. CONVERSIONS KAMPAŇ (ne Traffic!)
   → Traffic = kliky
   → Conversions = leady
   → = Rozdíl mezi fail a win!

3. BROAD TARGETING s pixelem:
   → Méně parametrů = méně ignorování
   → Pixel data = FB najde sám
   → Často lepší než detailed!

4. BREAKDOWN BY AGE (den 1!)
   → Jediný způsob jak ověřit
   → Pokud 65+ → kill immediately!

5. GOOGLE = BACKUP!
   → Pokud Meta selže
   → High-intent traffic
   → Měřitelné a škálovatelné

6. ROI FOCUS!
   → Ne vanity metrics (likes, reach)
   → JEN: Leads → Sales → ROI
   → Pokud neg ROI po 14d → kill!

7. ŠKÁLUJ CO FUNGUJE!
   → Meta funguje? → Double budget!
   → Google funguje? → Add keywords!
   → Oba fungují? → Škáluj oba! 🚀
```

---

# 🎯 **TL;DR - ACTION PLAN:**

```
🔥 SETUP (DNES):
━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. META PIXEL:
   ☐ Setup v /lib/metaPixel.ts
   ☐ trackLead() v opt-in
   ☐ Test v Events Manager

2. META ADS:
   ☐ Conversions kampaň (Lead event)
   ☐ 600 Kč/den
   ☐ Broad + Detailed targeting
   ☐ Advantage+ OFF!

3. GOOGLE ADS:
   ☐ Search kampaň
   ☐ 400 Kč/den
   ☐ BMC keywords

→ LAUNCH! 🚀


📊 DEN 1-7 (SLEDUJ):
━━━━━━━━━━━━━━━━━━━━━━━━━━━

META:
☐ Breakdown by Age (30-50? ✅ | 65+? ☠️)
☐ CPL (<100 Kč? ✅)
☐ Pixel events (vidím Leads?)

GOOGLE:
☐ CTR (>3%? ✅)
☐ CPL (<120 Kč? ✅)

→ EARLY SIGNALS! 🎯


🎯 DEN 7 (DECISION):
━━━━━━━━━━━━━━━━━━━━━━━━━━━

META shows 65+?
→ KILL! Přesuň na Google! ☠️

Meta shows 30-50 + CPL <100?
→ ŠKÁLUJ! +40% budget! 📈

Google CPL <120?
→ ŠKÁLUJ! Add keywords! 📈

→ PIVOT OR SCALE! 🚀


💰 DEN 14 (SCALE):
━━━━━━━━━━━━━━━━━━━━━━━━━━━

ROI >100%?
→ DOUBLE BUDGET! 🚀

Jeden kanál lepší?
→ FOCUS tam! 🎯

Oba fungují?
→ ŠKÁLUJ OBA! 💰

→ SCALE TO THE MOON! 🌙
```

---

**→ PIXEL = KLÍČ K ŘEŠENÍ ADVANTAGE+ PROBLÉMU! 🔑**

**→ BEZ PIXELU = DŮCHODCI! ☠️**

**→ S PIXELEM = FB NAJDE TVOJE LIDI! 🎯**

**→ GOOGLE = BACKUP POKUD META SELŽE! 🔄**

**→ LAUNCH ASAP! 🚀**
