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
- **Funkce**: Odešle email přes SMTP na kurz@podnikatelskactvrtka.cz

## 🔧 Nastavení SMTP

Pro odeslání emailů potřebuješ nastavit environment variables v Netlify:

### 📧 Seznam.cz (Tvoje aktuální volba)

```bash
SMTP_HOST=smtp.seznam.cz
SMTP_PORT=465
SMTP_USER=tvuj-email@seznam.cz
SMTP_PASS=tvoje-heslo
```

**Důležité pro Seznam.cz:**
- Port **465** používá SSL (doporučeno)
- Alternativně můžeš použít port **587** s TLS
- Použij svoje běžné přihlašovací heslo k emailu
- Seznam.cz vyžaduje autentizaci

### Gmail App Password

Pokud používáš Gmail:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=vas-email@gmail.com
SMTP_PASS=vase-app-password
```

1. Jdi na https://myaccount.google.com/security
2. Zapni 2-Step Verification
3. Jdi na App Passwords: https://myaccount.google.com/apppasswords
4. Vytvoř nové App Password pro "Mail" → zkopíruj heslo
5. Použij tento App Password jako `SMTP_PASS`

### Ostatní poskytovatele

**SendGrid** (doporučeno pro production):
```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

**Mailgun**:
```bash
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your-mailgun-password
```

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
1. ✅ Zkontroluj environment variables v Netlify Dashboard
2. ✅ Zkontroluj Netlify Function logs: Netlify Dashboard → Functions → Logs
3. ✅ Zkus test SMTP kredenciálů:
   ```bash
   # Pošli testovací email
   curl -X POST https://your-site.netlify.app/.netlify/functions/send-support-ticket \
     -H "Content-Type: application/json" \
     -d '{"email":"test@test.cz","subject":"Test","message":"Test zpráva"}'
   ```

### Error: Invalid login
- ❌ Špatné SMTP credentials
- ✅ Použij Gmail App Password (ne běžné heslo)
- ✅ Zkontroluj SMTP_HOST a SMTP_PORT

### Email končí ve SPAMu
- ✅ Používej verified domain (SendGrid/Mailgun)
- ✅ Nastav SPF a DKIM records
- ✅ V Gmail: přidej odesílatele do kontaktů

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
│ 4. Netlify function → nodemailer SMTP               │
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

## 🔄 Upgrade na Supabase Edge Function (Optional)

Pokud chceš upgrade na Supabase Edge Function místo Netlify:

```typescript
// supabase/functions/send-support-ticket/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const { email, subject, message } = await req.json()
  
  // Použij Supabase Email nebo Resend
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'kurz@podnikatelskactvrtka.cz',
      to: 'kurz@podnikatelskactvrtka.cz',
      reply_to: email,
      subject: `[Support Ticket] ${subject}`,
      html: `<p>Od: ${email}</p><p>${message}</p>`
    })
  })
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
```
