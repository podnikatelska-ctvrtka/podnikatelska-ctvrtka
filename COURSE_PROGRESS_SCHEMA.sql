-- ✅ COURSE PROGRESS TRACKING
-- Ukládá které lekce má user dokončené

-- Drop existing table if needed (pro čistý start)
DROP TABLE IF EXISTS course_progress;

-- Create fresh table
CREATE TABLE course_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  lesson_id INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Unique constraint: user může mít lekci dokončenou jen jednou
  UNIQUE(user_id, lesson_id)
  
  -- Poznámka: Foreign key vypnut - tabulka users neexistuje v tomto projektu
);

-- Index pro rychlé dotazy
CREATE INDEX IF NOT EXISTS idx_course_progress_user ON course_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_course_progress_lesson ON course_progress(lesson_id);

-- RLS (Row Level Security) - VYPNUTO pro jednoduchost
-- Pokud chcete zapnout, použijte Supabase Auth
-- ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;

-- ✅ HOTOVO! Tabulka pro tracking progress vytvořena
-- Pro testování: RLS je vypnuté, všichni mohou číst/psát
-- Pro produkci: Zapněte RLS a použijte Supabase Auth
