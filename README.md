# i-object

> Bro, does it even object?

It even does. It objects from an object, function, or array of objects, functions, and said arrays. Pass any of that stuff and get back a merged object.

Functions can return anything mentioned above. Recursive stuff happens and an object is produced. Don't think about it. Just pass stuff in, return stuff from functions, and get an object.

![I object!](https://raw.githubusercontent.com/m59peacemaker/js-i-object/master/i-object.jpg "I object!")

## install

```sh
npm install i-object
```

## example

```js
const getObject = require('i-object')

getObject([
  {a: 123, b: 'b'},
  () => ({a: 456})
]) // -> {a: 456, b: 'b'}
```

## API

### `getObject(input, args)`

- `input: object, function, array` input to be used to find objects
- `args: []`: functions found within `input` will be called with these arguments
- **returns**: `object` duh

See [tests](https://github.com/m59peacemaker/js-i-object/blob/master/test/index.js).
