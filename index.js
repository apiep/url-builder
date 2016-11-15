var _ = require('lodash')
var filter = require('lodash/fp/filter')
var reduce = require('lodash/fp/reduce')
var join = require('lodash/fp/join')
var map = require('lodash/fp/map')
var values = require('lodash/fp/values')
var every = require('lodash/fp/every')
var compose = require('lodash/fp/compose')

function URLBuilder (baseURL) {
  this.baseURL = baseURL
  this._params = []
}

URLBuilder.prototype = Object.create(Object.prototype)
URLBuilder.prototype.constructor = URLBuilder

URLBuilder.prototype.params = function (key, value) {
  var obj = {}
  obj[key] = value
  this._params.push(obj)
  return this
}

URLBuilder.prototype.build = function () {
  var _map = map.convert({ cap: false })
  var urls = compose(
    join('&'),
    reduce(function (result, item) {
      var urlMap = _map(function (value, key) {
        return '' + key + '=' + value
      })(item)
      return result.concat(urlMap)
    }, []),
    filter(compose(
      every(function (it) { return it != null && it.length !== 0 }),
      values
    ))
  )(this._params)
  return '' + this.baseURL + '?' + urls
}

module.exports = URLBuilder