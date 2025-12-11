# ✅ TODO DNES - KVÍZ + CONVERSION REKLAMA

## 📅 Datum: 11. prosince 2025

---

## 🎯 CÍL DNES

1. ✅ **Otestovat kompletní kvíz flow** (od začátku do konce)
2. ✅ **Pustit conversion reklamu** (Free konzultace)

---

## 📋 PART 1: KVÍZ - KOMPLETNÍ TEST

### **✅ KROK #1: Kontrola Supabase databáze**

```bash
# Jdi do Supabase Dashboard → SQL Editor
# Spusť tento dotaz:

SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'quiz_results';
```

**POKUD NEEXISTUJE:**
- [ ] Zkopíruj `/QUIZ_DATABASE_SCHEMA.sql`
- [ ] Spusť v SQL Editor
- [ ] Zkontroluj že tabulka byla vytvořena

---

### **✅ KROK #2: Kontrola Netlify environment variables**

Jdi do **Netlify Dashboard** → **Environment variables**

**ZKONTROLUJ ŽE MÁŠ:**
- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `SMARTEMAILING_USERNAME`
- [ ] `SMARTEMAILING_API_KEY`
- [ ] `SMARTEMAILING_LIST_KVIZ` (ID listu)
- [ ] `RESEND_API_KEY`

**POKUD NĚCO CHYBÍ:**
- Přidej missing variables
- Redeploy site (Netlify → Deploys → Trigger deploy)

---

### **✅ KROK #3: SmartEmailing - Vytvoř kontaktní list**

- [ ] Jdi do SmartEmailing → Kontakty → Kontaktní listy
- [ ] Vytvoř nový list: **"Kvíz - Jak zdravý je tvůj model podnikání?"**
- [ ] Zkopíruj **ID listu** (např. `12345`)
- [ ] Přidej ID do Netlify env var: `SMARTEMAILING_LIST_KVIZ=12345`
- [ ] Redeploy Netlify site

**CUSTOM FIELDS (pokud neexistují):**
- [ ] `source` (text)
- [ ] `quiz_type` (text)
- [ ] `quiz_category` (text)
- [ ] `quiz_score` (text)

---

### **✅ KROK #4: Test kvízu - Kompletní flow**

**JAK:**
1. **Otevři:** `https://podnikatelskactvrtka.cz/kviz`
2. **Klikni:** "Chci svůj akční plán zdarma"
3. **Klikni:** "Začít kvíz zdarma"
4. **Vyber:** "Už podnikám"
5. **Vyplň všech 10 otázek** (klikaním na odpovědi)
6. **Zadej email:** `test+solid@gmail.com` (force SOLID category)
7. **Zadej jméno:** `Test User`
8. **Klikni:** "Zobrazit moje výsledky"

**OČEKÁVANÉ:**
- [ ] Zobrazí se completion modal "Výsledky jsou na cestě!"
- [ ] Kvíz modal se zavře
- [ ] V browser console vidíš `✅ Quiz submitted successfully`

---

### **✅ KROK #5: Kontrola Supabase - Data uložená?**

- [ ] Jdi do Supabase → Table Editor → `quiz_results`
- [ ] Najdi svůj test email `test+solid@gmail.com`
- [ ] Zkontroluj že data jsou správná (score, category, answers, risks)

**POKUD DATA CHYBÍ:**
- Zkontroluj Netlify Functions → `quiz-submit` → Logs
- Hledej error messages
- Oprav a zkus znovu

---

### **✅ KROK #6: Kontrola SmartEmailing - Kontakt přidán?**

- [ ] Jdi do SmartEmailing → Kontakty → Vyhledej `test+solid@gmail.com`
- [ ] Zkontroluj že je v listu "Kvíz..."
- [ ] Zkontroluj custom fields (source=quiz, quiz_type=existing, quiz_category=solid)

**POKUD KONTAKT CHYBÍ:**
- Zkontroluj SMARTEMAILING credentials
- Zkontroluj že list ID je správné
- Zkontroluj Netlify Function logs

---

### **✅ KROK #7: Kontrola emailu - Dorazil?**

- [ ] Zkontroluj svou gmail schránku (nebo spam)
- [ ] Najdi email od "Podnikatelská Čtvrtka"
- [ ] Subject: `Tvoje výsledky: Solidní základ (65%)`
- [ ] Otevři email

**OČEKÁVANÉ:**
- [ ] Vidíš skóre 65%
- [ ] Vidíš "Solidní základ ✅"
- [ ] Vidíš rizika a doporučení
- [ ] Vidíš CTA tlačítko "📥 Zobrazit můj akční plán"

**POKUD EMAIL NEDORAZIL:**
- Zkontroluj Resend Dashboard → Emails
- Hledej svůj test email
- Zkontroluj status (delivered/bounced/spam)

---

### **✅ KROK #8: Test akčního plánu PDF**

- [ ] V emailu klikni na "📥 Zobrazit můj akční plán"
- [ ] Otevře se stránka `/action-plans?category=solid&score=65&name=Test+User`
- [ ] Vidíš personalizovaný akční plán
- [ ] Má správné skóre (65%) a kategorii (Solidní)
- [ ] Má tvoje jméno ("Test User")
- [ ] Klikni "🖨️ Vytisknout PDF" → otevře se print dialog

**POKUD NEFUNGUJE:**
- Zkontroluj browser console pro chyby
- Zkontroluj že ActionPlanPreview.tsx načítá URL params

---

### **✅ KROK #9: Meta Pixel tracking**

- [ ] Otevři Meta Events Manager → Test Events
- [ ] Najdi svůj test event
- [ ] Zkontroluj že vidíš `CompleteRegistration` event
- [ ] `content_name` = "Business Health Quiz"
- [ ] `status` = "solid"

**POKUD NEVIDÍŠ EVENT:**
- Zkontroluj že Meta Pixel je inicializovaný
- Zkontroluj browser console → `fbq` existuje?
- Zkontroluj QuizLandingPage.tsx → trackuje event po submission?

---

### **✅ KROK #10: Test všech kategorií**

**Otestuj všechny force emaily:**
- [ ] `test+critical@gmail.com` → Kritický stav (20%)
- [ ] `test+unstable@gmail.com` → Nestabilní (45%)
- [ ] `test+solid@gmail.com` → Solidní (65%)
- [ ] `test+advanced@gmail.com` → Pokročilý (85%)
- [ ] `test+beginner@gmail.com` → Začínám (75%)

**PRO KAŽDÝ:**
- Zkontroluj že email dorazil
- Zkontroluj že má správné skóre a kategorii
- Zkontroluj že akční plán link funguje

---

## 🎯 CHECKLIST - KVÍZ READY?

- [ ] Tabulka `quiz_results` existuje v Supabase
- [ ] Všechny Netlify env variables jsou nastavené
- [ ] SmartEmailing list je vytvořený
- [ ] Test email dorazil s correct data
- [ ] Action Plan PDF funguje
- [ ] Meta Pixel trackuje `CompleteRegistration`
- [ ] Všechny kategorie testované (5 variant)

**POKUD ANO NA VŠECHNY** → ✅ **KVÍZ JE READY!**

---

## 🚀 PART 2: CONVERSION REKLAMA - SPUŠTĚNÍ

### **✅ KROK #1: Kontrola /konzultace page**

- [ ] Otevři: `https://podnikatelskactvrtka.cz/konzultace`
- [ ] Vidíš hero text "Nevíš co dělat jako první?"
- [ ] Vidíš 3 benefit karty (20 min, Zdarma, Bez závazků)
- [ ] Vidíš TidyCal kalendář widget (vpravo na desktop, dole na mobile)

**POKUD NEFUNGUJE:**
- Zkontroluj že KonzultacePage.tsx je v App.tsx
- Zkontroluj routing (řádek ~1208 v App.tsx)

---

### **✅ KROK #2: TidyCal - Meta Pixel tracking**

**OPTION A: Custom Code (preferované)**

- [ ] Login do TidyCal
- [ ] Settings → Integrations → Custom Code
- [ ] Přidej tento kód:

```html
<script>
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Lead', {
      content_name: 'Free Consultation Booking',
      value: 0,
      currency: 'CZK'
    });
    console.log('✅ TidyCal: Lead tracked');
  }
</script>
```

- [ ] Ulož

**OPTION B: Webhook (pokud custom code není dostupný)**

- [ ] TidyCal → Settings → Webhooks → Add webhook
- [ ] URL: `https://podnikatelskactvrtka.cz/.netlify/functions/tidycal-webhook`
- [ ] Event: `booking.created`
- [ ] Ulož

**POTOM přidej env variables do Netlify:**
```
META_PIXEL_ID = [tvůj pixel ID]
META_CONVERSIONS_API_TOKEN = [tvůj access token]
```

---

### **✅ KROK #3: Test TidyCal booking**

- [ ] Jdi na `/konzultace`
- [ ] Zabooku si test konzultaci (použij test email)
- [ ] **HNED PO POTVRZENÍ:**
  - Otevři Meta Events Manager → Test Events
  - **MUSÍŠ VIDĚT:** `Lead` event
  - `content_name` = "Free Consultation Booking"

**POKUD NEVIDÍŠ:**
- Zkontroluj TidyCal custom code/webhook
- Zkontroluj browser console → `Lead tracked`?
- Zkontroluj že Meta Pixel je na /konzultace

---

### **✅ KROK #4: Vytvoř kampat v Meta Ads Manager**

**Otevři Meta Ads Manager:**
- [ ] Create Campaign
- [ ] **Name:** `Conversion - Free Konzultace 2025`
- [ ] **Objective:** SALES
- [ ] **Special ad category:** None
- [ ] **CBO:** OFF
- [ ] Click "Next"

---

### **✅ KROK #5: Ad Set nastavení**

**Ad Set Name:** `Free Call - Cold CZ`

**CONVERSION:**
- [ ] Performance Goal: Maximize conversions
- [ ] Conversion Event: Pixel → Lead
- [ ] Attribution: 7-day click, 1-day view

**BUDGET:**
- [ ] Daily Budget: **100 Kč**
- [ ] Schedule: Ongoing

**AUDIENCE:**
- [ ] Location: Czech Republic (all)
- [ ] Age: 25-55
- [ ] Gender: All
- [ ] Detailed Targeting: **BROAD** (nech prázdné) → doporučené!

**PLACEMENTS:**
- [ ] Advantage+ placements (automatic)

- [ ] Click "Next"

---

### **✅ KROK #6: Vytvoř 3 ads**

**AD #1: Vánoční emotivní** (DOPORUČENÝ START!)

```
Primary Text: 
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

Headline: 20min Free konzultace - Zabook si teď
Description: Promluvme si o tvém podnikání. Zdarma.
CTA: Learn More
URL: https://podnikatelskactvrtka.cz/konzultace
```

**Creative:**
- [ ] Tvoje profesionální fotka + text overlay "20 MIN FREE CALL"
- [ ] Nebo: Modrý gradient + icon 💬 + text

**AD #2: Problem-focused**

```
Primary Text:
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

Headline: Nevíš jak na podnikání? Promluvme si.
Description: 20 minut • Zdarma • Bez závazků
CTA: Learn More
URL: https://podnikatelskactvrtka.cz/konzultace
```

**Creative:**
- [ ] Stressed entrepreneur stock photo + text "NEVÍŠ KAM DÁL?"

**AD #3: Anti-bullshit**

```
Primary Text:
VÍŠ CO MĚ ŠTVE? 😤
Kolik „expertů" prodává podnikatelům kecy za tisíce korun.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
JÁ DĚLÁM JINAK.
20min konzultace ZDARMA.
Konkrétní kroky. Žádná teorie. Pomoc bez keců.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pokud ti to nepomůže? Ztratil/a jsi 20 minut.
Pokud ti to pomůže? Můžeš změnit celé podnikání.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEJSEM DALŠÍ ŠMEJD.

Headline: Pomoc podnikatelům - bez bullshitu
Description: 20min free call • Praktické rady
CTA: Learn More
URL: https://podnikatelskactvrtka.cz/konzultace
```

**Creative:**
- [ ] Dark/serious professional photo + text "BEZ BULLSHITU"

---

### **✅ KROK #7: Review & Publish**

- [ ] Zkontroluj všechny 3 ads (copy, creative, URL)
- [ ] Zkontroluj targeting (25-55, CZ, broad)
- [ ] Zkontroluj budget (100 Kč/den)
- [ ] Zkontroluj pixel event (Lead)
- [ ] **KLIKNI "PUBLISH"** 🚀

---

### **✅ KROK #8: Monitoring - První 24 hodin**

**PO SPUŠTĚNÍ:**
- [ ] Zkontroluj že ads prošly review (0-24h)
- [ ] Zkontroluj že ads běží (status = ACTIVE)
- [ ] Zkontroluj impressions (cíl: 1000+ první den)
- [ ] Zkontroluj CTR (cíl: 1%+)
- [ ] Zkontroluj CPC (cíl: <20 Kč)

**POKUD PROBLÉM:**
- "No delivery" → zkontroluj payment method
- Nízké impressions → zvýš budget na 150 Kč
- Nízký CTR → změň ad copy/creative

---

## 🎯 FINÁLNÍ CHECKLIST - READY TO GO?

### **KVÍZ:**
- [ ] ✅ Databáze tabulka vytvořena
- [ ] ✅ Netlify env variables nastavené
- [ ] ✅ SmartEmailing list vytvořený
- [ ] ✅ Test kvíz funguje (all 5 categories)
- [ ] ✅ Email dorazí s action plan linkem
- [ ] ✅ Meta Pixel trackuje CompleteRegistration

### **CONVERSION REKLAMA:**
- [ ] ✅ `/konzultace` page funguje
- [ ] ✅ TidyCal má Meta Pixel tracking
- [ ] ✅ Test booking trackuje Lead event
- [ ] ✅ Kampaň vytvořena (Sales objective)
- [ ] ✅ 3 ads ready (copy + creatives)
- [ ] ✅ Budget: 100 Kč/den
- [ ] ✅ **PUBLISHED!** 🚀

---

## 🎉 HOTOVO!

**Pokud máš všechny checkboxy zaškrtnuté** → **PERFEKTNÍ PRÁCE!** 💪

**NEXT STEPS:**
1. **Den 1:** Monitoruj ads (běží? zobrazují se?)
2. **Den 3:** První metriky check (impressions, CTR, CPC)
3. **Den 7:** Performance review (leads? cost per lead?)
4. **Den 8+:** Optimalizace (vypnout underperformers, duplikovat winnery)

---

## 📚 DALŠÍ MATERIÁLY

- `/QUIZ_TESTING_GUIDE.md` - Detailní testovací průvodce pro kvíz
- `/CONVERSION_AD_QUICK_START.md` - Kompletní návod na conversion reklamu
- `/CONVERSION_AD_SETUP.md` - Původní detailní setup guide

---

**GOOD LUCK!** 🍀

