# ✅ TESTOVACÍ CHECKLIST - VALIDACE

**Před deployem na produkci otestujte tyto scénáře:**

---

## 🧪 TEST 1: Canvas Validator - Pravidlo 6

### Scénář: Příjem bez hodnoty
```
1. Jdi na Lekci 10 (Canvas Validator)
2. Vytvoř 🔵 modrý segment "IT firmy"
3. NEPŘIDÁVEJ modrou hodnotu
4. Vytvoř 🔵 modrý příjem "Konzultace - 50k"
5. Klikni "Spustit validaci"

✅ OČEKÁVÁNO:
⚠️ Warning: "Modrý příjem bez hodnoty → Doporučujeme začít od segmentů a hodnot"
💡 Tip: "Správné pořadí: 1) Segmenty → 2) Hodnoty → 3) Kanály → 4) Příjmy"
✅ Může pokračovat (jen varování)
```

---

## 🧪 TEST 2: Profit Calculator - Bez dat

### Scénář A: Žádné příjmy/náklady
```
1. Smaž všechny příjmy a náklady z Canvas
2. Jdi na Lekci 11 (Profit Calculator)
3. Scroll dolů na tlačítko "Dokončit lekci"

✅ OČEKÁVÁNO:
⚠️ Žluté varování nahoře: "Chybí data z vašeho Canvas!"
🟡 Žlutý box místo zeleného
🔒 Tlačítko disabled: "🔒 Dokončit lekci (vyžaduje data)"
💡 Instrukce: "Vraťte se do Modulu 1..."
```

### Scénář B: Jen příjmy, bez nákladů
```
1. Vytvoř příjmy v Canvas (50k)
2. NESMAŽ náklady, jen nastav na 0
3. Jdi na Lekci 11 (Profit Calculator)
4. Scroll dolů na tlačítko "Dokončit lekci"

✅ OČEKÁVÁNO:
🟡 Žlutý box: "Chybí příjmy nebo náklady"
🔒 Tlačítko disabled
```

### Scénář C: Příjmy + náklady vyplněné
```
1. Vytvoř příjmy 50k
2. Vytvoř náklady 30k
3. Jdi na Lekci 11 (Profit Calculator)
4. Scroll dolů na tlačítko "Dokončit lekci"

✅ OČEKÁVÁNO:
✅ Zelený box: "Hotovo! Máte přehled o financích"
✅ Tlačítko enabled: "Dokončit lekci a pokračovat →"
```

---

## 🧪 TEST 3: FIT Validator - Krok 1

### Scénář A: Jen Jobs vyplněné
```
1. Jdi na Lekci 16 (FIT Validator)
2. Krok 1: Přidej Jobs: "Potřebují levné řešení"
3. NEPŘIDÁVEJ Pains a Gains
4. Scroll dolů, klikni "Pokračovat k prioritizaci"

✅ OČEKÁVÁNO:
⚠️ Žluté varování: "Chybí data: Musíte vyplnit VŠECHNY TŘI kategorie"
🔒 Tlačítko disabled
❌ NEMŮŽE pokračovat
```

### Scénář B: Všechny tři vyplněné
```
1. Přidej Jobs: "Potřebují levné řešení"
2. Přidej Pains: "Drahé konkurence"
3. Přidej Gains: "Ušetřit 30%"
4. Klikni "Pokračovat k prioritizaci"

✅ OČEKÁVÁNO:
✅ Přejde na Krok 2 (Prioritizace)
```

---

## 🧪 TEST 4: FIT Validator - Krok 2

### Scénář A: Bez Value Map
```
1. Dokonči Krok 1 (Jobs, Pains, Gains)
2. Krok 2: NEPŘIDÁVEJ Value Map (Products, Pain Relievers, Gain Creators)
3. Scroll dolů, klikni "Pokračovat k validaci"

✅ OČEKÁVÁNO:
⚠️ Žluté varování: "Chybí hodnotová mapa: Musíte vyplnit VŠECHNY TŘI kategorie"
🔒 Tlačítko disabled
❌ NEMŮŽE pokračovat
```

### Scénář B: Jen Products vyplněné
```
1. Přidej Products: "SaaS platforma"
2. NEPŘIDÁVEJ Pain Relievers a Gain Creators
3. Klikni "Pokračovat k validaci"

✅ OČEKÁVÁNO:
⚠️ Varování: "Chybí hodnotová mapa..."
🔒 Tlačítko disabled
```

### Scénář C: Všechny tři vyplněné
```
1. Přidej Products: "SaaS platforma"
2. Přidej Pain Relievers: "Automatizace"
3. Přidej Gain Creators: "Reporting"
4. Klikni "Pokračovat k validaci"

✅ OČEKÁVÁNO:
✅ Přejde na Krok 3 (FIT Score)
```

---

## 🧪 TEST 5: Mobilní zařízení

### Font sizes
```
1. Otevři na mobilu (iPhone/Android)
2. Zkontroluj tyto komponenty:

- [ ] CanvasValidator - texty čitelné
- [ ] ProfitCalculator - čísla viditelná
- [ ] FitValidatorV2 - instrukce čitelné
- [ ] Info boxy - text čitelný
- [ ] Tlačítka - texty viditelné
```

### Tlačítka disabled
```
1. Zkontroluj disabled state:

- [ ] ProfitCalculator - šedé + cursor-not-allowed
- [ ] FitValidator Krok 1 - disabled viditelný
- [ ] FitValidator Krok 2 - disabled viditelný
```

---

## 🧪 TEST 6: Edge Cases

### A) Rychlé přepínání
```
1. Jdi na FIT Validator
2. Rychle přidej/smaž položky
3. Rychle klikej mezi Kroky

✅ OČEKÁVÁNO:
- Data se ukládají správně
- Validace reaguje okamžitě
- Žádné crashes
```

### B) Dlouhé texty
```
1. Zadej dlouhé názvy segmentů (100+ znaků)
2. Zadej dlouhé Jobs/Pains/Gains

✅ OČEKÁVÁNO:
- Texty se zalamují
- Layout se nerozbije
- Čitelnost zachována
```

### C) Speciální znaky
```
1. Zkus emoji v názvech: "🚀 Startup segment"
2. Zkus HTML: "<script>alert('test')</script>"

✅ OČEKÁVÁNO:
- Emoji fungují
- HTML je escapované (bez XSS)
```

---

## 📊 METRIKY K SLEDOVÁNÍ

Po spuštění sleduj:

### 1. Míra dokončení
```
- Kolik % uživatelů dokončí Modul 1?
- Kolik % dokončí Modul 2?
- Kolik % dokončí Modul 3?
```

### 2. Bottlenecky
```
- Kde se uživatelé zastavují?
- Které validace blokují nejvíc?
- Které lekce trvají nejdéle?
```

### 3. Errors
```
- Jsou nějaké neošetřené chyby?
- Fails u ukládání do Supabase?
- Console errors?
```

### 4. Feedback
```
- Ptej se uživatelů na jasnost instrukcí
- Jsou tipy užitečné?
- Rozumí validačním zprávám?
```

---

## ✅ SIGN-OFF CHECKLIST

Před deployem na produkci:

- [ ] Všechny testy 1-6 prošly ✅
- [ ] Mobile testing OK ✅
- [ ] Edge cases ošetřené ✅
- [ ] Console bez errors ✅
- [ ] Supabase ukládání funguje ✅
- [ ] Validace blokují správně ✅
- [ ] Dokumentace aktualizována ✅

---

## 🚀 DEPLOYMENT

**Ready for production when:**
- ✅ Všechny testy zelené
- ✅ Code review dokončen
- ✅ Dokumentace hotová

**Po deployu:**
1. Sleduj error reporting
2. Sleduj user analytics
3. Sbírej feedback
4. Iteruj na vylepšeních

---

**Last Updated:** 14. října 2025  
**Tested By:** _________________  
**Approved By:** _________________
