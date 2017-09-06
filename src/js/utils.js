const utils = {
  validateGitHubRepoUrl (url) {
    return url.indexOf('github') !== -1
  },
  parseGitHubRepoUrl (githubRepoUrl) {
    let [repo, username] = githubRepoUrl.split('/').reverse()
    return {
      username,
      repo
    }
  }
}

window.utils = utils