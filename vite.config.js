import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // IMPORTA AQUI

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
