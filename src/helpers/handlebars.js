const Handlebars = require('handlebars')

module.exports = {
  eq: function (a, b) {
    return a === b
  },
  sum: (a, b) => a + b,
  sortable: (field, sort) => {
    const sortType = field === sort.column ? sort.type : 'default'

    const icons = {
      default: 'fa-solid fa-arrow-up-long',
      asc: 'fa-solid fa-arrow-up-1-9',
      desc: 'fa-solid fa-arrow-up-9-1',
    }

    const types = {
      default: 'desc',
      asc: 'desc',
      desc: 'asc',
    }

    const icon = icons[sortType]
    const type = types[sortType]

    const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`)

    const output = ` <a href="${href}">
                        <i class="${icon}"></i>
                    </a> `
    return new Handlebars.SafeString(output)
  },
}
