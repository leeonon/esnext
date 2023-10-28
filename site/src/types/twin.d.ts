import 'twin.macro';

import type styledImport from '@emotion/styled';

import { type css as cssImport } from '@emotion/react';
import { type CSSInterpolation } from '@emotion/serialize';

/**
 * Twin将来自emotion的导入折叠为单个导入
 */
declare module 'twin.macro' {
  // The styled and css imports
  const styled: typeof styledImport;
  const css: typeof cssImport;
}

declare module 'react' {
  // The tw and css prop
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface DOMAttributes<T> {
    tw?: string;
    css?: CSSInterpolation;
  }
}
