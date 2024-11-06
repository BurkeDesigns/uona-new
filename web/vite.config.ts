import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    optimizeDeps: {
      exclude: ['bun:test']
    },
    resolve: {
      alias: {
        // '@components': path.resolve(__dirname, 'src/components'),
        // '@theme': path.resolve(__dirname, 'src/theme'),
        // '@data': path.resolve(__dirname, 'src/data'),
        // '@blocks': path.resolve(__dirname, 'src/components/BlockMapper/_BlockList.ts'),
        // '@blockmapper': path.resolve(__dirname, 'src/components/BlockMapper'),
        // other aliases
      }
    }
    // other configurations...
  });