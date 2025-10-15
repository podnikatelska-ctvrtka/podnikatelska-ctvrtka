# 🚨 EMERGENCY FIX - DVA PROBLÉMY!

## PROBLÉM 1: RLS BLOKUJE VŠE (všechny dotazy = 400)
## PROBLÉM 2: MOTION/REACT CRASHUJE KOMPONENTU

---

## ✅ ŘEŠENÍ:

### KROK 1: VYPNI RLS V SUPABASE

**Supabase Dashboard → SQL Editor → SPUSŤ:**

```sql
ALTER TABLE business_canvas_sections DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress DISABLE ROW LEVEL SECURITY;  
ALTER TABLE value_proposition_canvas DISABLE ROW LEVEL SECURITY;

SELECT '✅ RLS vypnuto!' as status;
```

### KROK 2: REFRESH APP

```bash
# Hard refresh
Ctrl + Shift + R

# Nebo restart dev serveru
npm run dev
```

### KROK 3: ZKUS URL

```
http://localhost:5173/course-v3?token=1760282655908-tmwp70tx1n-c7ks5utz54d
```

**NEBO bez tokenu:**

```
http://localhost:5173/course-v3?dev=true
```

---

## 🔍 CO SE STALO?

1. **RLS policies blokují přístup** - i když jsme je přidali, Supabase vrací 400
2. **Motion animace crashuje** kvůli null hodnotám (asi když se data nenačtou)

---

## 💡 POKUD TO NEPOMŮŽE:

**Pošli mi výstup z SQL:**

```sql
-- Zkontroluj RLS status
SELECT 
  tablename,
  CASE WHEN rowsecurity THEN 'ENABLED ❌' ELSE 'DISABLED ✅' END as status
FROM pg_tables 
WHERE schemaname = 'public'
AND tablename IN ('business_canvas_sections', 'user_progress', 'value_proposition_canvas');

-- Zkontroluj policies
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename IN ('business_canvas_sections', 'user_progress', 'value_proposition_canvas');
```

---

**PO VYPNUTÍ RLS BY TO MĚLO FUNGOVAT!** 🎯
