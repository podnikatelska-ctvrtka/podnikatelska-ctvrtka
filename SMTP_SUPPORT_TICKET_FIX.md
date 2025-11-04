# 🔧 SMTP Support Ticket Fix - Seznam.cz

**Datum:** 3. listopadu 2025  
**Problém:** Support ticket se neodesílá přes Seznam.cz SMTP

---

## ✅ CO JSEM OPRAVIL

1. ✅ **Přidal nodemailer** do `/netlify/functions/package.json`
   - Chybělo! Proto to nefungovalo
   
2. ✅ **Přidal SMTP verification** před odesláním
   - Zkontroluje spojení se Seznam.cz SMTP serverem
   
3. ✅ **Přidal debug logging**
   - Uvidíš v Netlify logs co přesně se děje
   
4. ✅ **Opravil SSL/TLS logiku**
   - Port 465 = SSL (secure: true)
   - Port 587 = TLS (secure: false)

---

## 🚀 CO TEĎKA UDĚLAT

### 1️⃣ Push a redeploy:

```bash
git add netlify/functions/send-support-ticket.js
git add netlify/functions/package.json
git add SMTP_SUPPORT_TICKET_FIX.md
git commit -m "fix: SMTP support ticket with nodemailer + debug logging"
git push
```

**DŮLEŽITÉ:** Netlify musí nainstalovat nodemailer, takže počkej až deploy doběhne (1-2 minuty)

### 2️⃣ Zkontroluj env variables v Netlify:

**Site Settings → Environment Variables** - musí být nastavené:

```
SMTP_HOST = smtp.seznam.cz
SMTP_PORT = 465 (nebo 587)
SMTP_USER = tvuj-email@seznam.cz
SMTP_PASS = tvoje-heslo
```

**Pro port 465:**
- SSL spojení (secure)
- Doporučeno pro Seznam.cz

**Pro port 587:**
- TLS spojení (STARTTLS)
- Alternativa pokud 465 nefunguje

### 3️⃣ Test support ticketu:

Po deployi (až Netlify nainstaluje nodemailer):
1. Otevři kurz v produkci
2. Klikni na help tlačítko (modré kolečko)
3. Vyplň formulář:
   - Email: tvuj-email@seznam.cz
   - Předmět: Test SMTP
   - Zpráva: Testuji SMTP přes Seznam.cz
4. Klikni **Odeslat**

### 4️⃣ Zkontroluj logy:

**Netlify Dashboard:**
1. **Functions** → **send-support-ticket**
2. **View logs**

**CO HLEDAT V LOGU:**

✅ **ÚSPĚCH (mělo by být):**
```
📧 Sending support ticket...
SMTP Config:
- Host: smtp.seznam.cz
- Port: 465
- User: tvuj-email@seznam.cz
- Pass: ***set***
Creating SMTP transporter...
- SSL mode: true
Verifying SMTP connection...
✅ SMTP connection verified!
Sending email...
✅ Email sent successfully!
Message ID: <xxx@seznam.cz>
```

❌ **CHYBA (pokud se objeví):**
```
❌ Missing SMTP credentials!
```
→ Není nastavená některá env variable

```
❌ SMTP verification failed: Invalid login
```
→ Špatné SMTP_USER nebo SMTP_PASS

```
❌ SMTP verification failed: Connection timeout
```
→ Špatný SMTP_HOST nebo SMTP_PORT

---

## 🐛 Troubleshooting

### ❌ "Invalid login" nebo "Authentication failed"

**Příčina:** Špatné credentials  
**Řešení:**

1. **Zkontroluj email a heslo:**
   - Použij svůj běžný Seznam.cz email
   - Použij BĚŽNÉ heslo (ne app password, Seznam to nevyžaduje)

2. **Zkontroluj že Seznam.cz SMTP povoluje externí přístup:**
   - Přihlaš se do Seznam.cz email
   - Zkontroluj Nastavení → Účet
   - Mělo by být povoleno "SMTP přístup" nebo "POP3/SMTP"

3. **Zkus test přes terminal:**
   ```bash
   # Test SMTP spojení
   openssl s_client -connect smtp.seznam.cz:465 -crlf
   # Mělo by odpovědět: 220 smtp.seznam.cz ESMTP
   ```

### ❌ "Connection timeout" nebo "ECONNREFUSED"

**Příčina:** Špatný host nebo port  
**Řešení:**

Pro Seznam.cz jsou platné:
- **Host:** `smtp.seznam.cz` (ne email.seznam.cz)
- **Port:** `465` (SSL) nebo `587` (TLS)

Zkus změnit port v Netlify env variables:
- Z 465 na 587
- Nebo z 587 na 465

### ❌ "Module not found: nodemailer"

**Příčina:** Netlify ještě nenainstaloval nodemailer  
**Řešení:**

1. Počkej 1-2 minuty po deployi
2. Nebo trigger nový deploy v Netlify:
   - **Deploys → Trigger Deploy → Clear cache and deploy**

---

## 📧 Seznam.cz SMTP Nastavení

**Oficiální Seznam.cz SMTP:**

```
Server: smtp.seznam.cz
Port: 465 (SSL) nebo 587 (TLS)
Zabezpečení: SSL/TLS
Autentizace: Ano (tvůj email a heslo)
```

**POZOR:**
- Musíš použít email **@seznam.cz** (ne @email.cz)
- From email (`SMTP_USER`) musí být stejný jako login
- Seznam.cz má limit na počet emailů/den (obvykle 500-1000)

---

## ✅ Výhody SMTP řešení

1. **Jednoduché** - jen 4 env variables
2. **Levné** - nic neplatíš (Seznam.cz je zdarma)
3. **Spolehlivé** - Seznam.cz má vyšší deliverability než personal SMTP
4. **Reply-To funguje** - můžeš odpovídat přímo zákazníkovi

---

## 🔄 Alternativy pokud Seznam.cz nefunguje

### Gmail (Vyžaduje App Password)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=vas-email@gmail.com
SMTP_PASS=app-password (ne běžné heslo!)
```

Jak získat Gmail App Password:
1. https://myaccount.google.com/security
2. Zapni 2-Step Verification
3. https://myaccount.google.com/apppasswords
4. Vytvoř App Password pro "Mail"

### Outlook/Hotmail
```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=vas-email@outlook.com
SMTP_PASS=vase-heslo
```

---

**Status:** 🔧 FIX READY - jen push, redeploy a test!  
**Next:** Jakmile otestuješ, pošli mi screenshot Netlify Function logu
