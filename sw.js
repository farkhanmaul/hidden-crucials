// Service Worker for Hidden Crucials - Cache Strategy
const CACHE_NAME = 'hidden-crucials-v1';
const CACHE_URLS = [
  '/',
  '/assets/css/docs.min.css',
  '/assets/js/docs.min.js',
  '/assets/icons/favicon-optimized.svg',
  '/getting-started/',
  '/getting-started/markdown-examples/',
  // Add other static resources
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CACHE_URLS))
      .then(() => self.skipWaiting())
  );
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

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
          .then(fetchResponse => {
            // Cache new resources
            const responseClone = fetchResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                if (event.request.url.startsWith(self.location.origin)) {
                  cache.put(event.request, responseClone);
                }
              });
            return fetchResponse;
          });
      })
      .catch(() => {
        // Fallback for offline
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      })
  );
});