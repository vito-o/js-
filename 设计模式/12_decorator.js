/**
 * 
 * 装饰器
 * 
 * 装饰器模式也称为包装器(wrapper)模式
 * 
 * 模拟传统面向对象语言的装饰者模式
 */

/* var Plane = function(){}

Plane.prototype.fire = function(){
  console.log('发射普通子弹')
}

//装饰类
var MissileDecorator = function(plane){
  this.plane = plane;
}

MissileDecorator.prototype.fire = function(){
  this.plane.fire();
  console.log('发射导弹');
}

var AtomDecorator = function(plane){
  this.plane = plane;
}

AtomDecorator.prototype.fire = function(){
  this.plane.fire();
  console.log('发射原子弹');
}

var plane = new Plane();
plane = new MissileDecorator(plane)
plane = new AtomDecorator(plane);

plane.fire();
 */
/**
 * js装饰器
 * 
 */
/* 
var plane = {
  fire: function(){
    console.log('发射普通子弹')
  }
}

var missileDecorator = function(){
  console.log('发射导弹')
}

var atomDecorator = function(){
  console.log('发射原子弹')
}

var fire1 = plane.fire;

plane.fire = function(){
  fire1();
  missileDecorator();
}

var fire2 = plane.fire;
plane.fire = function(){
  fire2();
  atomDecorator();
}

plane.fire(); */

/**
 * AOP装饰函数
 */
/* 
Function.prototype.before = function(beforeFn){
  var _self = this;
  return function(){
    beforeFn.apply(this, arguments);
    return _self.apply(this, arguments);
  }
}

Function.prototype.after = function(afterFn){
  var _self = this;
  return function(){
    var ret = _self.apply(this, arguments);
    afterFn.apply(this, arguments);
    return ret;
  }
}

function eat(){
  console.log('eat....')
}

var eat = 
eat
  .before(function(){
    console.log('before ...')
  })
  .after(function(){
    console.log('after ...')
  });


eat(); */

/* var showLogin = function(){
  console.log('打开登录浮层');
  log(this.getAttribute('tag'));
}

var log = function(tag){
  console.log('上报标签为：' + tag);
}

document.getElementById('button').onclick = showLogin; */

/* Function.prototype.after = function(afterFn){
  var _self = this;
  return function(){
    var ret = _self.apply(this, arguments);
    afterFn.apply(this, arguments);
    return ret;
  }
} */
/* 
var showLogin = function(){
  console.log('打开登录浮层');
}

var log = function(){
  console.log('上报标签为：' + this.getAttribute('tag'));
}

showLogin = showLogin.after(log);

document.getElementById('button').onclick = showLogin; */


//使用AOP动态改变函数的参数
/* Function.prototype.before = function(beforeFn){
  var _self = this;
  return function(){
    beforeFn.apply(this, arguments);
    return _self.apply(this, arguments);
  }
} */

/* 
var func = function(param){
  console.log(param)
}

func = func.before(function(param){
  param.b = 'b';
})

func({a: 'a'}) */

/* 
var ajax = function(type, url, param){
  console.dir(param)
}

var getToken = function(){
  return 'Token';
}

ajax = ajax.before(function(type, url, param){
  param.Token = getToken();
});

ajax('get', 'http://xx.com/userinfo', {name: 'sven'}); */

//插件式表单验证
Function.prototype.before = function(beforeFn){
  var _self = this;
  return function(){
    if(beforeFn.apply(this, arguments) === false){
      return;
    }
    return _self.apply(this, arguments);
  }
}


var username = document.getElementById('username')
var password = document.getElementById('password')
var submitBtn = document.getElementById('submitBtn')

var ajax = function(type, url, param){
  console.dir(param)
}

var validata = function(){
  if(username.value == ''){
    alert('用户名不能为空')
    return false
  }

  if(password.value == ''){
    alert('密码不能为空');
    return false
  }
}

var formSubmit = function(){
  var param = {
    username: username.value,
    password: password.value
  }
  ajax('get', 'http://xxx.com/login', param)
}

formSubmit = formSubmit.before(validata);

submitBtn.onclick = function(){
  formSubmit();
}

/**
 * 代理模式，直接访问本体不方便或者不符合需要，为本体提供一个代替者
 * 
 * 装饰器模式，就是为对象动态加入行为。
 * 
 * 代理模式强调一种关系（Proxy与它的实体之间的关系），这种关系可以静态的表达，也就是说这种关系一开始就可以被确定
 * 
 * 装饰器模式用于一开始不能确定对象的全部功能时，
 * 
 * 代理模式通常只有一层代理-本体的引入，
 * 
 * 装饰器经常会形成一条长长的装饰链。
 * 
 */





