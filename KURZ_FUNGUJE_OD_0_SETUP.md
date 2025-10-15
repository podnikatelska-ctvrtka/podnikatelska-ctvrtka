# 🚀 KOMPLETNÍ SETUP KURZU OD NULY

## 📋 CHECKLIST - CO UDĚLAT TEĎKA

### 1️⃣ SUPABASE - Vypnout RLS a povolit PUBLIC access

**DŮLEŽITÉ:** Pro vývoj a testování MUSÍŠ vypnout RLS! Production verze může použít správné policies později.

**Spusť tento SQL v Supabase SQL Editor:**

```sql
-- Vypnout RLS na všech tabulkách
ALTER TABLE user_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_canvas_data DISABLE ROW LEVEL SECURITY;
ALTER TABLE value_proposition_canvas DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements DISABLE ROW LEVEL SECURITY;

-- Povolit PUBLIC přístup
GRANT ALL ON user_progress TO anon, authenticated;
GRANT ALL ON user_canvas_data TO anon, authenticated;
GRANT ALL ON value_proposition_canvas TO anon, authenticated;
GRANT ALL ON user_achievements TO anon, authenticated;
```

**NEBO** spusť celý soubor `SUPABASE_FIX_406_ERROR.sql`

### 2️⃣ OVĚŘ ŽE TABULKY EXISTUJÍ

Spusť v Supabase SQL Editor:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('user_progress', 'user_canvas_data', 'value_proposition_canvas', 'user_achievements');
```

**Měl bys vidět všechny 4 tabulky!**

Pokud NE, spusť `SUPABASE_SCHEMA.sql` pro vytvoření tabulek.

### 3️⃣ TESTOVÁNÍ KURZU

**Otevři kurz s dev parametrem:**

```
http://localhost:5173/kurz?dev=true
```

nebo na produkci:

```
https://podnikatelskactvrtka.cz/kurz?dev=true
```

**Co by se mělo stát:**
- ✅ Kurz se načte
- ✅ Dashboard se zobrazí
- ✅ Můžeš kliknout na lekce v sidebaru
- ✅ Můžeš přidávat položky do Business Model Canvas
- ✅ Progress se ukládá do Supabase
- ✅ Achievements se odemykají

### 4️⃣ TESTOVÁNÍ NOVÉHO UŽIVATELE

**1. Vytvoř access token v Supabase:**

Spusť v Supabase SQL Editor:

```sql
-- Vytvoř testovacího uživatele v access_tokens tabulce
INSERT INTO access_tokens (email, expires_at, is_active)
VALUES ('test@example.com', NOW() + INTERVAL '30 days', true)
RETURNING token, email;
```

**2. Zkopíruj token a otevři kurz:**

```
http://localhost:5173/kurz?token=TVUJ_TOKEN_ZDE
```

**3. Ověř že:**
- ✅ Kurz se načte
- ✅ Progress je 0% (nový uživatel)
- ✅ Můžeš začít kurz
- ✅ Data se ukládají

### 5️⃣ KONTROLA CONSOLE ERRORS

**Otevři Developer Console (F12) a zkontroluj:**

❌ **NESMÍ tam být tyto errory:**
- `Cannot read properties of null (reading '0')` - Motion error
- `406 Not Acceptable` - Supabase RLS error
- `TypeError: Cannot read property 'lessons' of undefined` - Missing module data

✅ **Měl bys vidět:**
- `🔄 Syncing achievements from localStorage to Supabase...`
- `🔄 SimpleDashboard: Reloading fresh progress from Supabase...`
- `✅ Achievement sync complete!`

### 6️⃣ POKUD STÁLE NEFUNGUJE

**A) Smaž localStorage a refresh:**

```javascript
// Spusť v Console:
localStorage.clear();
location.reload();
```

**B) Zkontroluj Supabase URL a API Key:**

V souboru `/lib/supabase.ts` zkontroluj že máš správné hodnoty:

```typescript
const supabaseUrl = 'https://jdcpzswpecntlqiyzxac.supabase.co'
const supabaseAnonKey = 'TVUJ_ANON_KEY'
```

**C) Zkontroluj že tabulky jsou prázdné (pro nového uživatele):**

```sql
SELECT * FROM user_progress WHERE user_id = 'dev-user-999';
SELECT * FROM user_canvas_data WHERE user_id = 'dev-user-999';
```

Mělo by vrátit 0 řádků pro nového uživatele!

---

## 🎯 CO BYLO OPRAVENO

### 1. Motion Animace
- ❌ **PŘED:** `<motion.div animate={{ width: \`${percent}%\` }}` - crashovalo kvůli null
- ✅ **PO:** `<div style={{ width: \`${percent || 0}%\` }} className="transition-all">` - CSS transition

### 2. Safe Guards
- Přidány kontroly na `currentLesson` existence
- Přidány kontroly na `modules` array
- Přidány kontroly na `completedLessons` existence

### 3. Supabase Queries
- `.single()` změněno na `.maybeSingle()` - nechybuje když data neexistují
- Přidány error checks do všech queries

### 4. Achievement SYNC
- Při načtení se achievements z localStorage SYNC do Supabase
- Nově odemčené achievements se ukládají SOUČASNĚ do obou

---

## 📝 POZNÁMKY PRO PRODUCTION

**Až budeš nasazovat na produkci:**

1. **ZAPNI RLS policies zpět** (ale s PUBLIC access):

```sql
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_canvas_data ENABLE ROW LEVEL SECURITY;
-- atd...

-- Public policies
CREATE POLICY "Enable all for everyone" ON user_progress FOR ALL USING (true);
-- atd...
```

2. **Odstraň `?dev=true` parametr** z URL

3. **Ověř že access token systém funguje**

4. **Testuj s reálným uživatelem který zakoupil kurz**

---

## ✅ FINÁLNÍ CHECKLIST

- [ ] Supabase RLS vypnuté
- [ ] Všechny tabulky existují
- [ ] Kurz se načte s `?dev=true`
- [ ] Dashboard se zobrazí
- [ ] Můžeš kliknout na lekce
- [ ] Progress se ukládá
- [ ] Achievements se odemykají
- [ ] Žádné console errors

**HOTOVO! Kurz by měl fungovat! 🎉**
