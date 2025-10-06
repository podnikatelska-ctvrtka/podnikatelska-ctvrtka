# 🔧 MAKE.COM → FLOWLANCE PROPOJENÍ - SETUP GUIDE

## 🎯 CO POTŘEBUJEŠ

1. ✅ Make.com účet (už máš! Webhook funguje!)
2. ✅ Flowlance účet s produktem
3. ⏳ Flowlance API/webhook info (zjistíme)

---

## 📧 KROK 1: Kontaktuj Flowlance Support

**Co jim napsat:**

```
Předmět: Otázka - API/webhook pro automatické přidání do optin listu

Ahoj,

Sbírám emaily na mojí landing page přes Make.com webhook.
Rád bych automaticky přidával tyto emaily do mého Flowlance optin produktu.

Mám produkt: [název tvého produktu]

Otázky:
1. Máte API endpoint kam můžu posílat registrace z Make.com?
2. Podporujete webhook integraci?
3. Případně máte Zapier integraci kterou můžu použít přes Make.com?

Pokud žádná z variant není možná, jak doporučujete řešit automatické přidání leadů?

Děkuji!

[Tvoje jméno]
```

---

## 🔀 SCÉNÁŘ A: Flowlance má API/webhook

### **Setup v Make.com (5 minut):**

1. **Otevři Make.com scenario:**
   - Scenario: "Podnikatelská čtvrtka - Email capture"
   - Je tam už webhook modul

2. **Přidej HTTP modul:**
   - Klikni na "+" za webhookem
   - Vyhledej "HTTP"
   - Vyber "Make a request"

3. **Nastav HTTP modul:**
   ```
   URL: [API endpoint od Flowlance]
   Method: POST
   Headers:
      Content-Type: application/json
      Authorization: Bearer [API token od Flowlance]
   Body:
      {
        "email": "{{1.email}}",
        "name": "Průkopník",
        "source": "landing_page",
        "spot_number": "{{1.spotNumber}}",
        "timestamp": "{{1.timestamp}}"
      }
   ```

4. **Ulož a aktivuj:**
   - Klikni "Save"
   - Přepni scenario na ON

5. **Otestuj:**
   - Zaregistruj testovací email na landing page
   - Zkontroluj Make.com History
   - Zkontroluj že email přišel do Flowlance

---

## 🔀 SCÉNÁŘ B: Flowlance má Zapier integraci

### **Setup v Make.com (10 minut):**

1. **Přidej Zapier modul:**
   - V Make.com scenario klikni na "+"
   - Vyhledej "Zapier"
   - Vyber "Invoke a Zap"

2. **Vytvoř Zap ve Zapier:**
   - Jdi na zapier.com
   - Create Zap
   - Trigger: Webhooks by Zapier
   - Action: Flowlance → Add Subscriber

3. **Propoj Make → Zapier → Flowlance:**
   - Zkopíruj Zapier webhook URL
   - V Make.com Zapier modulu vlož webhook URL
   - Nastav data mapping

4. **Test a aktivuj**

---

## 🔀 SCÉNÁŘ C: Flowlance NEMÁ API (záložní plán)

### **Řešení 1: Email forward**

**Setup:**
1. V Make.com přidej "Email" modul
2. Pošli email na Flowlance support email s těmito údaji:
   ```
   To: support@flowlance.com (nebo jejich email na leady)
   Subject: Nový lead - Podnikatelská Čtvrtka
   Body:
      Email: {{1.email}}
      Produkt: [název tvého produktu]
      Spot: #{{1.spotNumber}}
      Čas: {{1.timestamp}}
      
      Prosím přidej tento email do optin listu.
   ```

**Flowlance pak:**
- Manuálně přidají emaily do listu
- Nebo nastaví automatické pravidlo (email filter → add to list)

---

### **Řešení 2: Google Sheets + manuální import**

**Setup v Make.com:**

1. **Přidej Google Sheets modul:**
   - Klikni na "+" za webhookem
   - Vyhledej "Google Sheets"
   - Vyber "Add a Row"

2. **Připoj Google account:**
   - Autorizuj Make.com přístup k Google

3. **Vytvoř Google Sheet:**
   - Vytvoř nový Google Sheet
   - Sloupce: Email | Spot | Timestamp | Status
   - Sdílej s Make.com

4. **Nastav mapping:**
   ```
   Email: {{1.email}}
   Spot: {{1.spotNumber}}
   Timestamp: {{1.timestamp}}
   Status: "Pending"
   ```

5. **Aktivuj scenario**

**Manuální import do Flowlance (1× denně):**
1. Otevři Google Sheet
2. Zkopíruj nové emaily
3. Flowlance → Import → Paste emails
4. V Sheets označ jako "Imported"

---

### **Řešení 3: Redirect tlačítko (nejjednodušší!)**

**Pokud NIC z výše nefunguje:**

1. **Aktivuj redirect v kódu:**
   
   Otevři `/components/PrelaunchEmailCapture.tsx`
   
   Najdi:
   ```typescript
   const FLOWLANCE_REDIRECT_CONFIG = {
     enabled: false,
     showButton: false,
   };
   ```
   
   Změň na:
   ```typescript
   const FLOWLANCE_REDIRECT_CONFIG = {
     enabled: true,
     showButton: true,
   };
   ```
   
   Najdi:
   ```typescript
   const FLOWLANCE_OPTIN_URL = 'https://my.flowlance.com/tvuj-produkt-url';
   ```
   
   Změň na tvoje Flowlance optin URL:
   ```typescript
   const FLOWLANCE_OPTIN_URL = 'https://my.flowlance.com/TVOJE-SKUTECNE-URL';
   ```

2. **Jak to bude fungovat:**
   ```
   User zadá email na landing page
         ↓
   Zobrazí se tvůj success screen (tvůj design!)
         ↓
   User vidí tlačítko "🎁 CHCI MINI KURZ ZDARMA"
         ↓
   Klikne → redirect do Flowlance optin stránky
         ↓
   Flowlance má email předvyplněný
         ↓
   User potvrdí (1 klik)
         ↓
   Flowlance spustí email sekvenci
   ```

3. **VÝHODA:**
   - User vidí TVŮJ design první
   - Žádné API/webhook potřeba
   - Funguje 100%

4. **NEVÝHODA:**
   - User musí kliknout 2× (landing + Flowlance)
   - Drop-off ~30% (70% klikne)

---

## 📊 DOPORUČENÍ (co použít)

### **NEJLEPŠÍ → NEJHORŠÍ:**

1. **🥇 API/webhook (Scénář A)**
   - Automatické
   - 100% konverze
   - Žádný manuální work
   - **DOPORUČUJU TOHLE!**

2. **🥈 Zapier integrace (Scénář B)**
   - Automatické
   - 100% konverze
   - Easy setup

3. **🥉 Redirect tlačítko (Scénář C.3)**
   - Poloautomatické
   - ~70% konverze
   - Žádný tech setup
   - **ZÁLOŽNÍ PLÁN!**

4. **😐 Google Sheets (Scénář C.2)**
   - Manuální import 1× denně
   - 100% konverze (ale pomalé)
   - Hodně práce

5. **😞 Email forward (Scénář C.1)**
   - Manuální přidání
   - Flowlance musí spolupracovat
   - Hodně práce

---

## ✅ ACTION PLAN

### **TEĎ UDĚLEJ:**

**KROK 1 (5 min):** Kontaktuj Flowlance support
- [ ] Pošli email s otázkou na API/webhook
- [ ] Čekej na odpověď (24-48h)

**KROK 2 (když odpoví):**

**Pokud mají API:**
- [ ] Setup Scénář A (Make.com HTTP modul)
- [ ] Test
- [ ] 🎉 Hotovo!

**Pokud mají Zapier:**
- [ ] Setup Scénář B (Make → Zapier → Flowlance)
- [ ] Test
- [ ] 🎉 Hotovo!

**Pokud NEMAJÍ nic:**
- [ ] Setup Scénář C.3 (redirect tlačítko)
- [ ] Test
- [ ] 🎉 Hotovo!

---

## 🆘 TROUBLESHOOTING

### **"Flowlance neodpovídá na email"**

→ Zkus jejich live chat nebo telefon

### **"Flowlance říká že nemají API"**

→ Použij redirect tlačítko (Scénář C.3) - funguje vždy!

### **"Redirect tlačítko nefunguje"**

→ Zkontroluj:
- `FLOWLANCE_REDIRECT_CONFIG.enabled = true`
- `FLOWLANCE_REDIRECT_CONFIG.showButton = true`
- `FLOWLANCE_OPTIN_URL` je správná URL

### **"Chci to testovat před aktivací"**

→ Nastav `showButton: false` → user vidí success screen bez tlačítka

---

## 📞 KONTAKT

**Když máš odpověď od Flowlance, pošli mi screenshot a nastavím to za tebe!**

---

## ✅ CURRENT STATUS

```
✅ Make.com webhook: FUNGUJE
✅ Email capture: FUNGUJE  
✅ Success screen: FUNGUJE
⏳ Flowlance propojení: ČEKÁ NA ODPOVĚĎ
```

**DALŠÍ KROK: Kontaktuj Flowlance! 🚀**

---

## 💡 TIP PRO RYCHLÝ START

**Pokud chceš začít HNED (bez čekání na Flowlance):**

1. Aktivuj redirect tlačítko (5 min)
2. Začni sbírat emaily
3. Mezitím vyřeš API propojení
4. Pak deaktivuj tlačítko a zapni API

**Takhle nic neztratíš!** 💪