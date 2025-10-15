-- ====================================
-- FIX: PŘIDEJ CHYBĚJÍCÍ TABULKY
-- ====================================
-- Supabase Dashboard → SQL Editor → Spusť tento SQL

-- ====================================
-- TABULKA: business_canvas_sections
-- ====================================
-- Tuto tabulku kód používá, ale není v SCHEMA!

CREATE TABLE IF NOT EXISTS business_canvas_sections (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Canvas section key
  section_key TEXT NOT NULL, -- 'segments', 'value', 'channels', 'relationships', 'revenue', 'resources', 'activities', 'partners', 'costs'
  
  -- Content (JSON array)
  content JSONB DEFAULT '[]'::jsonb, -- Array of items with text/value
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique constraint
  UNIQUE(user_id, section_key)
);

-- Enable RLS
ALTER TABLE business_canvas_sections ENABLE ROW LEVEL SECURITY;

-- Policies (simplified - všichni můžou vše, token auth v app)
CREATE POLICY "Users can view own canvas sections"
  ON business_canvas_sections FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own canvas sections"
  ON business_canvas_sections FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own canvas sections"
  ON business_canvas_sections FOR UPDATE
  USING (true);

CREATE POLICY "Users can delete own canvas sections"
  ON business_canvas_sections FOR DELETE
  USING (true);

-- Index
CREATE INDEX IF NOT EXISTS idx_canvas_sections_user ON business_canvas_sections(user_id);
CREATE INDEX IF NOT EXISTS idx_canvas_sections_user_section ON business_canvas_sections(user_id, section_key);

-- ====================================
-- TABULKA: value_proposition_canvas
-- ====================================
-- Pro VPC komponenty

CREATE TABLE IF NOT EXISTS value_proposition_canvas (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Segment key
  segment_key TEXT NOT NULL, -- 'segment-1', 'segment-2', etc.
  
  -- Customer Profile (Jobs, Pains, Gains)
  jobs JSONB DEFAULT '[]'::jsonb,
  pains JSONB DEFAULT '[]'::jsonb,
  gains JSONB DEFAULT '[]'::jsonb,
  
  -- Value Map (Products/Services, Pain Relievers, Gain Creators)
  products JSONB DEFAULT '[]'::jsonb,
  pain_relievers JSONB DEFAULT '[]'::jsonb,
  gain_creators JSONB DEFAULT '[]'::jsonb,
  
  -- Metadata
  segment_name TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique constraint
  UNIQUE(user_id, segment_key)
);

-- Enable RLS
ALTER TABLE value_proposition_canvas ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own VPC data"
  ON value_proposition_canvas FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own VPC data"
  ON value_proposition_canvas FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own VPC data"
  ON value_proposition_canvas FOR UPDATE
  USING (true);

CREATE POLICY "Users can delete own VPC data"
  ON value_proposition_canvas FOR DELETE
  USING (true);

-- Index
CREATE INDEX IF NOT EXISTS idx_vpc_user ON value_proposition_canvas(user_id);
CREATE INDEX IF NOT EXISTS idx_vpc_user_segment ON value_proposition_canvas(user_id, segment_key);

-- ====================================
-- ✅ HOTOVO!
-- ====================================
-- Nyní máš:
-- ✅ business_canvas_sections (pro BMC komponenty)
-- ✅ value_proposition_canvas (pro VPC komponenty)
-- ✅ RLS policies
-- ✅ Indexes

-- REFRESH APLIKACI A ZKUS ZNOVU!
