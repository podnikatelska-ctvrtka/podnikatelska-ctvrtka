# 🧪 ZÍTŘEJŠÍ TEST - PLATBA A EMAIL PŘÍSTUPU

## ✅ CO JSI DNESKA UDĚLAL:

- ✅ **Vytvořil test platbu** v FAPI formuláři
- ✅ **Platba se zapsala do FAPI** (objednávka čeká)
- ❌ **NEZAPLATIL JSI** (záměrně - test na zítra)

---

## 🎯 CO UDĚLÁŠ ZÍTRA RÁNO:

### **KROK 1: Označ platbu jako zaplacenou v FAPI**
1. Otevři **FAPI admin** → **Objednávky**
2. Najdi svou testovací objednávku
3. **Ručně označ jako "Zaplaceno"**

### **KROK 2: FAPI spustí webhook**
- FAPI automaticky pošle webhook na Netlify function
- Webhook endpoint: `/.netlify/functions/fapi-webhook`

### **KROK 3: Zkontroluj že Resend poslal správný email**
- ✅ **Očekáváš:** Email s přístupem do **HLAVNÍHO KURZU**
- ❌ **NESMÍ BÝT:** Email s **MINI KURZEM** (to je jen pro průkopníky)

---

## 📊 DETAILY TESTU:

### **Použitý formulář:**
- **Formulář B** (dražší varianta = **8.499 Kč** nebo normální cena)
- **NENÍ průkopník** (průkopník = 4.999 Kč nebo 6.049 Kč)

### **Očekávaný email template:**
```
Subject: 🎉 Přístup do kurzu Podnikatelská Čtvrtka

Body:
- ✅ Odkaz na HLAVNÍ KURZ
- ❌ ŽÁDNÝ odkaz na mini kurz
- ❌ ŽÁDNÁ zmínka o "průkopníkovi"
```

### **Webhook logika (připomínka):**
```javascript
// V fapi-webhook.js
const isEarlyBird = amount === 4999 || amount === 6049;

if (isEarlyBird) {
  // ✅ Pošle email s minikurzem
} else {
  // ✅ Pošle email BEZ minikurzu (tohle očekáváš)
}
```

---

## 🔍 CO KONTROLOVAT:

### **1. Netlify Function Log:**
1. Otevři **Netlify Dashboard** → **Functions** → **fapi-webhook**
2. Zkontroluj log z dnešního webhooků
3. Hledej řádek:
   ```
   📧 Sending NORMAL email to [tvuj-email]...
   ```
   ✅ Pokud vidíš **"NORMAL"** = SPRÁVNĚ!
   ❌ Pokud vidíš **"EARLY BIRD"** = CHYBA!

### **2. Email v inbox:**
1. Otevři svůj email
2. Najdi email od **Podnikatelská Čtvrtka**
3. Zkontroluj subject:
   - ✅ **SPRÁVNĚ:** `🎉 Přístup do kurzu Podnikatelská Čtvrtka`
   - ❌ **ŠPATNĚ:** `🔥 PRŮKOPNÍK! Přístup do kurzu + BONUS Mini Kurz`
4. Zkontroluj obsah:
   - ✅ **MÁ BÝT:** Tlačítko "Vstoupit do kurzu" (hlavní kurz)
   - ❌ **NESMÍ BÝT:** Žlutý box s "BONUS PRO PRŮKOPNÍKY"
   - ❌ **NESMÍ BÝT:** Odkaz na minikurz

### **3. Access Token:**
1. V emailu klikni na "Vstoupit do kurzu"
2. Mělo by tě to redirectnout na:
   ```
   https://podnikatelskactvrtka.cz/course-v3?token=FAPI-[timestamp]-[random]
   ```
3. Zkontroluj že se dostaneš do kurzu

---

## 🚨 CO DĚLAT POKUD JE CHYBA:

### **Pokud dostaneš EARLY_BIRD email místo NORMAL:**
- ❌ Webhook chybně detekuje cenu jako průkopnickou
- 🔧 FIX: Zkontroluj `fapi-webhook.js` řádek:
  ```javascript
  const isEarlyBird = amount === 4999 || amount === 6049;
  ```
- 💡 Debug: Podívej se na Netlify log jakou cenu webhook viděl

### **Pokud email NEPŘIJDE:**
1. Zkontroluj **Netlify Function Log** → má tam být webhook call
2. Zkontroluj **Resend Dashboard** → zkontroluj delivery status
3. Zkontroluj **SPAM folder**

### **Pokud access token NEFUNGUJE:**
1. Zkontroluj že URL obsahuje `?token=FAPI-...`
2. Zkontroluj Supabase `user_access_tokens` tabulku
3. Zkontroluj že token není expirovaný

---

## ✅ CHECKLIST PRO ZÍTŘEK:

- [ ] Otevři FAPI admin
- [ ] Najdi test objednávku
- [ ] Označ jako "Zaplaceno"
- [ ] Počkej 30 sekund
- [ ] Zkontroluj Netlify Function Log
- [ ] Zkontroluj inbox (a spam)
- [ ] Ověř že email je **NORMAL** (ne EARLY_BIRD)
- [ ] Klikni na přístup do kurzu
- [ ] Ověř že token funguje
- [ ] 🎉 HOTOVO!

---

## 📋 POZNÁMKY:

- **Webhook běží automaticky** - nemusíš nic spouštět ručně
- **Email se pošle během 5-10 sekund** po označení platby
- **Token je permanentní** - funguje natrvalo
- **Test můžeš opakovat** - prostě vytvoř novou objednávku

---

## 🎯 VÝSLEDEK:

Po úspěšném testu budeš mít **ověřený celý flow**:

1. ✅ FAPI formulář → Objednávka
2. ✅ Ruční zaplacení → Webhook trigger
3. ✅ Webhook → Resend email (správný template)
4. ✅ Email → Access token
5. ✅ Token → Vstup do kurzu

**→ Production ready! 🚀**

---

**DOBROU NOC A ZÍTRA NA TO! 💪**
