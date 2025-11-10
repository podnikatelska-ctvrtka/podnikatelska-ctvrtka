# 🚨 TODO PO TESTOVÁNÍ KURZU

## ⚠️ KRITICKÉ - PŘED SPUŠTĚNÍM OSTRÉHO PROVOZU!

---

## 1️⃣ **ZMĚNIT CENY VE FAPI FORMULÁŘÍCH**

### **SOUČASNÝ STAV (TESTOVACÍ):**
```
✅ Sleva 40%: 1 Kč (testovací platba)
✅ Plná cena: 2 Kč (testovací platba)
```

### **PRODUKČNÍ CENY (BEZ DPH):**
```
🎯 Sleva 40%: 4.999 Kč
🎯 Plná cena: 8.499 Kč
🎯 Úspora: 3.500 Kč (40% sleva)

Normální cena: 8.499,- Kč
Cena se slevou: 4.999,- Kč
```

---

## 2️⃣ **SOUBORY K ÚPRAVĚ:**

### **A) FAPI CHECKOUT FORMULÁŘ (SLEVA 40%)**
```
📁 /components/FapiCheckoutForm.tsx

Najdi řádek:
amount: 1, // TESTOVACÍ!

Změň na:
amount: 4999, // Produkční cena se slevou 40%
```

### **B) FAPI CHECKOUT FORMULÁŘ (PLNÁ CENA)**
```
📁 /components/FapiCheckoutFormExpensive.tsx

Najdi řádek:
amount: 2, // TESTOVACÍ!

Změň na:
amount: 8499, // Produkční plná cena
```

---

## 3️⃣ **WEBHOOK PODMÍNKA K ÚPRAVĚ**

### **SOUČASNÝ STAV:**
```javascript
// V /netlify/functions/fapi-webhook.js
if (amount === 1) {
  // Sleva 40% - průkopník → pošli minikurz
  send_minikurz = true;
}
```

### **ZMĚNIT NA:**
```javascript
if (amount === 4999) {
  // Sleva 40% - průkopník → pošli minikurz
  send_minikurz = true;
}
```

---

## 4️⃣ **POSTUP ZMĚNY:**

```bash
# 1. Otestuj kurz (dneska)
# 2. Zkontroluj že vše funguje
# 3. Připomeň AI změnit ceny
# 4. AI změní všechny 3 soubory najednou
# 5. Push to production
# 6. Testuj platbu s 4.999 Kč (před spuštěním)
# 7. GO LIVE! 🚀
```

---

## 5️⃣ **CHECKLIST PŘED SPUŠTĚNÍM:**

```
□ Kurz otestován (desktop + mobile)
□ Ceny změněny ve formulářích (1 Kč → 4.999 Kč, 2 Kč → 8.499 Kč)
□ Webhook podmínka upravena (1 → 4999)
□ Testovací platba 4.999 Kč provedena
□ Webhook funguje s 4.999 Kč
□ Email s minikurzem doručen
□ Token access funguje
□ SmartEmailing sekvence aktivní
□ Sentry monitoring běží
□ GO LIVE! 🎉
```

---

## 📝 **POZNÁMKY:**

- **NEZAPOMENOUT:** Ceny jsou **BEZ DPH** (FAPI nemá aktivní DPH)
- **TESTOVÁNÍ:** Před ostrým spuštěním udělat platbu 4.999 Kč
- **WEBHOOK:** Zkontrolovat v Supabase že se zapisuje `send_minikurz: true`
- **EMAIL:** Zkontrolovat že přijde Email #3 s minikurzem

---

## 6️⃣ **TISK AKČNÍHO PLÁNU - NÍZKÁ PRIORITA**

### **PROBLÉM:**
- Tisk Akčního plánu (Lekce 16) je černobílý místo barevný
- SVG ikony v nadpisech sekcí se někde zobrazují, někde ne

### **POZNÁMKY:**
- Není kritické pro spuštění
- Uživatelé si mohou udělat screenshot místo tisku
- Řešit později až bude čas po ostrém spuštění

### **CO ZKOUŠENO:**
- `print-color-adjust: exact` na různých elementech
- Skrytí SVG ikon při tisku
- Různá CSS pravidla pro tisk

### **MOŽNÁ ŘEŠENÍ DO BUDOUCNA:**
- Nahradit SVG ikony Unicode symboly (✓, ★, ⚡) které fungují v tisku vždy
- Vytvořit speciální "print view" tlačítko které otevře optimalizovanou verzi
- Přidat tlačítko "Stáhnout jako PDF" místo klasického tisku

---

## 🎯 **PŘIPOMÍNKA:**

**Po testování kurzu dnes večer:**
> "Hej AI, změň prosím ceny z testovacích (1 Kč, 2 Kč) na produkční (4.999 Kč, 8.499 Kč) a uprav webhook podmínku!"

---

**Vytvořeno:** 3. listopadu 2025  
**Status:** ⏳ Čeká na dokončení testování kurzu
