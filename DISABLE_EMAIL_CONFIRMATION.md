# 🔧 **DISABLE EMAIL CONFIRMATION - SUPABASE**

Pokud vidíš: `⚠️ Check your email for confirmation`

A nechceš potvrzovat email při každém testu → VYPNI email confirmation!

---

## 📝 **POSTUP:**

### **1. Jdi do Supabase Dashboard**
```
https://supabase.com/dashboard/project/[TVUJ_PROJECT_ID]/settings/auth
```

### **2. Najdi "Email Confirmation"**
```
Settings → Authentication → Email
```

### **3. Najdi sekci "Confirm email"**
```
☑ Confirm email  ← Odškrtni tohle!
```

### **4. Save changes**
```
Click "Save"
```

---

## ✅ **PO DISABLE:**

**Teď můžeš vytvořit usera bez potvrzení:**

```javascript
// V Console:
await devTools.createTestUser()

// ✅ Test user created (no email needed!)

await devTools.login()

// ✅ Logged in!
```

---

## 🎯 **ALTERNATIVA: Manual Confirm**

Pokud NECHCEŠ vypnout confirmation:

### **Metoda A: Dashboard (nejrychlejší)**
```
1. Supabase → Authentication → Users
2. Find: test@podnikatelskactvrtka.cz
3. Click user → "Confirm email"
4. Save
5. await devTools.login()
```

### **Metoda B: Email**
```
1. Check email inbox
2. Click confirmation link
3. await devTools.login()
```

---

## 💡 **DOPORUČENÍ:**

**Pro development:**
```
✅ DISABLE email confirmation
→ Rychlejší testing
→ Méně friction
```

**Pro production:**
```
✅ ENABLE email confirmation
→ Bezpečnost
→ Valid emails only
```

---

## 🔄 **TOGGLE WHEN NEEDED:**

```
Development:  ☐ Confirm email (disabled)
Production:   ☑ Confirm email (enabled)
```

Můžeš přepínat podle potřeby! 🎯
