# ✅ SIMPLE TOKEN AUTH - Stejný flow jako produkce!

## **🎯 PRINCIP:**

```
PRODUKCE:
├─ Zákazník zaplatí
├─ Webhook → public.users + access_token
├─ Email s linkem: /course-v3?token=XXX
└─ Token z URL → Přístup k kurzu ✅

DEV MODE (TEĎKA):
├─ URL: /course-v3?token=1759757068350-eyw8z2zo7t-4lrujeg6mkk
├─ Token z URL → Přístup k kurzu
└─ STEJNÝ FLOW JAKO PRODUKCE! ✅
```

---

## **🚀 JAK TESTOVAT:**

### **Varianta A - Quick Login button (NEJJEDNODUŠŠÍ):**

```
1. Otevři http://localhost:5173

2. Klikni "Quick Login" v Dev Banneru

3. → Automaticky se otevře:
   /course-v3?token=1759757068350-eyw8z2zo7t-4lrujeg6mkk

4. Přihlášen! ✅
```

---

### **Varianta B - Přímo URL (jako zákazník):**

```
1. Otevři:
   http://localhost:5173/course-v3?token=1759757068350-eyw8z2zo7t-4lrujeg6mkk

2. Token se načte automaticky

3. Přihlášen! ✅
```

---

### **Varianta C - Console (pro rychlé testování):**

```javascript
// V console:
devTools.login()        // → Otevře URL s tokenem
devTools.openCourse()   // → Totéž
devTools.logout()       // → Odhlásí
devTools.help()         // → Nápověda
```

---

## **💡 CO TO DĚLÁ:**

### **Quick Login:**
```
1. Klikneš "Quick Login"
2. Přesměruje na: /course-v3?token=XXX
3. CourseV3 načte token z URL
4. Přihlásí usera pomocí tokenu
5. STEJNĚ jako když zákazník klikne na email link! ✅
```

---

## **🎯 TESTOVACÍ USER:**

```
UUID:  18573170-c7f9-45a2-ba6c-7790f41e50fd
Email: m.stepan@twotechgroup.cz
Token: 1759757068350-eyw8z2zo7t-4lrujeg6mkk

✅ Je v public.users
✅ Má access_token
✅ REÁLNÝ user (ne test!)
```

---

## **🔧 DEV BANNER:**

```
🟣 DEV MODE
✓ m.stepan@twotechgroup.cz  ← Zobrazí když jsi přihlášen
✗ Not logged in             ← Když nejsi

[Quick Login]  ← Klikni → otevře URL s tokenem
[Logout]       ← Smaže session
[Clear Console]
```

---

## **❌ CO JSME ODSTRANILI:**

```
❌ Supabase Auth (auth.users)
❌ signInWithPassword()
❌ Vytváření test userů
❌ Složité auth flow
❌ Duplicitní data

✅ MÍSTO TOHO:
   Používáme token systém (jako produkce!)
```

---

## **✅ VÝHODY:**

```
1. ✅ STEJNÝ flow jako produkce
   → Testujeme přesně to, co zákazník vidí!

2. ✅ Žádné auth.users komplikace
   → Jednodušší, bez duplicit

3. ✅ Quick testing
   → Jeden klik → přihlášen

4. ✅ Reálný user
   → Progress, achievements, canvas data funguje!

5. ✅ Token-based auth
   → Jako zákazník v produkci!
```

---

## **📱 PRO MOBILNÍ:**

```
1. Otevři na mobilu:
   localhost:5173/course-v3?token=1759757068350-eyw8z2zo7t-4lrujeg6mkk

2. Token se načte (stejně jako na desktopu)

3. "Přidat na plochu" → PWA! 📱

4. Testuj jako zákazník! ✅
```

---

## **🎯 KONZOLE COMMANDS:**

```javascript
// Quick start
devTools.login()        // Otevře URL s tokenem
devTools.logout()       // Odhlásí

// Navigation
devTools.openCourse()   // Otevře kurz s tokenem
devTools.goHome()       // Jde na homepage

// Info
devTools.config()       // Zobrazí config
devTools.help()         // Nápověda

// Utils
devTools.clear()        // Smaže storage
```

---

## **🔍 DEBUG:**

```javascript
// Zkontroluj session:
const { data } = await supabase.auth.getSession()
console.log(data.session)

// Zkontroluj usera v DB:
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('id', '18573170-c7f9-45a2-ba6c-7790f41e50fd')
  .single()
console.log(data)
```

---

## **✅ TL;DR:**

```
TEĎKA:        Quick Login → URL s tokenem → Přihlášen ✅
PRODUKCE:     Email link → URL s tokenem → Přihlášen ✅

STEJNÝ SYSTÉM! 🎯
```

---

**Klikni "Quick Login" v Dev Banneru a testuj!** 🚀
