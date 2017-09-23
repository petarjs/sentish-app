class MainPageComponent extends window.Component {
  constructor (data) {
    super({
      template: '#main-page-template',
      inject: {
        api: window.api,
        utils: window.utils,
        Issue: window.IssueComponent,
        Error: window.ErrorComponent,
        Stats: window.StatsComponent,
        StatsByDay: window.StatsByDayComponent,
        StatsByGroup: window.StatsByGroupComponent
      }
    }, data)
  }

  init () {
    this.$el.find('.search').on('keydown', this.onSearchKeydown.bind(this))
  }

  onSearchKeydown (event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      event.preventDefault()
      if (event.target.value) {
        this.getIssues(event.target.value)
      }
    }
  }

  getIssues (repoUrl) {
    this.$el.find('.main__issues').empty()
    this.$el.find('.main__stats-by-group').empty()
    this.$el.find('.main__stats').empty()
    this.$el.find('.main__stats-by-day').empty()

    this.utils.showLoader()

    const repoData = this.utils.parseGitHubRepoUrl(repoUrl)
    this
      .api
      .getIssues(repoData)
      .then(issues => {
        this.utils.hideLoader()

        const issueGroups = this.utils.groupIssuesByStandardDeviation(issues.data)
        const statsByGroupHtml = (new this.StatsByGroup(issueGroups)).render()
        this.$el.find('.main__stats-by-group').append(statsByGroupHtml)

        const stats = this.utils.calculateIssueStats(issues.data)
        const statsHtml = (new this.Stats(stats)).render()
        this.$el.find('.main__stats').append(statsHtml)

        const statsByDay = this.utils.calculateIssueStatsByDay(issues.data)
        const statsByDayHtml = (new this.StatsByDay(statsByDay)).render()
        this.$el.find('.main__stats-by-day').append(statsByDayHtml)

        const issuesHtml = issues.data
          .map(issue => new this.Issue(issue))
          .map(issue => issue.render())

        this.$el.find('.main__issues').append(issuesHtml)
      })
      .catch(error => {
        this.utils.hideLoader()

        const errorHtml = (new this.Error({
          message: 'Oops... something went wrong. Try another repo!'
        })).render()

        this.$el.find('.main__issues').append(errorHtml)
      })
  }
}

window.MainPageComponent = MainPageComponent