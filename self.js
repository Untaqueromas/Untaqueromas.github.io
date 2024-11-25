let CACHE_VERSION = 'app-v0.1';
let FILES_TO_CACHE = [
  './index.html',
  '/manifest.json',
  './fondos-de-pantalla-del-espacio-para-pc-4-1200x675.jpeg',
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
  event.respondWith(
    caches.match(event.request).then(function (res) {
      if (res) {
        // Return the cached response if available
        return res;
      }
      // Otherwise, fetch from the network
      return fetch(event.request);
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
