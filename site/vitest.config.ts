/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    alias: {
      '~/': `${process.cwd()}/site/src/`,
    },
    globals: true,
    include: [
      './__test__/**/*.spec.ts',
      './__test__/**/*.spec.tsx',
      './__test__/**/*.test.ts',
      './__test__/**/*.test.tsx',
    ],
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
});
