# 📧 KVÍZ EMAIL FLOW - NÁVOD

## 🎯 OVERVIEW

**POČET EMAILŮ:** 4  
**TRIGGER:** Vyplnění kvízu "Jak zdravý je tvůj model podnikání?"  
**SMARTEMAILING LIST ID:** 4 (všechny kategorie na jednom listu)  
**AUTOMATION:** Stejná pro všechny kategorie

---

## 📋 EMAIL FLOW STRUCTURE

```
EMAIL 1 (OKAMŽITĚ - RESEND)
✅ Výsledky + odkaz na akční plán
    ↓ 24h
EMAIL 2 (SMARTEMAILING)
🎯 Soft sell - "Jak to jde s plánem?"
    ↓ 24h
EMAIL 3 (SMARTEMAILING)
💪 Důkazy + FAQ + Co dostane
    ↓ 24h
EMAIL 4 (SMARTEMAILING)
🤝 FREE konzultace + poslední šance
```

---

## ✅ EMAIL 1 - OKAMŽITÝ (RESEND)

**STATUS:** ✅ UŽ HOTOVÝ  
**TRIGGER:** Okamžitě po vyplnění kvízu  
**OBSAH:**
- Výsledky kvízu (skóre, kategorie)
- Rizika + doporučení
- Odkaz na personalizovaný akční plán (`/action-plans?category=...`)

**KÓD:** `/netlify/functions/quiz-submit.js`

---

## 📧 EMAIL 2 - Za 24h (SMARTEMAILING)

**SOUBOR:** `/email-templates/quiz-email-2-akcni-plan.html`

**PŘEDMĚT:**  
```
Už makáš na akčním plánu? 💪
```

**PREHEADER:**  
```
Vím, že to není jednoduché... ale nejsi v tom sám/sama 👊
```

**KLÍČOVÉ PRVKY:**
- ✅ Empatie (chápu tě, byl jsem tam taky)
- ✅ Story (jak jsem to řešil měsíce, pak objevil Model podnikání)
- ✅ Soft sell (90 minut vs měsíce práce)
- ✅ Fixní cena 4999 Kč (bez slev)
- ✅ 14denní garance

**TONE:** Přátelský, empatický, osobní

---

## 📧 EMAIL 3 - Za 48h (SMARTEMAILING)

**SOUBOR:** `/email-templates/quiz-email-3-dukazy-faq.html`

**PŘEDMĚT:**  
```
Ještě se rozhoduješ? (přečti si tohle)
```

**PREHEADER:**  
```
3 důvody proč Podnikatelská Čtvrtka funguje (a co v ní dostaneš)
```

**KLÍČOVÉ PRVKY:**
- ✅ Co dostane v kurzu (3 moduly + bonusy)
- ✅ Social proof (3 testimonials - Petr, Jana, Martin)
- ✅ FAQ (4 nejčastější otázky)
- ✅ Srovnání 2 možností (sám vs kurz)

**TONE:** Informační, přesvědčivý, konkrétní

---

## 📧 EMAIL 4 - Za 72h (SMARTEMAILING)

**SOUBOR:** `/email-templates/quiz-email-4-free-konzultace.html`

**PŘEDMĚT:**  
```
Mohu ti nějak pomoci? 🤝
```

**PREHEADER:**  
```
Nabízím ti 20min FREE konzultaci - zjistíme co tě brzdí
```

**KLÍČOVÉ PRVKY:**
- ✅ FREE 20min konzultace (Calendly link)
- ✅ Co zjistíme na konzultaci
- ✅ Alternativa: rovnou začít v kurzu
- ✅ 2 CTA tlačítka (konzultace + kurz)
- ✅ P.S. "Tohle je poslední email"

**TONE:** Pomocný, přátelský, poslední pokus

---

## 🛠️ SETUP V SMARTEMAILINGU

### 1. VYTVOŘ LIST

**Název:** "Kvíz - Všichni" (nebo "Quiz Leads")  
**ID:** 4  
**Typ:** Standardní list

### 2. NASTAV ENV VARIABLE V NETLIFY

```
SMARTEMAILING_LIST_KVIZ=4
```

### 3. VYTVOŘ AUTOMATION

**Název:** "Kvíz Follow-up"  
**Trigger:** "Přidán do listu" (ID: 4)

**WORKFLOW:**

```
TRIGGER: Přidán do listu 4
    ↓
WAIT: 24 hodin
    ↓
EMAIL 2: quiz-email-2-akcni-plan.html
    ↓
WAIT: 24 hodin
    ↓
EMAIL 3: quiz-email-3-dukazy-faq.html
    ↓
WAIT: 24 hodin
    ↓
EMAIL 4: quiz-email-4-free-konzultace.html
    ↓
END
```

---

## 📝 NAHRÁNÍ HTML DO SMARTEMAILINGU

### KROK ZA KROKEM:

1. **Otevři Smartemailing**
2. **Kampáně → Nová kampaň → Email**
3. **Editor → HTML kód**
4. **Copy/paste celý HTML soubor**
5. **Ulož a pojmenuj** (např. "Kvíz - Email 2")
6. **Opakuj pro EMAIL 3 a EMAIL 4**

### ⚠️ DŮLEŽITÉ:

- ✅ Nastav **FROM:** Tvoje jméno/email
- ✅ Nastav **PŘEDMĚT** podle návodu výše
- ✅ Nastav **PREHEADER** podle návodu výše
- ✅ Zkontroluj že CTA linky vedou na správnou URL
- ✅ Nahraď `[TVOJE JMÉNO]` svým skutečným jménem
- ✅ Nahraď Calendly link svým skutečným linkem (EMAIL 4)

---

## 🔗 DŮLEŽITÉ LINKY V EMAILECH

### EMAIL 2, 3, 4:

**CTA Button → Kurz:**
```
https://podnikatelskactvrtka.cz/objednavka
```

**EMAIL 4 - FREE Konzultace:**
```
https://calendly.com/tvuj-link  ← NAHRAĎ SVÝM LINKEM!
```

**Unsubscribe (footer):**
```
{unsubscribe}  ← Smartemailing placeholder
```

---

## 🧪 TESTOVÁNÍ

### 1. TEST MODE V KVÍZU

Používej test emaily pro ověření celého flow:

```
test+critical@gmail.com   → Critical plán
test+unstable@gmail.com   → Unstable plán
test+solid@gmail.com      → Solid plán
test+advanced@gmail.com   → Advanced plán
test+beginner@gmail.com   → Beginner plán
```

### 2. CO TESTOVAT

- ✅ EMAIL 1 přijde okamžitě (Resend)
- ✅ User se přidá na Smartemailing list 4
- ✅ EMAIL 2 přijde za 24h (Smartemailing automation)
- ✅ EMAIL 3 přijde za 48h
- ✅ EMAIL 4 přijde za 72h
- ✅ Všechny odkazy fungují
- ✅ Design vypadá správně (desktop + mobile)

### 3. QUICK TEST V SMARTEMAILINGU

**Manuální test:**
1. Přidej testovací email NA LIST 4 (ručně)
2. Zkontroluj že se automation spustila
3. Počkej nebo zkrať wait time pro testing

---

## 📊 CO SLEDOVAT

### METRIKY:

- ✅ **Open Rate** (cíl: 25%+)
- ✅ **Click Rate** (cíl: 5%+)
- ✅ **Conversion Rate** (cíl: 2-5%)
- ✅ **Unsubscribe Rate** (cíl: <1%)

### A/B TESTING MOŽNOSTI:

Pokud výsledky nejsou dobré, zkus:
- 📧 Jiné předměty emailů
- ⏱️ Jiné timing (např. 12h místo 24h)
- 📝 Kratší copy
- 🎨 Jiný design
- 🎯 Jiné CTA texty

---

## ✅ CHECKLIST PŘED SPUŠTĚNÍM

- [ ] List ID 4 vytvořen v Smartemailingu
- [ ] `SMARTEMAILING_LIST_KVIZ=4` přidán do Netlify ENV
- [ ] Automation vytvořena v Smartemailingu
- [ ] EMAIL 2 nahraný a nastavený
- [ ] EMAIL 3 nahraný a nastavený
- [ ] EMAIL 4 nahraný a nastavený
- [ ] `[TVOJE JMÉNO]` nahrazeno skutečným jménem
- [ ] Calendly link nahrazen (EMAIL 4)
- [ ] Všechny CTA linky zkontrolovány
- [ ] Test email odeslán a ověřen
- [ ] Automation aktivována

---

## 🎯 VÝSLEDEK

**Po vyplnění kvízu:**
```
User vyplní kvíz
    ↓
EMAIL 1 (OKAMŽITĚ)
Výsledky + akční plán
    ↓
PŘIDÁN NA LIST 4
    ↓
EMAIL 2 (Za 24h)
Soft sell
    ↓
EMAIL 3 (Za 48h)
Důkazy + FAQ
    ↓
EMAIL 4 (Za 72h)
FREE konzultace
```

**CELKOVÁ DÉLKA:** 3 dny (72h)  
**CONVERSION CÍLE:** 2-5% z quiz leads

---

## 🆘 TROUBLESHOOTING

### Problem: Emaily se neposílají

**Řešení:**
1. Zkontroluj že `SMARTEMAILING_LIST_KVIZ=4` je v Netlify ENV
2. Zkontroluj že automation je AKTIVNÍ v Smartemailingu
3. Zkontroluj že user se přidává na list 4 (Smartemailing → Kontakty)
4. Zkontroluj console logy v Netlify Functions

### Problem: Odkazy nefungují

**Řešení:**
1. Zkontroluj že URLs jsou správně (https://)
2. Zkontroluj že Calendly link je TVŮJ link
3. Zkontroluj že `/objednavka` stránka existuje

### Problem: Design je rozbitý

**Řešení:**
1. Zkontroluj že jsi nahral CELÝ HTML kód
2. Zkontroluj že Smartemailing nepřidal extra tagy
3. Zkus "Preview" v Smartemailingu před odesláním

---

**GOOD LUCK! 🚀**
