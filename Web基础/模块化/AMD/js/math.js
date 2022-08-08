/* define(function(){
  var baseNum = 0
  var add = function(x, y){
    return x + y;
  }
  return {
    baseNum, add
  }
}) */

//定义一个依赖underscore.js模块
define(['underscore'], function(_){
  var classify = function(list){
    _.countBy(list, function(num){
      return num > 30 ? 'old' : 'young'
    })
  }
  return {
    classify
  }
})

