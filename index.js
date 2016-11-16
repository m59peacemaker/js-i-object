var merge = require('deepmerge')

function getObject (input) {
  var params = [].slice.call(arguments, 1)
  if (Array.isArray(input)) {
    // turn array of arrays, functions, objects into just an array of objects
    var objects = input.map(function (value) {
      return getObject.apply(undefined, [value].concat(params))
    }).filter(function (v) {
      return v !== undefined
    })
    return (objects && objects.length) ? merge.all([{}].concat(objects)) : undefined
  } else if (typeof input === 'function') {
    // call function with params and get back a function, array, or object
    var result = input.apply(undefined, params)
    return getObject.apply(undefined, [result].concat(params))
  } else {
    return input
  }
}

module.exports = getObject
