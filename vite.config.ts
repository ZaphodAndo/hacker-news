import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const oneDay = 60 * 60 * 24;

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            // Same URL as the old create-react-app service worker, so browsers
            // that still have it installed replace it with this one
            filename: "service-worker.js",
            includeAssets: ["favicon.ico", "apple-touch-icon.png"],
            manifest: {
                short_name: "Hacker News",
                name: "Hacker News",
                description: "Where people go to discuss tech",
                start_url: ".",
                display: "standalone",
                theme_color: "#000000",
                background_color: "#ffffff",
                icons: [
                    {
                        src: "/favicon.ico",
                        type: "image/x-icon",
                        sizes: "16x16 32x32",
                    },
                    {
                        src: "/icon-192.png",
                        type: "image/png",
                        sizes: "192x192",
                    },
                    {
                        src: "/icon-512.png",
                        type: "image/png",
                        sizes: "512x512",
                    },
                    {
                        src: "/icon-192-maskable.png",
                        type: "image/png",
                        sizes: "192x192",
                        purpose: "maskable",
                    },
                    {
                        src: "/icon-512-maskable.png",
                        type: "image/png",
                        sizes: "512x512",
                        purpose: "maskable",
                    },
                ],
            },
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: ({ url }) =>
                            url.origin === "https://hn.algolia.com",
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "hacker-news-api",
                            networkTimeoutSeconds: 5,
                            expiration: {
                                maxEntries: 100,
                                maxAgeSeconds: 7 * oneDay,
                            },
                            cacheableResponse: { statuses: [200] },
                        },
                    },
                    {
                        urlPattern: ({ url }) =>
                            url.origin === "https://fonts.googleapis.com",
                        handler: "StaleWhileRevalidate",
                        options: { cacheName: "google-fonts-stylesheets" },
                    },
                    {
                        urlPattern: ({ url }) =>
                            url.origin === "https://fonts.gstatic.com",
                        handler: "CacheFirst",
                        options: {
                            cacheName: "google-fonts-files",
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 365 * oneDay,
                            },
                            cacheableResponse: { statuses: [0, 200] },
                        },
                    },
                ],
            },
        }),
    ],
});
