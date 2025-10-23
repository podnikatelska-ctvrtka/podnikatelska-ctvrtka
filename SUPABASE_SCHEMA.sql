-- 📊 SUPABASE DATABASE SCHEMA
-- Kompletní struktura tabulek pro Podnikatelskou Čtvrtku

-- ============================================
-- 1️⃣ USERS TABLE (z Supabase Auth)
-- ============================================
-- Tato tabulka je automaticky vytvořená Supabase Auth
-- auth.users obsahuje:
-- - id (UUID)
-- - email
-- - created_at
-- - last_sign_in_at
-- atd.

-- ============================================
-- 2️⃣ USER_CANVAS_DATA TABLE
-- ============================================
-- Ukládá veškerá data z canvasu (BMC, VPC, FIT Validator)
-- a také toggle stav (experience_level)

CREATE TABLE IF NOT EXISTS public.user_canvas_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL, -- např. 'value_proposition', 'customer_profile', 'experience_level', 'financial_scenarios'
  content JSONB NOT NULL DEFAULT '{}'::jsonb, -- flexibilní JSON struktura
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique constraint: jeden user může mít pouze jeden záznam pro každý section_key
  UNIQUE(user_id, section_key)
);

-- Index pro rychlé vyhledávání
CREATE INDEX IF NOT EXISTS idx_user_canvas_data_user_id ON public.user_canvas_data(user_id);
CREATE INDEX IF NOT EXISTS idx_user_canvas_data_section_key ON public.user_canvas_data(section_key);

-- RLS Policies
ALTER TABLE public.user_canvas_data ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read their own canvas data"
  ON public.user_canvas_data
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own data
CREATE POLICY "Users can insert their own canvas data"
  ON public.user_canvas_data
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own data
CREATE POLICY "Users can update their own canvas data"
  ON public.user_canvas_data
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own data
CREATE POLICY "Users can delete their own canvas data"
  ON public.user_canvas_data
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 3️⃣ USER_PROGRESS TABLE
-- ============================================
-- Ukládá progress kurzu (dokončené lekce, achievements)

CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL, -- např. 'module1-lesson1'
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique constraint: jeden user může mít pouze jeden progress záznam pro každou lekci
  UNIQUE(user_id, lesson_id)
);

-- Index pro rychlé vyhledávání
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_lesson_id ON public.user_progress(lesson_id);

-- RLS Policies
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Users can read their own progress
CREATE POLICY "Users can read their own progress"
  ON public.user_progress
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own progress
CREATE POLICY "Users can insert their own progress"
  ON public.user_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own progress
CREATE POLICY "Users can update their own progress"
  ON public.user_progress
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 4️⃣ USER_ACHIEVEMENTS TABLE
-- ============================================
-- Ukládá odemčené achievements

CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_type TEXT NOT NULL, -- např. 'first-lesson', 'canvas-master' (používáme kebab-case!)
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique constraint: jeden achievement může být odemčen pouze jednou
  UNIQUE(user_id, achievement_type)
);

-- Index pro rychlé vyhledávání
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON public.user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_achievement_type ON public.user_achievements(achievement_type);

-- RLS Policies
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Users can read their own achievements
CREATE POLICY "Users can read their own achievements"
  ON public.user_achievements
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own achievements
CREATE POLICY "Users can insert their own achievements"
  ON public.user_achievements
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 5️⃣ ORDERS TABLE
-- ============================================
-- Ukládá objednávky z GoPay/Fapi

CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  payment_id TEXT, -- GoPay payment ID
  fapi_order_id TEXT, -- Fapi order ID
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'CZK',
  status TEXT DEFAULT 'pending', -- pending, paid, failed, cancelled
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb -- další data (jméno, telefon, atd.)
);

-- Index pro rychlé vyhledávání
CREATE INDEX IF NOT EXISTS idx_orders_email ON public.orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_payment_id ON public.orders(payment_id);
CREATE INDEX IF NOT EXISTS idx_orders_fapi_order_id ON public.orders(fapi_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

-- RLS Policies - POZOR: Orders nemají user_id!
-- Admin přístup nebo webhook přístup bez RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Pouze autorizovaní uživatelé (např. přes service_role key) mohou číst/zapisovat
-- V aplikaci používáme supabase.auth.admin pro přístup k orders

-- ============================================
-- 6️⃣ EXAMPLE DATA STRUCTURES
-- ============================================

-- Příklad: Experience Level
-- {
--   "level": "beginner" | "experienced"
-- }

-- Příklad: Financial Scenarios (beginner mode)
-- {
--   "pessimisticRevenue": 30000,
--   "pessimisticCosts": 40000,
--   "realisticRevenue": 50000,
--   "realisticCosts": 35000,
--   "optimisticRevenue": 80000,
--   "optimisticCosts": 30000
-- }

-- Příklad: Canvas Revenue/Costs (experienced mode)
-- {
--   "revenue": [
--     { "name": "Předplatné", "value": 29000 },
--     { "name": "Konzultace", "value": 15000 }
--   ],
--   "costs": [
--     { "name": "Marketing", "value": 8000 },
--     { "name": "Software", "value": 3000 }
--   ]
-- }

-- Příklad: Customer Segments (experienced mode)
-- {
--   "segments": [
--     { "name": "Začínající podnikatelé", "count": 50, "arpu": 500 },
--     { "name": "Malé firmy", "count": 20, "arpu": 1200 }
--   ]
-- }

-- ============================================
-- 7️⃣ HELPER FUNCTIONS
-- ============================================

-- Function: Update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-update updated_at for user_canvas_data
CREATE TRIGGER update_user_canvas_data_updated_at
  BEFORE UPDATE ON public.user_canvas_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Auto-update updated_at for user_progress
CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ✅ SCHEMA COMPLETE!
-- ============================================
-- Spusť tento SQL v Supabase SQL Editoru
-- Pokud tabulky již existují, nevadí - IF NOT EXISTS je ošetří
