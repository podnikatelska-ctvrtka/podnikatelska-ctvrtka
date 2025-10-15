# 🧪 TESTOVACÍ URL PRO KURZ

## 🎯 FORMÁT URL

### **Produkce (s tokenem):**
```
https://www.podnikatelskactvrtka.cz/course-v3?token=TVUJ_TOKEN
```

### **Localhost (dev mode):**
```
http://localhost:5173/course-v3?dev=true
```

---

## 🔑 JAK ZÍSKAT TOKEN

Token je v Supabase v tabulce `users`:

1. Otevři Supabase Dashboard
2. Přejdi na Table Editor → `users`
3. Najdi svůj email
4. Zkopíruj hodnotu z pole `access_token`

### **Příklad:**
```
email: test@example.com
access_token: abc123def456
```

**URL:**
```
https://www.podnikatelskactvrtka.cz/course-v3?token=abc123def456
```

---

## 🚀 TESTOVACÍ SCÉNÁŘ

### **1. Otevři kurz s tokenem:**
```
https://www.podnikatelskactvrtka.cz/course-v3?token=TVUJ_TOKEN
```

### **2. MĚLO BY SE ZOBRAZIT:**
- ✅ Dashboard (přehled modulů)
- ✅ Sidebar s lekcemi
- ✅ Progress bar (% dokončeno)
- ✅ Achievement notifikace (pokud jsou nové)

### **3. Vyber Modul 1 → Lekce 1:**
- ✅ Modrý header s "Zákaznické segmenty"
- ✅ Video (pokud má videoUrl)
- ✅ Textový obsah
- ✅ Příklady (dobré/špatné)
- ✅ Fialový CTA box "Teď to zkus!"

### **4. Klikni "Začít cvičení":**
- ✅ GuidedTour popup (tmavý overlay + tipy)
- ✅ Zavři popup křížkem
- ✅ Canvas fullscreen s jednou sekcí

### **5. Přidej položku:**
- ✅ Nová sticky note se vytvoří
- ✅ Uloží se do Supabase
- ✅ Zelený completion banner se zobrazí

### **6. Klikni "Pokračovat na další lekci":**
- ✅ Přejde na Lekci 2
- ✅ Progress bar se aktualizuje
- ✅ Lesson dokončená ✓

---

## 🔍 CO ZKONTROLOVAT V CONSOLE (F12)

### **✅ DOBRÉ ZPRÁVY:**
```javascript
🔄 Syncing achievements from localStorage to Supabase...
✅ Achievement sync complete!
💾 Saving lesson progress...
✅ Lesson progress saved!
📊 Canvas data loaded: {...}
```

### **❌ ŠPATNÉ ZPRÁVY:**
```javascript
TypeError: Cannot read properties of null (reading '0')
motion_react.js:3219 Uncaught TypeError...
406 Not Acceptable (Supabase RLS error)
Failed to load user data
```

---

## 🧪 TESTOVÁNÍ UKLÁDÁNÍ DAT

### **A) Progress tracking:**

1. **Dokončit lekci:**
   - Vyber lekci → Přidej položku → "Pokračovat"
   - Refresh stránku (F5)
   - **MĚLO BY:** Lekce má zelený checkmark ✓

2. **Zkontroluj Supabase:**
   ```sql
   SELECT * FROM user_progress WHERE user_id = 'TVUJ_USER_ID';
   ```
   **MĚLO BY:** `completed_lessons` obsahuje např. `[1,2,3]`

### **B) Canvas data:**

1. **Přidat položky:**
   - Otevři Lekci 1 → "Začít cvičení"
   - Přidej položku "Mladé maminky 25-35 let"
   - Refresh stránku (F5)
   - Otevři Canvas znovu
   - **MĚLO BY:** Položka je tam!

2. **Zkontroluj Supabase:**
   ```sql
   SELECT * FROM user_canvas_data 
   WHERE user_id = 'TVUJ_USER_ID' 
   AND section_key = 'segments';
   ```
   **MĚLO BY:** `content` obsahuje tvou položku

### **C) Achievements:**

1. **Dokončit první lekci:**
   - Achievement notification "První krok" by se měla zobrazit
   - Refresh stránku
   - **MĚLO BY:** Achievement pořád viditelná v dashboard

2. **Zkontroluj localStorage:**
   ```javascript
   // V Console (F12):
   localStorage.getItem('course_achievements_TVUJ_USER_ID')
   ```
   **MĚLO BY:** JSON s achievement IDs

---

## 🛠️ DEBUGGING

### **Pokud kurz crashuje:**

1. **Hard refresh:**
   ```
   Ctrl + Shift + R (Windows)
   Cmd + Shift + R (Mac)
   ```

2. **Clear localStorage:**
   ```javascript
   // V Console (F12):
   localStorage.clear();
   sessionStorage.clear();
   location.reload(true);
   ```

3. **Check token:**
   ```javascript
   // V Console (F12):
   const params = new URLSearchParams(window.location.search);
   console.log('Token:', params.get('token'));
   ```
   **MĚLO BY:** Vypsat tvůj token

4. **Check auth:**
   ```javascript
   // V Console (F12):
   // Po načtení kurzu by mělo být:
   // isAuthenticated: true
   // userData: { id: 'xxx', email: 'xxx', name: 'xxx' }
   ```

### **Pokud ukládání nefunguje:**

1. **Check Supabase connection:**
   ```javascript
   // V Console (F12):
   console.log('Supabase URL:', 'https://jdcpzswpecntlqiyzxac.supabase.co');
   ```

2. **Check RLS policies:**
   - Otevři Supabase Dashboard
   - Authentication → Policies
   - **MĚLO BY:** Všechny tables mají policies DISABLED (PUBLIC access)

3. **Manual test:**
   ```javascript
   // V Console (F12):
   const { data, error } = await supabase
     .from('user_canvas_data')
     .select('*')
     .eq('user_id', 'TVUJ_USER_ID');
   
   console.log('Data:', data, 'Error:', error);
   ```

---

## 📊 EXPECTED BEHAVIOR

### **Po dokončení všech 16 lekcí:**

- ✅ Progress bar: 100%
- ✅ Všechny lekce mají zelený checkmark
- ✅ Canvas je vyplněný (9 sekcí)
- ✅ VPC je vyplněné (Customer Profile + Value Map)
- ✅ FIT Score > 70%
- ✅ Achievements: 15+ odemčených
- ✅ Business Action Plan: generovaný

---

## 🎯 PRIORITY TESTY

### **1. ZÁKLADNÍ FUNKČNOST (5 min):**
- [ ] Kurz se načte s tokenem
- [ ] Dashboard se zobrazí
- [ ] Lekce 1 se otevře
- [ ] CTA box je viditelný
- [ ] Canvas se otevře

### **2. UKLÁDÁNÍ DAT (10 min):**
- [ ] Přidání položky do Canvas
- [ ] Refresh → položka je pořád tam
- [ ] Dokončení lekce
- [ ] Refresh → lekce má checkmark
- [ ] Progress bar se aktualizuje

### **3. INTERAKTIVNÍ KOMPONENTY (15 min):**
- [ ] CanvasValidator (Modul 2, Lekce 1)
- [ ] ProfitCalculator (Modul 2, Lekce 2)
- [ ] ProblemSolver (Modul 2, Lekce 3)
- [ ] BusinessModelGallery (Modul 2, Lekce 4)
- [ ] VPC Customer Profile (Modul 3, Lekce 1)
- [ ] VPC Value Map (Modul 3, Lekce 2)
- [ ] FIT Validator (Modul 3, Lekce 3)

---

## 🚨 CRITICAL ISSUES

Pokud **COKOLIV** z tohoto nefunguje, je to KRITICKÉ:

1. ❌ Kurz se nenačte (blank screen)
2. ❌ Lekce se nezobrazují (chybí headline)
3. ❌ CTA box není viditelný
4. ❌ Canvas se neotevře
5. ❌ Data se neukládají
6. ❌ Modul 2/3 komponenty crashují

Pošli screenshot + Console errory (F12) → opravím ASAP!

---

**TEĎKA OTESTUJ S REÁLNÝM TOKENEM! 🚀**
