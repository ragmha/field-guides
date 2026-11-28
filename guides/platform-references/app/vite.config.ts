import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"
import { viteSingleFile } from "vite-plugin-singlefile"

// The catalog lives in the HTML as JSON so extension.mjs and check.mjs can read it without running the app.
const inlineCatalog: Plugin = {
  name: "inline-catalog",
  transformIndexHtml: (html) =>
    html.replace(
      "<!--catalog-->",
      `<script id="catalog" type="application/json">${JSON.stringify(
        JSON.parse(readFileSync(resolve(import.meta.dirname, "catalog.json"), "utf8"))
      ).replaceAll("</", "<\\/")}</script>`
    ),
}

export default defineConfig({
  plugins: [react(), tailwindcss(), inlineCatalog, viteSingleFile()],
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "./src"),
    },
  },
})
