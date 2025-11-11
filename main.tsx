import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'
import { registerServiceWorker, setupInstallPrompt } from './lib/pwa'
import * as Sentry from '@sentry/react'

// 🚨 SENTRY ERROR TRACKING
Sentry.init({
  dsn: 'https://8cdc3087a1f4a405ca119b5553f7a76c@o4510232875368448.ingest.de.sentry.io/4510232926093392',
  
  // Environment detection
  environment: import.meta.env.PROD ? 'production' : 'development',
  
  // Performance monitoring
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      // Session replay pro debugging
      maskAllText: false, // Zobrazí text (pokud nechceš, změň na true)
      blockAllMedia: true, // Blokuje obrázky/videa (GDPR friendly)
    }),
  ],
  
  // Performance traces sample rate (1.0 = 100%)
  tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0, // 10% v produkci, 100% v dev
  
  // Session replay sample rate
  replaysSessionSampleRate: 0.1, // 10% normálních sessions
  replaysOnErrorSampleRate: 1.0, // 100% sessions s chybou
  
  // Release tracking
  release: 'podnikatelska-ctvrtka@1.0.2',
  
  // Ignore common errors
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Non-Error promise rejection captured',
  ],
  
  // Before sending - přidej custom data
  beforeSend(event, hint) {
    // V dev mode loguj do console
    if (!import.meta.env.PROD) {
      console.log('🚨 Sentry Event:', event);
      console.log('💡 Hint:', hint);
    }
    
    return event;
  },
});

// Wrap App with Sentry ErrorBoundary
const SentryApp = Sentry.withErrorBoundary(App, {
  fallback: ({ error, resetError }) => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-6">
          <span className="text-5xl">🔧</span>
        </div>
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Chvilku strpení...
        </h2>
        
        {/* Message */}
        <p className="text-gray-600 mb-2">
          Narazili jsme na technický problém, ale už na tom pracujeme!
        </p>
        <p className="text-gray-500 text-sm mb-6">
          Chyba byla automaticky nahlášena našemu týmu a opravíme ji co nejdříve.
        </p>
        
        {/* Reassurance box */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
          <p className="text-blue-900 text-sm">
            ✅ <strong>Vaše data jsou v bezpečí</strong>
            <br />
            <span className="text-blue-700">Žádná vaše práce nebyla ztracena.</span>
          </p>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg font-medium"
          >
            Obnovit stránku
          </button>
          
          <a
            href="/"
            className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Zpět na hlavní stránku
          </a>
        </div>
        
        {/* Help text */}
        <p className="text-gray-400 text-xs mt-6">
          Problémy přetrvávají? Napište nám na <a href="mailto:podpora@podnikatelskactvrtka.cz" className="text-blue-600 hover:underline">podpora@podnikatelskactvrtka.cz</a>
        </p>
      </div>
    </div>
  ),
  showDialog: false, // ❌ VYPNUTO: Nezobrazovat Sentry dialog - máme vlastní UI
});

// Disable StrictMode in dev to prevent double toast (React 18 behavior)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <SentryApp />
)

// 🚀 PWA Setup
if (import.meta.env.PROD) {
  // Register Service Worker (production only)
  registerServiceWorker()
  
  // Setup install prompt listeners
  setupInstallPrompt()
  
  console.log('✅ PWA initialized')
} else {
  console.log('🔧 PWA disabled in development mode')
}
