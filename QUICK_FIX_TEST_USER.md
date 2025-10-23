# 🔧 **QUICK FIX - TESTOVACÍ ÚČET**

**Problém:** `❌ Auto-login failed: Invalid login credentials`

**Důvod:** Testovací účet `test@podnikatelskactvrtka.cz` neexistuje v Supabase!

---

## ⚡ **NEJRYCHLEJŠÍ FIX (30 sekund):**

### **Použij svůj existující účet!**

**1. Otevři soubor:**
```
/lib/devToken.ts
```

**2. Najdi řádek 21-23:**
```typescript
export const TEST_USER = {
  email: 'test@podnikatelskactvrtka.cz',  // ← ZMĚŇ TADY
  password: 'TestPass123!',                // ← A TADY
  name: 'Test User',
};
```

**3. Změň na svůj účet:**
```typescript
export const TEST_USER = {
  email: 'TVUJ_EMAIL@example.com',        // ← Tvůj email
  password: 'TVOJE_HESLO',                // ← Tvoje heslo
  name: 'Test User',
};
```

**4. Restart dev server:**
```bash
# Ctrl+C
npm run dev
```

**5. Click "Quick Login":**
```
→ ✅ Mělo by fungovat!
```

---

## 🎯 **ALTERNATIVA: Vytvoř test user v Supabase**

### **Metoda A: Přes Dashboard** (Doporučeno)

**1. Jdi do Supabase Dashboard:**
```
https://supabase.com/dashboard/project/[TVUJ_PROJECT_ID]/auth/users
```

**2. Click "Add User":**
```
Email:         test@podnikatelskactvrtka.cz
Password:      TestPass123!
Auto Confirm:  ✅ YES  ← DŮLEŽITÉ!
```

**3. Click "Create User"**

**4. Restart dev server:**
```bash
npm run dev
```

**5. Click "Quick Login":**
```
→ ✅ Funguje!
```

---

### **Metoda B: Přes Console** (Pro pokročilé)

**1. Otevři Console (F12) na tvé aplikaci:**
```
http://localhost:5173
```

**2. Zadej do console:**
```javascript
// Import Supabase
import { supabase } from './lib/supabase';

// Vytvoř test usera
const { data, error } = await supabase.auth.signUp({
  email: 'test@podnikatelskactvrtka.cz',
  password: 'TestPass123!',
  options: {
    data: {
      full_name: 'Test User',
    }
  }
});

if (error) {
  console.error('Error:', error.message);
} else {
  console.log('✅ User created:', data);
}
```

**POZNÁMKA:** Pokud máš email confirmation zapnutou, budeš muset potvrdit email!

---

### **Metoda C: Disable Email Confirmation** (Nejjednodušší pro dev)

**1. Jdi do Supabase Dashboard:**
```
Authentication → Settings → Auth Providers → Email
```

**2. Najdi "Confirm email":**
```
☐ Confirm email  ← VYPNI (disable)
```

**3. Save**

**4. Teď můžeš vytvořit usera bez potvrzení emailu!**

---

## 🔍 **ZKONTROLUJ EXISTUJÍCÍ UŽIVATELE:**

### **V Console:**
```javascript
// Import Supabase
import { supabase } from './lib/supabase';

// Get all users (pokud máš admin přístup)
const { data, error } = await supabase
  .from('auth.users')
  .select('email');

console.log('Users:', data);
```

### **V Supabase Dashboard:**
```
Authentication → Users
→ Uvidíš seznam všech uživatelů
```

**Máš tam nějakého uživatele?**
```
✅ ANO → Použij jeho credentials v devToken.ts
❌ NE  → Vytvoř nového (viz výše)
```

---

## 🎬 **DOPORUČENÝ POSTUP:**

### **Rychlé řešení (použij existující účet):**

```typescript
// 1. Otevři /lib/devToken.ts
// 2. Změň TEST_USER credentials na svůj účet
export const TEST_USER = {
  email: 'TVUJ_EMAIL@example.com',     // ← Změň
  password: 'TVOJE_HESLO',             // ← Změň
  name: 'Test User',
};

// 3. Save & restart: npm run dev
// 4. Click "Quick Login"
// 5. ✅ Done!
```

---

### **Production řešení (vytvoř dedikovaný test účet):**

```
1. Supabase Dashboard
   → Authentication → Users → Add User
   
2. Credentials:
   Email:    test@podnikatelskactvrtka.cz
   Password: TestPass123!
   Auto Confirm: ✅

3. Click Create

4. ✅ Test user ready!
```

---

## 🚨 **POZNÁMKY:**

### **Email Confirmation:**
Pokud máš email confirmation zapnutou v Supabase:
```
→ Nový user MUSÍ potvrdit email
→ Nebo: disable email confirmation pro development
→ Nebo: use "Auto Confirm" při vytváření usera v Dashboard
```

### **RLS Policies:**
Zkontroluj, že máš RLS policies nastavené správně:
```sql
-- User musí mít přístup k svým datům
-- Check v Supabase Dashboard → Database → Policies
```

### **Dev vs Production:**
```
DEV:   Používej test účet s dummy daty
PROD:  Test účet by neměl existovat (nebo disable dev mode)
```

---

## ✅ **QUICK CHECKLIST:**

```bash
☐ Zkontroloval jsem, jestli mám nějakého uživatele v Supabase
☐ Buď jsem změnil TEST_USER na svůj účet
☐ Nebo jsem vytvořil nový test účet v Dashboard
☐ Restart dev server (npm run dev)
☐ Click "Quick Login" v banneru
☐ ✅ Funguje!
```

---

## 🎯 **CO UDĚLAT TEĎKA:**

### **OPTION 1: Fastest (použij svůj účet)**
```
1. Open: /lib/devToken.ts
2. Change: TEST_USER email & password
3. Save
4. Restart: npm run dev
5. Click: "Quick Login"
→ ✅ Works!
```

### **OPTION 2: Create test user**
```
1. Go: Supabase Dashboard → Auth → Users
2. Click: "Add User"
3. Email: test@podnikatelskactvrtka.cz
4. Password: TestPass123!
5. Auto Confirm: ✅
6. Click: "Create"
→ ✅ Test user created!
```

---

**Co preferuješ?**
1. Změnit credentials na svůj účet? (5 sekund)
2. Vytvořit nový test účet? (1 minuta)

**Napiš mi a pomůžu!** 😊
