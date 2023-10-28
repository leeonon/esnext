/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    include: ['./__test__/**/*.spec.ts', './__test__/**/*.spec.tsx'],
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
});
