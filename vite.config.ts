import { defineConfig } from "vitest/config";
//import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  test: {
    environment: "jsdom",
  },
});
