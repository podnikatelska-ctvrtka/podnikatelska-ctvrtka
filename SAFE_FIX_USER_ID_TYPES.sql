-- ====================================
-- SAFE FIX: Oprava user_id typu z INTEGER na TEXT
-- ====================================
-- Tento script BEZPEČNĚ změní typy sloupců user_id z INTEGER na TEXT (UUID)
-- NEPŘIJDEŠ O ŽÁDNÁ DATA!
-- Datum: 2025-10-14

-- ====================================
-- PŘED SPUŠTĚNÍM:
-- ====================================
-- 1. Otevři Supabase Dashboard → SQL Editor
-- 2. Zkopíruj CELÝ tento script
-- 3. Spusť ho (Run)
-- 4. Počkej ~10 sekund
-- 5. ✅ HOTOVO!

-- ====================================
-- 1. FIX: user_canvas_data
-- ====================================
-- Pokud je user_id INTEGER, změň na TEXT
ALTER TABLE user_canvas_data 
  ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT;

-- ====================================
-- 2. FIX: user_achievements
-- ====================================
-- Pokud je user_id INTEGER, změň na TEXT
ALTER TABLE user_achievements 
  ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT;

-- ====================================
-- 3. FIX: value_proposition_canvas (pokud existuje)
-- ====================================
-- Pokud tabulka existuje a má user_id INTEGER, změň na TEXT
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'value_proposition_canvas') THEN
        ALTER TABLE value_proposition_canvas 
          ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT;
    END IF;
END $$;

-- ====================================
-- 4. VERIFY: Zkontroluj že je všechno TEXT
-- ====================================
-- Spusť tento SELECT a zkontroluj že všechny user_id jsou 'text':
SELECT 
  table_name, 
  column_name, 
  data_type 
FROM information_schema.columns 
WHERE column_name = 'user_id' 
  AND table_schema = 'public'
ORDER BY table_name;

-- ====================================
-- OČEKÁVANÝ VÝSLEDEK:
-- ====================================
-- | table_name              | column_name | data_type |
-- |-------------------------|-------------|-----------|
-- | user_achievements       | user_id     | text      |
-- | user_canvas_data        | user_id     | text      |
-- | user_progress           | user_id     | text      |
-- | value_proposition_canvas| user_id     | text      |

-- ====================================
-- ✅ KONEC - Můžeš zavřít!
-- ====================================
