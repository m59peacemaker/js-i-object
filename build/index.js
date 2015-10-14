'use strict';

var merge = require('lodash/object/merge');

module.exports = thing;

function thing(input) {
  var _this = this,
      _arguments = arguments;

  if (!Array.isArray(input)) {
    return handleItem.apply(this, arguments);
  }
  var objects = input.map(function (item) {
    return handleItem.apply(_this, [item].concat([].slice.call(_arguments, 1)));
  });
  objects.unshift({});
  return merge.apply(null, objects);
}

function handleItem(_x) {
  var _this2 = this,
      _arguments2 = arguments;

  var _again = true;

  _function: while (_again) {
    var item = _x;
    _again = false;

    if (Array.isArray(item)) {
      return thing.apply(_this2, _arguments2);
    } else if (typeof item === 'object') {
      return item;
    } else if (typeof item === 'function') {
      _this2 = undefined;
      _arguments2 = [_x = item.apply(_this2, [].slice.call(_arguments2, 1)) || {}];
      _again = true;
      continue _function;
    } else {
      throw new Error(typeof item + ' is not supported. Input should be an array, object or function.');
    }
  }
}

