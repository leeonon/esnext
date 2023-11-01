import { type NextRequest } from 'next/server';
import { env } from '@esnext/env';
import { appRouter, createTRPCContext } from '@esnext/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req }),
    onError:
      env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            if (error.code === 'INTERNAL_SERVER_ERROR') {
              console.error(error);
            }
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`,
            );
          }
        : undefined,
  });

export { handler as GET, handler as POST };
