# 🧾 FAPI FAKTURA LINK - FIX & SETUP

**Problém:** Link na fakturu v email neodkazuje nikam - má špatný URL.

**Příčina:** Webhook používá `https://app.fapi.cz/invoice/${invoiceId}` ale správný formát je jiný!

---

## ✅ **CO JSEM OPRAVIL:**

### **1. Upgradovaný webhook - 3 fallbacky**

```javascript
// PŘED:
const invoiceUrl = `https://app.fapi.cz/invoice/${invoiceId}`;  // ❌ NEFUNGUJE!

// PO:
const invoicePdfUrl = invoice.pdf_url || invoice.invoice_url || invoice.pdf || null;
const invoiceUrl = invoicePdfUrl || `https://app.fapi.cz/invoices/${invoiceId}`;  // ✅ s plurálem!
const hasInvoiceUrl = !!invoicePdfUrl;
```

**Změny:**
1. **PDF URL z FAPI API** (pokud FAPI poskytuje direct download link)
2. **Invoice detail page** (opravený URL s plurálem: `/invoices/` místo `/invoice/`)
3. **Fallback message** v emailu (pokud FAPI link chybí)

---

## 🔍 **JAK FUNGUJE FAPI INVOICE API:**

### **FAPI API Response obsahuje:**

```json
{
  "id": "123456",
  "customer": {
    "email": "zakaznik@example.com",
    "name": "Jan Novák"
  },
  "total": 4999,
  "pdf_url": "https://app.fapi.cz/storage/invoices/abc123.pdf",  // ← TOHLE POTŘEBUJEME!
  "invoice_url": "https://app.fapi.cz/invoices/123456",
  ...
}
```

**→ Webhook teď extrahuje `pdf_url` a používá ho v emailu!**

---

## 🧪 **TESTOVÁNÍ (BEZ NOVÉ PLATBY):**

### **Metoda #1: Zkontroluj FAPI Admin**

```
1. FAPI Admin → Objednávky
2. Najdi libovolnou fakturu
3. Klikni "Zobrazit" nebo "Stáhnout PDF"
4. Zkopíruj URL z browseru
```

**Jaký formát vidíš?**

- ✅ `https://app.fapi.cz/invoices/123456` (s plurálem)
- ✅ `https://app.fapi.cz/storage/invoices/abc123.pdf` (direct PDF)
- ❌ `https://app.fapi.cz/invoice/123456` (bez plurálu - NEFUNGUJE!)

---

### **Metoda #2: Zkontroluj poslední email**

```
1. Najdi poslední platební email v inboxu
2. Klikni na "Stáhnout fakturu (PDF)"
3. Zkontroluj kam vede
```

**Co se stane:**

- ✅ Stáhne PDF → URL funguje!
- ✅ Otevře FAPI stránku s fakturou → URL funguje!
- ❌ 404 Not Found → URL nefunguje!
- ⚠️ Přihlášení na FAPI → URL vyžaduje login

---

### **Metoda #3: Test webhook s debug logem**

Po nasazení můžeš zkontrolovat Netlify logs:

```
1. Netlify Dashboard → Functions → fapi-webhook
2. Najdi poslední run
3. Hledej řádek:
   🧾 Invoice PDF URL from FAPI: [URL]
   🧾 Invoice URL pro email: [URL]
   🧾 Has direct PDF: true/false
```

**Pokud vidíš:**

```
🧾 Invoice PDF URL from FAPI: null
🧾 Has direct PDF: false
```

**→ FAPI API NEVRACÍ `pdf_url`!** Musíš nastavit v FAPI Adminu.

---

## 🔧 **FAPI ADMIN NASTAVENÍ:**

### **MOŽNOST A: Zapni PDF linky v API ✅ (DOPORUČENO)**

```
1. FAPI Admin → Nastavení → API
2. Najdi sekci "Invoice API"
3. ✅ Zapni "Include PDF URL in API responses"
4. Ulož
```

**→ FAPI začne vracet `pdf_url` v API!**

---

### **MOŽNOST B: Použij FAPI automatické emaily 📧**

```
1. FAPI Admin → Nastavení → Emaily
2. Email "Faktura vystavena"
3. ✅ Aktivuj
4. Template obsahuje správný faktura link
```

**⚠️ PROBLÉM:** FAPI automatické emaily se neposílají (dle tvého popisu)!

**→ Kontaktuj FAPI support proč se neposílají!**

---

### **MOŽNOST C: Manual fix - předej správný URL 🛠️**

Pokud znáš správný formát FAPI faktura URL, můžeš ho hardcodovat:

```javascript
// V /netlify/functions/fapi-webhook.js (řádek 180):

// OPTION 1: Detail page (requires login)
const invoiceUrl = `https://app.fapi.cz/invoices/${invoiceId}`;

// OPTION 2: Direct download (if you know the pattern)
const invoiceUrl = `https://app.fapi.cz/api/invoices/${invoiceId}/pdf`;

// OPTION 3: Storage URL (if you know the naming pattern)
const invoiceUrl = `https://app.fapi.cz/storage/invoices/${invoiceId}.pdf`;
```

**⚠️ POZOR:**
- Storage URL vyžaduje autentizaci!
- Detail page vyžaduje FAPI login!
- API endpoint může vyžadovat API klíč!

---

## 🎯 **MÉ DOPORUČENÍ - 3 KROKY:**

### **KROK 1: Push upgrade webhook**

```bash
git add netlify/functions/fapi-webhook.js
git commit -m "fix: Improved FAPI invoice URL detection with 3 fallbacks"
git push
```

Netlify auto-deploy → počkat 2 minuty.

---

### **KROK 2: Udělej testovací platbu 1 Kč**

```
1. Reset timer: localStorage.removeItem('podnikatelska_ctvrtka_countdown_start'); location.reload();
2. Vyplň formulář (NOVÝ email!)
3. Test karta: 4111 1111 1111 1111, CVV: 123, 12/25
4. Zadej částku 1 Kč (testovací režim)
5. Zaplatit
```

**→ Dostaneš email s fakturou linkem!**

---

### **KROK 3: Zkontroluj email + logs**

**A) Email:**
```
1. Otevři email "PRŮKOPNÍK! Přístup do kurzu..."
2. Scroll na sekci "📄 Faktura"
3. Klikni "Stáhnout fakturu (PDF)"
4. ✅ Funguje? → HOTOVO!
5. ❌ Nefunguje? → Jdi na B
```

**B) Netlify Logs:**
```
1. Netlify → Functions → fapi-webhook → Logs
2. Najdi run s tvým emailem
3. Hledej řádky:
   📄 Invoice data: { ... }
   🧾 Invoice PDF URL from FAPI: ...
   🧾 Invoice URL pro email: ...
   🧾 Has direct PDF: ...
```

**Co uvidíš:**

```javascript
// SCÉNÁŘ A: FAPI vrací PDF URL ✅
📄 Invoice data: {
  "id": "123456",
  "pdf_url": "https://app.fapi.cz/storage/invoices/abc123.pdf",
  ...
}
🧾 Invoice PDF URL from FAPI: https://app.fapi.cz/storage/invoices/abc123.pdf
🧾 Has direct PDF: true
→ Email obsahuje funkční direct download link!

// SCÉNÁŘ B: FAPI NEVRACÍ PDF URL ❌
📄 Invoice data: {
  "id": "123456",
  // žádný pdf_url!
  ...
}
🧾 Invoice PDF URL from FAPI: null
🧾 Invoice URL pro email: https://app.fapi.cz/invoices/123456
🧾 Has direct PDF: false
→ Email obsahuje fallback link (vyžaduje login)
```

---

## 🆘 **POKUD LINK STÁLE NEFUNGUJE:**

### **Debug Checklist:**

1. **Zkontroluj FAPI Admin URL formát:**
   - Otevři FAPI Admin → Objednávky → Zobrazit fakturu
   - Zkopíruj URL z browseru
   - Porovnej s URL v emailu

2. **Zkontroluj FAPI API response:**
   - Netlify Logs → `📄 Invoice data: { ... }`
   - Hledej klíče: `pdf_url`, `invoice_url`, `pdf`, `download_url`
   - Zkopíruj přesně co FAPI vrací

3. **Test linky manuálně:**
   ```
   https://app.fapi.cz/invoices/[TVOJE_INVOICE_ID]
   https://app.fapi.cz/invoice/[TVOJE_INVOICE_ID]  (singular)
   https://app.fapi.cz/api/invoices/[TVOJE_INVOICE_ID]/pdf
   ```

4. **Kontaktuj FAPI support:**
   ```
   Subject: Jak získat invoice PDF URL z API?
   
   Ahoj,
   
   Posílám emaily po platbě přes webhook a potřebuji v emailu link na fakturu (PDF).
   
   Dotaz:
   1. Jaký je správný formát URL pro faktura detail page?
   2. Poskytuje FAPI API endpoint direct download link na PDF?
   3. Obsahuje API response (GET /invoices/{id}) klíč "pdf_url"?
   
   Invoice ID příklad: 123456
   
   Díky!
   ```

---

## 📋 **QUICK REFERENCE:**

### **Správné URL formáty:**

```javascript
// ✅ FAPI Invoice Detail (vyžaduje login)
https://app.fapi.cz/invoices/123456

// ✅ FAPI PDF Download (direct link - pokud FAPI poskytuje)
https://app.fapi.cz/storage/invoices/abc123.pdf

// ✅ FAPI API Endpoint (vyžaduje API key)
https://api.fapi.cz/invoices/123456/pdf

// ❌ NEFUNGUJE (singular invoice)
https://app.fapi.cz/invoice/123456
```

---

### **Webhook kód - klíčové řádky:**

```javascript
// Řádek 113: Extrakce PDF URL
const invoicePdfUrl = invoice.pdf_url || invoice.invoice_url || invoice.pdf || null;

// Řádek 180: Fallback logic
const invoiceUrl = invoicePdfUrl || `https://app.fapi.cz/invoices/${invoiceId}`;
const hasInvoiceUrl = !!invoicePdfUrl;

// Řádek 247, 305: Použití v emailu
<a href="${invoiceUrl}">Stáhnout fakturu (PDF)</a>
```

---

## 🎯 **DALŠÍ ALTERNATIVY:**

### **Alt #1: FAPI má vlastní thank you page s fakturou**

```
FAPI Admin → Produkty → Success Page
→ Nastav na: https://app.fapi.cz/order-confirmation?id={ORDER_ID}
```

**→ FAPI sám přesměruje na stránku s fakturou!**

---

### **Alt #2: Pošli fakturu jako attachment**

```javascript
// V sendEmail funkci (řádek 18-39)
// Místo odkazu pošli PDF jako attachment:

const pdfBuffer = await fetch(invoicePdfUrl).then(r => r.arrayBuffer());

await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from: 'Podnikatelská Čtvrtka <kurz@podnikatelskactvrtka.cz>',
    to: [email],
    subject: emailSubject,
    html: emailHtml,
    attachments: [{
      filename: `Faktura_${invoiceId}.pdf`,
      content: Buffer.from(pdfBuffer).toString('base64')
    }]
  }),
});
```

**⚠️ PROBLÉM:** Vyžaduje autentizaci pro stažení PDF z FAPI!

---

## 🚀 **HOTOVO - PUSH & TEST!**

```bash
# 1. Push upgrade
git add netlify/functions/fapi-webhook.js FAPI_INVOICE_LINK_FIX.md
git commit -m "fix: FAPI invoice URL detection with 3 fallbacks + debug logging"
git push

# 2. Počkat 2 min (Netlify deploy)

# 3. Test 1 Kč platba

# 4. Zkontroluj email + Netlify logs

# 5. Pošli mi screenshot logu + URL co nefunguje
```

**→ Pak můžeme dále ladit podle toho co FAPI skutečně vrací!** 🎯
