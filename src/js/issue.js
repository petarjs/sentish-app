class IssueComponent extends window.Component {
  constructor (data) {
    super({
      template: '#issue-template'
    }, data)
  }
  init () {}
}

window.IssueComponent = IssueComponent