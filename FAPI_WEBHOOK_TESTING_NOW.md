# 🧪 FAPI WEBHOOK TESTING - TEĎKA HNED!

**Cíl:** Zjistit jestli FAPI vůbec volá webhook po platbě.

---

## ✅ **KROK 1: Nastav DEBUG webhook v FAPI**

### **1. Přihlaš se do FAPI:**
```
https://admin.fapi.cz/
```

### **2. Najdi produkt:**
```
Produkty → "Testovací produkt 2 Kč" (nebo jakýkoliv)
```

### **3. Přidej DEBUG webhook:**
```
Automatizace → Webhooky → + Přidat webhook

URL: https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook-debug
Event: Faktura zaplacena
Aktivní: ✅

ULOŽ!
```

**DŮLEŽITÉ:** Použij `-debug` na konci URL! To je speciální verze která LOGUJE VŠECHNO.

---

## ✅ **KROK 2: Deploy DEBUG webhook**

Vytvořil jsem debug verzi webhooku - musíš to deploynout:

```bash
git add netlify/functions/fapi-webhook-debug.js
git commit -m "feat: Add FAPI webhook debug version"
git push
```

Netlify automaticky deployuje → **počkej 1-2 minuty!**

---

## ✅ **KROK 3: Otevři Netlify Logs (REAL-TIME)**

### **Před platbou:**
```
1. Netlify Dashboard
2. Tvůj site
3. Functions → fapi-webhook-debug
4. Klikni "View logs"
5. ⚠️ NECH TO OTEVŘENÉ! (real-time monitoring)
```

**Měl bys vidět:**
```
Real-time function logs
Waiting for invocations...
```

---

## ✅ **KROK 4: Udělej testovací platbu**

### **1. Otevři v NOVÉM OKNĚ:**
```
https://podnikatelskactvrtka.cz/objednavka
```

### **2. Vyplň formulář:**
```
Email: novytest@email.cz (JINÝ než minule!)
Jméno: Test Webhook
Telefon: 777 123 456
```

### **3. Zadej test kartu:**
```
Číslo: 4111 1111 1111 1111
CVV: 123
Platnost: 12/25
3D Secure: 1234 (pokud se zeptá)
```

### **4. Potvrď platbu**

### **5. HNED SLEDUJ NETLIFY LOGS!**

---

## 🔍 **CO BYCH MĚL VIDĚT V LOGS:**

### **✅ SCÉNÁŘ A: WEBHOOK FUNGUJE!**

```
╔════════════════════════════════════════════════════════════╗
║         🐛 FAPI WEBHOOK DEBUG - START                      ║
╚════════════════════════════════════════════════════════════╝

📥 REQUEST INFO:
Method: POST
Path: /.netlify/functions/fapi-webhook-debug
Headers: {...}

📦 BODY:
Body (raw): id=12345&status=paid&...

🔑 PARSED PARAMS:
  id: 12345
  status: paid
  email: novytest@email.cz
  ...

🔐 ENV VARIABLES:
FAPI_USERNAME: ✅ SET
FAPI_API_KEY: ✅ SET
SUPABASE_URL: ✅ SET
...

⏰ TIMESTAMP: 2025-11-03T14:30:00.000Z

╔════════════════════════════════════════════════════════════╗
║         🐛 FAPI WEBHOOK DEBUG - END                        ║
╚════════════════════════════════════════════════════════════╝
```

**→ VÝSLEDEK: WEBHOOK VOLÁ SE! ✅**  
Problém je někde v webhook logice (env, supabase, email).

---

### **❌ SCÉNÁŘ B: ŽÁDNÉ LOGY!**

Netlify logs pořád ukazují:
```
Waiting for invocations...
```

**→ VÝSLEDEK: FAPI NEVOLÁ WEBHOOK! ❌**  
Problém je v FAPI nastavení (webhook URL, event, nebo produkt nemá webhook).

---

## 🎯 **CO DĚLAT DÁL:**

### **SCÉNÁŘ A: Webhook funguje → oprav logiku**

Problém je v kódu nebo ENV:

1. **Zkontroluj Netlify ENV:**
   ```
   Netlify → Site settings → Environment variables
   
   Musíš mít:
   FAPI_USERNAME
   FAPI_API_KEY
   SUPABASE_URL
   SUPABASE_ANON_KEY
   RESEND_API_KEY
   ```

2. **Použij test-webhook page:**
   ```
   https://podnikatelskactvrtka.cz/test-webhook
   
   Otestuj jestli email posílání funguje.
   ```

3. **Zkontroluj Resend Dashboard:**
   ```
   https://resend.com/emails
   
   Jsou tam nějaké emaily?
   ```

---

### **SCÉNÁŘ B: Webhook nefunguje → oprav FAPI**

Problém je v FAPI nastavení:

1. **Zkontroluj webhook URL:**
   ```
   Správně: https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook-debug
   Špatně: https://podnikatelskactvrtka.cz/netlify/functions/... (chybí tečka)
   Špatně: http://... (musí být https://)
   ```

2. **Zkontroluj Event:**
   ```
   Správně: "Faktura zaplacena" (Invoice paid)
   Špatně: "Objednávka vytvořena" (Order created) - tohle se volá před platbou!
   ```

3. **Zkontroluj Aktivní stav:**
   ```
   Musí být: ✅ (zelené)
   ```

4. **Kontaktuj FAPI support:**
   ```
   podpora@fapi.cz
   
   "Webhook se nevolá po zaplacení faktury, můžete zkontrolovat nastavení?"
   ```

---

## 🚨 **ALTERNATIVNÍ TEST: Manuální webhook trigger**

Pokud nevíš jestli problém je v platbě nebo webhooku:

### **Test #1: Curl request (simulace FAPI)**

```bash
curl -X POST https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook-debug \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "id=test123&status=paid&email=test@test.cz"
```

**Měl bys vidět logy v Netlify!**

---

### **Test #2: Browser request**

1. Otevři: https://reqbin.com/
2. Method: POST
3. URL: `https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook-debug`
4. Content Type: `application/x-www-form-urlencoded`
5. Body: `id=test123&status=paid&email=test@test.cz`
6. Send!

**Měl bys dostat:**
```json
{
  "message": "✅ Debug webhook received!",
  "timestamp": "2025-11-03T...",
  ...
}
```

---

## 📋 **RYCHLÝ CHECKLIST:**

- [ ] Debug webhook vytvořený (`fapi-webhook-debug.js`)
- [ ] Commited & pushed
- [ ] Netlify deployed (počkat 1-2 min)
- [ ] Debug webhook URL v FAPI nastavený
- [ ] Event: "Faktura zaplacena" ✅
- [ ] Aktivní: ✅
- [ ] Netlify logs otevřené (real-time)
- [ ] Nová platba provedena (jiný email!)
- [ ] Sledoval jsem logy během platby

---

## 🎯 **MÉ SÁZKA:**

**90% pravděpodobnost:**  
❌ FAPI webhook není nastavený nebo má špatnou URL

**10% pravděpodobnost:**  
❌ GoPay nezaregistroval platbu jako "paid"

---

**JAK TO ZJISTÍM:**

Po testu s debug webhookem HNED VÍME kde je problém! 🎯

Napiš mi výsledek a půjdeme dál! 🚀
