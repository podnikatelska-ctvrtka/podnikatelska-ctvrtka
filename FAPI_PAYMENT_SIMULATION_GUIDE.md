# 🧪 FAPI PAYMENT SIMULATION GUIDE

**Jak simulovat úspěšné i neúspěšné platby bez skutečné transakce**

---

## 🎯 **CO POTŘEBUJEŠ NASTAVIT VE FAPI ADMIN:**

### **1. Success Redirect URL:**
```
https://podnikatelskactvrtka.cz/dekuji
```

### **2. Failure Redirect URL (Cancel URL):**
```
https://podnikatelskactvrtka.cz/objednavka?error=payment_failed
```

### **3. Cancelled Redirect URL:**
```
https://podnikatelskactvrtka.cz/objednavka?error=payment_cancelled
```

**Kde to nastavit:**
```
1. FAPI Admin → Produkty
2. Tvůj produkt (4.999 Kč nebo 8.499 Kč)
3. Nastavení → Platební brána
4. Success URL: (viz výše)
5. Failure URL: (viz výše)
6. Cancelled URL: (viz výše)
7. ULOŽ!
```

---

## 🧪 **SIMULACE V KONZOLI (bez skutečné platby):**

### **✅ SUCCESS:**
```javascript
testPaymentSuccess()
```
**Výsledek:**
- ✅ Redirect na `/dekuji` za 1s
- ✅ Konzole log: "🎉 SUCCESS DETECTED!"

---

### **❌ FAILED:**
```javascript
testPaymentFailed()
```
**Výsledek:**
- ❌ Žádný redirect (FAPI by měl redirectnout na failure URL)
- 📝 Webhook by měl poslat retry email

---

### **🚫 CANCELLED:**
```javascript
testPaymentCancelled()
```
**Výsledek:**
- ❌ Žádný redirect (FAPI by měl redirectnout na cancelled URL)
- 📝 Webhook by měl poslat retry email

---

### **✅ GOPAY STRING (reálná simulace):**
```javascript
testGoPayString()
```
**Výsledek:**
- ✅ Simuluje message z `app.cink.cz` (GoPay brána)
- ✅ Měl by vyvolat redirect na `/dekuji`

---

## 💳 **TESTOVACÍ PLATBA 1 Kč (nejbližší realitě):**

### **✅ SUCCESS TEST:**
```
1. Jdi na https://podnikatelskactvrtka.cz/objednavka
2. Vyplň FAPI formulář
3. Použij testovací kartu:
   
   Číslo: 4111 1111 1111 1111
   CVV: 123
   Platnost: 12/25
   
4. Potvrď platbu
```

**Očekávaný flow:**
```
1. FAPI zobrazí platební bránu GoPay
2. GoPay přijme platbu (testovací karta)
3. GoPay pošle webhook → FAPI
4. FAPI pošle webhook → Netlify function
5. Netlify pošle email s přístupem
6. GoPay redirectne na SUCCESS URL → /dekuji
```

---

### **❌ FAILED TEST:**
```
1. Jdi na https://podnikatelskactvrtka.cz/objednavka
2. Vyplň FAPI formulář
3. Použij testovací kartu (DECLINED):
   
   Číslo: 4000 0000 0000 0002
   CVV: 123
   Platnost: 12/25
   
4. Pokus se potvrdit platbu
```

**Očekávaný flow:**
```
1. FAPI zobrazí platební bránu GoPay
2. GoPay ODMÍTNE platbu (insufficient funds)
3. GoPay redirectne na FAILURE URL → /objednavka?error=payment_failed
4. Zobrazí se červený banner: "Platba se nezdařila"
5. FAPI pošle webhook → Netlify (invoice.paid = false)
6. Netlify pošle retry email: "Zkus to znovu"
```

---

### **🚫 CANCELLED TEST:**
```
1. Jdi na https://podnikatelskactvrtka.cz/objednavka
2. Vyplň FAPI formulář
3. Na GoPay platební bráně:
   → KLIKNI "ZRUŠIT" nebo "ZPĚT"
   
4. NEBO zavři platební okno
```

**Očekávaný flow:**
```
1. FAPI zobrazí platební bránu GoPay
2. Uživatel klikne ZRUŠIT
3. GoPay redirectne na CANCELLED URL → /objednavka?error=payment_cancelled
4. Zobrazí se oranžový banner: "Platba byla zrušena"
5. FAPI pošle webhook → Netlify (invoice.cancelled = true)
6. Netlify pošle retry email: "Zkus to znovu"
```

---

## 🔍 **DEBUG V KONZOLI:**

Po načtení `/objednavka` by se mělo zobrazit:

```
╔════════════════════════════════════════╗
║  🧪 DEBUG MODE ACTIVATED               ║
╚════════════════════════════════════════╝

📝 Test functions available:
  → testPaymentSuccess()   - Simulate successful payment
  → testPaymentFailed()    - Simulate failed payment
  → testPaymentCancelled() - Simulate cancelled payment
  → testGoPayString()      - Simulate GoPay success (string)

Example usage:
  testPaymentSuccess()   → should redirect to /dekuji
  testGoPayString()      → should redirect to /dekuji
```

---

## 📋 **CHECKLIST - CO MUSÍŠ ZKONTROLOVAT:**

### **✅ PŘED TESTEM:**
- [ ] FAPI Success URL je nastavená: `/dekuji`
- [ ] FAPI Failure URL je nastavená: `/objednavka?error=payment_failed`
- [ ] FAPI Cancelled URL je nastavená: `/objednavka?error=payment_cancelled`
- [ ] FAPI webhook je aktivní
- [ ] FAPI webhook URL je: `https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook`
- [ ] Netlify function je nasazená

### **✅ PO ÚSPĚŠNÉ PLATBĚ:**
- [ ] Redirect na `/dekuji` funguje
- [ ] Email s přístupem přišel do 5 minut
- [ ] Email obsahuje:
  - [ ] Access token link do kurzu
  - [ ] Faktura PDF download
  - [ ] Invoice status page link
  - [ ] (Průkopníci) Bonus mini kurz
- [ ] Access token funguje → kurz se načte

### **✅ PO NEÚSPĚŠNÉ PLATBĚ:**
- [ ] Redirect na `/objednavka?error=payment_failed`
- [ ] Červený banner se zobrazí
- [ ] Retry email přišel
- [ ] Retry email obsahuje:
  - [ ] CTA "Zkusit znovu" → `/objednavka`
  - [ ] Invoice status link (pokud existuje)

---

## 🚀 **QUICK START - JAK TO OTESTOVAT TEĎ:**

### **1. Console Test (nejrychlejší):**
```javascript
// V konzoli na /objednavka:
testPaymentSuccess()

// Měl bys vidět:
// 🎉 SUCCESS DETECTED!
// 🚀 Redirecting to /dekuji in 1 second...
```

### **2. URL Test (middle):**
```
https://podnikatelskactvrtka.cz/objednavka?error=payment_failed
```
**Měl bys vidět:**
- 🔴 Červený banner nahoře
- ⚠️ "Platba se nezdařila. Zkus to prosím znovu níže."

### **3. Real Test (nejbližší realitě):**
```
1. Nastav FAPI na testovací mode (nebo vytvoř 1 Kč testovací platbu)
2. Jdi na /objednavka
3. Vyplň formulář s test kartou 4111 1111 1111 1111
4. Dokončí platbu
5. Zkontroluj:
   - Redirect na /dekuji
   - Email s přístupem
   - Funkční access token
```

---

## 📊 **CO SE LOGUJE V KONZOLI:**

### **Když přijde message:**
```
╔════════════════════════════════════════╗
║  📬 POST MESSAGE RECEIVED              ║
╚════════════════════════════════════════╝
🌍 Origin: https://app.cink.cz
📦 Data: "success"
📝 Data type: string
📝 String length: 7
📝 String content: "success"
📝 String lowercase: success
════════════════════════════════════════
🔎 Checking for success conditions (STRING)...
  - Raw string: success
  - Contains success keywords? true
╔════════════════════════════════════════╗
║  🎉 SUCCESS DETECTED!                  ║
╚════════════════════════════════════════╝
🚀 Redirecting to /dekuji in 1 second...
```

### **Když NENÍ success:**
```
📬 POST MESSAGE RECEIVED
🌍 Origin: https://app.cink.cz
📦 Data: "some random string"
❌ No success condition matched
```

---

## 🔧 **TROUBLESHOOTING:**

### **❌ Redirect nefunguje po platbě:**
```
Možné příčiny:
1. FAPI nemá Success URL nastavenou
2. GoPay posílá jiný message formát
3. Origin není v allowed list
4. Iframe sandbox blokuje redirect

Fix:
- Zkontroluj FAPI Admin → Success URL
- Sleduj konzoli → měl bys vidět "POST MESSAGE RECEIVED"
- Pokud vidíš message, ale není detected → pošli mi data
```

### **❌ Error banner se nezobrazí:**
```
Možné příčiny:
1. URL parametr není správný
2. Component se nerendernul

Fix:
- Zkontroluj URL: /objednavka?error=payment_failed
- Reload page
- Zkontroluj konzoli (errors?)
```

### **❌ Email nepřišel:**
```
Možné příčiny:
1. FAPI webhook není aktivní
2. Netlify function failnula
3. Email provider má rate limit

Fix:
- Zkontroluj Netlify Functions logs
- Zkontroluj FAPI webhook logs
- Zkontroluj spam folder
```

---

## 💡 **PRO TIPS:**

1. **Používej console test pro rychlý debug:**
   ```javascript
   testPaymentSuccess()  // Nejrychlejší způsob
   ```

2. **Sleduj Network tab pro webhook calls:**
   ```
   Chrome DevTools → Network → Filter: "fapi-webhook"
   ```

3. **Sleduj Netlify Functions logs:**
   ```
   https://app.netlify.com/sites/[YOUR_SITE]/functions
   → Najdi fapi-webhook
   → Zobraz recent logs
   ```

4. **Failed payment můžeš otestovat i přes URL:**
   ```
   /objednavka?error=payment_failed
   ```

---

## 🎯 **NEXT STEPS:**

1. **Push změny:**
   ```bash
   git add components/OrderPageFinal.tsx
   git commit -m "feat: Add payment error handling + simulation tools"
   git push
   ```

2. **Otestuj v prod:**
   ```
   1. Console test → testPaymentSuccess()
   2. URL test → ?error=payment_failed
   3. Real test → 1 Kč testovací platba
   ```

3. **Zkontroluj email flow:**
   ```
   - Success email (s access tokenem)
   - Failed email (s retry CTA)
   ```

---

**Hotovo! 🚀**

Teď máš kompletní simulační nástroje pro testování plateb bez risk!
