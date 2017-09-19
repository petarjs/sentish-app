class StatsComponent extends window.Component {
  constructor (data) {
    super({
      template: '#stats-template'
    }, data)
  }
  init () {}
}

window.StatsComponent = StatsComponent