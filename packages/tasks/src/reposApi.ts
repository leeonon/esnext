import type {
  GithubRepository,
  GithubReposWithReadme,
  PackageDownloadInfo,
  PackageMetadata,
  Repos,
} from './type';
import type { Period } from './utils';

import { db } from '@esnext/db';
import { decode } from 'js-base64';
import fetch from 'node-fetch';

import {
  combineCreateData,
  combineUpdateData,
  getGithubReposPath,
  getPackageDownloadUrl,
  getPackageMetadataUrl,
  getReposReadmeUrl,
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

  static getReposReadme = async (repos: Repos) => {
    const url = getReposReadmeUrl(repos);
    const res = await fetch(url);
    const data = (await res.json()) as GithubReposWithReadme;
    if (res.ok) {
      return decode(data.content);
    }
    return '';
  };

  static createRepos = async (repos: Repos, categorySlugs: string[] = []) => {
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
      const readme = await ReposApi.getReposReadme(repos);
      if (!project) {
        const data = combineCreateData({
          repos: gitRepos,
          packageMetadata: packageInfo,
          packageDownloadInfo,
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

        for (const slug of categorySlugs) {
          await db.categoryOnProject.create({
            data: {
              categorySlug: slug,
              projectId: result.id,
            },
          });
        }

        return result;
      } else {
        const data = combineUpdateData({
          repos: gitRepos,
          packageMetadata: packageInfo,
          packageDownloadInfo,
        });
        const result = await db.project.update({
          where: { id: gitRepos.id },
          data,
        });
        await db.projectReadme.update({
          where: {
            projectId: result.id,
          },
          data: {
            content: readme,
          },
        });

        return result;
      }
    } catch (error) {
      throw error;
    }
  };
}
