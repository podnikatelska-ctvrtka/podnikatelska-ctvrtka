-- ✅ POUŽIJ EXISTUJÍCÍHO USERA Z public.users
-- Spusť v Supabase SQL Editor

-- 1. Zobraz VŠECHNY usery v public.users
SELECT 
  id as "📋 UUID (zkopíruj do devToken.ts)",
  email,
  name,
  access_token as "🔑 Token",
  purchased_at,
  created_at
FROM public.users
ORDER BY created_at DESC;

-- ⚠️ Pokud vidíš hodně userů a chceš jen poslední 5:
-- Přidej na konec: LIMIT 5

-- ✅ ZKOPÍRUJ UUID nějakého existujícího usera!
-- Vlož ho do /lib/devToken.ts → userId

-- ============================================
-- 💡 TAKHLE TO MÁ BÝT!
-- ============================================
-- ✅ Testujeme s REÁLNÝM userem (public.users)
-- ✅ Ten samý flow jako zaplacený zákazník
-- ✅ Žádné speciální auth.users triky
-- ✅ Progress/achievements/canvas - všechno funguje
-- ============================================
