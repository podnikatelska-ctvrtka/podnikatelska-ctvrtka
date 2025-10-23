# 🔧 **FIX: Auto-Login Failed**

**Error:** `❌ Auto-login failed: Invalid login credentials`

**Důvod:** Test účet neexistuje v Supabase!

---

## ⚡ **3 RYCHLÁ ŘEŠENÍ:**

### **✅ OPTION 1: Vytvoř test user v Console** (10 sekund)

**1. Otevři Console (F12)**

**2. Zadej:**
```javascript
await devTools.createTestUser()
```

**3. Počkej na response:**
```
✅ Test user created: test@podnikatelskactvrtka.cz
```

**4. Click "Quick Login" v banneru**
```
→ ✅ Funguje!
```

---

### **✅ OPTION 2: Použij svůj účet** (5 sekund)

**1. Otevři:** `/lib/devToken.ts`

**2. Změň řádek 21-22:**
```typescript
export const TEST_USER = {
  email: 'TVUJ_EMAIL@example.com',    // ← Tvůj email
  password: 'TVOJE_HESLO',            // ← Tvoje heslo
  name: 'Test User',
};
```

**3. Save & restart:**
```bash
npm run dev
```

**4. Click "Quick Login"**
```
→ ✅ Funguje!
```

---

### **✅ OPTION 3: Supabase Dashboard** (1 minuta)

**1. Jdi na:**
```
https://supabase.com/dashboard/project/[PROJECT_ID]/auth/users
```

**2. Click "Add User"**

**3. Vyplň:**
```
Email:         test@podnikatelskactvrtka.cz
Password:      TestPass123!
Auto Confirm:  ✅ YES
```

**4. Click "Create User"**

**5. Click "Quick Login" v banneru**
```
→ ✅ Funguje!
```

---

## 🎯 **DOPORUČUJI:**

**Použij OPTION 1** (nejrychlejší):

```javascript
// 1. F12 → Console
await devTools.createTestUser()

// 2. Počkej...
// ✅ Test user created

// 3. Click "Quick Login"
// ✅ Done!
```

---

## 📝 **POZNÁMKY:**

### **Email Confirmation:**
Pokud máš email confirmation zapnutou v Supabase:
- Test user dostane confirmation email
- Potvrď email, nebo vypni confirmation v Settings

### **User Already Exists:**
Pokud vidíš: `User already registered`
- User už existuje!
- Zkus rovnou: `devTools.login()`

---

## ✅ **PO VYTVOŘENÍ:**

**Console commands fungují:**
```javascript
await devTools.login()      // Login
await devTools.session()    // Session info
await devTools.user()       // User info
await devTools.logout()     // Logout
```

**Quick Login funguje:**
```
Click "Quick Login" v banneru → ✅
```

---

**Zkus OPTION 1 a napiš, jestli to funguje!** 🚀
