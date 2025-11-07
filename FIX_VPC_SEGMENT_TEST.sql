-- ⚡ FIX VPC - Smazat starý segment "test"
-- 
-- Tento SQL smaže starý segment "test" z tvého Business Model Canvas
-- a necká jen aktuální segmenty.

-- 1️⃣ Zobraz současné segmenty
SELECT 
  section_key,
  content
FROM public.user_canvas_data
WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d'
AND section_key = 'segments';

-- 2️⃣ Pokud vidíš "test" v seznamu, zkopíruj níže upravený content BEZ "test"
-- Příklad:
-- 
-- UPDATE public.user_canvas_data
-- SET content = '[
--   {"text": "Tvůj segment 1", "color": "#3b82f6"},
--   {"text": "Tvůj segment 2", "color": "#22c55e"}
-- ]'::jsonb
-- WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d'
-- AND section_key = 'segments';

-- 3️⃣ Nebo pokud chceš jen resetovat VPC data (zachovat BMC):
DELETE FROM public.value_proposition_canvas
WHERE user_id = '2ac0d4c6-8556-4977-a74c-48b38c4e6d5d';

-- Pak refresh aplikaci a začni VPC znovu s čistými segmenty z BMC
