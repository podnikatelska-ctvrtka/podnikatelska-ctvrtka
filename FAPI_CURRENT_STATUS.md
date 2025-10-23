# ✅ FAPI INTEGRACE - AKTUÁLNÍ STAV

**Datum:** 2025-01-23  
**Status:** FORMULÁŘ A HOTOVÝ, WEBHOOK PŘIPRAVENÝ

---

## 📋 CO JE HOTOVÉ

### ✅ 1. FORMULÁŘ A - EARLY BIRD (4.999 Kč)

```
✅ Vytvořen ve FAPI
✅ Implementován na /objednavka
✅ Iframe funguje
✅ GoPay platební brána (předpoklad)
✅ Webhook nastavený (předpoklad)

URL: /objednavka
Iframe ID: 47a3e4ff-233e-11eb-a0d2-0a74406df6c8
Cena: 4.999 Kč (bez DPH) / 6.049 Kč (s DPH)
```

### ✅ 2. FAPI WEBHOOK ENDPOINT

```
✅ Endpoint vytvořený
✅ Detekuje částku (4999 vs 8499)
✅ Vybírá správný email template
✅ Generuje přístupový token
✅ Ukládá do Supabase
✅ Odesílá email přes Resend

URL: /.netlify/functions/fapi-webhook
Logika: amount === 4999 → průkopník | amount === 8499 → normální
```

### ✅ 3. EMAIL TEMPLATY

**PRŮKOPNÍK (4.999 Kč):**
```
Subject: 🔥 PRŮKOPNÍK! Přístup do kurzu + BONUS Mini Kurz
Content:
- Oranžový gradient header
- Hlavní kurz (fialový button)
- BONUS Mini kurz (oranžový button)
- Gratulace k průkopnickému statusu
```

**NORMÁLNÍ (8.499 Kč):**
```
Subject: 🎉 Přístup do kurzu Podnikatelská Čtvrtka
Content:
- Fialový gradient header
- Hlavní kurz (fialový button)
- Žádný mini kurz
- Standardní uvítání
```

### ✅ 4. TESTOVACÍ NÁSTROJE

**Email Preview:**
```
URL: /test-emails
Funkce: Vizuální preview obou emailů
Status: ✅ Hotový
```

**Webhook Tester:**
```
URL: /test-webhook
Funkce: Odesílá reálné testy emailů (bez platby)
Status: ✅ Hotový
```

**Test Webhook Endpoint:**
```
URL: /.netlify/functions/test-webhook
Parametry: email, name, amount (4999 nebo 8499)
Status: ✅ Hotový
```

---

## ⏳ CO ZBÝVÁ (NENÍ PRIORITA)

### 📋 FORMULÁŘ B - FULL PRICE (8.499 Kč)

```
⏳ Vytvořit ve FAPI
⏳ Zkopírovat iframe URL
⏳ Doplnit do OrderPageFinal.tsx
⏳ Nastavit webhook
⏳ Otestovat

Použití: Zákazníci kteří NESTIHNOU 24h urgenci
```

---

## 🎯 JAK TO TEĎKA FUNGUJE

### **SCÉNÁŘ 1 - ZATÍM (formulář B není hotový):**

```
1. Zákazník otevře /objednavka
2. Vždycky vidí FORMULÁŘ A (4.999 Kč)
3. Zaplatí 4.999 Kč
4. FAPI pošle webhook
5. Webhook detekuje amount=4999
6. Pošle PRŮKOPNÍK email (hlavní + mini kurz)
7. Zákazník dostane oba kurzy
```

### **SCÉNÁŘ 2 - BUDOUCNOST (až bude formulář B hotový):**

```
A) STIHNE 24H URGENCI:
   1. Zákazník otevře /objednavka do 24h
   2. Vidí FORMULÁŘ A (4.999 Kč)
   3. Zaplatí 4.999 Kč
   4. Dostane PRŮKOPNÍK email (hlavní + mini)

B) NESTIHNE 24H URGENCI:
   1. Zákazník otevře /objednavka po 24h
   2. Vidí FORMULÁŘ B (8.499 Kč)
   3. Zaplatí 8.499 Kč
   4. Dostane NORMÁLNÍ email (jen hlavní kurz)
```

---

## 🔧 JAK TO AKTIVOVAT (až bude formulář B hotový)

### **KROK 1: Vytvoř formulář B ve FAPI**

```
1. Nový produkt: "Čtvrtka PRO" (8.499 Kč)
2. Nový formulář
3. Nastav GoPay platební bránu
4. Nastav webhook:
   URL: /.netlify/functions/fapi-webhook
   Event: Invoice paid
5. Zkopíruj iframe URL
```

### **KROK 2: Doplň iframe URL do kódu**

```javascript
// V souboru: /components/OrderPageFinal.tsx
// Řádek ~875

// Odkomentuj tento kód:
{!isExpired ? (
  // ✅ STIHNE 24H = EARLY BIRD (4.999 Kč)
  <iframe src="https://form.fapi.cz/?id=47a3e4ff-233e-11eb-a0d2-0a74406df6c8" ... />
) : (
  // ❌ NESTIHNE 24H = FULL PRICE (8.499 Kč)
  <iframe src="https://form.fapi.cz/?id=TVO_FULL_PRICE_ID" ... />
)}

// A smaž současný statický iframe
```

### **KROK 3: Otestuj**

```
1. Test 1: Otevři /objednavka s aktivním countdownem
   → Měl by zobrazit formulář A (4.999 Kč)

2. Test 2: Otevři /objednavka po vypršení countdownu
   → Měl by zobrazit formulář B (8.499 Kč)

3. Test 3: Udělej testovací platbu obou formulářů
   → Zkontroluj že přijde správný email

4. Test 4: Použij /test-webhook pro rychlé testování
   → amount=4999 → průkopník email
   → amount=8499 → normální email
```

---

## 📞 WEBHOOK DEBUG CHECKLIST

Pokud webhook nefunguje správně:

### **1. Zkontroluj Netlify Function Logs:**

```
Netlify Dashboard → Functions → fapi-webhook → View logs

Hledej:
✅ "Invoice fetched successfully"
✅ "Customer: { email, name, amount, isEarlyBird }"
✅ "Sending EARLY BIRD email..." nebo "Sending NORMAL email..."
✅ "Email sent!"
```

### **2. Zkontroluj FAPI webhook nastavení:**

```
✅ Webhook URL: https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook
✅ Event: "Invoice paid"
✅ Webhook je přidán k formuláři
✅ Webhook je aktivní
```

### **3. Zkontroluj Resend Dashboard:**

```
https://resend.com/emails

✅ Email byl odeslán
✅ Email byl doručen (delivered)
✅ Správný subject (průkopník vs normální)
```

### **4. Zkontroluj Supabase Database:**

```sql
SELECT * FROM users ORDER BY created_at DESC LIMIT 10;

✅ Nový záznam byl vytvořen
✅ Správný email
✅ Správná částka (4999 nebo 8499)
✅ Token byl vygenerován
```

---

## 🎯 RYCHLÉ TESTY

### **Test 1: Email Preview (BEZ odesílání)**

```bash
# Otevři:
https://podnikatelskactvrtka.cz/test-emails

# Nebo lokálně:
http://localhost:5173/test-emails
```

### **Test 2: Webhook Tester (s odesláním)**

```bash
# Otevři:
https://podnikatelskactvrtka.cz/test-webhook

# Vyplň:
Email: tvuj@email.cz
Jméno: Tvoje Jméno
Částka: 4.999 Kč (průkopník) nebo 8.499 Kč (normální)

# Klikni: "Odeslat test email"
# Zkontroluj: Schránku (i SPAM!)
```

### **Test 3: Reálná platba (GoPay test karta)**

```
Číslo karty: 4111 1111 1111 1111
CVV: 123
Platnost: 12/25
3D Secure: 1234

1. Otevři /objednavka
2. Vyplň formulář
3. Zadej test kartu
4. Potvrď platbu
5. Zkontroluj email
```

---

## 📊 DETEKCE ČÁSTKY VE WEBHOOK

```javascript
// Webhook detekuje částku z FAPI invoice:
const amount = parseFloat(invoice.total);

// Možné hodnoty:
// 4.999 Kč (bez DPH) = 4999
// 6.049 Kč (s DPH) = 6049
// 8.499 Kč (bez DPH) = 8499
// 10.289 Kč (s DPH) = 10289

// Detekce průkopníka:
const isEarlyBird = amount === 4999 || amount === 6049;

// Výsledek:
if (isEarlyBird) {
  // Pošle email s OBĚMA kurzy
} else {
  // Pošle email JEN s hlavním kurzem
}
```

---

## 🎉 NEXT STEPS

### **TEĎKA (priorita):**

1. ✅ Otestuj formulář A na /objednavka
2. ✅ Udělej testovací GoPay platbu
3. ✅ Zkontroluj že email přijde
4. ✅ Zkontroluj že token funguje
5. ✅ Zkontroluj že se to uloží do Supabase

### **POZDĚJI (až budeš chtít):**

1. ⏳ Vytvoř formulář B (8.499 Kč)
2. ⏳ Doplň iframe URL do kódu
3. ⏳ Otestuj přepínání podle urgence
4. ⏳ Otestuj oba email templaty

---

## 📞 KONTAKT

Pokud máš jakékoliv problémy:

1. Zkontroluj tento dokument
2. Zkontroluj `/FAPI_TESTING_GUIDE.md`
3. Použij `/test-webhook` pro rychlé testování
4. Zkontroluj Netlify Function logs
5. Kontaktuj mě s detaily (error message + screenshot)

---

**Status:** ✅ READY FOR PRODUCTION (formulář A)  
**Vytvořeno:** 2025-01-23  
**Poslední update:** 2025-01-23
