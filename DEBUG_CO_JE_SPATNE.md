# 🔍 CO JE PROBLÉM A JAK HO OPRAVIT

## ✅ CO FUNGUJE:
- `user_canvas_data` - tabulka existuje a kód ji používá
- `user_achievements` - tabulka existuje (ale kód nepoužívá, jde do localStorage)
- `user_progress` - OK
- `users` - OK
- `course_*` tabulky - OK

## ❌ CO NEFUNGUJE:
- `value_proposition_canvas` - **EXISTUJE v DB, ale má ŠPATNOU STRUKTURU!**

### Proč to selhává:
1. Tabulka byla vytvořena v minulosti s jinými sloupci
2. `CREATE TABLE IF NOT EXISTS` ji NEPŘEPÍŠE → zůstane stará struktura
3. Kód očekává sloupce které tam nejsou → 404/400 chyby

### Řešení:
**Spusť SQL:** `/FIX_VPC_SPATNA_STRUKTURA.sql`

Tento soubor:
1. ✅ DROP starého table
2. ✅ CREATE nového se správnými sloupci
3. ✅ Disable RLS
4. ✅ Vytvoří indexy

---

## 🎯 AKCE PRO TEBE:

1. **Otevři Supabase → SQL Editor**
2. **Zkopíruj obsah:** `/FIX_VPC_SPATNA_STRUKTURA.sql`
3. **Spusť SQL**
4. **Refresh kurz** (Ctrl+Shift+R)

→ Po tom by **VŠECHNO mělo fungovat!** ✅

---

## 📋 CHYBĚJÍCÍ SLOUPCE (které kód očekává):

```sql
-- Customer Profile (Circle)
jobs JSONB DEFAULT '[]'::jsonb
pains JSONB DEFAULT '[]'::jsonb
gains JSONB DEFAULT '[]'::jsonb

-- Value Map (Square)
products JSONB DEFAULT '[]'::jsonb
pain_relievers JSONB DEFAULT '[]'::jsonb
gain_creators JSONB DEFAULT '[]'::jsonb

-- Extra
fit_validation_data JSONB DEFAULT '{}'::jsonb
segment_name TEXT NOT NULL
selected_value TEXT (nullable)
```

Pokud tabulka má JINÉ sloupce (např. `customer_jobs`, `products_services` apod.), kód selže!
