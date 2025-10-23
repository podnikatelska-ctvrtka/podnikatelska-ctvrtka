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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <span className="text-4xl">⚠️</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Něco se pokazilo</h2>
        <p className="text-gray-600 mb-6">
          Aplikace narazila na neočekávanou chybu. Chyba byla automaticky nahlášena.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Obnovit stránku
        </button>
      </div>
    </div>
  ),
  showDialog: true, // Zobrazí dialog pro nahlášení problému
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
