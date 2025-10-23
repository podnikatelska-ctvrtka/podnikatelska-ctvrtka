# 🚀 PWA Implementation Plan - Podnikatelská Čtvrtka

## ✅ FÁZE 1: PWA ZÁKLAD (1-2h)

### 1.1 Manifest.json
```json
{
  "name": "Podnikatelská Čtvrtka",
  "short_name": "P.Čtvrtka",
  "description": "Business Model Canvas + FIT Validátor - První v ČR",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "orientation": "portrait",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### 1.2 Service Worker (Offline Support)
- Cache landing page
- Cache kritické assets (CSS, JS)
- Cache user data (IndexedDB fallback pro Supabase)
- Background sync pro autosave

### 1.3 Install Prompt
- Detekce iOS vs Android
- Custom install banner
- "Přidat na plochu" CTA

---

## ✅ FÁZE 2: MOBILNÍ UX (2-3h)

### 2.1 Touch Optimalizace
**BusinessModelCanvasSimple.tsx:**
- ❌ REMOVE: Double-click edit
- ✅ ADD: Long-press (500ms) → Edit modal
- ✅ ADD: Swipe-to-delete gesture
- ✅ ENLARGE: Touch targets 44x44px minimum

**FitValidatorV2.tsx:**
- ✅ ADD: Bottom Sheet pro AddItemInput
- ✅ ADD: Draggable items (pro prioritizaci)
- ✅ FIX: Keyboard overlap (fixed bottom bar)

### 2.2 Bottom Sheet Component (NEW)
```tsx
// /components/BottomSheet.tsx
- Draggable handle
- Snap points (50%, 90%)
- Backdrop dismiss
- iOS-style animation
```

### 2.3 Fixed Bottom Navigation
```tsx
// /components/MobileBottomNav.tsx
- Primary CTA (Pokračovat / Přidat)
- Secondary actions
- Safe area insets (iPhone notch)
```

### 2.4 Gesture Library
```tsx
// použít: react-use-gesture nebo vanilla touch events
- Long press → Edit
- Swipe left → Delete
- Drag & drop → Reorder
- Pull to refresh → Sync
```

---

## ✅ FÁZE 3: NATIVE APP FEEL (1-2h)

### 3.1 Splash Screen
```tsx
// /components/SplashScreen.tsx
- Logo animation
- Loading progress
- 2s fade-out
```

### 3.2 Haptic Feedback (iOS + Android)
```tsx
// /lib/haptics.ts
navigator.vibrate() fallback:
- Light tap: 10ms
- Medium: 25ms
- Success: [10, 50, 10]
- Error: [25, 100, 25, 100]
```

### 3.3 Pull-to-Refresh
```tsx
// /components/PullToRefresh.tsx
- Custom indicator
- Refresh user data
- Sync achievements
```

### 3.4 Safe Area Insets
```css
/* globals.css */
.safe-top { padding-top: env(safe-area-inset-top); }
.safe-bottom { padding-bottom: env(safe-area-inset-bottom); }
```

---

## 🎯 KRITÉRIA ÚSPĚCHU

### Desktop:
- ✅ ŽÁDNÁ ZMĚNA v UX/UI
- ✅ Funguje vše jako doposud
- ✅ PWA je optional (ne required)

### Mobile:
- ✅ Lze instalovat jako appku
- ✅ Funguje offline (cache)
- ✅ Přidávání items funguje perfektně
- ✅ Native app feel (gestures, haptics)
- ✅ Bottom navigation je vždy viditelná

---

## ⏱️ ČASOVÝ ODHAD

**FÁZE 1:** 1-2h (PWA základ)  
**FÁZE 2:** 2-3h (Mobile UX)  
**FÁZE 3:** 1-2h (Native feel)  

**TOTAL:** 4-7 hodin

---

## 📦 KOMPONENTY K VYTVOŘENÍ

### Nové:
1. `/public/manifest.json`
2. `/public/sw.js` (Service Worker)
3. `/components/BottomSheet.tsx`
4. `/components/MobileBottomNav.tsx`
5. `/components/SplashScreen.tsx`
6. `/components/PullToRefresh.tsx`
7. `/components/InstallPrompt.tsx`
8. `/lib/haptics.ts`
9. `/lib/pwa.ts`

### Upravit:
1. `/components/BusinessModelCanvasSimple.tsx` - Long-press edit
2. `/components/FitValidatorV2.tsx` - Bottom Sheet input
3. `/components/MobileSingleSection.tsx` - Gestures
4. `/components/CourseDemoV3.tsx` - Bottom Nav integration
5. `/index.html` - Manifest link + theme-color
6. `/styles/globals.css` - Safe area insets

---

## 🚨 CO ZACHOVAT (NESMÍ SE POKAZIT)

1. **Desktop verze** - zero changes v UX
2. **Supabase autosave** - musí fungovat offline i online
3. **Achievements** - nesmí se ztratit
4. **Progress tracking** - localStorage + Supabase sync
5. **All existing features** - nic se nesmí rozbít

---

## 🎨 DESIGN PRINCIPY

**Mobile-first, ale desktop-compatible:**
- Na desktopu: Žádné bottom sheets, žádné gestures
- Na mobilu: Full PWA experience
- Responsive breakpoint: 768px (md:)

**Použít:**
- `useIsMobile()` hook pro detekci
- CSS media queries pro layout
- Feature detection (ne browser sniffing)

---

## 🔥 START: FÁZE 1

Mám začít vytvářet PWA infrastrukturu? (manifest, service worker, install prompt)
