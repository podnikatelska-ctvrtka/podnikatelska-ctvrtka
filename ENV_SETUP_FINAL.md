# 🔑 ENV SETUP - FINÁLNÍ KONFIGURACE

## ✅ CO POTŘEBUJEŠ NASTAVIT V NETLIFY:

### **Netlify Dashboard → Site Settings → Environment Variables**

```env
# SMARTEMAILING (už máš!)
SMARTEMAILING_USERNAME=cipera@byznysuj.cz
SMARTEMAILING_API_KEY=4gi28ahu9tmv2lop1y8dy36pmec4og2c8gwsjgxm
SMARTEMAILING_LIST_ID=2

# FAPI (nově!)
FAPI_USERNAME=cipera@iting.cz
FAPI_API_KEY=4gi28ahu9tmv2lop1y8dy36pmec4og2c8gwsjgxm
FAPI_PRODUCT_ID=362812
FAPI_ACCOUNT_ID=[POTŘEBUJU OD TEBE - viz níže]
```

---

## ⚠️ FAPI_ACCOUNT_ID - KDE NAJÍT:

### **MOŽNOST 1: Z API URL**

```
1. ✅ Přihlaš se na https://app.fapi.cz
2. ✅ Klikni vpravo nahoře na profil → Nastavení → API
3. ✅ Najdi "API URL" 

Vypadá to např. takto:
https://app.fapi.cz/api/v1/accounts/123456
                                    ^^^^^^
                                  TOHLE JE ID!
```

---

### **MOŽNOST 2: Z URL když jsi přihlášený**

```
Když jsi přihlášený v FAPI, koukni na URL:
https://app.fapi.cz/admin/123456/dashboard
                          ^^^^^^
                        ACCOUNT ID!
```

---

### **MOŽNOST 3: Zkus FAPI API endpoint**

```bash
# Test API request:
curl -u "cipera@iting.cz:4gi28ahu9tmv2lop1y8dy36pmec4og2c8gwsjgxm" \
  https://app.fapi.cz/api/v1/accounts

# Response obsahuje tvoje account ID
```

---

## 📋 CHECKLIST:

```
ENV PROMĚNNÉ:
☑️ SMARTEMAILING_USERNAME
☑️ SMARTEMAILING_API_KEY
☑️ SMARTEMAILING_LIST_ID
☑️ FAPI_USERNAME
☑️ FAPI_API_KEY
☑️ FAPI_PRODUCT_ID (362812)
☐ FAPI_ACCOUNT_ID [POŠLI MI!]
```

---

## 🔧 JAK NASTAVIT V NETLIFY:

```
1. ✅ Jdi na: app.netlify.com
2. ✅ Vyber svůj site (podnikatelska-ctvrtka)
3. ✅ Site settings → Environment variables
4. ✅ Klikni "Add a variable"
5. ✅ Vyplň:
   Key: FAPI_ACCOUNT_ID
   Value: [tvoje ID]
   Scopes: All (production, deploy previews, branch deploys)
6. ✅ Save
```

---

## 🧪 TESTOVÁNÍ:

### **Lokálně (.env soubor):**

```bash
# Vytvoř .env v root projektu:
FAPI_USERNAME=cipera@iting.cz
FAPI_API_KEY=4gi28ahu9tmv2lop1y8dy36pmec4og2c8gwsjgxm
FAPI_PRODUCT_ID=362812
FAPI_ACCOUNT_ID=123456

# Pak spusť:
netlify dev
```

---

### **Produkce (Netlify ENV):**

```bash
# Po nastavení ENV v Netlify Dashboard:
1. ✅ Redeploy site (Deploys → Trigger deploy)
2. ✅ ENV se načtou automaticky
3. ✅ Testuj /objednavka
```

---

## 📞 POŠLI MI FAPI_ACCOUNT_ID!

Stačí to jedno číslo a můžeme jít live! 🚀
