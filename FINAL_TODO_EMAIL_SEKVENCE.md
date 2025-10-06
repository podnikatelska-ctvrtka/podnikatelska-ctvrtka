# ✅ TODO: EMAIL SEKVENCE SETUP

## 🎯 CO MÁŠ PŘIPRAVENO

```
✅ Landing page:       podnikatelskactvrtka.cz
✅ Email capture:      Funguje
✅ Make.com webhook:   Aktivní (posílá notifikace na Seznam)
✅ Mini kurz:          3 dny obsahu hotového
✅ Success screen:     Krásný design
✅ Email texty:        7 emailů napsaných
```

---

## 📋 CO MUSÍŠ TEĎKA UDĚLAT

### **1️⃣ KONTAKTUJ FLOWLANCE (5 minut)**

**Email Flowlance supportu:**

```
Předmět: Otázka - API/webhook pro automatické přidání do optin listu

Ahoj,

Sbírám emaily na landing page podnikatelskactvrtka.cz přes Make.com webhook.
Rád bych automaticky přidával tyto emaily do mého Flowlance optin produktu.

Otázky:
1. Máte API endpoint kam můžu posílat registrace z Make.com?
2. Podporujete webhook integraci?
3. Případně máte Zapier integraci?

Pokud žádná varianta není možná, jak doporučujete řešit automatické přidání?

Děkuji!
[Tvoje jméno]
```

**Kam poslat:**
- Flowlance support email
- Nebo jejich live chat

**Čekej na odpověď:** 24-48 hodin

---

### **2️⃣ MEZITÍM: PŘIPRAV FLOWLANCE (30 minut)**

**A) Vytvoř produkt:**
1. Jdi do Flowlance
2. Vytvoř nový produkt
3. Název: "Podnikatelská Čtvrtka - Průkopníci"
4. Typ: **Free optin** (žádná platba)

**B) Přidej 7 emailů:**

📄 **Otevři tento soubor:** `/EMAIL_SEKVENCE_FLOWLANCE.md`

Tam najdeš všech 7 emailů (copy-paste ready).

**V každém emailu změň:**
- `[Tvoje jméno]` → tvoje skutečné jméno
- `[DATUM]` → datum launch (např. 15. února 2025)
- `[X]/50` → aktuální číslo zbývajících konzultací

**C) Nastav časování:**

```
Email 1:  0 dní   (okamžitě po registraci)
Email 2: +2 dny
Email 3: +4 dny
Email 4: +11 dní  (týden před launch)
Email 5: +18 dní  (launch day!)
Email 6: +20 dní  (24h před koncem sale)
Email 7: +23 dní  (recovery)
```

**D) Zkontroluj odkazy:**

Každý email má odkazy na:
```
Mini kurz Den 1: https://podnikatelskactvrtka.cz/priprava?token=minicourse2025
Mini kurz Den 2: https://podnikatelskactvrtka.cz/priprava?token=minicourse2025&day=2
Mini kurz Den 3: https://podnikatelskactvrtka.cz/priprava?token=minicourse2025&day=3
Order page: https://podnikatelskactvrtka.cz/order
```

*(Order page ještě neexistuje - vytvoříš před launch!)*

---

### **3️⃣ KDYŽ FLOWLANCE ODPOVÍ**

#### **SCÉNÁŘ A: Mají API/webhook (nejlepší!)**

📄 **Otevři:** `/MAKE_FLOWLANCE_PROPOJENI.md`

Následuj sekci **"Scénář A: Flowlance má API/webhook"**

**V kostce:**
1. V Make.com přidej HTTP modul
2. Nastav endpoint podle Flowlance instrukcí
3. Test
4. Aktivuj
5. ✅ HOTOVO!

---

#### **SCÉNÁŘ B: Nemají API (záložní plán)**

**Použij redirect tlačítko:**

1. **Otevři soubor:** `/components/PrelaunchEmailCapture.tsx`

2. **Najdi řádky 17-21:**
   ```typescript
   const FLOWLANCE_REDIRECT_CONFIG = {
     enabled: false,
     showButton: false,
   };
   
   const FLOWLANCE_OPTIN_URL = 'https://my.flowlance.com/tvuj-produkt-url';
   ```

3. **Změň na:**
   ```typescript
   const FLOWLANCE_REDIRECT_CONFIG = {
     enabled: true,    // ← Změň na true!
     showButton: true, // ← Změň na true!
   };
   
   const FLOWLANCE_OPTIN_URL = 'https://tvoje-skutecna-flowlance-url.com';
   ```

4. **Build a deploy:**
   ```bash
   npm run build
   git add .
   git commit -m "Aktivace Flowlance redirect"
   git push
   ```

5. **Co se stane:**
   - User se registruje na landing page
   - Vidí success screen (tvůj design!)
   - Vidí tlačítko "🎁 CHCI MINI KURZ ZDARMA"
   - Klikne → redirect do Flowlance
   - Flowlance má email předvyplněný
   - User potvrdí (1 klik)
   - Dostane Email #1 z Flowlance

**VÝHODA:** Funguje vždy, žádné API potřeba  
**NEVÝHODA:** ~30% lidí neklikne na tlačítko (drop-off)

---

### **4️⃣ TEST CELÉHO FLOW (10 minut)**

**A) Zaregistruj testovací email:**
1. Jdi na: `podnikatelskactvrtka.cz`
2. Zadej: `tvuj-test@email.cz`
3. Klikni "CHCI BÝT PRŮKOPNÍK"

**B) Zkontroluj:**
- [ ] Zobrazil se success screen?
- [ ] Přišel ti Make.com notifikační email?
- [ ] Email se přidal do Flowlance?
- [ ] Dostal jsi Email #1 z Flowlance?
- [ ] Odkaz na mini kurz funguje?
- [ ] Mini kurz se načetl správně?

**C) Pokud vše OK:**
```
🎉 JE TO READY!
🚀 MŮŽEŠ SPUSTIT!
```

---

## 📅 LAUNCH TIMELINE

**Pokud spustíš DNES:**

```
DEN 0 (dnes):
   ✅ Začni sbírat emaily
   ✅ První průkopníci dostávají Email #1
   
DEN 2:
   📧 Email #2 automaticky posílá
   
DEN 4:
   📧 Email #3 automaticky posílá
   
DEN 11:
   📧 Email #4 (reminder -7 dní)
   
DEN 18: 🚀 LAUNCH DAY
   📧 Email #5 (prodej otevřen!)
   💰 Prodejní okno: 72 hodin
   
DEN 20:
   📧 Email #6 (last chance!)
   
DEN 21:
   🔒 Prodej uzavřen
   💰 Cena skočí na 6.999 Kč
   
DEN 23:
   📧 Email #7 (recovery)
```

**Celkem:** 23 dní od první registrace

---

## 💰 CO POTŘEBUJEŠ PŘED LAUNCH (DEN 18)

**1. ORDER PAGE:**
- [ ] Vytvořit objednávkovou stránku
- [ ] Payment gateway (Stripe/PayPal)
- [ ] Cena: 4.999 Kč (sleva z 8.499 Kč)
- [ ] Thank you page

**2. KURZ:**
- [ ] Video lekce nahrané
- [ ] Worksheety ke stažení
- [ ] Přístup na platformě (LMS)

**3. KONZULTACE:**
- [ ] Calendly booking link
- [ ] Limit 50 slots
- [ ] Auto-send po nákupu

*Poznámka: Máš 18 dní na přípravu! Dost času! 💪*

---

## 📊 EXPECTED VÝSLEDKY

**Při 100 registrací:**

```
100 průkopníků registruje
    ↓
70 otevře Email #1 (70%)
    ↓
40 klikne na Den 1 (40%)
    ↓
25 dokončí mini kurz (25%)
    ↓
15 otevře launch email (15%)
    ↓
5-10 koupí kurz (5-10%)
```

**Revenue:**
- Pesimisticky: 5 × 4.999 = **24.995 Kč**
- Optimisticky: 10 × 4.999 = **49.990 Kč**

---

## 📂 DOKUMENTY CO MÁŠ K DISPOZICI

```
1️⃣ /EMAIL_SEKVENCE_FLOWLANCE.md
   → 7 emailů (texty hotové)
   → Časování
   → Odkazy
   
2️⃣ /MAKE_FLOWLANCE_PROPOJENI.md
   → Jak propojit Make.com s Flowlance
   → 3 scénáře (API/Zapier/redirect)
   → Troubleshooting
   
3️⃣ /EMAIL_SEKVENCE_QUICK_START.md
   → Rychlý návod
   → Checklist
   → Tracking tips
   
4️⃣ /EMAIL_FLOWCHART.md
   → Vizuální flow
   → Konverzní funnel
   → Psychologie sekvence
```

---

## ✅ CHECKLIST - CO UDĚLAT TEĎ

**DNES (1 hodina):**
- [ ] Pošli email Flowlance supportu (5 min)
- [ ] Zkopíruj 7 emailů do Flowlance (20 min)
- [ ] Nastav časování automatizace (5 min)
- [ ] Zkontroluj odkazy v emailech (5 min)
- [ ] Aktivuj automatizaci ve Flowlance (1 min)

**ZÍTRA (až odpoví Flowlance):**
- [ ] Propoj Make.com → Flowlance (API nebo redirect) (15 min)
- [ ] Otestuj celý flow (10 min)
- [ ] Pokud OK → SPUSTIT! 🚀

**PŘÍŠTÍ 2-3 TÝDNY:**
- [ ] Sleduj registrace (daily)
- [ ] Sleduj metriky (open rate, click rate)
- [ ] Připrav order page
- [ ] Připrav kurz obsah
- [ ] Nastav konzultace

**DEN 18 (LAUNCH!):**
- [ ] Email #5 automaticky posílá
- [ ] Sleduj prodeje
- [ ] Odpovídej na otázky
- [ ] Oslavuj! 🎉

---

## 🆘 HELP

**Mám problém s:**

📧 **Flowlance setup**
   → Otevři: `/MAKE_FLOWLANCE_PROPOJENI.md`

📝 **Texty emailů**
   → Otevři: `/EMAIL_SEKVENCE_FLOWLANCE.md`

🔧 **Make.com propojení**
   → Kontaktuj Flowlance support

🎯 **Order page (před launch)**
   → Řekni mi až budeš chtít vytvořit!

---

## 🎯 TLDR - NEJDŮLEŽITĚJŠÍ KROKY

```
1. Pošli email Flowlance supportu (otázka na API)
2. Zkopíruj 7 emailů do Flowlance automatizace
3. Nastav časování (0, +2, +4, +11, +18, +20, +23 dní)
4. Propoj Make.com → Flowlance (API nebo redirect)
5. Test flow
6. SPUSTIT! 🚀
```

**Čas:** ~1-2 hodiny pr��ce  
**Expected ROI:** 25-50k Kč za 100 registrací  
**Effort/reward:** Vysoký! 💪

---

## 🎉 READY?

**Máš všechno co potřebuješ!**

✅ Texty emailů  
✅ Technické návody  
✅ Timeline  
✅ Expected výsledky  

**TEĎKA JEN:**
1. Setup (1h)
2. Test (10 min)
3. Launch (0 min - automatické!)

---

**HODNĚ ŠTĚSTÍ! 🚀🔥**

*P.S. Až budeš mít první registraci, pošli screenshot! 🎊*