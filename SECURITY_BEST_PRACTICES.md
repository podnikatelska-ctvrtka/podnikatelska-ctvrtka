# 🔒 Security Best Practices

**Důležité:** Credentials (hesla, API klíče) NIKDY nepushuj do GitHubu!

---

## ⚠️ AKTUÁLNÍ BEZPEČNOSTNÍ INCIDENT

**Datum:** 4. listopadu 2025  
**Problém:** GitGuardian detekoval SMTP credentials v GitHub repozitáři

### Co se stalo:
- SMTP heslo bylo náhodně pushnuté do GitHubu v nějakém commitu
- I když byl soubor později smazán, **Git si pamatuje celou historii**
- Heslo je stále viditelné v historii commitů
- **Kdokoliv může vidět heslo a zneužít tvůj email!**

### ✅ CO MUSÍŠ UDĚLAT OKAMŽITĚ:

1. **Změň heslo k Seznam.cz emailu**
   - Seznam.cz → Nastavení účtu → Změnit heslo
   
2. **Updatuj SMTP_PASS v Netlify**
   - Netlify Dashboard → Site Settings → Environment Variables
   - Změň `SMTP_PASS` na nové heslo
   - Redeploy site

3. **Smaž credentials z Git historie** (pokročilé)
   - Použij `git-filter-branch` nebo `BFG Repo Cleaner`
   - Nebo udělej nový repozitář (jednodušší)

---

## 🚫 NIKDY NEPUSHUJ DO GITU:

### ❌ Hesla a credentials
```bash
# ŠPATNě:
SMTP_PASS=moje-heslo-123
API_KEY=sk_live_abc123def456

# SPRÁVNĚ:
# Env variables jsou v Netlify Dashboard
# Nikdy v kódu!
```

### ❌ .env soubory
```bash
# .env soubory NIKDY nepushuj!
# Měly by být v .gitignore
.env
.env.local
```

### ❌ API klíče v kódu
```javascript
// ŠPATNě:
const apiKey = 'sk_live_abc123def456';

// SPRÁVNĚ:
const apiKey = process.env.API_KEY;
```

---

## ✅ JAK SPRÁVNĚ POUŽÍVAT CREDENTIALS

### 1️⃣ Netlify Environment Variables

**Kde nastavit:**
- Netlify Dashboard → Site Settings → Environment Variables

**Proč je to bezpečné:**
- Credentials jsou POUZE na Netlify serveru
- Nejsou v kódu ani v GitHubu
- Netlify je šifruje

**Jak používat v kódu:**
```javascript
// Netlify Function
const apiKey = process.env.API_KEY;

// Frontend (Vite)
const publicKey = import.meta.env.VITE_PUBLIC_KEY;
```

### 2️⃣ .gitignore

**Vždy kontroluj že je `.gitignore` správně nastavený!**

```bash
# Kontrola před commitem
git status

# Pokud vidíš .env soubor, ZASTAVIŤ!
# Přidej ho do .gitignore
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Add .env to gitignore"
```

### 3️⃣ Git hooks (prevence)

**Můžeš nastavit Git hook který kontroluje credentials:**

```bash
# .git/hooks/pre-commit
#!/bin/bash

# Kontrola jestli commit neobsahuje credentials
if git diff --cached | grep -E "(password|api_key|secret)" ; then
  echo "⚠️  WARNING: Možná pushoveš credentials!"
  echo "Zkontroluj změny a ujisti se že nejsou credentials v plaintext."
  exit 1
fi
```

---

## 🔍 JAK ZKONTROLOVAT ŽE JSI SAFE

### 1. Zkontroluj .gitignore
```bash
cat .gitignore
# Mělo by obsahovat .env, *.key, credentials.json atd.
```

### 2. Zkontroluj že .env není v Gitu
```bash
git ls-files | grep .env
# Pokud nic nenajde = dobře
# Pokud najde .env = ŠPATNĚ!
```

### 3. Zkontroluj historii commitů
```bash
git log --all --full-history --source -- .env
# Pokud nic nenajde = dobře
# Pokud najde commity = .env byl dříve pushnutý!
```

---

## 🆘 CO DĚLAT POKUD JSI UŽ PUSHOVAL CREDENTIALS

### Option A: Změň credentials (DOPORUČENO)

1. **Změň heslo/API klíč**
   - Staré je kompromitované
   - Vytvoř nové

2. **Updatuj Netlify env variables**
   - Nastav nové credentials

3. **Redeploy**
   - Netlify použije nové credentials

### Option B: Smaž z Git historie (POKROČILÉ)

**⚠️ POZOR: Tohle přepíše Git historii!**

```bash
# BFG Repo Cleaner (jednodušší)
brew install bfg  # Mac
# nebo stáhni z: https://rtyley.github.io/bfg-repo-cleaner/

bfg --replace-text passwords.txt  # Nahradí všechny hesla v historii
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force

# Git filter-branch (složitější)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all
git push --force
```

### Option C: Nový repozitář (NEJJEDNODUŠŠÍ)

1. Vytvoř nový GitHub repozitář
2. Zkopíruj jen současný kód (bez .git složky)
3. Inicializuj nový Git:
   ```bash
   rm -rf .git
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <new-repo-url>
   git push -u origin main
   ```

---

## 📚 Další informace

- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [GitGuardian Documentation](https://docs.gitguardian.com/)
- [OWASP Security Guidelines](https://owasp.org/)

---

**Datum vytvoření:** 4. listopadu 2025  
**Status:** 🚨 AKTIVNÍ INCIDENT - Změň heslo ASAP!
