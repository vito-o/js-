/* 
var Singleten = function(name){
  this.name = name;
  this.instance = null;
}

Singleten.prototype.getName = function(){
  return this.name;
}

Singleten.getInstance = function(name){
  if(!this.instance){
    this.instance = new Singleten(name)
  }
  return this.instance;
}

var a = Singleten.getInstance('sven1')
var b = Singleten.getInstance('sven2')
 */
//-----------------------------------------------------

/* 
var Singleton = function(name){
  this.name = name;
}

Singleton.prototype.getName = function(){
  return this.name;
}

Singleton.getInstance = (function(name){
  var instance = null;
  return function(name){
    if(!instance){
      instance = new Singleton(name);
    }
    return instance;
  }
})() 

*/

// var a = Singleton.getInstance('sven1')
// var b = Singleton.getInstance('sven2')

// console.log(a === b)

//-----------------------------------------------------

//透明的单例模式
/* 
var CreateDiv = (function(){
  var instance;

  var CreateDiv = function(html){
    if(instance){
      return instance;
    }

    this.html = html;
    this.init()

    return instance = this;
  }

  CreateDiv.prototype.init = function(){
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div)
  }

  return CreateDiv
})()

setTimeout(() => {
  var a = new CreateDiv('sven1')
  var b = new CreateDiv('sven2')
}) 

*/

//-----------------------------------------------------

//使用代理实现单例模式
/* 
var CreateDiv = function(html){
  this.html = html;
  this.init();
}

CreateDiv.prototype.init = function(){
  var div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div)
}

var ProxySingletonCreateDiv = (function(){
  var instance;
  return function(html){
    if(!instance){
      instance = new CreateDiv(html)
    }
    return instance;
  }
})();

setTimeout(() => {
  var a = new ProxySingletonCreateDiv('sven1');
  var b = new ProxySingletonCreateDiv('sven2');
}) 
 */

//-----------------------------------------------------

var getSingle = function(fn){
  var result;
  return function(){
    return result || (result = fn.apply(this, arguments))
  }
};

var createLoginLayer = function(){
  var div = document.createElement('div')
  div.innerHTML = 'layer'
  div.style.display = 'none';
  document.body.appendChild(div)
  return div
}

var createSingleLoginLayer = getSingle(createLoginLayer);

createSingleLoginLayer();
createSingleLoginLayer();