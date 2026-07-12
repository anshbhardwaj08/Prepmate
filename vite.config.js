import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],


  server: {
        proxy: {
            "/api/contests": {
                target: "https://clist.by",
                changeOrigin: true,
                secure: true,
                rewrite: (path) => path.replace(/^\/api\/contests/, "/api/v4/contest"),
            },
        },
    },
});