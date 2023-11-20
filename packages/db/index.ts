/**
 * 在 NextJs 本地开发中，热重载时可能会出现多实例的问题，这里使用 globalThis 作为全局变量来解决
 * 保持开发过程中的单例。生产环境则不需要
 * https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#problem
 */

import { env } from '@esnext/env';
import { PrismaClient } from '@prisma/client';

export * from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
