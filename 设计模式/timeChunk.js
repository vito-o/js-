


//分时函数
var timeChunk = function(ary, fn, count){
  var obj, t;

  var start = function(){
    for(var i = 0; i < Math.min(count || 1, ary.length); i++){
      var obj = ary.shift();
      fn(obj)
    }
  }

  return function(){
    t = setInterval(function(){
      if(ary.length == 0){
        return clearInterval(t);
      }
      start()
    }, 200)
  }
}

var arr = []

for(var i = 1; i < 1000; i++){
  arr.push(i)
}

var renderFriendList = timeChunk(arr, function(n){
    var div = document.createElement('div')
    div.innerHTML = n
    document.body.appendChild(div)
}, 8) 

setTimeout(function(){
  renderFriendList()
})
