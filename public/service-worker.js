self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('conexao-eclesiastica-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/admin.html',
        '/bible.html',
        '/css/index.css',
        '/img/logo.png',
        // Adicione outros arquivos importantes aqui
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
