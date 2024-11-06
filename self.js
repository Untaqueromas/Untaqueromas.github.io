self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('static-resources').then((cache) => {
        return cache.addAll(['/index.html', '/app.js', '/styles.css']);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response   
   || fetch(event.request);
        })
    );
  });