# ✅ GOPAY TEST CHECKLIST

**Cíl:** Otestovat kompletní flow od platby po email s přístupem

---

## 🎯 PŘED TESTEM

### **1. Zkontroluj že máš nastavené:**

```
✅ FAPI formulář (ID: 47a3e4ff-233e-11eb-a0d2-0a74406df6c8)
✅ GoPay platební brána ve FAPI
✅ Webhook URL: /.netlify/functions/fapi-webhook
✅ Webhook event: "Invoice paid"
✅ Resend API key v ENV
✅ Supabase URL + Service Key v ENV
✅ FAPI username + API key v ENV
```

### **2. Připrav si:**

```
📧 Testovací email (tvůj email kam chceš dostat přístup)
💳 GoPay test karta:
   Číslo: 4111 1111 1111 1111
   CVV: 123
   Platnost: 12/25 (nebo jakékoliv budoucí)
   3D Secure: 1234
```

---

## 🧪 TEST FLOW

### **KROK 1: Otevři objednávkovou stránku**

```bash
# Production:
https://podnikatelskactvrtka.cz/objednavka

# Lokální test:
http://localhost:5173/objednavka
```

**Co bys měl vidět:**
- ✅ Countdown timer (pokud běží)
- ✅ FAPI iframe formulář
- ✅ Cena: 4.999 Kč (bez DPH) / 6.049 Kč (s DPH)

---

### **KROK 2: Vyplň formulář**

```
Jméno: [Tvoje jméno]
Email: [Tvůj email]
Telefon: [Tvůj telefon] (pokud je required)
Firma/IČO: [Volitelné]
```

**💡 TIP:** Použij skutečný email kam chceš dostat přístup!

---

### **KROK 3: Klikni na "Zaplatit"**

**Co se stane:**
1. Přesměrování na GoPay platební bránu
2. Zobrazí se platební metody

---

### **KROK 4: Vyber "Platební kartou"**

**Zadej test kartu:**
```
Číslo karty: 4111 1111 1111 1111
Měsíc/Rok: 12/25
CVV: 123
```

---

### **KROK 5: Potvrď platbu**

**Co se stane:**
1. 3D Secure challenge
2. Zadej kód: **1234**
3. Potvrzení platby

---

### **KROK 6: Čekej na redirect**

**Co se stane:**
1. GoPay potvrdí platbu
2. FAPI pošle webhook na /.netlify/functions/fapi-webhook
3. Webhook zpracuje platbu
4. Redirect zpět na tvůj web (thank you page)

**⏱️ Může trvat 5-30 sekund**

---

### **KROK 7: Zkontroluj email**

**Co bys měl dostat:**

```
From: Podnikatelská Čtvrtka <noreply@podnikatelskactvrtka.cz>
Subject: 🔥 PRŮKOPNÍK! Přístup do kurzu + BONUS Mini Kurz

Content:
- Oranžový gradient header
- "GRATULUJEME! Jste mezi průkopníky!"
- Button: "Vstoupit do hlavního kurzu"
- Button: "Vstoupit do mini kurzu" (BONUS)
```

**⏱️ Email by měl přijít do 5 minut**

**⚠️ NEZAPOMEŇ ZKONTROLOVAT SPAM!**

---

### **KROK 8: Klikni na odkaz v emailu**

**Co se stane:**
1. Otevře se hlavní kurz s automatickým přihlášením
2. Uvidíš dashboard kurzu
3. Máš přístup ke všem lekcím

**URL bude vypadat:**
```
https://podnikatelskactvrtka.cz/course-v3?token=XXXXX-XXXXX-XXXXX
```

---

### **KROK 9: Otestuj mini kurz**

**Klikni na druhý button v emailu:**
```
"Vstoupit do mini kurzu"
```

**Co se stane:**
1. Otevře se mini kurz
2. Uvidíš 5 interaktivních nástrojů
3. Můžeš je vyplňovat

**URL:**
```
https://podnikatelskactvrtka.cz/minikurz
```

---

## 🔍 DEBUG CHECKLIST

### **Problém: Email nepřišel**

**1. Zkontroluj SPAM složku**
```
Gmail: Složka "Spam" nebo "Hromadné"
Outlook: Složka "Nevyžádaná pošta"
Seznam: Složka "SPAM"
```

**2. Zkontroluj Resend Dashboard**
```
https://resend.com/emails

Hledej:
✅ Email byl odeslán (sent)
✅ Email byl doručen (delivered)
❌ Email byl odmítnut (rejected/bounced)
```

**3. Zkontroluj Netlify Function Logs**
```
Netlify Dashboard → Functions → fapi-webhook → View logs

Hledej:
✅ "Invoice fetched successfully"
✅ "Customer: { email: 'tvuj@email.cz', ... }"
✅ "Sending EARLY BIRD email..."
✅ "Email sent!"

❌ Chyby: "Error:", "Failed:", "❌"
```

**4. Zkontroluj Supabase Database**
```sql
SELECT * FROM users 
WHERE email = 'tvuj@email.cz' 
ORDER BY created_at DESC 
LIMIT 1;

Zkontroluj:
✅ Záznam existuje
✅ Správný email
✅ amount = 4999 nebo 6049
✅ access_token je vyplněný
```

---

### **Problém: Webhook se nespustil**

**1. Zkontroluj FAPI webhook nastavení**
```
FAPI Dashboard → Formuláře → Tvůj formulář → Webhooky

✅ Webhook URL: https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook
✅ Event: "Invoice paid" (faktura zaplacena)
✅ Status: Aktivní
```

**2. Zkontroluj že platba byla potvrzena**
```
FAPI Dashboard → Platby → Najdi svoji platbu

Status by měl být: "Zaplaceno" nebo "Paid"
```

**3. Zkontroluj FAPI webhook logy**
```
FAPI Dashboard → Webhooky → Logy

Hledej tvou platbu a zkontroluj:
✅ Webhook byl odeslán
✅ Response code: 200
❌ Response code: 4xx nebo 5xx = chyba
```

---

### **Problém: Token nefunguje**

**1. Zkontroluj že token je v URL**
```
Správně:
https://podnikatelskactvrtka.cz/course-v3?token=XXXXX

Špatně:
https://podnikatelskactvrtka.cz/course-v3
```

**2. Zkontroluj že token je v databázi**
```sql
SELECT * FROM users 
WHERE access_token = 'TOKEN_Z_URL' 
LIMIT 1;

✅ Měl by vrátit jeden záznam
❌ Prázdný výsledek = token neexistuje
```

**3. Zkontroluj browser console**
```
F12 → Console → Hledej chyby

✅ "🔐 Token valid"
❌ "Invalid token" nebo "Token not found"
```

---

## 🎯 CO TESTOVAT

### **✅ ZÁKLADNÍ TEST:**

```
1. Platba prošla
2. Email přišel
3. Token funguje
4. Přístup k hlavnímu kurzu
5. Přístup k mini kurzu
```

### **✅ POKROČILÝ TEST:**

```
6. Data v Supabase jsou správně
7. Částka v DB je 4999 nebo 6049
8. Netlify logs neobsahují chyby
9. Resend shows "delivered"
10. FAPI webhook log shows 200 OK
```

### **✅ UX TEST:**

```
11. Formulář je responzivní (mobile + desktop)
12. Platební brána funguje na mobilu
13. Email je čitelný na mobilu
14. Kurz je přístupný na mobilu
15. Mini kurz funguje na mobilu
```

---

## 🚨 ZNÁMÉ PROBLÉMY

### **1. Email jde do SPAMu**

**Řešení:**
- Normální u prvních emailů z nové domény
- Postupně se deliverability zlepší
- Zákazníci musí zkontrolovat SPAM

**Prevence:**
- Nastavit SPF, DKIM, DMARC v Resend
- Warm-up doména (posílat postupně víc emailů)

---

### **2. Webhook má zpoždění**

**Řešení:**
- GoPay může trvat 5-30 sekund než potvrdí platbu
- FAPI pak pošle webhook
- Email přijde obvykle do 1 minuty

**Akce:**
- Informuj zákazníky: "Email přijde do 5 minut"
- Dodej "Zkontrolujte SPAM"

---

### **3. 3D Secure challenge nefunguje**

**Řešení:**
- Zkus jiný browser
- Zkus vypnout adblocker
- Zkus mobilní zařízení

**Test kód pro 3D Secure:**
```
Správný kód: 1234
Chybný kód: 4321 (test failed payment)
```

---

## 📧 EMAIL PREVIEW

Chceš vidět jak email vypadá **BEZ reálné platby**?

### **Použij Webhook Tester:**

```bash
# Otevři:
https://podnikatelskactvrtka.cz/test-webhook

# Vyplň:
Email: tvuj@email.cz
Jméno: Testovací Jméno
Částka: 4.999 Kč

# Klikni: "Odeslat test email"

# Email přijde do 10 sekund!
```

### **Nebo použij Email Preview:**

```bash
# Otevři:
https://podnikatelskactvrtka.cz/test-emails

# Prohlédni si oba templaty:
- Průkopník (4.999 Kč)
- Normální (8.499 Kč)

# Email se NEODESÍLÁ, jen uvidíš preview
```

---

## 📊 METRICS K SLEDOVÁNÍ

Po testu zkontroluj:

```
✅ GoPay conversion rate (kolik % dokončí platbu)
✅ Email delivery rate (kolik % emailů dojde)
✅ Email open rate (kolik % lidí email otevře)
✅ Link click rate (kolik % klikne na kurz)
✅ Course activation rate (kolik % vstoupí do kurzu)
```

**Dobrá čísla:**
- GoPay conversion: 80-90%
- Email delivery: 95-99%
- Email open: 40-60%
- Link click: 60-80%
- Course activation: 90%+

---

## 🎉 SUCCESS CRITERIA

Test je úspěšný když:

```
✅ Platba proběhla bez chyb
✅ Email přišel do 5 minut
✅ Email má správný content (průkopník template)
✅ Token funguje (automatic login)
✅ Přístup k hlavnímu kurzu
✅ Přístup k mini kurzu (bonus)
✅ Data v Supabase jsou správně
✅ Netlify logs neobsahují chyby
✅ Vše funguje na mobile + desktop
```

---

## 📞 PODPORA

Pokud máš problémy:

1. Zkontroluj tento checklist
2. Zkontroluj `/FAPI_CURRENT_STATUS.md`
3. Zkontroluj `/FAPI_TESTING_GUIDE.md`
4. Použij `/test-webhook` pro rychlé testování
5. Zkontroluj Netlify Function logs
6. Kontaktuj mě s detaily

---

**Hodně štěstí s testem! 🚀**

**Status:** ✅ READY FOR TESTING  
**Vytvořeno:** 2025-01-23
