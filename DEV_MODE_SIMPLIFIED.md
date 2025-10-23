# ✅ DEV MODE - SIMPLIFIED!

## **🎯 CO JSEM UDĚLAL:**

```
❌ PŘED:
   - Velký fialový banner nahoře
   - Překrýval dashboard
   - Blokoval obsah
   - Otravný! 😤

✅ PO:
   - Malý "DEV" badge v levém dolním rohu
   - Neblokuje nic
   - Kliknutím → console help
   - Nenápadný! 🎯
```

---

## **🚀 JAK TO FUNGUJE TEĎKA:**

### **1. Malý DEV badge v rohu:**
```
┌─────────────────────────┐
│                         │
│                         │
│      DASHBOARD          │
│                         │
│                         │
└─────────────────────────┘
  [DEV] ← Klikni!
```

### **2. Klikneš na badge:**
```
→ Console se otevře s quick commands! 🎯
```

### **3. Console commands:**
```javascript
// Quick Login (otevře URL s tokenem)
devTools.login()        

// Navigation
devTools.openCourse()   // → /course-v3
devTools.goHome()       // → Landing page
devTools.logout()       // → Logout

// Info
devTools.config()       // → Show config
devTools.help()         // → Full help
```

---

## **📋 PŘÍKAZY:**

### **Quick Login (HLAVNÍ!):**
```javascript
devTools.login()

// Otevře:
// /course-v3?token=1759757068350-eyw8z2zo7t-4lrujeg6mkk
//
// → Přihlášen jako m.stepan@twotechgroup.cz ✅
```

### **Navigation:**
```javascript
devTools.openCourse()   // Otevře kurz s tokenem
devTools.goHome()       // Jde na homepage
devTools.logout()       // Odhlásí a jde na homepage
```

### **Info:**
```javascript
devTools.config()       // Zobrazí DEV_TOKEN_CONFIG
devTools.help()         // Zobrazí všechny příkazy
```

### **Utils:**
```javascript
devTools.clear()        // Smaže localStorage + sessionStorage
```

---

## **✅ VÝHODY:**

```
1. ✅ Žádné rušení UX!
   → Malý badge v rohu, nic neblokuje

2. ✅ Quick access přes console
   → devTools.login() → Přihlášen!

3. ✅ Nenápadný
   → Vidíš jen malý "DEV" text

4. ✅ Stejný token systém jako produkce
   → URL s tokenem → Přístup

5. ✅ Clean UI
   → Žádné fialové bannery! 🎯
```

---

## **🎯 POUŽITÍ:**

### **Desktop:**
```
1. F12 (otevři console)
2. devTools.login()
3. → Otevře /course-v3?token=XXX
4. Přihlášen! ✅
```

### **Mobil (localhost):**
```
1. Otevři přímo URL:
   localhost:5173/course-v3?token=1759757068350-eyw8z2zo7t-4lrujeg6mkk

2. Přihlášen! ✅
```

### **Mobil (IP adresa):**
```
1. Najdi IP (ipconfig / ifconfig)
2. Otevři:
   192.168.1.42:5173/course-v3?token=1759757068350-eyw8z2zo7t-4lrujeg6mkk

3. Přihlášen! ✅
```

---

## **📱 TESTOVÁNÍ NA MOBILU:**

### **Varianta A - Desktop emulation:**
```
1. F12
2. Ctrl+Shift+M (Toggle device toolbar)
3. devTools.login()
4. Testuj! ✅
```

### **Varianta B - Reálný mobil:**
```
1. Najdi IP adresu: ipconfig (Windows) nebo ifconfig (Mac/Linux)
2. Na mobilu:
   http://192.168.1.42:5173/course-v3?token=1759757068350-eyw8z2zo7t-4lrujeg6mkk
3. Testuj! ✅
```

---

## **🔍 DEBUG:**

### **Zkontroluj session:**
```javascript
const { data } = await supabase.auth.getSession()
console.log(data.session)
```

### **Zkontroluj usera v DB:**
```javascript
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('id', '18573170-c7f9-45a2-ba6c-7790f41e50fd')
  .single()
console.log(data)
```

### **Smaž všechno a začni znovu:**
```javascript
devTools.clear()        // Smaže localStorage + sessionStorage
devTools.logout()       // Odhlásí
devTools.login()        // Znovu login
```

---

## **✅ TL;DR:**

```
TEĎKA:
├─ Malý "DEV" badge v rohu ✅
├─ Klikneš → Console help
├─ devTools.login() → Přihlášen
└─ Žádné rušení UX! 🎯

PŘED:
├─ Velký fialový banner ❌
├─ Překrýval dashboard
└─ Otravný!
```

---

**Badge neruší, console funguje, všechno OK!** 🚀✨
