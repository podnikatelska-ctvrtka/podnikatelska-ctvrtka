-- 🔄 RESET ACHIEVEMENTŮ - ZACHOVAT JEN MODUL 1
-- 
-- Tento script vymaže achievementy z Modulu 2 a 3, ale ZACHOVÁ Modul 1.
-- Použij ho, když chceš otestovat achievementy pro Modul 2 a 3 znovu!
--
-- 📋 JAK POUŽÍT:
-- 1. Otevři Supabase Dashboard → SQL Editor
-- 2. Zkopíruj a spusť tento script
-- 3. Refresh aplikaci - Modul 1 zůstane hotový, Modul 2 a 3 resetovány! 🎯

-- ============================================
-- 1️⃣ SMAZAT ACHIEVEMENTY Z MODULU 2 A 3
-- ============================================

DELETE FROM public.user_achievements 
WHERE user_id = auth.uid()
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

-- ============================================
-- 2️⃣ OVĚŘENÍ
-- ============================================
-- Zkontroluj, které achievementy ti zůstaly (měly by být jen z Modulu 1):

SELECT 
  achievement_type as "Achievement",
  title as "Název",
  earned_at as "Odemčeno"
FROM public.user_achievements 
WHERE user_id = auth.uid()
ORDER BY earned_at ASC;

-- Měly by zůstat JEN:
-- ✅ first-segment (První zákazník)
-- ✅ first-value (Hodnota na stole)
-- ✅ all-sections-filled (Kompletní model)
-- ✅ module-1-complete (Modul 1 dokončen)
-- ✅ profitable-business (Ziskový byznys) - POKUD máš ziskový model

-- ============================================
-- 3️⃣ VYČISTIT LOCALSTORAGE (DŮLEŽITÉ!)
-- ============================================
-- Teď otevři Console v prohlížeči (F12) a spusť:

/*
// 🗑️ VYČISTIT CACHE ACHIEVEMENTŮ
localStorage.removeItem('achievements_' + '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d');
console.log('✅ LocalStorage achievementů vymazána!');

// Refresh stránku
location.reload();
*/

-- ============================================
-- ✅ HOTOVO!
-- ============================================
-- Achievements z Modulu 1 zůstaly, Modul 2 a 3 jsou čisté!
-- Můžeš teď dokončit Modul 2 a testovat, jestli se zobrazí achievement! 🚀
