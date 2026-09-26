/**
 * Service Worker for Probabilidad & Estadística (FI-UNJu)
 * Network-First Strategy with Offline Fallback and Instant Cache Purge
 */

const CACHE_NAME = 'probabilidad-unju-v6';
const ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './js/math-utils.js',
  './js/solvers.js',
  './js/exam-data.js',
  './js/app.js',
  './manifest.json',
  './icons/favicon.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  // Force active service worker immediately
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (e) => {
  // Purge ALL older caches immediately
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (!e.request.url.startsWith('http')) return;

  // NETWORK-FIRST STRATEGY: Always get the latest code from network when online
  e.respondWith(
    fetch(e.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Fallback to cache only when offline
        return caches.match(e.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (e.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
  if (event.data && event.data.action === 'clearCache') {
    caches.keys().then((keys) => {
      keys.forEach((key) => caches.delete(key));
    });
  }
});
