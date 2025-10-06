# 📊 EMAIL SEKVENCE - VIZUÁLNÍ FLOWCHART

## 🎯 USER JOURNEY - OD REGISTRACE PO NÁKUP

```
┌─────────────────────────────────────────────────┐
│  USER na podnikatelskactvrtka.cz                │
│  Vidí: Email capture form                       │
└─────────────────────────────────────────────────┘
                    │
                    │ zadá email
                    ▼
┌─────────────────────────────────────────────────┐
│  SUCCESS SCREEN (tvůj design!)                  │
│  • "Jste PRŮKOPNÍK #X!"                         │
│  • "Mini kurz 2.999 Kč ZDARMA"                  │
│  • "Ušetříte 7.999 Kč"                          │
└─────────────────────────────────────────────────┘
                    │
                    │ na pozadí
                    ▼
┌─────────────────────────────────────────────────┐
│  MAKE.COM WEBHOOK                               │
│  • Přijme email                                 │
│  • Pošle notifikaci na tvůj Seznam email       │
│  • Pošle do Flowlance (API/redirect)           │
└─────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────┐
│  FLOWLANCE                                      │
│  • Email přidán do optin listu                  │
│  • Spustí automatizaci (7 emailů)              │
└─────────────────────────────────────────────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │  EMAIL SEKVENCE       │
        │  23 dní, 7 emailů     │
        └───────────────────────┘
```

---

## 📧 EMAIL SEKVENCE TIMELINE

```
DEN 0                           EMAIL #1: Vítání + Den 1
│                               ┌────────────────────────┐
│                               │ "Jste PRŮKOPNÍK!"      │
│                               │ Link: Mini kurz Den 1  │
│                               │ Hodnota: 2.999 Kč FREE │
│                               └────────────────────────┘
│                                         │
│                                         │ user klikne
│                                         ▼
│                               ┌────────────────────────┐
│                               │ MINI KURZ - DEN 1      │
│                               │ "Co zákazníci chtějí?" │
│                               │ Šablony + úkoly        │
│                               └────────────────────────┘
│
├──── +2 DNY ──────────────────> EMAIL #2: Odemknutí Den 2
│                               ┌────────────────────────┐
│                               │ "Najděte odlišení"     │
│                               │ Link: Mini kurz Den 2  │
│                               │ Quick tip + příklad    │
│                               └────────────────────────┘
│                                         │
│                                         │ user klikne
│                                         ▼
│                               ┌────────────────────────┐
│                               │ MINI KURZ - DEN 2      │
│                               │ "Konkurenční výhoda"   │
│                               │ Analýza + framework    │
│                               └────────────────────────┘
│
├──── +4 DNY ──────────────────> EMAIL #3: Odemknutí Den 3
│                               ┌────────────────────────┐
│                               │ "Messaging makeover"   │
│                               │ Link: Mini kurz Den 3  │
│                               │ Gratulace k dokončení  │
│                               └────────────────────────┘
│                                         │
│                                         │ user klikne
│                                         ▼
│                               ┌────────────────────────┐
│                               │ MINI KURZ - DEN 3      │
│                               │ "Jak mluvit o sobě"    │
│                               │ Messaging framework    │
│                               └────────────────────────┘
│
├──── +11 DNÍ ─────────────────> EMAIL #4: Reminder (-7 dní před launch)
│                               ┌────────────────────────┐
│                               │ "Za 7 dní spouštíme!"  │
│                               │ Recap mini kurzu       │
│                               │ Teaser hlavního kurzu  │
│                               │ Značit do kalendáře    │
│                               └────────────────────────┘
│                                         │
│                                         │ awareness
│                                         ▼
│                               ┌────────────────────────┐
│                               │ USER je připraven      │
│                               │ Ví co dostane          │
│                               │ Má důvěru (mini kurz)  │
│                               └────────────────────────┘
│
├──── +18 DNÍ ─────────────────> EMAIL #5: 🔥 LAUNCH DAY!
│                               ┌────────────────────────┐
│                               │ "OTEVŘENO!"            │
│                               │ Cena: 4.999 Kč         │
│                               │ Sleva: 41% (72h)       │
│                               │ Bonus: Konzultace (50×)│
│                               │ Link: ORDER PAGE       │
│                               └────────────────────────┘
│                                         │
│                               ┌─────────┴─────────┐
│                               │                   │
│                      koupi    ▼                   ▼  nekoupi
│                     ┌─────────────────┐    ┌──────────────┐
│                     │ THANK YOU!      │    │ Čeká 2 dny   │
│                     │ • Kurz přístup  │    └──────────────┘
│                     │ • Konzultace    │           │
│                     │ • Welcome email │           │
│                     └─────────────────┘           │
│                                                   │
├──── +20 DNÍ ──────────────────────────────────────┘
│                               ▼
│                        EMAIL #6: ⏰ Last chance (24h!)
│                        ┌────────────────────────┐
│                        │ "Za 24h zavíráme!"     │
│                        │ Urgence + FOMO         │
│                        │ Cena skočí na 6.999    │
│                        │ Link: ORDER PAGE       │
│                        └────────────────────────┘
│                                  │
│                        ┌─────────┴─────────┐
│                        │                   │
│               koupi    ▼                   ▼  nekoupi
│              ┌──────────────┐      ┌──────────────┐
│              │ THANK YOU!   │      │ Čeká 3 dny   │
│              └──────────────┘      └──────────────┘
│                                            │
├──── +23 DNÍ ──────────────────────────────┘
│                               ▼
│                     EMAIL #7: 🎁 Recovery
│                     ┌────────────────────────┐
│                     │ "Zmeškali jste?"       │
│                     │ Cena: 6.999 Kč         │
│                     │ BONUS: Konzultace FREE │
│                     │ Limit: 48h             │
│                     │ Link: ORDER PAGE       │
│                     └────────────────────────┘
│                               │
│                     ┌─────────┴─────────┐
│                     │                   │
│            koupi    ▼                   ▼  nekoupi
│           ┌──────────────┐      ┌──────────────┐
│           │ THANK YOU!   │      │ KONEC        │
│           │ + KONZULTACE │      │ Unsubscribe? │
│           └──────────────┘      └──────────────┘
│
▼
KONEC SEKVENCE
```

---

## 🎯 KONVERZNÍ FUNNEL

```
1000 NÁVŠTĚVNÍKŮ landing page
        │
        │ 15% konverze
        ▼
    150 REGISTRACÍ (průkopníci)
        │
        │ 70% open rate
        ▼
    105 OTEVŘE Email #1
        │
        │ 40% click rate
        ▼
     42 KLIKNE na Den 1
        │
        │ 60% completion
        ▼
     25 DOKONČÍ Den 1
        │
        │ pokračují dále
        ▼
     15 DOKONČÍ celý mini kurz
        │
        │ 60% open rate (launch email)
        ▼
      9 OTEVŘE launch email
        │
        │ 50-80% conversion
        ▼
    5-7 KOUPÍ kurz
        │
        │
        ▼
    💰 REVENUE: 5-7 × 4.999 = 25.000 - 35.000 Kč
```

**Celková konverze:** 0,5-0,7% (návštěvník → platící zákazník)  
**To je DOBRÝ výsledek pro cold traffic!**

---

## 💰 VALUE STACK PO CELÉ SEKVENCI

```
REGISTRACE (Den 0):
┌─────────────────────────────────────┐
│ ZÍSKÁVÁ:                            │
│ • Místo mezi průkopníky             │
│ • Mini kurz (2.999 Kč) ZDARMA       │
│ • Informace o hlavním kurzu         │
│                                     │
│ DÁVÁ: Email                         │
└─────────────────────────────────────┘

MINI KURZ (Den 0-4):
┌─────────────────────────────────────┐
│ ZÍSKÁVÁ:                            │
│ • Den 1: Zpětná vazba framework     │
│ • Den 2: Konkurenční analýza        │
│ • Den 3: Messaging makeover         │
│ • Šablony, úkoly, příklady          │
│                                     │
│ DÁVÁ: Čas (3× 20-30 min)            │
└─────────────────────────────────────┘

LAUNCH (Den 18):
┌─────────────────────────────────────┐
│ ZÍSKÁVÁ:                            │
│ • Hlavní kurz (8.499 Kč)            │
│ • Průkopnická cena (4.999 Kč)       ���
│ • Konzultace (1.500 Kč) - 50×       │
│ • Celková hodnota: 12.998 Kč        │
│                                     │
│ DÁVÁ: 4.999 Kč                      │
│                                     │
│ ROI: 160% (12.998/4.999)            │
└─────────────────────────────────────┘
```

---

## 🧠 PSYCHOLOGIE SEKVENCE

```
EMAIL #1-3: 🎁 HODNOTA
├── Žádný prodej
├── Pouze value delivery
├── Budování důvěry
└── Engagement (3 dny = 3 interakce)

EMAIL #4: 🔔 AWARENESS
├── Upozornění na launch
├── Příprava na prodej
├── Building anticipation
└── Žádný tlak

EMAIL #5-6: 💰 PRODEJ
├── Jasná nabídka
├── Urgence (72h deadline)
├── Scarcity (50× konzultace)
└── Social proof

EMAIL #7: 🎁 RECOVERY
├── Zachránit ztracené leady
├── Bonus jako incentive
├── Last last chance
└── FOMO
```

---

## 📊 METRIKY CO SLEDOVAT

### **DEN 0-4 (Mini kurz):**
```
✅ Registrace (počet)
✅ Email #1 open rate (cíl: 70%)
✅ Den 1 click rate (cíl: 40%)
✅ Den 1 completion rate (cíl: 25%)
```

### **DEN 11 (Reminder):**
```
✅ Email #4 open rate (cíl: 50%)
✅ Engagement (reply rate)
✅ Unsubscribe rate (max: 2%)
```

### **DEN 18-21 (Launch):**
```
🔥 Email #5 open rate (cíl: 60%)
🔥 Order page visits
🔥 Add to cart rate
🔥 Conversion rate (cíl: 50-80% z těch co otevřou)
💰 Revenue
```

### **DEN 23 (Recovery):**
```
✅ Email #7 open rate (cíl: 40%)
✅ Recovery conversion (cíl: 20%)
```

---

## 🎯 OPTIMALIZACE TIPS

### **Pokud LOW OPEN RATE:**
```
❌ Problém: Emaily jdou do spamu
✅ Fix:
   1. Warm up domain (postupně zvyšuj objem)
   2. Zlepši subject line (A/B test)
   3. Zkontroluj SPF/DKIM records
```

### **Pokud LOW CLICK RATE:**
```
❌ Problém: Obsah není engaging
✅ Fix:
   1. Silnější CTA (větší tlačítko)
   2. Kratší email (méně textu)
   3. Více benefitů v kopii
```

### **Pokud LOW CONVERSION:**
```
❌ Problém: Nabídka/cena/urgence
✅ Fix:
   1. Zlepši value proposition
   2. Přidej testimonials
   3. Prodluž deadline (96h místo 72h)
   4. Přidej garanci (money back)
```

---

## ✅ CHECKLIST PRO KAŽDÝ EMAIL

**PŘED POSLÁNÍM:**
- [ ] Subject line je catchy (méně než 50 znaků)
- [ ] Preview text je vyplněný
- [ ] Všechny odkazy fungují
- [ ] Žádné překlepy
- [ ] Unsubscribe link na konci
- [ ] Mobilní optimalizace OK

**PO POSLÁNÍ:**
- [ ] Zkontroluj open rate (24h)
- [ ] Zkontroluj click rate (24h)
- [ ] Odpověz na reply emaily
- [ ] Sleduj unsubscribe rate

---

## 🎉 SUMMARY

**Email sekvence má:**
- ✅ 7 emailů
- ✅ 23 dní
- ✅ 3 fáze (Value → Awareness → Prodej)
- ✅ Expected konverze: 5-10%
- ✅ Expected revenue: 25-50k Kč (při 100 registracích)

**Co potřebuješ:**
1. Setup Flowlance (30 min)
2. Propoj Make → Flowlance (10 min)
3. Test (5 min)
4. **LAUNCH! 🚀**

---

**HODNĚ ŠTĚSTÍ! 💪🔥**