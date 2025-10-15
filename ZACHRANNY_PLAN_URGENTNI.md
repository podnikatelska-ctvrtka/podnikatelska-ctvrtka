# 🚨 ZÁCHRANNÝ PLÁN - URGENTNÍ

## 📊 SOUČASNÁ SITUACE:

### **PRODUKCE (Netlify) - www.podnikatelskactvrtka.cz:**
- ✅ Komponenty se ZOBRAZUJÍ
- ❌ Data se NEUKLÁDAJÍ (Supabase error)
- ❓ Verze NEZNÁMÁ (nic se nepushovalo)

### **LOKÁLNĚ (Figma Make):**
- ❌ Odstraněný Motion = možná rozbitý
- ⚠️ Včerejší změny (FAPI, GoPay, env)
- ❓ Nevíme co funguje a co ne

---

## ⚡ ŘEŠENÍ 1: OPRAVIT JEN UKLÁDÁNÍ (DOPORUČUJI!)

**PONECHAT obě verze jak jsou a opravit JEN Supabase ukládání!**

### **Proč to nefunguje na produkci:**

**Diagnóza:** Produkce ukládá do Supabase, ale Supabase **BLOKUJE zápis**.

**Možné příčiny:**
1. ❌ RLS Policies jsou ZAPNUTÉ (blokují PUBLIC write)
2. ❌ user_id formát je špatný (UUID vs TEXT)
3. ❌ Token verification selhává
4. ❌ CORS problém mezi Netlify a Supabase

---

## 🔧 KROK ZA KROKEM FIX:

### **KROK 1: Zjistit PŘESNÝ error (5 min)**

**Otevři produkci s tokenem:**
```
https://www.podnikatelskactvrtka.cz/course-v3?token=TVUJ_TOKEN
```

**Otevři Console (F12) a udělej:**

1. **Přejdi na Lekci 1**
2. **Klikni "Začít cvičení"**
3. **Přidej položku do Canvas**
4. **Koukni do Console na červený error**

**Jaký error vidíš?**
- `406 Not Acceptable` → RLS blokuje
- `401 Unauthorized` → Token problém
- `500 Internal Server Error` → Supabase bug
- `CORS error` → Doména není povolená

---

### **KROK 2: Fix podle erroru**

#### **A) Pokud je 406 Not Acceptable:**

**Příčina:** RLS policies blokují PUBLIC INSERT/UPDATE

**Řešení:** Spusť v Supabase SQL Editor:

```sql
-- VYPNOUT RLS pro všechny tables
ALTER TABLE user_canvas_data DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_vpc_data DISABLE ROW LEVEL SECURITY;
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Nebo POVOLIT PUBLIC access:
DROP POLICY IF EXISTS "Enable all for public" ON user_canvas_data;
CREATE POLICY "Enable all for public" ON user_canvas_data
  FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Enable all for public" ON user_progress;
CREATE POLICY "Enable all for public" ON user_progress
  FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Enable all for public" ON user_vpc_data;
CREATE POLICY "Enable all for public" ON user_vpc_data
  FOR ALL USING (true) WITH CHECK (true);
```

#### **B) Pokud je 401 Unauthorized:**

**Příčina:** Token se neověřuje správně

**Test v Console:**
```javascript
// V Console (F12):
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
console.log('Token:', token);

// Ověř že token existuje v DB:
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('access_token', token);

console.log('User found:', data);
```

**Řešení:** Pokud user není nalezen, zkontroluj:
1. Je token správně v URL?
2. Je token v Supabase `users` tabulce?
3. Je sloupec `access_token` typu TEXT?

#### **C) Pokud je CORS error:**

**Příčina:** Netlify doména není v Supabase allowed origins

**Řešení:**
1. Otevři Supabase Dashboard
2. Settings → API → URL Configuration
3. Přidej do **Site URL**: `https://www.podnikatelskactvrtka.cz`
4. Přidej do **Redirect URLs**: `https://www.podnikatelskactvrtka.cz/*`

#### **D) Pokud je user_id UUID error:**

**Příčina:** Sloupec `user_id` je UUID, ale posíláš STRING

**Řešení:** Změň typ sloupce:
```sql
-- Backup dat:
CREATE TABLE user_canvas_data_backup AS SELECT * FROM user_canvas_data;

-- Změň typ:
ALTER TABLE user_canvas_data 
  ALTER COLUMN user_id TYPE TEXT;

ALTER TABLE user_progress 
  ALTER COLUMN user_id TYPE TEXT;

ALTER TABLE user_vpc_data 
  ALTER COLUMN user_id TYPE TEXT;
```

---

## 🚀 KROK 3: Test po opravě

**Po aplikaci fix v Supabase:**

1. **Hard refresh produkce:** `Ctrl + Shift + R`
2. **Vyčisti cache:**
   ```javascript
   localStorage.clear();
   sessionStorage.clear();
   location.reload();
   ```
3. **Zkus přidat položku znovu**
4. **Refresh stránku → položka MÁ BÝT TAM!**

---

## 📦 ŘEŠENÍ 2: OBNOVIT ZE ZÁLOHY (POSLEDNÍ MOŽNOST)

**Pokud Fix 1 nefunguje, obnovíme ze zálohy.**

### **Které ZIPy máš?**

Řekni mi názvy ZIPů a jejich data:
```
Example:
- podnikatelska-ctvrtka-2024-01-10.zip (včera ráno)
- podnikatelska-ctvrtka-2024-01-09.zip (předevčírem)
```

### **Co hledat v ZIPu:**

**OBNOVIT POUZE tyto soubory:**
```
/components/CourseDemoV3.tsx
/components/BusinessModelCanvasSimple.tsx
/components/GuidedTour.tsx
/lib/supabase.ts
/lib/courseProgress.ts
```

**NEOBNOVOVAT:**
```
/netlify/functions/* (FAPI nastavení)
/.env (credentials)
/components/OrderPage.tsx (GoPay)
/components/FapiCheckoutForm.tsx
```

---

## ✅ MŮJ DOPORUČENÝ POSTUP:

### **PRIORITA 1: Opravit Supabase (30 min)**

1. ✅ Zjistit přesný error (F12)
2. ✅ Spustit správný SQL fix
3. ✅ Otestovat ukládání
4. ✅ Pokud funguje → HOTOVO!

### **PRIORITA 2: Vrátit lokální verzi (pokud Supabase nefunguje)**

1. ✅ Najít poslední funkční ZIP
2. ✅ Extrahovat POUZE kurz komponenty
3. ✅ Nahradit tady
4. ✅ Otestovat lokálně

### **PRIORITA 3: Push na Netlify (až všechno funguje)**

1. ✅ Commit lokální verze
2. ✅ Push do Git
3. ✅ Netlify auto-deploy
4. ✅ Otestovat produkci

---

## 🎯 CO POTŘEBUJU OD TEBE:

**TEĎKA HNED:**

1. **Otevři produkci** s tokenem
2. **Zkus přidat položku**
3. **Pošli mi screenshot Console erroru** (F12 → červený text)

**PAK:**

4. **Pošli mi názvy ZIPů** co máš (s daty)
5. **Řekni mi jaký token používáš** (nebo email testovacího účtu)

---

## 🔥 ALTERNATIVA: NUCLEAR OPTION

**Pokud nic nefunguje:**

1. **Vytvořím NOVOU funkční verzi kurzu od nuly**
2. **Zkopíruji všechna data z produkce**
3. **Nastavím Supabase znovu**
4. **Deploy nové verze**

**Čas:** 2-3 hodiny  
**Riziko:** Nízké (backup všeho)  
**Výsledek:** 100% funkční kurz

---

## ❓ TVOJE ROZHODNUTÍ:

**Co chceš udělat?**

- [ ] A) Opravit Supabase (pošli screenshot erroru)
- [ ] B) Obnovit ze ZIPu (pošli názvy ZIPů)
- [ ] C) Nuclear option (přestavět kurz)

**ČEKÁM NA TVOJI ODPOVĚĎ! 🚀**
