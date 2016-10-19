var _ = require('lodash')

function URLBuilder (baseURL) {
  this.baseURL = baseURL
  this.params = []
}

URLBuilder.prototype = Object.create(Object.prototype)
URLBuilder.prototype.constructor = URLBuilder

URLBuilder.prototype.params = function (key, value) {
  this.params.push({
    [key]: value
  })
  return this
}

URLBuilder.prototype.build = function () {
  var urls = _.chain(this.params)
    .filter(function (item) {
      return _.values(item).every(function (it) {
        return it != null
      })
    })
    .reduce(function (result, item) {
      const urlMap = _.map(item, function (value, key) {
        return '' + key + '=' + value
      })
      return result.concat(urlMap)
    })
    .join('&')
    .value()
  return '' + this.baseURL + '?' + urls
}

module.exports = URLBuilder