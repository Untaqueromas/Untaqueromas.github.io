let CACHE_VERSION = 'app-v0.2';
let FILES_TO_CACHE = [
  './index.html',
  '/manifest.json',
  './img/fondo.jpeg',
  './bootstrap.min.css',
  './bootstrap.bundle.min.js',
];

self.addEventListener('install', function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
});
self.addEventListener('fetch', function (event) {
    // Try to respond with cached data if available, otherwise fetch from the network
    event.respondWith(
      caches.match(event.request).then(function (cachedResponse) {
        if (cachedResponse) {
          // Return cached response if found
          return cachedResponse;
        }
  
        // If not cached, fetch from the network and cache it
        return fetch(event.request).then(function (networkResponse) {
          // If the response is valid, cache it for future use
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_VERSION).then(function (cache) {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        }).catch(function () {
          // If network fetch fails, you could serve an offline fallback page here
          console.log('Network request failed and no cache available');
        });
      })
    );
  });
  

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        if (key !== CACHE_VERSION) {
          console.log('Deleting old cache:', key);
          return caches.delete(key);
        }
      }));
    })
  );
});
