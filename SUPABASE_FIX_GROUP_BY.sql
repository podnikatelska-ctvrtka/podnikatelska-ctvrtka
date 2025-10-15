-- 🔥 FIX S OPRAVENÝM GROUP BY

-- SMAZAT VŠECHNO
DELETE FROM user_progress;
DELETE FROM course_lessons;
DELETE FROM course_modules;

-- ============================================
-- VYTVOŘIT MODULY
-- ============================================

INSERT INTO course_modules (id, title, description, order_number)
VALUES 
  (1, 'Základy byznys modelu', 'Naučte se všech 9 stavebních bloků Business Model Canvas', 1),
  (2, 'Vylepšení byznys modelu', 'Naučte se vylepšit a optimalizovat váš Business Model Canvas', 2),
  (3, 'Value Proposition Canvas', 'Naučte se vytvořit soulad mezi hodnotou a zákazníkem', 3);

-- ============================================
-- VYTVOŘIT LEKCE
-- ============================================

-- MODUL 1: Základy (1-9)
INSERT INTO course_lessons (id, module_id, title, description, order_number)
VALUES 
  (1, 1, 'Zákaznické segmenty', 'Kdo jsou vaši zákazníci? Naučte se je identifikovat.', 1),
  (2, 1, 'Hodnotová nabídka', 'Co nabízíte zákazníkům? Jaká je vaše unikátní hodnota?', 2),
  (3, 1, 'Distribuční kanály', 'Jak se vaše hodnota dostane k zákazníkům?', 3),
  (4, 1, 'Vztahy se zákazníky', 'Jaký vztah budujete se zákazníky?', 4),
  (5, 1, 'Zdroje příjmů', 'Jak vyděláváte peníze?', 5),
  (6, 1, 'Klíčové zdroje', 'Jaké zdroje potřebujete pro fungování byznysu?', 6),
  (7, 1, 'Klíčové aktivity', 'Co musíte dělat aby byznys fungoval?', 7),
  (8, 1, 'Klíčová partnerství', 'S kým spolupracujete?', 8),
  (9, 1, 'Struktura nákladů', 'Kolik vás byznys stojí?', 9);

-- MODUL 2: Vylepšení (10-13)
INSERT INTO course_lessons (id, module_id, title, description, order_number)
VALUES 
  (10, 2, 'Pravidla dobrého modelu', 'Zkontrolujte si, že váš model splňuje všechna pravidla', 1),
  (11, 2, 'Prosperuje váš model?', 'GAP analýza - porovnejte TEĎ vs CÍL', 2),
  (12, 2, 'Řešení situací', 'Jak řešit typické problémy pomocí Canvas', 3),
  (13, 2, 'Příklady úspěšných modelů', 'Jak může vypadat Business Model v různých odvětvích', 4);

-- MODUL 3: VPC (14-16)
INSERT INTO course_lessons (id, module_id, title, description, order_number)
VALUES 
  (14, 3, 'Zákaznický profil', 'Pochopte svého zákazníka do hloubky - cíle, obavy, očekávání', 1),
  (15, 3, 'Hodnotová mapa', 'Definujte co nabízíte a jak to řeší problémy zákazníka', 2),
  (16, 3, 'Kontrola souladu (FIT)', 'Objevte, prioritizujte a validujte co opravdu řeší problémy vašich zákazníků', 3);

-- ============================================
-- OVĚŘENÍ
-- ============================================

-- 1. Zkontroluj moduly (3 řádky)
SELECT id, title, order_number 
FROM course_modules 
ORDER BY order_number;

-- 2. Zkontroluj lekce (16 řádků)
SELECT 
  l.id,
  l.module_id,
  m.title as module_title,
  l.title as lesson_title,
  l.order_number
FROM course_lessons l
LEFT JOIN course_modules m ON l.module_id = m.id
ORDER BY l.module_id, l.order_number;

-- 3. Zkontroluj počty (OPRAVENÝ GROUP BY!)
SELECT 
  m.id,
  m.title,
  COUNT(l.id) as lesson_count
FROM course_modules m
LEFT JOIN course_lessons l ON m.id = l.module_id
GROUP BY m.id, m.title
ORDER BY m.id;
