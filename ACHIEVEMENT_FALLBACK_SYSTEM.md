# 🔄 Achievement Fallback System

**Datum:** 2025-01-23  
**Status:** ✅ IMPLEMENTOVÁNO

---

## 🎯 PROBLÉM

Uživatelé mohli zůstat "stucked" na achievementech:

- ❌ Achievement se netriggeroval v reálném čase (např. když user opustil stránku před save)
- ❌ Někdy se achievement netriggeroval kvůli timing issue
- ❌ User musel achievements "dostat" přesně ve správný moment
- ❌ Žádný způsob jak "opravit" missované achievementy

---

## ✅ ŘEŠENÍ: Auto-scan Fallback

### **2 způsoby jak odemknout missované achievementy:**

### **1️⃣ AUTO-SCAN při načtení Dashboardu**

```typescript
// components/SimpleDashboard.tsx

useEffect(() => {
  // Auto-scan in background (jednou za session)
  (async () => {
    const { newlyUnlocked } = await scanAndUnlockMissedAchievements(
      userId, 
      unlockedAchievements
    );
    
    if (newlyUnlocked.length > 0) {
      toast.success(`🎉 Našel jsem ${newlyUnlocked.length} missovaných achievementů!`);
    }
  })();
}, [userId]);
```

**Kdy se spustí:**
- ✅ Při prvním otevření Dashboardu
- ✅ Pouze **jednou za session** (uloženo v sessionStorage)
- ✅ Na pozadí - neblokuje UI

### **2️⃣ MANUÁLNÍ RE-SCAN tlačítko**

```tsx
<Button onClick={handleRescanAchievements}>
  <RefreshCw className="w-4 h-4" />
  🔄 Zkontrolovat missované achievementy
</Button>
```

**Kdy se zobrazí:**
- ✅ Když user **NEMÁ** všechny achievementy
- ✅ V sekci Achievements na Dashboardu
- ✅ Zobrazí loading state při scannování

---

## 🧠 JAK TO FUNGUJE

### **scanAndUnlockMissedAchievements()**

```typescript
// lib/achievements.ts

export async function scanAndUnlockMissedAchievements(
  userId: string,
  unlockedAchievements: Set<string>
): Promise<{ newlyUnlocked: string[], totalChecked: number }>
```

**Krok za krokem:**

1. **Načte data z databáze:**
   ```sql
   SELECT * FROM user_canvas_data WHERE user_id = ?
   SELECT * FROM user_progress WHERE user_id = ?
   ```

2. **Projde VŠECHNY achievementy:**
   ```typescript
   for (const achievement of ACHIEVEMENTS) {
     // Pokud už je odemknutý → skip
     if (unlockedAchievements.has(achievement.id)) continue;
     
     // Zkontroluj podmínky
     if (shouldUnlock) {
       await supabase.from('user_achievements').insert(...);
       newlyUnlocked.push(achievement.id);
     }
   }
   ```

3. **Vrátí výsledky:**
   ```typescript
   return { 
     newlyUnlocked: ['first-segment', 'profit-calculated'], 
     totalChecked: 20 
   };
   ```

---

## 📊 KONTROLOVANÉ ACHIEVEMENTY

### **✅ IMPLEMENTOVÁNO:**

| Achievement ID | Podmínka | Data source |
|----------------|----------|-------------|
| `first-segment` | ≥1 segment v BMC | `user_canvas_data.segments` |
| `first-value` | ≥1 hodnota v BMC | `user_canvas_data.value` |
| `all-sections-filled` | Všech 9 sekcí BMC vyplněno | `user_canvas_data.*` |
| `validator-used` | Canvas data existují | `user_canvas_data.*` |
| `profit-calculated` | Revenue + Costs vyplněny | `user_canvas_data.revenue/costs` |
| `profitable-business` | Revenue > Costs | Calculated from `user_canvas_data` |
| `module-1-complete` | Lekce 1-9 dokončeny | `user_progress` |
| `module-2-complete` | Lekce 10-13 dokončeny | `user_progress` |
| `module-3-complete` | Lekce 14-16 dokončeny | `user_progress` |
| `customer-profile-complete` | VPC Jobs+Pains+Gains | `user_canvas_data.vpc_customer_profile` |
| `value-map-complete` | VPC ≥1 produkt | `user_canvas_data.vpc_value_map` |
| `master-of-tools` | Canvas + Revenue + Costs + VPC | Combined check |
| `ultimate-master` | Všechny ostatní odemklé | Recursive check |

### **⏸️ ZATÍM NESKIPOVANÉ:**

| Achievement ID | Důvod | Workaround |
|----------------|-------|------------|
| `fit-70-percent` | Vyžaduje real-time FIT calc | Trigger při FIT validaci |
| `product-fit-master` | Vyžaduje real-time FIT calc | Trigger při FIT validaci |
| `fit-90-percent` | Vyžaduje real-time FIT calc | Trigger při FIT validaci |
| `action-plan-unlocked` | Vyžaduje separátní table | Trigger při otevření plánu |
| `first-action-completed` | Vyžaduje separátní table | Trigger při dokončení akce |
| `action-streak-3` | Vyžaduje separátní table | Trigger při dokončení 3 akcí |
| `all-actions-completed` | Vyžaduje separátní table | Trigger při dokončení všech |

**→ Tyto achievementy se stále triggerují v reálném čase!**

---

## 🧪 TESTOVÁNÍ

### **Test 1: Auto-scan při načtení**

```javascript
// 1. Přihlas se do kurzu
// 2. Otevři DevTools → Console
// 3. Jdi na Dashboard

// → Měl bys vidět:
console.log('🔍 Auto-scanning achievements...');

// Pokud najde něco:
toast.success('🎉 Našel jsem 2 missovaných achievementů!');
```

### **Test 2: Manuální re-scan**

```javascript
// 1. Jdi na Dashboard
// 2. Sekce "🏆 Úspěchy"
// 3. Klikni "🔄 Zkontrolovat missované achievementy"

// → Měl bys vidět:
// ✅ Loading state (button disabled, spinner)
// ✅ Toast: "🔍 Kontroluji missované achievementy..."
// ✅ Po dokončení:
//    - Pokud našlo: "🎉 Odemkl jsi X nových achievementů!"
//    - Pokud nenašlo: "✅ Všechny achievementy jsou odemčené!"
```

### **Test 3: Session persistence**

```javascript
// 1. Otevři Dashboard (auto-scan běží)
// 2. Refresh stránku (F5)
// 3. Zkontroluj sessionStorage:

sessionStorage.getItem('achievement_scan_YOUR_USER_ID');
// → Mělo by být 'true'

// → Auto-scan se NESPUSTÍ podruhé (= dobrá performance!)
```

---

## 🔧 TROUBLESHOOTING

### **Problem 1: Auto-scan se nespustí**

**Možné příčiny:**
1. ❌ User má všechny achievementy → auto-scan se přeskočí
2. ❌ SessionStorage má záznam → scan už proběhl v této session
3. ❌ userId není dostupný

**Řešení:**
```javascript
// Vymaž sessionStorage a reload
sessionStorage.clear();
window.location.reload();
```

---

### **Problem 2: Re-scan button nenašel achievementy**

**Možné příčiny:**
1. ❌ Achievementy JIŽ JSOU odemklé (zkontroluj DB)
2. ❌ Data v databázi chybí (canvas není vyplněný)
3. ❌ Achievement vyžaduje speciální podmínku (např. FIT score)

**Řešení:**
```sql
-- Zkontroluj co user má v databázi:
SELECT * FROM user_canvas_data WHERE user_id = 'YOUR_ID';
SELECT * FROM user_progress WHERE user_id = 'YOUR_ID';
SELECT * FROM user_achievements WHERE user_id = 'YOUR_ID';
```

---

### **Problem 3: Chci resetovat achievementy pro test**

**Řešení:**
```sql
-- Vymaž všechny achievementy:
DELETE FROM user_achievements WHERE user_id = 'YOUR_ID';

-- Pak reload Dashboard → auto-scan najde všechny znovu!
```

---

## 📋 CHECKLIST PŘED SPUŠTĚNÍM

- [x] scanAndUnlockMissedAchievements() implementována
- [x] Auto-scan při mount Dashboardu
- [x] Session persistence (jednou za session)
- [x] Manuální re-scan button
- [x] Loading state při scannování
- [x] Toast notifikace
- [x] Error handling
- [x] Dokumentace

---

## 🚀 DALŠÍ VYLEPŠENÍ (BUDOUCNOST)

1. **Progress bar při scannování**
   - Zobrazit kolik achievementů bylo zkontrolováno
   - Real-time progress: "Zkontrolováno 5/20..."

2. **Detailed report**
   - Zobrazit KTERÉ achievementy byly odemčeny
   - Link na každý achievement

3. **Background worker**
   - Spustit scan v Web Worker
   - Neblokuje main thread

4. **Smart scan**
   - Scan pouze achievementy které user MŮŽE mít
   - Přeskočit achievementy které vyžadují další data

---

**Status:** ✅ HOTOVO  
**Testováno:** ⏸️ TODO (test na real user)  
**Vytvořeno:** 2025-01-23  
**Autor:** AI Assistant
