# 🧪 TESTOVACÍ URL pro lokální testování ActionPlanPDF

## Jak testovat lokálně:

1. Spusť development server: `npm run dev` (běží na portu **5173**)
2. Otevři jednu z URL níže v prohlížeči
3. Všechny checkboxy by měly správně ukládat stav do localStorage

---

## 📋 TESTOVACÍ URL (localhost:5173)

### 🔴 CRITICAL (0-20 bodů)
```
http://localhost:5173/kviz/vysledky?score=15&category=critical&name=Test%20User
```

### 🟡 UNSTABLE (21-40 bodů)
```
http://localhost:5173/kviz/vysledky?score=35&category=unstable&name=Test%20User
```

### 🟢 SOLID (41-60 bodů)
```
http://localhost:5173/kviz/vysledky?score=55&category=solid&name=Test%20User
```

### 🚀 ADVANCED (61-80 bodů)
```
http://localhost:5173/kviz/vysledky?score=75&category=advanced&name=Test%20User
```

### 🌱 BEGINNER (nový zákazník bez skóre)

**Varianta A - Připravený na start (70-100 bodů):**
```
http://localhost:5173/kviz/vysledky?score=85&category=beginner&name=Test%20User
```

**Varianta B - Základ ale mezery (40-69 bodů):**
```
http://localhost:5173/kviz/vysledky?score=55&category=beginner&name=Test%20User
```

**Varianta C - Potřebuje přípravu (0-39 bodů):**
```
http://localhost:5173/kviz/vysledky?score=25&category=beginner&name=Test%20User
```

---

## 🎯 Co testovat:

1. ✅ **Checkbox persistence**: Zaškrtni checkbox → refresh stránku → checkbox zůstane zaškrtnutý
2. ✅ **Email progress tracking**: Zaškrtni priority email a další checkboxy
3. ✅ **Všechny 5 plánů**: Otevři všechny URL a zkontroluj že se správně zobrazují
4. ✅ **Build pass**: Ujisti se že build projde bez errorů
5. ✅ **Print functionality**: Zkus vytisknout stránku (Ctrl/Cmd + P)

---

## 🧹 Smazání testovacích dat:

Pokud chceš vyčistit localStorage (reset všech checkboxů):

1. Otevři Developer Console (F12)
2. Spusť:
```javascript
localStorage.clear();
location.reload();
```

---

## 📝 Poznámky:

- Všechny checkboxy se ukládají s prefixem `quiz_action_` nebo `quiz_email_progress`
- localStorage je vázaný na doménu (localhost !== production)
- sessionStorage se používá pro přenos dat z kvízu na výsledkovou stránku
- URL parametry fungují jako fallback když není sessionStorage

---

**Po úspěšném lokálním testu → PUSH NA NETLIFY! 🚀**