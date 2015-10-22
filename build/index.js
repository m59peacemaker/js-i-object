'use strict';

var merge = require('lodash/object/merge');

module.exports = function (options) {

  options = Object.assign({
    iterateProps: false
  }, options);

  function getObject(input) {
    for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    if (!Array.isArray(input)) {
      return handleItem.apply(undefined, [input].concat(params));
    }
    var objects = input.map(function (item) {
      return handleItem.apply(undefined, [item].concat(params));
    });
    objects.unshift({});
    return merge.apply(null, objects);
  }

  function handleItem(_x) {
    var _arguments = arguments;
    var _again = true;

    _function: while (_again) {
      var item = _x;
      _len2 = params = _key2 = undefined;
      _again = false;

      for (var _len2 = _arguments.length, params = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = _arguments[_key2];
      }

      if (Array.isArray(item)) {
        return getObject.apply(undefined, [item].concat(params));
      } else if (typeof item === 'object') {
        if (options.iterateProps) {
          return flattenObject.apply(undefined, [item].concat(params));
        } else {
          return item;
        }
      } else if (typeof item === 'function') {
        _arguments = [_x = item.apply(undefined, params) || {}];
        _again = true;
        continue _function;
      } else {
        throw new Error(typeof item + ' is not supported. Input should be an array, object or function.');
      }
    }
  }

  function flattenObject(object) {
    object = Object.assign({}, object);
    var objects = [object];
    Object.keys(object).forEach(function (key) {
      var val = object[key];
      if (canGetObject(val)) {
        delete object[key];
        objects.push(handleItem(val));
      }
    });
    return merge.apply(undefined, objects);
  }

  function canGetObject(item) {
    return typeof item === 'object' || typeof item === 'function' || Array.isArray(item);
  }

  return getObject;
};