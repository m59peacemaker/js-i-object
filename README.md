# i-object

> Bro, does it even object?

It even does. It objects from an object, function, or array of objects, functions, and said arrays. Pass any of that stuff and get back a merged object.

Functions can return anything mentioned above. Recursive stuff happens and an object is produced. Don't think about it. Just pass stuff in, return stuff from functions, and get an object.

![I object!](https://raw.githubusercontent.com/m59peacemaker/js-i-object/master/i-object.jpg "I object!")

## Install
```
npm install i-object
```

## API

```javascript
var GetObject = require('i-object');
var getObject = GetObject(options);
```

### GetObject(options);

- `options: object`
  - `iterateProps: boolean, false` | will also interact with object properties and flatten objects
- *returns*: `object`

### getObject(input, ...params)

- `input: object, function, array` | Input to be used to find objects.
- `...params`: Any amount of anything that will be passed into functions within `input`.
- *returns*: `object`

See [tests](https://github.com/m59peacemaker/js-i-object/blob/master/test/index.js).

## License

[VOL](https://github.com/m59peacemaker/js-i-object/blob/master/LICENSE-VOL.txt)
