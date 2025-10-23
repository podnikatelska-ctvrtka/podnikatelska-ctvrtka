# 🔧 DEV MODE - Reálný testovací uživatel

## ❌ **PROBLÉM S FAKE DEV TOKENEM:**

Současný dev token vytváří **fake user** který není v tabulce `users`, což způsobuje:

- ❌ Progress se neukazuje (foreign key error)
- ❌ Achievements se neodemykají
- ❌ Canvas data se neukládají správně
- ❌ Není možné testovat reálné flow

---

## ✅ **ŘEŠENÍ: VYTVOŘIT REÁLNÉHO TEST USERA**

### **Krok 1: Vytvoř test usera v Supabase**

```sql
-- 1. Vytvoř auth user
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
VALUES (
  'test-user-12345678-1234-1234-1234-123456789012',
  'test@podnikatelskacitvrtka.cz',
  crypt('TestHeslo123!', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now()
);

-- 2. Vytvoř user v tabulce users (DŮLEŽITÉ!)
INSERT INTO public.users (
  id,
  email,
  created_at
)
VALUES (
  'test-user-12345678-1234-1234-1234-123456789012',
  'test@podnikatelskacitvrtka.cz',
  now()
);
```

---

### **Krok 2: Updatuj devToken.ts**

```typescript
// /lib/devToken.ts

export const DEV_TOKEN_CONFIG = {
  enabled: import.meta.env.DEV,
  // ✅ REÁLNÝ TEST USER (existuje v Supabase)
  userId: 'test-user-12345678-1234-1234-1234-123456789012',
  email: 'test@podnikatelskacitvrtka.cz',
  // ⚠️ Pro auto-login s reálným userem musíme použít supabase.auth.signInWithPassword
  autoLogin: true
};

// ✅ NOVÁ FUNKCE: Auto-login s reálným userem
export async function devAutoLogin() {
  if (!DEV_TOKEN_CONFIG.enabled || !DEV_TOKEN_CONFIG.autoLogin) {
    return null;
  }
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: DEV_TOKEN_CONFIG.email,
      password: 'TestHeslo123!'
    });
    
    if (error) {
      console.error('❌ Dev auto-login failed:', error);
      return null;
    }
    
    console.log('✅ Dev auto-login successful:', data.user.email);
    return data.user;
  } catch (err) {
    console.error('❌ Dev auto-login error:', err);
    return null;
  }
}
```

---

### **Krok 3: Updatuj App.tsx**

```typescript
// /App.tsx

useEffect(() => {
  const initAuth = async () => {
    // ✅ DEV MODE: Auto-login s reálným userem
    if (import.meta.env.DEV && DEV_TOKEN_CONFIG.autoLogin) {
      const devUser = await devAutoLogin();
      if (devUser) {
        setUser(devUser);
        setLoading(false);
        return;
      }
    }
    
    // Normal auth flow...
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
    setLoading(false);
  };
  
  initAuth();
}, []);
```

---

## 🎯 **VÝHODY REÁLNÉHO TEST USERA:**

### **✅ CO BUDE FUNGOVAT:**

1. **Progress ukládání** - foreign key v `user_progress` funguje
2. **Achievements** - budou se odemykat a ukládat
3. **Canvas data** - budou se správně ukládat
4. **Dashboard stats** - budou se zobrazovat správně
5. **Testování flow** - můžeš testovat celé flow jako reálný user

### **❌ CO NEFUNGOVALO S FAKE TOKENEM:**

```
Fake user: f29161e1-4e3f-4c43-baff-33ae1a6f29f5
↓
Neexistuje v tabulce users
↓
Foreign key error při ukládání progress
↓
Achievements se neukazují
```

---

## 📋 **CHECKLIST:**

- [ ] Spusť SQL script v Supabase SQL Editor
- [ ] Updatuj `/lib/devToken.ts` s novým userId
- [ ] Implementuj `devAutoLogin()` funkci
- [ ] Updatuj `App.tsx` aby používal `devAutoLogin()`
- [ ] Testuj: Refresh (F5) → Měl bys být automaticky přihlášený
- [ ] Zkontroluj: Progress se ukládá, achievements se odemykají

---

## 🔒 **BEZPEČNOST:**

```
✅ Test user je JEN pro DEV mode (import.meta.env.DEV)
✅ Heslo je hashované v databázi
✅ Email je jasně označený jako test (test@...)
✅ V production buildu se auto-login NEVYKONÁ
```

---

## 🚀 **POUŽITÍ:**

### **Dev mode:**
```bash
npm run dev
# → Auto-login s test userem
# → Všechno funguje jako reálný user
```

### **Production:**
```bash
npm run build
# → Auto-login je VYPNUTÝ
# → Normální login flow
```

---

## 💡 **ALTERNATIVA: Disable dev mode úplně**

Pokud chceš testovat s reálným produkčním flow:

```typescript
// /lib/devToken.ts
export const DEV_TOKEN_CONFIG = {
  enabled: false, // ❌ Vypni dev mode
  autoLogin: false
};
```

Pak se přihlaš normálně přes login page s reálným účtem.

---

## 🎯 **DOPORUČENÍ:**

**Pro development:**
- ✅ Použij reálného test usera s auto-login
- ✅ Rychlé testování bez neustálého loginu
- ✅ Všechna data se ukládají správně

**Pro finální testování před launch:**
- ✅ Vypni dev mode
- ✅ Vytvoř reálný účet přes registraci
- ✅ Testuj celé flow od začátku do konce

---

## 📝 **NEXT STEPS:**

1. Spusť SQL script → vytvoř test usera
2. Updatuj devToken.ts → reálný userId
3. Implementuj devAutoLogin()
4. Testuj → všechno by mělo fungovat!
