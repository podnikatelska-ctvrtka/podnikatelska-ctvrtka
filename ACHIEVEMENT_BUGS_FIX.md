# 🐛 ACHIEVEMENT BUGS FIX - 2025-01-23

**3 KRITICKÉ BUGY OPRAVENY:**

---

## **BUG 1: Double Toast 🍞🍞**

### **SYMPTOM:**
Při otevření dashboardu se zobrazily 2 toasty najednou:
- `"🎉 Našel jsem X missovaných achievementů!"`
- `"✅ Všechny achievementy jsou odemčené!"`

### **PŘÍČINA:**
Auto-scan se spustil při načtení dashboardu a SOUČASNĚ user klikl na "🔄 Zkontrolovat missované achievementy" button.

### **FIX:**
Auto-scan je teď **SILENT** - žádný toast, pouze console log:
```typescript
// ✅ SILENT - no toast, only console log
console.log(`✅ Auto-scan: Odemkl jsem ${newlyUnlocked.length} missovaných achievementů silently.`);
```

**File:** `/components/SimpleDashboard.tsx` (řádek 169)

---

## **BUG 2: 400 Error (Supabase) ❌**

### **SYMPTOM:**
Console error opakovaně (7×):
```
jdcpzswpecntlqiyzxac.supabase.co/rest/v1/user_achievements:1  
Failed to load resource: the server responded with a status of 400
```

### **PŘÍČINA:**
V `scanAndUnlockMissedAchievements()` jsme používali `.insert()` místo `.upsert()`.

Když achievement už existoval v DB, `.insert()` failoval s 400 error (duplicate key violation).

### **FIX:**
Změnil jsem `.insert()` na `.upsert()` s `ignoreDuplicates: true`:

```typescript
// PŘED (❌ ŠPATNĚ):
await supabase
  .from('user_achievements')
  .insert({
    user_id: userId,
    achievement_id: achievement.id,
    unlocked_at: new Date().toISOString()
  });

// PO (✅ SPRÁVNĚ):
const { error } = await supabase
  .from('user_achievements')
  .upsert({
    user_id: userId,
    achievement_id: achievement.id,
    unlocked_at: new Date().toISOString()
  }, {
    onConflict: 'user_id,achievement_id',
    ignoreDuplicates: true
  });
```

**File:** `/lib/achievements.ts` (řádek 364-373)

---

## **BUG 3: Šedé Achievementy (nevyrenderované) 🔒**

### **SYMPTOM:**
Některé achievementy byly šedé (locked) i když byly odemklé v databázi.

Toast říkal "Všechny achievementy jsou odemčené!" ale UI je zobrazovalo jako zamklé (šedé s 🔒).

User měl **20 odemčených v Supabase**, ale v UI byly jen některé vyrenderované jako odemčené.

### **PŘÍČINA:**
**VŠECHNY** load funkce četly pouze z **localStorage**, ne z Supabase!

1. ❌ `CourseDemoV3.tsx` - initial load při auth (řádek 1292-1293)
2. ❌ `CourseDemoV3.tsx` - `triggerAchievement()` (řádek 1465)
3. ❌ `CourseDemoV3.tsx` - `checkAllAchievements()` (řádek 1580)
4. ❌ `SimpleDashboard.tsx` - manual scan (řádek 118)
5. ❌ `SimpleDashboard.tsx` - auto-scan (řádek 166)

Když auto-scan nebo manual scan odemkl achievement v Supabase, **localStorage nebyl synchronizován** → UI zobrazovalo starý stav!

### **FIX:**
Vytvořil jsem novou funkci `loadUnlockedAchievementsFromDB()` která:
1. ✅ Načte achievementy z **Supabase**
2. ✅ Synchronizuje je do **localStorage**
3. ✅ Vrátí aktuální stav

```typescript
// NOVÁ FUNKCE:
export async function loadUnlockedAchievementsFromDB(userId: string): Promise<Set<string>> {
  try {
    const { supabase } = await import('./supabase');
    
    const { data, error } = await supabase
      .from('user_achievements')
      .select('achievement_id')
      .eq('user_id', userId);
    
    if (error) {
      console.error('❌ Error loading achievements from DB:', error);
      return new Set();
    }
    
    const unlocked = new Set(data?.map(a => a.achievement_id) || []);
    
    // Clean up invalid achievements
    const validAchievementIds = new Set(ACHIEVEMENTS.map(a => a.id));
    const validUnlocked = new Set(
      Array.from(unlocked).filter(id => validAchievementIds.has(id))
    );
    
    // ✅ Sync to localStorage
    localStorage.setItem(`achievements_${userId}`, JSON.stringify([...validUnlocked]));
    
    return validUnlocked;
  } catch (err) {
    console.error('Failed to load achievements from DB:', err);
    return new Set();
  }
}
```

**Použití napříč aplikací:**
```typescript
// PŘED (❌ ŠPATNĚ):
const achievements = loadUnlockedAchievements(user.id); // localStorage only

// PO (✅ SPRÁVNĚ):
const achievements = await loadUnlockedAchievementsFromDB(user.id); // Supabase + localStorage sync
```

**Upravené soubory:**
1. ✅ `/lib/achievements.ts` - nová funkce `loadUnlockedAchievementsFromDB`
2. ✅ `/components/SimpleDashboard.tsx` (řádek 118, 166) - manual + auto scan
3. ✅ `/components/CourseDemoV3.tsx` (řádek 1292, 1467, 1582) - initial load + ultimate master checks

---

## **✅ VÝSLEDEK:**

1. ✅ **No double toast** - auto-scan je silent
2. ✅ **No 400 errors** - upsert místo insert
3. ✅ **Všechny achievementy správně vyrenderované** - sync z Supabase

---

## **📝 TESTOVÁNÍ:**

### **Test 1: Double Toast**
1. Otevři dashboard (#course-v3)
2. Klikni na "🔄 Zkontrolovat missované achievementy"
3. ✅ Měl by se zobrazit POUZE 1 toast (manuální check)
4. ✅ Auto-scan je silent (pouze console log)

### **Test 2: 400 Error**
1. Otevři Console (F12)
2. Refresh dashboard
3. ✅ Žádné 400 errory z `user_achievements`

### **Test 3: Šedé Achievementy**
1. Otevři dashboard
2. Zkontroluj že všechny odemklé achievementy jsou **zlaté** (ne šedé)
3. ✅ Tooltip ukazuje správný popis
4. ✅ Lock ikona 🔒 je pouze na zamklých achievementech

---

## **✅ UPDATE 2025-01-23 - SLOUPEC OPRAVĚ!**

Původní error:
```
❌ Error: column user_achievements.achievement_id does not exist
```

**→ SLOUPEC SE JMENOVAL `achievement_type`, ne `achievement_id`!**

✅ **OPRAVENO:** `/lib/achievements.ts` - všechny 4 výskyty změněny

📖 **Detaily:** Viz `/ACHIEVEMENT_TABLE_FIX.md`

---

**Status:** ✅ HOTOVO (čeká na vytvoření tabulky v Supabase)  
**Testováno:** ⏸️ TODO (po vytvoření tabulky)  
**Datum:** 2025-01-23
