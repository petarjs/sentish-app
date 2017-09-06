class MainPageComponent {
  constructor (data) {
    if (data) {
      this._data = data
    }

    this.api = window.api
    this.utils = window.utils

    this.$template = $('#main-page-template')
    this.templateHtml = this.$template.html()
    this.compile = Handlebars.compile(this.templateHtml)
    this.render()
    this.init()
  }

  set data (data) {
    this._data = data
  }

  render () {
    if (!this.$el) {
      this.$el = $('<div>').html(this.compile(this._data))
    }
    return this.$el
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