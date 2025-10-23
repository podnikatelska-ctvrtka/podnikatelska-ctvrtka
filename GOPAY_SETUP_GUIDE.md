# 🔐 GoPay Setup Guide

## 📋 Co potřebuješ od GoPay

GoPay ti poslalo tyto údaje (buď testovací nebo ostré):

```
GOPAY_GOID=              # GoID (např. 8123456789)
GOPAY_CLIENT_ID=         # Client ID (např. 1234567890)
GOPAY_CLIENT_SECRET=     # Client Secret (např. AbCd1234...)
```

**🎯 DŮLEŽITÉ:**
- ✅ **Testovací prostředí:** https://gw.sandbox.gopay.com
- ✅ **Ostré prostředí:** https://gate.gopay.cz
- ✅ **Doména:** `podnikatelskactvrtka.cz` (path `/objednavka` nevadí!)

---

## ⚙️ **1. NASTAVENÍ NETLIFY ENVIRONMENT VARIABLES**

### **A) Otevři Netlify Dashboard:**

1. Jdi na **Site settings** → **Environment variables**
2. Přidej tyto proměnné:

```bash
# GoPay Credentials (TESTOVACÍ nebo OSTRÉ)
GOPAY_GOID=8123456789
GOPAY_CLIENT_ID=1234567890
GOPAY_CLIENT_SECRET=AbCd1234EfGh5678IjKl9012
GOPAY_ENVIRONMENT=sandbox    # nebo 'production' pro ostré

# GoPay API URLs
GOPAY_API_URL=https://gw.sandbox.gopay.com/api  # nebo gate.gopay.cz pro produkci

# Redirect URLs (po platbě)
GOPAY_RETURN_URL=https://podnikatelskactvrtka.cz/dekuji
GOPAY_NOTIFY_URL=https://podnikatelskactvrtka.netlify.app/.netlify/functions/gopay-webhook
```

### **B) Redeploy po nastavení:**

Po přidání environment variables musíš **REDEPLOY** stránku:
- Netlify → Deploys → Trigger deploy → Deploy site

---

## 🔧 **2. GOPAY WEBHOOK SETUP**

### **A) V GoPay administraci:**

1. **Přihlaš se do GoPay administrace**
2. Jdi na **Nastavení** → **Notifikace**
3. Nastav **Notification URL:**

```
https://podnikatelskactvrtka.netlify.app/.netlify/functions/gopay-webhook
```

4. Vyber **události** které chceš dostat:
   - ✅ `PAYMENT_CREATED` (platba vytvořena)
   - ✅ `PAYMENT_PAID` (platba zaplacena) ← **NEJDŮLEŽITĚJŠÍ!**
   - ✅ `PAYMENT_CANCELED` (platba zrušena)
   - ✅ `PAYMENT_TIMEOUTED` (platba vypršela)

---

## 📋 **3. CHECKLIST PŘED SPUŠTĚNÍM**

### **Testovací platba:**
- [ ] GoPay credentials v Netlify (testovací)
- [ ] `GOPAY_ENVIRONMENT=sandbox`
- [ ] Webhook URL nastavený v GoPay sandbox
- [ ] Test platba s kartou: `4111 1111 1111 1111` (GoPay testovací karta)

### **Ostrá platba:**
- [ ] GoPay credentials v Netlify (ostré)
- [ ] `GOPAY_ENVIRONMENT=production`
- [ ] `GOPAY_API_URL=https://gate.gopay.cz/api`
- [ ] Webhook URL nastavený v GoPay produkci
- [ ] Test s reálnou kartou (malá částka)

---

## 🔄 **4. FLOW PO PLATBĚ**

```
1. Uživatel vyplní checkout form → OrderPage.tsx
2. Frontend zavolá /.netlify/functions/gopay-create-payment
3. Netlify function vytvoří platbu v GoPay API
4. Uživatel je přesměrován na GoPay platební bránu
5. Po zaplacení:
   a) GoPay pošle webhook na /.netlify/functions/gopay-webhook
   b) Webhook uloží order do Supabase
   c) Webhook vytvoří uživatele s access tokenem
   d) Webhook pošle email s přístupem
   e) Uživatel je přesměrován na /dekuji?token=XXX
```

---

## 🚨 **TROUBLESHOOTING**

### **Problém: "Invalid credentials"**
- ✅ Zkontroluj že máš správný `GOPAY_ENVIRONMENT` (sandbox vs production)
- ✅ Credentials musí být pro správné prostředí

### **Problém: "Webhook nepřichází"**
- ✅ Zkontroluj Netlify Functions logs: Site → Functions → gopay-webhook
- ✅ Ověř že URL v GoPay je správná (včetně https://)
- ✅ Test webhook ručně: curl -X POST https://.../.netlify/functions/gopay-webhook

### **Problém: "Platba se vytvoří ale uživatel nemá přístup"**
- ✅ Zkontroluj Supabase RLS policies (public.users INSERT)
- ✅ Zkontroluj že webhook správně vytváří `access_token`
- ✅ Zkontroluj Supabase logs: Database → Logs

---

## 📖 **DALŠÍ KROKY**

1. ✅ **Přidej environment variables do Netlify**
2. ✅ **Vytvoř Netlify Functions** (`gopay-create-payment`, `gopay-webhook`)
3. ✅ **Uprav FapiCheckoutForm → GoPayCheckoutForm**
4. ✅ **Nastav webhook v GoPay admin**
5. ✅ **TESTUJ na sandbox prostředí!**
6. ✅ **Až funguje → přepni na production**

---

## 🎯 **POZNÁMKY**

### **Path `/objednavka` nevadí!**
GoPay kontroluje pouze DOMÉNU, ne celou URL:
- ✅ `podnikatelskactvrtka.cz/objednavka` → **FUNGUJE**
- ✅ `podnikatelskactvrtka.cz` → **FUNGUJE**
- ✅ `podnikatelskactvrtka.cz/cokoliv` → **FUNGUJE**

### **Testovací karty (sandbox):**
```
Číslo karty: 4111 1111 1111 1111
Expires: jakýkoliv budoucí měsíc/rok
CVV: 123
```

### **Return URL po platbě:**
```
https://podnikatelskactvrtka.cz/dekuji?token=[ACCESS_TOKEN]
```

Uživatel se automaticky přihlásí s tokenem a může jít na kurz!

---

**Autor:** Josef Čipera  
**Poslední update:** 22. ledna 2025  
**Verze:** 1.0
