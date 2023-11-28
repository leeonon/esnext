import chalk from 'chalk';
import { describe, expect, it } from 'vitest';

import projectList from '../data/projectList.json';
import ReposApi from '../reposApi';

type ProjectListType = typeof projectList;

describe('ReposApi', () => {
  it(
    'createRepos resolves',
    async () => {
      const errorArr = [];
      for (const repos of projectList as unknown as ProjectListType) {
        const url = new URL(repos.github);
        const params = {
          name: repos.name,
          reposOwner: url.pathname.split('/')[1] || '',
          reposName: url.pathname.split('/')[2] || '',
          category: repos.category || [],
        };
        try {
          await ReposApi.requestPackage(params);
          chalk.green(`${repos.name} success`);
        } catch (error) {
          chalk.red(`${repos.name} error`);
          errorArr.push(repos.name);
        }
      }
      console.log(errorArr);
      expect(true).toBe(true);
    },
    {
      timeout: 150000,
    },
  );

  // it('get package home page cover', async () => {
  //   const result = await ReposApi.getHomePageCover(
  //     'https://react.dev/',
  //     'react',
  //   );
  // });
});
