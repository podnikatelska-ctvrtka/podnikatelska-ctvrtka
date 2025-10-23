# 🖥️ ACHIEVEMENT SYSTÉM NA DESKTOPU (PC/Laptop)

Vysvětlení jak fungují achievementy na **počítači**.

---

## 📍 KDE SE ACHIEVEMENTY ZOBRAZUJÍ?

### **POZICE:**
- **Vpravo nahoře** (`fixed right-4`)
- Pod hlavičkou kurzu (aby nepřekrývaly progress bar)
- Nad obsahem stránky

### **VERTICAL STACK:**
```
┌──────────────────────────┐  ← První achievement (top: 128px)
│  🎯 První zákazník       │
│  Přidali jste...         │
└──────────────────────────┘

        ↓ 12px gap

┌──────────────────────────┐  ← Druhý achievement (top: 280px)
│  💎 Hodnota na stole     │
│  Definovali jste...      │
└──────────────────────────┘

        ↓ 12px gap

┌──────────────────────────┐  ← Třetí achievement (top: 432px)
│  📋 Kompletní model      │
│  Dokončili jste...       │
└──────────────────────────┘
```

**✨ VŠECHNY ACHIEVEMENTY NAJEDNOU!** Pokud triggeruješ víc achievementů současně, zobrazí se všechny pod sebou!

---

## ⏱️ TIMELINE ZOBRAZENÍ

### **1. TRIGGER (0ms)**
```javascript
triggerAchievement('first-segment');
triggerAchievement('value-added'); // Další hned
```
- Achievementy se přidají do **visible stack** (`visibleAchievements[]`)
- Ukládá se do localStorage a Supabase
- **OKAMŽITĚ viditelné!** Žádná fronta!

### **2. ZOBRAZENÍ (0-3000ms)**
```
0ms    → Všechny achievementy slide-in NAJEDNOU z pravé strany
200ms  → Emoji fade-in
300ms  → "Odemčeno!" badge fade-in
400ms  → Titulek fade-in
500ms  → Popis fade-in
600ms  → Body/progress fade-in
3000ms → Auto-close (všechny zmizí najednou)
```

### **3. ŽÁDNÁ FRONTA!**
- Všechny achievementy se zobrazí **současně pod sebou**
- Auto-close po **3 sekundách** (dost času na přečtení všech)
- Slide-out animace je synchronizovaná

---

## 🎨 DESIGN SYSTEM

### **BARVY PODLE KATEGORIE:**

| Kategorie | Gradient | Achievementy |
|-----------|----------|--------------|
| `module` | `from-blue-500 to-indigo-600` | Module complete |
| `canvas` | `from-green-500 to-emerald-600` | BMC achievementy |
| `vpc` | `from-purple-500 to-pink-600` | VPC + FIT |
| `special` | `from-yellow-400 to-orange-500` | Action Plan, Ultimate |

### **KOMPONENTY:**
- **Icon**: 56×56px bílý kruh s emoji (3xl)
- **Badge**: "Odemčeno!" s Trophy ikonou
- **Title**: Bold 18px (text-lg)
- **Description**: Regular 14px (text-sm)
- **Points/Progress**: Malé badges dole

---

## 🎨 VERTICAL STACK (BEZ FRONTY!)

### **Proč vertical stack?**
Když uživatel triggeruje **více achievementů najednou** (např. dokončí modul → module-complete + poslední lekce modulu může triggerovat další achievement), vertical stack zajistí že:
1. ✅ Všechny achievementy se **zobrazí OKAMŽITĚ**
2. ✅ Žádný achievement se **neztratí**
3. ✅ Uživatel vidí **všechny najednou** (satisfying!)
4. ✅ Auto-close po **3 sekundách** (všechny zmizí společně)

### **Příklad:**
```javascript
// Uživatel dokončí Modul 1
triggerAchievement('complete-bmc');    // Přidá se do visible stack
triggerAchievement('module-1-complete'); // Přidá se do visible stack

// Zobrazení:
// 0-3000ms: OBA achievementy zobrazeny NAJEDNOU, pod sebou
//           ┌──────────────────┐ ← complete-bmc (top: 128px)
//           └──────────────────┘
//                  ↓ 12px gap
//           ┌──────────────────┐ ← module-1-complete (top: 280px)
//           └──────────────────┘
```

---

## 💾 PERSISTENCE (Ukládání)

### **localStorage:**
```javascript
// Odemčené achievementy
localStorage.setItem(
  'unlocked_achievements_USER_ID',
  JSON.stringify(['first-segment', 'value-added', ...])
);

// ❌ ŽÁDNÁ FRONTA! Achievementy se zobrazí okamžitě
```

### **Supabase (`user_achievements`):**
```sql
INSERT INTO user_achievements (
  user_id,
  achievement_type,
  title,
  description,
  icon,
  metadata
) VALUES (
  'user-uuid',
  'first-segment',
  'První zákazník',
  'Přidali jste...',
  '🎯',
  '{"points": 10, "category": "canvas"}'
);
```

---

## 🎯 REAL-TIME TRIGGERING

### **BMC Achievementy** (BusinessModelCanvasSimple.tsx):
```javascript
// Když uživatel přidá segment
if (segments.length === 1 && onAchievementUnlocked) {
  onAchievementUnlocked('first-segment');
}

// Když vyplní všech 9 sekcí
if (allSectionsFilled && onAchievementUnlocked) {
  onAchievementUnlocked('complete-bmc');
}
```

### **VPC Achievementy** (VPCCustomerProfileStory.tsx):
```javascript
// Po uložení Customer Profile
if (jobs.length > 0 && pains.length > 0 && gains.length > 0) {
  onAchievementUnlocked('customer-profile-complete');
}
```

### **FIT Achievementy** (FitValidatorV2.tsx):
```javascript
// useEffect sleduje změnu FIT Score
useEffect(() => {
  if (fitScore >= 90) {
    onAchievementUnlocked('fit-90-percent');
  } else if (fitScore >= 80) {
    onAchievementUnlocked('product-fit-master');
  } else if (fitScore >= 70) {
    onAchievementUnlocked('fit-70-percent');
  }
}, [fitScore]);
```

---

## 🐛 DEBUGGING

### **Console Logs:**
```javascript
// Triggering
console.log('🏆 Triggering achievement:', achievementId);

// Visible Stack
console.log('📋 Visible achievements:', visibleAchievements.length);

// Auto-close
console.log('⏰ Auto-closing achievements:', visibleAchievements.length);
```

### **Chrome DevTools:**
```
1. F12 → Console
2. Hledej: "🏆 Triggering achievement"
3. Application → Local Storage → podívej se na keys s "achievement"
```

### **Supabase:**
```sql
-- Zobraz achievementy
SELECT * FROM user_achievements 
WHERE user_id = 'YOUR_ID'
ORDER BY created_at DESC;
```

---

## 📏 RESPONSIVE BREAKPOINTS

| Velikost | Max Width | Pozice | Stack Gap |
|----------|-----------|--------|-----------|
| Desktop (lg+) | 384px (max-w-sm) | `right-4` | 152px |
| Tablet (md) | 384px | `right-4` | 152px |
| Mobile (sm) | 320px | `right-2` | 140px |

---

## ⚡ PERFORMANCE

### **Optimalizace:**
- ✅ **Lazy rendering**: Achievement se renderuje jen když je aktivní
- ✅ **Auto-cleanup**: Po 2.5s se odstraní z DOM
- ✅ **Throttled queue**: Max 1 achievement najednou
- ✅ **CSS animations**: Hardware accelerated (transform, opacity)

### **Memory:**
- localStorage: ~100 bytes per achievement
- Queue: Max 10 achievementů (fallback cleanup)
- Supabase: Incremental (jen nové)

---

## 🎭 ANIMACE (Framer Motion alternative)

Místo Framer Motion používáme **CSS animations**:

```css
/* Slide-in z pravé strany */
transform: translateX(400px) scale(0.8);
opacity: 0;

/* → */

transform: translateX(0) scale(1);
opacity: 1;
transition: all 500ms ease-out;
```

### **Stagger fade-in elementy:**
```css
.element-1 { animation: fadeIn 0.5s 0.2s ease-out forwards; }
.element-2 { animation: fadeIn 0.5s 0.3s ease-out forwards; }
.element-3 { animation: fadeIn 0.5s 0.4s ease-out forwards; }
```

---

## 🔒 EDGE CASES

### **1. Duplicate triggering**
```javascript
// Ochrana v triggerAchievement
if (unlockedAchievements.has(achievementId)) {
  console.log('Already unlocked');
  return; // Nepřidá se do fronty
}
```

### **2. Race condition (Supabase)**
```javascript
// Ignoruj duplicate key error
if (error.code === '23505') {
  console.log('Already in DB (race condition)');
}
```

### **3. Stránka refresh v průběhu zobrazení**
```javascript
// Při mount zkontroluj frontu v localStorage
useEffect(() => {
  const savedQueue = localStorage.getItem(`achievement_queue_${userId}`);
  if (savedQueue) {
    setAchievementQueue(JSON.parse(savedQueue));
  }
}, [userId]);
```

---

## ✅ SUMMARY

**Desktop achievement systém:**
- 📍 Vpravo nahoře, vertical stack
- ⏱️ Auto-close po 2.5s
- 🔄 Fronta pro postupné zobrazení
- 💾 Persistence v localStorage + Supabase
- 🎨 Kategorizované barvy
- ⚡ Optimalizované CSS animace
- 🐛 Console logs pro debugging

**Ready pro testování!** 🎉
