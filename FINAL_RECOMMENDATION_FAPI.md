# 🎯 Finální doporučení: FAPI integrace

## 📋 **SITUACE:**

Máte hezkej checkout formulář na `/objednavka` a potřebujete:
1. ✅ Přesměrovat uživatele na platbu (karta, Google Pay, Apple Pay...)
2. ✅ Webhook který vytvoří účet v Supabase s tokenem
3. ✅ Druhý formulář s vyšší cenou po expiraci akce

---

## 💡 **MÉ DOPORUČENÍ: POUŽÍT FAPI!**

### **Proč FAPI:**
- ✅ **Už to máte!** Webhook funguje, vytváří účty v Supabase
- ✅ **Jednoduché!** Nemusíte psát vlastní GoPay integraci
- ✅ **Payment options!** FAPI má všechny metody (karta, Apple Pay, Google Pay, převod)
- ✅ **Fakturace!** FAPI automaticky generuje faktury
- ✅ **2 ceny!** Stačí vytvořit 2 formuláře v FAPI admin
- ✅ **Propojení s GoPay!** FAPI se propojí s GoPay v jejich admin (vy to neřešíte)

### **Proč NE přímá GoPay integrace:**
- ❌ Složitější (musíte psát vlastní webhook)
- ❌ Musíte řešit faktury
- ❌ Musíte ručně implementovat payment options
- ❌ Víc času na development
- ❌ Víc chyb (např. špatně zpracovaný webhook)

---

## 🔧 **CO JSEM UDĚLAL:**

### **1. Vrátil jsem OrderPageFinal na FapiCheckoutForm:**
```tsx
// OrderPageFinal.tsx používá zpět FapiCheckoutForm
import FapiCheckoutForm from './FapiCheckoutForm';

<FapiCheckoutForm 
  productId="podnikatelska-ctvrtka"
  price={4999}
  productName="Online kurz Podnikatelská Čtvrtka"
/>
```

### **2. Vytvořil jsem druhý formulář pro vyšší cenu:**
```tsx
// FapiCheckoutFormExpensive.tsx - pro plnou cenu 8.499,- Kč
<FapiCheckoutFormExpensive 
  productId="podnikatelska-ctvrtka"
  price={8499}
  productName="Online kurz Podnikatelská Čtvrtka"
/>
```

### **3. Dokumentace:**
- ✅ `/FAPI_TWO_PRICE_SETUP.md` - kompletní setup guide
- ✅ `/EXAMPLE_TWO_FORMS_SWITCH.md` - příklad jak přepínat mezi formuláři
- ✅ `/GOPAY_SETUP_GUIDE.md` - kdyby jste chtěli přímou GoPay (NEPOUŽÍVAT!)

---

## 🚀 **CO TEĎKA UDĚLAT:**

### **Krok 1: Vytvoř druhý FAPI formulář (5 minut)**

1. Přihlaš se do **FAPI admin**
2. Jdi na **Formuláře** → **Nový formulář**
3. Vyber **Platební formulář**
4. Nastav:
   - Název: **Podnikatelská Čtvrtka - Plná cena**
   - Cena: **8.499,- Kč** (bez DPH)
   - Payment gateway: **GoPay** (propoj s GoPay účtem)
5. Zkopíruj **Form ID** (z URL)
6. Nastav **Webhook URL:**
   ```
   https://podnikatelskactvrtka.netlify.app/.netlify/functions/fapi-webhook
   ```

### **Krok 2: Aktualizuj Form ID v kódu (1 minuta)**

Otevři `/components/FapiCheckoutFormExpensive.tsx` a najdi řádek 56:

```tsx
fapiFormUrl.searchParams.append('id', '47a3e4ff-233e-11eb-a0d2-0a74406df6c8'); // ⚠️ ZMĚŇ!
```

Změň na tvůj nový Form ID:
```tsx
fapiFormUrl.searchParams.append('id', 'TVUJ_NOVY_FORM_ID_ZDE');
```

### **Krok 3: (Volitelné) Přepni mezi formuláři podle času**

Pokud chceš automaticky přepínat mezi levným a drahým formulářem podle countdownu:

1. Otevři `/components/OrderPageFinal.tsx`
2. Přidej import:
   ```tsx
   import FapiCheckoutFormExpensive from './FapiCheckoutFormExpensive';
   ```
3. Najdi checkout sekci (řádek ~744)
4. Změň na conditional render:
   ```tsx
   {!isExpired ? (
     <FapiCheckoutForm price={4999} ... />
   ) : (
     <FapiCheckoutFormExpensive price={8499} ... />
   )}
   ```

Detailní příklad je v `/EXAMPLE_TWO_FORMS_SWITCH.md`

### **Krok 4: Test (5 minut)**

1. Jdi na `/objednavka`
2. Vyplň formulář
3. Klikni "Zaplatit"
4. Měl by tě přesměrovat na FAPI gateway
5. Zkontroluj že vidíš payment options (karta, Apple Pay, Google Pay...)
6. Zaplatit (testovací platba pokud máš sandbox)
7. Zkontroluj webhook v Netlify Functions logs
8. Zkontroluj Supabase (users tabulka)

### **Krok 5: Deploy! (2 minuty)**

```bash
git add .
git commit -m "feat: FAPI checkout with 2 price tiers"
git push
```

Netlify automaticky nasadí! ✅

---

## 📊 **STRUKTURA SOUBORŮ:**

```
✅ POUŽÍVÁŠ:
/components/
├── FapiCheckoutForm.tsx           ← Sleva 40% (4.999,- Kč) ✅
├── FapiCheckoutFormExpensive.tsx  ← Plná cena (8.499,- Kč) ✅
└── OrderPageFinal.tsx             ← Sales page ✅

/netlify/functions/
└── fapi-webhook.js                ← Webhook z FAPI (vytváří účty) ✅

❌ NEPOUŽÍVÁŠ (pro budoucnost):
/components/
└── GoPayCheckoutForm.tsx          ← Přímá GoPay (nevyužije se)

/netlify/functions/
├── gopay-create-payment.js        ← Přímá GoPay (nevyužije se)
└── gopay-webhook.js               ← Přímá GoPay (nevyužije se)
```

---

## 🎯 **FLOW PO PLATBĚ:**

```
1. Uživatel vyplní formulář → OrderPageFinal.tsx
   - Jméno, email, telefon, firma (volitelné)
   
2. Klikne "Zaplatit 4.999,- Kč" → redirect na FAPI gateway
   
3. FAPI zobrazí payment options:
   💳 Platební karta (GoPay)
   🍏 Apple Pay
   📱 Google Pay
   🏦 Bankovní převod
   
4. Uživatel zaplatí → FAPI zpracuje platbu
   
5. FAPI pošle webhook na Netlify:
   POST /.netlify/functions/fapi-webhook
   
6. Webhook vytvoří účet v Supabase:
   - Email
   - Jméno
   - Access token (random string)
   
7. Webhook pošle email přes Smartemailing:
   "Ahoj {firstName}! Tvůj přístup: ...?token={token}"
   
8. Uživatel je přesměrován:
   /dekuji?token={access_token}
   
9. ThankYouPage zobrazí success message
   
10. U��ivatel klikne "Začít kurz"
    → /course-v3?token={token}
    
11. CourseDemoV3 ověří token a přihlásí uživatele
```

---

## 💰 **DVA FORMULÁŘE:**

| Feature | FapiCheckoutForm | FapiCheckoutFormExpensive |
|---------|------------------|---------------------------|
| **Cena** | 4.999,- Kč (bez DPH) | 8.499,- Kč (bez DPH) |
| **Cena s DPH** | 6.049,- Kč | 10.284,- Kč |
| **Barva** | 🟠 Oranžová | 🔴 Červená |
| **Form ID** | `47a3e4ff-233e-11eb...` | ⚠️ NOVÝ (vytvoř v FAPI) |
| **Kdy použít** | Prvních 48 hodin | Po expiraci |
| **Warning box** | ❌ Ne | ✅ "Sleva vypršela!" |

---

## 🔐 **BEZPEČNOST:**

- ✅ **FAPI webhook** má built-in signature verification
- ✅ **Supabase RLS** policies chrání data
- ✅ **Access token** je random string (nelze uhodnout)
- ✅ **HTTPS** šifrování

---

## 📧 **EMAIL SETUP:**

Už máte nastavené v Netlify environment variables:
```bash
SMARTEMAILING_USERNAME=[tvůj username]
SMARTEMAILING_API_KEY=[tvůj API key]
```

FAPI webhook automaticky pošle email po zaplacení! ✅

---

## ❓ **FAQ:**

### **Q: Můžu mít vlastní hezkej formulář ale přesměrovat na FAPI?**
A: **Ano!** Přesně to děláš. `FapiCheckoutForm` je tvůj hezkej formulář, který přesměruje na FAPI gateway.

### **Q: FAPI zobrazí payment options (karta, Apple Pay...)?**
A: **Ano!** FAPI automaticky zobrazí všechny payment options které máš nastavené v admin.

### **Q: Jak propojím FAPI s GoPay?**
A: V **FAPI admin** → **Nastavení** → **Payment gateway** → Vyber **GoPay** a propoj účet.

### **Q: Webhook už funguje?**
A: **Ano!** Máš `/netlify/functions/fapi-webhook.js` který vytváří účty v Supabase.

### **Q: Jak přidám třetí formulář (např. VIP tier)?**
A: Vytvoř nový FAPI form v admin, zkopíruj Form ID, vytvoř `FapiCheckoutFormVIP.tsx`.

### **Q: Co když chci použít přímou GoPay integraci?**
A: **Nedoporučuji!** Je to složitější a máš víc práce. Ale soubory `GoPayCheckoutForm.tsx` a `gopay-webhook.js` jsou připravené.

---

## 🎉 **SUMMARY:**

### **✅ CO MÁTE:**
- Hezkej checkout formulář (`FapiCheckoutForm`)
- Fungující FAPI webhook (vytváří účty)
- Payment options (karta, Apple Pay, Google Pay...)
- Fakturace přes FAPI
- Email notifikace přes Smartemailing

### **✅ CO PŘIDÁTE:**
- Druhý formulář pro vyšší cenu (`FapiCheckoutFormExpensive`)
- Conditional render v `OrderPageFinal.tsx` (volitelné)
- Nový FAPI form v admin (5 minut)

### **✅ VÝSLEDEK:**
- 2 ceny (4.999,- Kč vs. 8.499,- Kč)
- Automatické přepínání podle času
- Všechno funguje přes FAPI
- Žádné komplikované integrace
- **HOTOVO ZA 15 MINUT!** 🎉

---

## 🚀 **NEXT STEPS:**

1. ✅ Vytvoř druhý FAPI form v admin (5 min)
2. ✅ Zkopíruj Form ID do `FapiCheckoutFormExpensive.tsx` (1 min)
3. ✅ (Volitelně) Přidej conditional render do `OrderPageFinal.tsx` (5 min)
4. ✅ Testuj (5 min)
5. ✅ Deploy! (2 min)

**Total: 15-20 minut!** ⚡

---

**Bottom line:**  
✅ FAPI je jednodušší než přímá GoPay integrace!  
✅ Už to máš funkční (webhook)!  
✅ Stačí přidat druhý formulář!  
✅ Hotovo za 15 minut! 🚀

**Dej vědět až to zkusíš!** 💪

---

**Autor:** Josef Čipera  
**Verze:** 1.0  
**Datum:** 22. ledna 2025
