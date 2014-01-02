module.exports = select;
function select(asyncs, valuesOnly) {
  var ctx = this;
  return function (cb) {
    var called = false;
    function first(async, err, result) {
      if (called) return;
      called = true;
      if (valuesOnly) {
        cb.apply(ctx, Array.prototype.slice.call(arguments, 1));
      } else {
        var results = result;
        if (arguments.length > 3) {
          results = Array.prototype.slice.call(arguments, 2);
        }
        cb.call(ctx, err, {
          caller: async,
          value: results
        });
      }
    }
    asyncs.forEach(function (async) {
      async.call(ctx, first.bind(null, async));
    });
  };
}

