-- ═══════════════════════════════════════════════════════════════
-- 🔄 RESET ACHIEVEMENTŮ PRO TESTOVÁNÍ
-- ═══════════════════════════════════════════════════════════════
-- 
-- Tento SQL script vymaže všechny achievementy pro konkrétního uživatele,
-- což ti umožní otestovat celý achievement systém od začátku.
--
-- ⚠️ DŮLEŽITÉ:
-- 1. Nahraď 'YOUR_USER_ID_HERE' svým skutečným UUID
-- 2. Po spuštění SQL refreshni stránku a vymaž localStorage v browseru:
--    - Otevři Developer Tools (F12)
--    - Console → localStorage.clear()
--    - Pak F5 (reload)
-- 3. Achievements se teď budou triggerovat znovu při akcích!
--
-- ═══════════════════════════════════════════════════════════════

-- 🔍 KROK 1: Zjisti své user_id (pokud ho neznáš)
-- Odkomentuj a spusť tento query:

-- SELECT id, email, created_at 
-- FROM auth.users 
-- WHERE email = 'tvuj@email.cz';


-- 🗑️ KROK 2: Vymaž všechny achievementy pro daného uživatele
-- Nahraď 'YOUR_USER_ID_HERE' svým UUID z kroku 1

DELETE FROM user_achievements 
WHERE user_id = 'YOUR_USER_ID_HERE';

-- ✅ HOTOVO! Teď:
-- 1. Otevři browser Console (F12)
-- 2. Zadej: localStorage.clear()
-- 3. Refreshni stránku (F5)
-- 4. Achievements se znovu budou triggerovat!


-- ═══════════════════════════════════════════════════════════════
-- 🔎 BONUS: Zobraz všechny achievementy uživatele (pro debug)
-- ═══════════════════════════════════════════════════════════════

-- Odkomentuj a spusť pro debug:

-- SELECT 
--   achievement_type,
--   title,
--   icon,
--   created_at,
--   metadata
-- FROM user_achievements 
-- WHERE user_id = 'YOUR_USER_ID_HERE'
-- ORDER BY created_at DESC;


-- ═══════════════════════════════════════════════════════════════
-- 🔥 EXTREME: Vymaž achievementy VŠEM uživatelům (OPATRNĚ!)
-- ═══════════════════════════════════════════════════════════════

-- ⛔ POUŽIJ JEN NA DEVELOPMENT DATABÁZI!
-- Odkomentuj jen pokud opravdu chceš vymazat všechny achievementy:

-- DELETE FROM user_achievements;
-- 
-- ✅ Po spuštění musí KAŽDÝ uživatel:
--    1. localStorage.clear() v browseru
--    2. F5 (reload)
