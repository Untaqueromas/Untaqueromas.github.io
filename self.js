// 
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

  self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Si el archivo está en caché, devuelve la respuesta de caché
        if (cachedResponse) {
          return cachedResponse;
        }
  
        // Si el archivo no está en caché, hacer una solicitud a la red
        return fetch(event.request).then((networkResponse) => {
          // Si la respuesta de la red es válida, guarda la respuesta en caché
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        }).catch(() => {
          // Si no hay red, responde con una página de "offline"
          return caches.match('/offline.html');
        });
      })
    );
  });