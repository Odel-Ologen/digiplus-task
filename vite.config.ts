import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

/*
  GitHub Pages serves a project repo from a subpath:

    user site    https://<user>.github.io/            → base '/'
    project site https://<user>.github.io/<repo>/     → base '/<repo>/'

  Get this wrong and every asset 404s, because the HTML asks for /assets/…
  while the files actually live at /<repo>/assets/…. Set VITE_BASE in the
  workflow only when deploying to a project site.
*/
const base = process.env['VITE_BASE'] || '/'

export default defineConfig({
  base,
  plugins: [vue(), tailwindcss()],
})
