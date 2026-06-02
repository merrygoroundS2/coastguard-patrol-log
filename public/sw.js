const CACHE_NAME = 'report-service-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap'
];

// 설치 시 정적 자원 캐싱
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

// 활성화 시 이전 캐시 제거
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// 네트워크 우선, 실패 시 캐시 (API 호출은 항상 네트워크)
self.addEventListener('fetch', (e) => {
    const url = new URL(e.request.url);

    // API 요청은 네트워크만 사용
    if (url.pathname.startsWith('/api/')) {
        return;
    }

    e.respondWith(
        fetch(e.request)
            .then(resp => {
                const clone = resp.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
                return resp;
            })
            .catch(() => caches.match(e.request))
    );
});
