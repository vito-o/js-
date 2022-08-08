/**
 * 函数惰性加载
 * @param {*} elem 
 * @param {*} type 
 * @param {*} handler 
 */

var addEvent = function(elem, type, handler){
  if(window.addEventListener){
    addEvent = function(elem, type, handler){
      elem.addEventListener(type, handler)
    }
  }else if(window.attachEvent){
    addEvent = function(elem, type, handler){
      elem.attachEvent('on'+type, handler)
    }
  }
  addEvent(elem, type, handler)
}