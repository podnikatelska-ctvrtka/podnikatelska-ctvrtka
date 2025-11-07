-- ⚡ SUPER CLEAN RESET - Pro p3pulin@seznam.cz
-- Zkopíruj CELÝ BLOK najednou a spusť!

-- ============================================
-- 1️⃣ NAJÍT TVOJE USER_ID
-- ============================================
-- Nejdřív zjistíme tvoje user_id:

SELECT id, email FROM auth.users WHERE email = 'p3pulin@seznam.cz';

-- Zkopíruj si user_id (to dlouhé UUID) a vlož ho níže místo TVOJE_USER_ID


-- ============================================
-- 2️⃣ SMAZAT VPC DATA
-- ============================================
-- Nahraď TVOJE_USER_ID skutečným UUID z kroku 1:

DELETE FROM public.value_proposition_canvas 
WHERE user_id = 'TVOJE_USER_ID';

-- Příklad:
-- DELETE FROM public.value_proposition_canvas 
-- WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';


-- ============================================
-- 3️⃣ SMAZAT ACHIEVEMENTS Z MODULU 2 A 3
-- ============================================
-- Nahraď TVOJE_USER_ID skutečným UUID z kroku 1:

DELETE FROM public.user_achievements 
WHERE user_id = 'TVOJE_USER_ID'
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


-- ============================================
-- 4️⃣ OVĚŘENÍ
-- ============================================
-- Zkontroluj, že data jsou smazaná:

SELECT COUNT(*) as "VPC záznamy" 
FROM public.value_proposition_canvas 
WHERE user_id = 'TVOJE_USER_ID';

SELECT achievement_type, title 
FROM public.user_achievements 
WHERE user_id = 'TVOJE_USER_ID'
ORDER BY earned_at;
