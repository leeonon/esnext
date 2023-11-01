import type { AppRouter } from '@esnext/server/src/api/root';

import { appRouter } from '@esnext/server/src/api/root';
import { createInnerTRPCContext } from '@esnext/server/src/api/trpc';
import { type inferProcedureInput } from '@trpc/server';
import { expect, test } from 'vitest';

test('example router', async () => {
  const ctx = await createInnerTRPCContext({
    session: null,
    headers: new Headers(),
  });
  const caller = appRouter.createCaller(ctx);

  type Input = inferProcedureInput<AppRouter['example']['hello']>;
  const input: Input = {
    text: 'test',
  };

  const example = await caller.example.hello(input);

  expect(example).toMatchObject({ greeting: 'Hello test' });
});

// test('protected example router', async () => {
//   const ctx = await createInnerTRPCContext({
//     session: {
//       user: { id: '123', name: 'John Doe' },
//       expires: '1',
//     },
//     headers: new Headers(),
//   });
//   const caller = appRouter.createCaller(ctx);

//   // ...
// });
