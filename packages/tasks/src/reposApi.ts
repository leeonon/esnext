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
  combineCreateData,
  combineUpdateData,
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
      const project = await db.project.findUnique({
        where: {
          id: gitRepos.id,
        },
      });
      const readme = ReposApi.getReposReadme(repos);
      if (!project) {
        const data = combineCreateData({
          repos: gitRepos,
          packageMetadata: packageInfo,
          packageDownloadInfo,
          readme,
        });
        const result = await db.project.create({
          data,
        });
        await db.projectReadme.create({
          data: {
            content: readme,
            projectId: result.id,
          },
        });

        // TODO change category
        const categoryIds = [1, 2, 3];
        for (const categoryId of categoryIds) {
          await db.categoryOnProject.create({
            data: {
              categoryId: categoryId,
              projectId: result.id,
            },
          });
        }
      } else {
        const data = combineUpdateData({
          repos: gitRepos,
          packageMetadata: packageInfo,
          packageDownloadInfo,
          readme,
        });
        await db.project.update({
          where: { id: gitRepos.id },
          data,
        });
      }
      // await db.project.upsert({
      //   where: {
      //     id: gitRepos.id,
      //   },
      //   create: data,
      //   update: data,
      // });
    } catch (error) {
      throw error;
    }
  };
}
