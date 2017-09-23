class ErrorComponent extends window.Component {
  constructor (data) {
    super({
      template: '#error-template'
    }, data)
  }
  init () {}
}

window.ErrorComponent = ErrorComponent