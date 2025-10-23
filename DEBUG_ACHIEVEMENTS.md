# 🔍 DEBUG ACHIEVEMENTS - SUPABASE SYNC

## ❌ PROBLÉM: Achievementy se neukládají do Supabase

**Symptom:** Vidíš achievementy v UI, ale v Supabase tabulce nic není.

## 🎯 ŘEŠENÍ: Debug logging

Přidal jsem **detailní error logging** do achievements.ts:

### **1. scanAndUnlockMissedAchievements()**
- ✅ Loguje každý úspěšný INSERT do Supabase
- ❌ Loguje každý failed INSERT s detailním errorem

### **2. unlockAchievement()**
- ✅ Loguje každý úspěšný INSERT do Supabase
- ❌ Loguje každý failed INSERT s detailním errorem

## 🔧 JAK DEBUGOVAT:

### **1. Otevři konzoli (F12)**

### **2. Refreshni dashboard**
Auto-scan se spustí a uvidíš:
```
✅ Successfully saved achievement "first-lesson" to Supabase
✅ Successfully saved achievement "module-1-complete" to Supabase
```

NEBO:
```
❌ SUPABASE ERROR - Failed to save achievement "first-lesson" for user abc123:
Error details: {
  "code": "42501",
  "message": "new row violates row-level security policy for table \"user_achievements\"",
  ...
}
```

### **3. Zkontroluj možné errory:**

#### **A) RLS Policy Error (42501)**
```json
{
  "code": "42501",
  "message": "new row violates row-level security policy"
}
```

**FIX:** Zkontroluj RLS policies v Supabase:
```sql
-- Měly by existovat tyto policies:
CREATE POLICY "Users can read their own achievements"
  ON public.user_achievements
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements"
  ON public.user_achievements
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

#### **B) Column Name Error (42703)**
```json
{
  "code": "42703",
  "message": "column \"achievement_type\" does not exist"
}
```

**FIX:** Musíš přejmenovat sloupec v Supabase:
```sql
ALTER TABLE public.user_achievements 
  RENAME COLUMN achievement_id TO achievement_type;
```

#### **C) User ID is "guest" (Not authenticated)**
```
❌ Failed to save achievement "first-lesson" for user guest:
```

**FIX:** User není přihlášený! Musí se přihlásit do kurzu.

#### **D) UUID Format Error**
```json
{
  "code": "22P02",
  "message": "invalid input syntax for type uuid"
}
```

**FIX:** `userId` není validní UUID. Zkontroluj že používáš správný user ID.

## 🧪 MANUAL TEST:

Otevři konzoli a spusť:

```javascript
// 1. Get current user
const { data: { user } } = await supabase.auth.getUser();
console.log('User ID:', user.id);

// 2. Try to insert achievement manually
const { data, error } = await supabase
  .from('user_achievements')
  .insert({
    user_id: user.id,
    achievement_type: 'test-achievement'
  });

console.log('Result:', data);
console.log('Error:', error);

// 3. Check if it was saved
const { data: achievements } = await supabase
  .from('user_achievements')
  .select('*')
  .eq('user_id', user.id);

console.log('All achievements:', achievements);
```

## 🔍 CO KONTROLOVAT V SUPABASE:

### **1. Table Structure**
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'user_achievements';
```

Mělo by vrátit:
- `id` (uuid)
- `user_id` (uuid)
- `achievement_type` (text)  ← DŮLEŽITÉ!
- `unlocked_at` (timestamptz)

### **2. RLS Policies**
```sql
SELECT * FROM pg_policies 
WHERE tablename = 'user_achievements';
```

Měly by existovat:
- `Users can read their own achievements` (SELECT)
- `Users can insert their own achievements` (INSERT)

### **3. Current Achievements**
```sql
SELECT * FROM public.user_achievements 
ORDER BY unlocked_at DESC;
```

Pokud je prázdné = achievementy se nezapisují!

## ✅ EXPECTED OUTPUT (když funguje):

```
🔄 BusinessActionPlan: Loading data for userId: 12345678-1234-1234-1234-123456789abc
✅ Successfully saved achievement "first-lesson" to Supabase
✅ Successfully saved achievement "module-1-complete" to Supabase
✅ Successfully saved achievement "validator-used" to Supabase
✅ Auto-scan: Odemkl jsem 3 missovaných achievementů silently.
```

## 🚨 NEXT STEPS:

1. ✅ Refreshni dashboard a zkontroluj konzoli
2. ✅ Zkopíruj všechny error messages
3. ✅ Pošli mi je a opravíme to!

---

**TIP:** Pokud vidíš `✅ Successfully saved` ale v Supabase nic není, může být problém s RLS policies nebo jsi přihlášený pod jiným účtem než si myslíš. Zkontroluj `user.id` v konzoli!
