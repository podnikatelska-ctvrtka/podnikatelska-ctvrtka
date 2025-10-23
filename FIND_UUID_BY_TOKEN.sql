-- ✅ NAJDI UUID PODLE ACCESS_TOKEN
-- Spusť v Supabase SQL Editor

-- Najdi UUID usera podle tokenu
SELECT 
  id as "📋 UUID (zkopíruj do devToken.ts)",
  email,
  name,
  access_token as "🔑 Token",
  purchased_at,
  created_at
FROM public.users
WHERE access_token = '1759757068350-eyw8z2zo7t-4lrujeg6mkk';

-- ============================================
-- ✅ VÝSLEDEK:
-- ============================================
-- Zkopíruj UUID (první sloupec) do /lib/devToken.ts
-- ============================================
