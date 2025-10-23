# ✅ EMAIL SEQUENCE - IMPLEMENTATION CHECKLIST

**FINÁLNÍ SEKVENCE READY!** 🚀

**File:** `/ARCHIVE/emails/EMAIL_SEQUENCE_FINAL_v2_2025-01-21.md`

---

## 🎯 CO MÁŠ HOTOVÉ:

✅ **5 kompletních emailů**
✅ **Kratší messaging** (100-260 slov)
✅ **Hype building** (postupné odhalování)
✅ **Focus na ČTVRTKU** (hlavní produkt)
✅ **Minikurz = bonus** (ne overwhelming)
✅ **Based na produkčních emailech** (+ optimalizace)

---

## 📧 EMAIL FLOW:

```
DEN 0 (okamžitě):
  Email #1: WELCOME
  → Minikurz access
  → Tease slevy (za 2 dny)
  → 150 slov

DEN 2 (+48h):
  Email #2: CHECK-IN
  → "Jak ti jde minikurz?"
  → HYPE: "Zítra něco velkého!"
  → 180 slov

DEN 3 (+72h):
  Email #3: 🔥 HLAVNÍ UPSELL
  → "OTEVŘENO: Sleva 40%!"
  → Breakdown kurzu
  → 48h deadline
  → 260 slov (zkráceno z 300!)

DEN 4 (+96h):
  Email #4: LAST CHANCE
  → "Zbývá 24h!"
  → Krátký, urgentní
  → 100 slov

DEN 5 (+120h):
  Email #5: FEEDBACK (nekupující)
  → "Co tě zastavilo?"
  → Soft touch, genuine interest
  → 120 slov
```

---

## 🔧 CO POTŘEBUJEŠ NASTAVIT:

### **1. SMARTEMAILING:**

**List:** "Prelaunch"

**Automation:**
- Email #1: Trigger okamžitě (welcome)
- Email #2: Wait 48h
- Email #3: Wait 24h (total 72h)
- Email #4: Wait 24h (total 96h)
- Email #5: Wait 24h + condition (IF NOT purchased)

**Tags:**
- `registered` - Po opt-in
- `email_1_sent`, `email_2_sent`, etc.
- `upsell_sent` - Email #3
- `last_chance` - Email #4
- `purchased` - Po nákupu (webhook)
- `not_converted` - Nekoupil

---

### **2. WEBHOOK NA LANDING PAGE:**

**Trigger:** Email opt-in form (/)

**Action:**
1. Add contact to Smartemailing
2. Tag: `registered`
3. Trigger Email #1

**Endpoint:**
```
POST /netlify/functions/smartemailing-subscribe
{
  "email": "[user_email]",
  "name": "[user_name]",
  "listId": "prelaunch",
  "tags": ["registered"]
}
```

---

### **3. GOPAY WEBHOOK:**

**Trigger:** Successful payment

**Action:**
1. Tag user as `purchased`
2. Remove from "Prelaunch" list
3. Add to "Customers" list
4. STOP email automation

**Endpoint:**
```
POST /netlify/functions/fapi-webhook
→ On success:
  → Smartemailing API: Add tag "purchased"
  → Stop prelaunch automation
```

---

### **4. LINKS V EMAILECH:**

**Minikurz:**
```
https://podnikatelskactvrtka.cz/#minikurz
nebo
https://podnikatelskactvrtka.cz/minikurz
```

**Objednávka (upsell):**
```
https://podnikatelskactvrtka.cz/objednavka
nebo
https://podnikatelskactvrtka.cz/#objednavka
```

**UTM tracking (optional):**
```
?utm_source=email&utm_medium=prelaunch&utm_campaign=upsell&utm_content=email_3
```

---

## 📊 METRICS TO TRACK:

### **EMAIL METRICS:**
- Open rate (každý email)
- Click rate (CTA clicks)
- Reply rate (engagement)
- Unsubscribe rate

### **CONVERSION METRICS:**
- Email #1 → Minikurz visit: target >30%
- Email #2 → Reply/engagement: target >15%
- Email #3 → Checkout visit: target >12%
- Email #3 → Purchase: target >2%
- Email #4 → Last chance purchase: target >3%
- Email #5 → Feedback replies: target >5%

### **REVENUE METRICS:**
- Revenue per email
- Cost per acquisition
- LTV (lifetime value)

---

## 🚨 PŘED SPUŠTĚNÍM:

### **✅ CHECKLIST:**

- [ ] Smartemailing automation nastavena
- [ ] Webhook na landing page funkční
- [ ] GoPay webhook nastavený
- [ ] Tags nastaveny (registered, purchased, etc.)
- [ ] Links testovány (minikurz, objednávka)
- [ ] UTM tracking (optional)
- [ ] Email preview test (Gmail, Outlook, Apple Mail)
- [ ] Mobile optimization check
- [ ] Spam score check (<5)
- [ ] Unsubscribe link (povinné!)
- [ ] GDPR compliance (consent checkbox)

---

## 💡 TIPS:

### **A/B TEST IDEAS:**

**Subject lines:**
- Email #3A: "🔥 OTEVŘENO: Tvoje exkluzivní sleva 40%!"
- Email #3B: "4.999 Kč místo 8.499 Kč (ještě 48h!) ⏰"

**CTA text:**
- A: "ZÍSKAT PŘÍSTUP SE SLEVOU 40% →"
- B: "OBJEDNAT TEĎKA →"
- C: "CHCI KURZ SE SLEVOU →"

**Timing:**
- Test: Email #3 v 12:00 vs 18:00
- Test: Email #4 v 10:00 vs 20:00

---

## 🎯 OPTIMALIZACE PO SPUŠTĚNÍ:

### **POKUD NÍZKÝ OPEN RATE (<30%):**
- Vylepši subject lines
- Test emoji vs no emoji
- Test timing (dopoledne vs odpoledne)

### **POKUD NÍZKÝ CLICK RATE (<5%):**
- Zkrať emaily ještě víc
- Výraznější CTA
- Test urgency messaging

### **POKUD NÍZKÁ KONVERZE (<1.5%):**
- Možná je problém v checkout procesu
- Test různé ceny
- Přidej social proof
- Zvýraz záruku vrácení peněz

---

## 📞 SUPPORT:

**Pokud máš problém:**
1. Zkontroluj `/ARCHIVE/emails/EMAIL_SEQUENCE_FINAL_v2_2025-01-21.md`
2. Zkontroluj automation flow v Smartemailing
3. Otestuj webhook (email opt-in + purchase)
4. Check logs (Netlify Functions)

---

## 🚀 READY TO LAUNCH?

**ANO?** → Nastav Smartemailing automation → Test flow → LAUNCH! 🎉

**NE?** → Co chybí? Checklist výše! ✅

---

**Bottom line:** Máš kompletní email sekvenci ready pro produkci! 🔥  
Kratší, jasnější, hype-focused! Based na tvých produkčních emailech! ✅
