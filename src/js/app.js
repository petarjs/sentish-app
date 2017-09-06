class AppComponent extends window.Component {
  constructor () {
    super({
      inject: {
        api: window.api,
        MainPage: window.MainPageComponent
      }
    })

    this.$el = $('#app')
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