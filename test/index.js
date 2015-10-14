var test = require('tape');
var thing = require('../build');

test('accepts a function and calls it with correct arguments', function(t) {
  t.plan(2);
  thing(function(a, b) {
    t.equal(a, 'foo');
    t.equal(b, 'bar');
  }, 'foo', 'bar');
});

test('applies to function return value', function(t) {
  t.plan(1);
  var result = thing(function() {
    return [function() {
      return {a: 'foo'}
    }];
  });
  t.deepEqual(result, {a: 'foo'});
});

test('accepts function and returns object', function(t) {
  t.plan(2);
  t.deepEqual(thing(function() {
    return {a: 'foo'};
  }), {a: 'foo'});
  t.deepEqual(thing(function() {}), {});
});

test('accepts array of functions and calls them with correct arguments', function(t) {
  t.plan(4);
  var fn = function(a, b) {
    t.equal(a, 'foo');
    t.equal(b, 'bar');
  };
  thing([fn, fn], 'foo', 'bar');
});

test('accepts array of objects/functions and merges resulting objects', function(t) {
  t.plan(1);
  var result = thing([
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
  var result = thing([
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
