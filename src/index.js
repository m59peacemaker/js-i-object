var merge = require('lodash/object/merge');

module.exports = getObject;

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
    return item;
  } else if (typeof item === 'function') {
    return handleItem(item(...params) || {});
  } else {
    throw new Error(typeof  item+' is not supported. Input should be an array, object or function.');
  }
}
