import { fileURLToPath } from 'url';

import otterPrettier from '@otter-hacker/prettier-config';

export default {
  ...otterPrettier,
  tailwindConfig: fileURLToPath(
    new URL('./tailwind.config.ts', import.meta.url),
  ),
};
