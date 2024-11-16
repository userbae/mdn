import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "mdn",
        short_name: "mdn",
        description: "mdn",
        theme_color: "#ffffff",
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      {
        find: "@app",
        replacement: "/src/app",
      },
      {
        find: "@pages",
        replacement: "/src/pages",
      },
      {
        find: "@features",
        replacement: "/src/features",
      },
      {
        find: "@shared",
        replacement: "/src/shared",
      },
    ],
  },
});
