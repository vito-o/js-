//实现一个bind函数
//通过apply或者call方法来实现

/* Function.prototype.bind = function(obj, arg){
    var arg = Array.prototype.slice.call(arguments, 1)
    var context = this;
    return function(newArg){
        arg = arg.concat(Array.prototype.slice.call(newArg));
        return context.apply(obj, arg)
    }
} */

Function.prototype.bind = function(obj, arg){
    var arg = Array.prototype.slice.call(this.arguments, 1)
    var context = this;
    var bound = function(newArg){
        arg = arg.concat(Array.prototype.slice.call(newArg))
        return context.apply(obj, arg)
    }
    
    var F = function(){}
    F.prototype = context.prototype;
    bound.prototpye = new F();
    return bound;
}


//setTimeout模拟setInterval