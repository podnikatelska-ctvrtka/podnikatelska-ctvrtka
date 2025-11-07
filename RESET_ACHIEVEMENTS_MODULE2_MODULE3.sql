-- 🔄 RESET ACHIEVEMENTŮ PRO MODULY 2 A 3 (pro p3pulin@seznam.cz)
-- 
-- Tento script vymaže achievementy z Modulu 2 a 3 pro konkrétní účet.
-- Použij ho, když chceš otestovat achievementy pro Modul 2 a 3 znovu!
-- Nemusíš být přihlášený - script najde user_id podle emailu!
--
-- 📋 JAK POUŽÍT:
-- 1. Otevři Supabase Dashboard → SQL Editor
-- 2. Zkopíruj a spusť tento script
-- 3. Refresh aplikaci - Modul 1 zůstane hotový, Modul 2 a 3 resetovány! 🎯

-- ============================================
-- 1️⃣ SMAZAT ACHIEVEMENTY Z MODULU 2 A 3
-- ============================================

DO $$
DECLARE
  target_user_id UUID;
BEGIN
  -- Najdeme user_id podle emailu
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = 'p3pulin@seznam.cz';
  
  -- Pokud uživatel existuje, smažeme jeho achievementy z Modulu 2 a 3
  IF target_user_id IS NOT NULL THEN
    DELETE FROM public.user_achievements 
    WHERE user_id = target_user_id
    AND achievement_type IN (
      -- 🎯 MODUL 2 ACHIEVEMENTY
      'validator-used',
      'profit-calculated',
      'module-2-complete',
      
      -- 🎯 MODUL 3 ACHIEVEMENTY
      'customer-profile-complete',
      'value-map-complete',
      'fit-70-percent',
      'product-fit-master',
      'fit-90-percent',
      'module-3-complete',
      
      -- 🎯 SPECIAL ACHIEVEMENTY (které souvisí s pokročilými nástroji)
      'master-of-tools',
      'ultimate-master'
    );
    
    RAISE NOTICE 'Achievementy z Modulu 2 a 3 pro p3pulin@seznam.cz byly smazány!';
  ELSE
    RAISE NOTICE 'Uživatel p3pulin@seznam.cz nebyl nalezen!';
  END IF;
END $$;

-- ============================================
-- 2️⃣ OVĚŘENÍ
-- ============================================
-- Zkontroluj, které achievementy zůstaly (měly by být jen z Modulu 1):

SELECT 
  u.email,
  a.achievement_type as "Achievement",
  a.title as "Název",
  a.earned_at as "Odemčeno"
FROM auth.users u
LEFT JOIN public.user_achievements a ON a.user_id = u.id
WHERE u.email = 'p3pulin@seznam.cz'
ORDER BY a.earned_at ASC;

-- Měly by zůstat JEN:
-- ✅ first-segment (První zákazník)
-- ✅ first-value (Hodnota na stole)
-- ✅ all-sections-filled (Kompletní model)
-- ✅ module-1-complete (Modul 1 dokončen)
-- ✅ profitable-business (Ziskový byznys) - POKUD máš ziskový model

-- ============================================
-- ✅ HOTOVO!
-- ============================================
-- Achievements z Modulu 1 zůstaly, Modul 2 a 3 jsou čisté!
-- Teď otevři aplikaci, zmáčkni F12 (Console) a spusť:
--
-- localStorage.clear();
-- location.reload();
--
-- Můžeš teď dokončit Modul 2 a testovat, jestli se zobrazí achievement! 🚀
