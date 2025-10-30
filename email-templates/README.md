# 📧 EMAIL TEMPLATES - PŘEHLED

**Datum:** 2025-10-29  
**Strategie:** Aggressive Flip (24h sleva)

---

## 📋 VŠECHNY EMAILY

### **EMAIL #1: Sleva 40% (okamžitě po opt-in)**
- **Soubor:** `smartemailing-email-1-sleva-40.html`
- **Předmět:** `🚀 Tvoje sleva 40% na Podnikatelskou Čtvrtku!`
- **Časování:** Okamžitě (0 minut)
- **Barva:** Modrý gradient
- **CTA:** "Ano, chci kurz se slevou"

### **EMAIL #2: Reminder (20h po opt-in)**
- **Soubor:** `smartemailing-email-2-reminder-4h.html`
- **Předmět:** `⏰ Zbývá 4 hodiny! Sleva 40% vyprší`
- **Časování:** +20 hodin (zbývá 4h do konce slevy)
- **Barva:** Červený gradient
- **CTA:** "Ano, chci slevu 40%"

### **EMAIL #3A: Minikurz zdarma (7 dní po opt-in)**
- **Soubor:** `smartemailing-email-3-minikurz-zdarma.html`
- **Předmět:** `🎁 Dárek - i když jsi nekoupil/a`
- **Časování:** +7 dní (POUZE pokud NEKOUPIL)
- **Barva:** Oranžový gradient
- **CTA:** "Chci mini kurz zdarma"
- **Typ:** Lead magnet

### **EMAIL #3B: Dotaz + pomoc (7 dní po opt-in)**
- **Soubor:** `smartemailing-email-3-pomoc-dotaz.html`
- **Předmět:** `❓ S čím teď nejvíc bojuješ?`
- **Časování:** +7 dní (POUZE pokud NEKOUPIL)
- **Barva:** Fialový gradient
- **CTA:** "Odpověz na email"
- **Typ:** Conversational - zaměřeno na obecné problémy v byznysu

### **FAPI Potvrzení platby**
- **Soubor:** `fapi-payment-confirmed.html`
- **Použití:** FAPI webhook po úspěšné platbě
- **Obsahuje:** Přístup do kurzu + instrukce

---

## 🎯 KTERÁ VARIANTA EMAILU #3?

| Kritérium | **VARIANTA A** (Minikurz) | **VARIANTA B** (Dotaz) |
|-----------|---------------------------|------------------------|
| **Automatizace** | ✅ Plně automatické | ⚠️ Vyžaduje odpovědi |
| **Engagement** | 15-25% click rate | 10-20% odpovědí |
| **Hodnota** | Minikurz zdarma | Osobní pomoc |
| **Retargeting** | ✅ Vysoký potenciál | ❌ Nižší potenciál |
| **Čas na údržbu** | 0 minut/týden | 2-5 hodin/týden |
| **Doporučeno pro** | Škálovatelný byznys | Osobní brand |

**DOPORUČENÍ:**
- ✅ **Pro začátek:** VARIANTA A (minikurz) - automatizace
- ✅ **Pro testování:** VARIANTA B (prvních 50 lidí) → pak VARIANTA A

---

## 📁 DOKUMENTACE

### **Návody:**
- `EMAIL_3_VARIANTA_B_NAVOD.md` - Kompletní návod pro variantu B
- `SMARTEMAILING_FOOTER_FIX.md` - Info o footerech (používáme SE automatický)
- `SMARTEMAILING_PERSONALIZACE.md` - Proč NEPOUŽÍVÁME personalizaci jménem

### **Bloky (pro úpravy):**
- `smartemailing-blocks/` - Jednotlivé HTML bloky (header, CTA, countdown...)

---

## 🎨 DESIGN SYSTÉM

### **Barvy gradientů:**
```css
Email #1 (Sleva 40%):   #3b82f6 → #1e40af  /* Modrá */
Email #2 (Reminder):    #dc2626 → #991b1b  /* Červená */
Email #3A (Minikurz):   #f59e0b → #ea580c  /* Oranžová */
Email #3B (Dotaz):      #667eea → #4f46e5  /* Fialová */
```

### **Struktura:**
```
1. Header (gradient + emoji + nadpis)
2. Tělo (text + speciální boxy)
3. CTA button (velký, výrazný)
4. P.S. sekce (urgence nebo bonus info)
5. Footer (SmartEmailing automatický - NEUPRAVOVAT)
```

---

## ⚙️ JAK NAHRÁT DO SMARTEMAILING

### **Krok za krokem:**

1. **Otevři SmartEmailing:**
   ```
   Kampaně → E-maily → Nový e-mail
   ```

2. **Zkopíruj HTML:**
   - Otevři `.html` soubor
   - Zkopíruj CELÝ obsah (od `<!DOCTYPE html>` do `</html>`)

3. **Vlož do editoru:**
   - SmartEmailing → HTML editor / Zdrojový kód
   - Vlož zkopírovaný kód

4. **Nastav předmět:**
   - Viz tabulka výše (každý email má jiný předmět)

5. **NECH automatickou patičku ZAPNUTOU:**
   - ☑️ **Automaticky přidat patičku** - ZAPNUTO!
   - **DŮLEŽITÉ:** Naše HTML NEMÁ vlastní footer

6. **Ulož a testuj:**
   - Ulož jako draft
   - Pošli test email na sebe
   - Zkontroluj že footer je jen 1x

---

## 🤖 AUTOMATIZACE V SMARTEMAILING

### **Struktura flow:**

```
TRIGGER: Kontakt přidán do listu "Prelaunch Průkopníci"
    ↓
EMAIL #1 (0 minut)
    ↓
ČEKÁNÍ (20 hodin)
    ↓
EMAIL #2 (reminder)
    ↓
ČEKÁNÍ (7 dní)
    ↓
PODMÍNKA: Má tag "purchased"?
    ├─ ANO → KONEC
    └─ NE → EMAIL #3 (A nebo B)
```

### **Klíčové tagy:**
- `purchased` - Přidá se po úspěšné platbě (FAPI webhook)
- `opt_in` - Přidá se po registraci na landing page

---

## ✅ CHECKLIST PŘED SPUŠTĚNÍM

### **Emaily:**
- [ ] Email #1 nahrán do SmartEmailingu
- [ ] Email #2 nahrán do SmartEmailingu
- [ ] Email #3 nahrán (vybrat A nebo B)
- [ ] Všechny emaily mají správný předmět
- [ ] Všechny linky fungují (testovat!)
- [ ] Footer je automatický (NEUPRAVOVAT)

### **Automatizace:**
- [ ] Trigger: "Kontakt přidán do listu"
- [ ] Email #1: 0 minut delay
- [ ] Email #2: 20 hodin delay
- [ ] Email #3: 7 dní delay + podmínka "purchased"
- [ ] Tag "purchased" nastavený v FAPI webhooku

### **FAPI:**
- [ ] Discount kód `EARLY40` vytvořený (40%, 24h)
- [ ] Order page link: `https://podnikatelskactvrtka.cz/objednavka?discount=EARLY40`
- [ ] Webhook nastavený na `https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook`
- [ ] Webhook přidává tag "purchased" do SmartEmailingu

### **Testování:**
- [ ] Pošli sobě všechny 3 emaily (test)
- [ ] Klikni na všechny linky (fungují?)
- [ ] Proveď test nákup (1 Kč)
- [ ] Zkontroluj že tag "purchased" se přidal

---

## 📊 OČEKÁVANÉ VÝSLEDKY

### **Ze 100 opt-inů:**

```
Email #1 (Sleva 40%):
  Open rate: 35-45%
  Click rate: 20-30%
  Prodeje: 2-3

Email #2 (Reminder):
  Open rate: 25-35%
  Click rate: 25-40%
  Prodeje: 1-2

Email #3 (Retargeting):
  Open rate: 25-40%
  Engagement: 10-20%
  Prodeje: 0-1

CELKEM: 4-6 prodejů = 4-6% conversion rate
```

---

## 🚀 READY TO GO!

Všechny emaily jsou připravené!

**Co teď:**
1. ✅ Nahraj do SmartEmailingu
2. ✅ Nastav automatizaci
3. ✅ Otestuj celý flow
4. ✅ Spusť!

**Máš otázky?**  
→ Koukni do `/email-templates/EMAIL_3_VARIANTA_B_NAVOD.md`  
→ Nebo do `/SMARTEMAILING_SETUP_AGGRESSIVE_24H.md`

---

**STATUS:** ✅ Hotovo - Ready to deploy!  
**Vytvořeno:** 2025-10-29
