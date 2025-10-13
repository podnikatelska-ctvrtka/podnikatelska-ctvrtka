# 🚀 QUICK START GUIDE - SPUŠTĚNÍ ZA 2 HODINY

## ✅ CO JE HOTOVÉ

- [x] Landing page upravená (HeroSection, PrelaunchEmailCapture)
- [x] Route `/minikurz` připravená
- [x] MiniCourse komponenta funguje (3 dny)
- [x] Smartemailing funkce připravená (`/netlify/functions/smartemailing-subscribe.js`)
- [x] Email flow napsaný (4 emaily - viz `SMARTEMAILING_EMAIL_FLOW.md`)

---

## ⚡ CO ZBÝVÁ UDĚLAT (2 HODINY)

### **KROK 1: SMARTEMAILING SETUP (30 min)**

#### **A) Vytvořte Contact List**

1. Přihlaste se do Smartemailing
2. Jděte na **Contacts → Lists**
3. Klikněte **"Create new list"**
4. Název: `Mini kurz - Podnikatelská Čtvrtka`
5. **Zkopírujte List ID** (najdete v URL nebo v detailu listu)

#### **B) ENV proměnné na Netlify**

✅ **HOTOVO!** Již máte nastaveno:

```
SMARTEMAILING_USERNAME = ✅ nastaveno
SMARTEMAILING_API_KEY = ✅ nastaveno
SMARTEMAILING_LIST_ID = 2
```

💡 **Přeskakujte tento krok - máte hotovo!**

---

### **KROK 2: VYTVOŘTE 4 EMAILY (60 min)**

#### **Email #0 - Okamžitě**

1. Smartemailing → **Campaigns → Automated emails**
2. Klikněte **"Create new automation"**
3. **Název:** "Mini kurz - Welcome email"
4. **Trigger:** "Contact added to list" → Vyberte váš list
5. **Delay:** 0 minut (okamžitě)
6. **Email:** Zkopírujte text z `SMARTEMAILING_EMAIL_FLOW.md` → Email #0
7. **Změňte:** Link na `https://podnikatelska-ctvrtka.cz/minikurz`
8. **Aktivujte automation!**

#### **Email #1 - 24h**

1. Stejný proces jako #0
2. **Delay:** 1 den (24 hodin)
3. **Email:** Text z `SMARTEMAILING_EMAIL_FLOW.md` → Email #1
4. **Aktivujte!**

#### **Email #2 - 72h (LAUNCH)**

1. Stejný proces
2. **Delay:** 3 dny (72 hodin)
3. **Email:** Text z `SMARTEMAILING_EMAIL_FLOW.md` → Email #2
4. **DŮLEŽITÉ:** Přidejte FAPI platební link! (viz Krok 3)
5. **Aktivujte!**

#### **Email #3 - 96h (Reminder)**

1. Stejný proces
2. **Delay:** 4 dny (96 hodin)
3. **Podmínka:** Pouze pro kontakty co **NEKOUPILI** (segment "Nezaplatil")
4. **Email:** Text z `SMARTEMAILING_EMAIL_FLOW.md` → Email #3
5. **DŮLEŽITÉ:** Přidejte FAPI platební link!
6. **Aktivujte!**

---

### **KROK 3: FAPI PLATEBNÍ FORMULÁŘ (30 min)**

#### **A) Vytvořte produkt ve FAPI**

1. Přihlaste se do **FAPI**
2. **Produkty → Vytvořit nový produkt**
3. **Název:** Podnikatelská Čtvrtka
4. **Cena:** 4.999 Kč (bez DPH)
5. **Popis:** 
   ```
   Kompletní Business Model Canvas kurz
   - 3 moduly (9 lekcí)
   - Value Proposition Canvas
   - FIT validátor
   - Galerie 4 modelů
   - Personalizovaný akční plán
   ```
6. **Uložte produkt**

#### **B) Zkopírujte platební link**

1. FAPI → **Váš produkt → Platební odkaz**
2. **Zkopírujte link** (např. `https://platba.fapi.cz/XXXXX`)

#### **C) Přidejte link do emailů**

1. Smartemailing → **Email #2** → Edit
2. Najděte `[FAPI PLATEBNÍ LINK]`
3. **Nahraďte** vaším linkem z FAPI
4. **Uložte**

5. Stejné pro **Email #3**

---

### **KROK 4: TESTOVÁNÍ (15 min)**

#### **A) Test email capture**

1. Jděte na `https://podnikatelska-ctvrtka.cz/`
2. Scroll dolů na email formulář
3. **Zadejte testovací email** (váš vlastní)
4. Klikněte **"Získat mini kurz ZDARMA"**

**Očekávaný výsledek:**
- ✅ Success screen se zobrazí
- ✅ Tlačítko "ZAČÍT MINI KURZ HNED" funguje
- ✅ Email #0 přijde do 5 minut

#### **B) Test mini kurzu**

1. Klikněte na **"ZAČÍT MINI KURZ HNED"** nebo
2. Jděte na `https://podnikatelska-ctvrtka.cz/minikurz`

**Zkontrolujte:**
- ✅ Den 1 se zobrazí (3 zlaté otázky)
- ✅ Můžete přepínat mezi Dny 1-3
- ✅ Formuláře fungují

#### **C) Test emailů**

1. **Smartemailing** → Automation → Your automation
2. **Pro testování:** Změňte delay na **5 minut** (místo 1 den)
3. Registrujte **nový testovací email**
4. Čekejte 5 minut → Email #1 by měl přijít
5. **PO TESTU:** Změňte delay zpět na **1 den**! ⚠️

#### **D) Test FAPI platby**

1. Email #2 → Klikněte na platební link
2. FAPI formulář se zobrazí?
3. **NEZKOUŠEJTE PLATIT!** (nebo použijte testovací kartu)

---

## 🎉 HOTOVO! SPUŠTĚNÍ!

### **Checklist před launch:**

- [ ] ENV proměnné na Netlify nastavené
- [ ] Contact list v Smartemailing vytvořený
- [ ] 4 emaily vytvořené a aktivované
- [ ] FAPI produkt vytvořený (4.999 Kč)
- [ ] FAPI link v Email #2 a #3
- [ ] Testovací email capture funguje
- [ ] `/minikurz` route funguje
- [ ] Email #0 přichází
- [ ] Všechny linky fungují

### **LAUNCH! 🚀**

1. **Vytvoř FB reklamu** (viz `FINAL_AD_STRATEGY.md`)
2. **Budget:** 200 Kč/den
3. **Cíl:** Conversions (Lead)
4. **Landing page:** `https://podnikatelska-ctvrtka.cz/`
5. **Pixel tracking:** Ověř že funguje (Google Analytics + FB Pixel)

---

## 📊 SLEDOVÁNÍ VÝSLEDKŮ

### **Den 1-7:**

**Metriky:**
- Email registrace (CPL)
- Mini kurz completion rate
- Email open rate (#0, #1, #2, #3)
- Click-through rate (FAPI link)
- Konverze na prodej

**Cíle:**
- 47 registrací (200 Kč × 7 dní / 30 Kč CPL)
- 70% completion rate (33 lidí dokončí mini kurz)
- 25% konverze na prodej (8 prodejů × 4.999 = ~40k revenue)

---

## 🔧 TROUBLESHOOTING

### **Email nepřichází?**

1. Zkontrolujte ENV proměnné na Netlify
2. Zkontrolujte spam složku
3. Smartemailing → Logs → Podívejte se na chyby
4. Netlify Functions → Logs → `smartemailing-subscribe`

### **Mini kurz nefunguje?**

1. Zkontrolujte route: `/minikurz` nebo `/priprava`
2. Clear cache (Ctrl+Shift+R)
3. Zkontrolujte console errory (F12)

### **FAPI link nefunguje?**

1. Zkontrolujte že produkt je **aktivní** ve FAPI
2. Zkontrolujte že link je **správný** (zkopírovat znovu)
3. Otestujte link v inkognito okně

---

## 📞 PODPORA

Máte problém? 

1. Zkontrolujte `SMARTEMAILING_EMAIL_FLOW.md`
2. Zkontrolujte `LANDING_CHANGES_SUMMARY.md`
3. Netlify Functions logs
4. Smartemailing logs

---

**Good luck! 🚀**

**Poslední update:** 12.10.2025  
**Čas na setup:** ~2 hodiny  
**Status:** ✅ READY TO LAUNCH!
