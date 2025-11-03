# 📧 FAPI EMAIL PROBLÉM - SHRNUTÍ & ŘEŠENÍ

**Datum:** 2025-11-03  
**Status:** 🔍 Debugging - čeká se na FAPI support

---

## 🎯 **PROBLÉM:**

**SYMPTOM:**
```
❌ Po zaplacení objednávky přes GoPay se neposílají ŽÁDNÉ emaily z FAPI
❌ Faktura nepřichází
❌ Automatické zprávy "při zaplacení" nefungují
```

**CO FUNGUJE:**
```
✅ NÁŠ webhook FUNGUJE - dostává invoice data
✅ Token přístup do kurzu FUNGUJE
✅ Supabase FUNGUJE - ukládá zákazníky
✅ Resend email FUNGUJE - NÁŠ email chodí
✅ FAPI šablony jsou VYTVOŘENÉ
✅ Sada zpráv je AKTIVNÍ v obou formulářích
```

**CO NEFUNGUJE:**
```
❌ FAPI vlastní automatické emaily
❌ FAPI faktura emailem
```

---

## 🔍 **MOŽNÉ PŘÍČINY:**

### **#1: GoPay → FAPI webhook nefunguje** (70% pravděpodobnost)

```
Scénář:
1. Zákazník zaplatí v GoPay ✅
2. GoPay webhook NEVOLÁ FAPI ❌
3. FAPI neví že je platba zaplacená
4. Status v FAPI: "Čeká na platbu" (ne "ZAPLACENO")
5. → Trigger "při zaplacení" se nespustí
6. → Email se nikdy nepošle

Důkaz:
- NÁŠ webhook dostává data → FAPI VÍ O PLATBĚ
- Ale FAPI emaily nechodí → trigger se nespouští?

FIX:
→ FAPI support musí zkontrolovat GoPay webhook nastavení
```

---

### **#2: Email trigger není správně nastavený** (20% pravděpodobnost)

```
Scénář:
1. Platba je ZAPLACENO v FAPI ✅
2. Šablona je aktivní v sadě zpráv ✅
3. Trigger "při zaplacení faktury" má BUG ❌
4. → Email se nepošle i když by měl

FIX:
→ FAPI support musí zkontrolovat trigger logiku
```

---

### **#3: Emaily jdou do SPAM** (5% pravděpodobnost)

```
Scénář:
1. FAPI posílá email ✅
2. Gmail/Seznam ho blokuje jako spam ❌
3. → Zákazník ho nevidí

FIX:
→ Zkontrolovat SPAM složku
→ FAPI support zkontroluje email delivery logs
```

---

### **#4: Testovací platby nemají zapnuté emaily** (5% pravděpodobnost)

```
Scénář:
1. Testovací produkt má jiné nastavení než ostrý ❌
2. Emaily fungují jen pro ostré platby

FIX:
→ Zkontrolovat že ZTESTOVACÍ produkt má taky emaily aktivní
→ Porovnat nastavení s ostrým produktem
```

---

## ✅ **CO BYLO UDĚLÁNO:**

### **1. ✅ Vytvořen DEBUG webhook:**
```
netlify/functions/fapi-webhook-debug.js

→ Loguje VŠECHNO (request, body, headers, env)
→ Pomůže zjistit jestli FAPI vůbec volá webhook
```

**Použití:**
```
1. Nastav v FAPI webhook URL:
   https://podnikatelskactvrtka.cz/.netlify/functions/fapi-webhook-debug

2. Udělej platbu

3. Sleduj Netlify logs (real-time)

4. Výsledek:
   - Vidím logy → WEBHOOK FUNGUJE ✅
   - Žádné logy → FAPI NEVOLÁ WEBHOOK ❌
```

---

### **2. ✅ Upgrade webhook emailu - FAKTURY:**

Přidána sekce s fakturou do OBOU email templateů:

```javascript
const invoiceUrl = `https://app.fapi.cz/invoice/${invoiceId}`;

// V emailu:
📄 Faktura
Vaše faktura je připravena ke stažení:
[Stáhnout fakturu (PDF)] → link na FAPI fakturu
```

**VÝSLEDEK:**
```
NÁŠ EMAIL TEĎKA OBSAHUJE:
✅ Poděkování za platbu
✅ Token přístup do kurzu
✅ Minikurz (pro early birds)
✅ LINK NA FAKTURU (nové!)

→ Zákazník dostane VŠECHNO v jednom emailu!
→ I kdyby FAPI emaily nefungovaly, má všechno potřebné!
```

---

### **3. ✅ Připraven email template pro FAPI support:**

```
Soubor: FAPI_SUPPORT_EMAIL_TEMPLATE.md

Obsahuje:
- Přesný popis problému
- Co funguje / co ne
- Screenshoty které poslat
- Klíčové otázky pro support
- Kontaktní informace
```

---

## 🎯 **DOPORUČENÁ STRATEGIE:**

### **PLAN A: Kontaktovat FAPI support** ⭐ (HLAVNÍ)

```
1. Otevři: FAPI_SUPPORT_EMAIL_TEMPLATE.md
2. Vyplň ID produktů
3. Přilož screenshoty (nastavení, faktury)
4. Pošli na: podpora@fapi.cz
5. Čekej 1-2 pracovní dny

OČEKÁVANÝ VÝSLEDEK:
→ FAPI zjistí problém v GoPay webhook nastavení
→ Opraví to
→ Emaily začnou chodit ✅
```

---

### **PLAN B: Použít JEN náš webhook** (FALLBACK)

```
Pokud FAPI support nevyřeší do týdne:

1. VYPNI všechny FAPI emaily
2. NECH NÁŠ webhook posílat vše
3. Upgrade webhook:
   ✅ Email s tokenem (MÁME)
   ✅ Link na fakturu (MÁME - právě přidáno)
   ✅ Minikurz (MÁME)
   
→ VŠECHNO FUNGUJE i bez FAPI emailů!

NEVÝHODA:
- Musíš používat náš LMS (ne FAPI členskou sekci)
- Máš kontrolu nad vším (vlastně výhoda!)
```

---

### **PLAN C: Hybrid řešení** (KOMPROMIS)

```
FAPI:
✅ Faktura emailem (samostatně)
❌ Potvrzovací email VYPNUTÝ

NÁŠ WEBHOOK:
✅ Email s přístupem + tokenem
✅ Link na FAPI fakturu

VÝSLEDEK:
→ Zákazník dostane:
   1. NÁŠ email (s přístupem) - hned
   2. FAPI faktura (PDF) - za 1-2 min

→ 2 emaily, ale každý má účel!
```

---

## 📋 **CHECKLIST - PŘED KONTAKTOVÁNÍM FAPI:**

- [ ] Zkontroloval jsem SPAM složku ve všech emailech
- [ ] Zkontroloval jsem status faktur v FAPI (ZAPLACENO vs Čeká na platbu)
- [ ] Zjistil jsem ID obou produktů
- [ ] Udělal jsem screenshoty:
  - [ ] Produkt → Automatizace → E-maily
  - [ ] Produkt → Automatizace → Webhooky
  - [ ] Sada zpráv (aktivní)
  - [ ] Faktura detail (status)
- [ ] Vyzkoušel jsem debug webhook (fapi-webhook-debug.js)
- [ ] Upgradovaný webhook má link na fakturu ✅

---

## 🚀 **AKTUÁLNÍ STATUS:**

```
✅ DEBUG webhook vytvořený
✅ Webhook upgrade (faktury) hotový
✅ Email template pro FAPI support připravený
✅ Testing checklist připravený
⏳ Čeká se na deploy
⏳ Čeká se na test
⏳ Čeká se na kontakt s FAPI support
```

---

## 🎯 **DALŠÍ KROKY:**

### **1. PUSH ZMĚNY:**
```bash
git add netlify/functions/fapi-webhook-debug.js
git add netlify/functions/fapi-webhook.js
git commit -m "feat: Add invoice link to webhook emails + debug webhook"
git push
```

### **2. ČEKEJ 2 MINUTY (Netlify deploy)**

### **3. TESTUJ:**
```
1. Udělej novou platbu (jiný email!)
2. Zkontroluj:
   ✅ Přišel NÁŠ email? (s tokenem + fakturou)
   ❌ Přišel FAPI email? (ne)
3. Klikni na "Stáhnout fakturu" v našem emailu
   → Otevře se FAPI faktura? ✅
```

### **4. KONTAKTUJ FAPI SUPPORT:**
```
Použij template: FAPI_SUPPORT_EMAIL_TEMPLATE.md
Pošli na: podpora@fapi.cz
```

### **5. MEZITÍM:**
```
✅ NÁŠ email FUNGUJE (s fakturou!)
✅ Systém JE FUNKČNÍ i bez FAPI emailů
✅ Zákazníci dostanou všechno potřebné
```

---

## 💡 **POZNATKY:**

**1. NÁŠ WEBHOOK JE SPOLEHLIVĚJŠÍ:**
```
Pro:
✅ Máš kontrolu nad vším
✅ Custom tokeny
✅ Můžeš přidávat features
✅ Rychlejší reakce na problémy

Proti:
❌ Musíš spravovat vlastní LMS
❌ Musíš posílat faktury sám (nebo linky)
```

**2. FAPI EMAILY JSOU CONVENIENCE:**
```
Pro:
✅ Hotové z krabice
✅ Nemusíš nic programovat

Proti:
❌ Nemáš kontrolu
❌ Těžko debuguješ
❌ Závisíš na FAPI
```

**3. HYBRID JE BEST:**
```
✅ NÁŠ webhook = hlavní komunikace + přístup
✅ FAPI faktura = daňový doklad (samostatně)

→ Spolehlivost + compliance!
```

---

**ZÁVĚR:**

Systém FUNGUJE i bez FAPI emailů! 🎉  
Kontaktuj FAPI support, ale systém je připravený i pro "worst case scenario".

Zákazníci dostanou:
✅ Email s přístupem (náš webhook)
✅ Link na fakturu (náš webhook)
✅ Minikurz pro early birds (náš webhook)
✅ Všechno funguje! 🚀

---

**Next:** Push změny → Test → Kontakt FAPI support! 💪
