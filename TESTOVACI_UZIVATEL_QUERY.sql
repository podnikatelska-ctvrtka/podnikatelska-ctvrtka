-- 🧪 NAJDI PRÁZDNÉHO UŽIVATELE PRO TESTOVÁNÍ
-- Spusť tuto query v Supabase SQL Editoru

-- VARIANTA 1: Uživatelé BEZ JAKÉHOKOLIV PROGRESSU
SELECT 
  u.id,
  u.email, 
  u.name, 
  u.access_token,
  u.created_at,
  u.last_login
FROM users u
LEFT JOIN course_progress cp ON u.id = cp.user_id
WHERE cp.id IS NULL
ORDER BY u.created_at DESC
LIMIT 5;

-- VARIANTA 2: Uživatelé S NEJMÉNĚ PROGRESSU (včetně úplně prázdných)
SELECT 
  u.id,
  u.email, 
  u.name, 
  u.access_token,
  u.created_at,
  u.last_login,
  COUNT(cp.id) as progress_count
FROM users u
LEFT JOIN course_progress cp ON u.id = cp.user_id
GROUP BY u.id, u.email, u.name, u.access_token, u.created_at, u.last_login
ORDER BY progress_count ASC, u.created_at DESC
LIMIT 10;

-- 📝 VÝSTUP:
-- Zkopíruj access_token z výsledku a použij ve formátu:
-- https://podnikatelskactvrtka.cz/course-v3?token=ACCESS_TOKEN_ZDE

-- PŘÍKLAD:
-- https://podnikatelskactvrtka.cz/course-v3?token=abc123xyz456
