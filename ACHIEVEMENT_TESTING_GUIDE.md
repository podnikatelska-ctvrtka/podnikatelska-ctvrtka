# 🏆 ACHIEVEMENT TESTING GUIDE

Kompletní průvodce pro testování achievement systému!

---

## 🎯 ACHIEVEMENT TYPY

### **1️⃣ BMC ACHIEVEMENTY** (Modul 1 - Business Model Canvas)

| ID | Emoji | Název | Trigger | Testování |
|---|---|---|---|---|
| `first-segment` | 🎯 | První zákazník | První segment v BMC | Přidej segment v Lekci 1 |
| `value-added` | 💎 | Hodnota na stole | První hodnota v BMC | Přidej hodnotu v Lekci 2 |
| `complete-bmc` | 📋 | Kompletní model | Všech 9 sekcí BMC vyplněno | Vyplň všech 9 sekcí (min. 1 položka) |
| `financial-analyst` | 💰 | Počítač zisků | Revenue + Costs vyplněny v Lekci 2 | Vyplň revenue/costs v Lekci 11 |
| `profitable-biz` | 📈 | Ziskový byznys | Profit > 0 v finanční analýze | Udělej revenue > costs v Lekci 11 a jdi do Lekce 2 |

**🧪 Testování BMC:**
```
1. Lekce 1 → Přidej segment → 🎯 "První zákazník"
2. Lekce 2 → Přidej hodnotu → 💎 "Hodnota na stole"
3. Vyplň všech 9 sekcí → 📋 "Kompletní model"
4. Lekce 11 → Vyplň revenue + costs → 💰 "Počítač zisků"
5. Lekce 11 → Revenue > Costs → Jdi do Lekce 2 → 📈 "Ziskový byznys"
```

---

### **2️⃣ VPC ACHIEVEMENTY** (Modul 3 - Value Proposition Canvas)

| ID | Emoji | Název | Trigger | Testování |
|---|---|---|---|---|
| `customer-profile-complete` | 👥 | Profil zákazníka | Jobs + Pains + Gains vyplněny | Lekce 14 - vyplň všechny 3 sekce |
| `value-map-complete` | 🗺️ | Hodnotová mapa | Alespoň 1 produkt v Value Map | Lekce 15 - přidej produkt |

**🧪 Testování VPC:**
```
1. Lekce 14 → Vyplň Jobs + Pains + Gains → 👥 "Profil zákazníka"
2. Lekce 15 → Přidej produkt → 🗺️ "Hodnotová mapa"
```

---

### **3️⃣ FIT ACHIEVEMENTY** (Modul 3 - FIT Validace)

| ID | Emoji | Název | Trigger | Testování |
|---|---|---|---|---|
| `fit-70-percent` | 🎯 | První FIT | FIT Score ≥ 70% | Lekce 16 - namapuj priority |
| `product-fit-master` | 🏅 | Mistr FIT | FIT Score ≥ 80% | Lekce 16 - lepší mapping |
| `fit-90-percent` | 💫 | Dokonalý FIT | FIT Score ≥ 90% | Lekce 16 - téměř perfektní mapping |

**🧪 Testování FIT:**
```
1. Lekce 16 → Prioritizuj (Krok 2) → Mapuj řešení (Krok 3)
2. Pokryj 70%+ priorit → 🎯 "První FIT"
3. Pokryj 80%+ priorit → 🏅 "Mistr FIT"
4. Pokryj 90%+ priorit → 💫 "Dokonalý FIT"
```

---

### **4️⃣ ACTION PLAN ACHIEVEMENTY** (Akční plán)

| ID | Emoji | Název | Trigger | Testování |
|---|---|---|---|---|
| `action-plan-unlocked` | 🎬 | Plán do akce | První otevření Akčního plánu | Klikni na "📊 Akční plán" v dashboardu |
| `first-action-completed` | ✅ | První krok | 1. akce dokončena | Zaškrtni 1 akci v plánu |
| `action-streak-3` | 🔥 | Na vzestupu | 3 akce dokončeny | Zaškrtni 3 akce |
| `all-actions-completed` | 🌟 | Mistr činů | Všechny akce dokončeny | Zaškrtni všechny akce |

**🧪 Testování Action Plan:**
```
1. Dashboard → "📊 Akční plán" → 🎬 "Plán do akce"
2. Zaškrtni 1. akci → ✅ "První krok"
3. Zaškrtni další 2 akce → 🔥 "Na vzestupu"
4. Zaškrtni všechny → 🌟 "Mistr činů"
```

---

### **5️⃣ MODULE ACHIEVEMENTY** (Dokončení modulů)

| ID | Emoji | Název | Trigger | Testování |
|---|---|---|---|---|
| `module-1-complete` | 📚 | Model hotov | Všechny lekce Modulu 1 dokončeny | Dokončí všech 9 lekcí Modulu 1 |
| `module-2-complete` | 📘 | Analýza hotova | Všechny lekce Modulu 2 dokončeny | Dokončí všech 4 lekcí Modulu 2 |
| `module-3-complete` | 🎓 | Absolvent kurzu | Všechny lekce Modulu 3 dokončeny | Dokončí všech 3 lekcí Modulu 3 |

**🧪 Testování Modules:**
```
1. Dokončit všechny lekce Modulu 1 → 📚 "Model hotov"
2. Dokončit všechny lekce Modulu 2 → 📘 "Analýza hotova"
3. Dokončit všechny lekce Modulu 3 → 🎓 "Absolvent kurzu"
```

---

### **6️⃣ ULTIMATE ACHIEVEMENT** (Grand Finale)

| ID | Emoji | Název | Trigger | Testování |
|---|---|---|---|---|
| `ultimate-master` | 👑 | Ultimátní Mistr | Všech 19 ostatních achievementů odemčeno | Odemkni všech 19 achievementů |

**🧪 Testování Ultimate:**
```
Po odemčení všech 19 achievementů se automaticky triggeruje 👑 "Ultimátní Mistr"!
```

---

## 🔄 JAK RESETOVAT ACHIEVEMENTY PRO TESTOVÁNÍ

### **KROK 1: Vymaž achievementy v Supabase**
```sql
-- Otevři Supabase → SQL Editor → Spusť:

DELETE FROM user_achievements 
WHERE user_id = 'YOUR_USER_ID_HERE';
```

📝 **Najdi své user_id:**
```sql
SELECT id, email FROM auth.users WHERE email = 'tvuj@email.cz';
```

### **KROK 2: Vymaž localStorage v browseru**
```javascript
// Otevři Developer Tools (F12)
// Console → zadej:

localStorage.clear();

// Pak refreshni stránku (F5)
```

### **KROK 3: Testuj!**
Teď se achievementy budou triggerovat znovu při akcích! 🎉

---

## 📱 DESKTOP vs. MOBILE

### **DESKTOP** (PC/Laptop)
- Achievementy se zobrazují **vpravo nahoře**
- Vertical stack - více achievementů pod sebou
- Automaticky zmizí po 2.5s
- Fronta - pokud triggeruješ více naráz, zobrazí se postupně

### **MOBILE** (Telefon/Tablet)
- Achievementy se zobrazují **vpravo nahoře** (stejně jako desktop)
- Responsive - menší na mobilech
- Vertical stack funguje stejně

---

## 🐛 TROUBLESHOOTING

### Achievement se netriggeruje?
1. ✅ Zkontroluj že splňuješ podmínky (např. všechny 3 sekce vyplněny)
2. 🔍 Otevři Console (F12) → hledej `console.log('✅ ... Triggering achievement...')`
3. 💾 Zkontroluj Supabase → `user_achievements` tabulku
4. 🧹 Vymaž localStorage: `localStorage.clear()`

### Achievement se zobrazil duplicitně?
- ✅ To je OK! Může se stát při race condition
- System má ochranu proti duplicitám v localStorage i Supabase
- Refresh stránky vyčistí duplicity

### Achievement se nezobrazí ale je v databázi?
- Vymaž localStorage: `localStorage.clear()`
- Refresh stránku (F5)
- Achievement se znovu načte z Supabase

---

## 📊 MONITORING

### Zobraz všechny achievementy v Supabase:
```sql
SELECT 
  achievement_type,
  title,
  icon,
  created_at,
  metadata
FROM user_achievements 
WHERE user_id = 'YOUR_USER_ID_HERE'
ORDER BY created_at DESC;
```

### Zkontroluj localStorage v browseru:
```javascript
// Console (F12):
console.log(JSON.parse(localStorage.getItem('unlocked_achievements_YOUR_USER_ID')));
```

---

## ✅ KOMPLETNÍ TESTOVACÍ SCÉNÁŘ

Pro otestování VŠECH achievementů:

```
1. Vymaž achievementy (SQL + localStorage.clear())
2. Refreshni stránku

3. 🎯 MODUL 1:
   - Lekce 1 → Přidej segment → "První zákazník"
   - Lekce 2 → Přidej hodnotu → "Hodnota na stole"
   - Vyplň všech 9 sekcí → "Kompletní model"
   - Lekce 11 → Revenue + Costs → "Počítač zisků"
   - Lekce 11 → Revenue > Costs → Lekce 2 → "Ziskový byznys"
   - Dokončit všechny lekce → "Model hotov"

4. 📘 MODUL 2:
   - Dokončit všechny lekce → "Analýza hotova"

5. 🎓 MODUL 3:
   - Lekce 14 → Jobs+Pains+Gains → "Profil zákazníka"
   - Lekce 15 → Přidej produkt → "Hodnotová mapa"
   - Lekce 16 → FIT 70%+ → "První FIT"
   - Lekce 16 → FIT 80%+ → "Mistr FIT"
   - Lekce 16 → FIT 90%+ → "Dokonalý FIT"
   - Dokončit všechny lekce → "Absolvent kurzu"

6. 🎬 AKČNÍ PLÁN:
   - Otevři Akční plán → "Plán do akce"
   - 1 akce → "První krok"
   - 3 akce → "Na vzestupu"
   - Všechny akce → "Mistr činů"

7. 👑 ULTIMATE:
   - Po 19 achievementech → "Ultimátní Mistr"
```

---

**HOTOVO! 🎉**

Máš kompletní achievement systém ready pro testování!
