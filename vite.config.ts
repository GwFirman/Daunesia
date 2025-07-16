import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import generouted from "@generouted/react-router/plugin";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), generouted()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        proxy: {
            "/api": "http://localhost:3000",
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        return id.toString().split("node_modules/")[1].split("/")[0];
                    }
                },
            },
        },
    },
    preview: {
        allowedHosts: true,
    },
});
