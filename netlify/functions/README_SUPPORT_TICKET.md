# 🎫 Support Ticket System

## Přehled
Support ticket systém umožňuje zákazníkům odeslat dotaz nebo problém přímo z kurzu. Email se odešle na `kurz@podnikatelskactvrtka.cz`.

## Komponenty

### 1. WelcomeModal (Frontend)
- **Cesta**: `/components/WelcomeModal.tsx`
- **Funkce**: Formulář pro support ticket (email, předmět, zpráva)
- **Zobrazení**: 
  - ✅ Automaticky při prvním příchodu do kurzu
  - ✅ Po kliknutí na help tlačítko (modré kolečko desktop, tlačítko v hlavičce mobil)

### 2. Netlify Function (Backend)
- **Cesta**: `/netlify/functions/send-support-ticket.js`
- **Funkce**: Odešle email přes **SMTP (Seznam.cz)** na kurz@podnikatelskactvrtka.cz

## 🔧 Nastavení SMTP

Potřebuješ nastavit environment variables v Netlify Dashboard:

### 📧 Seznam.cz SMTP (Doporučeno)

```bash
SMTP_HOST=smtp.seznam.cz
SMTP_PORT=465
SMTP_USER=tvuj-email@seznam.cz
SMTP_PASS=tvoje-heslo
```

**Nastavení:**
1. Jdi do Netlify Dashboard → **Site Settings → Environment Variables**
2. Přidej všechny 4 proměnné
3. Redeploy site

**Důležité pro Seznam.cz:**
- Port **465** používá SSL (doporučeno)
- Alternativně můžeš použít port **587** s TLS
- Použij svoje běžné přihlašovací heslo k emailu
- Seznam.cz vyžaduje autentizaci
- Musíš používat email **@seznam.cz** (ne @email.cz)

## 📧 Email Format

Email odeslaný na `kurz@podnikatelskactvrtka.cz` obsahuje:

```
Od: email@zakaznika.cz (v Reply-To)
Předmět: [Support Ticket] Problém s lekcí 5

📧 HTML verze:
┌─────────────────────────────┐
│ 🎫 Nový Support Ticket      │
├─────────────────────────────┤
│ Od: email@zakaznika.cz      │
│ Předmět: Problém s lekcí 5  │
├─────────────────────────────┤
│ Zpráva:                     │
│ Nemohu dokončit lekci...    │
└─────────────────────────────┘
💡 Pro odpověď stačí kliknout "Odpovědět"
```

## 🧪 Testování

### Lokální test
```bash
# Test Netlify funkce lokálně
netlify dev

# V browseru otevři kurz a klikni na help tlačítko
# Vyplň formulář a odešli
```

### Production test
1. Deploy na Netlify
2. Otevři kurz v produkci
3. Klikni na help tlačítko (modré kolečko desktop / tlačítko mobil)
4. Vyplň formulář a odešli
5. Zkontroluj email na `kurz@podnikatelskactvrtka.cz`

## 🐛 Troubleshooting

### Email se neposílá
1. ✅ Zkontroluj environment variables v Netlify Dashboard:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
2. ✅ Zkontroluj Netlify Function logs: Netlify Dashboard → Functions → Logs
3. ✅ Zkus test:
   ```bash
   # Pošli testovací email
   curl -X POST https://your-site.netlify.app/.netlify/functions/send-support-ticket \
     -H "Content-Type: application/json" \
     -d '{"email":"test@test.cz","subject":"Test","message":"Test zpráva"}'
   ```

### Error: Invalid login / Authentication failed
- ❌ Špatné SMTP credentials
- ✅ Zkontroluj že SMTP_USER a SMTP_PASS jsou správné
- ✅ Pro Seznam.cz: použij běžné heslo (ne app password)
- ✅ Zkontroluj že Seznam.cz SMTP je povolený v nastavení účtu

### Error: Connection timeout / ECONNREFUSED
- ❌ Špatný SMTP_HOST nebo SMTP_PORT
- ✅ Pro Seznam.cz: `smtp.seznam.cz` (ne email.seznam.cz)
- ✅ Zkus změnit port: 465 → 587 nebo naopak

### Error: Module not found: nodemailer
- ❌ Netlify ještě nenainstaloval nodemailer
- ✅ Počkej 1-2 minuty po deployi
- ✅ Nebo trigger nový deploy: Deploys → Trigger Deploy

### Email končí ve SPAMu
- ✅ Seznam.cz má dobrou reputaci
- ✅ V Gmail: přidej odesílatele do kontaktů
- ✅ Zkontroluj že from email je tvůj Seznam.cz email

## 📝 Code Flow

```
┌─────────────────────────────────────────────────────┐
│ 1. User klikne na Help tlačítko                     │
│    → setShowWelcomeModal(true)                      │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│ 2. WelcomeModal se zobrazí                          │
│    → User vyplní email, předmět, zprávu             │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│ 3. handleSubmit → fetch Netlify function            │
│    POST /.netlify/functions/send-support-ticket     │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│ 4. Netlify function → SMTP (Seznam.cz)              │
│    → Email odeslán na kurz@podnikatelskactvrtka.cz │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│ 5. Success toast → Modal se zavře                   │
│    ✅ "Zpráva odeslána! Odpovíme co nejdříve."      │
└─────────────────────────────────────────────────────┘
```

## 🎨 UI/UX

### Desktop
- **Help tlačítko**: Modré kolečko (fixed bottom-right, z-index 9999)
- **Pozice**: Viditelné i na dashboardu i v lekcích
- **Chování**: Otevře support ticket modal

### Mobile
- **Help tlačítko**: V hlavičce každé lekce (text "Pomoc")
- **Pozice**: Vedle názvu lekce
- **Chování**: Otevře support ticket modal

### Auto-show při prvním příchodu
- ✅ Modal se zobrazí automaticky při první návštěvě kurzu
- ✅ localStorage flag: `course_welcome_seen`
- ✅ Po zavření se už nezobrazuje automaticky
- ✅ Lze otevřít manuálně přes help tlačítko

## 📝 Další SMTP poskytovatelé

### Gmail (Vyžaduje App Password)
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=vas-email@gmail.com
SMTP_PASS=app-password
```

**Jak získat Gmail App Password:**
1. https://myaccount.google.com/security
2. Zapni 2-Step Verification
3. https://myaccount.google.com/apppasswords
4. Vytvoř App Password pro "Mail"

### Outlook/Hotmail
```bash
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=vas-email@outlook.com
SMTP_PASS=vase-heslo
```
