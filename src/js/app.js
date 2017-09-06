class AppComponent {
  constructor () {
    this.$el = $('#app')
    this.api = window.api
    this.MainPage = window.MainPageComponent
  }
  init () {
    api
      .getTotals()
      .then(totals => new this.MainPage({ totals }))
      .then(mainPage => {
        this.$el.html(mainPage.$el)
      })
  }
}

window.AppComponent = AppComponent