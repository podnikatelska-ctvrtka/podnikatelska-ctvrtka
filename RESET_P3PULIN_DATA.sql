-- 🔄 RESET DAT PRO p3pulin@seznam.cz
-- 
-- Tento script vymaže všechna data pro účet p3pulin@seznam.cz
-- Nemusíš být přihlášený - script najde user_id podle emailu!
--
-- 📋 JAK POUŽÍT:
-- 1. Otevři Supabase Dashboard → SQL Editor
-- 2. Zkopíruj a spusť CELÝ tento script
-- 3. Refresh aplikaci - kurz začne od začátku!

-- ============================================
-- 1️⃣ ZJISTIT USER_ID PRO p3pulin@seznam.cz
-- ============================================
-- Nejdřív se podíváme, co máme v databázi:

SELECT 
  id as "User ID",
  email as "Email",
  created_at as "Vytvořen",
  last_sign_in_at as "Poslední přihlášení"
FROM auth.users
WHERE email = 'p3pulin@seznam.cz';

-- ============================================
-- 2️⃣ SMAZAT VŠECHNA DATA PRO TOHOTO UŽIVATELE
-- ============================================

-- Najdeme user_id a použijeme ho pro DELETE
DO $$
DECLARE
  target_user_id UUID;
BEGIN
  -- Najdeme user_id podle emailu
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = 'p3pulin@seznam.cz';
  
  -- Pokud uživatel existuje, smažeme jeho data
  IF target_user_id IS NOT NULL THEN
    -- Smazat achievementy
    DELETE FROM public.user_achievements 
    WHERE user_id = target_user_id;
    
    -- Smazat progress
    DELETE FROM public.user_progress 
    WHERE user_id = target_user_id;
    
    -- Smazat canvas data
    DELETE FROM public.user_canvas_data 
    WHERE user_id = target_user_id;
    
    RAISE NOTICE 'Data pro p3pulin@seznam.cz byla úspěšně smazána!';
  ELSE
    RAISE NOTICE 'Uživatel p3pulin@seznam.cz nebyl nalezen!';
  END IF;
END $$;

-- ============================================
-- 3️⃣ OVĚŘENÍ - ZKONTROLOVAT ŽE DATA JSOU SMAZANÁ
-- ============================================

SELECT 
  u.email as "Email",
  (SELECT COUNT(*) FROM public.user_achievements WHERE user_id = u.id) as "Achievementy (0)",
  (SELECT COUNT(*) FROM public.user_progress WHERE user_id = u.id) as "Progress (0)",
  (SELECT COUNT(*) FROM public.user_canvas_data WHERE user_id = u.id) as "Canvas data (0)"
FROM auth.users u
WHERE u.email = 'p3pulin@seznam.cz';

-- Všechna čísla by měla být 0!

-- ============================================
-- ✅ HOTOVO!
-- ============================================
-- Data pro p3pulin@seznam.cz jsou smazaná! 
-- Uživatelský účet zůstává (email, heslo).
-- Refresh aplikaci a můžeš začít kurz znovu! 🎯
--
-- Ostatní uživatelé (pokud existují) nejsou dotčení.
