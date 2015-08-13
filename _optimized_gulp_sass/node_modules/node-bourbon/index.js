var path = require('path');
var bourbonEntryPoint = require.resolve('bourbon');

var bourbonDir = path.dirname(bourbonEntryPoint);

function includePaths() {
  return [bourbonDir];
}

module.exports = {

  includePaths: includePaths(),

  with: function() {
    var paths  = Array.prototype.slice.call(arguments);
    var result = [].concat.apply(includePaths(), paths);
    return result;
  }

};
