const CACHE_VERSION = 'v4';
const CACHE_NAME = `CamCage-${CACHE_VERSION}`;
const FILES_TO_CACHE = [
  'index.html',
  'manifest.webmanifest',
  'service-worker.js',
  'icons/icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // Offline fallback for page navigation
    event.respondWith(
      caches.match('index.html').then(response => response || fetch(event.request))
    );
  } else {
    // Cache-first strategy for other requests
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
  }
});
