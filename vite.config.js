import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [react()],
  publicDir: "public",
  server: {
    cors: true,
    headers: {
      "Cross-Origin-Embedder-Policy": "credentialless",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
