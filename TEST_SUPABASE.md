# Jak Otestovat Supabase Zápis

## 🎯 RYCHLÝ TEST V PROHLÍŽEČI:

### 1. Otevři Developer Console (F12)
```javascript
// Test zápisu do Canvas:
const testData = {
  user_id: 'TEST_USER_123',
  section_key: 'segments',
  content: [
    { text: 'Test segment', color: 'blue' }
  ],
  updated_at: new Date().toISOString()
};

// Zkus zapsat:
const { data, error } = await supabase
  .from('user_canvas_data')
  .upsert(testData, {
    onConflict: 'user_id,section_key'
  });

if (error) {
  console.error('❌ Chyba:', error);
} else {
  console.log('✅ Úspěch!', data);
}
```

### 2. Kontrola v Supabase Dashboard:
1. Otevři https://supabase.com/dashboard
2. Vyber svůj projekt
3. Vlevo: **Table Editor** → `user_canvas_data`
4. Měl bys vidět nový řádek s `user_id = TEST_USER_123`

## 📊 LIVE TEST - REAL-TIME MONITORING:

### Krok 1: Otevři Supabase Dashboard v jiném okně
- Nech otevřený Table Editor na tabulce `user_canvas_data`
- Refresh page občas (F5)

### Krok 2: V aplikaci přidej štítek do Canvas
1. Jdi na kurz (#course-v3)
2. Otevři nějakou lekci s Canvas
3. Přidej nový štítek (např. "Testovací segment")
4. Počkej 2 sekundy (autosave)

### Krok 3: Zkontroluj Supabase Dashboard
- Klikni Refresh (F5) v Table Editoru
- Měl bys vidět nový řádek NEBO update existujícího
- `content` pole by mělo obsahovat tvůj nový štítek

## 🔍 DEBUG - POKUD NEVIDÍŠ DATA:

### A) Zkontroluj Console Errors:
```javascript
// V browser console:
localStorage.getItem('sb-access-token') // Měl bys vidět token
```

### B) Zkontroluj Network Tab (F12):
1. Filtr: "supabase"
2. Přidej štítek do Canvas
3. Měl bys vidět POST request na `/rest/v1/user_canvas_data`
4. Status měl být `201` (created) nebo `200` (updated)
5. Pokud vidíš `401` nebo `403` → RLS policy problém

### C) Zkontroluj RLS Policies v Supabase:
```sql
-- V Supabase SQL Editor:
SELECT * FROM pg_policies WHERE tablename = 'user_canvas_data';
```

Měl bys vidět policies:
- `Users can insert their own canvas data`
- `Users can read their own canvas data`
- `Users can update their own canvas data`

## ⚡ RYCHLÝ FIX - POKUD NEFUNGUJE:

### 1. Disable RLS dočasně (JEN PRO TESTING!):
```sql
-- V Supabase SQL Editor:
ALTER TABLE user_canvas_data DISABLE ROW LEVEL SECURITY;
```

Zkus znovu zapsat → pokud funguje = RLS policy problém

### 2. Re-enable RLS a oprav policies:
```sql
-- Re-enable:
ALTER TABLE user_canvas_data ENABLE ROW LEVEL SECURITY;

-- Smaž staré policies:
DROP POLICY IF EXISTS "Users can insert their own canvas data" ON user_canvas_data;
DROP POLICY IF EXISTS "Users can read their own canvas data" ON user_canvas_data;
DROP POLICY IF EXISTS "Users can update their own canvas data" ON user_canvas_data;

-- Vytvoř nové:
CREATE POLICY "Users can insert their own canvas data"
ON user_canvas_data FOR INSERT
TO authenticated
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can read their own canvas data"
ON user_canvas_data FOR SELECT
TO authenticated
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own canvas data"
ON user_canvas_data FOR UPDATE
TO authenticated
USING (auth.uid()::text = user_id);
```

## 🎬 VIDEO TUTORIAL - CO HLEDAT:

### V Developer Console (F12):
1. **Úspěšný zápis vypadá:**
```
✅ Canvas saved: segments
POST /rest/v1/user_canvas_data 201
```

2. **Error vypadá:**
```
❌ Save failed: Error
POST /rest/v1/user_canvas_data 401 Unauthorized
```

### V Supabase Dashboard:
1. Otevři Table Editor
2. Filtruj podle `user_id` (tvůj user ID z localstorage)
3. Měl bys vidět řádky pro každou sekci Canvas:
   - segments
   - value
   - channels
   - relationships
   - revenue
   - costs
   - activities
   - resources
   - partners

## 💡 PRO TIP:

Přidej toto do konzole pro live monitoring:
```javascript
// Watch all Supabase calls:
const originalFetch = window.fetch;
window.fetch = function(...args) {
  if (args[0].includes('supabase')) {
    console.log('🔵 Supabase Call:', args[0], args[1]);
  }
  return originalFetch.apply(this, args);
};
```

Teď uvidíš VŠECHNY Supabase requesty v console!

## ✅ CHECKLIST:

- [ ] Mám správný VITE_SUPABASE_URL v .env?
- [ ] Mám správný VITE_SUPABASE_ANON_KEY v .env?
- [ ] Jsem přihlášený (mám token v localStorage)?
- [ ] RLS policies jsou vytvořené?
- [ ] Vidím POST requesty v Network tabu?
- [ ] Status je 200 nebo 201 (ne 401/403)?
- [ ] Data se objevují v Supabase Dashboard?

Pokud všechny odpovědi jsou ✅, Supabase funguje správně!
