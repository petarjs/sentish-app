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
    const averageSentiment = _.mean(issueScores).toFixed(2)

    const mostPositive = _.maxBy(issues, i => i.score * i.magnitude)
    const mostNegative = _.minBy(issues, i => i.score * i.magnitude)

    mostPositive.score = mostPositive.score.toFixed(2)
    mostPositive.magnitude = mostPositive.magnitude.toFixed(2)

    return {
      averageSentiment,
      mostNegative,
      mostPositive
    }
  },

  calculateIssueStatsByDay (issues) {
    const sortedIssues = _.sortBy(issues, i => moment(i.updated_at).valueOf())
    const grouppedByDay = _.groupBy(sortedIssues, i => moment(i.updated_at).format('YYYY-MM-DD'))
    const statsByDay = _.map(grouppedByDay, (issues, date) => ({
      x: date,
      y: issues.reduce((memo, i) => memo + i.score * i.magnitude, 0)
    }))
    return statsByDay
  }
}

window.utils = utils