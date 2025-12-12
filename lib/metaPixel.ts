// Meta Pixel (Facebook Pixel) implementace
// Pro tracking konverzí a optimalizaci FB reklam

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export const META_PIXEL_ID = '891824089837992'; // ✅ Pixel ID Podnikatelská Čtvrtka (AKTUALIZOVÁNO 2025-01-28)

// Inicializace Meta Pixelu
export const initMetaPixel = () => {
  if (typeof window === 'undefined') return;
  
  // Zkontroluj jestli už není nainstalovaný
  if (window.fbq) return;

  // Load Facebook Pixel
  const f = window as any;
  const b = document;
  const e = 'script' as const;
  
  if (f.fbq) return;
  
  const n = f.fbq = function(...args: any[]) {
    n.callMethod
      ? n.callMethod(...args)
      : n.queue.push(args);
  };
  
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];
  
  const t = b.createElement(e);
  t.async = true;
  t.src = 'https://connect.facebook.net/en_US/fbevents.js';
  
  const s = b.getElementsByTagName(e)[0];
  s.parentNode?.insertBefore(t, s);

  // Initialize pixel
  window.fbq('init', META_PIXEL_ID);
  
  // 🧪 TEST MODE: Enable test events for localhost
  // Získej Test Event Code z Meta Events Manager → Test Events → Generate Test Event Code
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (isLocalhost) {
    // TODO: Přidej svůj Test Event Code zde (získáš v Meta Events Manager)
    // window.fbq('init', META_PIXEL_ID, {}, { eventID: 'TEST12345' });
    console.log('🧪 Localhost detected - Use Meta Pixel Helper extension to see events!');
    console.log('📖 Or get Test Event Code from: https://business.facebook.com/events_manager');
  }
  
  window.fbq('track', 'PageView');
  
  console.log('✅ Meta Pixel initialized:', META_PIXEL_ID);
};

// Track PageView
export const trackPageView = () => {
  if (!window.fbq) return;
  window.fbq('track', 'PageView');
  console.log('📊 Meta Pixel: PageView tracked');
};

// Track Lead (email opt-in)
export const trackLead = (email?: string) => {
  if (!window.fbq) return;
  
  window.fbq('track', 'Lead', {
    content_name: 'Email Opt-in',
    content_category: 'Lead Magnet',
    value: 0,
    currency: 'CZK',
  });
  
  console.log('🎯 Meta Pixel: Lead tracked!', email ? `(${email})` : '');
};

// Track ViewContent (landing page)
export const trackViewContent = (contentName: string) => {
  if (!window.fbq) return;
  
  window.fbq('track', 'ViewContent', {
    content_name: contentName,
    content_type: 'product',
  });
  
  console.log('👁️ Meta Pixel: ViewContent tracked:', contentName);
};

// Track InitiateCheckout (klik na CTA)
export const trackInitiateCheckout = () => {
  if (!window.fbq) return;
  
  window.fbq('track', 'InitiateCheckout', {
    content_name: 'Podnikatelská Čtvrtka',
    value: 4999,
    currency: 'CZK',
  });
  
  console.log('🛒 Meta Pixel: InitiateCheckout tracked');
};

// Track Purchase (po platbě)
export const trackPurchase = (value: number, orderId?: string) => {
  if (!window.fbq) return;
  
  window.fbq('track', 'Purchase', {
    value: value,
    currency: 'CZK',
    content_name: 'Podnikatelská Čtvrtka',
    content_type: 'product',
    content_ids: ['podnikatelska-ctvrtka'],
    order_id: orderId,
  });
  
  console.log('💰 Meta Pixel: Purchase tracked!', value, 'Kč');
};

// Track Custom Event
export const trackCustomEvent = (eventName: string, params?: any) => {
  if (!window.fbq) return;
  
  window.fbq('trackCustom', eventName, params);
  console.log('🎨 Meta Pixel: Custom event tracked:', eventName, params);
};

// ══════════════════════════════════════════════════════════
// 📊 QUIZ TRACKING EVENTS
// ══════════════════════════════════════════════════════════

// Track Quiz Started
export const trackQuizStarted = (quizType: 'existing' | 'beginner') => {
  if (!window.fbq) return;
  
  window.fbq('trackCustom', 'QuizStarted', {
    quiz_type: quizType,
    content_name: 'Business Health Quiz',
  });
  
  console.log('🎯 Meta Pixel: QuizStarted tracked -', quizType);
};

// Track Quiz Completed
export const trackQuizCompleted = (quizType: 'existing' | 'beginner', score: number, category: string) => {
  if (!window.fbq) return;
  
  window.fbq('trackCustom', 'QuizCompleted', {
    quiz_type: quizType,
    score: score,
    category: category,
    content_name: 'Business Health Quiz',
  });
  
  console.log('✅ Meta Pixel: QuizCompleted tracked -', category, score);
};

// Track PDF Downloaded/Viewed
export const trackPDFViewed = (category: string, score: number) => {
  if (!window.fbq) return;
  
  window.fbq('trackCustom', 'PDFViewed', {
    category: category,
    score: score,
    content_name: 'Action Plan PDF',
  });
  
  console.log('📄 Meta Pixel: PDFViewed tracked -', category);
};