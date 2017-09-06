class MainPageComponent {
  constructor (data) {
    if (data) {
      this._data = data
    }

    this.$template = $('#main-page-template')
    this.templateHtml = this.$template.html()
    this.compile = Handlebars.compile(this.templateHtml)
  }

  set data (data) {
    this._data = data
  }

  render () {
    return this.compile(this._data)
  }
}

window.MainPageComponent = MainPageComponent