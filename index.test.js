
var URLBuilder = require('./index.js')

it('should have the correct method', function () {
  var builder = new URLBuilder('http://test-url.com')
  expect(builder.params).toBeTruthy()
  expect(builder.build).toBeTruthy()
})

it('should build the right url', function () {
  var expectedURL = 'http://test-url.com?query1=1&query2=2'
  var resultURL = new URLBuilder('http://test-url.com')
    .params('query1', '1')
    .params('query2', '2')
    .build()

  expect(resultURL).toBe(expectedURL)
})

it('should handle null value correctly', function () {
  var expectedURL = 'http://test-url.com?query1=1&query2=2'
  var resultURL = new URLBuilder('http://test-url.com')
    .params('query1', '1')
    .params('query2', '2')
    .params('query3', null)
    .build()

  expect(resultURL).toBe(expectedURL)
})

it('should handle empty string value correctly', function () {
  var expectedURL = 'http://test-url.com?query1=1&query2=2'
  var resultURL = new URLBuilder('http://test-url.com')
    .params('query1', '1')
    .params('query2', '2')
    .params('query3', '')
    .build()

  expect(resultURL).toBe(expectedURL)
})


