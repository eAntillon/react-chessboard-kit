import { defineConfig } from "vite";
import { resolve } from "path";
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), libInjectCss(),dts({ include: ["lib"] }), ],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      fileName: (format) => `index.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    emptyOutDir: true,
    copyPublicDir: false,
  },
});
