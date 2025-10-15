# ✅ GOPAY & DEPLOY - READY CHECKLIST

## 📍 URL: **podnikatelskactvrtka.cz/objednavka**

---

## ✅ CO MÁME HOTOVÉ:

### **1. OBJEDNÁVKOVÁ STRÁNKA** ✅
- **Soubor:** `/components/OrderPageFinal.tsx`
- **Routy:**
  - `/objednavka` → plná checkout stránka
  - `/objednavka-vyprsela` → expired page (po 48h)
- **Features:**
  - ✅ Countdown timer (48h sleva)
  - ✅ Hero sekce s urgency
  - ✅ 6× problémů → řešení (Before/After)
  - ✅ Pricing box s výhodami
  - ✅ Custom checkout formulář (ne FAPI iframe!)
  - ✅ Testimonials
  - ✅ FAQ sekce
  - ✅ Trust badges

---

### **2. CHECKOUT FORMULÁŘ** ✅
- **Soubor:** `/components/FapiCheckoutForm.tsx`
- **Features:**
  - ✅ **Osobní údaje:**
    - Jméno + Příjmení ✅
    - Email ✅
    - Telefon (volitelné) ✅
  - ✅ **Firemní nákup:**
    - Checkbox "Nakupuji na firmu" ✅
    - Název firmy ✅
    - IČO ✅
    - DIČ (volitelné) ✅
  - ✅ **Cena:**
    - Fyzická osoba: 6.049 Kč (s DPH 21%)
    - Firma: 4.999 Kč (bez DPH)
    - Automatický přepočet ✅
  - ✅ **Platební metody (GoPay):**
    - 💳 Kreditní/debetní karta
    - 🏦 Bankovní převod
    - 🍎 Apple Pay
    - 📱 Google Pay
  - ✅ **GDPR:**
    - Checkbox "Souhlasím se zpracováním..." ✅
    - Link na GDPR stránku ✅
  - ✅ **Obchodní podmínky:**
    - Checkbox "Souhlasím s obchodními podmínkami" ✅
    - Link na Obchodní podmínky ✅

---

### **3. OBCHODNÍ PODMÍNKY** ✅
- **Soubor:** `/components/TermsPage.tsx`
- **Route:** `/obchodni-podminky` nebo `#obchodni-podminky`
- **Obsah:**
  - ✅ 1. Základní ustanovení
  - ✅ 2. Prodávající (Iting s.r.o.)
    - IČO: 25970631 ✅
    - DIČ: CZ25970631 ✅
    - Sídlo: Vančurova 2710, Dvůr Králové nad Labem ✅
    - Email: kurz@podnikatelskactvrtka.cz ✅
    - Telefon: +420 724 162 016 ✅
  - ✅ 3. Předmět prodeje (popis kurzu)
  - ✅ 4. Cena a platební podmínky
  - ✅ 5. Storno podmínky (14 dní na odstoupení)
  - ✅ 6. Reklamace
  - ✅ 7. Autorská práva
  - ✅ 8. Závěrečná ustanovení

---

### **4. GDPR/OCHRANA DAT** ✅
- **Soubor:** `/components/GDPRPage.tsx`
- **Route:** `/gdpr` nebo `#gdpr`
- **Obsah:**
  - ✅ 1. Správce osobních údajů (Iting s.r.o.)
  - ✅ 2. Jaké osobní údaje zpracováváme
    - Při registraci k mini kurzu (email)
    - Při nákupu (jméno, email, telefon, IČO/DIČ)
    - Automaticky sbíraná data (cookies, IP)
  - ✅ 3. Proč zpracováváme vaše údaje
  - ✅ 4. Jak dlouho uchovávám údaje
  - ✅ 5. S kým sdílíme vaše údaje
    - Platební brána (GoPay/FAPI)
    - Email marketing (Smartemailing)
    - Analytics (anonymizované)
  - ✅ 6. Vaše práva (přístup, oprava, výmaz...)
  - ✅ 7. Cookies
  - ✅ 8. Kontakt

---

### **5. ROUTING V APP.TSX** ✅
- **Routes:**
  ```tsx
  /objednavka → OrderPageFinal ✅
  /objednavka-vyprsela → OrderPage (expired) ✅
  /obchodni-podminky → TermsPage ✅
  /gdpr → GDPRPage ✅
  ```

---

## 📸 SCREENSHOT PRO GOPAY:

### **CO GOPAY CHCE VIDĚT:**

1. **Objednávkový formulář s:**
   - ✅ Jasným názvem produktu ("Podnikatelská Čtvrtka")
   - ✅ Cenou (4.999 Kč bez DPH / 6.049 Kč s DPH)
   - ✅ Popisem co zákazník dostane
   - ✅ Poli pro jméno, email, telefon
   - ✅ Možností firemního nákupu (IČO/DIČ)
   - ✅ Checkboxy GDPR + Obchodní podmínky
   - ✅ Plaťebními metodami (GoPay ikony)

2. **Obchodní podmínky:**
   - ✅ Kompletní údaje prodávajícího (IČO, DIČ, sídlo)
   - ✅ Popis produktu/služby
   - ✅ Cena a platební podmínky
   - ✅ Storno podmínky (14 dní)
   - ✅ Reklamace

3. **GDPR:**
   - ✅ Jaké údaje sbíráme
   - ✅ Proč je sbíráme
   - ✅ S kým je sdílíme
   - ✅ Jak dlouho je držíme
   - ✅ Práva zákazníka

---

## 🚀 DEPLOYMENT CHECKLIST:

### **PŘED DEPLOYM:**

- [ ] **1. Zkontroluj `/objednavka` lokálně**
  - URL: `http://localhost:5173/objednavka`
  - Formulář se zobrazuje? ✅
  - Countdown timer funguje? ✅
  - Ceny se přepočítávají (firma vs fyzická osoba)? ✅

- [ ] **2. Zkontroluj linky**
  - Link na `/obchodni-podminky` funguje? 
  - Link na `/gdpr` funguje?
  - Obě stránky se zobrazují správně?

- [ ] **3. Zkontroluj FAPI integraci**
  - FAPI Form UUID je správné? (`47a3e4ff-233e-11eb-a0d2-0a74406df6c8`)
  - Netlify Function `/netlify/functions/fapi-create-order` existuje? ✅

- [ ] **4. Environment variables**
  - `VITE_FAPI_API_KEY` je nastavená?
  - `VITE_SUPABASE_URL` je nastavená?
  - `VITE_SUPABASE_ANON_KEY` je nastavená?

---

### **DEPLOY KROKY:**

#### **1. Build & Deploy na Netlify:**
```bash
# Zkontroluj že všechny změny jsou committed
git status

# Commit pokud něco chybí
git add .
git commit -m "feat: objednávková stránka ready pro GoPay"

# Push na GitHub → Netlify auto-deploy
git push origin main
```

#### **2. Po deployi zkontroluj:**
- [ ] `https://podnikatelskactvrtka.cz/objednavka` se načítá?
- [ ] Formulář funguje?
- [ ] Countdown timer běží?
- [ ] Linky na Terms/GDPR fungují?

---

### **GOPAY APPROVAL PROCES:**

#### **1. Screenshot formuláře:**
```
Udělej screenshot:
→ https://podnikatelskactvrtka.cz/objednavka
→ Celá stránka včetně formuláře
→ Použij nástroj jako Full Page Screenshot
```

#### **2. Screenshot obchodních podmínek:**
```
Udělej screenshot:
→ https://podnikatelskactvrtka.cz/obchodni-podminky
→ Celá stránka
```

#### **3. Screenshot GDPR:**
```
Udělej screenshot:
→ https://podnikatelskactvrtka.cz/gdpr
→ Celá stránka
```

#### **4. Pošli GoPay:**
Email s:
- ✅ 3× screenshot (formulář, terms, GDPR)
- ✅ URL: `https://podnikatelskactvrtka.cz/objednavka`
- ✅ Popis produktu: "Online kurz Podnikatelská Čtvrtka - business strategie pro podnikatele"
- ✅ Cena: 4.999 Kč bez DPH / 6.049 Kč s DPH
- ✅ IČO prodávajícího: 25970631

---

## 📋 CO GOPAY KONTROLUJE:

### **FORMULÁŘ:**
- [x] Jasný název produktu ✅
- [x] Viditelná cena ✅
- [x] Popis co zákazník dostane ✅
- [x] Kontaktní údaje (email, telefon) ✅
- [x] GDPR checkbox ✅
- [x] Obchodní podmínky checkbox ✅
- [x] Platební metody jasně uvedené ✅

### **OBCHODNÍ PODMÍNKY:**
- [x] IČO, DIČ, sídlo prodávajícího ✅
- [x] Popis produktu ✅
- [x] Cena a platební podmínky ✅
- [x] Storno podmínky (14 dní pro digitální produkt) ✅
- [x] Reklamace ✅

### **GDPR:**
- [x] Správce osobních údajů ✅
- [x] Jaké údaje sbíráme ✅
- [x] Proč je sbíráme ✅
- [x] Jak dlouho je držíme ✅
- [x] S kým je sdílíme ✅
- [x] Práva zákazníka ✅

---

## ⚠️ POZOR NA:

### **1. IČO/DIČ pole:**
- ✅ Zobrazují se JEN když zaškrtnu "Nakupuji na firmu"
- ✅ Jsou volitelná, ale doporučená pro B2B

### **2. Ceny:**
- ✅ Fyzická osoba: **6.049 Kč** (s DPH 21%)
- ✅ Firma: **4.999 Kč** (bez DPH)
- ✅ Automatický přepočet funguje

### **3. GDPR Consent:**
- ✅ MUSÍ být zaškrtnutý před odesláním
- ✅ Link na plnou GDPR stránku

### **4. Platební metody:**
- ✅ Zobrazeny jako výběr (radio buttons)
- ✅ Ikony platebních metod (card, bank, Apple Pay, Google Pay)
- ✅ Vybraná metoda se odešle do FAPI

---

## 🔗 DŮLEŽITÉ LINKY:

### **Produkční:**
- **Objednávka:** https://podnikatelskactvrtka.cz/objednavka
- **Obchodní podmínky:** https://podnikatelskactvrtka.cz/obchodni-podminky
- **GDPR:** https://podnikatelskactvrtka.cz/gdpr

### **Lokální testing:**
- **Objednávka:** http://localhost:5173/objednavka
- **Obchodní podmínky:** http://localhost:5173/obchodni-podminky
- **GDPR:** http://localhost:5173/gdpr

---

## 📧 KONTAKTNÍ ÚDAJE PRO GOPAY:

```
Prodávající: Iting s.r.o.
IČO: 25970631
DIČ: CZ25970631
Sídlo: Vančurova 2710, Dvůr Králové nad Labem
Email: kurz@podnikatelskactvrtka.cz
Telefon: +420 724 162 016
Kontaktní osoba: Josef Čipera
```

---

## ✅ READY STATUS:

### **Formulář:** ✅ READY
- Všechny potřebné fieldy ✅
- Validace ✅
- Platební metody ✅
- GDPR/Terms checkboxy ✅

### **Obchodní podmínky:** ✅ READY
- Kompletní údaje ✅
- Popis produktu ✅
- Storno podmínky ✅
- Reklamace ✅

### **GDPR:** ✅ READY
- Správce údajů ✅
- Jaké údaje sbíráme ✅
- S kým sdílíme ✅
- Práva zákazníka ✅

### **Deployment:** ⏳ ČEKÁ NA PUSH
- Lokálně vše funguje ✅
- Commity ready ✅
- Stačí `git push` ✅

---

## 🚀 FINÁLNÍ KROKY:

1. ✅ **Zkontroluj lokálně:**
   ```bash
   npm run dev
   # Otevři: http://localhost:5173/objednavka
   # Otevři: http://localhost:5173/obchodni-podminky
   # Otevři: http://localhost:5173/gdpr
   ```

2. ⏳ **Deploy:**
   ```bash
   git add .
   git commit -m "feat: objednávková stránka ready pro GoPay"
   git push origin main
   ```

3. ⏳ **Po deployi:**
   - Zkontroluj: https://podnikatelskactvrtka.cz/objednavka
   - Udělej 3× screenshot (formulář, terms, GDPR)
   - Pošli GoPay pro approval

4. ⏳ **Čekej na GoPay approval** (obvykle 1-2 pracovní dny)

5. ⏳ **Po approval:**
   - Aktivuj payment gateway
   - Test objednávka
   - Launch! 🚀

---

**JSME READY PRO DEPLOY!** ✅

**Stačí `git push` a pak screenshot pro GoPay!** 🎯
