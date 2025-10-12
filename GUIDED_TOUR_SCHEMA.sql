-- ====================================
-- GUIDED TOUR - Database Schema
-- ====================================
-- Přidání tabulky pro tracking interaktivního kurzu
-- Spusť tento SQL v Supabase Dashboard → SQL Editor

-- ====================================
-- COURSE PROGRESS (tracking modulů)
-- ====================================
CREATE TABLE IF NOT EXISTS course_progress (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL, -- Bez foreign key - jednodušší pro demo
  
  -- Module tracking
  module_id TEXT NOT NULL, -- 'module1', 'module2', 'module3', atd.
  
  -- Completion
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique constraint
  UNIQUE(user_id, module_id)
);

-- ====================================
-- BUSINESS CANVAS SECTIONS (sticky notes)
-- ====================================
CREATE TABLE IF NOT EXISTS business_canvas_sections (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL, -- Bez foreign key - jednodušší pro demo
  
  -- Canvas section
  section_key TEXT NOT NULL, -- 'segments', 'value', 'channels', 'costs', atd.
  
  -- Content (JSON array sticky notes s barvami, hodnotami, TEĎ/CÍL)
  content JSONB DEFAULT '[]'::jsonb,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique constraint
  UNIQUE(user_id, section_key)
);

-- ====================================
-- ROW LEVEL SECURITY (RLS)
-- ====================================

-- Enable RLS
ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_canvas_sections ENABLE ROW LEVEL SECURITY;

-- COURSE PROGRESS: Pro demo - všichni můžou všechno (později přidat auth!)
CREATE POLICY "Anyone can view course progress"
  ON course_progress FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert course progress"
  ON course_progress FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update course progress"
  ON course_progress FOR UPDATE
  USING (true);

-- CANVAS SECTIONS: Pro demo - všichni můžou všechno (později přidat auth!)
CREATE POLICY "Anyone can view canvas sections"
  ON business_canvas_sections FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert canvas sections"
  ON business_canvas_sections FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update canvas sections"
  ON business_canvas_sections FOR UPDATE
  USING (true);

-- ====================================
-- INDEXES (pro performance)
-- ====================================

CREATE INDEX IF NOT EXISTS idx_course_progress_user ON course_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_course_progress_module ON course_progress(module_id);
CREATE INDEX IF NOT EXISTS idx_canvas_sections_user ON business_canvas_sections(user_id);
CREATE INDEX IF NOT EXISTS idx_canvas_sections_key ON business_canvas_sections(section_key);

-- ====================================
-- ✅ HOTOVO!
-- ====================================
-- Nyní máš:
-- ✅ Tabulka course_progress pro tracking modulů
-- ✅ Tabulka business_canvas_sections pro sticky notes
-- ✅ RLS policies (security)
-- ✅ Indexes (performance)
--
-- POUŽITÍ:
-- 1. Spusť tento SQL v Supabase Dashboard
-- 2. Ověř že tabulky existují
-- 3. Otevři /interactive-course nebo /#interactive-course
