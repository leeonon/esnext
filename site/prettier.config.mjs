import baseConfig from '../prettier.config.mjs';

/**
 * @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options &
 *       import("@ianvs/prettier-plugin-sort-imports").PluginConfig}
 */
const config = {
  ...baseConfig,
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss', // MUST come last
  ],
  overrides: [],
  astroAllowShorthand: false,
  tailwindConfig: './tailwind.config.ts',
  importOrder: [
    '<TYPES>',
    '',
    'react',
    '<THIRD_PARTY_MODULES>',
    '',
    '^~/',
    '',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
};

export default config;
