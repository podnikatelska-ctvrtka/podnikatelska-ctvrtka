# 🛠️ **DEV TESTING GUIDE**

**Quick guide pro testování PWA na lokále!**

---

## 🚀 **RYCHLÝ START (1 minuta)**

### **1. Spusť dev server**
```bash
npm run dev
```

### **2. Otevři v prohlížeči**
```
http://localhost:5173
```

### **3. Uvidíš Dev Mode Banner**
```
🟣 Fialový banner nahoře
   - Quick Login button
   - Clear Console
   - User status
```

### **4. Quick Login**
```
Klikni "Quick Login" → auto-přihlášení testovacího uživatele
```

**HOTOVO!** Jsi přihlášený a můžeš testovat! 🎉

---

## 🎯 **DEV MODE BANNER**

### **Co nabízí:**
```
✅ Quick Login      → 1-click auto-login
✅ Quick Logout     → 1-click logout
✅ Clear Console    → Vyčistit console
✅ User Status      → Zobrazí aktuálního uživatele
✅ Minimalizace     → Klikni X → schová se (zobrazí jen ikonu)
```

### **Testovací přihlašovací údaje:**
```
📧 Email: test@podnikatelskactvrtka.cz
🔑 Password: TestPass123!
```

---

## 💻 **CONSOLE DEV TOOLS**

### **Otevři Console (F12)**
```javascript
// Auto login
await devTools.login()

// Quick login s custom credentials
await devTools.quickLogin('email@example.com', 'password')

// Logout
await devTools.logout()

// Get current session
await devTools.session()

// Get current user
await devTools.user()

// Clear storage
devTools.clear()

// Show test credentials
devTools.credentials

// Help
devTools.help()
```

---

## 📱 **MOBILE SIMULATION**

### **1. Device Toolbar**
```
Ctrl+Shift+M (Windows/Linux)
Cmd+Shift+M (Mac)
```

### **2. Vyber zařízení**
```
iPhone 14 Pro
Pixel 7
iPad Pro
```

### **3. Test Touch Gestures**
```
✅ Pull-to-refresh   → Táhni dolů na dashboardu
✅ Swipe navigation  → Swipe left/right v lekci
✅ Touch feedback    → Click na buttony
```

---

## 🧪 **TESTOVÁNÍ PWA FUNKCÍ**

### **A) OFFLINE MODE**
```
1. F12 → Network tab
2. Dropdown "No throttling" → "Offline"
3. Refresh (F5)
4. ✅ Mělo by fungovat offline!
```

### **B) SERVICE WORKER**
```
1. F12 → Application → Service Workers
2. ✅ Status: "activated and is running"
3. Cache Storage → cached soubory
```

### **C) INSTALL APP**
```
1. Address bar → Install icon (+)
2. NEBO: Menu (⋮) → "Install Podnikatelská Čtvrtka..."
3. ✅ Nainstaluje se jako PWA!
```

### **D) PULL-TO-REFRESH**
```
1. Ctrl+Shift+M (mobile mode)
2. Otevři dashboard: /course-v3
3. Táhni dolů
4. ✅ Rotating RefreshCw icon
```

### **E) SWIPE NAVIGATION**
```
1. Mobile mode
2. Otevři lekci
3. Swipe LEFT → další lekce
4. Swipe RIGHT → předchozí lekce
5. ✅ Uvidíš šipky
```

### **F) OFFLINE INDICATOR**
```
1. Network → Offline
2. ✅ Orange banner "Jste offline"
3. Network → Online
4. ✅ Green banner "Spojení obnoveno"
```

---

## 🎨 **TESTOVÁNÍ ANIMACÍ**

### **Success Animation**
```
1. Dokončení lekce
2. ✅ Full-screen success popup
```

### **Button Animations**
```
1. Hover → Scale 1.02
2. Click → Scale 0.98
3. ✅ Smooth transitions
```

### **Page Transitions**
```
1. Navigace mezi lekcemi
2. ✅ Slide transition
```

---

## 🔍 **CHROME DEVTOOLS CHECKLIST**

### **Application Tab:**
```
☑ Manifest
  ✅ name: "Podnikatelská Čtvrtka"
  ✅ icons: 192x192, 512x512
  ✅ display: standalone

☑ Service Workers
  ✅ Status: activated
  ✅ Update on reload: OFF

☑ Storage
  ✅ Local Storage: user data
  ✅ IndexedDB: cache manager
  ✅ Cache Storage: assets

☑ Background Services
  ✅ Service Worker: running
```

### **Network Tab:**
```
☑ First load
  → Velké soubory (main.js, vendor.js)

☑ Second load
  → (from ServiceWorker)
  ✅ Cache hit!

☑ Offline mode
  → Vše funguje z cache
```

---

## 📊 **LIGHTHOUSE AUDIT**

### **Spuštění:**
```
1. F12 → Lighthouse
2. Categories: ☑ All
3. Device: Mobile
4. Klikni "Analyze page load"
```

### **Target Scores:**
```
Performance:    90+ 🎯
PWA:            100 ✅
Accessibility:  90+ 🎯
Best Practices: 90+ 🎯
SEO:            90+ 🎯
```

---

## 🛠️ **DEBUG TIPY**

### **Service Worker nefunguje:**
```javascript
// Console:
navigator.serviceWorker.getRegistrations().then(regs => {
  regs.forEach(reg => reg.unregister());
});
// Hard refresh: Ctrl+Shift+R
```

### **Cache nefunguje:**
```javascript
// Console:
caches.keys().then(keys => {
  keys.forEach(key => caches.delete(key));
});
```

### **Auto-login nefunguje:**
```javascript
// Console:
await devTools.login()
// NEBO manuálně:
await devTools.quickLogin('test@podnikatelskactvrtka.cz', 'TestPass123!')
```

### **Clear all data:**
```javascript
// Console:
devTools.clear()
// NEBO:
localStorage.clear();
sessionStorage.clear();
await caches.keys().then(keys => {
  keys.forEach(key => caches.delete(key));
});
```

---

## 🎯 **QUICK TEST SCENARIOS**

### **Scenario 1: New User Flow**
```
1. devTools.clear()        → Vyčisti vše
2. Otevři /                → Landing page
3. Email capture           → Zadej email
4. Mini kurz               → Projdi mini kurz
5. /objednavka             → Order page
```

### **Scenario 2: Returning User**
```
1. devTools.login()        → Quick login
2. Otevři /course-v3       → Dashboard
3. Pull-to-refresh         → Refresh progress
4. Otevři lekci            → Start lesson
5. Swipe navigation        → Next/prev lesson
```

### **Scenario 3: Offline Mode**
```
1. devTools.login()        → Login
2. Network → Offline       → Disconnect
3. Navigate                → Test offline
4. Network → Online        → Reconnect
5. ✅ Vše funguje!
```

### **Scenario 4: PWA Install**
```
1. Otevři app
2. Počkej 30s
3. Install icon → Install
4. Otevři jako app
5. ✅ Native feeling!
```

---

## 📦 **PRODUCTION BUILD TEST**

### **Build & Preview:**
```bash
npm run build
npm run preview
```

**Preview URL:** `http://localhost:4173`

### **Co testovat:**
```
✅ Minifikace funguje
✅ Service Worker active
✅ Cache funguje
✅ Install funguje
✅ Offline funguje
✅ Přesně jako production!
```

---

## 🚨 **COMMON ISSUES**

### **Issue: Service Worker se nezaregistroval**
```
Solution:
1. Hard refresh: Ctrl+Shift+R
2. Unregister all SW (viz Debug tipy)
3. Restart dev server
```

### **Issue: Install prompt se nezobrazil**
```
Solution:
1. Počkej 30 sekund
2. Zkontroluj manifest.json
3. Zkus F12 → Application → "Add to home screen"
```

### **Issue: Pull-to-refresh nefunguje**
```
Solution:
1. Zapni mobile mode (Ctrl+Shift+M)
2. Otevři /course-v3 (dashboard)
3. Táhni pomalu dolů
4. Threshold: 80px
```

### **Issue: Auto-login nefunguje**
```
Solution:
1. Zkontroluj console errors
2. Zkontroluj Supabase connection
3. Manuální login: devTools.quickLogin()
```

---

## ✅ **QUICK CHECKLIST**

### **Before Testing:**
```bash
☑ npm run dev                  → Server běží
☑ http://localhost:5173         → App otevřená
☑ F12 → Console                 → DevTools open
☑ devTools.help()               → Commands visible
```

### **During Testing:**
```
☑ Dev banner nahoře
☑ Quick login funguje
☑ Console bez errors
☑ Service Worker active
☑ Offline mode funguje
☑ Pull-to-refresh funguje
☑ Swipe navigation funguje
☑ Animace smooth
```

### **After Testing:**
```
☑ Lighthouse score 90+
☑ No console errors
☑ All features work
☑ Ready to deploy!
```

---

## 🎓 **NEXT STEPS**

### **1. Local Testing Complete**
```
✅ Všechny funkce fungují na lokále
→ NEXT: Testing na real mobile device
```

### **2. Mobile Device Testing**
```
✅ Android: Chrome Remote Debugging
✅ iOS: Safari Remote Debugging
→ NEXT: Production deployment
```

### **3. Production Deployment**
```
✅ Build funguje
✅ Preview funguje
✅ All tests passed
→ NEXT: Deploy to Netlify!
```

---

## 🚀 **READY TO TEST!**

### **Fastest Test (30 seconds):**
```bash
# 1. Start
npm run dev

# 2. Open
http://localhost:5173

# 3. Login
# Klikni "Quick Login" v banneru

# 4. Test
# Navigate → vše funguje!
```

---

**HAPPY TESTING!** 🎉

Pokud něco nefunguje:
1. Zkontroluj console (F12)
2. Použij `devTools.help()`
3. Clear storage: `devTools.clear()`
4. Restart server: `Ctrl+C` → `npm run dev`
