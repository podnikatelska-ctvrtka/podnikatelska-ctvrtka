# 🧪 FINÁLNÍ ZÁKAZNICKÝ FLOW TEST

**Datum:** 31. října 2025  
**Cíl:** Projít celý zákaznický flow end-to-end a ujistit se že se zákazník nikde nezastaví

---

## 🎯 CO TESTUJEME

```
FLOW A: Průkopník (koupí během 24h se slevou 40%)
FLOW B: Neprůkopník (nekoupí během 24h)
```

---

## ✅ TEST FLOW A: PRŮKOPNÍK (HAPPY PATH)

### 📍 **KROK 1: Landing Page (`/`)**

```
□ Načte se landing page
□ Scarcity timer běží (místa ubývají 3/hod po 17h)
□ Hero sekce se zobrazuje správně
□ Testimonialy se načítají (4 příběhy)
□ CTA tlačítka fungují

AKCE:
→ Klikni "Chci slevu 40%" v PrelaunchEmailCapture
```

---

### 📍 **KROK 2: Opt-in Form**

```
□ Modální okno se otevře
□ Form má email input
□ Placeholder text správně
□ GDPR checkbox je viditelný

AKCE:
→ Vyplň email: test+[timestamp]@example.com
→ Zaškrtni GDPR
→ Klikni "Chci slevu 40%"
```

---

### 📍 **KROK 3: Email #1 Okamžitě po opt-in**

```
□ Email dorazí do 1 minuty
□ Subject: "🎁 Tvoje sleva 40% na Podnikatelskou Čtvrtku (platí 24h)"
□ Cena se slevou: 4.999,- Kč (normálně 8.499,- Kč)
□ CTA tlačítko: "Chci kurz se slevou →"
□ URL obsahuje: /objednavka?t=[timestamp]

AKCE:
→ Klikni na CTA tlačítko v emailu
```

---

### 📍 **KROK 4: Order Page (`/objednavka?t=[timestamp]`)**

```
□ Stránka se načte
□ 24h countdown timer běží
□ Zobrazuje se LEVNÁ varianta (4.999,- Kč)
□ "Průkopnická sleva 40%" je viditelná
□ Fapi form se načte (bez otravných animací!)

KONTROLA CENY:
□ Normální cena: 8.499,- Kč (přeškrtnutá)
□ Cena se slevou: 4.999,- Kč
□ Úspora: 3.500,- Kč
□ Sleva: 40%
```

---

### 📍 **KROK 5: Vyplnění Objednávky**

```
FORMULÁŘ:
□ Jméno: [testovací jméno]
□ Příjmení: [testovací příjmení]
□ Email: [stejný jako v opt-in]
□ Telefon: +420 XXX XXX XXX
□ Zaškrtni GDPR

ZPŮSOB PLATBY:
□ Vyber platební metodu (card / bank transfer)

AKCE:
→ Klikni "Dokončit objednávku"
```

---

### 📍 **KROK 6: Fapi Platební Brána**

```
□ Přesměrování na Fapi
□ Fapi zobrazuje správnou cenu (4.999 Kč nebo 6.049 Kč s DPH)
□ Informace o produktu sedí

AKCE:
→ Zadej testovací platební údaje
→ Potvrď platbu (1 Kč test nebo reálná platba)
```

---

### 📍 **KROK 7: Úspěšná Platba**

```
□ Přesměrování zpět na /objednavka?success=true
□ Success animace se zobrazí
□ Zpráva: "Platba úspěšná! 🎉"
□ CTA: "Přejít do kurzu"

SUPABASE:
□ V tabulce `users` se vytvořil nový záznam
□ V tabulce `payments` se vytvořil záznam
□ `purchase_type` = 'full_course'
□ `is_pioneer` = true
□ `discount_percentage` = 40
```

---

### 📍 **KROK 8: Webhook + Email s Tokenem**

```
WEBHOOK (automatický):
□ Fapi zavolá /netlify/functions/fapi-webhook
□ Webhook vygeneruje access token
□ Token se uloží do users.access_token

EMAIL (automatický):
□ Smartemailing pošle email s tokenem
□ Subject: "Tvůj přístup k Podnikatelské Čtvrtce"
□ Email obsahuje link: /kurz?token=[access_token]
□ Email obsahuje bonusový minikurz (pro průkopníky)

KONTROLA:
□ Email dorazí do 5 minut
□ Link funguje
```

---

### 📍 **KROK 9: Přístup do Kurzu**

```
AKCE:
→ Klikni na link v emailu: /kurz?token=[access_token]

KONTROLA:
□ Token se načte z URL
□ Supabase najde uživatele podle tokenu
□ Kurz se načte (desktop nebo mobile podle zařízení)
□ Sidebar se zobrazuje
□ Moduly jsou viditelné (Module 1, 2, 3)

FUNKČNOST:
□ Lze kliknout na Module 1 → otevře se
□ Business Model Canvas se načítá
□ Lze editovat pole v canvasu
□ Autosave funguje (indikátor se zobrazí)
□ Achievement notifikace se zobrazí po dokončení
```

---

### 📍 **KROK 10: Průkopnický Bonus - Minikurz**

```
AKCE:
→ Otevři /minikurz?token=[access_token]

KONTROLA:
□ Minikurz se načte
□ 3 lekce jsou viditelné
□ Lze kliknout na lekci → otevře se
□ Progress tracking funguje
□ Lze označit lekci jako dokončenou
□ Confetti animace při dokončení všech lekcí
```

---

## ⏳ TEST FLOW B: NEPRŮKOPNÍK (NO PURCHASE)

### 📍 **KROK 1-3: Stejné jako Flow A**

```
□ Landing page → Opt-in → Email #1
```

---

### 📍 **KROK 4: Zákazník NEKOUPÍ během 24h**

```
SCÉNÁŘ:
→ Zákazník otevře email #1
→ Neklikne na CTA
→ NEBO klikne, ale nevyplní objednávku

ČEKÁNÍ:
→ Po 20 hodinách od opt-in
```

---

### 📍 **KROK 5: Email #2 Reminder (po 20h)**

```
□ Email dorazí přesně po 20h od opt-in
□ Subject: "⏰ Zbývá 4 hodiny na slevu 40%"
□ CTA: "Využít poslední šanci →"
□ URL obsahuje: /objednavka?t=[timestamp]

AKCE:
→ Zákazník STÁLE nekoupí
```

---

### 📍 **KROK 6: Timer Expirace (po 24h)**

```
AKCE:
→ Po 24h od opt-in otevři: /objednavka?t=[expired_timestamp]

KONTROLA:
□ Timer zobrazuje "Expired"
□ Zobrazuje se DRAHÁ varianta (8.499,- Kč)
□ Zpráva: "Sleva vypršela"
□ Fapi form stále funguje
□ Může koupit za plnou cenu
```

---

### 📍 **KROK 7: Email #3 Minikurz Zdarma (po 7 dnech)**

```
ČEKÁNÍ:
→ 7 dní od opt-in

KONTROLA:
□ Email dorazí po 7 dnech
□ Subject: "🎁 Pro tebe - minikurz zdarma"
□ Email obsahuje link: /minikurz?token=[minikurz_token]
□ POUZE pokud zákazník NEKOUPIL (webhook check)

AKCE:
→ Klikni na link

KONTROLA:
□ Minikurz se otevře
□ 3 lekce jsou přístupné
□ Lze dokončit všechny lekce
□ Confetti při dokončení

OMEZENÍ (pro non-buyers):
□ NEMÁ přístup do plného kurzu (/kurz)
□ Pokud zkusí otevřit /kurz → "No access"
```

---

## 🔍 EDGE CASES (testuj pokud máš čas)

### 🚨 **Edge Case 1: Token Security**

```
SCÉNÁŘ:
→ Někdo zkusí otevřít /kurz bez tokenu

AKCE:
→ Otevři: /kurz (bez ?token=...)

OČEKÁVÁNÝ VÝSLEDEK:
□ Redirect na landing page
□ NEBO zobrazí "Access denied"
```

---

### 🚨 **Edge Case 2: Neplatný Token**

```
AKCE:
→ Otevři: /kurz?token=fake-token-12345

OČEKÁVÁNÝ VÝSLEDEK:
□ Supabase nenajde uživatele
□ Zobrazí error: "Invalid token"
□ Redirect na landing page
```

---

### 🚨 **Edge Case 3: Anonymous Timer Bypass**

```
SCÉNÁŘ:
→ Zkus otevřít /objednavka v anonymním režimu

OČEKÁVÁNÝ VÝSLEDEK:
□ Timer funguje normálně
□ ALE: Nejde zaplatit v anonymu (Fapi security)
□ Timer je SAFE! ✅
```

---

### 🚨 **Edge Case 4: Duplicitní Opt-in**

```
SCÉNÁŘ:
→ Stejný email se zapíše 2x

OČEKÁVÁNÝ VÝSLEDEK:
□ Smartemailing ignoruje duplicitu
□ NEBO aktualizuje timestamp
□ Nepošle email 2x
```

---

### 🚨 **Edge Case 5: Webhook Failure**

```
SCÉNÁŘ:
→ Webhook selže (network error)

OČEKÁVÁNÝ VÝSLEDEK:
□ Fapi zkusí webhook znovu (retry)
□ Sentry zachytí error
□ Uživatel dostane email ručně (fallback)
```

---

## 📊 CHECKLIST PO TESTU

### ✅ **SUPABASE DATA**

```
KONTROLA V SUPABASE:
□ Tabulka `users` má nové záznamy
□ Tabulka `payments` má správné ceny
□ `is_pioneer` = true (pro průkopníky)
□ `discount_percentage` = 40 (pro průkopníky)
□ `access_token` je vygenerovaný
□ `created_at` timestamp sedí
```

---

### ✅ **SMARTEMAILING**

```
KONTROLA V SMARTEMAILING:
□ Kontakt je v DB
□ Custom fields jsou vyplněné:
   - opt_in_timestamp
   - purchase_type (full_course / minikurz / none)
   - is_pioneer (true/false)
□ Automatizace běží (3 emaily nastavené)
```

---

### ✅ **FAPI**

```
KONTROLA V FAPI:
□ Objednávka je v systému
□ Správná cena (4.999 Kč nebo 8.499 Kč)
□ Webhook byl zavolán (log)
□ Faktura byla vygenerována
□ Email s fakturou dorazil
```

---

### ✅ **ANALYTICS**

```
KONTROLA:
□ Google Analytics tracking events
□ Funnel conversions
□ Payment success rate
□ Email open rates
```

---

## 🚀 LAUNCH READINESS

```
✅ Celý Flow A prošel bez chyby
✅ Celý Flow B prošel bez chyby
✅ Edge cases ošetřené
✅ Supabase data OK
✅ Emaily doručují
✅ Platby fungují
✅ Faktura přichází

━━━━━━━━━━━━━━━━━━━━━━━━━━━

READY TO LAUNCH! 🎉
```

---

## 🐛 BUG TRACKING

### Pokud najdeš problém:

```
1. Zapiš si:
   - Co jsi dělal
   - Co se stalo
   - Co jsi očekával
   - Screenshot / error message

2. Zkontroluj:
   - Browser console (F12)
   - Network tab (API calls)
   - Sentry errors
   - Supabase logs

3. Oprav nebo zavolej asistenta

4. Re-testuj danou sekci
```

---

## 💡 TIP PRO TESTOVÁNÍ

```
RYCHLÝ TEST (15 min):
━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Použij devToken (instant access)
→ Testni jen kritickou cestu
→ Nekontroluj edge cases

DŮKLADNÝ TEST (60 min):
━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Projdi celý Flow A + B
→ Testni všechny edge cases
→ Zkontroluj všechny integrace
→ Ověř data v Supabase/Fapi/Smartemailing

━━━━━━━━━━━━━━━━━━━━━━━━━━━

DOPORUČENÍ:
Udělej rychlý test DNES večer
Udělej důkladný test ZÍTRA ráno
Launch V PONDĚLÍ! 🚀
```

---

## 🎯 POSLEDNÍ VĚCI PŘED LAUNCHEM

```
□ Změň devMode na false (v App.tsx)
□ Smaž testovací data z Supabase
□ Zkontroluj Sentry API key (production)
□ Zkontroluj Fapi webhook URL (production)
□ Zkontroluj Smartemailing automatizace (enabled)
□ Připrav FB reklamy (export PNG)
□ Napiš první post na sociální sítě
□ Řekni kamarádům "Launching Monday!" 😎
```

---

## ✅ SHRNUTÍ

```
MÁTE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ 2 evergreen timers (scarcity + urgency)
✅ 3 emaily (sleva + reminder + minikurz)
✅ Aggressive 24h flow
✅ Průkopnický bonus
✅ Full course + minikurz
✅ Supabase + Fapi + Smartemailing integrace
✅ Mobile optimized
✅ Achievement system
✅ Error tracking (Sentry)

CHYBÍ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ Launch! 🚀

READY? FUCKING READY! 🔥
```
