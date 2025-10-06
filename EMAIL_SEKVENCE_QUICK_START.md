# ⚡ EMAIL SEKVENCE - QUICK START GUIDE

## 🎯 CO MÁŠ HOTOVÉ

✅ Landing page s email capture  
✅ Make.com webhook (posílá ti notifikace)  
✅ Success screen s důvěryhodným designem  
✅ 3-denní mini kurz připravený  

## 🚀 CO TEĎKA POTŘEBUJEŠ

**3 JEDNODUCHÓ KROKY:**

### **KROK 1: Zkopíruj emaily (5 min)**

📄 Otevři: `/EMAIL_SEKVENCE_FLOWLANCE.md`

Tam najdeš:
- ✅ 7 emailů (texty ready to use)
- ✅ Časování (kdy posílat)
- ✅ Odkazy (na mini kurz + order page)

**Co udělat:**
1. Otevři Flowlance
2. Vytvoř nový produkt "Předprodej - Průkopníci"
3. Zkopíruj 7 emailů z dokumentu do Flowlance automatizace
4. Nastav časování:
   ```
   Email 1: 0 dní   (okamžitě)
   Email 2: +2 dny
   Email 3: +4 dny
   Email 4: +11 dní (-7 před launch)
   Email 5: +18 dní (launch day!)
   Email 6: +20 dní (-24h před koncem)
   Email 7: +23 dní (recovery)
   ```

---

### **KROK 2: Propoj Make.com s Flowlance (10 min)**

📄 Otevři: `/MAKE_FLOWLANCE_PROPOJENI.md`

**VARIANTA A: Pokud Flowlance má API** (nejlepší)
→ Následuj "Scénář A" v dokumentu

**VARIANTA B: Pokud Flowlance NEMÁ API** (záložní)
→ Aktivuj redirect tlačítko:

```typescript
// V /components/PrelaunchEmailCapture.tsx
const FLOWLANCE_REDIRECT_CONFIG = {
  enabled: true,     // ← Změň na true
  showButton: true,  // ← Změň na true
};

const FLOWLANCE_OPTIN_URL = 'https://tvoje-flowlance-url.com'; // ← Vlož své URL
```

**Pak:**
```bash
npm run build
# Nahraj na Netlify
```

---

### **KROK 3: Test (5 min)**

1. **Jdi na:** `podnikatelskactvrtka.cz`
2. **Zaregistruj testovací email**
3. **Zkontroluj:**
   - ✅ Přišel ti Make.com notifikační email?
   - ✅ Email se přidal do Flowlance?
   - ✅ Dostal jsi Email #1 z Flowlance?
   - ✅ Odkaz na mini kurz funguje?

4. **Pokud vše OK → SPUSTIT! 🚀**

---

## 📧 EMAIL SEKVENCE - PŘEHLED

```
📧 EMAIL #1 (okamžitě)
   "Vítejte mezi průkopníky + Mini kurz Den 1"
   → Link na Den 1 mini kurzu
   
📧 EMAIL #2 (+2 dny)
   "Odemknutí Den 2"
   → Link na Den 2 mini kurzu
   
📧 EMAIL #3 (+4 dny)
   "Odemknutí Den 3 (poslední!)"
   → Link na Den 3 mini kurzu
   → Info o hlavním kurzu
   
📧 EMAIL #4 (+11 dní)
   "Za 7 dní spouštíme!"
   → Připomínka launch date
   → Zvědavost
   
📧 EMAIL #5 (+18 dní) 🔥
   "LAUNCH DAY!"
   → Prodejní email
   → Link na order page
   → 72h deadline
   
📧 EMAIL #6 (+20 dní) ⏰
   "Poslední šance - 24h!"
   → Urgence
   → Link na order page
   
📧 EMAIL #7 (+23 dní) 🎁
   "Recovery + Bonus konzultace"
   → Pro ty kdo nekoupili
   → Speciální nabídka
```

---

## 🔗 DŮLEŽITÉ ODKAZY

**Mini kurz:**
```
Den 1: https://podnikatelskactvrtka.cz/priprava?token=minicourse2025
Den 2: https://podnikatelskactvrtka.cz/priprava?token=minicourse2025&day=2
Den 3: https://podnikatelskactvrtka.cz/priprava?token=minicourse2025&day=3
```

**Order page:**
```
Launch: https://podnikatelskactvrtka.cz/order
Recovery: https://podnikatelskactvrtka.cz/order?recovery=true
```

*(Poznámka: Order page ještě neexistuje - vytvoříš až před launch!)*

---

## 💰 EXPECTED VÝSLEDKY

**Při 100 registracích průkopníků:**

```
100 registrací
    ↓
70 otevře Email #1 (70%)
    ↓
40 klikne na Den 1 (40%)
    ↓
25 dokončí Den 1 (25%)
    ↓
15 otevře launch email (15%)
    ↓
5-10 koupí kurz (5-10%)
```

**Revenue estimate:**
- Pesimisticky: 5 × 4.999 Kč = **~25.000 Kč**
- Optimisticky: 10 × 4.999 Kč = **~50.000 Kč**

---

## 🎯 LAUNCH TIMELINE

**Předpokládejme že spustíš DNES:**

```
DEN 0 (dnes):
   ✅ Aktivuj email capture
   ✅ První registrace
   ✅ Email #1 automaticky posílá Den 1
   
DEN 2:
   📧 Email #2 (Den 2 mini kurzu)
   
DEN 4:
   📧 Email #3 (Den 3 mini kurzu)
   
DEN 11:
   📧 Email #4 (Reminder -7 dní)
   
DEN 18: 🚀 LAUNCH DAY!
   📧 Email #5 (Prodej otevřen!)
   💰 Prodejní okno: 72 hodin
   
DEN 20:
   📧 Email #6 (Last chance - 24h!)
   
DEN 21: 🔒 ZAVŘENÍ PRODEJE
   💰 Cena skočí z 4.999 → 6.999 Kč
   
DEN 23:
   📧 Email #7 (Recovery email)
```

**Celková délka:** 23 dní od první registrace po konec sekvence

---

## 📊 TRACKING & OPTIMALIZACE

**Co sledovat ve Flowlance:**

1. **Open rate** (kolik % otevře email)
   - Cíl: 30-50%
   - Pokud méně → zlepši subject line

2. **Click-through rate** (kolik % klikne)
   - Cíl: 10-20%
   - Pokud méně → zlepši CTA tlačítka

3. **Completion rate** (kolik % dokončí mini kurz)
   - Cíl: 20-30%
   - Pokud méně → zkrať obsah

4. **Conversion rate** (kolik % koupí)
   - Cíl: 5-10%
   - Pokud méně → zlepši nabídku/urgenci

---

## ⚠️ DŮLEŽITÉ PŘIPOMENUTKY

### **PŘED LAUNCH:**

1. **Vytvoř order page**
   - Cena: 4.999 Kč (sleva z 8.499 Kč)
   - Payment gateway (Stripe/PayPal)
   - Thank you page

2. **Připrav kurz**
   - Video lekce nahrané
   - Worksheety downloadable
   - Přístup na platformě

3. **Nastav konzultace**
   - Kalendář bookingu (Calendly?)
   - Limit 50 slots
   - Automatické poslání linku po nákupu

### **BĚHEM LAUNCH:**

1. **Sleduj metriky**
   - Kolik otevřelo email?
   - Kolik kliklo?
   - Kolik koupilo?

2. **Reaguj na otázky**
   - Odpovídej na reply emaily
   - Support via email/messenger

3. **Sociální důkaz**
   - Sdílej čísla ("Už X lidí se registrovalo!")
   - Screenshots testimonials

---

## 🆘 POTŘEBUJEŠ POMOC?

**Mám problém s:**

- **Flowlance setupem** → Otevři `/MAKE_FLOWLANCE_PROPOJENI.md`
- **Texty emailů** → Otevři `/EMAIL_SEKVENCE_FLOWLANCE.md`
- **Technické propojení** → Kontaktuj Flowlance support
- **Order page** → Řekni mi až budeš chtít vytvořit (před launch!)

---

## ✅ CHECKLIST - CO UDĚLAT TEĎ

**Setup (30 minut):**
- [ ] Zkopíruj 7 emailů do Flowlance
- [ ] Nastav časování automatizace
- [ ] Propoj Make.com → Flowlance (API nebo redirect)
- [ ] Otestuj flow (testovací email)

**Příprava na launch (1 týden):**
- [ ] Vytvoř order page
- [ ] Připrav kurz (video + materiály)
- [ ] Nastav konzultace (Calendly)
- [ ] Test payment flow

**Launch (3 dny):**
- [ ] Email #5 posílá (launch!)
- [ ] Sleduj metriky
- [ ] Odpovídej na otázky
- [ ] Email #6 posílá (urgence!)

**Post-launch (3 dny):**
- [ ] Email #7 posílá (recovery)
- [ ] Thank you email pro kupující
- [ ] Onboarding nových studentů

---

## 🎉 READY TO GO!

**Máš všechno co potřebuješ:**

✅ Email capture na landing page  
✅ 7 emailů (texty hotové)  
✅ Timing (23 dní)  
✅ Mini kurz (3 dny obsahu)  
✅ Make.com webhook (funguje)  

**TEĎKA JEN:**
1. Setup Flowlance (30 min)
2. Test flow (5 min)
3. Launch! 🚀

---

**HODNĚ ŠTĚSTÍ! 💪🔥**

*P.S. Až budeš mít první prodej, pošli mi screenshot! Budu se těšit! 🎊*