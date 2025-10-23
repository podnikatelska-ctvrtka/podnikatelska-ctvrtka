# 🔧 ACHIEVEMENT DEBUG - RYCHLÝ START

## ❓ PROBLÉM: "Vidím achievementy v UI, ale v Supabase nic není"

## ✅ CO JSEM UDĚLAL:

### **1. ✅ Přidal JASNÉ debug logy**

Všechny tyto funkce teď **logují do konzole**:

#### **A) Auto-scan při načtení dashboardu** (`SimpleDashboard.tsx`)
```
🔍 AUTO-SCAN STARTED for userId: abc-123
📊 Currently unlocked achievements: 18
📋 AUTO-SCAN COMPLETE: Checked 18 achievements, found 0 new
ℹ️ No new achievements to unlock (všechny už máš odemčené)
```

#### **B) scanAndUnlockMissedAchievements()** (`achievements.ts`)
```
🔍 [SCAN] Starting achievement scan for user: abc-123
🔍 [SCAN] Currently unlocked achievements: ['first-lesson', 'module-1-complete', ...]
🔍 [SCAN] Canvas data loaded: 9 sections
🔍 [SCAN] Completed lessons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
🔍 [SCAN] FINISHED - Total checked: 18 | Newly unlocked: 2
🎉 [SCAN] New achievements: ['profit-calculated', 'all-sections-filled']
```

#### **C) Supabase INSERT logy**
```
✅ Successfully saved achievement "profit-calculated" to Supabase
✅ Successfully saved achievement "all-sections-filled" to Supabase
```

NEBO:
```
❌ SUPABASE ERROR - Failed to save achievement "first-lesson" for user abc-123:
Error details: {
  "code": "42501",
  "message": "new row violates row-level security policy for table \"user_achievements\""
}
```

---

## 🎯 JAK DEBUGOVAT:

### **KROK 1: Otevři konzoli (F12)**

### **KROK 2: Otevři dashboard**
- Otevři `#course-v3` → Dashboard
- Auto-scan se spustí automaticky (jednou per session)

### **KROK 3: Zkontroluj konzoli**

**Měl bys vidět:**
```
🔍 AUTO-SCAN STARTED for userId: ...
🔍 [SCAN] Starting achievement scan for user: ...
🔍 [SCAN] Currently unlocked achievements: [...]
🔍 [SCAN] Canvas data loaded: X sections
🔍 [SCAN] Completed lessons: [...]
```

**Pokud NIC nevidíš:**
- ❌ Auto-scan se **nespustil**
- ❌ Možná máš `sessionStorage` nastavený → refreshni stránku CTRL+F5
- ❌ Možná nejsi přihlášený → zkontroluj `userId`

### **KROK 4: Manuální test - tlačítko**

V sekci "🏆 Úspěchy" je tlačítko:
```
🔄 Zkontrolovat missované achievementy
```

**Klikni na něj:**
- Toast: "🔍 Kontroluji missované achievementy..."
- V konzoli uvidíš **všechny logy**
- Toast: "🎉 Odemkl jsi X nových achievementů!" NEBO "✅ Všechny achievementy jsou odemčené!"

---

## 🔍 MOŽNÉ PROBLÉMY:

### **A) Auto-scan se nespustil**

**Důvod:** `sessionStorage.getItem(sessionKey)` je `'true'` (už byl scan v této session)

**Fix:** 
```javascript
// V konzoli spusť:
sessionStorage.clear();
location.reload();
```

### **B) Scan běží, ale žádné nové achievementy**

**Očekávané chování!** 

To znamená:
- ✅ Všechny achievementy které **máš splněné** jsou už **odemčené**
- ✅ Zbývající achievementy ještě **nemáš splněné**

**Zkontroluj:**
```
ℹ️ No new achievements to unlock (všechny už máš odemčené)
```

### **C) Scan našel nové achievementy, ale SUPABASE ERROR**

**Příklad:**
```
❌ SUPABASE ERROR - Failed to save achievement "first-lesson" for user abc-123:
Error details: {
  "code": "42501",
  "message": "new row violates row-level security policy"
}
```

**Fix:** Zkontroluj RLS policies v Supabase (viz `DEBUG_ACHIEVEMENTS.md`)

### **D) Achievementy se ukládají, ale v Supabase nic není**

**Příklad:**
```
✅ Successfully saved achievement "first-lesson" to Supabase
```
Ale v Supabase je prázdná tabulka.

**Možné důvody:**
1. **Špatný user ID** - používáš jiný účet než si myslíš
2. **RLS Policy blokuje SELECT** - nevidíš vlastní data
3. **Špatný název sloupce** - data jsou ve sloupcích které neočekáváš

**Fix:**
```javascript
// V konzoli:
const { data: { user } } = await supabase.auth.getUser();
console.log('Current user:', user.id);

const { data } = await supabase
  .from('user_achievements')
  .select('*')
  .eq('user_id', user.id);

console.log('My achievements:', data);
```

---

## ✅ CO DĚLAT TEĎ:

### **1. Otevři dashboard + konzoli**
### **2. Klikni na "🔄 Zkontrolovat missované achievementy"**
### **3. Zkopíruj všechny logy z konzole**
### **4. Pošli mi je!**

---

## 🚀 DEPLOYMENT:

Všechny debug logy **zůstávají v produkci** (používají `console.log`).

Nepůjdou do Sentry error reportů, ale pokud user nahlásí bug s achievementy, můžeš mu říct:
1. Otevři konzoli (F12)
2. Klikni na tlačítko "🔄 Zkontrolovat missované achievementy"
3. Pošli mi screenshot konzole

A uvidíš přesně co se stalo! 🎯

---

**TIP:** Pokud chceš vidět **aktuální stav** achievementů v Supabase:
```sql
SELECT * FROM public.user_achievements 
WHERE user_id = 'tvůj-user-id'
ORDER BY unlocked_at DESC;
```
