self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('static-resources').then((cache) => {
        return cache.addAll(['/index.html', '/app.js', '/styles.css']);
      })
    );
  });
// Archivos que se deben almacenar en caché
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/image/icon-144.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
];

  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response   
   || fetch(event.request);
        })
    );
  });