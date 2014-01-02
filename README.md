# co-first

Yield the first async value returned for the co generator library.

[![build status](https://secure.travis-ci.org/eugeneware/co-first.png)](http://travis-ci.org/eugeneware/co-first)

## Installation

This module is installed via npm:

``` bash
$ npm install co-first
```

## Background

By default, the [co](https://github.com/visionmedia/co) library only supports
joining when ALL the asynchronous operations have returned:

``` js
var co = require('co');
co(function *() {
  var a = yield asyncFunc1();
  var b = yield asyncFunc1();

  // wait for BOTH a and b to be returned
  var res = yield [a, b];
})();
```

But it is often useful to be able to just wait for only the FIRST value to be
returned, for example, in the event of a timeout:

## Example Usage

### Returning first caller and value

By default, ```co-first``` will return an object that contains both the
winning first async operation (on the ```caller``` property) and the value
on the ```value``` property, allowing you to do a ```switch``` after the
first to work out what happened:

``` js
var co = require('co'),
    first = require('co-first');
co(function *() {
  var a = yield asyncFunc1();
  var b = yield asyncFunc1();

  // wait for the FIRST of a and b to be returned
  var firstResult = yield first([a, b]);
  switch (firstResult.caller) {
    case a:
      var valA = firstResult.value;
      break;

    case b:
      var valB = firstResult.value;
      break;
  }
})();
```

### Returning just the first value

When your asynchronous operations return the same value, then you can pass
```true``` in for the last variable and just get the first value:

``` js
var co = require('co'),
    first = require('co-first');
co(function *() {
  var a = yield asyncFunc1();
  var b = yield asyncFunc1();

  // wait for the FIRST of a and b to be returned and simply return the
  // winning value
  var firstValue = yield first([a, b], true);
})();
```
