# i-object

> Bro, does it even object?

It even does. It objects from an object, function, or array of objects, functions, and said arrays. Pass any of that stuff and get back a merged object.

Functions can return anything mentioned above. Recursive stuff happens and an object is produced. Don't think about it. Just pass stuff in, return stuff from functions, and get an object.

This module doesn't iterate object properties, so `{foo: 1', bar: {foo: 2}}` won't merge the nested object or interact with an array or function nested in an object.

![I object!](https://raw.githubusercontent.com/m59peacemaker/js-i-object/master/i-object.jpg "I object!")

## Install
```
npm install i-object
```

## module(input, ...params)

Any parameters after `input` will be passed to functions found in `input`.

## Usage

See [tests](https://github.com/m59peacemaker/js-i-object/blob/master/test/index.js).

## License

[VOL](https://github.com/m59peacemaker/js-i-object/blob/master/LICENSE-VOL.txt)
