import { useEffect } from 'react';

// Analytics tracking component
export function Analytics() {
  useEffect(() => {
    // Hardcoded placeholder values - replace with your actual IDs
    const GA_TRACKING_ID = 'GA_TRACKING_ID_HERE'; // Replace with your actual GA4 tracking ID
    const FB_PIXEL_ID = 'YOUR_FACEBOOK_PIXEL_ID_HERE'; // Replace with your actual FB Pixel ID
    
    // Load Google Analytics only if valid ID
    if (GA_TRACKING_ID && GA_TRACKING_ID !== 'GA_TRACKING_ID_HERE') {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}', {
          page_title: 'Podnikatelská čtvrtka - Landing Page',
          page_location: window.location.href,
          custom_map: {
            'custom_parameter_1': 'business_canvas_landing'
          }
        });
      `;
      document.head.appendChild(script2);
    }

    // Load Facebook Pixel only if valid ID
    if (FB_PIXEL_ID && FB_PIXEL_ID !== 'YOUR_FACEBOOK_PIXEL_ID_HERE') {
      const fbScript = document.createElement('script');
      fbScript.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${FB_PIXEL_ID}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(fbScript);
    }

    // Custom event tracking functions
    const trackEvent = (eventName: string, parameters: any = {}) => {
      // Google Analytics event
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', eventName, {
          event_category: 'user_interaction',
          event_label: 'podnikatelska_ctvrtka',
          ...parameters
        });
      }
      
      // Facebook Pixel event - use trackCustom for custom events
      if (typeof window.fbq !== 'undefined') {
        if (['PageView', 'Lead', 'Purchase', 'ViewContent', 'AddToCart', 'InitiateCheckout'].includes(eventName)) {
          window.fbq('track', eventName, parameters);
        } else {
          window.fbq('trackCustom', eventName, parameters);
        }
      }
      
      // Console log for development only
      if (process.env.NODE_ENV === 'development') {
        console.log('Event tracked:', eventName, parameters);
      }
    };

    // Attach to window for global access
    window.trackEvent = trackEvent;

    // Track initial page view only if analytics are loaded
    if (GA_TRACKING_ID !== 'GA_TRACKING_ID_HERE' || FB_PIXEL_ID !== 'YOUR_FACEBOOK_PIXEL_ID_HERE') {
      trackEvent('PageView', {
        page_title: 'Podnikatelská čtvrtka - Landing Page',
        page_url: window.location.href
      });
    }

    return () => {
      // Cleanup - remove global function
      if (window.trackEvent) {
        delete window.trackEvent;
      }
    };
  }, []);

  return null; // This component doesn't render anything
}

// Utility functions for tracking specific events
export const trackCTAClick = (ctaLocation: string) => {
  if (typeof window !== 'undefined' && window.trackEvent) {
    window.trackEvent('cta_click', {
      cta_location: ctaLocation,
      event_value: 1
    });
  }
};

export const trackEmailSignup = (email: string) => {
  if (typeof window !== 'undefined' && window.trackEvent) {
    window.trackEvent('Lead', {
      email_domain: email.split('@')[1] || 'unknown',
      event_value: 5
    });
  }
};

export const trackScrollDepth = (depth: number) => {
  if (typeof window !== 'undefined' && window.trackEvent) {
    window.trackEvent('scroll_depth', {
      scroll_depth: depth,
      event_value: depth / 100
    });
  }
};

export const trackOrderAttempt = (price: number) => {
  if (typeof window !== 'undefined' && window.trackEvent) {
    window.trackEvent('InitiateCheckout', {
      currency: 'CZK',
      value: price,
      content_ids: ['podnikatelska_ctvrtka_kurz'],
      content_type: 'product',
      items: [{
        item_id: 'podnikatelska_ctvrtka_kurz',
        item_name: 'Podnikatelská čtvrtka - Online kurz',
        category: 'business_course',
        quantity: 1,
        price: price
      }]
    });
  }
};

// TypeScript declarations
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    trackEvent: (eventName: string, parameters?: any) => void;
  }
}