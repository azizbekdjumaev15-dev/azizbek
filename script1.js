const CACHE_NAME = 'pro-platform-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    // Добавьте сюда пути к локальным картинкам/видео, если они есть
    // 'video1.mp4', 
    // 'image.png'
];

// Установка Service Worker и кэширование
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Активация и удаление старого кэша
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        })
    );
});

// Перехват запросов (Offline-режим)
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});