import type { Repos } from './type';

export type Period = 'last-day' | 'last-week' | 'last-month' | 'last-year';

export const GITHUB_HOST = 'https://api.github.com/';
export const NPM_HOST = 'https://registry.npmjs.org/';
export const DOWNLOAD_URL = 'https://api.npmjs.org/downloads/point/';

export function getGithubReposPath(repos: Repos) {
  return `${GITHUB_HOST}repos/${repos.reposOwner}/${repos.reposName}`;
}

export function getPackageDownloadUrl(name: string, period: Period) {
  return `${DOWNLOAD_URL}${period}/${name}`;
}

export function getPackageMetadataUrl(name: string) {
  return `${NPM_HOST}${name}`;
}

export function combineData() {
  //..
}
