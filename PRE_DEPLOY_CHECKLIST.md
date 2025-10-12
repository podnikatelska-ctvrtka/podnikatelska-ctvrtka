# ✅ PRE-DEPLOY CHECKLIST - Netlify

**Použij PŘED každým deployem na Netlify!**

---

## 🎯 RYCHLÝ CHECKLIST (5 minut)

### ☑️ 1. Vyčisti build cache
```bash
npm run clean
```

### ☑️ 2. Lokální build test
```bash
npm run build
```

**Zkontroluj výstup:**
- ✅ Build úspěšný? (žádné errory)
- ✅ Velikost dist/ složky < 5 MB?
- ✅ Warnings jsou OK? (kontroluj chunk size warnings!)

```bash
# Zkontroluj velikost
du -sh dist/
ls -lh dist/assets/*.js
```

**Očekávané výsledky:**
- `dist/` složka: **1-3 MB**
- Největší JS chunk: **max 500 KB**
- Pokud větší → něco je špatně!

### ☑️ 3. Lokální preview test
```bash
npm run preview
```

**Otestuj tyto URL v prohlížeči:**
- ✅ `http://localhost:4173/` - Landing page
- ✅ `http://localhost:4173/#priprava` - Mini kurz
- ✅ `http://localhost:4173/#course` - Course demo
- ✅ `http://localhost:4173/#course-v2` - Course V2
- ✅ `http://localhost:4173/#course-v3` - Course V3
- ✅ `http://localhost:4173/#admin-course` - Admin

**Všechno funguje?** → Pokračuj!
**Něco nefunguje?** → NEDELOYUJ! Oprav to!

### ☑️ 4. Git commit
```bash
git add .
git commit -m "Production ready - optimized build"
```

### ☑️ 5. PUSH (deploy)
```bash
git push origin main
```

### ☑️ 6. Sleduj Netlify build log
- Otevři Netlify Dashboard
- Sleduj "Deploy log"
- **Kontroluj čas:** build by měl trvat 2-4 minuty
- **Kontroluj warnings:** měly by být minimální

---

## 🚨 RED FLAGS - ZASTAV DEPLOY!

**NEDELOYUJ pokud:**
- ❌ Lokální build failuje
- ❌ `dist/` složka > 10 MB
- ❌ Největší JS chunk > 1 MB
- ❌ Preview nefunguje na některé stránce
- ❌ Console plný errorů

---

## 📊 OČEKÁVANÉ HODNOTY

**Po optimalizaci:**
- ✅ Build time: 2-4 minuty
- ✅ Deploy time: celkem 4-6 minut
- ✅ Credit usage: **3-6 kreditů** (dřív 15!)
- ✅ Bundle size: ~300-500 KB (gzipped)

---

## 🔧 TROUBLESHOOTING

### Build trvá > 5 minut?
→ Něco instaluje dependencies znovu (cache nefunguje)
→ Zkontroluj Netlify Environment Variables

### Bundle warnings?
→ Některý chunk je příliš velký
→ Zkontroluj `vite.config.js` manualChunks

### Lokální build funguje, Netlify ne?
→ Environment variables chybí
→ Zkontroluj Netlify Dashboard → Site settings → Environment variables

---

## 🎯 POSLEDNÍ KONTROLA PŘED PUSHEM

```bash
# 1. Clean
npm run clean

# 2. Build
npm run build

# 3. Zkontroluj velikost
du -sh dist/
# Mělo by být: 1-3 MB

# 4. Preview
npm run preview
# Otestuj všechny stránky!

# 5. Pokud vše OK → PUSH!
git push
```

---

**Čas: ~5 minut**
**Úspora: Až 70% kreditů!**
**Jistota: 99% že deploy projde bez problémů!**

✅ **Ready to deploy!**
