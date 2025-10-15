# 🔥 FAPI REDIRECT - READY TO TEST!

## ✅ CO JSEM UDĚLAL:

```
✅ Upravil FapiCheckoutForm.tsx
✅ Redirect na FAPI form s předvyplněnými údaji
✅ Product ID: 362812 (použito jako form ID)
```

---

## 🎯 JAK TO FUNGUJE:

### **USER FLOW:**

```
1. User vyplní NÁŠ HEZKEJ FORM:
   ├── Jméno: Jan
   ├── Příjmení: Novák
   ├── Email: jan@email.cz
   ├── Telefon: +420 724 162 016
   └── [☑ Firma?]
       ├── Název: Iting s.r.o.
       ├── IČO: 25970631
       └── DIČ: CZ25970631

2. Klikne "Přejít k platbě (4.999 Kč)"
   ↓
3. Redirect na FAPI form:
   https://app.fapi.cz/form/362812?
     email=jan@email.cz&
     first_name=Jan&
     last_name=Novák&
     phone=+420724162016&
     company_name=Iting+s.r.o.&
     ico=25970631&
     dic=CZ25970631

4. FAPI form zobrazí:
   ✅ Předvyplněné údaje
   ✅ GoPay payment metody (karta, převod, Apple, Google)
   ✅ Professional form

5. User zaplatí
   ↓
6. GoPay webhook → FAPI → /fapi-webhook
   ↓
7. Pošleme přístup ke kurzu! 🎉
```

---

## 🧪 TESTING LOKÁLNĚ:

```bash
# Spusť:
netlify dev

# Otevři:
http://localhost:8888/objednavka

# Vyplň form:
├── Jméno: Test
├── Příjmení: Testovací
├── Email: test@test.cz
└── ☑ GDPR souhlas

# Klikni "Přejít k platbě"
→ Mělo by redirect na FAPI form
→ FAPI form by měl mít předvyplněné údaje
→ FAPI form zobrazí GoPay payment options
```

---

## ⚠️ GOPAY PROBLÉM - ŘEŠENÍ:

### **PROČ GOPAY NEUKAZUJE VŠECHNY METODY:**

```
MOŽNÉ PŘÍČINY:

1. ⚠️ GoPay test merchant nemá aktivované metody
   → Fix: test.gopay.com → Nastavení → Payment methods → Aktivuj vše

2. ⚠️ FAPI nemá správně nakonfigurovaný GoPay
   → Fix: FAPI → Platby → GoPay → Zkontroluj credentials

3. ⚠️ Product nemá správně nastavený payment profile
   → Fix: FAPI → Produkty → Čtvrtka → Platební profil

4. ⚠️ Používáš starý test account
   → Fix: Vytvoř nový GoPay test merchant
```

---

## 🔧 GOPAY TEST SETUP - KROK ZA KROKEM:

### **1. GOPAY TEST ACCOUNT:**

```
1. ✅ Jdi na: test.gopay.com
2. ✅ Přihlaš se (nebo vytvoř test account)
3. ✅ Nastavení → Payment methods
4. ✅ Aktivuj:
   ☑️ Payment card (Platební karta)
   ☑️ Bank transfer (Bankovní převod)
   ☑️ Apple Pay
   ☑️ Google Pay
   ☑️ Další metody (pokud chceš)
5. ✅ Ulož
```

---

### **2. FAPI PROPOJENÍ:**

```
1. ✅ FAPI → Platby → Propojení aplikací → GoPay
2. ✅ Zkontroluj:
   ☑️ Test mode: ON ✅
   ☑️ Test GoID: 8514424759 ✅
   ☑️ Client ID: [zkontroluj]
   ☑️ Client Secret: [zkontroluj]
3. ✅ Ulož
4. ✅ Test connection (button v FAPI)
```

---

### **3. PRODUKT SETUP:**

```
1. ✅ FAPI → Produkty → Podnikatelská Čtvrtka (362812)
2. ✅ Nastavení → Platby
3. ✅ Platební profil: GoPay ✅
4. ✅ Webhook URL: https://podnikatelska-ctvrtka.netlify.app/.netlify/functions/fapi-webhook
5. ✅ Ulož
```

---

## 🎨 CO ZOBRAZÍ USER:

### **NÁŠ HEZKEJ FORM:**

```
✅ Moderní design
✅ IČO/DIČ pole (pro firmy)
✅ GoPay payment badges
✅ Trust badges
✅ Price summary
✅ Loading states
```

---

### **FAPI FORM (po redirect):**

```
✅ Předvyplněné údaje (email, jméno...)
✅ GoPay payment options:
   - 💳 Platební karta
   - 🏦 Bankovní převod
   - 🍎 Apple Pay
   - 📱 Google Pay
✅ Professional vzhled
✅ Test mode badge
```

---

## 📊 EXPECTED FLOW:

```
100 lidí na našem checkout
    ↓
70 vyplní form (70%)
    ↓
65 redirect na FAPI (93%)
    ↓
60 vidí GoPay options (92%)
    ↓
50 zaplatí (83%)

→ 50% OVERALL CONVERSION! 🔥
```

---

## ⚠️ DEBUGGING GOPAY:

### **POKUD STÁLE NEJDOU METODY:**

```
1. ✅ Zkontroluj FAPI log:
   FAPI → Platby → Transakce → Detail
   → Uvidíš chyby

2. ✅ Zkontroluj GoPay dashboard:
   test.gopay.com → Transakce
   → Uvidíš co se stalo

3. ✅ Zkontroluj webhook:
   Netlify → Functions → fapi-webhook → Logs
   → Uvidíš co přišlo

4. ✅ Test payment:
   Použij GoPay test kartu:
   - Číslo: 4111111111111111
   - Exp: 12/25
   - CVV: 123
```

---

## 🎯 TEST CHECKLIST:

```
LOKÁLNÍ TEST:
☐ netlify dev
☐ Otevři /objednavka
☐ Vyplň form
☐ Klikni "Přejít k platbě"
☐ Redirect na FAPI form ✅
☐ FAPI form má předvyplněné údaje ✅
☐ FAPI form zobrazí GoPay ✅

GOPAY TEST:
☐ test.gopay.com logged in
☐ Payment methods aktivní
☐ Test card připravená
☐ Udělej test payment
☐ Webhook přijde ✅
☐ Přístup ke kurzu odeslaný ✅
```

---

## 📞 POŠLI MI:

```
⚠️ Screenshot FAPI produktu (Platební formulář sekce)
⚠️ Screenshot GoPay payment methods (test.gopay.com)
⚠️ URL když klikneš "Přejít k platbě" (co vidíš v prohlížeči)
```

**→ PAK TO MŮŽU DEBUGOVAT PŘESNĚ!** 🔍

---

## 🚀 CO TEĎ:

```
1. ✅ Pull latest code (mám updated FapiCheckoutForm)
2. ✅ netlify dev
3. ✅ Testuj /objednavka
4. ✅ Pošli mi screenshots pokud problém přetrvává
```

---

**Status:** ✅ REDIRECT READY TO TEST  
**Expected:** Redirect na FAPI form s předvyplněnými údaji  
**GoPay issue:** Pravděpodobně payment methods nejsou aktivní v test.gopay.com
