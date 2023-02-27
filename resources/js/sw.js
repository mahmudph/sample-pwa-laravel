import { registerRoute } from "workbox-routing";
import { NetworkFirst } from "workbox-strategies";
import { precacheAndRoute } from "workbox-precaching";
import "./src/cache_request";
import "./src/background_sync";
/**
 * install pwa disine
 */

const assetPrechache = [
    "/offline-fallback.html",
    "/images/icons/icon-72x72.png",
    "/images/icons/icon-96x96.png",
    "/images/icons/icon-128x128.png",
    "/images/icons/icon-144x144.png",
    "/images/icons/icon-152x152.png",
    "/images/icons/icon-192x192.png",
    "/images/icons/icon-384x384.png",
    "/images/icons/icon-512x512.png",
];

self.addEventListener("install", (event) => {
    const cacheKey = "MyFancyCacheName_v2";
    event.waitUntil(
        caches.open(cacheKey).then((cache) => {
            return cache.addAll(assetPrechache);
        })
    );
    console.log("Service worker installed");
});

/**
 * listen when service worker is being activated
 * in this event we can cache logo or etc
 */
self.addEventListener("activate", (event) => {
    console.log("Service worker activated");
});

registerRoute(
    new RegExp("https://jsonplaceholder.typicode.com/users"),
    new NetworkFirst()
);

// setDefaultHandler(new NetworkOnly());

// offlineFallback();

// self.addEventListener("fetch", (event) => {
//     event.respondWith(
//         caches.match(event.request).then((response) => {
//             return response || fetch(event.request);
//         })
//     );
// });

precacheAndRoute(self.__WB_MANIFEST);
