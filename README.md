# Podnikatelská čtvrtka

Landing page + 3-denní minikurz "Získejte víc zákazníků za 3 dny"

## 🚀 Technologie

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS v4** (styling)
- **Motion/React** (animace)
- **Lucide React** (ikony)

## 📦 Instalace

```bash
npm install
```

## 🛠️ Development

```bash
npm run dev
```

Otevři: http://localhost:5173

## 🏗️ Build

```bash
npm run build
```

## 🌐 Deployment

Automatický deployment na Vercel přes GitHub.

## 📄 Struktura

- `/components` - React komponenty
- `/styles` - Tailwind CSS
- `/guidelines` - Dokumentace
- `App.tsx` - Hlavní komponenta
- `vercel.json` - Vercel konfigurace

## 🔗 URL Struktura

- `/` - Landing page
- `/#priprava?token=XXX` - Minikurz (vyžaduje token)
- `/#order` - Order section

## 🎯 Režimy prodeje

V `App.tsx` změň `saleMode`:
- `"prelaunch"` - Email capture (aktuální)
- `"early-access"` - Časově omezená nabídka
- `"normal-sale"` - Standardní prodej

## 📊 Token pro minikurz

Uživatelé potřebují token v URL:
```
https://domena.cz/#priprava?token=minicourse2025
```

Token se ukládá do localStorage a funguje i bez URL parametru.

## 🍪 GDPR Compliance

Cookie consent banner se zobrazí automaticky.
Ukládá pouze nezbytné cookies pro funkčnost.
