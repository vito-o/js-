/* var Flower = function(){}

var xiaoming = {
  sendFlower: function(target){
    var flower = new Flower();
    target.receiveFlower(flower)
  }
}

var A = {
  receiveFlower: function(flower){
    console.log('receive flower ' + flower)
  }
}

xiaoming.sendFlower(A)
 */
//-----------------------------------------------------

//代理模式
/* 
var Flower = function(){}

var xiaoming = {
  sendFlower: function(target){
    var flower = new Flower();
    target.receiveFlower(flower)
  }
}

var B = {
  receiveFlower: function(flower){
    A.receiveFlower(flower)
  }
}

var A = {
  receiveFlower: function(flower){
    console.log('receive flower ' + flower)
  }
} */

//-----------------------------------------------------

/* 
var Flower = function(){}

var xiaoming = {
  sendFlower: function(target){
    var flower = new Flower();
    target.receiveFlower(flower)
  }
}

var B = {
  receiveFlower: function(flower){
    A.listenGoodMood(function(){
      A.receiveFlower(flower)
    })
  }
}

var A = {
  receiveFlower: function(flower){
    console.log('receive flower ' + flower)
  },
  listenGoodMood: function(fn){
    setTimeout(function(){
      fn()
    },10000)
  }
} */

//-----------------------------------------------------
//保护代理
//虚拟代理--把开销很大的对象，延迟道真正需要他的时候才去创建

/* var B = {
  receiveFlower: function(flower){
    A.listenGoodMood(function(){
      var flower = new flower();  //延迟创建
      A.receiveFlower(flower)
    })
  }
} */

//-----------------------------------------------------
/* 
var myImage = (function(){
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)

  return {
    setSrc: function(src){
      imgNode.src = src;
    }
  }
})()

myImage.setSrc('https://dss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/21.jpg?2')
 */
//-----------------------------------------------------
/* 
var myImage = (function(){
  var imgNode = document.createElement('img');
  imgNode.style.border = '1px solid'
  document.body.appendChild(imgNode)

  return {
    setSrc: function(src){
      imgNode.src = src;
    }
  }
})();

var proxyImage = (function(){
  var img = new Image;
  img.onoad = function(){
    myImage.setSrc(this.src)
  }
  return {
    setSrc: function(src){
      myImage.setSrc('./res/img/timg.gif')
      img.src = src;
    }
  }
})();

proxyImage.setSrc('https://dss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/21.jpg?2')
*/

//-----------------------------------------------------
/* 
var synchronousFile = function(id){
  console.log('开始同步文件，id为：' + id);
}

var checkbox = document.getElementsByTagName('input')

for(var i = 0, c; c = checkbox[i++];){
  c.onclick = function(){
    if(this.checked == true){
      synchronousFile(this.id)
    }
  }
} */

//-----------------------------------------------------
//收集一段时间的请求，一次性发给服务器
/* 
var synchronousFile = function(id){
  console.log('开始同步文件，id为：' + id);
}

var proxySynchronousFile = (function(){
  var cache = [],
      timer;

  return function(id){
    cache.push(id);
    if(timer){
      return;
    }

    timer = setTimeout(function(){
      synchronousFile(cache.join(','))
      clearTimeout(timer);
      timer = null;
      cache.length = 0;
    }, 2000)
  }
})();

var checkbox = document.getElementsByTagName('input')

for(var i = 0, c; c = checkbox[i++];){
  c.onclick = function(){
    if(this.checked == true){
      proxySynchronousFile(this.id)
    }
  }
}  */

//-----------------------------------------------------

//虚拟代理在惰性加载中的应用

var miniConsole = (function(){
  var cache = [];
  var handler = function(ev){
    if(ev.keyCode === 113){
      var script = document.createElement('script');
      script.onload = function(){
        for(var i = 0, fn; fn = cache[i++];){
          fn()
        }
      };
      script.src = 'miniConsole.js';
      document.getElementsByTagName('head')[0].appendChild(script)
      document.body.removeEventListener('keydown',handler)
    }
  }

  document.body.addEventListener('keydown', handler, false);

  return {
    log: function(){
      var args = arguments;
      cache.push(function(){
        return miniConsole.log.apply(miniConsole, args)
      })
    }
  }
})();

miniConsole.log(11)



