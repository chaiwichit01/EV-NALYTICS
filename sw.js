const CACHE_NAME = 'my-pwa-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css', // ถ้าหาไม่เจอ จะถูกข้ามไปโดยไม่พัง
  '/icons/icon-192x192.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // โหลดทีละไฟล์ ถ้าไฟล์ไหน error (404) ให้ข้ามไป ไม่ให้พังทั้งระบบ
      return Promise.allSettled(
        ASSETS_TO_CACHE.map((url) => cache.add(url).catch((err) => console.warn('ข้ามการแคชไฟล์:', url)))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});