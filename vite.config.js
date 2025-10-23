import { defineConfig } from 'vite'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        catalog: 'catalog.html',
        blog: 'blog.html',
        about: 'about.html'
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
      }
    }
  },
  plugins: [
    {
      name: 'copy-nojekyll',
      writeBundle() {
        copyFileSync('.nojekyll', resolve('dist', '.nojekyll'))
      }
    }
  ]
})
