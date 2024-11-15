// Archivos que se deben almacenar en caché
const FILES_TO_CACHE = [
  // '/',
  './index.html',
  '/manifest.json',
  './fondos-de-pantalla-del-espacio-para-pc-4-1200x675.jpeg',
  './bootstrap.min.css',
  './bootstrap.bundle.min.js',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('static-resources').then((cache) => {
        return cache.addAll(FILES_TO_CACHE);
      })
    );
  });


  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response
      // fetch(event.request);
        })
    );
  });