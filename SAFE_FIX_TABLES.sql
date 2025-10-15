-- ====================================
-- BEZPEČNÁ OPRAVA TABULEK
-- ====================================
-- Spusť CELÝ tento soubor najednou!

-- 1. Drop old tables
DROP TABLE IF EXISTS business_canvas_sections CASCADE;
DROP TABLE IF EXISTS value_proposition_canvas CASCADE;

-- 2. Create business_canvas_sections with TEXT user_id
CREATE TABLE business_canvas_sections (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  section_key TEXT NOT NULL,
  content JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, section_key)
);

-- 3. Create value_proposition_canvas with TEXT user_id
CREATE TABLE value_proposition_canvas (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  segment_name TEXT NOT NULL,
  customer_jobs JSONB DEFAULT '[]'::jsonb,
  pains JSONB DEFAULT '[]'::jsonb,
  gains JSONB DEFAULT '[]'::jsonb,
  products_services JSONB DEFAULT '[]'::jsonb,
  pain_relievers JSONB DEFAULT '[]'::jsonb,
  gain_creators JSONB DEFAULT '[]'::jsonb,
  fit_score INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, segment_name)
);

-- 4. Disable RLS on ALL tables
ALTER TABLE business_canvas_sections DISABLE ROW LEVEL SECURITY;
ALTER TABLE value_proposition_canvas DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress DISABLE ROW LEVEL SECURITY;

-- 5. Create indexes
CREATE INDEX idx_canvas_user ON business_canvas_sections(user_id);
CREATE INDEX idx_vpc_user ON value_proposition_canvas(user_id);

-- 6. Success message
SELECT '✅ ALL TABLES FIXED - Refresh app now!' as status;
