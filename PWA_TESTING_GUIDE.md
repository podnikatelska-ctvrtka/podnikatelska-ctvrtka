# 🖥️ **JAK TESTOVAT PWA LOKÁLNĚ NA PC**

**SPRÁVNÁ URL PRO KURZ:** `http://localhost:5173/course-v3` ✅

---

## 🚀 **1. SPUŠTĚNÍ DEV SERVERU**

```bash
# V root složce projektu
npm run dev
```

**URL Overview:**
- **Landing page:** `http://localhost:5173/`
- **Kurz (PWA):** `http://localhost:5173/course-v3` ← **TADY TESTUJEME!**
- **Objednávka:** `http://localhost:5173/objednavka`
- **Mini kurz:** `http://localhost:5173/minikurz`

---

## 📱 **2. QUICK START (30 sekund)**

```bash
# 1. Spusť server
npm run dev

# 2. Otevři Chrome
# Zkopíruj tuto URL:
http://localhost:5173/course-v3

# 3. Mobile mode (Ctrl+Shift+M)
# 4. F12 pro DevTools
# 5. ✅ JE TO TAM!
```

---

## 🧪 **3. TESTOVÁNÍ VŠECH PWA FUNKCÍ**

### **A) PULL-TO-REFRESH** ⬇️

**Co testujeme:** Potáhni dolů na dashboardu → reload progressu

**Postup:**
```
1. Otevři: http://localhost:5173/course-v3
2. Stiskni Ctrl+Shift+M (mobile mode)
3. Měl bys být na DASHBOARDU (hlavní přehled kurzu)
4. Táhni myší nebo trackpadem DOLŮ od vrchu obrazovky
5. ✅ Uvidíš rotating RefreshCw icon!
6. Pusť → progress se znovu načte
```

**Debug:**
- Nevidíš icon? → Zkontroluj že jsi na dashboardu (ne v lekci)
- Nefunguje táhnutí? → Použij trackpad (2 finger scroll up)
- Pořád nic? → Console (F12) → podívej se na errory

---

### **B) SWIPE NAVIGATION** ↔️

**Co testujeme:** Swipe LEFT/RIGHT mezi lekcemi

**Postup:**
```
1. Otevři: http://localhost:5173/course-v3
2. Stiskni Ctrl+Shift+M (mobile mode)
3. Klikni na JAKOUKOLI LEKCI (např. Modul 1 → Lekce 1: Co je Model podnikání?)
4. Teď jsi V LEKCI (ne na dashboardu)
5. Táhni myší nebo trackpadem DOLEVA (← LEFT)
   → ✅ Přepne na DALŠÍ lekci
6. Táhni DOPRAVA (→ RIGHT)
   → ✅ Přepne na PŘEDCHOZÍ lekci
```

**Co uvidíš:**
- Šipky (← / →) se zobrazí při swipe
- Haptic feedback v console (na PC)
- Hints: "← Předchozí" / "Další →"

**Debug:**
- Nefunguje swipe? → Zkontroluj že jsi V LEKCI (ne na dashboardu)
- Nevidíš šipky? → Zkus táhnout víc (threshold 50px)
- Pořád nic? → Trackpad: použij 2 prsty a táhni horizontálně

---

### **C) OFFLINE INDICATOR** 📡

**Co testujeme:** Banner při ztrátě internetu

**Postup:**
```
1. Otevři: http://localhost:5173/course-v3
2. F12 → Application tab → Service Workers
3. Zaškrtni checkbox "Offline"
4. ✅ Uvidíš ORANGE banner: "🔴 Jste offline"
5. Odškrtni "Offline"
6. ✅ Uvidíš ZELENÝ toast: "✅ Spojení obnoveno"
```

**Alternativa (Network tab):**
```
1. F12 → Network tab
2. Dropdown "No throttling" → "Offline"
3. Refresh (F5)
4. ✅ Orange banner se zobrazí
```

---

### **D) SERVICE WORKER** ⚙️

**Co testujeme:** Offline funkčnost

**Postup:**
```
1. Otevři: http://localhost:5173/course-v3
2. F12 → Application → Service Workers
3. ✅ Status: "activated and is running"
4. Zaškrtni "Offline"
5. Refresh stránku (F5)
6. ✅ Aplikace FUNGUJE bez internetu!
```

**Cache Storage:**
```
1. F12 → Application → Cache Storage
2. Otevři cache (např. "workbox-precache-v2...")
3. ✅ Vidíš cached soubory (JS, CSS, HTML)
```

---

### **E) INSTALL PROMPT** 💾

**Co testujeme:** Instalace jako PWA

**Desktop (Chrome):**
```
1. Otevři: http://localhost:5173/course-v3
2. Počkej 30 sekund
3. V address baru (⭐ vedle URL) se objeví ikona "Install" (+)
4. NEBO: Menu (⋮) → "Install Podnikatelská Čtvrtka..."
5. Klikni → Install dialog
6. ✅ Aplikace se nainstaluje jako standalone app
```

**Manuální trigger:**
```
1. F12 → Application → Manifest
2. Klikni link "Add to home screen"
3. ✅ Install prompt se zobrazí
```

---

### **F) LAZY IMAGE LOADING** 🖼️

**Co testujeme:** Obrázky se načítají až když jsou viditelné

**Postup:**
```
1. Otevři landing page: http://localhost:5173/
2. F12 → Network tab
3. Filter: "Img"
4. Scrolluj pomalu dolů
5. ✅ Vidíš že obrázky se načítají postupně (on-demand)
```

**V kurzu:**
```
1. Otevři kurz: http://localhost:5173/course-v3
2. Pokud jsou nějaké obrázky, měly by se lazy loadovat
```

---

### **G) CACHE MANAGER (IndexedDB)** 📦

**Co testujeme:** Offline cache pro data

**Postup:**
```
1. Otevři: http://localhost:5173/course-v3
2. F12 → Application → Storage → IndexedDB
3. Najdi: "podnikatelska_ctvrtka_cache"
4. Otevři "api_cache" object store
5. ✅ Vidíš cached data (progress, user data, atd.)
```

**Console test:**
```javascript
// V console (F12):
import { cacheManager } from './lib/cacheManager';

// Set data
await cacheManager.set('test', { foo: 'bar' }, 60000);

// Get data
const data = await cacheManager.get('test');
console.log(data); // { foo: 'bar' }

// List all keys
const keys = await cacheManager.keys();
console.log(keys);
```

---

### **H) PAGE TRANSITIONS** 🎨

**Co testujeme:** Smooth přechody mezi lekcemi

**Postup:**
```
1. Otevři: http://localhost:5173/course-v3
2. Klikni na lekci
3. ✅ Měl bys vidět SLIDE animaci
4. Klikni na jinou lekci
5. ✅ Zase slide transition
```

**Performance:**
```
1. F12 → Performance tab
2. Klikni "Record"
3. Naviguj mezi lekcemi (klikej na různé lekce)
4. Stop recording
5. ✅ Zkontroluj FPS (60 FPS = smooth)
```

---

### **I) SUCCESS ANIMATIONS** 🎉

**Co testujeme:** Animace po dokončení lekce

**Postup:**
```
1. Otevři: http://localhost:5173/course-v3
2. Klikni na lekci
3. Scrolluj dolů
4. Klikni "Dokončit lekci"
5. ✅ Full-screen success animation!
6. Confetti efekt
7. Haptic feedback (console log na PC)
```

---

### **J) BUTTON ANIMATIONS** 🔘

**Co testujeme:** Micro-interactions na buttonech

**Postup:**
```
1. Otevři: http://localhost:5173/course-v3
2. Hover myší přes jakýkoli button
3. ✅ Scale 1.02 (lehký zoom)
4. Click na button
5. ✅ Scale 0.98 (stisknutí)
6. Console: "Haptic: light" (na PC)
```

---

## 🔍 **4. LIGHTHOUSE AUDIT**

**Jak spustit:**
```
1. Otevři: http://localhost:5173/course-v3
2. F12 → Lighthouse tab
3. Categories:
   ☑ Performance
   ☑ PWA
   ☑ Accessibility
   ☑ Best Practices
   ☑ SEO
4. Device: Mobile
5. Klikni "Analyze page load"
6. Počkej 30-60 sekund
```

**Target Scores:**
```
✅ Performance: 90+
✅ PWA: 100
✅ Accessibility: 90+
✅ Best Practices: 90+
✅ SEO: 90+
```

**PWA Checklist:**
```
✅ Installable
✅ Service Worker registered
✅ Works offline
✅ Has manifest.json
✅ Has 512x512 icon
✅ HTTPS (localhost OK)
✅ Fast load time (<3s)
```

---

## 🎯 **5. MOBILE SIMULATION V CHROME**

### **Zapnutí Device Toolbar:**
```
Ctrl+Shift+M (Windows/Linux)
Cmd+Shift+M (Mac)
```

### **Doporučené nastavení:**
```
Device: iPhone 14 Pro
Dimensions: 390 x 844
DPR: 3
User Agent: Mobile Safari
Throttling: No throttling (fast 4G pro testing)
```

### **Touch Mode:**
```
1. DevTools → Settings (⚙️)
2. Experiments
3. Zaškrtni "Emulate touch events"
4. Restart DevTools
5. ✅ Touch gestures fungují!
```

---

## 📱 **6. REMOTE DEBUGGING (NEJLEPŠÍ!)**

### **Android:**
```
1. Připoj Android k PC (USB kabel)
2. Na mobilu: Nastavení → O telefonu → 7x klikni na "Číslo sestavení"
3. Developer Options → zapni "USB Debugging"
4. Chrome na PC → otevři chrome://inspect
5. Najdi své zařízení
6. Klikni "Inspect"
7. ✅ DevTools pro skutečný mobil!

Na mobilu otevři: http://[TVOJE_IP]:5173/course-v3
Např: http://192.168.1.100:5173/course-v3
```

### **iOS (Mac):**
```
1. Připoj iPhone k Mac (USB)
2. iPhone: Nastavení → Safari → Rozšířené → Web Inspector (zapni)
3. Safari na Mac → Develop → [Tvůj iPhone]
4. Vyber stránku
5. ✅ Safari DevTools!

Na iPhonu otevři: http://[TVOJE_IP]:5173/course-v3
```

---

## 🛠️ **7. DEBUG TIPS**

### **Service Worker se nezaregistroval:**
```javascript
// Console (F12):
navigator.serviceWorker.getRegistrations().then(regs => {
  console.log('SW Registrations:', regs.length);
  regs.forEach(reg => reg.unregister());
});

// Hard refresh:
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

### **Cache nefunguje:**
```javascript
// Console:
caches.keys().then(keys => {
  console.log('Cache keys:', keys);
  keys.forEach(key => caches.delete(key));
});

// Pak refresh
```

### **Pull-to-refresh nefunguje:**
```
Možné příčiny:
1. Nejsi na dashboardu (musíš být na hlavní obrazovce kurzu, ne v lekci)
2. Scroll position není na 0 (scrolluj úplně nahoru)
3. Touch mode není zapnutý (DevTools → Settings → Experiments)
4. Táhneš nahoru místo dolů (musíš táhnout DOLŮ od vrchu)
```

### **Swipe navigation nefunguje:**
```
Možné příčiny:
1. Nejsi v lekci (musíš otevřít konkrétní lekci, ne dashboard)
2. Touch mode není zapnutý
3. Táhneš vertikálně místo horizontálně
4. Threshold není dosažen (táhni aspoň 50px)
```

### **Offline mode nefunguje:**
```
Možné příčiny:
1. Service Worker není zaregistrován (F12 → Application → SW)
2. Cache je prázdná (první návštěva - refresh jednou)
3. Špatná URL (musí být /course-v3, ne jenom /)
```

---

## ✅ **8. KOMPLETNÍ TEST CHECKLIST (5 minut)**

```bash
# 1️⃣ SPUŠTĚNÍ
npm run dev
→ http://localhost:5173/course-v3 ✅

# 2️⃣ SERVICE WORKER
F12 → Application → Service Workers
→ Status: "activated" ✅

# 3️⃣ MANIFEST
F12 → Application → Manifest
→ Viditelný, bez chyb ✅

# 4️⃣ OFFLINE MODE
F12 → Application → SW → Checkbox "Offline"
Refresh (F5)
→ Funguje bez internetu ✅
→ Orange banner "Jste offline" ✅

# 5️⃣ PULL-TO-REFRESH
Ctrl+Shift+M (mobile mode)
Dashboard → Táhni dolů
→ Rotating RefreshCw icon ✅

# 6️⃣ SWIPE NAVIGATION
Otevři lekci → Swipe left/right
→ Přepíná lekce ✅
→ Vidíš šipky ✅

# 7️⃣ SUCCESS ANIMATION
Dokončení lekci → Klikni "Dokončit"
→ Full-screen animace ✅
→ Confetti ✅

# 8️⃣ INSTALL PROMPT
Počkej 30s → Address bar → Install icon
→ Zobrazí se ✅

# 9️⃣ LIGHTHOUSE
F12 → Lighthouse → Analyze
→ PWA Score: 100 ✅

# 🔟 CONSOLE
F12 → Console
→ Žádné errory ✅
```

---

## 🎓 **9. PRODUCTION BUILD TEST**

```bash
# Build
npm run build

# Preview
npm run preview
```

**Preview URL:** `http://localhost:4173/course-v3`

**Rozdíly:**
```
Dev (5173):
- Hot reload
- Source maps
- Debug mode

Production (4173):
- Minifikace ✅
- Optimalizace ✅
- Real Service Worker cache ✅
- Přesně jako na serveru! ✅
```

---

## 🚀 **10. NEJRYCHLEJŠÍ TEST (30 sekund)**

```bash
# Spusť
npm run dev

# Otevři (ZKOPÍRUJ TUTO URL!)
http://localhost:5173/course-v3

# Mobile mode
Ctrl+Shift+M

# Pull-to-refresh
Táhni dolů na dashboardu
✅ Rotating icon!

# Swipe navigation
Otevři lekci → Swipe left/right
✅ Přepíná lekce!

# Offline
F12 → Application → SW → Offline
✅ Orange banner!

# HOTOVO! 🎉
```

---

## 📚 **VŠECHNY URL PRO TESTOVÁNÍ**

```
Landing page:     http://localhost:5173/
Kurz (PWA):       http://localhost:5173/course-v3  ← HLAVNÍ!
Mini kurz:        http://localhost:5173/minikurz
Objednávka:       http://localhost:5173/objednavka
GDPR:             http://localhost:5173/gdpr
Podmínky:         http://localhost:5173/podminky
Reklamy:          http://localhost:5173/ultimate-10-ads
```

---

## 🎯 **CO TESTOVAT NA MOBILU (Remote Debugging)**

1. ✅ Pull-to-refresh (skutečný touch)
2. ✅ Swipe navigation (skutečné gesto)
3. ✅ Haptic feedback (vibruje!)
4. ✅ Install prompt (přidá na home screen)
5. ✅ Offline mode (skutečně vypni WiFi)
6. ✅ Safe areas (notch, bottom bar)
7. ✅ Performance (smoothness)

---

## 💡 **TIPS**

1. **Vždy refreshuj po změnách:** Ctrl+Shift+R (hard refresh)
2. **DevTools otevřené:** F12 pořád zapnuté pro debugging
3. **Console watch:** Sleduj errory a warnings
4. **Network tab:** Kontroluj co se načítá
5. **Mobile mode:** Vždy testuj v mobile view (Ctrl+Shift+M)

---

**ENJOY TESTING!** 🚀

Všechno funguje? → Označ v checklistu a jeď dál!  
Něco nefunguje? → Koukni do Debug Tips nebo napiš! 😊
