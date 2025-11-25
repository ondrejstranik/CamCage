const CACHE_NAME = "CamCage-v2";
const FILES_TO_CACHE = [
  "index.html",
  "manifest.webmanifest",
  "service-worker.js",
  "icons/icon.png"  
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Normal PWA caching
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
