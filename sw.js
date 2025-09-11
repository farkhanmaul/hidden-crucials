// Service Worker for Hidden Crucials - Minimal & Robust
const CACHE_NAME = 'hidden-crucials-v4';

// Install - just activate immediately without pre-caching
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - cache-first strategy with runtime caching
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Return cached version
        }
        
        // Fetch from network and cache for future
        return fetch(event.request)
          .then(fetchResponse => {
            // Only cache successful responses
            if (fetchResponse && fetchResponse.status === 200) {
              const responseClone = fetchResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  // Only cache same-origin requests
                  if (event.request.url.startsWith(self.location.origin)) {
                    cache.put(event.request, responseClone);
                  }
                })
                .catch(() => {
                  // Ignore cache errors
                });
            }
            return fetchResponse;
          })
          .catch(() => {
            // Network failed - try to return a cached fallback
            if (event.request.destination === 'document') {
              return caches.match('/') || new Response('Offline', { status: 503 });
            }
          });
      })
  );
});