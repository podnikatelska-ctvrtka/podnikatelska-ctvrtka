# 📱 MOBILNÍ TESTOVÁNÍ S LOCALTUNNEL - BEZ REGISTRACE!

## **✅ PROČ LOCALTUNNEL?**

```
✅ ŽÁDNÁ REGISTRACE!
✅ ŽÁDNÝ AUTHTOKEN!
✅ JEDEN PŘÍKAZ → FUNGUJE!
✅ ZDARMA!
✅ HTTPS (PWA install funguje!)
```

---

## **🚀 QUICK START (30 SEKUND!):**

### **1. Spusť dev server (pokud neběží):**
```bash
npm run dev

# Měl bys vidět:
# ➜  Local: http://localhost:5173/
```

### **2. V NOVÉM terminálu spusť localtunnel:**
```bash
npx localtunnel --port 5173

# Zobrazí se:
# your url is: https://random-name-123.loca.lt
#              ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
#              TOHLE JE TVÁ VEŘEJNÁ URL! ✅
```

### **3. ZKOPÍRUJ URL a otevři na mobilu:**
```
https://random-name-123.loca.lt/course-v3?token=1759757068350-eyw8z2zo7t-4lrujeg6mkk
       ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
       Změň za svou localtunnel URL!
```

---

## **⚠️ PRVNÍ NÁVŠTĚVA - NORMÁLNÍ BEHAVIOR:**

### **Co se stane:**
```
1. Otevřeš URL na mobilu
2. Localtunnel ukáže warning stránku:
   "Tunnel Password"
   "Click here to continue to random-name-123.loca.lt"
3. KLIKNI NA LINK
4. → Stránka se načte! ✅
```

### **Toto je bezpečnostní opatření:**
```
✅ Je to normální
✅ Musíš to udělat jen JEDNOU
✅ Pak to funguje normálně!
```

---

## **📱 TESTOVÁNÍ:**

### **URL s tokenem (přihlášení do kurzu):**
```
https://random-name-123.loca.lt/course-v3?token=1759757068350-eyw8z2zo7t-4lrujeg6mkk
```

### **Landing page:**
```
https://random-name-123.loca.lt/
```

### **Dashboard:**
```
https://random-name-123.loca.lt/dashboard
```

---

## **✅ VÝHODY:**

```
1. ✅ BEZ REGISTRACE!
   → Žádný ngrok signup!

2. ✅ JEDEN PŘÍKAZ!
   → npx localtunnel --port 5173

3. ✅ HTTPS!
   → PWA install funguje!

4. ✅ OBEJDE FIREWALL!
   → Žádné Windows Defender starosti!

5. ✅ FUNGUJE ODKUDKOLIV!
   → Nemusíš být na WiFi!

6. ✅ ZDARMA!
   → Bez limitů!
```

---

## **📋 CHECKLIST:**

```
⬜ 1. npm run dev (Terminal 1)
⬜ 2. npx localtunnel --port 5173 (Terminal 2)
⬜ 3. Zkopíruj URL (https://random-name-123.loca.lt)
⬜ 4. Na mobilu: https://random-name-123.loca.lt/course-v3?token=...
⬜ 5. Klikni "Click here to continue" (první návštěva)
⬜ 6. Testuj! 🚀
```

---

## **🎯 PŘÍKLAD:**

```bash
# Terminal 1:
npm run dev
# ➜ Local: http://localhost:5173/

# Terminal 2:
npx localtunnel --port 5173
# your url is: https://famous-panda-42.loca.lt

# Na mobilu:
https://famous-panda-42.loca.lt/course-v3?token=1759757068350-eyw8z2zo7t-4lrujeg6mkk

# Klikni "Click here to continue"
# → FUNGUJE! ✅
```

---

## **❌ TROUBLESHOOTING:**

### **"Connection refused":**
```bash
# Dev server neběží
# Zkontroluj Terminal 1:
npm run dev
```

### **"Tunnel closed":**
```bash
# Localtunnel vypršel nebo se restartoval dev server
# Restart localtunnel:
Ctrl+C
npx localtunnel --port 5173
# → Nová URL! Zkopíruj ji znovu
```

### **Warning stránka se stále zobrazuje:**
```
✅ Je to normální při první návštěvě
✅ Klikni "Click here to continue"
✅ Další návštěvy už budou bez warnigu
```

---

## **💡 PRO TIPS:**

### **1. Vlastní subdoména (volitelné):**
```bash
# Místo random názvu můžeš mít vlastní:
npx localtunnel --port 5173 --subdomain mycoolapp

# URL bude:
# https://mycoolapp.loca.lt

# ⚠️ MUSÍ BÝT VOLNÁ! Pokud je obsazená, padne to.
```

### **2. Ulož si URL:**
```
https://random-name-123.loca.lt/course-v3?token=1759757068350-eyw8z2zo7t-4lrujeg6mkk

→ Copy/paste na mobilu kdykoliv!
```

### **3. QR kód:**
```
1. Jdi na: https://www.qr-code-generator.com/
2. Vlož localtunnel URL
3. Vygeneruj QR
4. Naskenuj mobilem → Instant! 🎯
```

---

## **🆚 LOCALTUNNEL VS NGROK:**

| Feature | LocalTunnel | Ngrok |
|---------|-------------|-------|
| **Registrace** | ❌ Není potřeba | ✅ Nutná |
| **Authtoken** | ❌ Není potřeba | ✅ Nutný |
| **Setup čas** | ⚡ 30 sekund | ⏱️ 5 minut |
| **HTTPS** | ✅ Ano | ✅ Ano |
| **Firewall** | ✅ Obejde | ✅ Obejde |
| **Warning stránka** | ⚠️ První návštěva | ❌ Ne |
| **Web Interface** | ❌ Ne | ✅ Ano |
| **Cena** | ✅ Zdarma | ✅ Zdarma (omezené) |

**VERDICT: LocalTunnel pro quick testing! ⚡**

---

## **✅ TL;DR:**

```bash
# Spusť:
npx localtunnel --port 5173

# Zkopíruj URL:
https://random-name-123.loca.lt

# Na mobilu:
https://random-name-123.loca.lt/course-v3?token=1759757068350-eyw8z2zo7t-4lrujeg6mkk

# Klikni "Continue"
# HOTOVO! ✅
```

---

**LocalTunnel = Nejrychlejší cesta k mobilnímu testování!** 🚀📱✨
