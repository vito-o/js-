define(function(require, exports, module){
  require('jquery.min.js')
  require('underscore-min.js');

  var add = function(a, b){
    console.log($('.wrap'))
    
    var numbers = [10, 5, 100, 2, 1000];
    console.log(_);

    return a + b;
  }

  exports.add = add
})