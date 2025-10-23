// 🚀 PWA UTILITIES - Podnikatelská Čtvrtka

/**
 * Register Service Worker
 */
export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.log('❌ Service Worker not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });

    console.log('✅ Service Worker registered:', registration.scope);

    // Listen for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('🔄 New Service Worker available');
            // Můžeš zobrazit notifikaci "Nová verze k dispozici"
            showUpdateNotification(registration);
          }
        });
      }
    });

    return registration;
  } catch (error) {
    console.error('❌ Service Worker registration failed:', error);
    return null;
  }
}

/**
 * Show update notification (toast)
 */
function showUpdateNotification(registration: ServiceWorkerRegistration) {
  // TODO: Integrace s toast (sonner)
  const shouldUpdate = confirm('🔄 Nová verze aplikace je k dispozici. Načíst?');
  
  if (shouldUpdate && registration.waiting) {
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    window.location.reload();
  }
}

/**
 * Check if app is installed (PWA)
 */
export function isAppInstalled(): boolean {
  // Check display mode
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  
  // iOS detection
  const isIOSStandalone = (window.navigator as any).standalone === true;
  
  return isStandalone || isIOSStandalone;
}

/**
 * Check if app can be installed
 */
export function canInstallApp(): boolean {
  return 'BeforeInstallPromptEvent' in window;
}

/**
 * Get install platform (iOS, Android, Desktop)
 */
export function getInstallPlatform(): 'ios' | 'android' | 'desktop' | 'unknown' {
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'ios';
  }
  
  if (/android/.test(userAgent)) {
    return 'android';
  }
  
  if (/windows|mac|linux/.test(userAgent)) {
    return 'desktop';
  }
  
  return 'unknown';
}

/**
 * Prompt user to install app (Android/Desktop)
 */
let deferredPrompt: any = null;

export function setupInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent default mini-infobar
    e.preventDefault();
    
    // Store event for later
    deferredPrompt = e;
    
    console.log('✅ Install prompt available');
    
    // Dispatch custom event (pro React komponenty)
    window.dispatchEvent(new CustomEvent('pwa-install-available'));
  });
  
  // Listen for app installed
  window.addEventListener('appinstalled', () => {
    console.log('✅ PWA installed');
    deferredPrompt = null;
    
    // Track v analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'pwa_install', {
        method: getInstallPlatform()
      });
    }
  });
}

export async function triggerInstallPrompt(): Promise<boolean> {
  if (!deferredPrompt) {
    console.log('❌ No install prompt available');
    return false;
  }
  
  try {
    // Show install prompt
    deferredPrompt.prompt();
    
    // Wait for user choice
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log(`User choice: ${outcome}`);
    
    // Clear prompt
    deferredPrompt = null;
    
    return outcome === 'accepted';
  } catch (error) {
    console.error('Install prompt error:', error);
    return false;
  }
}

/**
 * Check if app is online
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * Setup online/offline listeners
 */
export function setupOnlineListeners(
  onOnline: () => void,
  onOffline: () => void
) {
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);
  
  // Cleanup
  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
}

/**
 * Clear all caches (for debugging)
 */
export async function clearAllCaches() {
  if (!('caches' in window)) return;
  
  try {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(name => caches.delete(name)));
    console.log('✅ All caches cleared');
  } catch (error) {
    console.error('❌ Failed to clear caches:', error);
  }
}

/**
 * Get cache size (for debugging)
 */
export async function getCacheSize(): Promise<number> {
  if (!('caches' in window)) return 0;
  
  try {
    const cacheNames = await caches.keys();
    let totalSize = 0;
    
    for (const name of cacheNames) {
      const cache = await caches.open(name);
      const keys = await cache.keys();
      
      for (const request of keys) {
        const response = await cache.match(request);
        if (response) {
          const blob = await response.blob();
          totalSize += blob.size;
        }
      }
    }
    
    return totalSize;
  } catch (error) {
    console.error('Failed to calculate cache size:', error);
    return 0;
  }
}

/**
 * Format bytes to human readable
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}
