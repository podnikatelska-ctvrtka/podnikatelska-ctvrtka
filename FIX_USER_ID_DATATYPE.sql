-- ====================================
-- OPRAV DATOVÝ TYP user_id NA TEXT
-- ====================================
-- POZOR: Tohle smaže všechna data v tabulkách!
-- Použij jen pokud je user_id jako INTEGER místo TEXT/UUID

-- BACKUP FIRST!
-- Udělej screenshot dat před spuštěním!

-- 1. SMAŽ STARÉ TABULKY
DROP TABLE IF EXISTS business_canvas_sections CASCADE;
DROP TABLE IF EXISTS user_progress CASCADE;
DROP TABLE IF EXISTS value_proposition_canvas CASCADE;

-- 2. VYTVOŘ NOVÉ S SPRÁVNÝM DATOVÝM TYPEM

-- user_progress - progress tracking
CREATE TABLE user_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,  -- ✅ TEXT místo INTEGER!
  lesson_id INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- business_canvas_sections - BMC data
CREATE TABLE business_canvas_sections (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,  -- ✅ TEXT místo INTEGER!
  section_key TEXT NOT NULL,
  content JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, section_key)
);

-- value_proposition_canvas - VPC data
CREATE TABLE value_proposition_canvas (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,  -- ✅ TEXT místo INTEGER!
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

-- 3. VYPNI RLS
ALTER TABLE business_canvas_sections DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE value_proposition_canvas DISABLE ROW LEVEL SECURITY;

-- 4. VYTVOŘ INDEXY
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_canvas_user ON business_canvas_sections(user_id);
CREATE INDEX idx_vpc_user ON value_proposition_canvas(user_id);

SELECT '✅ Tables recreated with TEXT user_id!' as status;
