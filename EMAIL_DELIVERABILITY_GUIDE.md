# 📧 EMAIL DELIVERABILITY - JAK VYŘEŠIT SPAM/HROMADNOU

## ⚠️ PROBLÉM: Emaily jdou do spamu/hromadné

**Proč se to děje:**
1. ❌ Posíláš z cizí domény (resend.dev)
2. ❌ Chybí SPF/DKIM/DMARC záznamy
3. ❌ Nová doména (není "warmed up")
4. ❌ Spam triggers v obsahu

---

## ✅ ŘEŠENÍ: 4 KROKY K 95%+ DELIVERABILITY

### **KROK 1: VLASTNÍ DOMÉNA (NUTNÉ!)**

**❌ ŠPATNĚ:**
```
Od: noreply@resend.dev
→ 50% jde do spamu
```

**✅ SPRÁVNĚ:**
```
Od: kurz@podnikatelskactvrtka.cz
→ 95% doručitelnost!
```

---

### **KROK 2: SPF, DKIM, DMARC (WEDOS DNS)**

#### **A) RESEND DOMAIN VERIFY**

1. **Jdi na:** resend.com/domains
2. **Add Domain:** `podnikatelskactvrtka.cz`
3. **Resend ti ukáže DNS záznamy:**

```
┌──────────────────────────────────────────────┐
│ TXT record (SPF)                             │
├──────────────────────────────────────────────┤
│ Host: podnikatelskactvrtka.cz                │
│ Value: v=spf1 include:resend.com ~all        │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ TXT record (DKIM)                            │
├──────────────────────────────────────────────┤
│ Host: resend._domainkey.podnikatelskactvrtka │
│ Value: k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA... │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ TXT record (DMARC)                           │
├──────────────────────────────────────────────┤
│ Host: _dmarc.podnikatelskactvrtka.cz         │
│ Value: v=DMARC1; p=none; rua=mailto:tvuj@... │
└──────────────────────────────────────────────┘
```

#### **B) WEDOS DNS SETUP**

1. **Přihlaš se do Wedos**
2. **Jdi na:** Domény → podnikatelskactvrtka.cz → DNS záznamy
3. **Přidej 3 TXT záznamy:**

**SPF záznam:**
```
Typ: TXT
Název: @ (nebo ponech prázdné)
Hodnota: v=spf1 include:resend.com ~all
TTL: 3600
```

**DKIM záznam:**
```
Typ: TXT
Název: resend._domainkey
Hodnota: [zkopíruj z Resend]
TTL: 3600
```

**DMARC záznam:**
```
Typ: TXT
Název: _dmarc
Hodnota: v=DMARC1; p=none; rua=mailto:tvuj@email.cz
TTL: 3600
```

4. **Ulož změny**
5. **Počkej 24-48 hodin** (DNS propagace)

#### **C) OVĚŘENÍ**

**V Resend:**
- Refresh stránku
- Mělo by být: ✅ Verified

**Test nástroje:**
- mxtoolbox.com/spf.aspx
- mxtoolbox.com/dkim.aspx
- dmarcian.com/dmarc-inspector/

---

### **KROK 3: EMAIL WARMING (první 2 týdny)**

**Proč:**
- Nová doména + high volume = spam flag
- Gmail/Seznam vidí "podezřelou aktivitu"

**Postup:**

```
Den 1-2:   Pošli 5 emailů (kamarádům/sobě)
           → Ask them to REPLY!
           
Den 3-5:   Pošli 10 emailů
           → Ask for replies + mark as important
           
Den 6-10:  Pošli 20 emailů/den
           
Den 11-14: Pošli 50 emailů/den
           
Den 15+:   Full volume! ✅
```

**Tipy:**
- ✅ Prvních 10 emailů = osobní (kamarádům)
- ✅ Požádej je aby odpověděli
- ✅ Požádej je aby označili jako "důležité"
- ✅ NEPOSÍLEJ spam (žádné "TEST TEST TEST")

---

### **KROK 4: EMAIL CONTENT BEST PRACTICES**

#### **❌ SPAM TRIGGERS (NEDĚLEJ!):**

```
❌ VELKÝMI PÍSMENY!!!
❌ Příliš mnoho emoji 🎉🔥💰🚀🎯💎✨⭐🌟
❌ Spam slova: 
   - ZDARMA!!!
   - KLIKNĚTE HNED!!!
   - 100% GARANCE!!!
   - ACT NOW!!!
❌ Krátký subject (< 3 slova)
❌ Jen HTML (bez plain text)
❌ Zkrácené linky (bit.ly)
❌ Přílohy od neznámých
```

#### **✅ GOOD PRACTICES:**

```
✅ Normální text jako kamarádovi
✅ Pár emoji je OK 🎉 (ne přeháněj!)
✅ Subject: 40-60 znaků
✅ Plain text + HTML verze
✅ Full URL (https://podnikatelskactvrtka.cz/...)
✅ Unsubscribe link (povinný!)
✅ Fyzická adresa v patičce (GDPR)
✅ Odpověď na email možná (ne noreply!)
```

#### **DOBRÝ EMAIL TEMPLATE:**

```
Subject: ✅ Váš přístup do kurzu je ready

Ahoj Jene!

Děkujeme za nákup kurzu Podnikatelská Čtvrtka! 🎉

Váš kurz je připravený. Tady je přístup:

https://podnikatelskactvrtka.cz/course?token=abc123...

[tlačítko: VSTOUPIT DO KURZU]

📄 Faktura je v příloze.

🎓 Co dál?
• Začněte s Modulem 1
• Postupujte svým tempem
• Máte přístup na 12 měsíců

🎁 BONUS: Prvních 50 dostává konzultaci ZDARMA!
Rezervujte si termín: https://calendly.com/...

Máte otázky? Odpovězte na tento email!

S pozdravem,
[Tvoje jméno]

---
Podnikatelská Čtvrtka
Adresa: Tvoje ulice 123, Praha
Odhlásit: https://podnikatelskactvrtka.cz/unsubscribe?email=...
```

---

## 🧪 TESTOVÁNÍ DELIVERABILITY

### **1. MAIL-TESTER.COM**

```
1. Jdi na: mail-tester.com
2. Pošli test email na jejich adresu
3. Zkontroluj score: cíl je 10/10!
```

**Co testují:**
- SPF/DKIM/DMARC setup ✅
- Spam keywords ❌
- HTML struktura
- Link reputation
- Blacklist check

### **2. GMASS SPAM CHECKER**

```
gmass.co/spam-solver
→ Paste tvůj email content
→ Vidíš spam score
```

### **3. MULTI-PROVIDER TEST**

**Pošli test email na:**
- Gmail: tvuj@gmail.com
- Seznam: tvuj@seznam.cz
- Outlook: tvuj@outlook.com
- Proton: tvuj@proton.me

**Zkontroluj:**
- ✅ Dorazil do inbox?
- ❌ Jde do spam/hromadné?
- ✅ Obrázky se načítají?
- ✅ Linky fungují?

---

## 📊 RESEND VS. OSTATNÍ

| Provider | FREE tier | Setup | Deliverability | Doporučení |
|----------|-----------|-------|----------------|------------|
| **Resend** | 100/den | ⭐⭐⭐⭐⭐ Easy | 95%+ | ✅ BEST! |
| SendGrid | 100/den | ⭐⭐⭐ Medium | 90%+ | ✅ OK |
| Mailgun | 100/den | ⭐⭐ Complex | 90%+ | ⚠️ Složitější |
| AWS SES | 200/den | ⭐ Hard | 95%+ | ❌ Pro advanced |

**WINNER: Resend!** 🏆

**Proč:**
- ✅ Super easy setup
- ✅ Generous FREE tier
- ✅ Skvělá deliverability
- ✅ Beautiful API
- ✅ Real-time analytics

---

## 💰 NÁKLADY

### **RESEND PRICING:**

```
FREE:       3000 emailů/měsíc ✅
$20/měsíc:  50,000 emailů
$80/měsíc:  100,000 emailů
```

**Pro tebe:**
- 10 prodejů/měsíc = 10 emailů = **FREE** ✅
- 100 prodejů/měsíc = 100 emailů = **FREE** ✅
- 1000 prodejů/měsíc = 1000 emailů = **FREE** ✅

**Až překročíš 3000 emailů/měsíc:**
- = ~3000 prodejů
- = Revenue: **15M Kč/měsíc!** 💰
- Pak můžeš platit $20/měsíc! 😄

---

## ✅ CHECKLIST PŘED LAUNCH

### **DNS SETUP:**
- [ ] SPF záznam přidán (Wedos)
- [ ] DKIM záznam přidán (Wedos)
- [ ] DMARC záznam přidán (Wedos)
- [ ] Počkej 24-48h (propagace)
- [ ] Verify v Resend ✅

### **EMAIL WARMING:**
- [ ] Den 1-2: 5 emailů (kamarádi)
- [ ] Den 3-5: 10 emailů
- [ ] Den 6-10: 20 emailů/den
- [ ] Den 11-14: 50 emailů/den
- [ ] Den 15+: Ready for launch! ✅

### **CONTENT:**
- [ ] Subject line tested (mail-tester.com)
- [ ] No spam keywords
- [ ] Unsubscribe link přidán
- [ ] Fyzická adresa v patičce
- [ ] Plain text + HTML verze
- [ ] Linky testované

### **TESTING:**
- [ ] Test na Gmail (inbox/spam?)
- [ ] Test na Seznam (inbox/hromadná?)
- [ ] Test na Outlook
- [ ] Mail-tester.com score: 10/10 ✅
- [ ] Links fungují
- [ ] Images se načítají

---

## 🚨 TROUBLESHOOTING

### **"Emails jdou do spamu i po SPF/DKIM"**

**Možné příčiny:**
1. DNS ještě nepropagované (čekej 48h)
2. Warming fáze (pošli víc osobních emailů)
3. Spam content (zkontroluj mail-tester.com)

**Řešení:**
- Počkej 48h po DNS změnách
- Pošli 10-20 osobních emailů kamarádům
- Požádej je aby odpověděli + označili jako důležité

### **"Resend domain není verified"**

**Řešení:**
1. Zkontroluj DNS záznamy v Wedos
2. Zkontroluj že jsou PŘESNĚ stejné jako v Resend
3. Počkaj 24-48h
4. Klikni "Verify" znovu v Resend

### **"Mail-tester.com score nízký"**

**Řešení:**
- Zkontroluj SPF/DKIM setup
- Odstraň spam keywords
- Přidej unsubscribe link
- Přidej plain text verzi

---

## 💡 PRO TIPS

### **1. Reply-To Address**

```
Od: kurz@podnikatelskactvrtka.cz
Reply-To: tvuj@osobni-email.cz
```

→ Uživatelé můžou odpovědět na tvůj osobní email!

### **2. Custom SMTP Name**

```
Od: Podnikatelská Čtvrtka <kurz@podnikatelskactvrtka.cz>
```

→ Vypadá profesionálně!

### **3. Engagement Tracking**

```
Resend má built-in:
- Open rate
- Click rate
- Bounce rate
- Spam rate
```

→ Sleduj metriky a optimalizuj!

### **4. A/B Testing Subject Lines**

```
Test A: "✅ Váš přístup do kurzu"
Test B: "🎓 Kurz je připravený! Vstupte hned"

Sleduj open rate → použij lepší!
```

---

## 🎯 EXPECTED DELIVERABILITY

**Po správném setup:**

```
Gmail:      95-98% inbox ✅
Seznam:     92-95% inbox ✅
Outlook:    90-93% inbox ✅
Proton:     95-98% inbox ✅

Average:    93-96% deliverability! 🎉
```

---

## 📞 SUPPORT

**Resend Support:**
- Email: support@resend.com
- Docs: resend.com/docs
- Discord: resend.com/discord

**Jsou super responsive!** (~2h response time)

---

## ✅ ZÁVĚR

**Setup čas:** 1 hodina (DNS + warming + testing)  
**Náklady:** 0 Kč (FREE tier stačí!)  
**Deliverability:** 95%+ (po správném setup)

**NEJDŮLEŽITĚJŠÍ:**
1. ✅ Vlastní doména (kurz@podnikatelskactvrtka.cz)
2. ✅ SPF/DKIM/DMARC (Wedos DNS)
3. ✅ Email warming (14 dní)
4. ✅ Good content (no spam triggers)

**TOHLE TĚ DOSTANE DO INBOX! 💪**