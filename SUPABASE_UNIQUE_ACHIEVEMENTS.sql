-- 🔒 PREVENT DUPLICATE ACHIEVEMENTS
-- Přidá unique constraint aby se nemohly ukládat duplicitní achievementy

-- 1. NEJPRVE SMAŽ EXISTUJÍCÍ DUPLICITY
DELETE FROM user_achievements
WHERE id NOT IN (
  SELECT MIN(id)
  FROM user_achievements
  GROUP BY user_id, achievement_type
);

-- 2. PŘIDEJ UNIQUE CONSTRAINT
-- ✅ Kombinace user_id + achievement_type MUSÍ být unikátní!
ALTER TABLE user_achievements
ADD CONSTRAINT unique_user_achievement 
UNIQUE (user_id, achievement_type);

-- ============================================
-- OVĚŘENÍ
-- ============================================

-- Zkontroluj že už nejsou duplicity
SELECT 
  user_id, 
  achievement_type, 
  COUNT(*) as count
FROM user_achievements
GROUP BY user_id, achievement_type
HAVING COUNT(*) > 1;

-- Mělo by vrátit 0 řádků!
