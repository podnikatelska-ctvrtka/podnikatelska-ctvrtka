# ✅ **DEV TOKEN - ERROR FIX**

**Opraveno:** TypeError: Cannot read properties of undefined (reading 'DEV')

---

## 🔧 **CO BYLO OPRAVENO:**

### **1. lib/devToken.ts**

**Před:**
```typescript
export const isDev = import.meta.env.DEV || window.location.hostname === 'localhost';
```

**Po:**
```typescript
export const isDev = (typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || 
   window.location.hostname === '127.0.0.1' ||
   window.location.port === '5173'));
```

**Změny:**
- ✅ Přidán `typeof window !== 'undefined'` check
- ✅ Odstraněn `import.meta.env.DEV` (způsoboval chybu)
- ✅ Přidána kontrola na port 5173 (Vite dev server)
- ✅ Přidána kontrola na 127.0.0.1

---

### **2. Safe Guards pro localStorage**

**getDevToken():**
```typescript
export function getDevToken(): string | null {
  if (!isDev || typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(DEV_TOKEN_KEY);
  } catch (e) {
    return null;
  }
}
```

**setDevToken():**
```typescript
export function setDevToken(token: string): void {
  if (!isDev || typeof window === 'undefined') return;
  try {
    localStorage.setItem(DEV_TOKEN_KEY, token);
    console.log('🔑 Dev token saved:', token.substring(0, 20) + '...');
  } catch (e) {
    console.error('Failed to save dev token:', e);
  }
}
```

**clearDevToken():**
```typescript
export function clearDevToken(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(DEV_TOKEN_KEY);
    localStorage.removeItem(DEV_USER_KEY);
    console.log('🗑️ Dev token cleared');
  } catch (e) {
    console.error('Failed to clear dev token:', e);
  }
}
```

**Změny:**
- ✅ Všechny funkce mají window check
- ✅ Try-catch bloky pro localStorage operace
- ✅ Graceful error handling

---

### **3. Safe Guard pro devTools.clear()**

**Před:**
```typescript
clear: () => {
  localStorage.clear();
  sessionStorage.clear();
  console.log('✅ Storage cleared');
}
```

**Po:**
```typescript
clear: () => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.clear();
      sessionStorage.clear();
      console.log('✅ Storage cleared');
    } catch (e) {
      console.error('Failed to clear storage:', e);
    }
  }
}
```

---

### **4. Safe Guard pro logDevHelp()**

**components/DevModeBanner.tsx:**

**Před:**
```typescript
export function logDevHelp() {
  if (!isDev) return;
  console.log(...);
}
```

**Po:**
```typescript
export function logDevHelp() {
  if (!isDev || typeof window === 'undefined') return;
  console.log(...);
}
```

---

### **5. TypeScript Definitions**

**Nový soubor:** `/lib/devToken.d.ts`

```typescript
export interface DevTools {
  login: () => Promise<boolean>;
  quickLogin: (email?: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  session: () => Promise<any>;
  user: () => Promise<any>;
  clear: () => void;
  credentials: {
    email: string;
    password: string;
    name: string;
  };
  help: () => void;
}

declare global {
  interface Window {
    devTools?: DevTools;
  }
}
```

**Benefit:**
- ✅ TypeScript autocomplete pro window.devTools
- ✅ Type safety
- ✅ Better IDE support

---

## ✅ **VÝSLEDEK:**

### **Dev Mode Detection:**
```typescript
// Funguje v:
localhost:5173          ✅
localhost:*             ✅
127.0.0.1:*            ✅

// Nefunguje v:
production domain       ❌
```

### **Error Handling:**
```typescript
// Všechny funkce jsou bezpečné:
- getDevToken()         → null if error
- setDevToken()         → silent fail
- clearDevToken()       → silent fail
- devTools.clear()      → silent fail
- logDevHelp()          → no-op if SSR
```

### **SSR Safe:**
```typescript
// Všechny funkce jsou SSR safe:
typeof window !== 'undefined'     ✅
try-catch pro localStorage        ✅
Graceful degradation              ✅
```

---

## 🧪 **TESTOVÁNÍ:**

### **1. Spusť dev server:**
```bash
npm run dev
```

### **2. Otevři console (F12):**
```javascript
// Mělo by být vidět:
🛠️ DEV MODE ACTIVE

Quick commands:
  devTools.login()    → Auto-login
  devTools.help()     → Show all commands

Test User:
  Email: test@podnikatelskactvrtka.cz
  Password: TestPass123!
```

### **3. Test devTools:**
```javascript
// Funguje?
await devTools.login()
// ✅ Logged in: test@podnikatelskactvrtka.cz

await devTools.session()
// Current session: {...}

devTools.clear()
// ✅ Storage cleared
```

### **4. Test banner:**
```
- Fialový banner nahoře?           ✅
- "Quick Login" button visible?     ✅
- Click funguje?                    ✅
- Po loginu: zelený status?         ✅
```

---

## 🚨 **COMMON ERRORS - FIXED:**

### **Error 1: Cannot read properties of undefined (reading 'DEV')**
```
❌ PŘED: import.meta.env.DEV
✅ PO: typeof window !== 'undefined' && window.location.hostname === 'localhost'
```

### **Error 2: localStorage is not defined**
```
❌ PŘED: localStorage.getItem()
✅ PO: try { localStorage.getItem() } catch { return null }
```

### **Error 3: window is not defined (SSR)**
```
❌ PŘED: window.location.hostname
✅ PO: typeof window !== 'undefined' && window.location.hostname
```

---

## 📦 **OPRAVENÉ SOUBORY:**

```
✅ /lib/devToken.ts              → Dev mode detection
✅ /lib/devToken.d.ts            → TypeScript types (NEW)
✅ /components/DevModeBanner.tsx → logDevHelp safe guard
```

---

## 🎯 **NEXT STEPS:**

### **1. Restart Dev Server:**
```bash
# Ctrl+C to stop
npm run dev
```

### **2. Hard Refresh:**
```
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

### **3. Check Console:**
```
F12 → Console
→ Mělo by být bez errors! ✅
```

### **4. Test Features:**
```
✅ Dev banner visible
✅ devTools available in console
✅ Quick login funguje
✅ No errors!
```

---

## ✨ **BONUS FEATURES:**

### **Type Safety:**
```typescript
// Teď máš autocomplete:
window.devTools.     // → IDE suggestions!
                 ↓
                login()
                logout()
                session()
                user()
                clear()
                credentials
                help()
```

### **Better Error Messages:**
```typescript
// Místo crash → graceful fail:
try {
  localStorage.setItem(...)
} catch (e) {
  console.error('Failed to save dev token:', e);
}
```

### **SSR Compatible:**
```typescript
// Funguje i při server-side rendering:
if (typeof window !== 'undefined') {
  // Browser only code
}
```

---

## 🎉 **HOTOVO!**

**Error fixed!** ✅

Teď by mělo vše fungovat bez chyb:
- Dev mode detection ✅
- localStorage operations ✅
- devTools v console ✅
- Dev banner ✅
- No TypeErrors ✅

---

**Test it out!** 🚀

```bash
npm run dev
→ http://localhost:5173
→ F12 → Console
→ await devTools.login()
→ ✅ Works!
```
