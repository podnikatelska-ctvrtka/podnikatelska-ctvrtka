# 🚨 GitGuardian Alert - OKAMŽITĚ VYŘEŠIT!

**Datum:** 4. listopadu 2025  
**Problém:** SMTP credentials vystavené na GitHubu

---

## ⚠️ CO SE STALO

GitGuardian našel tvé **SMTP heslo** (Seznam.cz) v GitHub repozitáři.

**Riziko:**
- ❌ Kdokoliv může vidět tvé heslo
- ❌ Může posílat spam z tvého emailu
- ❌ Může číst tvé emaily
- ❌ Může zneužít tvůj účet

**Kde je heslo:**
- V historii Git commitů (i když jsi soubor už smazal)
- Git si pamatuje CELOU historii
- Heslo je stále viditelné na GitHubu

---

## ✅ OKAMŽITÉ KROKY (10 MINUT)

### 1️⃣ Změň heslo k Seznam.cz (2 min)

1. Jdi na: https://email.seznam.cz/
2. Klikni na **avatar** → **Nastavení**
3. Klikni na **Zabezpečení** → **Změnit heslo**
4. Zadej:
   - Staré heslo
   - Nové heslo (silné!)
   - Potvrď nové heslo
5. Klikni **Uložit**

### 2️⃣ Updatuj Netlify env variable (2 min)

1. Jdi na: https://app.netlify.com
2. Vyber svůj site
3. Klikni na **Site Settings** → **Environment Variables**
4. Najdi **SMTP_PASS**
5. Klikni na **Options** → **Edit**
6. Zadej **NOVÉ heslo** (které jsi právě vytvořil)
7. Klikni **Save**

### 3️⃣ Redeploy site (1 min)

1. V Netlify Dashboard: **Deploys** → **Trigger Deploy**
2. Klikni **Deploy site**
3. Počkej ~2 minuty až deploy doběhne

### 4️⃣ Test support ticketu (3 min)

1. Otevři kurz: https://tvuj-site.netlify.app/demo?token=TESTOVACI_TOKEN
2. Klikni na **help tlačítko**
3. Vyplň formulář a klikni **Odeslat**
4. Zkontroluj Netlify Function logs
5. Mělo by být: **✅ Email sent successfully!**

### 5️⃣ Push .gitignore (2 min)

```bash
git add .gitignore
git add SECURITY_BEST_PRACTICES.md
git add GITGUARDIAN_FIX_ASAP.md
git commit -m "security: Add .gitignore and security docs"
git push
```

---

## ✅ CHECKLIST

- [ ] Změnil jsem heslo k Seznam.cz
- [ ] Updatoval jsem SMTP_PASS v Netlify
- [ ] Redeploy site
- [ ] Otestoval support ticket - funguje ✅
- [ ] Pushoval .gitignore
- [ ] Kliknul "Fix This Secret Leak" v GitGuardian emailu

---

## 🔒 JAK ZABRÁNIT PŘÍŠTĚ

1. **NIKDY nepushuj credentials do Gitu**
   - Hesla, API klíče, tokeny = POUZE v Netlify env variables
   
2. **Kontroluj .gitignore**
   - `.env` soubory musí být v .gitignore
   
3. **Před commitem zkontroluj:**
   ```bash
   git status
   git diff
   # Pokud vidíš heslo nebo API klíč = ZASTAVIŤ!
   ```

4. **Použij Netlify env variables pro vše:**
   ```javascript
   // ŠPATNě:
   const password = 'moje-heslo-123';
   
   // SPRÁVNĚ:
   const password = process.env.SMTP_PASS;
   ```

---

## 📧 GitGuardian Email

V emailu od GitGuardian:
1. Klikni **"Fix This Secret Leak"**
2. Potvrď že jsi credentials změnil
3. Označí incident jako vyřešený

---

## 🆘 Pokud máš problémy

### Support ticket nefunguje po změně hesla

**Nejčastější chyby:**

1. **Špatně zkopírované heslo**
   - Zkontroluj že SMTP_PASS v Netlify je PŘESNĚ stejné jako nové heslo
   - Žádné mezery na začátku/konci!
   
2. **Netlify ještě nepoužívá nové env variables**
   - Trigger nový deploy: **Deploys → Trigger Deploy → Clear cache and deploy**
   
3. **Seznam.cz ještě neaktualizoval heslo**
   - Počkej 1-2 minuty a zkus znovu

### Test přes curl:

```bash
# Test SMTP spojení
curl -X POST https://tvuj-site.netlify.app/.netlify/functions/send-support-ticket \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.cz",
    "subject": "Test po změně hesla",
    "message": "Testuji že SMTP funguje s novým heslem"
  }'
```

**Očekávaná response:**
```json
{
  "success": true,
  "message": "Zpráva odeslána"
}
```

---

## 📊 Netlify Function Logs

**Kde zkontrolovat:**
1. Netlify Dashboard → **Functions**
2. Klikni na **send-support-ticket**
3. Klikni na **View logs**

**Co hledat:**

✅ **ÚSPĚCH:**
```
✅ SMTP connection verified!
✅ Email sent successfully!
Message ID: <...@seznam.cz>
```

❌ **CHYBA:**
```
❌ SMTP verification failed: Invalid login
```
→ Špatné heslo v SMTP_PASS

```
❌ Missing SMTP credentials!
```
→ SMTP_PASS není nastavené v Netlify

---

## 🎯 Next Steps

Po vyřešení:
1. ✅ Klikni "Fix This Secret Leak" v GitGuardian
2. ✅ Push nový kód s .gitignore
3. ✅ Ověř že support ticket funguje
4. ✅ Přečti si `/SECURITY_BEST_PRACTICES.md`

---

**Status:** 🚨 KRITICKÉ - Vyřeš DO 24 HODIN!  
**Priorita:** 🔥 VYSOKÁ

---

## 💡 Tip na budoucnost

**Používej silná, unikátní hesla:**
- Minimálně 16 znaků
- Mix písmen, čísel, symbolů
- Password manager (1Password, Bitwarden, LastPass)
- Různé heslo pro každý účet
