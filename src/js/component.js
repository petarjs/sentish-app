class Component {
  constructor ({ template, inject }, data) {
    if (data) {
      this._data = data
    }

    this.inject(inject)

    if (template) {
      this.$template = $(template)
      this.templateHtml = this.$template.html()
      this.compile = Handlebars.compile(this.templateHtml)
      this.render()
    }

    this.init()
  }

  set data (data) {
    this._data = data
  }

  inject (deps) {
    _.each(deps, (dep, depName) => {
      this[depName] = dep
    })
  }

  render ({ force = false } = {}) {
    if (!this.$el || force) {
      this.$el = $('<div>').html(this.compile(this._data))
    }

    return this.$el
  }
}

window.Component = Component