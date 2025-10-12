# 🚀 Netlify Deployment Guide - Optimalizace kreditů

## 🎯 Cíl
Minimalizovat spotřebu Netlify kreditů při deploymentu bez nutnosti "pokus-omyl" testování.

---

## 📊 ANALÝZA SOUČASNÉHO STAVU

### Co SE používá (dle App.tsx):
✅ **Landing page komponenty:**
- HeroSection
- ProblemsSectionCompact
- SolutionIntroSection
- OptimizedCombinedSectionV2
- SwipeableTestimonials
- CompactCaseStudySection
- CountdownBanner
- PrelaunchEmailCapture
- EarlyAccessSale

✅ **Kurz/Demo komponenty:**
- MiniCourse (#priprava)
- CourseDemo (#course)
- CourseDemoV2 (#course-v2)
- CourseDemoV3 (#course-v3)
- AdminCourse (#admin-course)
- InteractiveCourseDemo (#interactive-course)

✅ **Marketing/Analytics:**
- FacebookAdCreatives (AdCreativesShowcase)
- FinalAdSets (FinalAdSetsShowcase)
- Analytics
- CookieConsent

✅ **UX komponenty:**
- ScrollAnimations
- SectionTransition
- MicroInteractions
- EnhancedScrollEffects
- MobileProgressBar
- OptimizedMobileCTA
- CriticalCSS

---

### ❌ Co se NEPOUŽÍVÁ (kandidáti na odstranění/archivaci):

**Staré verze:**
- ❌ BusinessModelCanvas.tsx (staré)
- ❌ BusinessModelCanvasSimple.tsx (staré)
- ❌ SimpleCourseDemo.tsx (duplikát)
- ❌ OptimizedCombinedSection.tsx (nahrazeno V2)
- ❌ InsightsVariantAccordion.tsx (varianta)
- ❌ InsightsVariantCards.tsx (varianta)
- ❌ InsightsVariantTimeline.tsx (varianta)

**Marketing komponenty (neaktivní):**
- ❌ BeforeAfterSlider.tsx
- ❌ BookingModal.tsx
- ❌ BandwagonSection.tsx
- ❌ ExitIntentPopup.tsx
- ❌ QuickEmailCaptureModal.tsx
- ❌ SocialPressureBadge.tsx
- ❌ LiveSocialProof.tsx
- ❌ SmartUrgencyEffects.tsx
- ❌ EnhancedCTA.tsx

**Pomocné komponenty (možná nepoužívané):**
- ❌ ExampleBox.tsx
- ❌ ExampleComparison.tsx
- ❌ TipBox.tsx (zkontrolovat)
- ❌ TouchFeedback.tsx
- ❌ LazyImage.tsx
- ❌ EmptyState.tsx

**Interní/test komponenty:**
- ❌ InteractiveDemoSelector.tsx
- ❌ TimelineTabs.tsx
- ❌ TakeawaysTimeline.tsx

---

## 🔧 STRATEGIE OPTIMALIZACE

### 1️⃣ LOKÁLNÍ PRE-DEPLOYMENT CHECKLIST

**Před každým deployem na Netlify:**

```bash
# 1. Vyčisti build cache
rm -rf dist node_modules/.vite

# 2. Zkontroluj bundle size LOKÁLNĚ
npm run build
ls -lh dist/assets/*.js

# 3. Analyzuj velikost bundlu (přidáme plugin)
npm run build -- --mode production
# Měl by vypsat velikosti všech chunků

# 4. Test production buildu lokálně
npm run preview
# Otestuj všechny stránky: /, /#priprava, /#course, /#course-v2, /#course-v3
```

---

### 2️⃣ VITE KONFIGURACE - Optimalizace

**Upravit `/vite.config.js`:**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  build: {
    outDir: 'dist',
    sourcemap: false, // ✅ Už máš - šetří místo
    minify: 'esbuild', // ✅ Už máš - rychlejší než terser
    
    // ⚡ NOVÉ OPTIMALIZACE:
    cssCodeSplit: true, // Rozdělí CSS do samostatných souborů
    chunkSizeWarningLimit: 600, // Upozornění na velké chunky
    
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React
          'vendor-react': ['react', 'react-dom'],
          
          // UI knihovny
          'vendor-ui': [
            'lucide-react',
            'sonner',
            'motion/react'
          ],
          
          // Radix UI (hodně balíčků!)
          'vendor-radix': [
            '@radix-ui/react-slot',
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip'
          ],
          
          // Supabase
          'vendor-supabase': ['@supabase/supabase-js'],
          
          // Kurz komponenty (lazy load!)
          'course': [
            './components/CourseDemo.tsx',
            './components/CourseDemoV2.tsx',
            './components/CourseDemoV3.tsx'
          ]
        }
      }
    }
  },
  
  // ⚡ Build performance
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lucide-react',
      '@supabase/supabase-js'
    ],
    exclude: [] // Pokud něco dělá problémy
  }
})
```

---

### 3️⃣ NETLIFY KONFIGURACE

**Upravit `/netlify.toml`:**

```toml
[build]
  command = "npm run build"
  publish = "dist"
  
  # ⚡ CACHE NODE_MODULES - Ušetří čas i kredity!
  [build.environment]
    NODE_VERSION = "18"
    NPM_FLAGS = "--prefer-offline --no-audit"

# ⚡ Cache optimalizace
[[plugins]]
  package = "@netlify/plugin-cache-install"
  
  [plugins.inputs]
    cache_node_modules = true # ✅ KLÍČOVÉ!

# Headers pro caching statických assetů
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Funkce
[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"
```

---

### 4️⃣ PACKAGE.JSON OPTIMALIZACE

**Upravit build skripty:**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:analyze": "vite build --mode production && vite-bundle-analyzer",
    "preview": "vite preview",
    "clean": "rm -rf dist node_modules/.vite",
    "prebuild": "npm run clean"
  }
}
```

**Přidat dependency analyzer (optional):**

```bash
npm install --save-dev vite-bundle-visualizer
```

**A upravit vite.config.js:**

```js
import { visualizer } from 'vite-bundle-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }) // Otevře graf po buildu
  ]
})
```

---

### 5️⃣ DEPENDENCY AUDIT

**Nepoužívané dependencies k odstranění:**

```bash
# Zkontroluj co se SKUTEČNĚ používá
npx depcheck

# Možné kandidáty na odstranění:
# - react-slick / slick-carousel (pokud se nepoužívá)
# - next-themes (pokud není dark mode)
# - @dnd-kit/* (pokud není drag&drop)
# - recharts (pokud nejsou grafy)
```

---

### 6️⃣ ARCHIVACE STARÝCH KOMPONENT

**Vytvoř složku `/components/_archive/`** a přesuň tam:

```
components/_archive/
├── old-canvas-versions/
│   ├── BusinessModelCanvas.tsx
│   ├── BusinessModelCanvasSimple.tsx
│   └── ReadOnlyBusinessModelCanvas.tsx
├── old-demo-versions/
│   ├── SimpleCourseDemo.tsx
│   └── InteractiveDemoSelector.tsx
├── marketing-unused/
│   ├── BeforeAfterSlider.tsx
│   ├── ExitIntentPopup.tsx
│   ├── QuickEmailCaptureModal.tsx
│   └── SocialPressureBadge.tsx
└── insights-variants/
    ├── InsightsVariantAccordion.tsx
    ├── InsightsVariantCards.tsx
    └── InsightsVariantTimeline.tsx
```

**DŮLEŽITÉ:** Vite NEBUDE buildovat soubory které nejsou importované!
Takže archivace není nutná, ale pomůže s přehledností.

---

### 7️⃣ GIT IGNORE OPTIMALIZACE

**Přidej do `.gitignore`:**

```
# Build výstupy
dist/
dist-ssr/
*.local

# Vite cache
node_modules/.vite/
.vite/

# Dependency directories
node_modules/

# Environment
.env
.env.local
.env.production

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Bundle analyzer výstupy
stats.html
```

---

## 🚀 DEPLOYMENT WORKFLOW

### ✅ PŘED DEPLOYEM (Lokálně):

```bash
# 1. Vyčisti vše
npm run clean

# 2. Reinstaluj dependencies (fresh)
rm -rf node_modules package-lock.json
npm install

# 3. Build a zkontroluj velikost
npm run build
du -sh dist/
ls -lh dist/assets/

# 4. Test lokálně
npm run preview
# Otestuj: /, /#priprava, /#course, /#course-v2, /#course-v3, /#admin-course

# 5. Commit a push
git add .
git commit -m "Production build - optimized"
git push
```

### ✅ NA NETLIFY:

1. **Prvotní setup (jednou):**
   - Nainstaluj "Netlify Cache Plugin" v UI
   - Nastav Environment Variables (Supabase klíče)

2. **Deploy:**
   - Push do main větve
   - Netlify automaticky buildne
   - Sleduj build log - kontroluj warnings!

---

## 📏 OČEKÁVANÉ VÝSLEDKY

**Optimalizovaný build by měl mít:**
- ✅ Bundle size: ~300-500 KB (gzipped)
- ✅ Build time: 1-2 minuty
- ✅ Deploy time: celkem 3-5 minut
- ✅ Credit usage: 3-5 kreditů/deploy

**Red flags:**
- ❌ Bundle > 1 MB (gzipped) - příliš velký!
- ❌ Build > 5 minut - něco je špatně
- ❌ > 10 kreditů - optimalizace nefunguje

---

## 🔍 DEBUGGING

### Pokud build žere hodně kreditů:

1. **Zkontroluj build log:**
   - Dlouhý npm install? → Cache nefunguje
   - Velké bundle warnings? → Příliš velké chunky
   - Memory errors? → Nedostatek RAM (upgrade plan)

2. **Analyzuj bundle:**
   ```bash
   npm run build:analyze
   # Podívej se co zabírá místo
   ```

3. **Zkontroluj Netlify Functions:**
   - Jsou optimalizované? (esbuild bundler)
   - Používají cache?

---

## 🎯 ACTION PLAN PRO ZÍTŘEK

**Krok 1: Připrav lokální environment** (5 min)
```bash
npm install --save-dev vite-bundle-visualizer
```

**Krok 2: Optimalizuj vite.config.js** (10 min)
- Zkopíruj novou konfiguraci výše
- Přidej manualChunks

**Krok 3: Optimalizuj netlify.toml** (5 min)
- Přidej cache plugin
- Přidaj headers

**Krok 4: Lokální test** (15 min)
```bash
npm run clean
npm install
npm run build
npm run preview
# Test všech stránek!
```

**Krok 5: Deploy** (5 min)
```bash
git add .
git commit -m "Optimize for Netlify deployment"
git push
# Sleduj Netlify build log!
```

**CELKEM: ~40 minut**
**ÚSPORA: Až 70% kreditů! (z 15→5 kreditů)**

---

## 📝 POZNÁMKY

- **NIKDY** nedeployuj bez lokálního testu!
- **VŽDYCKY** kontroluj build log warnings
- **CACHE** je tvůj nejlepší kamarád
- **Dependencies** jsou největší žrout času/kreditů

---

**Poslední update:** 2025-01-10
**Verze:** 1.0
**Status:** ✅ Ready to use
