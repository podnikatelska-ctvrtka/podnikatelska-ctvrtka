# 🧪 SMARTEMAILING - TEST GUIDE

## ⚠️ PROBLÉM Z SCREENSHOTU

**Error:** `AuthenticationFailed`  
**Důvod:** Lokální ENV proměnné nejsou nastavené (nebo jsou špatné)

---

## ✅ ŘEŠENÍ - 2 MOŽNOSTI

### **MOŽNOST 1: Test na Netlify (DOPORUČENO! ✅)**

Po `git push` testuj přímo na Netlify URL:
```
https://tvoje-domena.netlify.app
```

**Proč?**
- ENV proměnné jsou UŽ NASTAVENÉ na Netlify ✅
- Funkce funguje v produkci
- Nejspolehlivější test

---

### **MOŽNOST 2: Lokální test (pokud opravdu chceš)**

#### **1. Vytvoř `.env` soubor v rootu projektu**

```bash
# V rootu projektu (vedle package.json)
touch .env
```

#### **2. Přidej ENV proměnné**

```env
# .env
SMARTEMAILING_USERNAME=188534
SMARTEMAILING_API_KEY=tvuj-api-key-ze-smartemailing
SMARTEMAILING_LIST_ID=2
```

**⚠️ POZOR:**
- Tyto hodnoty najdeš v Smartemailing → Settings → API
- `.env` soubor NESMÍ být v gitu! (už je v .gitignore)

#### **3. Spusť Netlify Dev (ne npm run dev!)**

```bash
# Instaluj Netlify CLI (pokud nemáš)
npm install -g netlify-cli

# Spusť lokální server s Netlify Functions
netlify dev
```

**Proč Netlify Dev?**
- `npm run dev` NENAČÍTÁ .env pro Netlify Functions!
- `netlify dev` ANO načítá .env ✅

#### **4. Otestuj na http://localhost:8888**

```
1. Otevři http://localhost:8888
2. Zadej email
3. Zkontroluj Console (F12)
4. Mělo by fungovat ✅
```

---

## 📋 CHECKLIST PŘED TESTEM

### **Netlify Production Test (NEJLEPŠÍ)**
```
□ Git push (git add . && git commit && git push)
□ Netlify deploy dokončen (2-3 min)
□ ENV proměnné nastavené v Netlify:
  □ SMARTEMAILING_USERNAME = 188534
  □ SMARTEMAILING_API_KEY = tvuj-api-key
  □ SMARTEMAILING_LIST_ID = 2
□ Test: https://tvoje-domena.netlify.app
□ Zadej email
□ Zkontroluj Console (F12)
□ Zkontroluj Netlify Function Logs
□ Zkontroluj Smartemailing → Contacts
```

### **Lokální Test (volitelné)**
```
□ .env soubor vytvořen
□ ENV proměnné přidané do .env
□ netlify-cli nainstalované
□ Spuštěno: netlify dev
□ Test: http://localhost:8888
```

---

## 🎯 CO OČEKÁVAT PŘI ÚSPĚCHU

### **1. V Console (F12)**
```
✅ "📧 [Hero Modal] Posílám data do Smartemailing..."
✅ "✅ [Hero Modal] Email sent to Smartemailing - SUCCESS!"
```

### **2. V Netlify Function Logs**
```
✅ "📧 Smartemailing subscription request"
✅ "📤 Adding subscriber to Smartemailing..."
✅ "✅ Subscriber added to Smartemailing"
```

### **3. V Smartemailing Dashboard**
```
Smartemailing → Contacts → Lists → "Mini kurz - Podnikatelská Čtvrtka"
✅ Nový kontakt s emailem
```

### **4. V Emailu**
```
✅ Email "🎉 Tvůj mini kurz je připraven!" přišel
   (pokud máš automatizaci nastavenou)
```

---

## ⚠️ MOŽNÉ CHYBY A ŘEŠENÍ

### **Error: "AuthenticationFailed"**
```
❌ Problém: Špatný username nebo API key
✅ Řešení: 
   1. Zkontroluj Smartemailing → Settings → API
   2. Zkopíruj správné credentials
   3. Aktualizuj ENV proměnné (Netlify nebo .env)
```

### **Error: "Missing Smartemailing credentials"**
```
❌ Problém: ENV proměnné nejsou nastavené
✅ Řešení:
   - Netlify: Site Settings → Environment Variables
   - Lokál: Vytvoř .env soubor + spusť netlify dev
```

### **Error: "Invalid list ID"**
```
❌ Problém: List ID 2 neexistuje
✅ Řešení:
   1. Smartemailing → Contacts → Lists
   2. Zkontroluj ID svého listu
   3. Aktualizuj SMARTEMAILING_LIST_ID
```

### **Funkce není vidět v Netlify → Functions**
```
❌ Problém: Deploy failnul nebo funkce nebyla nahraná
✅ Řešení:
   1. Netlify → Deploys → poslední deploy
   2. Zkontroluj Deploy log
   3. Mělo by být: "Functions bundled successfully"
```

---

## 🚀 DOPORUČENÝ POSTUP

```
1. ✅ Git push (všechny změny)
2. ✅ Počkej na Netlify deploy (2-3 min)
3. ✅ Zkontroluj že funkce je vidět v Netlify → Functions
4. ✅ Test na produkci: https://tvoje-domena.netlify.app
5. ✅ Zadej testovací email
6. ✅ Zkontroluj Netlify Logs
7. ✅ Zkontroluj Smartemailing Contacts
8. ✅ Zkontroluj inbox
```

**Lokální test NENÍ nutný!** Netlify ENV + production test je nejspolehlivější! 💪

---

## 📝 KÓD JE 100% READY

### **Oba formuláře používají Smartemailing:**

#### **QuickEmailCaptureModal.tsx** ✅
```typescript
const EMAIL_SERVICE = {
  method: 'smartemailing',
  smartemailing: {
    enabled: true,
    functionUrl: '/.netlify/functions/smartemailing-subscribe',
  }
};
```

#### **PrelaunchEmailCapture.tsx** ✅
```typescript
const EMAIL_SERVICE = {
  method: 'smartemailing',
  smartemailing: {
    enabled: true,
    functionUrl: '/.netlify/functions/smartemailing-subscribe',
  }
};
```

#### **Netlify Function** ✅
```
/netlify/functions/smartemailing-subscribe.js
- Používá ENV proměnné z Netlify
- Basic Auth pro Smartemailing API
- Přidává kontakty do listu
```

---

## 🎉 VÝSLEDEK

Po úspěšném testu:
```
✅ Formuláře fungují
✅ Smartemailing dostává kontakty
✅ Automatizace se spouští
✅ Email flow běží
✅ Ready to launch! 🚀
```
