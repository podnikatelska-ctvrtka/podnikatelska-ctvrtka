# ⚡ QUICK LAUNCH - FLOWLANCE SETUP (30 MINUT)

## 🎯 TVOJE SITUACE

✅ Landing page je ready (podnikatelskactvrtka.cz)  
✅ Make.com webhook funguje (posílá ti notifikace)  
✅ Email sekvence napsaná (5 emailů, 10 dní)  
✅ Redirect tlačítko aktivované  
⏳ Flowlance nemá API (musíme použít redirect)  
⏳ Flowlance platforma bude za 2 týdny  
🚀 Potřebuješ spustit RYCHLE (reklamy čekají!)  

---

## ⏱️ QUICK SETUP (30 MINUT)

### **KROK 1: Vytvoř Flowlance produkt (10 min)**

1. **Jdi do Flowlance**
2. **Vytvoř nový produkt:**
   - Název: "Podnikatelská Čtvrtka - Průkopníci"
   - Typ: **Free optin** (žádná platba při registraci)
   - Popis: "Exkluzivní předprodej s 3-denním mini kurzem zdarma"

3. **Zkopíruj optin URL:**
   - Flowlance ti dá URL typu: `https://my.flowlance.com/xxx/yyy`
   - **ZKOPÍRUJ JI!** Budeš ji potřebovat

---

### **KROK 2: Nastav 5 emailů ve Flowlance (15 min)**

📄 **Otevři:** `/EMAIL_SEKVENCE_ZKRACENA_10DNI.md`

**Zkopíruj tyto emaily do Flowlance:**

| Email | Kdy poslat | Subject |
|-------|-----------|---------|
| #1 | 0 dní (okamžitě) | "✅ Jste PRŮKOPNÍK! + 🎁 Mini kurz ZDARMA" |
| #2 | +1 den | "🔓 Den 2 a 3 odemčeny: Dokončete!" |
| #3 | +4 dny | "⏰ Za 3 dny: Otevíráme brány!" |
| #4 | +7 dní | "🎉 OTEVŘENO! (48h)" |
| #5 | +9 dní | "Zmeškali jste to?" |

**V každém emailu změň:**
- `[Tvoje jméno]` → tvoje skutečné jméno
- `[DATUM]` → datum launch (7 dní od spuštění reklam)
- `[X]/50` → aktuální číslo zbývajících konzultací

**Zkontroluj odkazy:**
```
✅ https://podnikatelskactvrtka.cz/priprava?token=minicourse2025
✅ https://podnikatelskactvrtka.cz/priprava?token=minicourse2025&day=2
✅ https://podnikatelskactvrtka.cz/priprava?token=minicourse2025&day=3
✅ https://podnikatelskactvrtka.cz/order
```

---

### **KROK 3: Aktivuj Flowlance URL v kódu (5 min)**

1. **Otevři:** `/components/PrelaunchEmailCapture.tsx`

2. **Najdi řádek 23:**
   ```typescript
   const FLOWLANCE_OPTIN_URL = 'https://my.flowlance.com/TVOJE-PRODUKT-URL';
   ```

3. **Nahraď svou Flowlance optin URL:**
   ```typescript
   const FLOWLANCE_OPTIN_URL = 'https://my.flowlance.com/xxx/yyy'; // ← Tvoje URL z kroku 1!
   ```

4. **Ulož soubor!**

5. **Build & deploy:**
   ```bash
   npm run build
   git add .
   git commit -m "Aktivace Flowlance redirect"
   git push
   ```

---

## ✅ TEST FLOW (5 MINUT)

**Po deploy:**

1. **Jdi na:** `https://podnikatelskactvrtka.cz`

2. **Zaregistruj testovací email:** `tvuj-test@email.cz`

3. **Zkontroluj:**
   - [ ] Zobrazil se success screen?
   - [ ] Vidíš tlačítko "🎁 CHCI MINI KURZ ZDARMA"?
   - [ ] Přišel ti Make.com notifikační email?
   - [ ] Klikneš na tlačítko → redirect do Flowlance?
   - [ ] Flowlance má email předvyplněný?
   - [ ] Po potvrzení → dostaneš Email #1?
   - [ ] Odkaz na mini kurz v emailu funguje?

4. **Pokud vše OK:**
   ```
   🎉 JE TO READY!
   🚀 MŮŽEŠ SPUSTIT REKLAMY!
   ```

---

## 📅 LAUNCH TIMELINE

**Pokud spustíš reklamy DNES:**

```
DEN 0 (dnes):
   🚀 Spusť reklamy
   ✅ První registrace
   📧 Email #1 posílá automaticky
   
DEN 1:
   📧 Email #2 (odemknutí Den 2+3)
   
DEN 4:
   📧 Email #3 (reminder -3 dny před launch)
   
DEN 7: 🔥 LAUNCH DAY!
   📧 Email #4 (prodej otevřen - 48h!)
   💰 Začni prodávat
   
DEN 9:
   🔒 Prodej uzavřen
   📧 Email #5 (recovery)
   💰 Cena skočí na 6.999 Kč
   
DEN 10+:
   🎊 Onboarding studentů
```

**Za 10 dní máš hotovo!** 🎉

---

## 💰 EXPECTED VÝSLEDKY

**Při 100 registracích (z reklam):**

```
100 lidí se registruje na landing
    ↓ 75% klikne na Flowlance
75 registrací ve Flowlance
    ↓ 50% otevře emaily
38 engaged subscribers
    ↓ 40% otevře launch email
15 hot leads
    ↓ 60% koupí
8-10 prodejů

💰 REVENUE: 40.000 - 50.000 Kč
```

**ROI na reklamy:**
- Investment: ~10.000 Kč (reklamy)
- Revenue: 40.000 Kč
- **ROI: 4× 🚀**

---

## 🎨 SUCCESS MESSAGE DO FLOWLANCE

**Když vytváříš Flowlance optin, přidej tento text jako "Thank you message":**

```
✅ VÍTEJTE MEZI PRŮKOPNÍKY!

Gratulujeme! Právě jste se stali oficiálním PRŮKOPNÍKEM.

📧 Za chvíli vám přijde email s přístupem k 3-dennímu mini kurzu (hodnota 2.999 Kč) - ZDARMA!

🎁 CO DOSTANETE:
• Den 1: Zpětná vazba od zákazníků (šablony)
• Den 2: Konkurenční výhoda (framework)
• Den 3: Messaging makeover (příklady)

💰 PRŮKOPNICKÁ CENA:
Když spustíme hlavní kurz, dostanete speciální cenu:
4.999 Kč místo 8.499 Kč (úspora 3.500 Kč!)

+ BONUS pro prvních 50 kupujících:
30min osobní konzultace ZDARMA (hodnota 1.500 Kč)

---

📅 LAUNCH: ZA 7 DNÍ!
Sledujte svůj email!

Máte otázky? Odpovězte na email který vám přijde!
```

*(Případně vytvoř obrázek v Canva a vlož ho do Flowlance)*

---

## 🎯 FAQ DO FLOWLANCE

**Můžeš přidat FAQ sekci do Flowlance produktu:**

### **Q: Kdy dostanu přístup k mini kurzu?**
A: Během 2 minut na email který jste zadali.

### **Q: Je to opravdu zdarma?**
A: Ano! Mini kurz (hodnota 2.999 Kč) je 100% zdarma pro všechny průkopníky.

### **Q: Kdy spouštíte hlavní kurz?**
A: Za 7 dní! Dostanete email s detaily.

### **Q: Kolik bude stát hlavní kurz?**
A: Pro průkopníky: 4.999 Kč (sleva 41%). Normální cena: 8.499 Kč.

### **Q: Co když mám otázky?**
A: Odpovězte na jakýkoli email který vám pošleme - odpovídáme do 24 hodin!

---

## ⚠️ DŮLEŽITÉ PŘED LAUNCH (DEN 7)

**CO MUSÍŠ MÍT HOTOVÉ DO DNE 7:**

- [ ] Order page vytvořená (`/order`)
- [ ] Payment gateway aktivní (Stripe/PayPal)
- [ ] Kurz obsah připravený (video + worksheety)
- [ ] Konzultace booking (Calendly link)
- [ ] Thank you email pro kupující

**MÁME 7 DNÍ!** Stačí to! 💪

---

## 🆘 TROUBLESHOOTING

### **"Flowlance optin URL nefunguje"**
→ Zkontroluj že jsi zkopíroval celou URL (včetně `https://`)

### **"Redirect tlačítko se nezobrazuje"**
→ Zkontroluj v kódu:
```typescript
FLOWLANCE_REDIRECT_CONFIG.enabled = true
FLOWLANCE_REDIRECT_CONFIG.showButton = true
```

### **"Email #1 nepřichází z Flowlance"**
→ Zkontroluj že:
- Automatizace je aktivní ve Flowlance
- Email #1 má timing "0 dní"
- Testovací email se opravdu přidal do listu

### **"Make.com notifikace nepřichází"**
→ To je OK! Make.com je jen bonus pro tvé notifikace.
→ Hlavní flow je přes Flowlance.

---

## ✅ CHECKLIST

**PŘED SPUŠTĚNÍM REKLAM:**
- [ ] Flowlance produkt vytvořený
- [ ] 5 emailů zkopírovaných do Flowlance
- [ ] Časování nastavené (0, +1, +4, +7, +9 dní)
- [ ] Flowlance URL v kódu (`FLOWLANCE_OPTIN_URL`)
- [ ] Deploy hotový (Netlify)
- [ ] Test flow úspěšný (testovací email prošel)
- [ ] Mini kurz funguje (odkazy OK)

**V DEN LAUNCH (DEN 7):**
- [ ] Order page live
- [ ] Payment funguje
- [ ] Kurz přístupný
- [ ] Konzultace booking ready

---

## 🚀 READY TO GO?

**MÁTE:**
✅ Landing page  
✅ Email sekvence (5 emailů, 10 dní)  
✅ Redirect flow  
✅ Make.com notifikace  
✅ Mini kurz  

**TEĎKA:**
1. Setup Flowlance (30 min)
2. Test (5 min)
3. **SPUSTIT REKLAMY! 🔥**

---

## 📊 TRACKING

**Co sledovat každý den:**

**DEN 0-6 (pre-launch):**
- Počet registrací na landing page (Make.com emaily)
- Open rate Email #1 (Flowlance analytics)
- Click rate na mini kurz (Flowlance)
- Completion rate mini kurzu (analytics)

**DEN 7-9 (launch):**
- Open rate launch emailu
- Order page visits
- Add to cart
- **PRODEJE! 💰**

**DEN 10+ (post-launch):**
- Recovery email open rate
- Total revenue
- Student onboarding

---

## 💡 OPTIMALIZACE TIPS

### **Pokud málo registrací:**
- Zlepši FB reklamy (copy/creative)
- Testuj různé audiences
- Zvyš budget

### **Pokud nízký open rate:**
- Zlepši subject lines
- Pošli z osobního emailu (ne no-reply)
- A/B test timing

### **Pokud nízká konverze na prodej:**
- Přidej testimonials
- Zlepši urgenci (kratší deadline?)
- Přidej garanci (money back)
- Zvyš hodnotu bonusů

---

## 🎯 FINAL CHECKLIST

```
[ ] Flowlance produkt vytvořen (10 min)
[ ] 5 emailů zkopírováno (15 min)
[ ] Flowlance URL v kódu (5 min)
[ ] Test flow (5 min)
[ ] Deploy (auto via Git)

= 35 MINUT CELKEM
```

**PAK:**
```
🚀 SPUSTIT REKLAMY!
💰 SLEDOVAT REGISTRACE!
🎉 ZA 7 DNÍ LAUNCH!
```

---

**HODNĚ ŠTĚSTÍ! TY TO ZVLÁDNEŠ! 💪🔥🎊**

*P.S. Až budeš mít první prodej, oslavuj! 🍾*