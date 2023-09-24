// prisma/seed.js
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

async function main() {
  await prisma.example.create({
    data: {
      description: 'Test Description',
      fullName: 'Test FullName',
      name: 'Test',
      ownerId: 1,
      slug: 'test-slug',
      stars: 5,
      tags: 'testTag'
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })