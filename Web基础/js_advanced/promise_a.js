// var p  = new Promise(function(resolve, reject){
//     setTimeout(function(){
//         resolve('success')
//     }, 1000)
//     console.log('创建一个新的promise')
// })

// p.then(function(x){
//     console.log(x)
// })


//模拟一

/* function myPromise(constructor){
    let self = this;
    self.status = 'pending'
    self.value = undefined;
    self.reason = undefined;
    function resolve(value){
        if(self.status === 'pending'){
            self.value = value;
            self.status = 'resolved'
        }
    }
    function reject(reason){
        if(self.status === 'pending'){
            self.reason = reason;
            self.status = 'rejected'
        }
    }

    try{
        constructor(resolve, reject);
    }catch(e){
        reject(e)
    }
}

myPromise.prototype.then = function(onFullfilled, onRejected){
    let self = this;
    switch(self.status){
        case 'resolved':
            onFullfilled(self.value)
            break;
        case '                                                                                                                                                                                                                                                               ':
            onRejected(self.reason);
            break;
        default:
    }
}


var p = new myPromise(function(resolve, reject){setTimeout(function(){resolve(1)},1000)});
p.then(function(x){
    console.log(x);
    console.log(111)
}) */


//观察者模式  模拟
/* function myPromise(constructor){
    let self = this;
    self.status = 'pending'
    self.value = undefined;
    self.reason = undefined;
    self.onFullfilledArray = []
    self.onRejectedArray = []

    function resolve(value){
        if(self.status === 'pending'){
            self.value = value;
            self.status = 'resolved';
            self.onFullfilledArray.forEach(function(f){
                f(self.value)
                //如果状态从pending变为resolved，
                //那么就遍历执行里面的异步方法
            })
        }
    }
    function reject(reason){
        if(self.status === 'pending'){
            self.reason = reason;
            self.status = 'rejected';
            self.onRejectedArray.forEach(function(f){
                f(self.reason)
            })
        }
    }

    try{
        constructor(resolve, reject)
    }catch(e){
        reject(e)
    }
}

myPromise.prototype.then = function(onFullfilled, onRejected){
    let self = this;
    switch(self.status){
        case 'pending':
            self.onFullfilledArray.push(function(){
                onFullfilled(self.value)
            })
            self.onRejectedArray.push(function(){
                onRejected(self.reason)
            })
            break;
        case 'resolved':
            onFullfilled(self.value);
            break;
        case 'rejected':
            onRejected(self.reason);
            break;
        default:
    }
} */


// var p = new myPromise(function(resolve, reject){
//     setTimeout(function(){
//         resolve(1)
//     }, 1000)
    
// });
// p.then(function(x){
//     console.log(x);
// })


//then方法实现链式调用
function myPromise(constructor){
    let self = this;
    self.status = 'pending'
    self.value = undefined;
    self.reason = undefined;
    self.onFullfilledArray = []
    self.onRejectedArray = []

    function resolve(value){
        if(self.status === 'pending'){
            self.value = value;
            self.status = 'resolved';
            self.onFullfilledArray.forEach(function(f){
                f(self.value)
                //如果状态从pending变为resolved，
                //那么就遍历执行里面的异步方法
            })
        }
    }
    function reject(reason){
        if(self.status === 'pending'){
            self.reason = reason;
            self.status = 'rejected';
            self.onRejectedArray.forEach(function(f){
                f(self.reason)
            })
        }
    }

    try{
        constructor(resolve, reject)
    }catch(e){
        reject(e)
    }
}

myPromise.prototype.then = function(onFullfilled, onRejected){
    let self = this;
    let promise2;

    switch(self.status){
        case 'pending':
            promise2 = new myPromise(function(resolve, reject){
                self.onFullfilledArray.push(function(){
                    try{
                        let temple = onFullfilled(self.value)
                        resolve(temple)
                    }catch(e){
                        reject(e)
                    }
                })
                self.onRejectedArray.push(function(){
                    try{
                        let temple = onRejected(self.reason);
                        resolve(temple)
                    }catch(e){
                        reject(e)
                    }
                })
            })
            break;
        case 'resolved':
            promise2 = new myPromise(function(resolve, reject){
                try{
                    let temple = onFullfilled(self.value)
                    resolve(temple)
                }catch(e){
                    reject(e)
                }
            })
            break;
        case 'rejected':
            promise2 = new myPromise(function(resolve, reject){
                try{
                    let temple = onRejected(self.reason)
                    resolve(temple)
                }catch(e){
                    reject(e)
                }
            })
            break;
        default:
    }

    return promise2;
}


/* var p = new myPromise(function(resolve, reject){
    setTimeout(function(){
        resolve(1)
    }, 1000)
    
});
p.then(function(x){
    console.log(x)
}).then(function(){
    console.log("链式调用1")
}).then(function(){
    console.log("链式调用2")
})
 */
/* 

 function resolvePromise(promise, x, resolve, reject){
     if(promise === x){
         throw new TypeError('type error')
     }

     let isUsed;
     if(x !== null && (typeof x === 'object' || typeof x === 'function')){
         try{
            let then = x.then;
            if(typeof then === 'function'){
                then.call(x, function(y){
                    if(isUsed) return;
                    isUsed = true;
                    resolvePromise(promise, y , resolve, reject);
                },function(e){
                    if(isUsed) return;
                    isUsed = true;
                    reject(e)
                })
            }else{
                resolve(x);
            }
         }catch(e){
            if(isUsed) return;
            isUsed = true;
            reject(e);
         }
     }else{
         resolve(x)
     }
 }

 myPromise.prototype.then = function(onFullfilled, onRejected){
     let self = this;
     let promise2;
     switch(self.status){
         case 'pending':
            promise2 = new myPromise(function(resolve, reject){
                self.onFullfilledArray.push(function(){
                    setTimeout(function(){
                        try{
                            let temple = onFullfilled(self.value)
                            resolvePromise(temple)
                        }catch(e){
                            reject(e)
                        }
                    })
                })
                self.onRejectedArray.push(function(){
                    setTimeout(function(){
                        try{
                            let temple = onRejected(self.reason)
                            resolvePromise(temple)
                        }catch(e){
                            reject(e)
                        }
                    })
                })
            })
        case 'resolved':
            promise2 = new myPromise(function(resolve, reject){
                self.onFullfilledArray.push(function(){
                    setTimeout(function(){
                        try{
                            let temple = onFullfilled(self.value)
                            resolvePromise(temple)
                        }catch(e){
                            reject(e)
                        }
                    })
                })
            })
            break;
        case 'rejected':
            promise2 = new myPromise(function(resolve, reject){
                self.onRejectedArray.push(function(){
                    setTimeout(function(){
                        try{
                            let temple = onRejected(self.reason)
                            resolvePromise(temple)
                        }catch(e){
                            reject(e)
                        }
                    })
                })
            })
            break;
        default:case 'rejected':
            promise2 = new myPromise(function(resolve, reject){
                self.onRejectedArray.push(function(){
                    setTimeout(function(){
                        try{
                            let temple = onRejected(self.reason)
                            resolvePromise(temple)
                        }catch(e){
                            reject(e)
                        }
                    })
                })
            })
            break;
        default:
     }
 } */

 /**
  * 用setTimeout()方法来模拟色图Interval()与setInterval()之间有什么区别
  * 
  * 首先来看setInterval的缺陷，使用setInterval()创建的定时器确保了定时器代码规则地插入队列中。
  * 这个问题在于：如果定时器代码在代码再次添加到队列之前还没有完成执行，结果就会导致定时器代码连续运行好几次。
  * 而之间没有时间间隔。不过幸运的是：javascript引擎足够聪明，能够避免这个问题。当且仅当没有该定时器的如何代码实例时
  * 才会将定时器添加到队列中，这掘宝了定时器代码加入队列中最小的时间间隔为指定时间
  * 
  * 这种重复定时器的规则有两个问题：
  * 1.某些间隔会被跳过
  * 2.多个定时器的代码执行时间可能会比预期小
  * 
  * 假设，某个onclick时间处理程序使用了setInterval()来设置了一个200ms的重复定时器。如果时间处理花了300ms多一点的时间完成
  * 这个雷子中的第一个定时器时在205ms出添加到队列中，但是要过300ms才能执行。在405ms又添加了一个副本，
  * 在一个间隔，605ms出，第一个定时器代码还在执行中，而且队列中已经又一个定时器实例，结果是605ms的定时器不回添加到队列中
  * 结果是在5ms处添加的定时器代码执行结束后，405出的代码立即执行
  * 
  * 
  */
  //图片一张一张加载
/*   var obj = new Image();
  obj.src = 'https://ss1.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/pic/item/e824b899a9014c08f64967f2067b02087bf4f473.jpg';

  obj.onload = function(){
    document.getElementById("wrap").appendChild(obj)
  } */

  //代码的执行顺序
/*   setTimeout(function(){console.log(1)}, 0)
  new Promise(function(resolve, reject){
      console.log(2)
      resolve()
  }).then(function(){console.log(3)
  }).then(function(){console.log(4)})

  process.nextTick(function(){console.log(5)})

  console.log(6); */

  //如何实现sleep的效果
  //while循环的方式
/*   function sleep(ms){
    var start = Date.now(),
        expire = start + ms;
    while(Date.now() < expire);
    console.log('1111')
    return ;
}

  sleep(4000) */

/*   function sleep(ms){
      var temple = new Promise(resolve => {
          console.log(111)
          setTimeout(resolve, ms)
      })
      return temple;
  }

  sleep(500).then(function(){
      console.log(222)
  }) */

/*   function sleep(ms){
      return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function test(){
      var temple = await sleep(1000);
      console.log(1111)
      return temple;
  }

  test(); */


/*   function* sleep(ms){
      yield new Promise(function(resolve, reject){
          console.log(1111)
          setTimeout(resolve, ms)
      })
  }
  sleep(500).next().value.then(function(){console.log(2222)}) */

  /**
   * Function._proto_(getPrototypeOf)是什么?
   * 
   * 获取一个对象的原型，在chrome中可以通过_proto_的形式，或者在ES6中可以通过Object.getPrototypeOf的形式.
   * 那么Function.proto是什么？也就是说Function由什么对象继承而来，
   */

   //console.log(Function.__proto__ == Object.prototype)
   //console.log(Function.__proto__ == Function.prototype)

   function E(){}


/**
 * 实现js中所有对象的深度克隆（包装对象，Date对象， 正则对象）
 * 
 * 通过递归可以简单实现对象的深度克隆，但是这种方法不管是ES6还是ES5实现，都又同样的缺陷
 * 
 */


/*  function deepClone(obj){
    var newObj = obj instanceof Array? [] : {}
    for(var i in obj){
        newObj[i] = typeof obj[i] == 'object' ? 
        deepClone(obj[i]) : obj[i]
    }
    return newObj;
 } */

 /**
  * 所有对象都有valueOf方法，valueOf方法对于：如果存在任意原始值，他就默认将对象转换为表示打的原始值。
  * 对象是复合值，而且大多数对象无法真正表示为一个原始值，因此默认的valueOf（）方法简单地返回对象本身，而不是返回一个原始值
  * 。数组、函数和正则表达式简单地继承了这个默认方法，调用这些类型的实例valueOf()方法只是简单返回这个对象本身，
  * 对于原始值或者包装类：
  * 
  */

 /*  function baseClone(base){
      return base.valueOf()
  } */

/*   Date.prototype.clone = function(){
      return new Date(this.valueOf())
  }

  var date = new Date('2018')
  var newDate = date.clone();

  console.log(newDate) */

  //正则对象RegExp
/*   RegExp.prototype.clone = function(){
      var pattern = this.valueOf();
      var flags = '';
      flags += pattern.global ? 'g' : '';
      flags += pattern.ingoreCase ? 'i' : '';
      flags += pattern.multilline ? 'm' : '';
      return new RegExp(pattern.source, flags)
  }

  var reg = new RegExp('/111/');
  var newReg = reg.clone();
  console.log(newReg) */

  /**
   * 简单实现Node的Events模块
   * 简介：贯彻着模式或者说订阅模式，它定义了对象见的一种一对多的关系，让多个观察者对象同事监听摸一个对象对象，当一个对象发生
   * 改变时，所有依赖与它的对象都将得到通知
   * 
   * node中的Events模块就是通过观察者模式来实现的
   * 
   */

/*    var events =require('events')
   var eventEmitter = new events.EventEmitter();
   eventEmitter.on('say', function(name){
       console.log('Hello ', name)
   })

   eventEmitter.emit('say', 'Jony yu') */

   //实现简单的Event模块的emit和on方法

/*    function Events(){
       this.on = function(eventName, callBack){
           if(!this.handles){
               this.handles = {}
           }
           if(!this.handles[eventName]){
               this.handles[eventName] = []
           }

           this.handles[eventName].push(callBack)
       }
       this.emit = function(eventName, obj){
           if(this.handles[eventName]){
               for(var i=0;i<this.handles[eventName].length;i++){
                   this.handles[eventName][i](obj)
               }
           }
       }
       return this;
   } */


/**
 * http和https
 * https的SSL加密实在传输层实现的
 * http 和 https的基本概念
 * 
 * http:超文本传输协议，是互联网上应用最为广泛的一种网络协议，是一个客户端和服务端请求和应答的标准（TCP）,用于从WWW服务器传输
 * 超文本到本地浏览器的传输协议，他可以使浏览器更加高效，是网络传输减少
 * 
 * https：是以安全为莫表的HTTP通道，简单讲是HTTP的安全版，即HTTP下加入SSL层，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL
 * 
 * https协议的主要作用是：建立一个信息安全通道，来确保数组的传输，确保网站的真实性
 * 
 * http和https的区别
 * http传输的数据都是未加密的，也就是明文的，网景公司设置了SSL协议来对http协议传输的数据进行加密处理，简单来说https协议是
 * 由http和ssl协议构建的可进行加密传输和身份认证的网络协议，比http协议的安全性更高。主要的区别如下；
 * 1.HTTPS协议需要ca证书，费用比较高
 * 2.HTTP是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议
 * 3.使用不懂的链接方式，端口也不同，一般而言，http协议的端口80，https的端口为443
 * 4.http的链接简单，是无状态的；https协议是由ssl+http协议构建的可进行加密传输、身份认证的网络协议，比http协议安全
 * 
 * https协议的工作原理
 * 
 * 客户端再使用HTTPS方式与WEB服务器通信时由一下几个步骤
 * 
 * 1.客户使用https url访问服务器，则要求web服务器建立ssl链接
 * 2.web服务器接收到客户端的请求之后，会讲网站的证书（证书中包含了公钥），返回或者说传输给客户端。
 * 3.客户端和web服务器端开始协商SSL链接的安全等级，也就时加密等级
 * 4.客户端浏览器通过双方协商一致的安全等级，建立会话密钥，然后通过网站的公钥来加密会话密钥，并传送给网站
 * 5.web服务器通过自己的私钥解密出会话密钥
 * 6.web服务器通过会话密钥加密与客户端之间的通信
 * 
 * http协议的优点
 * 使用HTTPS协议可认证用户和服务器，确保数据发送到正确的客户机和服务器
 * HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，要比http协议安全，可防止数据再传输过程中不被窃取、改变、确保苏剧的完整性
 * HTTPS是现行架构下最安全的解决方案，虽然不能绝对安全，但它大幅增加了中间人攻击的成本
 * 
 * https的缺点
 * https握手阶段比较费时，会增加网页加载时间延长50%,增加10%~20%的好点
 * https缓存不如http高效，会增加数据开销
 * SSL证书也需要钱，功能越强大的证书费用越高
 * SSL证书需要绑定IP，不能在同一个ip上绑定多个域名，ipv4资源支持不了这种消耗
 * 
 * 3次握手
 * 客户端和服务端都需要知道各自可手法，因此需要三次握手
 * 
 * c发起请求链接s确认，也发起链接c确认我们
 * 
 * S只可以确认 自己可以接收C发送的报文
 * C可以确认S收到了自己发送的报文端
 * 
 * 
 * WebSocket是HTML5中的协议，支持持久连续，http协议不支持持久性链接。HTTP1.0和HTTP1.1都不支持持久性的链接
 * HTTP1.1中的keep-alive，讲多个http请求合并为一个
 * 
 * 
 * 
 * 
 */