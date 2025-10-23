# 💰 FAPI Setup - Dva formuláře s různými cenami

## 📋 **PŘEHLED:**

Máte 2 checkout formuláře:
1. **`FapiCheckoutForm`** - Sleva 40% (4.999,- Kč) → pro prvních 24 hodin ✅ AKTIVNÍ
2. **`FapiCheckoutFormExpensive`** - Plná cena (8.499,- Kč) → po expiraci ⚠️ ZATÍM STEJNÝ FORM ID

---

## ✅ **AKTUÁLNÍ STAV (2025-01-23):**

### **OrderPageFinal.tsx - DYNAMICKÉ PŘEPÍNÁNÍ AKTIVNÍ ✅**

```typescript
// Řádky 854-897 - přepíná formuláře podle isExpired
{!isExpired || testMode ? (
  // ✅ SLEVA PLATÍ = FAPI A (4.999 Kč)
  <iframe src="https://form.fapi.cz/?id=47a3e4ff-233e-11eb-a0d2-0a74406df6c8" />
) : (
  // ✅ SLEVA VYPRŠELA = FAPI B (8.499 Kč)
  <iframe src="https://form.fapi.cz/?id=5d6ebf1c-95ca-4781-93d4-8d1052bea23e" />
)}
```

### **✅ HOTOVO:**

1. ✅ Stránka `/objednavka` PUSTÍ usera i po vypršení slevy
2. ✅ Countdown timer zmizí když sleva vyprší
3. ✅ Cena se změní z 4.999 Kč → 8.499 Kč
4. ✅ **FAPI FORMULÁŘ B VYTVOŘEN a zapojen!**
   - Form ID: `5d6ebf1c-95ca-4781-93d4-8d1052bea23e`
   - Cena: 8.499,- Kč (bez DPH) / 10.284,- Kč (s DPH)
   - Webhook: Připravený a detekuje částku automaticky!

---

## 🔧 **SETUP V FAPI ADMIN:**

### **1. Vytvoř 2 produkty v FAPI:**

#### **A) Produkt 1: Se slevou (4.999,- Kč)**
```
Název: Podnikatelská Čtvrtka - Speciální nabídka
Cena: 4.999,- Kč (bez DPH)
Cena s DPH: 6.049,- Kč
Form ID: 47a3e4ff-233e-11eb-a0d2-0a74406df6c8 (tvoje existující)
```

#### **B) Produkt 2: Plná cena (8.499,- Kč)**
```
Název: Podnikatelská Čtvrtka - Běžná cena
Cena: 8.499,- Kč (bez DPH)
Cena s DPH: 10.284,- Kč
Form ID: [NOVÝ - vytvoř v FAPI admin]
```

---

## 📝 **JAK VYTVOŘIT DRUHÝ FAPI FORMULÁŘ:**

### **1. Přihlaš se do FAPI admin:**
1. Jdi na **Formuláře** → **Nový formulář**
2. Vyber **Platební formulář**
3. Nastav:
   - **Název:** Podnikatelská Čtvrtka - Plná cena
   - **Cena:** 8.499,- Kč (bez DPH)
   - **Payment gateway:** GoPay (propoj s GoPay účtem)

### **2. Zkopíruj Form ID:**
- Po vytvoření formuláře zkopíruj **Form ID** z URL
- Vypadá jako: `47a3e4ff-233e-11eb-a0d2-0a74406df6c8`

### **3. Nastav webhook:**
- V nastavení formuláře přidej **Webhook URL:**
  ```
  https://podnikatelskactvrtka.netlify.app/.netlify/functions/fapi-webhook
  ```
- Vyber události:
  - ✅ `order.created` (objednávka vytvořena)
  - ✅ `order.paid` (objednávka zaplacena) ← **DŮLEŽITÉ!**

---

## 🔧 **AKTUALIZUJ FORM ID V KÓDU:**

### **1. Otevři `/components/FapiCheckoutFormExpensive.tsx`:**

Najdi řádek 56:
```tsx
fapiFormUrl.searchParams.append('id', '47a3e4ff-233e-11eb-a0d2-0a74406df6c8'); // ⚠️ ZMĚŇ!
```

Změň na nový Form ID:
```tsx
fapiFormUrl.searchParams.append('id', 'TVUJ_NOVY_FORM_ID_ZDE');
```

### **2. Ulož a deploy!**

---

## 🎯 **JAK POUŽÍT V ORDERPAGE:**

### **Option A: Conditions podle countdownu**

V `OrderPageFinal.tsx` můžeš podmíněně zobrazit buď levný nebo drahý formulář:

```tsx
import FapiCheckoutForm from './FapiCheckoutForm';
import FapiCheckoutFormExpensive from './FapiCheckoutFormExpensive';

// V render části:
{timeLeft > 0 ? (
  // Sleva 40% - prvních 48 hodin
  <FapiCheckoutForm 
    productId="podnikatelska-ctvrtka"
    price={4999}
    productName="Online kurz Podnikatelská Čtvrtka"
  />
) : (
  // Plná cena - po expiraci
  <FapiCheckoutFormExpensive 
    productId="podnikatelska-ctvrtka"
    price={8499}
    productName="Online kurz Podnikatelská Čtvrtka"
  />
)}
```

### **Option B: Samostatné stránky**

**Sleva:** `/objednavka` → používá `FapiCheckoutForm` (4.999,- Kč)  
**Plná cena:** `/objednavka-vyprsela` → používá `FapiCheckoutFormExpensive` (8.499,- Kč)

---

## 🔄 **FAPI WEBHOOK FLOW:**

```
1. Uživatel vyplní formulář → OrderPage.tsx
2. Klikne "Zaplatit" → redirect na FAPI gateway
3. FAPI zobrazí payment options:
   - 💳 Platební karta (GoPay)
   - 🍏 Apple Pay
   - 📱 Google Pay
   - 🏦 Bankovní převod
4. Uživatel zaplatí
5. FAPI pošle webhook na Netlify:
   /.netlify/functions/fapi-webhook
6. Webhook vytvoří účet v Supabase:
   - Email
   - Jméno
   - Access token
7. Webhook pošle email s přístupem (Smartemailing)
8. Uživatel je přesměrován na /dekuji?token=XXX
```

---

## 📊 **POROVNÁNÍ FAPI vs. PŘÍMÁ GOPAY INTEGRACE:**

| Feature | FAPI | Přímá GoPay |
|---------|------|-------------|
| **Payment options** | ✅ Auto (karta, Apple Pay, Google Pay, převod) | ⚠️ Musíš implementovat |
| **Fakturace** | ✅ FAPI generuje faktury | ❌ Musíš řešit sám |
| **Webhook** | ✅ Už funguje | ⚠️ Musíš napsat |
| **Setup** | ✅ 5 minut v admin | ⚠️ 2 hodiny coding |
| **Provize** | ⚠️ FAPI má fee | ✅ Jen GoPay fee |
| **2 ceny** | ✅ 2 formuláře | ⚠️ Musíš rozlišit v kódu |

**Doporučení:** ✅ **FAPI je jednodušší!**

---

## 🎯 **STRUKTURA SOUBORŮ:**

```
/components/
├── FapiCheckoutForm.tsx           ← Sleva 40% (4.999,- Kč)
├── FapiCheckoutFormExpensive.tsx  ← Plná cena (8.499,- Kč)
├── GoPayCheckoutForm.tsx          ← (Nepoužívá se - pro budoucnost)
├── OrderPageFinal.tsx             ← Hlavní sales page
└── ThankYouPage.tsx               ← Děkovací stránka

/netlify/functions/
├── fapi-webhook.js                ← Webhook z FAPI (vytváří účty)
└── gopay-webhook.js               ← (Nepoužívá se - pokud použiješ přímou GoPay)
```

---

## ⚙️ **ENVIRONMENT VARIABLES (Netlify):**

Už máš nastavené pro FAPI webhook:
```bash
VITE_SUPABASE_URL=[tvoje URL]
SUPABASE_SERVICE_ROLE_KEY=[tvůj key]
SMARTEMAILING_USERNAME=[tvůj username]
SMARTEMAILING_API_KEY=[tvůj API key]
```

**Nic dalšího nepotřebuješ!** ✅

---

## 🧪 **TESTING:**

### **1. Test levného formuláře (4.999,- Kč):**
1. Jdi na `/objednavka`
2. Vyplň formulář
3. Klikni "Zaplatit 4.999,- Kč"
4. Měl by tě přesměrovat na FAPI gateway
5. Zaplatit (test karta pokud máš sandbox)
6. Měl by tě vrátit na `/dekuji?token=XXX`

### **2. Test drahého formuláře (8.499,- Kč):**
1. Počkej až countdown vyprší (nebo manuálně změň `timeLeft` na 0)
2. Měl by se zobrazit `FapiCheckoutFormExpensive`
3. Vyplň formulář
4. Klikni "Zaplatit 8.499,- Kč"
5. Stejný flow jako výše

---

## 🚀 **DEPLOYMENT CHECKLIST:**

- [ ] V FAPI admin vytvořen druhý formulář (8.499,- Kč)
- [ ] Zkopírován nový Form ID
- [ ] Form ID vložen do `FapiCheckoutFormExpensive.tsx` (řádek 56)
- [ ] Webhook nastaven v FAPI admin (oba formuláře!)
- [ ] Environment variables v Netlify OK
- [ ] Test checkout flow (levný formulář)
- [ ] Test checkout flow (drahý formulář)
- [ ] Zkontroluj Supabase (users + orders tabulky)
- [ ] Zkontroluj email delivery (Smartemailing)

---

## 💡 **TIP: Jak přepínat formuláře:**

### **V `OrderPageFinal.tsx`:**

Najdi řádek kde je `<FapiCheckoutForm />` (cca řádek 744).

Změň na:
```tsx
{/* Conditional checkout form based on time left */}
{timeLeft > 0 ? (
  // ⏰ SLEVA 40% - Prvních 48 hodin
  <FapiCheckoutForm 
    productId="podnikatelska-ctvrtka"
    price={4999}
    productName="Online kurz Podnikatelská Čtvrtka - Speciální nabídka"
  />
) : (
  // 💰 PLNÁ CENA - Po expiraci
  <FapiCheckoutFormExpensive 
    productId="podnikatelska-ctvrtka"
    price={8499}
    productName="Online kurz Podnikatelská Čtvrtka"
  />
)}
```

**Hotovo!** 🎉

---

## 🔐 **BEZPEČNOST:**

- ✅ FAPI webhook ověřuje signature (built-in)
- ✅ Supabase RLS policies chrání data
- ✅ Access token je random string (nelze uhodnout)
- ✅ SSL šifrování (HTTPS)

---

## 📧 **EMAIL FLOW:**

Po úspěšné platbě:
1. FAPI webhook zavolá Netlify function
2. Function vytvoří účet v Supabase
3. Function pošle email přes Smartemailing API:
   ```
   Ahoj {firstName}!
   
   Gratulujeme k nákupu kurzu! 🎉
   
   Tvůj přístup:
   https://podnikatelskactvrtka.cz/course-v3?token={accessToken}
   
   Cheers,
   Josef
   ```

---

## ❓ **FAQ:**

### **Q: Můžu mít víc než 2 formuláře?**
A: Ano! Vytvoř další FAPI form a přidej další component (např. `FapiCheckoutFormVIP.tsx`)

### **Q: Jak změním cenu v budoucnu?**
A: Změň prop `price={4999}` v `OrderPageFinal.tsx`

### **Q: Jak přidám kupón/slevový kód?**
A: FAPI má built-in kupóny v admin. Nebo přidej condition v `OrderPageFinal.tsx`

### **Q: Můžu použít přímou GoPay integraci?**
A: Ano, ale je to složitější. Soubory `GoPayCheckoutForm.tsx` a `gopay-webhook.js` jsou připravené, ale FAPI je jednodušší.

---

**Autor:** Josef Čipera  
**Verze:** 1.0  
**Datum:** 22. ledna 2025
