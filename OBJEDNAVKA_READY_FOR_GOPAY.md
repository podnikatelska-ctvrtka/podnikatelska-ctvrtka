# ✅ STRÁNKA /objednavka JE HOTOVÁ PRO GOPAY!

## 🎉 DOBRÁ ZPRÁVA:

```
✅ Stránka /objednavka UŽ EXISTUJE!
✅ Používá FapiCheckoutForm (hezkej checkout)
✅ IČO/DIČ pole pro firmy ✅
✅ GoPay payment badges ✅
✅ GDPR checkbox s linky na /terms a /gdpr ✅
✅ Responzivní design ✅
```

---

## 🔗 VŠECHNY POTŘEBNÉ STRÁNKY PRO GOPAY:

### **1. OBJEDNÁVKOVÝ FORMULÁŘ:**
```
✅ https://podnikatelskactvrtka.cz/objednavka

Co obsahuje:
├── Hezkej checkout form
├── Pole: Jméno, Příjmení, Email, Telefon
├── IČO/DIČ toggle pro firmy
├── GoPay payment metody info
├── Trust badges (🔒 Zabezpečená platba)
├── Price summary (4.999 Kč)
├── GDPR checkbox s linky
└── Redirect na FAPI form po submitu
```

---

### **2. OBCHODNÍ PODMÍNKY:**
```
✅ https://podnikatelskactvrtka.cz/terms

Co obsahuje:
├── Identifikace prodávajícího (Iting s.r.o.)
├── IČO: 25970631
├── DIČ: CZ25970631
├── Předmět smlouvy
├── Cena a platební podmínky
├── Odstoupení od smlouvy (14 dní)
├── Reklamace
├── Kontaktní údaje
└── Datum platnosti
```

---

### **3. GDPR / OCHRANA ÚDAJŮ:**
```
✅ https://podnikatelskactvrtka.cz/gdpr

Co obsahuje:
├── Správce údajů (Iting s.r.o.)
├── Účel zpracování
├── Právní základ
├── Doba uložení
├── Příjemci údajů
├── Práva subjektu údajů
├── Kontakt na správce
└── Stížnosti na ÚOOÚ
```

---

## 📧 EMAIL PRO GOPAY - FINAL VERSION:

```
Komu: podpora@gopay.cz
Předmět: Přidání nového obchodu - GoID: 8519838725

Dobrý den,

dnes jsem vytvořil žádost o přidání nového obchodu 
v GoPay portálu:

Doména: podnikatelskactvrtka.cz
GoID: 8519838725 (stávající účet)

Pro schválení vám poskytuju potřebné odkazy:

📄 Objednávkový formulář:
https://podnikatelskactvrtka.cz/objednavka

📄 Obchodní podmínky:
https://podnikatelskactvrtka.cz/terms

📄 GDPR / Ochrana osobních údajů:
https://podnikatelskactvrtka.cz/gdpr

Produkt:
- Název: Podnikatelská Čtvrtka - Online kurz Business Model Canvas
- Cena: 4.999 Kč bez DPH
- Typ: Digitální produkt (online kurz)
- Integrace: přes FAPI.cz

Očekávaný měsíční objem plateb: do 50.000 Kč

Děkuji za rychlé schválení!

S pozdravem,
Josef Čipera
Iting s.r.o.
josef@iting.cz
+420 724 162 016
```

---

## 🧪 TEST PŘED ODESLÁNÍM GOPAY:

### **CHECKLIST:**

```
☐ 1. Otevři: https://podnikatelskactvrtka.cz/objednavka
   → Funguje? ✅
   → Hezkej design? ✅
   → Responzivní? ✅

☐ 2. Vyplň testovací form:
   - Jméno: Test
   - Příjmení: Testovací
   - Email: test@test.cz
   - ☑ GDPR checkbox
   
☐ 3. Zkontroluj GDPR linky:
   → Klikni na "obchodní podmínky"
   → Otevře /terms? ✅
   → Klikni na "zásady ochrany osobních údajů"
   → Otevře /gdpr? ✅

☐ 4. Zkontroluj IČO/DIČ pole:
   → ☑ "Nakupuji na firmu"
   → Zobrazí se IČO/DIČ pole? ✅

☐ 5. Screenshot všech 3 stránek:
   - /objednavka
   - /terms
   - /gdpr
   → Pro GoPay support (pokud budou chtít)
```

---

## 🚀 DEPLOYMENT CHECKLIST:

### **PŘED DEPLOYEM NA NETLIFY:**

```
☐ 1. Zkontroluj že všechny stránky fungují lokálně:
   netlify dev
   → http://localhost:8888/objednavka ✅
   → http://localhost:8888/terms ✅
   → http://localhost:8888/gdpr ✅

☐ 2. Zkontroluj FapiCheckoutForm redirect:
   → Redirect na: https://form.fapi.cz/?id=47a3e4ff...
   → S předvyplněnými parametry (email, jméno...)

☐ 3. Zkontroluj Netlify Functions:
   → fapi-webhook.js existuje ✅
   → smartemailing-subscribe.js existuje ✅

☐ 4. Deploy na Netlify:
   git add .
   git commit -m "Ready for GoPay approval"
   git push
   
☐ 5. Počkej ~2 minuty na build

☐ 6. Test na produkci:
   → https://podnikatelskactvrtka.netlify.app/objednavka
   → https://podnikatelskactvrtka.netlify.app/terms
   → https://podnikatelskactvrtka.netlify.app/gdpr
```

---

### **CUSTOM DOMAIN SETUP (KRITICKÉ!):**

```
⚠️ MUSÍŠ MÍT NASTAVENÉ: podnikatelskactvrtka.cz

Netlify Dashboard:
1. ✅ Site settings → Domain management
2. ✅ Add custom domain: podnikatelskactvrtka.cz
3. ✅ Add www.podnikatelskactvrtka.cz (redirect)
4. ✅ Verify DNS:
   A record: 75.2.60.5 (Netlify)
   CNAME: podnikatelskactvrtka.netlify.app
5. ✅ Enable HTTPS (auto-provisions SSL)
6. ✅ Test: https://podnikatelskactvrtka.cz/objednavka

→ MÁŠ TO UŽ NASTAVENÉ? ☐
```

---

## 📞 CO POSLAT GOPAY:

### **VARIANTA A: OKAMŽITĚ (pokud je doména aktivní)**

```
1. ✅ Zkontroluj že doména funguje:
   https://podnikatelskactvrtka.cz/objednavka ✅

2. ✅ Email na GoPay (šablona výše)
   
3. ✅ Přilož screenshot /objednavka

4. ✅ Počkej 1-3 dny na schválení

5. ✅ Zkontroluj email denně: josef@iting.cz
```

---

### **VARIANTA B: POČKAT NA BUILD (pokud deployuješ teď)**

```
1. ✅ Deploy na Netlify (git push)

2. ✅ Počkej 2-5 minut (build)

3. ✅ Verify že funguje:
   https://podnikatelskactvrtka.cz/objednavka
   https://podnikatelskactvrtka.cz/terms
   https://podnikatelskactvrtka.cz/gdpr

4. ✅ Email na GoPay (šablona výše)

5. ✅ Čekej na schválení (1-3 dny)
```

---

## 🎯 EXPECTED GOPAY RESPONSE:

### **SCÉNÁŘ 1: OKAMŽITĚ SCHVÁLENO (best case)**

```
Email od GoPay:
"Dobrý den,
nový obchod podnikatelskactvrtka.cz byl aktivován.
GoID: 8519838725 (stejné jako byznysuj.cz)
Můžete začít přijímat platby."

→ NIC NEMĚNÍŠ V FAPI!
→ Credentials zůstávají stejné!
→ Jen testuj platby!
→ HOTOVO! 🎉
```

---

### **SCÉNÁŘ 2: NOVÉ GoID (možné)**

```
Email od GoPay:
"Dobrý den,
nový obchod byl vytvořen s novým GoID: 8519838726.
Client ID a Secret zůstávají stejné."

PAK:
1. ✅ FAPI → Platby → GoPay → Upravit
2. ✅ Změň GoID na nové: 8519838726
3. ✅ Client ID + Secret NECH! ✅
4. ✅ Ulož
5. ✅ Test connection
6. ✅ Testuj platby
7. ✅ HOTOVO! 🎉
```

---

### **SCÉNÁŘ 3: ŽÁDOST O DODATEČNÉ INFO**

```
Email od GoPay:
"Potřebujeme ještě:
- Doklad o podnikání (výpis z OR)
- Screenshot objednávkového formuláře
- Potvrzení identity"

PAK:
1. ✅ Pošli co chtějí
2. ✅ Počkej na další odpověď
3. ✅ Schválení do 2-3 dnů
```

---

## 🧪 PO SCHVÁLENÍ - TEST FLOW:

```
1. ✅ Otevři: https://podikatelskactvrtka.cz/objednavka

2. ✅ Vyplň form:
   - Jméno: Test
   - Příjmení: Testovací
   - Email: test@podnikatelskactvrtka.cz
   - ☑ GDPR

3. ✅ Klikni "Přejít k platbě"

4. ✅ Redirect na FAPI form

5. ✅ Scroll k platební sekci

6. ✅ MĚLY BY SE UKÁZAT VŠECHNY GOPAY METODY! ✅
   ├── 💳 Platební karta
   ├── 🏦 Rychlý online převod
   ├── 🍎 Apple Pay
   └── 📱 Google Pay

7. ✅ Vyber "Platební karta"

8. ✅ GoPay test card:
   Číslo: 4111 1111 1111 1111
   Exp: 12/25
   CVV: 123

9. ✅ Zaplatit

10. ✅ Success!

11. ✅ Webhook → /fapi-webhook

12. ✅ Email s přístupem ke kurzu! 🎉
```

---

## 📊 TIMELINE:

```
TEĎKA (15 minut):
☐ Deploy na Netlify (pokud potřeba)
☐ Verify doména funguje
☐ Screenshot /objednavka, /terms, /gdpr
☐ Email na GoPay

ZA 1-3 DNY:
☐ GoPay email o schválení
☐ Možná nové GoID (update v FAPI)
☐ Test platby
☐ Webhook test
☐ Email test

ZA 4-5 DNÍ:
☐ Celý systém funguje! ✅
☐ Můžeš LAUNCHOVAT! 🚀
```

---

## ✅ SUMMARY:

```
MÁME HOTOVO:
✅ /objednavka (FapiCheckoutForm)
✅ /terms (Obchodní podmínky)
✅ /gdpr (GDPR)
✅ Hezkej checkout form
✅ IČO/DIČ pole
✅ GoPay payment info
✅ Webhook ready
✅ Email flow ready

ČEKÁME NA:
⏱️ GoPay schválení nového obchodu (1-3 dny)
⏱️ Email: josef@iting.cz

PAK:
✅ Update GoID v FAPI (pokud bude nové)
✅ Test platby
✅ LAUNCH! 🚀
```

---

## 🎯 IMMEDIATE ACTION:

```
1. ✅ Zkontroluj že doména funguje:
   https://podnikatelskactvrtka.cz/objednavka
   
   POKUD NE:
   → Deploy na Netlify (git push)
   → Setup custom domain v Netlify
   → Počkej 5-10 minut

2. ✅ Screenshot všech 3 stránek:
   - /objednavka
   - /terms
   - /gdpr

3. ✅ Email na GoPay (použij šablonu výše)

4. ✅ Čekej na odpověď (zkontroluj email denně!)
```

---

**Status:** ✅ Stránky hotové pro GoPay!  
**Action:** Email na GoPay s odkazy  
**Expected:** Schválení do 1-3 dní  
**Next:** Update GoID v FAPI (pokud bude potřeba) → Test → Launch! 🚀
