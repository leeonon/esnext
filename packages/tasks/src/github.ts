type Repo = {
  name: string;
};

export default class GithubApi {
  public repos: Repo[];
  constructor(repos: Repo[]) {
    this.repos = repos;
  }
}
