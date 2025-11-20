// Google Analytics 4 & Microsoft Clarity implementation
// Pro tracking user behavior a optimalizaci konverzí

declare global {
  interface Window {
    gtag: any;
    dataLayer: any;
    clarity: any;
  }
}

// 🎯 CONFIGURATION
// Google Analytics 4 Measurement ID (формат: G-XXXXXXXXXX)
export const GA4_MEASUREMENT_ID = 'G-0NFYED72H9'; // ✅ Podnikatelská Čtvrtka

// Microsoft Clarity Project ID
export const CLARITY_PROJECT_ID = 'u8j8xmzh0u'; // ✅ Podnikatelská Čtvrtka

// ============================================
// GOOGLE ANALYTICS 4
// ============================================

// Inicializace GA4
export const initGA4 = () => {
  if (typeof window === 'undefined') return;
  
  // Zkontroluj jestli už není nainstalovaný
  if (window.gtag) {
    console.log('✅ GA4 already initialized');
    return;
  }

  // Load GA4 script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA4_MEASUREMENT_ID, {
    send_page_view: true,
    // 🔥 Enhanced measurement (scroll tracking, outbound clicks, site search)
    enhanced_measurement: true,
  });

  console.log('✅ GA4 initialized:', GA4_MEASUREMENT_ID);
};

// Track PageView (pro SPA routing)
export const trackGA4PageView = (path: string, title?: string) => {
  if (!window.gtag) return;
  
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
  });
  
  console.log('📊 GA4: PageView tracked:', path);
};

// Track Custom Event
export const trackGA4Event = (eventName: string, params?: any) => {
  if (!window.gtag) return;
  
  window.gtag('event', eventName, params);
  console.log('🎯 GA4: Event tracked:', eventName, params);
};

// Track Conversion (Lead, Purchase, etc.)
export const trackGA4Conversion = (eventName: string, value?: number, currency = 'CZK') => {
  if (!window.gtag) return;
  
  window.gtag('event', eventName, {
    value: value,
    currency: currency,
  });
  
  console.log('💰 GA4: Conversion tracked:', eventName, value);
};

// ============================================
// MICROSOFT CLARITY
// ============================================

// Inicializace Microsoft Clarity
export const initClarity = () => {
  if (typeof window === 'undefined') return;
  
  // Zkontroluj jestli už není nainstalovaný
  if (window.clarity) {
    console.log('✅ Clarity already initialized');
    return;
  }

  try {
    // Load Clarity script
    (function(c: any, l: any, a: any, r: any, i: any, t: any, y: any) {
      c[a] = c[a] || function() {
        (c[a].q = c[a].q || []).push(arguments);
      };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_PROJECT_ID);

    console.log('✅ Clarity initialized:', CLARITY_PROJECT_ID);
  } catch (error) {
    console.warn('⚠️ Clarity initialization failed:', error);
  }
};

// Track Custom Clarity Event
export const trackClarityEvent = (eventName: string) => {
  if (!window.clarity) return;
  
  try {
    window.clarity('event', eventName);
    console.log('📹 Clarity: Event tracked:', eventName);
  } catch (error) {
    console.warn('⚠️ Clarity event tracking failed:', error);
  }
};

// Tag Clarity Session (např. "converted", "bounced", etc.)
export const tagClaritySession = (tag: string) => {
  if (!window.clarity) return;
  
  try {
    window.clarity('set', tag, 'true');
    console.log('🏷️ Clarity: Session tagged:', tag);
  } catch (error) {
    console.warn('⚠️ Clarity session tagging failed:', error);
  }
};

// ============================================
// COMBINED HELPERS
// ============================================

// Inicializuj všechny analytics najednou
export const initAllAnalytics = () => {
  initGA4();
  initClarity();
  console.log('🚀 All analytics initialized!');
};

// Track konverzi ve všech platformách najednou
export const trackConversion = (eventName: string, value?: number) => {
  // GA4
  trackGA4Conversion(eventName, value);
  
  // Clarity tag
  tagClaritySession(`conversion_${eventName}`);
  
  console.log('✅ Conversion tracked across all platforms:', eventName);
};

// Track scroll depth (kolik % stránky user scrollnul)
export const trackScrollDepth = (percentage: number) => {
  if (percentage === 25 || percentage === 50 || percentage === 75 || percentage === 100) {
    trackGA4Event('scroll_depth', {
      percent_scrolled: percentage,
    });
    
    trackClarityEvent(`scroll_${percentage}`);
  }
};

// Track CTA clicks
export const trackCTAClick = (ctaName: string, location: string) => {
  trackGA4Event('cta_click', {
    cta_name: ctaName,
    cta_location: location,
  });
  
  trackClarityEvent(`cta_click_${location}`);
  
  console.log('🎯 CTA click tracked:', ctaName, location);
};

// Track form interactions
export const trackFormInteraction = (formName: string, action: 'start' | 'complete' | 'abandon') => {
  trackGA4Event('form_interaction', {
    form_name: formName,
    form_action: action,
  });
  
  trackClarityEvent(`form_${action}_${formName}`);
  
  console.log('📝 Form interaction tracked:', formName, action);
};