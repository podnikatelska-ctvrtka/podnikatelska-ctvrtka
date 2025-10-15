# 🧪 TEST COUNTDOWN TEĎKA! (Quick Guide)

## ✅ CO TESTOVAT:

```
3 QUICK TESTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Persistence (3 min)
2. Expired view (1 min)
3. Reset (30 sec)

→ CELKEM: 5 MINUT! 🚀
```

---

## 🧪 TEST #1: PERSISTENCE (3 min)

### **KROK 1: Clear localStorage**
```
1. Otevři /objednavka
2. F12 (DevTools)
3. Application tab → Local Storage
4. Smaž 'podnikatelska_ctvrtka_countdown_start' (pokud existuje)
5. Refresh stránku
```

### **KROK 2: Ověř uložení**
```
1. Console tab
2. Spusť:
   localStorage.getItem('podnikatelska_ctvrtka_countdown_start')

EXPECTED: 
→ Vrátí timestamp (např. "1698765432000")
→ Countdown ukazuje ~48:00:00

✅ PASS = timestamp uložen!
❌ FAIL = vrací null
```

### **KROK 3: Test persistence**
```
1. Zapamatuj si countdown čas (např. 47:58:45)
2. Čekej 10 sekund
3. Refresh stránku
4. Countdown by měl být ~47:58:35 (ne 48:00:00!)

✅ PASS = countdown pokračuje!
❌ FAIL = reset na 48:00:00
```

---

## 🧪 TEST #2: EXPIRED VIEW (1 min)

### **SIMULACE VYPRŠENÍ:**
```
1. Otevři Console (F12)
2. Spusť tento kód:

localStorage.setItem(
  'podnikatelska_ctvrtka_countdown_start',
  Date.now() - (49 * 60 * 60 * 1000)
);

3. Refresh stránku (/objednavka)

EXPECTED:
→ Zobrazí "Speciální nabídka vypršela ⏰"
→ Cena: 8.499,- Kč (full price)
→ Žádný countdown!

✅ PASS = expired view zobrazena!
❌ FAIL = stále ukazuje countdown
```

---

## 🧪 TEST #3: RESET (30 sec)

### **RESET COUNTDOWN:**
```
1. Console (F12)
2. Spusť:

localStorage.removeItem('podnikatelska_ctvrtka_countdown_start');

3. Refresh stránku

EXPECTED:
→ Countdown: 48:00:00 (nový!)
→ Sleva: 40%

✅ PASS = nový countdown!
```

---

## 📊 QUICK CHECK:

```
✅ TEST #1 PASSED?
   → localStorage uloží timestamp
   → Countdown pokračuje po refresh

✅ TEST #2 PASSED?
   → Expired view se zobrazí
   → Full price 8.499,-

✅ TEST #3 PASSED?
   → Reset funguje
   → Nový countdown 48h

→ ALL PASS = READY! 🎉
```

---

## 🔧 DEBUGGING:

### **COUNTDOWN NENÍ PŘESNÝ?**
```
Zkontroluj:
1. Console → žádné errors?
2. localStorage obsahuje timestamp?
   localStorage.getItem('podnikatelska_ctvrtka_countdown_start')
3. Timestamp je číslo?
   typeof parseInt(localStorage.getItem('...'), 10)
   → should be 'number'
```

### **EXPIRED VIEW SE NEZOBRAZÍ?**
```
Zkontroluj:
1. Countdown je 0?
2. isExpired state je true?
3. Console errors?
```

### **COUNTDOWN SE RESETUJE?**
```
Možné příčiny:
1. localStorage.clear() někde v kódu?
2. Incognito mode? (smaže localStorage po zavření!)
3. Browser settings? (block cookies/storage?)
```

---

## 💡 DEVELOPMENT TIPS:

### **RYCHLÝ TEST EXPIRED VIEW:**
```javascript
// Console:
localStorage.setItem(
  'podnikatelska_ctvrtka_countdown_start',
  Date.now() - (49 * 60 * 60 * 1000)
);
location.reload();

→ Instant expired view! 🔥
```

### **RYCHLÝ RESET:**
```javascript
// Console:
localStorage.removeItem('podnikatelska_ctvrtka_countdown_start');
location.reload();

→ Nový countdown! 🔄
```

### **OVĚŘ ZBÝVAJÍCÍ ČAS:**
```javascript
// Console:
const start = parseInt(localStorage.getItem('podnikatelska_ctvrtka_countdown_start'));
const now = Date.now();
const elapsed = now - start;
const remaining = (48 * 60 * 60 * 1000) - elapsed;
console.log('Zbývá (ms):', remaining);
console.log('Zbývá (hodiny):', remaining / (60 * 60 * 1000));

→ Debug info! 🐛
```

---

## ✅ CHECKLIST:

```
PŘED DEPLOY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

□ Test #1 PASSED (persistence)
□ Test #2 PASSED (expired view)
□ Test #3 PASSED (reset)
□ Countdown počítá dolů každou sekundu
□ Po refresh countdown pokračuje (ne reset!)
□ Expired view se zobrazí po 48h
□ Console bez errors
□ Mobile test (optional)

→ ALL CHECKED = DEPLOY! 🚀
```

---

## 🎯 EXPECTED BEHAVIOR:

```
SPRÁVNÉ CHOVÁNÍ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. První návštěva → 48:00:00
2. Refresh po 5 min → 47:55:00 ✅
3. Refresh po 24h → 24:00:00 ✅
4. Refresh po 48h+ → EXPIRED ✅
5. Reset → 48:00:00 (new) ✅

ŠPATNÉ CHOVÁNÍ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Refresh → vždy 48:00:00 ❌
2. Expired view se nezobrazí ❌
3. Countdown jde do mínusu ❌
4. Console errors ❌

→ POKUD VIDÍŠ ŠPATNÉ = DEBUG! 🐛
```

---

## 🚀 READY TO DEPLOY?

```
✅ All tests PASSED?
✅ No console errors?
✅ Countdown works correctly?

→ YES = DEPLOY! 🎉
→ NO = Debug pomocí sekce výše! 🔧
```

---

**QUICK START:**  
1. Clear localStorage (F12 → Application)  
2. Refresh → countdown 48:00:00  
3. Refresh again → countdown continues!  
4. Set expired → expired view shows!  

**→ WORKS = DEPLOY! 🚀**
