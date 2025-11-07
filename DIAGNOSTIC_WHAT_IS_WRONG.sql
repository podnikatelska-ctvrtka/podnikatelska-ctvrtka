-- 🔍 DIAGNOSTIKA - Co je špatně?
-- 
-- Tento script zjistí, proč se data nemažou.
-- Zkopíruj a spusť CELÝ script najednou!

-- ============================================
-- 1️⃣ ZJISTIT TVOJE USER_ID
-- ============================================

SELECT 
  '1. Tvoje user_id:' as krok,
  id as user_id,
  email
FROM auth.users 
WHERE email = 'p3pulin@seznam.cz';

-- ============================================
-- 2️⃣ ZJISTIT, KOMU PATŘÍ VPC DATA
-- ============================================

SELECT 
  '2. VPC data - komu patří?' as krok,
  user_id,
  COUNT(*) as pocet_zaznamu
FROM public.value_proposition_canvas
GROUP BY user_id
ORDER BY pocet_zaznamu DESC;

-- ============================================
-- 3️⃣ POROVNAT USER_ID TYPY
-- ============================================

SELECT 
  '3. Porovnání user_id typů:' as krok,
  (SELECT id::text FROM auth.users WHERE email = 'p3pulin@seznam.cz') as auth_users_id_as_text,
  (SELECT user_id FROM public.value_proposition_canvas LIMIT 1) as vpc_user_id
FROM (SELECT 1) as dummy;

-- ============================================
-- 4️⃣ ZJISTIT, ZDA JSOU STEJNÉ
-- ============================================

SELECT 
  '4. Jsou stejné?' as krok,
  CASE 
    WHEN (SELECT id::text FROM auth.users WHERE email = 'p3pulin@seznam.cz') = 
         (SELECT user_id FROM public.value_proposition_canvas LIMIT 1)
    THEN '✅ ANO - user_id se shoduje!'
    ELSE '❌ NE - user_id se NESHODUJE! To je problém!'
  END as vysledek;

-- ============================================
-- 5️⃣ ZKONTROLOVAT RLS POLÍČKA
-- ============================================

SELECT 
  '5. RLS políčka na value_proposition_canvas:' as krok,
  policyname as policy_name,
  cmd as command,
  qual as using_expression
FROM pg_policies 
WHERE tablename = 'value_proposition_canvas';

-- ============================================
-- 6️⃣ ZJISTIT, ZDA FUNGUJE auth.uid()
-- ============================================

SELECT 
  '6. auth.uid() funguje?' as krok,
  auth.uid() as auth_uid,
  CASE 
    WHEN auth.uid() IS NULL 
    THEN '❌ NE - nejsi přihlášený v SQL Editoru!'
    ELSE '✅ ANO - jsi přihlášený'
  END as status;

-- ============================================
-- ✅ VÝSLEDEK
-- ============================================

-- Po spuštění tohoto scriptu uvidíš:
-- 
-- 1. Tvoje skutečné user_id z auth.users
-- 2. Komu patří VPC data (mělo by být stejné jako #1)
-- 3. Porovnání user_id (měly by být stejné)
-- 4. Jestli se shodují
-- 5. Jaké RLS políčka jsou na tabulce
-- 6. Jestli funguje auth.uid()
-- 
-- Když uvidíš výsledky, pošli screenshot a opravíme to! 🚀
