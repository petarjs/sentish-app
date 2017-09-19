class Component {
  constructor ({ template, inject }, data) {

    this.isMounted = false

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

  get data () {
    return this._data
  }

  set data (data) {
    this._data = data

    if (this.onChange && _.isFunction(this.onChange)) {
      this.onChange()
    }
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

    if (!this.isMounted) {
      this.isMounted = true
      setTimeout(() => {
        if (this.isMounted && _.isFunction(this.mounted)) {
          this.mounted()
        }
      }, 1)
    }

    return this.$el
  }
}

window.Component = Component