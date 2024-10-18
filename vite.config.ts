/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import dts from 'vite-plugin-dts'
import { glob } from 'glob'

import { extname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({ exclude: ['**/*.stories.tsx', 'src/test', '**/*.test.tsx'] }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      input: Object.fromEntries(
        glob
          .sync('src/**/*.{ts,tsx}', {
            ignore: ['src/**/*.d.ts', 'src/**/*.stories.{ts,tsx}'],
          })
          .map((file) => [
            relative('src', file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
      output: {
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][extname]',
        globals: {
          react: 'React',
          'react-dom': 'React-dom',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      include: ['src/components'],
      exclude: ['**/*.stories.tsx'],
    },
  },
})
