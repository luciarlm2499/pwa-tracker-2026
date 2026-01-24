// OFFLINE PAGE SERVICE WORKER

const CACHE_NAME = 'pwa-tracker-v2'; // bump version when you change files
const urlsToCache = [
  '/',                // root
  '/index.html',      // main dashboard
  //'/activities.html', // activities page
  '/costs.html',      // costs page
  '/manifest.json',   // manifest
  '/icon-192x192.png',  // app icon
  '/icon-512x512.png',  // app icon
  '/screenshot-wide.png', // screenshot wide
  'screenshot-mobile.png', // screenshot mobile
  'https://cdn.jsdelivr.net/npm/chart.js' // Chart.js library
];

// Install event: cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event: clear old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
});

// Fetch event: serve cached files when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached response if found, else fetch from network
      return response || fetch(event.request);
    })
  );
});