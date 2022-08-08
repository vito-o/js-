
Function.prototype.before = function(cb){
  var _this = this;
  return function(){
    cb.apply(_this, arguments);
    return _this.apply(this, arguments)
  }
}

Function.prototype.after = function(cb){
  var _this = this;
  return function(){
    var ret = _this.apply(this, arguments);
    cb.apply(_this, arguments)
    return ret
  }
}

function eat(){
  console.log('eat...')
}

eat = eat
  .before(function(){
    console.log('before eat...')
  })
  .after(function(){
    console.log('after eat...')
  })


console.log(eat());