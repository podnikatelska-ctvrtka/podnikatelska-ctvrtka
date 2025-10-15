# 💡 FAPI - DVA PRODUKTY ŘEŠENÍ!

## ❓ PROBLÉM:

```
SITUACE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Když countdown vyprší:
• Zobrazíme "Nabídka vypršela"
• Full price: 8.499,- Kč (bez slevy)

ALE:
• FAPI má fixed ceny v produktech
• Nemůžeme měnit cenu dynamicky v jednom formuláři!

→ POTŘEBUJEME 2 FAPI PRODUKTY! 🎯
```

---

## ✅ ŘEŠENÍ: 2 FAPI PRODUKTY

```
PRODUKT #1: SE SLEVOU (4.999,-)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Název: "Podnikatelská Čtvrtka - SLEVA 40%"
• Cena: 4.999,- Kč (bez DPH)
• S DPH: 6.049,- Kč
• Form ID: (existující)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRODUKT #2: BEZ SLEVY (8.499,-)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Název: "Podnikatelská Čtvrtka - Běžná cena"
• Cena: 8.499,- Kč (bez DPH)
• S DPH: 10.284,- Kč
• Form ID: (nový - vytvoříme!)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LOGIKA:
• Countdown aktivní → Produkt #1 (sleva)
• Countdown vypršel → Produkt #2 (full price)

→ CLEAN ŘEŠENÍ! ✅
```

---

## 🔧 CO POTŘEBUJEŠ UDĚLAT V FAPI:

### **KROK 1: Vytvořit druhý produkt**

```
1. Přihlaš se do FAPI admin
2. Produkty → Nový produkt
3. Vyplň:
   
   Název: 
   "Podnikatelská Čtvrtka - Běžná cena"
   
   Popis:
   "90minutový strategický kurz - kompletní byznys plán"
   
   Cena: 
   8.499,- Kč (bez DPH)
   
   Typ: 
   Digitální kurz
   
4. Ulož produkt

→ HOTOVO! ✅
```

### **KROK 2: Vytvořit druhý checkout formulář**

```
1. Objednávkové formuláře → Nový formulář
2. Vyber:
   • Template: "Jednoduchý checkout"
   • Produkt: "Podnikatelská Čtvrtka - Běžná cena"
   
3. Nastavení formuláře:
   
   Pole:
   ✅ Jméno
   ✅ Příjmení
   ✅ Email
   ✅ Telefon (volitelné)
   ✅ Checkbox: Nakupuji na firmu
   ✅ Název firmy (conditional)
   ✅ IČO (conditional)
   ✅ DIČ (conditional)
   ✅ GDPR souhlas
   
   Platební metody:
   ✅ Kartou (GoPay)
   ✅ Bankovní převod (GoPay)
   ✅ Apple Pay
   ✅ Google Pay
   
4. Webhook:
   • URL: https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook
   • Events: payment_success
   
5. Ulož a publikuj formulář
6. Zkopíruj Form UUID!

→ FORM UUID POTŘEBUJEŠ PRO KÓD! 📋
```

---

## 💻 KÓD - DVĚ VERZE KOMPONENTY:

### **OPTION A: Conditional Props (jednodušší!)**

```tsx
// OrderPageFinal.tsx

// V expired view:
<FapiCheckoutForm 
  productId="FULL_PRICE_FORM_UUID_HERE"
  price={8499}
  productName="Podnikatelská Čtvrtka"
  isFullPrice={true}
/>

// V normální view (sleva):
<FapiCheckoutForm 
  productId="47a3e4ff-233e-11eb-a0d2-0a74406df6c8"
  price={4999}
  productName="Podnikatelská Čtvrtka - SLEVA 40%"
  isFullPrice={false}
/>
```

**PRO:**
✅ Jedna komponenta
✅ Jednodušší maintenance
✅ Méně kódu

**PROTI:**
❌ Musíme upravit existující komponentu

---

### **OPTION B: Dvě komponenty (čistší!)**

```tsx
// FapiCheckoutForm.tsx (sleva - existující)
// Už hotovo! ✅

// FapiCheckoutFormFullPrice.tsx (nová!)
// Duplicita s jinou cenou a Form UUID
```

**PRO:**
✅ Čistá separace
✅ Žádná conditional logika
✅ Easy debug

**PROTI:**
❌ Duplicitní kód
❌ 2 komponenty k udržování

---

## 🎯 DOPORUČENÍ:

```
POUŽIJ: OPTION A (Conditional Props!)

PROČ:
✅ Jednodušší
✅ Jedna komponenta = less maintenance
✅ Props už máme (price, productId, productName)
✅ Přidáme jen isFullPrice flag

IMPLEMENTACE:
1. Upravíme FapiCheckoutForm.tsx
2. Přidáme prop: isFullPrice?: boolean
3. Conditional text na buttonu?
4. V OrderPageFinal.tsx pass správný productId

→ 10 MIN PRÁCE! 🚀
```

---

## 📝 IMPLEMENTACE - KROK ZA KROKEM:

### **1. ENV PROMĚNNÁ:**

```env
# .env
VITE_FAPI_FORM_DISCOUNT="47a3e4ff-233e-11eb-a0d2-0a74406df6c8"
VITE_FAPI_FORM_FULL_PRICE="TBD_FORM_UUID_HERE"
```

### **2. UPRAVIT OrderPageFinal.tsx:**

```tsx
// OrderPageFinal.tsx

// Import env vars
const FORM_DISCOUNT = import.meta.env.VITE_FAPI_FORM_DISCOUNT || '47a3e4ff-233e-11eb-a0d2-0a74406df6c8';
const FORM_FULL_PRICE = import.meta.env.VITE_FAPI_FORM_FULL_PRICE || 'STEJNY_JAKO_DISCOUNT'; // fallback

// V expired view (řádek ~80):
if (isExpired) {
  return (
    <div>
      {/* ... expired content ... */}
      
      {/* FULL PRICE CHECKOUT */}
      <FapiCheckoutForm 
        productId={FORM_FULL_PRICE}
        price={8499}
        productName="Podnikatelská Čtvrtka"
      />
    </div>
  );
}

// V normal view (řádek ~500+):
<FapiCheckoutForm 
  productId={FORM_DISCOUNT}
  price={4999}
  productName="Podnikatelská Čtvrtka - SLEVA 40%"
/>
```

### **3. ŽÁDNÁ ZMĚNA v FapiCheckoutForm.tsx:**

```
✅ Component už bere price jako prop!
✅ Component už bere productId jako prop!
✅ Už to funguje!

→ ZERO CHANGES NEEDED! 🎉
```

---

## 🧪 TESTOVÁNÍ:

### **TEST 1: Sleva aktivní**
```
1. Clear localStorage countdown
2. Refresh /objednavka
3. Měl by se zobrazit:
   ✅ Countdown 48:00:00
   ✅ Cena: 4.999,- Kč (6.049,- s DPH)
   ✅ FAPI form s discount UUID
```

### **TEST 2: Sleva vypršela**
```
1. Set countdown expired:
   localStorage.setItem('podnikatelska_ctvrtka_countdown_start', Date.now() - 49*60*60*1000)
2. Refresh /objednavka
3. Měl by se zobrazit:
   ✅ "Nabídka vypršela"
   ✅ Cena: 8.499,- Kč (10.284,- s DPH)
   ✅ FAPI form s full price UUID
```

### **TEST 3: Payment flow**
```
1. Vyplň formulář
2. Klikni "Přejít k platbě"
3. Měl by se přesměrovat na:
   ✅ form.fapi.cz/?id=FULL_PRICE_UUID
   ✅ S pre-filled daty
```

---

## 📊 PRICING BREAKDOWN:

```
PRODUKT #1: SLEVA 40%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cena bez DPH: 4.999,- Kč
DPH (21%):    1.050,- Kč
Cena s DPH:   6.049,- Kč

Pro firmy:    4.999,- Kč (bez DPH)
Pro fyzické:  6.049,- Kč (s DPH)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRODUKT #2: BĚŽNÁ CENA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cena bez DPH: 8.499,- Kč
DPH (21%):    1.785,- Kč
Cena s DPH:  10.284,- Kč

Pro firmy:    8.499,- Kč (bez DPH)
Pro fyzické: 10.284,- Kč (s DPH)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SLEVA:
Ušetříš:     3.500,- Kč (bez DPH)
             4.235,- Kč (s DPH)

→ 40% DISCOUNT! 🔥
```

---

## ⚠️ DŮLEŽITÉ POZNÁMKY:

```
1. WEBHOOK:
   ✅ Oba formuláře musí mít stejný webhook!
   → https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook
   
2. STEJNÁ SUPABASE LOGIC:
   ✅ Webhook zapisuje do stejné tabulky
   ✅ Rozliš podle amount (4999 vs 8499)
   
3. EMAIL PŘÍSTUP:
   ✅ Oba produkty = stejný kurz!
   ✅ Webhook pošle stejný email s přístupem
   
4. ZÁKAZNÍK NEVÍ ROZDÍL:
   ✅ Oba produkty = "Podnikatelská Čtvrtka"
   ✅ Stejný obsah kurzu
   ✅ Jen jiná cena!

→ TRANSPARENT PRO UŽIVATELE! 💎
```

---

## 🚀 DEPLOYMENT:

```
CHECKLIST:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

□ FAPI: Vytvořit druhý produkt (8.499,-)
□ FAPI: Vytvořit druhý formulář
□ FAPI: Nastavit webhook (stejný!)
□ FAPI: Zkopírovat Form UUID

□ KÓD: Přidat VITE_FAPI_FORM_FULL_PRICE do .env
□ KÓD: Upravit OrderPageFinal.tsx (2 form IDs)
□ KÓD: Test locally

□ NETLIFY: Přidat env var VITE_FAPI_FORM_FULL_PRICE
□ NETLIFY: Deploy

□ TEST: Countdown active → discount form
□ TEST: Countdown expired → full price form
□ TEST: Payment flow (both forms)

→ ALL CHECKED = DONE! ✅
```

---

## 💡 ALTERNATIVNÍ ŘEŠENÍ (Složitější!):

```
BACKEND PROXY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Místo 2 produktů v FAPI:
1. Vytvoříš Netlify Function
2. Function dynamicky vytvoří FAPI order
3. Cenu určíš podle countdown stavu

PRO:
✅ Jen 1 FAPI produkt

PROTI:
❌ Složitější implementace
❌ Musíš spravovat FAPI API
❌ Více moving parts
❌ Bezpečnostní risk (API keys)

→ NEDOPORUČUJU! 2 PRODUKTY = JEDNODUŠŠÍ! ✅
```

---

## ✅ FINÁLNÍ ŘEŠENÍ:

```
1. VYTVOŘ V FAPI:
   → Druhý produkt (8.499,-)
   → Druhý formulář
   → Stejný webhook

2. PŘIDEJ DO .env:
   → VITE_FAPI_FORM_FULL_PRICE="NEW_UUID_HERE"

3. UPRAV OrderPageFinal.tsx:
   → Expired view → full price form UUID
   → Normal view → discount form UUID

4. DEPLOY:
   → Netlify env vars
   → Test!

→ HOTOVO ZA 30 MIN! 🚀
```

---

## 🎯 AKČNÍ PLÁN TEĎKA:

```
1. ✅ Přečti si toto
2. 🔧 Vytvoř druhý FAPI produkt (10 min)
3. 🔧 Vytvoř druhý FAPI formulář (10 min)
4. 📋 Zkopíruj Form UUID
5. 💻 Řekni mi UUID → upravím kód! (5 min)
6. 🧪 Test! (5 min)
7. 🚀 Deploy!

→ CELKEM: 30-40 MIN! 💪
```

---

**TLDR:**  
Potřebuješ 2 FAPI produkty (4.999,- a 8.499,-) s 2 formuláři. V kódu podle countdown stavu zobrazíš správný formulář. Jednoduchá implementace! ✅

**CO ŘÍKÁŠ? DĚLÁME TO TAK?** 🤔💪
