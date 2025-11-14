# 🚨 FAPI - ÚPRAVA PŘED SPUŠTĚNÍM REKLAM

**⚠️ KRITICKÉ: BEZ TÉTO ÚPRAVY NELZE SPUSTIT REKLAMY!**

---

## 📊 **AKTUÁLNÍ STAV:**

```
TESTOVACÍ REŽIM:
━━━━━━━━━━━━━━━━━━━━━━━━━━━

Formulář #1 (Průkopník):  1 Kč ❌
Formulář #2 (Normální):   2 Kč ❌

→ TESTOVACÍ CENY PRO VÝVOJ!
→ NELZE PUSTIT DO PRODUKCE!
```

---

## ✅ **CÍLOVÝ STAV:**

```
PRODUKČNÍ REŽIM:
━━━━━━━━━━━━━━━━━━━━━━━━━━━

Formulář #1 (Průkopník):  4.999 Kč ✅ (sleva 40%)
Formulář #2 (Normální):   8.499 Kč ✅ (běžná cena)

→ SKUTEČNÉ CENY!
→ READY FOR LAUNCH!
```

---

## 🎯 **LOGIKA BONUSU (MINI KURZ):**

### **Průkopník (4.999 Kč):**
```
✅ Koupí během prvních 24h
✅ Získá slevu 40%
✅ 🎁 BONUS: Mini kurz ZDARMA

Email po platbě obsahuje:
- Potvrzení platby
- Přístup do kurzu (token link)
- 🎁 Bonus sekce: Mini kurz odkaz
```

### **Normální cena (8.499 Kč):**
```
❌ Koupí po 24h (sleva expirovala)
❌ Platí plnou cenu
❌ Mini kurz NEPOSÍLAT (není průkopník)

Email po platbě obsahuje:
- Potvrzení platby
- Přístup do kurzu (token link)
- (bez bonus sekce)
```

---

## 🔧 **KROK ZA KROKEM: ÚPRAVA CENY**

### **KROK 1: Login do FAPI**

```
URL: https://app.fapi.cz/
→ Login s tvojimi credentials
```

---

### **KROK 2: Najdi formuláře**

```
Levé menu → Marketing → Formuláře

Najdi:
📋 "Podnikatelská Čtvrtka - Průkopník" (1 Kč)
📋 "Podnikatelská Čtvrtka - Normální" (2 Kč)

→ Nebo hledej podle názvu/ID
```

---

### **KROK 3: Uprav Formulář #1 (Průkopník)**

```
1. Klikni na formulář "Průkopník"
2. Jdi na: Nastavení → Cena produktu
3. Aktuální cena: 1 Kč
4. ZMĚŇ NA: 4999 (bez mezer, bez Kč)
5. Ulož změny ✅

DŮLEŽITÉ:
- Zadej číslo bez mezer: 4999
- FAPI automaticky přidá "Kč"
- Zkontroluj že se uložilo!
```

---

### **KROK 4: Uprav Formulář #2 (Normální)**

```
1. Klikni na formulář "Normální"
2. Jdi na: Nastavení → Cena produktu
3. Aktuální cena: 2 Kč
4. ZMĚŇ NA: 8499 (bez mezer, bez Kč)
5. Ulož změny ✅

DŮLEŽITÉ:
- Zadej číslo bez mezer: 8499
- FAPI automaticky přidá "Kč"
- Zkontroluj že se uložilo!
```

---

### **KROK 5: Zkontroluj embed kódy**

```
EMBED KÓD SE NEMĚNÍ!

Embed ID zůstává stejný:
- <iframe src="https://app.fapi.cz/api/form/XXXX">
- Jen se změní cena v FAPI

→ Na webu nemusíš měnit nic! ✅
```

---

## 🧪 **TESTOVÁNÍ PO ÚPRAVĚ:**

### **Test #1: Průkopník (4.999 Kč)**

```
1. Otevři: https://podnikatelskactvrtka.cz/objednavka
2. Klikni: "Chci průkopnický balíček"
3. FAPI formulář se otevře
4. ZKONTROLUJ:
   ✅ Cena je 4.999 Kč (NE 1 Kč!)
   ✅ Text: "Sleva 40%"
   ✅ Původní cena přeškrtnutá: 8.499 Kč
```

### **Test #2: Normální (8.499 Kč)**

```
1. Otevři: https://podnikatelskactvrtka.cz/objednavka
   (POTOM CO 24h timer vyprší)
2. Klikni: "Koupit kurz"
3. FAPI formulář se otevře
4. ZKONTROLUJ:
   ✅ Cena je 8.499 Kč (NE 2 Kč!)
   ✅ Text: "Plná cena"
```

---

## 💳 **TESTOVACÍ PLATBA (OPTIONAL):**

### **⚠️ POZOR: FAPI ÚČTUJE POPLATKY!**

```
POKUD CHCEŠ OTESTOVAT PLATBU:
━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Nastav FAPI na "Testovací režim":
   → FAPI Dashboard → Nastavení → Testovací režim ON
   → Pak můžeš testovat bez skutečné platby

2. Nebo použij skutečnou platbu (zaplatíš 4.999 Kč):
   → Proveď testovací objednávku
   → Zkontroluj že přijde email s bonusem
   → Pak vrať peníze přes FAPI admin

3. NEBO prostě NETESTUJ platbu:
   → Jen zkontroluj že CENA je správná ve formuláři
   → Webhook logika je už hotová a otestovaná!
```

---

## 📧 **WEBHOOK & EMAIL LOGIKA:**

### **Webhook je už READY! ✅**

```javascript
// Soubor: /netlify/functions/fapi-webhook.js

// ✅ AUTOMATICKY ROZPOZNÁ CENU:

if (amount === 4999) {
  // Průkopník
  sendMiniKurz = true;  // 🎁 POŠLI BONUS
  emailTemplate = "prukonik-s-bonusem";
}

if (amount === 8499) {
  // Normální
  sendMiniKurz = false; // ❌ BEZ BONUSU
  emailTemplate = "normalni-bez-bonusu";
}
```

**NEZAPOMEŇ:** Webhook už je nasazený a funguje! Jen změň ceny ve FAPI!

---

## ✅ **CHECKLIST:**

```
PRE-PRODUCTION CHECKLIST:
━━━━━━━━━━━━━━━━━━━━━━━━━━━

FAPI ÚPRAVY:
□ Login do FAPI ✅
□ Formulář #1 (Průkopník): 1 Kč → 4.999 Kč
□ Formulář #2 (Normální):  2 Kč → 8.499 Kč
□ Ulož obě změny
□ Zkontroluj že se uložilo

TESTOVÁNÍ:
□ Otevři /objednavka
□ Zkontroluj formulář #1: zobrazuje 4.999 Kč
□ (Optional) Zkontroluj formulář #2: zobrazuje 8.499 Kč
□ (Optional) Testovací platba s 4.999 Kč
□ (Optional) Zkontroluj že email obsahuje bonus

WEBHOOK:
□ Webhook je už nasazený (/netlify/functions/fapi-webhook.js)
□ Logika 4999 = bonus, 8499 = bez bonusu ✅
□ Nic neměnit! ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━

READY TO LAUNCH! 🚀
```

---

## 🔗 **ODKAZY:**

```
FAPI Dashboard:
https://app.fapi.cz/

Order Page (testuj tady):
https://podnikatelskactvrtka.cz/objednavka

Webhook kód:
/netlify/functions/fapi-webhook.js

Email template:
/email-templates/fapi-payment-confirmed.html
```

---

## 📚 **DOKUMENTACE:**

```
REFERENCE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━

/FAPI_WEBHOOK_MINIKURZ_LOGIC.md
→ Logika bonusu (kdy poslat mini kurz)

/FAPI_TWO_PRICE_SETUP.md
→ Dva formuláře (průkopník vs normální)

/FAPI_CURRENT_STATUS.md
→ Aktuální status FAPI integrace

/EMAIL_SEQUENCE_AGGRESSIVE_24H.md
→ Email sekvence (opt-in → reminder → bonus)
```

---

## 🚨 **DŮLEŽITÉ UPOZORNĚNÍ:**

```
❌ NESPOUŠTĚJ REKLAMY DOKUD:
━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Ceny ve FAPI nejsou 4.999 / 8.499 Kč
2. Nezákazníci platí 1 Kč / 2 Kč = ZTRÁTA!

✅ PO ÚPRAVĚ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Ceny správné (4.999 / 8.499)
2. Webhook funguje (bonus logic)
3. Emails ready
4. → LAUNCH REKLAMY! 🚀
```

---

## 🎯 **TL;DR:**

```
1. Login: https://app.fapi.cz/
2. Formulář #1: 1 Kč → 4.999 Kč
3. Formulář #2: 2 Kč → 8.499 Kč
4. Ulož změny
5. Zkontroluj na /objednavka
6. → DONE! ✅
```

---

**PRIORITA: KRITICKÁ ⚠️**  
**DEADLINE: PŘED SPUŠTĚNÍM REKLAM!**  
**TIME: 5 minut práce**
