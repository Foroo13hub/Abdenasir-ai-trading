const CACHE_NAME = 'abdenasir-crypto-ai-final-v2';
const CORE = ['./', './index.html', './manifest.json', './icon.svg'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(CORE)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => { const u = new URL(e.request.url); if (u.origin === self.location.origin) e.respondWith(fetch(e.request).then(r => { if(r.ok){const copy=r.clone(); caches.open(CACHE_NAME).then(c=>c.put(e.request,copy));} return r; }).catch(() => caches.match(e.request))); });