class StatsByDayComponent extends window.Component {
  constructor (data) {
    super({
      template: '#stats-by-day-template'
    }, data)
  }
  init () {}

  mounted () {
    this.createChart()
  }

  createChart () {
    const ctx = $('#statsByDayChart')[0].getContext('2d')
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: _.map(this.data, 'x'),
        datasets: [{
          label: 'Sentiment',
          data: this.data
        }]
      }
    })
  }

  onChange () {
    this.chart.destroy()
    this.createChart()
  }
}

window.StatsByDayComponent = StatsByDayComponent