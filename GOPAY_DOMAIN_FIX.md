# 🔧 GOPAY DOMAIN FIX - ŘEŠENÍ PROBLÉMU

## ⚠️ PROBLÉM:

```
❌ GoPay credentials nastavené pro STAROU doménu
❌ Nová doména: podnikatelska-ctvrtka.netlify.app
❌ GoPay blokuje platby z jiné domény
❌ Proto se neukazují všechny platební metody

→ MUSÍME PŘIDAT NOVOU DOMÉNU DO GOPAY!
```

---

## ✅ ŘEŠENÍ: PŘIDAT DOMÉNU DO GOPAY

### **METODA 1: V GOPAY TEST ACCOUNT (DOPORUČENO)**

```
1. ✅ Jdi na: https://test.gopay.com
2. ✅ Přihlaš se (GoID: 8514424759)
3. ✅ Nastavení → Integrace
4. ✅ Hledej sekci:
   - "Povolené domény" nebo
   - "Allowed domains" nebo
   - "Return URLs" nebo
   - "Notification URLs"

5. ✅ Přidej tyto domény:
   ☐ https://podnikatelska-ctvrtka.netlify.app
   ☐ http://localhost:8888
   ☐ http://localhost:3000
   ☐ https://form.fapi.cz (pokud není)

6. ✅ Ulož

7. ✅ Testuj znovu:
   netlify dev
   → http://localhost:8888/objednavka
   → Vyplň form
   → Redirect na FAPI
   → FAPI by měl ukázat všechny GoPay metody!
```

---

### **METODA 2: V FAPI NASTAVENÍ**

```
1. ✅ FAPI → Platby → Propojení aplikací → GoPay
2. ✅ Klikni na GoPay nastavení (tužka/upravit)
3. ✅ Hledej pole:
   - "Return URL" nebo
   - "Notification URL" nebo
   - "Webhook URL"

4. ✅ Zkontroluj že jsou nastavené na:
   Return URL:
   https://podnikatelska-ctvrtka.netlify.app/uspesna-platba
   (nebo cokoli FAPI používá)

   Notification URL:
   https://form.fapi.cz/webhook/gopay
   (nebo podobné - FAPI to spravuje automaticky)

5. ✅ Ulož
6. ✅ Klikni "Test connection" (pokud je button)
7. ✅ Testuj znovu
```

---

### **METODA 3: ZKONTROLOVAT FAPI PRODUKT**

```
1. ✅ FAPI → Produkty → Podnikatelská Čtvrtka (362812)
2. ✅ Nastavení → Platby
3. ✅ Zkontroluj:
   ☐ Platební profil: GoPay test ✅
   ☐ Webhook URL: správná nová doména ✅

4. ✅ Klikni "Upravit" u GoPay platebního profilu
5. ✅ Zkontroluj domény
6. ✅ Ulož
```

---

## 🔍 CO PŘESNĚ HLEDAT V GOPAY:

### **PRAVDĚPODOBNÉ NÁZVY SEKCÍ:**

```
GoPay test account → Nastavení:

Možné názvy:
- "Integrace" / "Integration"
- "API nastavení" / "API settings"
- "Povolené domény" / "Allowed domains"
- "Return URLs"
- "Notification URLs"
- "Webhook URLs"
- "Bezpečnost" / "Security"
- "OAuth redirect URIs"

Hledej seznam domén kde by měla být stará doména.
Přidej novou doménu nebo změň starou.
```

---

## 📊 JAK POZNAT ŽE TO FUNGUJE:

### **PŘED OPRAVOU:**

```
FAPI form:
├── GoPay sekce
└── Pouze 1-2 platební metody (nebo error)
```

---

### **PO OPRAVĚ:**

```
FAPI form:
├── GoPay sekce
├── 💳 Platební karta ✅
├── 🏦 Bankovní převod ✅
├── 🍎 Apple Pay ✅
├── 📱 Google Pay ✅
└── Další metody (pokud aktivované) ✅
```

---

## 🧪 TESTING FLOW:

```
1. ✅ Změň domény v GoPay (Metoda 1)
2. ✅ Počkej 1-2 minuty (propagace)
3. ✅ Vyčisti cache v prohlížeči (Ctrl+Shift+Del)
4. ✅ Restartuj netlify dev:
   Ctrl+C (stop)
   netlify dev (start znovu)
5. ✅ Otevři: http://localhost:8888/objednavka
6. ✅ Vyplň form
7. ✅ Klikni "Přejít k platbě"
8. ✅ Redirect na FAPI form
9. ✅ Scroll dolů k platební sekci
10. ✅ Měly by se ukázat všechny GoPay metody! 🎉
```

---

## ⚠️ POKUD STÁLE NEFUNGUJE:

### **SCREENSHOT REQUEST:**

Pošli mi prosím screenshots:

```
1. ✅ GoPay test account → Nastavení → Integrace
   (celá stránka, chci vidět všechny sekce)

2. ✅ FAPI → Platby → GoPay nastavení
   (celé nastavení GoPay profilu)

3. ✅ FAPI form po redirectu
   (sekce s platebními metodami)

4. ✅ Chrome DevTools → Console (F12)
   (když jsi na FAPI formu, koukni na errory)

5. ✅ Chrome DevTools → Network (F12)
   (filter: "gopay" nebo "payment")
```

**→ S TĚMITO SCREENSHOTY TO VYŘEŠÍM PŘESNĚ!** 🔍

---

## 💡 ALTERNATIVNÍ ŘEŠENÍ (QUICK FIX):

### **POKUD NEJDE ZMĚNIT DOM��NY:**

Můžeme použít FAPI iframe přístup místo redirectu:

```typescript
// Quick fix: Použít FAPI iframe místo redirectu
// V FapiCheckoutForm.tsx:

// Místo redirect na FAPI form:
window.location.href = fapiFormUrl;

// Použij FAPI iframe:
<iframe 
  src="https://form.fapi.cz/?id=47a3e4ff-233e-11eb-a0d2-0a74406df6c8"
  style="width: 100%; height: 800px; border: none;"
/>
```

**Ale preferuji OPTION 1 (změnit domény)!** ✅

---

## 🎯 SUMMARY:

```
PROBLÉM:
❌ GoPay credentials pro starou doménu
❌ Neukazuje všechny platební metody

ŘEŠENÍ:
1. ✅ test.gopay.com → Nastavení → Integrace
2. ✅ Přidat: podnikatelska-ctvrtka.netlify.app
3. ✅ Přidat: localhost:8888 (pro test)
4. ✅ Ulož
5. ✅ Testuj znovu

EXPECTED:
✅ FAPI form ukáže všechny GoPay metody
✅ Platba bude fungovat
✅ Webhook přijde
✅ Email s přístupem odešle
```

---

## 📞 POTŘEBUJU OD TEBE:

```
1. ✅ Zkus Metodu 1 (přidat domény v GoPay)
2. ✅ Řekni mi jestli najdeš sekci "Povolené domény"
3. ✅ Pokud ne, pošli screenshot GoPay nastavení
4. ✅ Pak to společně vyřešíme!
```

---

## 🚀 NEXT STEPS:

```
1. ✅ Oprav domény v GoPay
2. ✅ Testuj lokálně (netlify dev)
3. ✅ Testuj na Netlify (deploy)
4. ✅ Udělej test platbu
5. ✅ Ověř že webhook funguje
6. ✅ Ověř že email přijde
7. ✅ LAUNCH! 🚀
```

---

**Action:** Jdi na test.gopay.com a změň domény!  
**Time:** 5 minut  
**Expected result:** Všechny GoPay platební metody se ukážou! ✅
