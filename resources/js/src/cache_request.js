import {
    NetworkFirst,
    NetworkOnly,
    StaleWhileRevalidate,
} from "workbox-strategies";
import {
    registerRoute,
    setCatchHandler,
    setDefaultHandler,
} from "workbox-routing";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";
/**
 *
 */

registerRoute(
    ({ request }) => request.mode === "navigate",
    new NetworkFirst({
        cacheName: "pages-cache",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    }),
    "GET"
);

registerRoute(
    ({ url }) => url.pathname === "/categories",
    new StaleWhileRevalidate({
        cacheName: "categories-cache",
        plugins: [
            new ExpirationPlugin({
                maxEntries: 500,
                maxAgeSeconds: 30,
                purgeOnQuotaError: true,
            }),
            new CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    })
);

registerRoute(
    ({ url }) => url.pathname === "/news",
    new NetworkFirst({
        cacheName: "data-cache",
        matchOptions: {
            ignoreSearch: true,
            ignoreVary: true,
        },
        plugins: [
            new ExpirationPlugin({
                maxEntries: 500,
                maxAgeSeconds: 30,
                purgeOnQuotaError: true,
            }),
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
    })
);

/**
 * handling for post create news
 */

const FALLBACK_HTML_URL = "/offline-fallback.html";

setDefaultHandler(new NetworkOnly());

setCatchHandler(({ event }) => {
    switch (event.request.destination) {
        case "document":
            console.log("im hereeee");
            return caches.match(FALLBACK_HTML_URL);
        default:
            console.log(event.request.destination, "im heree default error");
            // return caches.match(FALLBACK_HTML_URL);
            throw new Error("hohohohohoo");
    }
});
