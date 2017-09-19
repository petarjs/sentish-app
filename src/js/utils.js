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
  },

  calculateIssueStats (issues) {
    const issueScores = issues.map(i => i.score * i.magnitude)
    const averageSentiment = _.mean(issueScores)

    const mostPositive = _.maxBy(issues, i => i.score * i.magnitude)
    const mostNegative = _.minBy(issues, i => i.score * i.magnitude)

    return {
      averageSentiment,
      mostNegative,
      mostPositive
    }
  }
}

window.utils = utils