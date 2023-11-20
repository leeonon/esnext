import { db } from '@esnext/db';
import { describe, expect, it } from 'vitest';

import ReposApi from '../reposApi';

describe('ReposApi', () => {
  it('createRepos resolves', async () => {
    const repos = {
      reposOwner: 'facebook',
      reposName: 'react',
    };
    expect(await ReposApi.createRepos(repos)).to.be.resolves;
  });
});
