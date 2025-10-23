# 🚀 **DEV MODE - QUICK REFERENCE**

**1-page cheatsheet pro rychlé testování!**

---

## ⚡ **SUPER QUICK START**

```bash
# 1. Start
npm run dev

# 2. Open
http://localhost:5173

# 3. Click "Quick Login" v fialovém banneru
# ✅ Done!
```

---

## 🎯 **DEV BANNER SHORTCUTS**

```
🟣 Purple Banner (top of page)
   ├─ Quick Login    → 1-click login
   ├─ Logout         → 1-click logout
   ├─ Clear Console  → Clear console.log
   └─ Close (X)      → Minimize banner
```

---

## 💻 **CONSOLE COMMANDS**

```javascript
// Login/Logout
await devTools.login()          // Auto-login test user
await devTools.logout()         // Logout

// Session
await devTools.session()        // Get session
await devTools.user()           // Get user

// Storage
devTools.clear()                // Clear all storage
devTools.credentials            // Show test credentials
devTools.help()                 // Show help
```

---

## 📱 **MOBILE MODE**

```
Ctrl+Shift+M              → Toggle mobile mode
F12                       → DevTools
iPhone 14 Pro             → Recommended device
```

---

## 🧪 **QUICK TESTS**

### **Pull-to-Refresh**
```
1. Mobile mode (Ctrl+Shift+M)
2. Go to /course-v3
3. Pull down → refresh!
```

### **Swipe Navigation**
```
1. Mobile mode
2. Open any lesson
3. Swipe LEFT/RIGHT → navigate!
```

### **Offline Mode**
```
1. F12 → Network → Offline
2. Refresh → still works!
```

### **Install PWA**
```
1. Address bar → Install icon
2. Click → installed!
```

---

## 🔑 **TEST CREDENTIALS**

```
Email:    test@podnikatelskactvrtka.cz
Password: TestPass123!
```

---

## 🛠️ **DEBUG QUICK FIXES**

### **Service Worker issues:**
```javascript
// Unregister all
navigator.serviceWorker.getRegistrations().then(regs => {
  regs.forEach(r => r.unregister());
});
// Then: Ctrl+Shift+R
```

### **Cache issues:**
```javascript
// Clear cache
caches.keys().then(keys => {
  keys.forEach(k => caches.delete(k));
});
```

### **Storage issues:**
```javascript
// Clear everything
devTools.clear()
```

---

## 📊 **LIGHTHOUSE**

```
F12 → Lighthouse → Analyze

Target:
Performance:    90+
PWA:            100
Accessibility:  90+
```

---

## 🎯 **ROUTES**

```
/                      → Landing page
/course-v3             → Course dashboard (needs login)
/objednavka            → Order page
/mini-kurs             → Mini course
/ultimate-10-ads       → Ad portfolio
```

---

## ✅ **QUICK CHECKLIST**

```bash
☑ npm run dev
☑ http://localhost:5173
☑ Dev banner visible
☑ Quick login works
☑ Console clean
☑ No errors
☑ Ready to test!
```

---

**ENJOY!** 🎉
