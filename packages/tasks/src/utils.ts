import type {
  GithubRepository,
  PackageDownloadInfo,
  PackageMetadata,
  Repos,
} from './type';

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

export function getReposReadmeUrl(repos: Repos) {
  return `${GITHUB_HOST}repos/${repos.reposOwner}/${repos.reposName}/contents/README.md`;
}

export function combineCreateData({
  repos,
  packageMetadata,
  packageDownloadInfo,
}: {
  repos: GithubRepository;
  packageMetadata: PackageMetadata;
  packageDownloadInfo: PackageDownloadInfo;
}) {
  const data = {
    id: repos.id,
    name: repos.name,
    fullName: repos.full_name,
    description: repos.description,
    htmlUrl: repos.html_url,
    homepage: repos.homepage,
    languagesUrl: repos.languages_url,
    createdAt: repos.created_at,
    updatedAt: repos.updated_at,
    pushedAt: repos.pushed_at,
    stargazersCount: repos.stargazers_count,
    size: repos.size,
    openIssues: repos.open_issues,
    forks: repos.forks,
    language: repos.language,
    isTemplate: repos.is_template,
    licenseKey: repos.license?.key,
    licenseName: repos.license?.name,
    licenseSpdxId: repos.license?.spdx_id,
    topics: repos.topics.join(','),

    ownerLogin: repos.owner.login,
    ownerId: repos.owner.id,
    ownerAvatarUrl: repos.owner.avatar_url,
    ownerHtmlUrl: repos.owner.html_url,
    ownerType: repos.owner.type,

    version: packageMetadata['dist-tags'].latest || '',
    modified: packageMetadata.modified,

    weeklyDownloads: packageDownloadInfo.downloads,
  };
  return data;
}

export function combineUpdateData({
  repos,
  packageMetadata,
  packageDownloadInfo,
}: {
  repos: GithubRepository;
  packageMetadata: PackageMetadata;
  packageDownloadInfo: PackageDownloadInfo;
}) {
  const data = {
    id: repos.id,
    name: repos.name,
    fullName: repos.full_name,
    description: repos.description,
    htmlUrl: repos.html_url,
    homepage: repos.homepage,
    languagesUrl: repos.languages_url,
    createdAt: repos.created_at,
    updatedAt: repos.updated_at,
    pushedAt: repos.pushed_at,
    stargazersCount: repos.stargazers_count,
    size: repos.size,
    openIssues: repos.open_issues,
    forks: repos.forks,
    language: repos.language,
    isTemplate: repos.is_template,
    licenseKey: repos.license?.key,
    licenseName: repos.license?.name,
    licenseSpdxId: repos.license?.spdx_id,
    topics: repos.topics.join(','),

    ownerLogin: repos.owner.login,
    ownerId: repos.owner.id,
    ownerAvatarUrl: repos.owner.avatar_url,
    ownerHtmlUrl: repos.owner.html_url,
    ownerType: repos.owner.type,

    version: packageMetadata['dist-tags'].latest || '',
    modified: packageMetadata.modified,

    weeklyDownloads: packageDownloadInfo.downloads,
  };
  return data;
}
