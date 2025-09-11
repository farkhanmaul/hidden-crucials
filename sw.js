// Service Worker for Hidden Crucials - Perfected Cache Strategy
const CACHE_NAME = 'hidden-crucials-perfected-v2';
const BASE_URL = '/hidden-crucials';
const CACHE_URLS = [
  `${BASE_URL}/`,
  `${BASE_URL}/assets/css/perfected.css`,
  `${BASE_URL}/assets/js/docs.min.js`,
  `${BASE_URL}/assets/js/advanced-features.js`,
  `${BASE_URL}/assets/icons/favicon-optimized.svg`,
  `${BASE_URL}/articles.html`,
  `${BASE_URL}/dashboard.html`,
  `${BASE_URL}/about.html`
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
          return caches.match(`${BASE_URL}/`);
        }
      })
  );
});