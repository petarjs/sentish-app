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
    let repoData = this.utils.parseGitHubRepoUrl('https://github.com/hilongjw/vue-datepicker')
    this
      .api
      .getIssues(repoData)
      .then(issues => {
        console.log(issues)
      })
  }
}

window.MainPageComponent = MainPageComponent