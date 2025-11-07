-- ⚡ AUTOMATICKÝ RESET - Nemusíš kopírovat user_id!
-- Zkopíruj VŠECHNO níže a spusť najednou!

DO $$
DECLARE
  my_user_id UUID;
  my_user_id_text TEXT;
BEGIN
  -- 1️⃣ Najít user_id pro p3pulin@seznam.cz
  SELECT id INTO my_user_id
  FROM auth.users
  WHERE email = 'p3pulin@seznam.cz';
  
  -- Převést na text pro VPC tabulku
  my_user_id_text := my_user_id::text;
  
  IF my_user_id IS NOT NULL THEN
    RAISE NOTICE '✅ Našel jsem uživatele: % (ID: %)', 'p3pulin@seznam.cz', my_user_id;
    
    -- 2️⃣ Smazat VPC data
    DELETE FROM public.value_proposition_canvas 
    WHERE user_id = my_user_id_text;
    RAISE NOTICE '🗑️ VPC data smazána!';
    
    -- 3️⃣ Smazat achievements z Modulu 2 a 3
    DELETE FROM public.user_achievements 
    WHERE user_id = my_user_id
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
    RAISE NOTICE '🏆 Achievements z Modulu 2 a 3 smazány!';
    
    RAISE NOTICE '✅ HOTOVO! Teď refresh aplikaci (F5) a vyčisti localStorage.';
  ELSE
    RAISE NOTICE '❌ Uživatel p3pulin@seznam.cz nebyl nalezen!';
  END IF;
END $$;


-- ============================================
-- OVĚŘENÍ - Zkontroluj výsledek:
-- ============================================

SELECT 
  u.email,
  (SELECT COUNT(*) FROM public.value_proposition_canvas WHERE user_id = u.id::text) as vpc_count,
  (SELECT COUNT(*) FROM public.user_achievements WHERE user_id = u.id) as achievements_count
FROM auth.users u
WHERE u.email = 'p3pulin@seznam.cz';

-- Mělo by být: vpc_count = 0, achievements_count = 4 nebo 5 (jen Modul 1)
