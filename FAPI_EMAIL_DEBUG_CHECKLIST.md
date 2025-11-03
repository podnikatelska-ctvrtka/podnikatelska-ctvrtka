# 🚨 FAPI EMAIL NECHODÍ - DEBUG CHECKLIST

**Problém:** Po platbě 2 Kč nepřišel žádný email ani faktura.

---

## 🔍 **KDE MŮŽE BÝT PROBLÉM:**

### **Problém #1: FAPI Webhook není nastavený**
✅ **AKCE:** Zkontroluj v FAPI Admin

```
1. Přihlaš se: https://admin.fapi.cz/
2. Produkty → "Testovací produkt 2 Kč"
3. Záložka: AUTOMATIZACE
4. Sekce: Webhoooky
5. Zkontroluj:
   ✓ Webhook URL: https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook
   ✓ Event: "Faktura zaplacena" (Invoice paid)
   ✓ Stav: AKTIVNÍ ✅ (zelené)
```

**Pokud NENÍ webhook:**
1. Klikni "+ Přidat webhook"
2. URL: `https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook`
3. Event: "Faktura zaplacena"
4. Aktivní: ✅
5. Ulož

---

### **Problém #2: FAPI vlastní emaily JSOU zapnuté (konflikt)**

FAPI má 2 systémy:
- **A) Vlastní emaily** (FAPI posílá samo)
- **B) Webhook** (náš Netlify webhook posílá)

**Musíš vybrat JEDNO z toho!**

#### **Option A: Použít FAPI vlastní emaily (JEDNODUŠŠÍ)**

```
1. FAPI Admin → Produkt → AUTOMATIZACE → E-maily
2. Zapni: "E-mail při vytvoření objednávky" ✅
3. Zapni: "E-mail při zaplacení faktury" ✅
4. Nastav šablonu (vidím že máš připravené v Admin)
5. VYPNI náš webhook (nebo nech běžet oba, ale pak přijdou 2 emaily!)
```

#### **Option B: Použít náš Netlify webhook (SLOŽITĚJŠÍ, ALE FLEXIBILNĚJŠÍ)**

```
1. FAPI Admin → Produkt → AUTOMATIZACE → E-maily
2. VYPNI všechny FAPI emaily ❌
3. Nech JEN webhook aktivní ✅
4. Náš webhook pošle custom email s tokenem přes Resend
```

**→ DOPORUČUJI: Option B (náš webhook), protože máme custom tokeny!**

---

### **Problém #3: GoPay webhook NENÍ nastavený**

GoPay musí informovat FAPI o platbě!

```
1. Přihlaš se: https://gate.gopay.cz/
2. Nastavení → Notifikace
3. Zkontroluj:
   ✓ Notification URL: (měla by být FAPI URL)
   ✓ Aktivní: ✅
```

**Pokud to nevidíš → kontaktuj FAPI support, oni to musí nastavit!**

---

### **Problém #4: ENV proměnné chybí na Netlify**

Náš webhook potřebuje:

```
FAPI_USERNAME=xxx
FAPI_API_KEY=xxx
SUPABASE_URL=xxx
SUPABASE_ANON_KEY=xxx
RESEND_API_KEY=xxx
```

**AKCE: Zkontroluj Netlify:**

```
1. Netlify Dashboard
2. Tvůj site → Site settings
3. Environment variables
4. Zkontroluj že VŠECHNY jsou nastavené
```

---

### **Problém #5: Platba se vůbec nezaregistrovala**

**AKCE: Zkontroluj FAPI faktury:**

```
1. FAPI Admin → Faktury
2. Najdi fakturu za 2 Kč
3. Zkontroluj:
   ✓ Status: ZAPLACENO ✅ (nebo "Čeká na platbu")
   ✓ Datum zaplacení: (mělo by být vyplněné)
```

**Pokud je status "Čeká na platbu" → platba NEBYLA potvrzená!**

Možné důvody:
- GoPay test nebyl v "paid" stavu
- GoPay webhook nepřišel
- FAPI nezachytil GoPay callback

---

### **Problém #6: Email spadl do SPAM**

**AKCE: Zkontroluj SPAM složku!**

```
1. Gmail → Spam / Hromadné
2. Hledej: "Podnikatelská Čtvrtka"
3. Hledej: "kurz@podnikatelskactvrtka.cz"
```

---

## 🧪 **RYCHLÝ TEST - WEBHOOK TESTER:**

### **1. Otevři:**
```
https://podnikatelskactvrtka.cz/test-webhook
```

### **2. Vyplň:**
```
Email: tvuj@email.cz
Jméno: Test Test
Částka: 2 Kč (nebo 4.999 Kč)
```

### **3. Klikni: "Odeslat test email"**

### **4. Zkontroluj:**
- ✅ Email přišel?
- ✅ Token funguje?
- ✅ Supabase má záznam?

**Pokud přijde → webhook FUNGUJE! Problém je v FAPI.**  
**Pokud NEPŘIJDE → webhook NEFUNGUJE! Problém je v Netlify ENV.**

---

## 🎯 **NEJČASTĚJŠÍ PŘÍČINA:**

### **90% případů:**
```
❌ FAPI webhook URL není nastavená
❌ FAPI webhook není aktivní
❌ Event není "Faktura zaplacena"
```

### **FIX:**
```
1. FAPI Admin → Produkt → Automatizace → Webhooky
2. + Přidat webhook
3. URL: https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook
4. Event: Faktura zaplacena
5. Aktivní: ✅
6. ULOŽ!
```

---

## 📋 **STEP-BY-STEP TEST (OPAKUJ TOTO):**

### **1. Nastav webhook v FAPI (viz výše)**

### **2. Udělej novou testovací platbu:**
```
1. Otevři: https://podnikatelskactvrtka.cz/objednavka
2. Vyplň nový email (jiný než před tím!)
3. Použij test kartu:
   4111 1111 1111 1111
   CVV: 123
   12/25
4. Potvrď platbu
```

### **3. Hned po platbě:**

#### **A) Zkontroluj Netlify Function Logs:**
```
Netlify Dashboard → Functions → fapi-webhook → View logs (real-time)

Měl bys vidět:
✅ "🎯 FAPI webhook received"
✅ "📋 Invoice ID: xxx"
✅ "✅ Invoice fetched successfully"
✅ "👤 Customer: {...}"
✅ "✅ User saved: xxx"
✅ "📧 Sending email..."
✅ "✅ Email sent!"
```

#### **B) Zkontroluj Resend Dashboard:**
```
https://resend.com/emails

✅ Nový email by měl být "Delivered"
```

#### **C) Zkontroluj Supabase:**
```
Supabase Dashboard → Table Editor → users

✅ Nový záznam s tvým emailem
✅ access_token je vyplněný
✅ amount = 2 (nebo 4999)
```

#### **D) Zkontroluj email:**
```
✅ Doručená pošta
✅ Spam složka
```

---

## 🚨 **POKUD STÁLE NEFUNGUJE:**

### **PLAN B: Vytvoř nový produkt od nuly:**

```
1. FAPI Admin → Produkty → + Nový produkt
2. Název: "TEST - Podnikatelská Čtvrtka"
3. Cena: 2 Kč
4. Platební brána: GoPay
5. ULOŽ

6. Automatizace → Webhooky → + Přidat
   URL: https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook
   Event: Faktura zaplacena
   Aktivní: ✅

7. Automatizace → E-maily → VYPNI všechny ❌
   (necháme jen webhook posílat emaily)

8. Vytvoř nový formulář pro tento produkt
9. Zkopíruj iframe URL
10. Nahraď v OrderPageFinal.tsx

11. Otestuj platbu
```

---

## 📞 **KONTAKTUJ FAPI SUPPORT:**

Pokud NIC nefunguje:

```
Email: podpora@fapi.cz

Předmět: Webhook nefunguje po platbě

Text:
"Dobrý den,
mám problém s webhookem - po zaplacení faktury se nevolá můj webhook endpoint.

Produkt: Podnikatelská Čtvrtka (ID: XXX)
Webhook URL: https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook
Event: Faktura zaplacena

Webhook jsem nastavil v administraci, je aktivní, ale když udělám testovací platbu přes GoPay, 
webhook se nevolá (nemám žádné logy na Netlify).

Můžete zkontrolovat nastavení?
Děkuji!"
```

---

## ✅ **CHECKLIST (PROJDI POSTUPNĚ):**

- [ ] FAPI webhook URL je nastavená
- [ ] FAPI webhook je AKTIVNÍ ✅
- [ ] Event je "Faktura zaplacena"
- [ ] FAPI vlastní emaily jsou VYPNUTÉ ❌
- [ ] ENV proměnné na Netlify jsou nastavené
- [ ] Test webhook tester funguje
- [ ] Udělal jsem novou platbu (jiný email)
- [ ] Netlify logs ukazují webhook call
- [ ] Supabase má nový záznam
- [ ] Email přišel (nebo je ve spamu)

---

**Poslední update:** 2025-11-03  
**Status:** 🔍 Debugging
