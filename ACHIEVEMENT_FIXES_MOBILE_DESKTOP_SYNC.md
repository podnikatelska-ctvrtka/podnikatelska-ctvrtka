# 🏆 ACHIEVEMENT FIXES - Mobile + Desktop Sync

**Datum:** 11. listopadu 2025  
**Problém:** Na mobilu se neodemkly achievementy "Mistr nástrojů", "Strategické plánování" a "Ultimate Master"

---

## 🐛 OPRAVENÉ BUGY

### 1️⃣ **MobileFitValidator.tsx** - Chyběl `action-plan-unlocked`

**Problém:**  
Desktop FitValidatorV2 triggeroval `action-plan-unlocked` při dokončení lekce 16, ale mobilní verze NE.

**Fix:**
```tsx
// Řádek ~1513
onAchievementUnlocked('action-plan-unlocked'); // ← NOVÉ
onAchievementUnlocked('module-3-complete');
```

---

### 2️⃣ **MobileBusinessActionPlan.tsx** - Chyběl `action-plan-unlocked` při načtení

**Problém:**  
Akční plán netriggeroval achievement když se poprvé načetla data.

**Fix:**
```tsx
// Po načtení FIT dat (~řádek 322)
if (!vpcWithFit?.fit_validation_data) {
  console.log('📱 No FIT data found');
  setLoading(false);
  return;
}

// 🏆 NOVÉ: Trigger achievement
if (onAchievementUnlocked) {
  onAchievementUnlocked('action-plan-unlocked');
}
```

---

### 3️⃣ **MobileCourseDashboard.tsx** - Chyběla kontrola `master-of-tools` a `ultimate-master`

**Problém:**  
Desktop měl manuální kontroly pro composite achievementy, mobil NE.

**Fix:**
```tsx
// Po auto-scanu (~řádek 150)

// 🛠️ MASTER OF TOOLS
const currentUnlocked = await loadUnlockedAchievementsFromDB(userId);
const hasValidator = currentUnlocked.has('validator-used');
const hasCalculator = currentUnlocked.has('profit-calculated');
const hasVPC = currentUnlocked.has('customer-profile-complete') || currentUnlocked.has('value-map-complete');
const hasActionPlan = currentUnlocked.has('action-plan-unlocked');

if (!currentUnlocked.has('master-of-tools') && hasValidator && hasCalculator && hasVPC && hasActionPlan) {
  await unlockAchievement(userId, 'master-of-tools');
}

// 💫 ULTIMATE MASTER
const finalUnlocked = await loadUnlockedAchievementsFromDB(userId);
const totalAchievements = 20;
const achievementsWithoutUltimate = 19;
const unlockedWithoutUltimate = Array.from(finalUnlocked).filter(id => id !== 'ultimate-master').length;

if (!finalUnlocked.has('ultimate-master') && unlockedWithoutUltimate >= achievementsWithoutUltimate) {
  await unlockAchievement(userId, 'ultimate-master');
}
```

---

### 4️⃣ **achievements.ts** - `master-of-tools` hledal VPC data ve špatné tabulce

**Problém:**  
Auto-scan hledal VPC data v `user_canvas_data` (kde NEJSOU), místo v `value_proposition_canvas`.

**Fix:**
```tsx
case 'master-of-tools': {
  const hasCanvas = canvasData?.some(d => d.content?.length > 0);
  const hasRevenue = canvasData?.find(d => d.section_key === 'revenue')?.content?.length > 0;
  const hasCosts = canvasData?.find(d => d.section_key === 'costs')?.content?.length > 0;
  
  // ✅ FIX: Check VPC data in value_proposition_canvas table
  const { data: vpcData } = await supabase
    .from('value_proposition_canvas')
    .select('id')
    .eq('user_id', userId)
    .limit(1);
  
  const hasVPC = vpcData && vpcData.length > 0;
  
  shouldUnlock = hasCanvas && hasRevenue && hasCosts && hasVPC;
  break;
}
```

---

## 📊 FLOW ACHIEVEMENTŮ

### **Strategické plánování** (`action-plan-unlocked`)

**Kdy se triggeruje:**
1. ✅ **FIT Validator dokončen** (Lekce 16) → Přímý trigger
2. ✅ **Akční plán otevřen** → Fallback trigger při načtení dat

**Desktop:** ✅ Funguje  
**Mobil:** ✅ OPRAVENO

---

### **Mistr nástrojů** (`master-of-tools`)

**Podmínky:**
- ✅ `validator-used` (Lekce 10)
- ✅ `profit-calculated` (Lekce 11)
- ✅ `customer-profile-complete` NEBO `value-map-complete` (Lekce 14/15)
- ✅ `action-plan-unlocked` (Lekce 16)

**Kdy se kontroluje:**
- ✅ **Dashboard auto-scan** (při otevření dashboardu)
- ✅ **Auto-scan fallback** (v `scanAndUnlockMissedAchievements`)

**Desktop:** ✅ Funguje  
**Mobil:** ✅ OPRAVENO

---

### **Ultimate Master** (`ultimate-master`)

**Podmínka:**
- ✅ Všech **19 ostatních achievementů** odemčeno

**Kdy se kontroluje:**
- ✅ **Dashboard auto-scan** (po kontrole `master-of-tools`)

**Desktop:** ✅ Funguje  
**Mobil:** ✅ OPRAVENO

---

## ✅ VÝSLEDEK

Po těchto opravách mají **mobil i desktop IDENTICKOU logiku** pro achievementy:

| Achievement | Desktop | Mobil |
|-------------|---------|-------|
| `action-plan-unlocked` | ✅ | ✅ OPRAVENO |
| `master-of-tools` | ✅ | ✅ OPRAVENO |
| `ultimate-master` | ✅ | ✅ OPRAVENO |

---

## 🔍 DEBUG

Pokud se achievement neodemkne, zkontroluj konzoli:

```
🔍 [SCAN] master-of-tools check: {
  hasCanvas: true,
  hasRevenue: true,
  hasCosts: true,
  hasVPC: true,
  vpcCount: 3
}
```

Pokud některá hodnota je `false`, user nemá dokončený daný nástroj!

---

## 📝 TESTOVÁNÍ

1. **Reset achievementů** (SQL):
   ```sql
   DELETE FROM user_achievements WHERE user_id = 'YOUR_USER_ID';
   ```

2. **Projdi kurz:**
   - Lekce 1-9 → `module-1-complete`
   - Lekce 10 → `validator-used`
   - Lekce 11 → `profit-calculated`
   - Lekce 14 → `customer-profile-complete`
   - Lekce 15 → `value-map-complete`
   - Lekce 16 → `action-plan-unlocked` + `module-3-complete`

3. **Otevři Dashboard:**
   - ✅ Měl by se odemknout `master-of-tools`
   - ✅ Pokud máš všech 19 achievementů, odemkne se `ultimate-master`

---

**Konec dokumentu** 🎯
