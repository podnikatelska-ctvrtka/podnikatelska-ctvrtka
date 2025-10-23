# 🔄 ACHIEVEMENT FALLBACK SYSTÉM - JAK TO FUNGUJE

## 🎯 SCÉNÁŘ

### **Normální flow (90% případů):**
1. User dokončí lekci → achievement se odemkne → toast vyskočí ✅
2. User vyplní canvas → achievement se odemkne → toast vyskočí ✅
3. User dosáhne FIT score 80% → achievement se odemkne → toast vyskočí ✅

### **Problémový flow (10% případů):**
1. User dokončí lekci → **network fail** → achievement se **NEULOŽÍ** ❌
2. User vyplní canvas → **toast nevyskočí** (bug, close tab rychle, atd.) ❌
3. User má splněno ale **na dashboardu to nevidí** → **MATOUCÍ!** ❌

## ✅ ŘEŠENÍ: AUTOMATICKÝ FALLBACK

### **Jak to funguje:**

```typescript
// 1️⃣ Při každém načtení dashboardu se TIŠE spustí scan
useEffect(() => {
  // Auto-scan in background - SILENT (no toast)
  const { newlyUnlocked } = await scanAndUnlockMissedAchievements(userId, unlockedAchievements);
  
  if (newlyUnlocked.length > 0) {
    // ✅ Reload achievements FROM SUPABASE
    const updated = await loadUnlockedAchievementsFromDB(userId);
    setUnlockedAchievements(updated);
    
    // ✅ SILENT - no toast, only console log
    console.log(`✅ Auto-scan: Odemkl jsem ${newlyUnlocked.length} missovaných achievementů.`);
  }
}, [userId]);
```

### **Co scan dělá:**

1. **Projde VŠECHNY achievementy** (všech 18 z ACHIEVEMENTS array)
2. **Zkontroluje podmínky:**
   - ✅ Dokončené lekce (user_progress tabulka)
   - ✅ Vyplněný canvas (user_canvas_data tabulka)
   - ✅ FIT score (product data z canvasu)
   - ✅ Value Proposition Canvas data
   - ✅ Akční plán unlock
   - ✅ Všechny nástroje použity
   
3. **Odemkne co CHYBÍ:**
   ```typescript
   if (shouldUnlock && !unlockedAchievements.has(achievement.id)) {
     // ✅ Save to localStorage
     // ✅ Save to Supabase
     // ✅ Add to newlyUnlocked array
     newlyUnlocked.push(achievement.id);
   }
   ```

4. **Vrátí výsledek:**
   ```typescript
   return { 
     newlyUnlocked: ['module-1-complete', 'fit-70-percent'], 
     totalChecked: 18 
   };
   ```

## 🎯 VÝSLEDEK

### **User perspective:**
- ✅ Otevře dashboard
- ✅ Vidí správný počet achievementů (včetně těch co "missoval")
- ✅ Žádné matoucí "nesplnil jsi X" když to má hotové
- ✅ **Transparentní a správné!**

### **Developer perspective:**
- ✅ Auto-scan se spustí **jednou per session** (sessionStorage)
- ✅ **SILENT** - žádné toast notifikace (aby nebyl spam)
- ✅ Console log pro debugging: `✅ Auto-scan: Odemkl jsem 2 missovaných achievementů.`
- ✅ Data se VŽDY ukládají do Supabase (ne jen localStorage)

## 🔧 KDE JE KÓD

### **1. Fallback funkce:**
`/lib/achievements.ts` → `scanAndUnlockMissedAchievements()` (řádek 203-390)

### **2. Automatické volání:**
`/components/SimpleDashboard.tsx` → useEffect hook (řádek 160-191)

### **3. Manuální trigger:**
SimpleDashboard má tlačítko "🔄 Skenovat missované" pro debugging

## 📊 SUPABASE STRUKTURA

### **Tabulka: `user_achievements`**
```sql
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  achievement_type TEXT NOT NULL,  -- ✅ SPRÁVNÝ NÁZEV!
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_type)
);
```

### **Proč `achievement_type`?**
- ✅ Už existuje v Supabase
- ✅ Není důvod to měnit
- ✅ Funguje perfektně

## 🚨 TESTING

### **Test 1: Missovaný module achievement**
1. Dokončím všechny lekce modulu 1 (1-9)
2. **NESMAŽU** achievement z localStorage
3. Refreshnu dashboard
4. ✅ Auto-scan by měl odemknout `module-1-complete`

### **Test 2: Missovaný FIT achievement**
1. Vyplním product s FIT score 85%
2. **NESMAŽU** achievement z localStorage  
3. Refreshnu dashboard
4. ✅ Auto-scan by měl odemknout `product-fit-master` (80%+)

### **Test 3: Manual re-scan**
1. Kliknu na "🔄 Skenovat missované" v dashboardu
2. ✅ Toast: "Zkontrolováno 18 achievementů, odemčeno X nových"

## ✅ ZÁVĚR

Systém je **KOMPLETNÍ** a **FUNKČNÍ**:

1. ✅ Achievementy se odemykají průběžně (primary flow)
2. ✅ Fallback scan zachytí missované (backup flow)
3. ✅ Uživatel nikdy nevidí matoucí "nesplnil" když to má hotové
4. ✅ Data jsou konzistentní mezi localStorage a Supabase
5. ✅ Auto-scan je SILENT (žádný spam)
6. ✅ Manual scan tlačítko pro debugging

**ŽÁDNÉ ZMĚNY NENÍ TŘEBA!** Systém funguje jak má. 🎉
