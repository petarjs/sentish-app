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

    mostPositive.total = (mostPositive.score * mostPositive.magnitude).toFixed(2)
    mostPositive.score = mostPositive.score.toFixed(2)
    mostPositive.magnitude = mostPositive.magnitude.toFixed(2)

    mostNegative.total = (mostNegative.score * mostNegative.magnitude).toFixed(2)
    mostNegative.score = mostNegative.score.toFixed(2)
    mostNegative.magnitude = mostNegative.magnitude.toFixed(2)

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
  },

  getStandardDeviation (array) {
    var avg = _.sum(array) / array.length
    return Math.sqrt(_.sum(_.map(array, (i) => Math.pow((i - avg), 2))) / array.length)
  },

  getIssueTotals (issues) {
    return _.map(issues, i => i.score * i.magnitude)
  },

  groupIssuesByStandardDeviation (issues) {
    const issueTotals = this.getIssueTotals(issues)
    const sd = this.getStandardDeviation(issueTotals)
    // const mean = _.mean(issueTotals)
    const mean = 0
    const groups = _.groupBy(issues, i => {
      let total = i.score * i.magnitude

      if (total === 0) {
        return 'Neutral'
      }

      if (total > (mean + sd)) {
        return 'Very Positive'
      }

      if (total >= mean && total <= (mean + sd)) {
        return 'Positive'
      }

      if (total <= mean && total >= (mean - sd)) {
        return 'Negative'
      }

      if (total < (mean - sd)) {
        return 'Very Negative'
      }
    })

    const groupsWithLengths = {
      'Positive': 0,
      'Negative': 0,
      'Very Negative': 0,
      'Very Positive': 0,
      'Neutral': 0
    }

    _.each(groups, (issues, group) => {
      groupsWithLengths[group] = issues.length
    })

    return groupsWithLengths
  }
}

window.utils = utils