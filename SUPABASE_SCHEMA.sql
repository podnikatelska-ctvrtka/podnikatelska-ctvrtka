-- ====================================
-- SUPABASE LMS - AKTUÁLNÍ SCHEMA
-- ====================================
-- Tento soubor POPISUJE aktuální stav databáze
-- Pro vytvoření chybějících tabulek použij: FINALNI_FIX_VPC_TABLE.sql
-- Datum: 2025-10-14

-- ====================================
-- TABULKY V SUPABASE (STÁVAJÍCÍ):
-- ====================================
-- ✅ users
-- ✅ course_modules
-- ✅ course_lessons
-- ✅ course_materials
-- ✅ user_progress
-- ✅ user_canvas_data (Business Model Canvas)
-- ✅ user_achievements
-- ❌ value_proposition_canvas (CHYBÍ - viz FINALNI_FIX_VPC_TABLE.sql)

-- ====================================
-- 1. USERS (zákazníci)
-- ====================================
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY, -- UUID jako TEXT
  email TEXT UNIQUE NOT NULL,
  access_token TEXT UNIQUE NOT NULL,
  name TEXT,
  order_id TEXT,
  amount NUMERIC,
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  login_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================
-- 2. COURSE MODULES
-- ====================================
CREATE TABLE IF NOT EXISTS course_modules (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  order_number INT NOT NULL DEFAULT 0,
  duration TEXT,
  thumbnail_url TEXT,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================
-- 3. COURSE LESSONS
-- ====================================
CREATE TABLE IF NOT EXISTS course_lessons (
  id SERIAL PRIMARY KEY,
  module_id INT REFERENCES course_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_number INT NOT NULL DEFAULT 0,
  video_url TEXT,
  vimeo_id TEXT,
  duration TEXT,
  content TEXT,
  is_active BOOLEAN DEFAULT true,
  is_preview BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================
-- 4. COURSE MATERIALS
-- ====================================
CREATE TABLE IF NOT EXISTS course_materials (
  id SERIAL PRIMARY KEY,
  lesson_id INT REFERENCES course_lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT DEFAULT 'pdf',
  file_size TEXT,
  order_number INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================
-- 5. USER PROGRESS
-- ====================================
CREATE TABLE IF NOT EXISTS user_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL, -- TEXT (UUID string)
  lesson_id INT NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  time_spent INT DEFAULT 0,
  last_position INT DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- ====================================
-- 6. USER CANVAS DATA (BMC)
-- ====================================
CREATE TABLE IF NOT EXISTS user_canvas_data (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL, -- TEXT (UUID string)
  section_key TEXT NOT NULL, -- 'segments', 'value', 'channels', atd.
  content JSONB DEFAULT '[]'::jsonb, -- [{text: "Item", color: "#color"}]
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, section_key)
);

-- ====================================
-- 7. USER ACHIEVEMENTS
-- ====================================
CREATE TABLE IF NOT EXISTS user_achievements (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL, -- TEXT (UUID string)
  achievement_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  earned_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================
-- 8. VALUE PROPOSITION CANVAS (VPC)
-- ====================================
-- ❌ TATO TABULKA CHYBÍ!
-- Spusť: FINALNI_FIX_VPC_TABLE.sql
--
-- Struktura:
-- - id BIGSERIAL PRIMARY KEY
-- - user_id TEXT NOT NULL
-- - segment_name TEXT NOT NULL
-- - selected_value TEXT
-- - jobs JSONB
-- - pains JSONB
-- - gains JSONB
-- - products JSONB
-- - pain_relievers JSONB
-- - gain_creators JSONB
-- - created_at, updated_at TIMESTAMPTZ
-- - UNIQUE(user_id, segment_name, selected_value)

-- ====================================
-- RLS STATUS
-- ====================================
-- VŠECHNY TABULKY MAJÍ RLS = DISABLED
-- (Pro jednoduchost - používáme token autentizaci)

-- ====================================
-- INDEXY
-- ====================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_token ON users(access_token);
CREATE INDEX IF NOT EXISTS idx_lessons_module ON course_lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_materials_lesson ON course_materials(lesson_id);
CREATE INDEX IF NOT EXISTS idx_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_canvas_user ON user_canvas_data(user_id);
CREATE INDEX IF NOT EXISTS idx_achievements_user ON user_achievements(user_id);

-- ====================================
-- ✅ KONEC SCHÉMATU
-- ====================================
