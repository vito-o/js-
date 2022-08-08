/* 
//售楼处
var salesOffices = {}

//缓存列表，存放订阅者的回调函数
salesOffices.clientList = []

//增加订阅者
salesOffices.listen = function(fn){
  this.clientList.push(fn)
}

//发布消息
salesOffices.trigger = function(){
  for(var i = 0, fn; fn = this.clientList[i++];){
    fn.apply(this, arguments)
  }
}

salesOffices.listen(function(price, squareMater){
  console.log(price, squareMater)
})

salesOffices.listen(function(price, squareMater){
  console.log(price, squareMater)
})


salesOffices.trigger(2000000, 88)
salesOffices.trigger(3000000, 110)
 */
//-----------------------------------------------------
//只订阅自己感兴趣的
/* 
var salesOffices = {}

salesOffices.clientList = {}

salesOffices.listen = function(key, fn){
  if(!this.clientList[key]){
    this.clientList[key] = []
  }
  this.clientList[key].push(fn)
}

salesOffices.trigger = function(){
  var key = Array.prototype.shift.call(arguments)
      fns = this.clientList[key]

  if(!fns || fns.length === 0) return false;

  for(var i = 0, fn; fn = fns[i++];){
    fn.apply(this, arguments)
  }
}

salesOffices.listen('squareMeter88', function(price){
  console.log('price-' + price)
})

salesOffices.listen('squareMeter110', function(price){
  console.log('price-' + price)
})

salesOffices.trigger('squareMeter88', 2000000)
salesOffices.trigger('squareMeter110', 3000000)
 */
//-----------------------------------------------------
/* 
//通用发布订阅
var event = {
  clientList: [],
  listen: function(key, fn){
    if(!this.clientList[key]){
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  },
  trigger: function(){
    var key = Array.prototype.shift.call(arguments),
        fns = this.clientList[key]
    if(!fns || fns.length === 0) return false;


    for(var i = 0, fn; fn = fns[i++];){
      fn.apply(this, arguments)
    }
  },
  remove: function(key, fn){
    var fns = this.clientList[key];
    if(!fns) return false;
    if(!fn){
      fns && (fns.length = 0);
    }else{
      for(var l = fns.length - 1; l >= 0; l--){
        var _fn = fns[l];
        if(_fn === fn){
          fns.splice(l, 1);
        }
      }
    }
  }
}

var installEvent = function(obj){
  for(var i in event){
    obj[i] = event[i];
  }
}

var salesOffices = {}

installEvent(salesOffices);

salesOffices.listen('squareMeter88', fn1 = function(price){
  console.log('price_' + price)
})

salesOffices.listen('squareMeter110', fn2 = function(price){
  console.log('price_' + price)
})

salesOffices.trigger('squareMeter88', 2000000)
salesOffices.trigger('squareMeter110', 3000000)



salesOffices.remove('squareMeter110', fn2)

salesOffices.trigger('squareMeter110', 3000000)
 */
//-----------------------------------------------------
/* 
$.ajax('login', function(data){
  login.trigger('loginSucc', data)
})

var header = (function(){
  login.listen('loginSucc', function(){
    header.setAvatar(data.avatar)
  })
  return {
    setAvatar: function(data){
      console.log('设置header模块的头像')
    }
  }
})();

var nav = (function(){
  login.listen('loginSucc', function(data){
    nav.setAvatar(data.avatar)
  })
  return {
    setAvatar: function(avatar){
      console.log('设置nav模块的头像')
    }
  }
})();
 */
//-----------------------------------------------------
/* 
var Event = (function(){
  var clientList = {},
      listen,
      trigger,
      remove;

  listen = function(key, fn){
    if(!clientList[key]){
      clientList[key] = []
    }
    clientList[key].push(fn);
  };

  trigger = function(){
    var key = Array.prototype.shift.call(arguments),
        fns = clientList[key];

        if(!fns || fns.length === 0) return false;

        for(var i = 0, fn; fn = fns[i++];){
          fn.apply(this, arguments);
        }
  };

  remove = function(key, fn){
    var fns = clientList[key];
    if(!fns) return false;

    if(!fn){
      fns && (fns.length = 0);
    }else{
      for(var l = fns.length - 1; l >= 0; l--){
        var _fn = fns[l];
        if(_fn === fn){
          fns.slice(l, 1);
        }
      }
    }
  };

  return {
    listen: listen,
    trigger: trigger,
    remove: remove
  }
})();

// Event.listen('squareMeter88', function(price){
//   console.log('price-' + price);
// });

// Event.trigger('squareMeter88', 2000000);
// Event.trigger('squareMeter120', 3000000);

var a = (function(){
  var count = 0;
  var button = document.getElementById('count');

  button.onclick = function(){
    Event.trigger('add', count++);
  }
})();

var b = (function(){
  var div = document.getElementById('show');
  Event.listen('add', function(count){
    div.innerHTML = count;
  })
})();
 */
//-----------------------------------------------------
/* 
var Event = (function(){
  var global = this,
  Event,
  _default = 'default';

  Event = function(){
    var _listen,
        _trigger,
        _remove,
        _slice = Array.prototype.slice,
        _shift = Array.prototype.shift,
        _unshift = Array.prototype.unshift,
        namespaceCache = {},
        _create,
        find,
        each = function(ary, fn){
          var ret;
          for(var i = 0, l = ary.length; i < l; i++){
            var n = ary[i]
            ret = fn.call(n, i, ary);
          }
          return ret;
        };

    _listen = function(key, fn, cache){
      if(!cache[key]){
        cache[key] = []
      }
      cache[key].push(fn)
    };

    _remove = function(key, cache, fn){
      if(cache[key]){
        if(fn){
          for(var i = cache[key].length; i >= 0; i--){
            if(cache[key][i] === fn){
              cache[key].splice(i, 1);
            }
          }
        }else{
          cache[key] = []
        }
      }
    };

    _trigger = function(){
      var cache = _shift.call(arguments),
          key = _shift.call(arguments),
          args = arguments,
          _self = this,
          ret,
          stack = cache[key];

      if(!stack || !stack.length){
        return;
      }

      return each(stack, function(){
        return this.apply(_self, args)
      })
    };

    _create = function(namespace){
      var namespace = namespace || _default;
      var cache = {},
          offlineStack = [],
          ret = {
            listen: function(key, fn, last){
              _listen(key, fn, cache);
              if(offlineStack === null){
                return;
              }
              if(last === 'last'){
                offlineStack.length && offlineStack.pop()();
              }else{
                each(offlineStack, function(){
                  this();
                })
              }
              offlineStack = null;
            },
            one: function(key, fn, last){
              _remove(key, cache)
              this.listen(key, fn, last)
            },
            remove: function(key, fn){
              _remove(key, cache, fn);
            },
            trigger: function(){
              var fn,
                  args,
                  _self = this;

              _unshift.call(arguments, cache);
              args = arguments;
              fn = function(){
                return _trigger.apply(_self, args);
              };

              if(offlineStack){
                return offlineStack.push(fn);
              }

              return fn();
            }
          };

          return namespace ? 
            (namespaceCache[namespace] ? namespaceCache[namespace] : namespaceCache[namespace] = ret) 
            : 
            ret
    }

    return {
      create: _create,
      one: function(key, fn, last){
        var event = this.create();
        event.one(key, fn, last);
      },
      remove: function(key, fn){
        var event = this.create();
        event.remove(key, fn);
      },
      listen: function(key, fn, last){
        var event = this.create();
        event.listen(key, fn, last);
      },
      trigger: function(){
        var event = this.create();
        event.trigger.apply(this, arguments);
      }
    }

  }();

  return Event;
})();

Event.trigger('click', 1)

Event.listen('click', function(a){
  console.log(a)
})

Event.create('namespace1').listen('click', function(a){
  console.log(a)
})

Event.create('namespace1').trigger('click', 1)

Event.create('namespace2').listen('click', function(a){
  console.log(a)
})

Event.create('namespace2').trigger('click', 1234) */


//-----------------------------------------------------

//发布 -- 订阅

var Event = (function(){
  

  let Event = {}

  Event.listen = function(key, fn, cache){
    if(!cache[key]){
      cache[key] = [];
    }
    cache[key].push(fn);
  }
  
  Event.trigger = function(key, msg, cache){
    if(cache[key]){
      for(var i = 0, fn; fn = cache[key][i++];){
        fn.call(this, msg);
      }
    }
  }

  return (function(){
    let cache = {}
    let offlineCache = [];

    let _listen = function(key, fn){
      if(offlineCache){
        for(var i = 0, len = offlineCache.length; i < len; i++){
          let o = offlineCache[i];
          o.fn.call(this, o.key, o.msg, cache)
        }
        offlineCache = null;
      }
      Event.listen(key, fn, cache);
    }

    let _trigger = function(key, msg){
      if(offlineCache){
        offlineCache.push({fn: Event.trigger, key, msg});
      }

      Event.trigger(key, msg, cache);
    }

    return {
      listen: _listen,
      trigger: _trigger
    };
  })();

})();


Event.trigger('zz', 'hello world')

Event.listen('zz', function(msg){
  console.log(msg)
})

Event.trigger('zz', 'observer')