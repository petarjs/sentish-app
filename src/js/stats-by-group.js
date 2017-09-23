class StatsByGroupComponent extends window.Component {
  constructor (data) {
    super({
      template: '#stats-by-group-template'
    }, data)
  }
  init () {}

  mounted () {
    this.createChart()
  }

  createChart () {
    const colors = {
      "red": "rgb(255, 99, 132)",
      "orange": "rgb(255, 159, 64)",
      "yellow": "rgb(255, 205, 86)",
      "green": "rgb(75, 192, 192)",
      "blue": "rgb(54, 162, 235)",
      "purple": "rgb(153, 102, 255)",
      "grey": "rgb(201, 203, 207)"
    }
    const ctx = $('#statsByGroupChart')[0].getContext('2d')
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [{
          label: 'Issue Groups',
          data: _.values(this.data),
          backgroundColor: [
            colors.blue,
            colors.orange,
            colors.red,
            colors.green,
        ],
        }],
        labels: _.keys(this.data)
      }
    })
  }

  onChange () {
    this.chart.destroy()
    this.createChart()
  }
}

window.StatsByGroupComponent = StatsByGroupComponent