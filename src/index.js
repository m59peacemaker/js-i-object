var merge = require('lodash/object/merge');

module.exports = function(options) {

  options = Object.assign({
    iterateProps: false
  }, options);

  function getObject(input, ...params) {
    if (!Array.isArray(input)) {
      return handleItem(input, ...params);
    }
    var objects = input.map((item) => handleItem(item, ...params));
    objects.unshift({});
    return merge.apply(null, objects);
  }

  function handleItem(item, ...params) {
    if (Array.isArray(item)) {
      return getObject(item, ...params);
    } else if (typeof item === 'object') {
      if (options.iterateProps) {
        return flattenObject(item, ...params);
      } else {
        return item;
      }
    } else if (typeof item === 'function') {
      return handleItem(item(...params) || {});
    } else {
      throw new Error(typeof  item+' is not supported. Input should be an array, object or function.');
    }
  }

  function flattenObject(object, ...params) {
    object = Object.assign({}, object);
    var objects = [object];
    Object.keys(object).forEach(function(key) {
      var val = object[key];
      if (canGetObject(val)) {
        delete object[key];
        objects.push(handleItem(val));
      }
    });
    return merge(...objects);
  }

  function canGetObject(item) {
    return typeof item === 'object' || typeof item === 'function' || Array.isArray(item);
  }

  return getObject
};
