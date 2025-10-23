// 🚀 SERVICE WORKER - Podnikatelská Čtvrtka PWA
// Version 1.0.0

const CACHE_VERSION = 'pwa-v1';
const CACHE_NAMES = {
  static: `${CACHE_VERSION}-static`,
  dynamic: `${CACHE_VERSION}-dynamic`,
  images: `${CACHE_VERSION}-images`,
};

// 📦 Soubory k okamžitému cachování při instalaci
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles/globals.css',
  // Přidej další kritické assety zde
];

// 🎯 Max velikost dynamic cache
const MAX_DYNAMIC_CACHE_SIZE = 50;

// 📥 INSTALL - Cache statické soubory
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAMES.static)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Installation complete');
        return self.skipWaiting(); // Aktivuj hned
      })
      .catch(err => {
        console.error('[SW] Installation failed:', err);
      })
  );
});

// ⚡ ACTIVATE - Vyčisti staré cache
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => !Object.values(CACHE_NAMES).includes(name))
            .map(name => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Activation complete');
        return self.clients.claim(); // Převezmi kontrolu hned
      })
  );
});

// 🌐 FETCH - Network-first strategy (pro fresh data)
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignore non-GET requests
  if (request.method !== 'GET') return;
  
  // Ignore Supabase API calls (musí být vždy fresh)
  if (url.hostname.includes('supabase')) return;
  
  // Ignore external APIs
  if (!url.hostname.includes(self.location.hostname)) return;
  
  // 🎨 Images - Cache first (dlouhodobě platné)
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request, CACHE_NAMES.images));
    return;
  }
  
  // 📄 HTML/JS/CSS - Network first (fresh content priorita)
  if (
    request.destination === 'document' ||
    request.destination === 'script' ||
    request.destination === 'style'
  ) {
    event.respondWith(networkFirst(request, CACHE_NAMES.dynamic));
    return;
  }
  
  // 🔄 Default: Network first
  event.respondWith(networkFirst(request, CACHE_NAMES.dynamic));
});

// 📡 Network First Strategy
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Network failed → fallback na cache
    console.log('[SW] Network failed, serving from cache:', request.url);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Žádná cache → offline page
    if (request.destination === 'document') {
      return caches.match('/offline.html') || new Response(
        '<h1>⚠️ Offline</h1><p>Připojte se k internetu pro pokračování.</p>',
        { headers: { 'Content-Type': 'text/html' } }
      );
    }
    
    throw error;
  }
}

// 💾 Cache First Strategy (pro obrázky)
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
      
      // Limit cache size
      limitCacheSize(cacheName, MAX_DYNAMIC_CACHE_SIZE);
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Fetch failed:', error);
    throw error;
  }
}

// 🧹 Limit cache size
async function limitCacheSize(cacheName, maxSize) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxSize) {
    // Smaž nejstarší
    await cache.delete(keys[0]);
    await limitCacheSize(cacheName, maxSize); // Rekurzivně
  }
}

// 🔄 SYNC - Background sync pro offline changes
self.addEventListener('sync', (event) => {
  console.log('[SW] Sync event:', event.tag);
  
  if (event.tag === 'sync-canvas-data') {
    event.waitUntil(syncCanvasData());
  }
});

async function syncCanvasData() {
  // TODO: Sync localStorage data s Supabase
  console.log('[SW] Syncing canvas data...');
}

// 💬 MESSAGE - Communication s hlavní aplikací
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(name => caches.delete(name))
        );
      })
    );
  }
});

console.log('[SW] Service Worker loaded');
