var test = require('tape');

var GetObject = require('../build');
var getObject = GetObject();

test('accepts a function and calls it with correct arguments', function(t) {
  t.plan(2);
  getObject(function(a, b) {
    t.equal(a, 'foo');
    t.equal(b, 'bar');
  }, 'foo', 'bar');
});

test('applies to function return value', function(t) {
  t.plan(1);
  var result = getObject(function() {
    return [function() {
      return {a: 'foo'}
    }];
  });
  t.deepEqual(result, {a: 'foo'});
});

test('accepts function and returns object', function(t) {
  t.plan(2);
  t.deepEqual(getObject(function() {
    return {a: 'foo'};
  }), {a: 'foo'});
  t.deepEqual(getObject(function() {}), {});
});

test('accepts array of functions and calls them with correct arguments', function(t) {
  t.plan(4);
  var fn = function(a, b) {
    t.equal(a, 'foo');
    t.equal(b, 'bar');
  };
  getObject([fn, fn], 'foo', 'bar');
});

test('accepts array of objects/functions and merges resulting objects', function(t) {
  t.plan(1);
  var result = getObject([
    {
      a: 'foo',
      b: 'bar',
    },
    function() {
      return {
        a: null,
        b: 'baz',
      };
    },
    {
      c: 'qux'
    }
  ]);
  t.deepEqual(result, {
    a: null,
    b: 'baz',
    c: 'qux'
  });
});

test('works recurivsely (nested arrays, function returns)', function(t) {
  t.plan(1);
  var result = getObject([
    {
      a: 'foo',
      b: 'bar',
    },
    function() {
      return [{
        a: null,
        b: 'baz',
      }, function() {
        return {
          b: 'biz',
          c: 'qiz',
          d: 'diz',
        }
      }];
    },
    {
      d: 'qux'
    },
    [{
      e: 'eek'
    }]
  ]);
  t.deepEqual(result, {
    a: null,
    b: 'biz',
    c: 'qiz',
    d: 'qux',
    e: 'eek'
  });
});

test('can optionally act on object properties', function(t) {
  t.plan(1);
  var getObject = GetObject({
    iterateProps: true
  });
  var result = getObject({
    foo: 'a',
    bar: 'b',
    qux: 123,
    car: {
      bar: 'b2',
      car: 'c',
    },
    baz: function() {
      return {foo: 'a2'};
    },
    biz: [{
      foo: {
        foh: 'x'
      }
    }]
  });
  t.deepEqual(result, {
    foo: 'a2',
    bar: 'b2',
    qux: 123,
    car: 'c',
    foh: 'x'
  });
});
