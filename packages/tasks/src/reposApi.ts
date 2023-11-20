import type {
  GithubRepository,
  PackageDownloadInfo,
  PackageMetadata,
  Repos,
} from './type';
import type { Period } from './utils';

import { db } from '@esnext/db';
import fetch from 'node-fetch';

import {
  getGithubReposPath,
  getPackageDownloadUrl,
  getPackageMetadataUrl,
} from './utils';

export default class ReposApi {
  static getReposDetail = async (repos: Repos): Promise<GithubRepository> => {
    const url = getGithubReposPath(repos);
    const res = await fetch(url);
    return (await res.json()) as Promise<GithubRepository>;
  };

  static getPackageInfo = async (repos: Repos) => {
    const url = getPackageMetadataUrl(repos.reposName);
    const res = await fetch(url, {
      headers: {
        Accept: 'application/vnd.npm.install-v1+json',
      },
    });
    return (await res.json()) as Promise<PackageMetadata>;
  };

  static getPackageDownloadInfo = async (name: string, period: Period) => {
    const url = getPackageDownloadUrl(name, period);
    const res = await fetch(url);
    return (await res.json()) as Promise<PackageDownloadInfo>;
  };

  static getReposReadme = (repos: Repos) => {
    return repos.reposName;
  };

  static createRepos = async (repos: Repos) => {
    try {
      const gitRepos = await ReposApi.getReposDetail(repos);
      const packageInfo = await ReposApi.getPackageInfo(repos);
      const packageDownloadInfo = await ReposApi.getPackageDownloadInfo(
        repos.reposName,
        'last-week',
      );
      const readme = ReposApi.getReposReadme(repos);
      const data = {
        id: gitRepos.id,
        name: gitRepos.name,
        fullName: gitRepos.full_name,
        description: gitRepos.description,
        htmlUrl: gitRepos.html_url,
        homepage: gitRepos.homepage,
        languagesUrl: gitRepos.languages_url,
        createdAt: gitRepos.created_at,
        updatedAt: gitRepos.updated_at,
        pushedAt: gitRepos.pushed_at,
        stargazersCount: gitRepos.stargazers_count,
        size: gitRepos.size,
        openIssues: gitRepos.open_issues,
        forks: gitRepos.forks,
        language: gitRepos.language,
        isTemplate: gitRepos.is_template,
        licenseKey: gitRepos.license?.key,
        licenseName: gitRepos.license?.name,
        licenseSpdxId: gitRepos.license?.spdx_id,
        topics: gitRepos.topics.join(','),

        version: '1.0.0',
        versionUpdateTime: new Date(),
        logo: '',
      };
      await db.project.upsert({
        where: {
          id: gitRepos.id,
        },
        create: data,
        update: data,
      });
    } catch (error) {
      throw error;
    }
  };
}
