import type {
  GithubRepository,
  GithubReposWithReadme,
  PackageDownloadInfo,
  PackageMetadata,
  Repos,
} from './type';
import type { Period } from './utils';

import { db } from '@esnext/db';
import { env } from '@esnext/env';
import captureWebsite from 'capture-website';
import COS from 'cos-nodejs-sdk-v5';
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

const cos = new COS({
  SecretId: env.COS_SECRET_ID,
  SecretKey: env.COS_SECRET_KEY,
});

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

  static getHomePageCover = async (url: string, name: string) => {
    try {
      const result = await captureWebsite.buffer(url, {
        type: 'png',
      });
      const data = await cos.putObject({
        Bucket: env.COS_BUCKET,
        Region: env.COS_REGION,
        Key: `${env.COS_PATH}/${name}.png`,
        Body: Buffer.from(result),
      });
      return `https://${data.Location}`;
    } catch (error) {
      return null;
    }
  };

  static createRepos = async (repos: Repos, categorySlugs: string[] = []) => {
    try {
      const gitRepos = await ReposApi.getReposDetail(repos);
      const packageInfo = await ReposApi.getPackageInfo(repos);
      const packageDownloadInfo = await ReposApi.getPackageDownloadInfo(
        repos.reposName,
        'last-week',
      );
      const readme = await ReposApi.getReposReadme(repos);
      let cover = null;
      if (gitRepos.homepage) {
        cover = await ReposApi.getHomePageCover(
          gitRepos.homepage,
          repos.reposName,
        );
      }
      const data = combineCreateData({
        repos: gitRepos,
        packageMetadata: packageInfo,
        packageDownloadInfo,
        cover,
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
    } catch (error) {
      throw error;
    }
  };

  static updateRepos = async (repos: Repos) => {
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
      if (!project) {
        throw new Error('Project not found');
      }
      const data = combineUpdateData({
        repos: gitRepos,
        packageMetadata: packageInfo,
        packageDownloadInfo,
      });
      const result = await db.project.update({
        where: { id: gitRepos.id },
        data,
      });
      return result;
    } catch (error) {
      throw error;
    }
  };
}
