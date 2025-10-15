-- ==========================================
-- 🎯 FINÁLNÍ FIX: Vytvoř POUZE chybějící VPC tabulku
-- ==========================================
-- Spusť v Supabase Dashboard → SQL Editor
-- Datum: 2025-10-14

-- ====================================
-- 1. VALUE PROPOSITION CANVAS
-- ====================================
CREATE TABLE IF NOT EXISTS value_proposition_canvas (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  
  -- Segment association
  segment_name TEXT NOT NULL,
  selected_value TEXT, -- Pro Value Map
  
  -- Customer Profile (Circle)
  jobs JSONB DEFAULT '[]'::jsonb,
  pains JSONB DEFAULT '[]'::jsonb,
  gains JSONB DEFAULT '[]'::jsonb,
  
  -- Value Map (Square)
  products JSONB DEFAULT '[]'::jsonb,
  pain_relievers JSONB DEFAULT '[]'::jsonb,
  gain_creators JSONB DEFAULT '[]'::jsonb,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Unique constraint
  UNIQUE(user_id, segment_name, selected_value)
);

-- ====================================
-- 2. VYPNI RLS (pro konzistenci s ostatními)
-- ====================================
ALTER TABLE value_proposition_canvas DISABLE ROW LEVEL SECURITY;

-- ====================================
-- 3. INDEXY (performance)
-- ====================================
CREATE INDEX IF NOT EXISTS idx_vpc_user ON value_proposition_canvas(user_id);
CREATE INDEX IF NOT EXISTS idx_vpc_segment ON value_proposition_canvas(segment_name);

-- ====================================
-- ✅ HOTOVO!
-- ====================================
SELECT 
  '✅ VPC tabulka vytvořena!' as status,
  COUNT(*) as existing_rows
FROM value_proposition_canvas;
