import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    outDir: "",
    plugins: [
        laravel({
            input: [
                "resources/css/app.css",
                "resources/js/app.js",
                "resources/js/scanner.js",
                "resources/js/custom-scanner.js",
                "resources/js/scan-result.js",
            ],
            refresh: true,
        }),

        VitePWA({
            mode: "development",
            strategies: "injectManifest",
            manifestFilename: "../webmanifest.json",
            srcDir: "resources/js",
            filename: "sw.js",
            useCredentials: true,
            injectRegister: null,
            registerType: "autoUpdate",
            start_url: "/",
            scope: "/",
            outDir: "public",
            devOptions: {
                enabled: true,
                type: "module",
            },
            workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
                clientsClaim: true,
                skipWaiting: true,
                cacheId: "example-app",
                navigateFallback: "/offline-fallback.html",
                navigateFallbackAllowlist: [],
            },
            manifest: {
                id: "/",
                name: "DiBajak",
                short_name: "Dibajak aja",
                theme_color: "blue",
                background_color: "#0d0072",
                display: "standalone",
                orientation: "portrait",
                description: "sample",
                scope: ".",
                start_url: "/",
                icons: [
                    {
                        src: "/images/icons/icon-72x72.png",
                        sizes: "72x72",
                        type: "image/png",
                    },
                    {
                        src: "/images/icons/icon-96x96.png",
                        sizes: "96x96",
                        type: "image/png",
                    },
                    {
                        src: "/images/icons/icon-128x128.png",
                        sizes: "128x128",
                        type: "image/png",
                    },
                    {
                        src: "/images/icons/icon-144x144.png",
                        sizes: "144x144",
                        type: "image/png",
                    },
                    {
                        src: "/images/icons/icon-152x152.png",
                        sizes: "152x152",
                        type: "image/png",
                    },
                    {
                        src: "/images/icons/icon-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/images/icons/icon-384x384.png",
                        sizes: "384x384",
                        type: "image/png",
                    },
                    {
                        src: "/images/icons/icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
});
