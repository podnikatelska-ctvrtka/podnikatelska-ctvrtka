# 📱 MOBILNÍ TESTOVÁNÍ S NGROK - NEJRYCHLEJŠÍ!

## **❌ PROBLÉM:**
```
ERR_HTTP_RESPONSE_CODE_FAILURE
→ Windows Firewall blokuje port 5173
→ Mobil nemůže přistoupit k localhost
```

---

## **✅ ŘEŠENÍ: NGROK (5 MINUT SETUP!)**

### **Co je ngrok?**
```
- Vytvoří veřejný HTTPS tunel k tvému localhost
- Obejde firewall
- Funguje odkudkoliv (nejen na stejné WiFi!)
- ZDARMA pro dev testování!
```

---

## **🚀 SETUP:**

### **1. Spusť dev server (pokud neběží):**
```bash
npm run dev

# Měl bys vidět:
# ➜  Local: http://localhost:5173/
```

### **2. V NOVÉM terminálu spusť ngrok:**
```bash
# Nejrychlejší (s npx):
npx ngrok http 5173

# Nebo globální install:
npm install -g ngrok
ngrok http 5173
```

### **3. Zobrazí se něco jako:**
```
ngrok

Session Status                online
Account                       Free (Limited)
Version                       3.x.x
Region                        Europe (eu)
Latency                       12ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123.ngrok.io -> http://localhost:5173

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

### **4. ZKOPÍRUJ "Forwarding" URL:**
```
https://abc123.ngrok.io  ← TOHLE JE TVÁ VEŘEJNÁ URL!
```

---

## **📱 TESTOVÁNÍ NA MOBILU:**

### **URL s tokenem (přihlášení do kurzu):**
```
https://abc123.ngrok.io/course-v3?token=1759757068350-eyw8z2zo7t-4lrujeg6mkk
       ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
       Změň za svou ngrok URL!
```

### **Landing page:**
```
https://abc123.ngrok.io/
```

---

## **✅ VÝHODY NGROK:**

```
1. ✅ Obejde firewall
   → Žádné Windows Firewall starosti!

2. ✅ HTTPS (bezpečné)
   → PWA install funguje!

3. ✅ Funguje odkudkoliv
   → Nemusíš být na stejné WiFi!

4. ✅ Web Interface
   → http://127.0.0.1:4040 (vidíš všechny requesty!)

5. ✅ Zdarma
   → Pro dev testování stačí free tier!
```

---

## **📋 QUICK START:**

```bash
# Terminal 1: Dev server
npm run dev

# Terminal 2: Ngrok
npx ngrok http 5173

# Zkopíruj "Forwarding" URL z ngrok výstupu
# např: https://abc123.ngrok.io

# Na mobilu otevři:
https://abc123.ngrok.io/course-v3?token=1759757068350-eyw8z2zo7t-4lrujeg6mkk
```

---

## **🔍 NGROK WEB INTERFACE:**

### **Otevři v prohlížeči:**
```
http://127.0.0.1:4040
```

### **Co vidíš:**
```
✅ Všechny HTTP requesty
✅ Response codes
✅ Request/Response headers
✅ Body data
✅ Timing
✅ Replay requests!
```

**Super pro debugging!** 🎯

---

## **⚠️ LIMITY FREE TIER:**

```
✅ Můžeš používat pro dev!
⚠️ Ngrok URL se MĚNÍ při každém restartu
⚠️ Session timeout po 2 hodinách (musíš restartovat)
⚠️ Limitovaný počet požadavků

💡 Pro dev testování to STAČÍ! ✅
```

---

## **🎯 TESTOVÁNÍ:**

### **1. Základní přístup:**
```
https://abc123.ngrok.io/  → Landing page funguje? ✅
```

### **2. Přihlášení s tokenem:**
```
https://abc123.ngrok.io/course-v3?token=1759757068350-eyw8z2zo7t-4lrujeg6mkk
→ Přihlášen jako m.stepan@twotechgroup.cz? ✅
```

### **3. PWA install:**
```
Chrome → Menu → "Přidat na plochu" → Funguje? ✅
(HTTPS je vyžadováno, ngrok to má!)
```

### **4. Touch/Swipe:**
```
- Bottom Sheet funguje? ✅
- Swipe mezi lekcemi? ✅
- Collapsible sekce? ✅
```

---

## **❌ TROUBLESHOOTING:**

### **"Command not found: ngrok":**
```bash
# Zkus s npx (stáhne to automaticky):
npx ngrok http 5173

# Nebo nainstaluj globálně:
npm install -g ngrok
```

### **"Failed to start tunnel":**
```bash
# Možná port 5173 neběží
# Zkontroluj že dev server běží:
npm run dev
```

### **"Session expired":**
```bash
# Ngrok free vypršel (2 hodiny)
# Restart:
Ctrl+C
npx ngrok http 5173
# → Nová URL! Zkopíruj ji znovu
```

---

## **💡 PRO TIPS:**

### **1. Ulož si ngrok URL do poznámek:**
```
https://abc123.ngrok.io/course-v3?token=1759757068350-eyw8z2zo7t-4lrujeg6mkk

→ Copy/paste na mobilu kdykoliv!
```

### **2. QR kód pro rychlý přístup:**
```
1. Jdi na: https://www.qr-code-generator.com/
2. Vlož ngrok URL
3. Vygeneruj QR
4. Naskenuj mobilem → Instant! 🎯
```

### **3. Sdílení s kolegy:**
```
Ngrok URL funguje pro VŠECHNY!
→ Můžeš poslat kolegům na testování!
```

---

## **✅ CHECKLIST:**

```
⬜ 1. npm run dev (Terminal 1)
⬜ 2. npx ngrok http 5173 (Terminal 2)
⬜ 3. Zkopíruj "Forwarding" URL (https://abc123.ngrok.io)
⬜ 4. Na mobilu: https://abc123.ngrok.io/course-v3?token=...
⬜ 5. Testuj touch/swipe/PWA!
⬜ 6. Otevři http://127.0.0.1:4040 (Web Interface pro debug)
```

---

## **🎯 TL;DR:**

```
PROBLÉM:
  Windows Firewall → ERR_HTTP_RESPONSE_CODE_FAILURE

ŘEŠENÍ:
  npx ngrok http 5173 → Veřejná HTTPS URL ✅

VÝSLEDEK:
  https://abc123.ngrok.io → Funguje odkudkoliv! 🚀
```

---

**Ngrok je NEJRYCHLEJŠÍ řešení pro mobilní testování!** 🔥📱✨
