import { describe, expect, it } from 'vitest';

import ReposApi from '../reposApi';

describe('ReposApi', () => {
  it(
    'createRepos resolves',
    async () => {
      const gitUrl = 'https://github.com/sveltejs/svelte';
      const url = new URL(gitUrl);
      const repos = {
        reposOwner: url.pathname.split('/')[1] || '',
        reposName: url.pathname.split('/')[2] || '',
      };
      if (!repos.reposName || !repos.reposOwner) {
        throw new Error('Invalid git url');
      }
      const result = await ReposApi.createRepos(repos, [
        // 'backend',
        'frontend',
        // 'testing',
      ]);
      expect(result).toBeDefined();
      expect(result?.name).toBe(repos.reposName);
    },
    {
      timeout: 15000,
    },
  );

  // it('get package home page cover', async () => {
  //   const result = await ReposApi.getHomePageCover(
  //     'https://react.dev/',
  //     'react',
  //   );
  // });
});
