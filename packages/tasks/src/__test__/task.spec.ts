import type projectList from '../data/projectList.json';

import chalk from 'chalk';
import { describe, expect, it } from 'vitest';

import ReposApi from '../reposApi';
import { init } from '../similarity';

type ProjectListType = typeof projectList;

describe('ReposApi', () => {
  it(
    'createRepos resolves',
    async () => {
      // const errorArr = [];
      // for (const repos of projectList as unknown as ProjectListType) {
      //   const url = new URL(repos.github);
      //   const params = {
      //     name: repos.name,
      //     reposOwner: url.pathname.split('/')[1] || '',
      //     reposName: url.pathname.split('/')[2] || '',
      //     category: repos.category || [],
      //   };
      //   try {
      //     await ReposApi.requestPackage(params);
      //     chalk.green(`${repos.name} success`);
      //   } catch (error) {
      //     chalk.red(`${repos.name} error`);
      //     errorArr.push(repos.name);
      //   }
      // }
      // console.log(errorArr);
      // expect(true).toBe(true);
      try {
        await init();
        console.log('ALL Done');
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
    },
    {
      timeout: 1500000,
    },
  );

  // it('get package home page cover', async () => {
  //   const result = await ReposApi.getHomePageCover(
  //     'https://react.dev/',
  //     'react',
  //   );
  // });
});
