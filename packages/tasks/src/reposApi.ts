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
    const url = getPackageMetadataUrl(repos.name);
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

  static requestPackage = async (repos: Repos) => {
    const gitRepos = await ReposApi.getReposDetail(repos);
    const packageInfo = await ReposApi.getPackageInfo(repos);
    const packageDownloadInfo = await ReposApi.getPackageDownloadInfo(
      repos.reposName,
      'last-week',
    );
    const readme = await ReposApi.getReposReadme(repos);
    const project = await db.project.findUnique({
      where: { id: gitRepos.id },
    });
    if (!project) {
      ReposApi.createRepos({
        gitRepos,
        packageInfo,
        packageDownloadInfo,
        repos,
        readme,
        categorySlugs: repos.category || [],
      });
    } else {
      ReposApi.updateRepos({
        gitRepos,
        packageInfo,
        packageDownloadInfo,
        readme,
      });
    }
  };

  static createRepos = async ({
    gitRepos,
    packageInfo,
    packageDownloadInfo,
    repos,
    readme,
    categorySlugs,
  }: {
    gitRepos: GithubRepository;
    packageInfo: PackageMetadata;
    packageDownloadInfo: PackageDownloadInfo;
    repos: Repos;
    readme: string;
    categorySlugs: string[];
  }) => {
    try {
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

  static updateRepos = async ({
    gitRepos,
    packageInfo,
    packageDownloadInfo,
    readme,
  }: {
    gitRepos: GithubRepository;
    packageInfo: PackageMetadata;
    packageDownloadInfo: PackageDownloadInfo;
    readme: string;
  }) => {
    try {
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
    } catch (error) {
      throw error;
    }
  };
}
