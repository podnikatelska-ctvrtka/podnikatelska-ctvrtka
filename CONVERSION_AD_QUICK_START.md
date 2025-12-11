# 🚀 CONVERSION REKLAMA - RYCHLÝ START

## 📌 CO JE TO?

**Conversion kampaň** = Facebook reklama zaměřená na **přímé bookings** na FREE 20min konzultaci.

**URL:** `https://podnikatelskactvrtka.cz/konzultace`  
**Cíl:** Nabooknout 3-5 konzultací týdně  
**Budget:** 100-150 Kč/den  

---

## ⚡ RYCHLÝ START (10 MINUT)

### **KROK #1: Zkontroluj landing page**

**URL:** `https://podnikatelskactvrtka.cz/konzultace`

**MĚLO BY BÝT VIDĚT:**
- ✅ Hero text: "Nevíš co dělat jako první? Promluvme si zdarma."
- ✅ 3 benefit karty (20 minut / Zdarma / Bez závazků)
- ✅ TidyCal kalendář widget (na pravé straně desktop, dole na mobile)
- ✅ FAQ sekce (Čeho se můžeme dotknout?)

**POKUD NEFUNGUJE:**
- Zkontroluj že KonzultacePage.tsx je v App.tsx
- Zkontroluj routing (řádek cca 286 v App.tsx)

---

### **KROK #2: Nastav TidyCal tracking (DŮLEŽITÉ!)**

**BEZ TOHOTO NEBUDE TRACKING FUNGOVAT!**

1. **Login do TidyCal:** tidycal.com
2. **Jdi na Settings** → **Integrations**
3. **Najdi "Custom Code" nebo "Tracking Codes"**
4. **Přidej Meta Pixel:**

```html
<!-- Meta Pixel Code for Booking Confirmation -->
<script>
  // Meta Pixel is loaded globally on podnikatelskactvrtka.cz
  // Track when booking is confirmed
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Lead', {
      content_name: 'Free Consultation Booking',
      value: 0,
      currency: 'CZK'
    });
    
    console.log('✅ Meta Pixel: Lead event tracked (TidyCal booking)');
  }
</script>
```

5. **Ulož**

**ALTERNATIVA:**  
Pokud TidyCal nemá custom code, použij **Webhook**:
- TidyCal → Settings → Webhooks → Add webhook
- URL: `https://podnikatelskactvrtka.cz/.netlify/functions/tidycal-webhook`
- Event: `booking.created`
- Pak vytvoř Netlify funkci která pošle event do Meta

---

### **KROK #3: Otestuj TidyCal booking**

**JAK:**
1. Jdi na `podnikatelskactvrtka.cz/konzultace`
2. Zabooku si test konzultaci (použij test email)
3. **HNED PO POTVRZENÍ:**
   - Otevři **Meta Events Manager**
   - Jdi na **Test Events**
   - **MUSÍŠ VIDĚT:** `Lead` event

**POKUD NEVIDÍŠ LEAD EVENT:**
- Zkontroluj že TidyCal má Meta Pixel code
- Zkontroluj browser console (F12) → hledej `Lead event tracked`
- Zkontroluj že Meta Pixel je inicializovaný na /konzultace

---

### **KROK #4: Vytvoř Custom Audience (OPTIONAL ale doporučené)**

**PROČ:** Můžeš vyloučit lidi co už si zabookovali, aby neviděli reklamu.

**JAK:**
1. **Meta Ads Manager** → **Audiences** → **Create Audience** → **Custom Audience**
2. **Zdroj:** Website
3. **Events:** Lead
4. **Název:** "Booked Free Consultation"
5. **Ulož**

**POUŽITÍ:**  
Při nastavování ad setu → Exclude this audience

---

## 🎯 VYTVOŘENÍ KAMPANĚ (15 MINUT)

### **KROK #1: Campaign Level**

**Meta Ads Manager** → **Create Campaign**

```
Campaign Name: Conversion - Free Konzultace 2025

Objective: SALES (dříve Conversions)
  → Special ad category: None
  
Campaign Settings:
  → CBO: OFF (necháme budget na ad set level)
  → Advantage campaign budget: OFF
  
Click "Next"
```

---

### **KROK #2: Ad Set Level**

```
Ad Set Name: Free Call - Cold CZ

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONVERSION SETTINGS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Performance Goal: Maximize number of conversions

Conversion Event: 
  → Pixel: [tvůj pixel]
  → Event: Lead
  
Attribution Window:
  → 7-day click, 1-day view

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUDGET:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Daily Budget: 100 Kč
  → Start low, zvýšíš když funguje
  
Schedule: Ongoing (nebo nastavit start date)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUDIENCE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location: 
  → Czech Republic (všechny kraje)
  
Age: 
  → 25-55 (podnikatelé jsou různého věku)
  
Gender: 
  → All
  
Detailed Targeting:
  → OPTION A (BROAD): Nech prázdné - Facebook najde lidi
  → OPTION B (TARGETED): 
      - Entrepreneurship
      - Small Business
      - Business Owner
      - Self-employed

MŮJ TIP: Start s BROAD (lepší pro learning phase)

Exclude:
  → [Optional] "Booked Free Consultation" (custom audience)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PLACEMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Placement: Advantage+ placements (automatic)
  → Facebook Feed
  → Instagram Feed
  → Facebook Stories
  → Instagram Stories
  → (FB vybere nejlepší)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Click "Next"
```

---

### **KROK #3: Ad Creative**

**VYTVOŘ 3 RŮZNÉ ADS** (Facebook je bude A/B testovat)

---

#### **🎄 AD #1: VÁNOČNÍ - Emotivní (DOPORUČENÝ START)**

```
────────────────────────────────
AD NAME: Konzultace - Vanoce 2025
────────────────────────────────

PRIMARY TEXT:

🎄 2024 končí za pár dní.

Vstup do 2025 s jasným plánem.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

20min konzultace ZDARMA.

Probereme:
✅ Kde jsi s podnikáním
✅ Co tě brzdí nejvíc
✅ První konkrétní kroky

Žádný tlak. Jen pomoc.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Volných míst: 5 tento týden

────────────────────────────────

HEADLINE:
20min Free konzultace - Zabook si teď

DESCRIPTION:
Promluvme si o tvém podnikání. Zdarma.

CALL TO ACTION:
→ Learn More

DESTINATION:
→ https://podnikatelskactvrtka.cz/konzultace

────────────────────────────────
CREATIVE (IMAGE):
────────────────────────────────

OPTION A: Tvoje profesionální fotka + text overlay
  → Text: "20 MIN FREE CALL"
  → Subtitle: "Promluvme si o tvém podnikání"
  → Background: Blur nebo gradient

OPTION B: Jednoduchý grafický design
  → Modrý gradient background
  → Icon: 💬 nebo 📞
  → Text: "FREE 20 MINUTE CALL"
  → Subtitle: "Žádná karta • Žádný závazek"

MŮJ TIP: Start s OPTION A (personal touch = víc důvěry)
```

---

#### **🔥 AD #2: PROBLEM-FOCUSED**

```
────────────────────────────────
AD NAME: Konzultace - Problem
────────────────────────────────

PRIMARY TEXT:

NEVÍŠ:
❌ Komu prodávat?
❌ Jak získat zákazníky?
❌ Jak z toho mít víc peněz?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CHCI TI POMOCT.

20min call ZDARMA.

Dostaneš:
✅ Jasno kam jít dál
✅ První konkrétní kroky
✅ Odpovědi na tvoje otázky

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Není to prodej. Je to start.

────────────────────────────────

HEADLINE:
Nevíš jak na podnikání? Promluvme si.

DESCRIPTION:
20 minut • Zdarma • Bez závazků

CALL TO ACTION:
→ Learn More

DESTINATION:
→ https://podnikatelskactvrtka.cz/konzultace

────────────────────────────────
CREATIVE:
────────────────────────────────

Stressed podnikatel stock photo
  → Hledej na Unsplash: "stressed entrepreneur"
  → Text overlay: "NEVÍŠ KAM DÁL?"
```

---

#### **💪 AD #3: ANTI-BULLSHIT**

```
────────────────────────────────
AD NAME: Konzultace - Anti Guru
────────────────────────────────

PRIMARY TEXT:

VÍŠ CO MĚ ŠTVE? 😤

Kolik „expertů" prodává podnikatelům
kecy za tisíce korun.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JÁ DĚLÁM JINAK.

20min konzultace ZDARMA.

Konkrétní kroky. Žádná teorie.
Pomoc bez keců.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pokud ti to nepomůže?
Ztratil/a jsi 20 minut.

Pokud ti to pomůže?
Můžeš změnit celé podnikání.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEJSEM DALŠÍ ŠMEJD.

────────────────────────────────

HEADLINE:
Pomoc podnikatelům - bez bullshitu

DESCRIPTION:
20min free call • Praktické rady

CALL TO ACTION:
→ Learn More

DESTINATION:
→ https://podnikatelskactvrtka.cz/konzultace

────────────────────────────────
CREATIVE:
────────────────────────────────

Dark/moody professional photo
  → Text overlay: "BEZ BULLSHITU"
  → Serious but authentic look
```

---

### **KROK #4: Publikuj kampaň**

1. **Review všech 3 ads**
2. **Zkontroluj targeting, budget, pixel**
3. **Klikni "Publish"**

**OČEKÁVANÉ:**
- Ads jdou do review (0-24 hodin)
- Pak se spustí automaticky

---

## 📊 SLEDOVÁNÍ VÝSLEDKŮ

### **DEN 1-3: INITIAL CHECK**

**CO SLEDOVAT:**
```
✅ Impressions: Zobrazuje se? (cíl: 1000+ první den)
✅ CPM: Cena za 1000 zobrazení (cíl: 50-150 Kč)
✅ CTR: % kliků (cíl: 1%+)
✅ CPC: Cena za klik (cíl: <20 Kč)
✅ Landing page views: Kolik lidí otevřelo /konzultace?
```

**POKUD:**
- Nízké impressions (<500) → Zvýš budget nebo rozšiř audience
- Nízký CTR (<0.5%) → Změň ad copy nebo creative
- Vysoký CPC (>30 Kč) → Problem s relevancí → změň targeting

---

### **DEN 4-7: LEARNING PHASE**

**CO SLEDOVAT:**
```
✅ Leads (bookings): Kolik konzultací? (cíl: 1-2 první týden)
✅ Cost per Lead: Cena za booking (cíl: <500 Kč)
✅ Landing page conversion rate: % návštěvníků co si zabookovali (cíl: 3-5%)
```

**POKUD:**
- Žádné leads → Problem s landing page nebo kalendář není vidět
- Vysoký cost per lead (>800 Kč) → Zkus jiný ad copy nebo audience

**DŮLEŽITÉ:** NEMĚŇ NIC PRVNÍ TÝDEN!  
Facebook potřebuje 7 dní na learning phase.

---

### **DEN 8-14: OPTIMIZATION**

**CO DĚLAT:**
```
✅ Najdi best performing ad (nejvíc leads)
✅ Vypni underperforming ads (žádné leads po 7 dnech)
✅ Duplikuj winning ad do nového ad setu
✅ Testuj nové creative (jiná fotka, jiný text)
```

**ŠKÁLOVÁNÍ:**
- Pokud funguje dobře (2+ leads/týden, CPL <400 Kč):
  - Zvýš budget o 20% každé 3 dny
  - Den 1-7: 100 Kč/den
  - Den 8-14: 120 Kč/den
  - Den 15+: 150 Kč/den

---

## 🎯 SUCCESS METRICS

### **GOOD PERFORMANCE:**
```
✅ CTR: 1-2%
✅ CPC: 10-20 Kč
✅ Cost per Lead: 300-500 Kč
✅ Bookings: 2-3/týden
✅ Close rate (% co koupí po callu): 20-30%
```

### **GREAT PERFORMANCE:**
```
✅ CTR: 2-4%
✅ CPC: 5-15 Kč
✅ Cost per Lead: 150-300 Kč
✅ Bookings: 4-6/týden
✅ Close rate: 30-50%
```

---

## ✅ CHECKLIST PŘED SPUŠTĚNÍM

- [ ] `/konzultace` page funguje
- [ ] TidyCal kalendář je vidět
- [ ] Meta Pixel trackuje Lead event (otestováno)
- [ ] Campaign created (Sales objective)
- [ ] Ad set created (Lead conversion event)
- [ ] 3 ads ready (copy + creatives)
- [ ] Budget: 100 Kč/den
- [ ] Audience: 25-55, CZ
- [ ] **PUBLISHED!** 🚀

---

## 🚨 TROUBLESHOOTING

### **PROBLÉM: "No delivery" (ads se nezobrazují)**
**FIX:**
- Zkontroluj že kampat je ACTIVE (ne paused)
- Zkontroluj že payment method je valid
- Zkontroluj že ads prošly review

### **PROBLÉM: Vysoký CPC (>30 Kč)**
**FIX:**
- Příliš úzké audience → rozšiř na broad
- Ad creative není relevantní → změň fotku/copy
- Landing page má nízkou relevance score → zlepši /konzultace page

### **PROBLÉM: Hodně kliků, málo bookings**
**FIX:**
- TidyCal kalendář není vidět (scroll too far?)
- TidyCal má příliš omezené hodiny (lidé nemůžou najít čas)
- Landing page není jasná (co se stane?)

### **PROBLÉM: Bookings, ale lidi nedorazí (no-shows)**
**FIX:**
- TidyCal reminders: Zapni SMS + email reminders (24h + 1h před)
- Kvalifikační otázky: Přidej do booking formu (proč chceš call?)
- Follow-up email: Pošli potvrzovací email "Těším se!"

---

## 🎉 GO LIVE!

**Vše ready?** → **PUBLISH CAMPAIGN!** 🚀

**NEXT STEPS:**
1. Den 1: Zkontroluj že ads běží
2. Den 3: Zkontroluj první metriky
3. Den 7: Evaluate performance
4. Den 8+: Optimize & scale

**GOOD LUCK!** 💪

