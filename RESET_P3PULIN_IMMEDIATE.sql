-- ⚡ OKAMŽITÝ RESET PRO p3pulin@seznam.cz
-- UUID: 2ac0d4c6-8556-4977-a74c-48b38c4e6d5d
-- 
-- Zkopíruj CELÝ tento soubor a spusť v Supabase SQL Editor!

-- ============================================
-- 1️⃣ SMAZAT VPC DATA
-- ============================================

DELETE FROM public.value_proposition_canvas 
WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';

-- Výsledek: Success (no rows returned)


-- ============================================
-- 2️⃣ SMAZAT ACHIEVEMENTS Z MODULU 2 A 3
-- ============================================

DELETE FROM public.user_achievements 
WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d'
AND achievement_type IN (
  'validator-used',
  'profit-calculated',
  'module-2-complete',
  'customer-profile-complete',
  'value-map-complete',
  'fit-70-percent',
  'product-fit-master',
  'fit-90-percent',
  'module-3-complete',
  'master-of-tools',
  'ultimate-master'
);

-- Výsledek: Success (no rows returned)


-- ============================================
-- 3️⃣ OVĚŘENÍ
-- ============================================

SELECT 
  'VPC data:' as tabulka,
  COUNT(*) as pocet_zaznamu
FROM public.value_proposition_canvas 
WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d'

UNION ALL

SELECT 
  'Achievements:' as tabulka,
  COUNT(*) as pocet_zaznamu
FROM public.user_achievements 
WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';

-- Mělo by vrátit:
-- VPC data: 0
-- Achievements: 4 nebo 5 (jen Modul 1)


-- ============================================
-- 4️⃣ ZOBRAZIT ZBYLÉ ACHIEVEMENTS
-- ============================================

SELECT 
  achievement_type,
  title,
  earned_at
FROM public.user_achievements 
WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d'
ORDER BY earned_at;

-- Měly by zůstat JEN achievementy z Modulu 1:
-- ✅ first-segment - První zákazník
-- ✅ first-value - Hodnota na stole
-- ✅ all-sections-filled - Kompletní model
-- ✅ module-1-complete - Modul 1 dokončen
-- ✅ profitable-business - Ziskový byznys (pokud máš ziskový model)


-- ============================================
-- ✅ HOTOVO!
-- ============================================
-- 
-- Po spuštění tohoto SQL:
-- 1. Refresh aplikaci (F5)
-- 2. Otevři Console (F12)
-- 3. Spusť: localStorage.clear(); location.reload();
-- 
-- Pak dokončíš lekci 13 a měl by se zobrazit achievement "Modul 2 dokončen"! 🎉
