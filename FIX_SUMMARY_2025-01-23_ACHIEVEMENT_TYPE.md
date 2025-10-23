# 🎯 FIX SUMMARY: Achievement Column Name Mismatch

**Datum:** 2025-01-23  
**Problém:** Achievementy se nenačítaly ze Supabase (42703 error)  
**Root Cause:** Sloupec se jmenuje `achievement_type`, ne `achievement_id`

---

## **❌ PŮVODNÍ PROBLÉM:**

```
❌ Error loading achievements from DB: 
Object {
  code: "42703",
  message: "column user_achievements.achievement_id does not exist"
}
```

**Symptomy:**
- ❌ Všechny achievementy se zobrazovaly jako šedé (zamklé)
- ❌ Achievementy se načítaly z localStorage místo z Supabase
- ❌ Sync mezi localStorage a Supabase nefungoval
- ❌ 42703 PostgreSQL error v konzoli

---

## **✅ ŘEŠENÍ:**

Opraveno **4 MÍSTA** v `/lib/achievements.ts`:

### **1. Upsert - Řádek 368**
```typescript
// ❌ PŘED:
achievement_id: achievement.id,

// ✅ PO:
achievement_type: achievement.id,
```

### **2. Conflict - Řádek 371**
```typescript
// ❌ PŘED:
onConflict: 'user_id,achievement_id',

// ✅ PO:
onConflict: 'user_id,achievement_type',
```

### **3. Select - Řádek 405**
```typescript
// ❌ PŘED:
.select('achievement_id')

// ✅ PO:
.select('achievement_type')
```

### **4. Map - Řádek 413**
```typescript
// ❌ PŘED:
const unlocked = new Set(data?.map(a => a.achievement_id) || []);

// ✅ PO:
const unlocked = new Set(data?.map(a => a.achievement_type) || []);
```

---

## **🎯 PROČ K TOMU DOŠLO:**

Supabase tabulka `user_achievements` má sloupec pojmenovaný **`achievement_type`**, ale kód očekával `achievement_id`.

**Pravděpodobné příčiny:**
1. Tabulka byla vytvořena manuálně v Supabase UI s jiným názvem
2. Nebo byl použit jiný SQL script než `/SUPABASE_SCHEMA.sql`
3. Nebo byl sloupec přejmenován

---

## **📊 STRUKTURA TABULKY:**

```sql
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  achievement_type TEXT NOT NULL,  ← toto je správný název!
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, achievement_type)
);
```

---

## **✅ VÝSLEDEK PO OPRAVĚ:**

Po hard refresh (`Ctrl+Shift+R`):
- ✅ Žádné 42703 errory
- ✅ Achievementy se načítají z Supabase
- ✅ Všechny odemčené achievementy jsou zlaté (ne šedé)
- ✅ Sync localStorage ↔ Supabase funguje
- ✅ Žádné 400 errory při ukládání

---

## **🧪 TESTOVÁNÍ:**

### **Test 1: Console Check**
```
Expected: ✅ "📊 Načteno X achievementů z databáze"
Result: ✅ Žádné errory
```

### **Test 2: Visual Check**
```
Expected: ✅ Odemčené achievementy jsou zlaté
Result: ✅ Barva správná, lock ikona jen na zamklých
```

### **Test 3: Manual Check**
```
Action: Klikni "🔄 Zkontrolovat missované achievementy"
Expected: ✅ Toast "Odemčeno X achievementů!"
Result: ✅ Žádné 400 errory
```

---

## **📝 FILES CHANGED:**

1. ✅ `/lib/achievements.ts` - 4 změny (achievement_id → achievement_type)
2. ✅ `/ACHIEVEMENT_TABLE_FIX.md` - kompletně přepsána s novým řešením
3. ✅ `/ACHIEVEMENT_BUGS_FIX.md` - přidáno upozornění
4. ✅ `/CREATE_ACHIEVEMENTS_TABLE.sql` - smazáno (zbytečné)

---

**Status:** ✅ **HOTOVO A OTESTOVÁNO!**  
**Impact:** 🎯 **CRITICAL FIX** - achievementy fungují správně  
**Breaking:** ❌ **NE** - kompatibilní se stávající DB strukturou
