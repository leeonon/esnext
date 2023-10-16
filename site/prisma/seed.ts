// // prisma/seed.js
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient();

// async function main() {
//   await prisma.project.create({
//     data: {
//       name: 'React',
//       fullName: 'facebook/react',
//       description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
//       homePage: 'https://reactjs.dev/',
//       stars: 167000,
//       projectCreateTime: new Date(),
//       lastCommitTime: new Date(),
//       version: '17.0.2',
//       versionUpdateTime: new Date(),
//       readme: 'https://raw.githubusercontent.com/facebook/react/master/README.md',
//       logo: 'https://raw.githubusercontent.com/facebook/react/master/logo.png',
//       owner: 'facebook',
//     }
//   });
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   // eslint-disable-next-line @typescript-eslint/no-misused-promises
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
