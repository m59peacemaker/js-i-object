var test = require('tape')

var getObject = require('../')

test('accepts a function and calls it with correct arguments', function (t) {
  t.plan(2)
  getObject(function (a, b) {
    t.equal(a, 'foo')
    t.equal(b, 'bar')
  }, 'foo', 'bar')
})

test('applies to function return value', function (t) {
  t.plan(1)
  var result = getObject(function () {
    return [function () {
      return {a: 'foo'}
    }]
  })
  t.deepEqual(result, {a: 'foo'})
})

test('does not return an object if none found', function (t) {
  t.plan(2)
  t.deepEqual(getObject(function () {}), undefined)
  t.deepEqual(getObject([[function () {}], []]), undefined)
})

test('accepts array of functions and calls them with correct arguments', function (t) {
  t.plan(4)
  var fn = function (a, b) {
    t.equal(a, 'foo')
    t.equal(b, 'bar')
  }
  getObject([fn, fn], 'foo', 'bar')
})

test('accepts array of objects/functions and merges resulting objects', function (t) {
  t.plan(1)
  var result = getObject([
    {
      a: 'foo',
      b: 'bar'
    },
    function () {
      return {
        a: null,
        b: 'baz'
      }
    },
    {
      c: 'qux'
    }
  ])
  t.deepEqual(result, {
    a: null,
    b: 'baz',
    c: 'qux'
  })
})

test('works recurivsely (nested arrays, function returns)', function (t) {
  t.plan(1)
  var result = getObject([
    {
      a: 'foo',
      b: 'bar'
    },
    function () {
      return [{
        a: null,
        b: 'baz'
      }, function () {
        return {
          b: 'biz',
          c: 'qiz',
          d: 'diz'
        }
      }]
    },
    {
      d: 'qux'
    },
    [{
      e: 'eek'
    }]
  ])
  t.deepEqual(result, {
    a: null,
    b: 'biz',
    c: 'qiz',
    d: 'qux',
    e: 'eek'
  })
})

test('does not mutate', function (t) {
  t.plan(3)
  var x = {a: 123}
  var y = {a: 456}
  t.deepEqual(getObject([x, y]), {a: 456})
  t.deepEqual(x, {a: 123})
  t.deepEqual(y, {a: 456})
})
