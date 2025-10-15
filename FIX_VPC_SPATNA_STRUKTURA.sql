-- ==========================================
-- 🔧 OPRAVA: value_proposition_canvas má špatnou strukturu
-- ==========================================
-- Tabulka existuje, ale má špatné sloupce → musíme ji přetvořit
-- Datum: 2025-10-14

-- ====================================
-- 1. SMAŽ STAROU TABULKU (je prázdná)
-- ====================================
DROP TABLE IF EXISTS value_proposition_canvas CASCADE;

-- ====================================
-- 2. VYTVOŘ NOVOU SE SPRÁVNÝMI SLOUPCI
-- ====================================
CREATE TABLE value_proposition_canvas (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  
  -- Segment association
  segment_name TEXT NOT NULL,
  selected_value TEXT, -- Pro Value Map (může být NULL pro Customer Profile)
  
  -- Customer Profile (Circle) - array objektů
  jobs JSONB DEFAULT '[]'::jsonb,
  pains JSONB DEFAULT '[]'::jsonb,
  gains JSONB DEFAULT '[]'::jsonb,
  
  -- Value Map (Square) - array objektů
  products JSONB DEFAULT '[]'::jsonb,
  pain_relievers JSONB DEFAULT '[]'::jsonb,
  gain_creators JSONB DEFAULT '[]'::jsonb,
  
  -- Extra sloupce které některé komponenty používají
  fit_validation_data JSONB DEFAULT '{}'::jsonb,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Unique constraint: kombinace user + segment + value
  UNIQUE(user_id, segment_name, selected_value)
);

-- ====================================
-- 3. VYPNI RLS (konzistence s ostatními tabulkami)
-- ====================================
ALTER TABLE value_proposition_canvas DISABLE ROW LEVEL SECURITY;

-- ====================================
-- 4. INDEXY (performance)
-- ====================================
CREATE INDEX idx_vpc_user ON value_proposition_canvas(user_id);
CREATE INDEX idx_vpc_segment ON value_proposition_canvas(segment_name);
CREATE INDEX idx_vpc_user_segment ON value_proposition_canvas(user_id, segment_name);

-- ====================================
-- ✅ HOTOVO!
-- ====================================
SELECT 
  '✅ VPC tabulka přetvořena se správnou strukturou!' as status,
  COUNT(*) as rows
FROM value_proposition_canvas;
