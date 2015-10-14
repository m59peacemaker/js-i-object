var merge = require('lodash/object/merge');

module.exports = thing;

function thing(input) {
  if (!Array.isArray(input)) {
    return parseItem.apply(this, arguments);
  }
  var objects = input.map((item) => parseItem.apply(this, [item].concat([].slice.call(arguments, 1))));
  objects.unshift({});
  return merge.apply(null, objects);
}

function parseItem(item) {
  if (Array.isArray(item)) {
    return thing.apply(this, arguments);
  } else if (typeof item === 'object') {
    return item;
  } else if (typeof item === 'function') {
    return parseItem(item.apply(this, [].slice.call(arguments, 1)) || {});
  } else {
    throw new Error(typeof  item+' is not supported. Input should be an array, object or function.');
  }
}
