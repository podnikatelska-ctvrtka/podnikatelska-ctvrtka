# 🚀 **DEV MODE - CO TEĎKA?**

Vidíš **fialový banner nahoře**? Super! Dev mode funguje! 🎉

---

## 🎯 **CO MÁŠ DĚLAT TEĎKA:**

### **1. PŘIHLAS SE (Quick Login)** 🔑

**Klikni na tlačítko "Quick Login" v banneru!**

```
🟣 Dev Mode Banner
   ├─ ⚡ DEV MODE
   ├─ ✗ Not logged in  ← Červený status
   └─ [Quick Login]     ← KLIKNI TADY!
```

**Co se stane:**
```
→ Auto-login do test účtu
→ Reload stránky
→ ✅ Status: zelený "✓ test@..."
```

---

### **2. NAVIGUJ NA KURZ** 📚

**Po přihlášení zadej URL:**
```
http://localhost:5173/course-v3
```

**Co uvidíš:**
```
✅ Dashboard kurzu (hlavní přehled)
✅ 3 moduly
✅ 16 lekcí
✅ Progress tracking
```

---

### **3. TESTUJ PWA FUNKCE** 🧪

#### **A) Pull-to-Refresh** ⬇️
```
1. Jsi na dashboardu
2. Ctrl+Shift+M (mobile mode)
3. Táhni dolů myší
4. ✅ Uvidíš rotating RefreshCw icon!
```

#### **B) Swipe Navigation** ↔️
```
1. Klikni na jakoukoli lekci
2. Mobile mode (Ctrl+Shift+M)
3. Swipe LEFT → další lekce
4. Swipe RIGHT → předchozí lekce
5. ✅ Uvidíš šipky!
```

#### **C) Offline Mode** 📡
```
1. F12 → Application → Service Workers
2. Checkbox "Offline"
3. Refresh (F5)
4. ✅ Orange banner "Jste offline"
```

#### **D) Install PWA** 💾
```
1. Počkej 30 sekund
2. Address bar → Install icon (+)
3. Click install
4. ✅ Aplikace nainstalovaná!
```

---

## 💻 **CONSOLE COMMANDS**

**Otevři Console (F12):**

```javascript
// Login/Logout
await devTools.login()          // Auto-login
await devTools.logout()         // Logout

// Session info
await devTools.session()        // Current session
await devTools.user()           // Current user info

// Storage
devTools.clear()                // Clear everything
devTools.credentials            // Show test credentials

// Help
devTools.help()                 // Show all commands
```

---

## 🎬 **QUICK TESTING FLOW:**

### **30-second test:**
```
1. Click "Quick Login" v banneru
2. Naviguj: /course-v3
3. Mobile mode: Ctrl+Shift+M
4. Pull-to-refresh → Táhni dolů
5. Open lesson → Swipe left/right
6. ✅ FUNGUJE!
```

---

## 🔧 **TROUBLESHOOTING:**

### **Banner se nezobrazuje?**
```
→ Hard refresh: Ctrl+Shift+R
→ Check URL: localhost:5173? ✅
```

### **Quick Login nefunguje?**
```javascript
// Console:
await devTools.login()
// Pokud error → zkontroluj Supabase connection
```

### **Console errors?**
```
F12 → Console
→ Screenshot erroru + napiš mi!
```

---

## 📚 **TESTOVACÍ ÚČET:**

```
Email:    test@podnikatelskactvrtka.cz
Password: TestPass123!
```

*(Auto-použito při Quick Login)*

---

## 🎯 **VŠECHNY URL PRO TESTOVÁNÍ:**

```
Landing:        http://localhost:5173/
Kurz (PWA):     http://localhost:5173/course-v3     ← HLAVNÍ!
Mini kurz:      http://localhost:5173/minikurz
Objednávka:     http://localhost:5173/objednavka
GDPR:           http://localhost:5173/gdpr
Podmínky:       http://localhost:5173/podminky
Reklamy:        http://localhost:5173/ultimate-10-ads
```

---

## 🎨 **CO TESTOVAT:**

### **Dashboard (hlavní obrazovka):**
```
✅ Zobrazuje progress
✅ 3 moduly viditelné
✅ Locked/unlocked lekce
✅ Pull-to-refresh funguje
```

### **Lekce (lesson view):**
```
✅ Content se načítá
✅ Swipe navigation (left/right)
✅ "Dokončit lekci" button
✅ Success animation po dokončení
```

### **Mobile Experience:**
```
✅ Responsive design
✅ Touch gestures
✅ Bottom navigation
✅ Safe areas (notch)
```

### **Offline Mode:**
```
✅ Aplikace funguje bez internetu
✅ Orange banner se zobrazí
✅ Progress se načítá z cache
✅ Uložené lekce dostupné
```

---

## 🚀 **NEXT STEPS:**

### **Po základním testování:**
```
1. ✅ Quick login funguje
2. ✅ Dashboard viditelný
3. ✅ Lekce fungují
4. ✅ PWA features OK
→ NEXT: Real mobile device testing!
```

### **Pro production:**
```
1. ✅ Dev testing complete
2. npm run build
3. npm run preview
4. Test na preview URL
→ NEXT: Deploy to Netlify!
```

---

## 💡 **TIPS:**

1. **DevTools vždy otevřené:** F12 → sleduj console
2. **Mobile mode ON:** Ctrl+Shift+M
3. **Hard refresh po změnách:** Ctrl+Shift+R
4. **Watch Network tab:** Sleduj co se načítá

---

## 📱 **MOBILE DEVICE TESTING:**

### **Android (Chrome Remote Debugging):**
```
1. Připoj Android k PC (USB)
2. Chrome na PC: chrome://inspect
3. Na mobilu otevři: http://[TVOJE_IP]:5173/course-v3
4. Klikni "Inspect" v Chrome
5. ✅ Full DevTools pro real device!
```

### **iOS (Safari Remote Debugging):**
```
1. Připoj iPhone k Mac (USB)
2. Safari → Develop → [Tvůj iPhone]
3. Na iPhonu: http://[TVOJE_IP]:5173/course-v3
4. ✅ Safari DevTools!
```

**Najdi svoji IP:**
```bash
# Windows:
ipconfig

# Mac/Linux:
ifconfig
```

---

## ✅ **CHECKLIST:**

```
☐ Dev banner visible nahoře
☐ Quick Login funguje
☐ Dashboard (/course-v3) loading
☐ Progress se zobrazuje
☐ Lekce fungují
☐ Pull-to-refresh works
☐ Swipe navigation works
☐ Offline mode works
☐ No console errors
☐ Ready to test more!
```

---

## 🎉 **START TESTING!**

### **Fastest way:**
```
1. Click "Quick Login" 
   → ✅ Přihlášený!

2. Navigate: /course-v3
   → ✅ Dashboard!

3. Click lesson → Test swipe
   → ✅ Funguje!

4. DONE! 🚀
```

---

**ENJOY TESTING!** 🎊

Pokud něco nejde nebo máš otázku, napiš! 😊

**Pro detailní dokumentaci viz:**
- `/DEV_TESTING_GUIDE.md` - Kompletní testing guide
- `/DEV_QUICK_REFERENCE.md` - 1-page cheatsheet
- `/PWA_TESTING_GUIDE.md` - PWA funkce krok za krokem
