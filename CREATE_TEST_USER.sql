-- ============================================
-- VYTVOŘENÍ TESTOVACÍHO UŽIVATELE PRO DEV MODE
-- ============================================
-- 
-- Spusť tento SQL v Supabase SQL Editor:
-- https://supabase.com/dashboard/project/[PROJECT]/sql
--
-- ============================================

-- 1. VYTVOŘ TESTOVACÍHO UŽIVATELE V AUTH
-- ============================================
-- POZNÁMKA: Tohle MUSÍŠ udělat manuálně v Supabase Dashboard!
-- 
-- Authentication → Users → Add User
-- 
-- Email:    test@podnikatelskactvrtka.cz
-- Password: TestPass123!
-- Auto Confirm: ✅ YES
-- 
-- Nebo použij signUp v aplikaci (viz níže)
-- ============================================


-- 2. PO VYTVOŘENÍ USERA - NASTAV JEHO DATA
-- ============================================
-- (Tento SQL spustíš AŽ PO vytvoření usera v Auth!)

-- Najdi user_id nově vytvořeného usera:
SELECT id, email FROM auth.users WHERE email = 'test@podnikatelskactvrtka.cz';

-- Ulož si user_id a doplň ho níže místo 'USER_ID_HERE'

-- Vytvoř profil pro test usera (pokud používáš profiles tabulku):
-- INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
-- VALUES (
--   'USER_ID_HERE',  -- ← Doplň user_id z query výše
--   'test@podnikatelskactvrtka.cz',
--   'Test User',
--   NOW(),
--   NOW()
-- );


-- 3. VYTVOŘ DUMMY PROGRESS PRO TESTOVÁNÍ
-- ============================================
-- (Volitelné - pro testování course progress)

-- INSERT INTO public.user_progress (
--   user_id,
--   lesson_id,
--   module_id,
--   status,
--   completed_at
-- )
-- VALUES
--   ('USER_ID_HERE', 1, 1, 'completed', NOW()),  -- Lekce 1 dokončena
--   ('USER_ID_HERE', 2, 1, 'in_progress', NULL); -- Lekce 2 in progress


-- ============================================
-- POZNÁMKY:
-- ============================================
-- 
-- 1. Supabase neumožňuje vytvořit auth usera přes SQL
--    → Musíš použít Dashboard nebo signUp funkci
-- 
-- 2. Po vytvoření usera v Dashboard, můžeš nastavit jeho data pomocí SQL výše
-- 
-- 3. Pro auto-confirm (skip email verification):
--    → V Dashboard při vytváření: zaškrtni "Auto Confirm User"
-- 
-- 4. Alternativně můžeš použít Supabase Management API
--    ale to je složitější
-- 
-- ============================================


-- ============================================
-- RYCHLÉ ŘEŠENÍ BEZ SQL:
-- ============================================
-- 
-- Můžeš prostě vytvořit účet normálně přes aplikaci:
-- 
-- 1. Jdi na tvoji landing page
-- 2. Zaregistruj se s emailem: test@podnikatelskactvrtka.cz
-- 3. Potvrď email (pokud je required)
-- 4. ✅ Účet vytvořen!
-- 5. Použij Quick Login v dev mode
-- 
-- ============================================
