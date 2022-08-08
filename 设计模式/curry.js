/* var cost = (function(){
  var cache = []

  return function(){
    if(arguments.length == 0){
      var money = 0;
      for(var i = 0, len = cache.length; i < len; i++){
        money += cache[i]
      }
      return money;
    }else{
      [].push.apply(cache, arguments)
    }
  }
})() */

var currying = function(fn){
  var args = []

  return function(){
    if(arguments.length == 0){
      return fn.apply(this, args)
    }else{
      [].push.apply(args, arguments)
    }
  }
}

var cost = (function(){
  var money = 0;
  return function(){
    for(var i = 0, len = arguments.length; i < len; i++){
      money += arguments[i];
    }
    return money;
  }
})()

var cost = currying(cost)

//--------------------------------------------------------------------------------


var obj1 = {
  name: 'sven'
}

var obj2 = {
  getName: function(){
    return this.name;
  }
}

//console.log(obj2.getName.call(obj1))


//--------------------------------------------------------------------------------

Function.prototype.uncurrying = function(){
  var self = this;
  
  return function(){
    var obj = Array.prototype.shift.call(arguments);
    return self.apply(obj, arguments);
  }
}

var push = Array.prototype.push.uncurrying();

(function(){
  push(arguments, 4)
  console.log(arguments)
})(1, 2, 3)


Function.prototype.uncurrying1 = function(){
  var self = this;
  return function(){
    return Function.prototype.call.apply(self, arguments)
  }
}

//push.call(arguments)