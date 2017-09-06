class MainPageComponent extends window.Component {
  constructor (data) {
    super({
      template: '#main-page-template',
      inject: {
        api: window.api,
        utils: window.utils
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
    const repoData = window.utils.parseGitHubRepoUrl(repoUrl)
    this
      .api
      .getIssues(repoData)
      .then(issues => {
        console.log(issues)
      })
  }
}

window.MainPageComponent = MainPageComponent