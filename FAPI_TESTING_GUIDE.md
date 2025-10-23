# 🧪 FAPI WEBHOOK TESTING GUIDE

## 📋 PŘEHLED

Máme **2 FAPI formuláře** a **1 webhook endpoint** který detekuje částku a posílá správný email.

---

## 🎯 DVA FAPI FORMULÁŘE

### FORMULÁŘ A - EARLY BIRD (4.999 Kč)
```
Produkt: Čtvrtka PRO - Early Bird
Cena: 4.999 Kč (bez DPH)
Zobrazí se: Když zákazník stihne 24h urgenci
Email: 🔥 Průkopník + hlavní kurz + BONUS mini kurz
```

### FORMULÁŘ B - FULL PRICE (8.499 Kč)
```
Produkt: Čtvrtka PRO
Cena: 8.499 Kč (bez DPH)
Zobrazí se: Když zákazník NESTIHNE 24h urgenci
Email: 🎉 Normální zákazník + JEN hlavní kurz
```

---

## 🔧 JAK WEBHOOK FUNGUJE

```javascript
// 1. FAPI pošle webhook notifikaci
POST /.netlify/functions/fapi-webhook
Body: id=INVOICE_ID

// 2. Webhook si stáhne fakturu z FAPI API
GET https://api.fapi.cz/invoices/{INVOICE_ID}

// 3. Webhook detekuje částku
const amount = parseFloat(invoice.total);
const isEarlyBird = amount === 4999 || amount === 6049;

// 4. Webhook vybere správný email template
if (isEarlyBird) {
  // Pošle email s OBĚMA kurzy (hlavní + mini)
} else {
  // Pošle email JEN s hlavním kurzem
}
```

---

## 🧪 TESTOVÁNÍ - 3 METODY

### **METODA 1: Email Preview (bez odesílání)**

**URL:** `https://podnikatelskactvrtka.cz/test-emails`

**Co uvidíš:**
- ✅ Vizuální preview OBOU emailů side-by-side
- ✅ Můžeš přepínat mezi průkopník / normální
- ✅ Vidíš přesně jak budou vypadat
- ❌ Email se NEODESÍLÁ

**Použití:**
```
1. Otevři: /test-emails
2. Klikni na "PRŮKOPNÍK" nebo "NORMÁLNÍ ZÁKAZNÍK"
3. Prohlédni si email v preview
```

---

### **METODA 2: Test Webhook (reálné odeslání emailu)**

**URL:** `https://podnikatelskactvrtka.cz/test-webhook`

**Co to dělá:**
- ✅ Simuluje FAPI webhook
- ✅ Odesílá REÁLNÝ email přes Resend
- ✅ Můžeš testovat BEZ platby
- ✅ Generuje testovací token

**Použití:**
```
1. Otevři: /test-webhook
2. Vyber částku: 4.999 Kč nebo 8.499 Kč
3. Zadej svůj testovací email
4. Zadej testovací jméno
5. Klikni "Odeslat test email"
6. Zkontroluj schránku (včetně SPAMu)
```

**Endpoint:**
```
POST /.netlify/functions/test-webhook

Parametry:
- email: test@example.com
- name: Jan Novák
- amount: 4999 nebo 8499

Response:
{
  "success": true,
  "emailType": "EARLY_BIRD" | "NORMAL",
  "sentTo": "test@example.com",
  "subject": "...",
  "accessToken": "TEST-...",
  "emailId": "..."
}
```

---

### **METODA 3: Reálný FAPI test (s GoPay platbou)**

**⚠️ POZOR:** Toto je PRODUKČNÍ test!

**Postup:**
```
1. Vytvoř 2 FAPI formuláře (4.999 Kč a 8.499 Kč)
2. Nastav GoPay platební bránu
3. Nastav webhook URL:
   https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook
4. Nastav webhook event: "Invoice paid"
5. Použij GoPay TEST KARTU pro testovací platbu
6. Po zaplacení se spustí webhook a pošle email
```

**GoPay Test karty:**
```
Číslo: 4111 1111 1111 1111
CVV: 123
Platnost: Jakýkoliv budoucí datum
3D Secure: 1234
```

---

## 📧 EMAIL TEMPLATES

### **PRŮKOPNÍK EMAIL (4.999 Kč)**
```
Subject: 🔥 PRŮKOPNÍK! Přístup do kurzu + BONUS Mini Kurz

Header: 🔥 PRŮKOPNÍK! Vítejte v kurzu! (oranžový gradient)

Content:
- 🚀 GRATULUJEME! Jste mezi průkopníky!
- 📚 HLAVNÍ KURZ - Podnikatelská Čtvrtka
  [Vstoupit do hlavního kurzu] (fialový button)
- 🎁 BONUS PRO PRŮKOPNÍKY - Mini Kurz
  [Vstoupit do mini kurzu] (oranžový button)
```

### **NORMÁLNÍ EMAIL (8.499 Kč)**
```
Subject: 🎉 Přístup do kurzu Podnikatelská Čtvrtka

Header: 🎉 Vítejte v kurzu! (fialový gradient)

Content:
- Děkujeme za zakoupení kurzu
- 🔑 Váš přístupový odkaz:
  [Vstoupit do kurzu] (fialový button)
- (ŽÁDNÝ mini kurz)
```

---

## ✅ CHECKLIST PRO NASAZENÍ

### **VE FAPI:**
- [ ] Vytvořit PRODUKT A: "Čtvrtka PRO - Early Bird" (4.999 Kč)
- [ ] Vytvořit formulář pro PRODUKT A
- [ ] Zkopírovat iframe URL pro PRODUKT A
- [ ] Vytvořit PRODUKT B: "Čtvrtka PRO" (8.499 Kč)
- [ ] Vytvořit formulář pro PRODUKT B
- [ ] Zkopírovat iframe URL pro PRODUKT B
- [ ] Nastavit webhook URL: `https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook`
- [ ] Nastavit webhook event: "Invoice paid"
- [ ] Přidat webhook k OBĚMA formulářům
- [ ] Nastavit GoPay platební bránu (obě formuláře)

### **V KÓDU (OrderPageFinal.tsx):**
- [ ] Nahradit `EARLY_BIRD_FORM_ID` v iframe src
- [ ] Nahradit `FULL_PRICE_FORM_ID` v iframe src

### **TESTOVÁNÍ:**
- [ ] Test 1: Email preview (/test-emails)
- [ ] Test 2: Test webhook (/test-webhook) - průkopník
- [ ] Test 3: Test webhook (/test-webhook) - normální
- [ ] Test 4: Reálná platba s GoPay test kartou (4.999 Kč)
- [ ] Test 5: Reálná platba s GoPay test kartou (8.499 Kč)

---

## 🔍 DEBUGGING

### **Jak zkontrolovat, že webhook funguje?**

1. **Netlify Functions Logs:**
   ```
   Netlify Dashboard → Functions → fapi-webhook → View logs
   
   Hledej:
   ✅ "Invoice fetched successfully"
   ✅ "Customer: { email, name, amount, isEarlyBird }"
   ✅ "Sending EARLY BIRD email..." nebo "Sending NORMAL email..."
   ✅ "Email sent!"
   ```

2. **Resend Dashboard:**
   ```
   https://resend.com/emails
   
   Zkontroluj:
   ✅ Email byl odeslán
   ✅ Email byl doručen (delivered)
   ✅ Správný subject (průkopník vs normální)
   ```

3. **Supabase Database:**
   ```sql
   SELECT * FROM users ORDER BY created_at DESC LIMIT 10;
   
   Zkontroluj:
   ✅ Nový záznam byl vytvořen
   ✅ Správný email
   ✅ Správná částka (4999 nebo 8499)
   ✅ Token byl vygenerován
   ```

### **Časté problémy:**

**Problém:** Webhook se nespustil
```
Řešení:
1. Zkontroluj webhook URL ve FAPI
2. Zkontroluj webhook event ("Invoice paid")
3. Zkontroluj že webhook je přidán k formuláři
```

**Problém:** Email nepřišel
```
Řešení:
1. Zkontroluj SPAM složku
2. Zkontroluj Resend dashboard (delivery status)
3. Zkontroluj Netlify Function logs (error?)
```

**Problém:** Přišel špatný email template
```
Řešení:
1. Zkontroluj částku v FAPI faktury
2. Zkontroluj detekci v webhook logs: "isEarlyBird: true/false"
3. Zkontroluj že DPH je správně (4.999 bez DPH = 6.049 s DPH)
```

---

## 🎯 RYCHLÝ START

**Pro okamžité testování:**

```bash
# 1. Otevři email preview
https://podnikatelskactvrtka.cz/test-emails

# 2. Otevři webhook tester
https://podnikatelskactvrtka.cz/test-webhook

# 3. Zadej svůj email
email: tvuj@email.cz
name: Tvoje Jméno
amount: 4999

# 4. Klikni "Odeslat test email"

# 5. Zkontroluj schránku!
```

---

## 📞 KONTAKT NA PODPORU

Pokud máš problémy s testováním:

1. Zkontroluj tento guide
2. Zkontroluj Netlify Function logs
3. Zkontroluj Resend dashboard
4. Zkontroluj Supabase database
5. Kontaktuj mě s detaily (error message + screenshot)

---

**Vytvořeno:** 2025-01-23  
**Poslední update:** 2025-01-23  
**Status:** ✅ READY FOR TESTING
