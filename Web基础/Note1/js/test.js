/**
 * 判断对象的数据类型
 */
/* 
const isType = type => target => `[object ${type}]` === 
  Object.prototype.toString.call(target)
const isArray = isType('Array')
console.log(isArray([])) 
*/


/* const isType = function(type){
  return function(target){
    return `[object ${type}]` === Object.prototype.toString.call(target)
  }
}

const isArray = isType('Array') */

/* 
const isType = type => target => `[object ${type}]` ===
  Object.prototype.toString.call(target)
*/

/**
 * 使用Object.prototype.toString配合闭包，通过传入不同的判断类型来
 * 返回不同的判断函数，一行代码，简洁优雅灵活（注意传入type参数时首字母大写）
 * 
 * 不推荐将这个函数用来检测可能会 产生包装类型的基本数据类型
 * 因为call会将第一个参数进行装箱操作
 */


/**
 * ES5实现数组map方法
 */
/* 

const selfMap = function(fn, context){
  //获取值
  let arr = Array.prototype.slice.call(this)

  let mappedArr = []
  for(let i=0;i<arr.length;i++){
    if(!arr.hasOwnProperty(i)) continue;
    mappedArr.push(fn.call(context, arr[i], i, this))
  }
  return mappedArr
}

Array.prototype.selfMap = selfMap;

let rs = [1, 2, 3].selfMap(function(item, index, arr){
  if(item > 1) return item
}, {aaa:123}) 

*/

/**
 * 值得一提的是，map的第二个参数为第一个参数回调中的this指向，
 * 如果第一个参数为箭头函数，那设置第二个this会因为箭头函数的
 * 词法绑定而失效
 * 另外就是对稀疏数组的处理，通过hasOwnProperty来判断当前下标的元素
 * 是否存在与数组中
 */



/**
 * 3.使用reduce实现数组map方法
 * 
 * arr.reduce(function(prev, cur, index, arr){}, init)
 * arr 原始数组
 * prev标识上一次调用回调时的返回值，或者初始值init
 * cur标识当前正在处理的数组元素
 * index标识当前正在处理的数组元素的索引，若提供init值，则索引为0，
 * 否则索引为1
 * init标识初始值
 * 
 */

 /* 
const selfMap2 = function(fn, context){
  let arr = Array.prototype.slice.call(this)
  return arr.reduce((prev, cur, index)=>{
    return [...prev, fn.call(context, cur, index, this)]
  }, [])
}

Array.prototype.selfMap2 = selfMap2

console.log(
  [1,2, 5].selfMap2((item, i) => {
    return  item
  }, {a:123})
) 
*/

/**
 * 4.ES5实现数组filter方法
 * 
 */
/* 
const selfFilter = function(fn, context){
  let arr = Array.prototype.slice.call(this)
  let filteredArr = []
  for(let i=0;i<arr.length;i++){
    if(!arr.hasOwnProperty(i)) continue;
    fn.call(context, arr[i], i, this) && filteredArr.push(arr[i])
  }
  return filteredArr
}

 Array.prototype.selfFilter = selfFilter

console.log(
  [1,2, 3,4,5].selfFilter(function(item, i){
    if(item > 3)
      return item
  })
) */

/**
 * 斐波那契数列及其优化
 */
/* 
let fibonacci = function(n){
  if(n < 1) throw new Error('参数有误')
  if(n === 1 || n === 2) return 1
  return fibonacci(n - 1) +fibonacci(n - 2)
}

const memory = function(fn){
  let obj = {}
  return function(n){
    if(obj[n] === nudefined) obj[n] = fn(n)
    return obj[n]
  }
}

fibonacci = memory(fibonacci) 
*/

/**
 * 14.实现函数bind方法
 */



/* 
let a = {
  x:1
}

function test(){
  console.log(this.x)
}

const selfBind = function(bindTarget, ...args1){
  let func = this

  let rFunc = function(...args2){
    let args = [...args1, ...args2]
    func.apply(bindTarget, ...args1)
  }

  this.prototype && (rFunc.prototype = Object.create(this.prototype))

  let desc = Object.getOwnPropertyDescriptors(func)
  Object.defineProperties(rFunc, {
    length:desc.length,
    name:Object.assign(desc.name, {
      value:`bound${desc.name.value}`
    })
  })

  return rFunc
} 
*/

/* if(!Function.prototype.bind){
  Function.prototype.bind = function(oThis){
    if(typeof this !== "function"){
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function(){},
      fBound = function(){
        return fBound.apply(
          this instanceof fNOP 
          && 
          oThis ? this : oThis || window,
          aArgs.concat(Array.prototype.slice.call(arguments))
        )
      }
    
    fNOP.prototype = this.prototype
    fBound.prototype = new fNOP()

    return fBound
  }
} */

/**
 * 因为调用apply方法返回了一个新的函数对象，丢失了原函数对象的原型
 * 所以还要将新的函数对象的prototype属性引用到原函数对象的原型对象
 */
/* 
 Function.prototype.myBind = function(oThis){
  var self = this
  var args = Array.prototype.slice.call(arguments, 1)
  var result = function(){
    return self.apply(oThis, args.concat(Array.prototype.slice.call(arguments)))
  }

  var temp = function(){}
  temp.prototype = this.prototype
  result.prototype = new temp()
  return result
 }

 var A = {
   name:'jc',
   print:function(title){
     console.log(title + this.name)
   }
 }

 var func = A.print.myBind(A)
 console.log(func.prototype)
 func('red ') 
 */

/**
 * 15.实现函数call方法
 */

/* 
Function.prototype.selfCall = function(context, ...args){
  let func = this
  context || (context = window)
  if(typeof func !== 'function') throw new Error('this is not function')
  let caller = Symbol('caller')
  context[caller] = func
  let res = context[caller](...args)
  delete context[caller]
  return res;
}

var a = {aaa:123}
function test(){
  console.log(this.aaa)
}

test.selfCall(a) 
*/

/**
 * 16.简易的CO模块
 * 
 * Promise.resolve()
 * 有时候需要将现有对象转为Promise对象，Promise.resolve方法就起到这个作用
 * promise.resolve('foo')
 * //等价于
 * new Promise(resolve => resolve('foo'))
 * 
 */
/* 
function run(generatorFunc){
  let it = generatorFunc()
  let result = it.next()
  return new Promise((resolve, reject) => {
    const next = function(result){
      if(result.done){
        resolve(resolve.value)
      }
      result.value = Promise.resolve(result.value)
      result.value
        .then(res => {
            let result = it.next(res)
            if(result.value)
              next(result)
        })
        .catch(err => {
          reject(err)
        })
    }
    next(result)
  })
}

var data = {aaa:123}
var data2 = {bbb:123}
var data3 = {ccc:123}

function* func(){
  console.log(api(data))
  let res = yield api(data)
  console.log(res)
  let res2 = yield api(data2)
  console.log(res2)
  let res3 = yield api(data3)
  console.log(res3)
  console.log(res, res2, res3)
}

function api(data){
  return new Promise(resolve => {
    setTimeout(()=>{
      resolve(data)
    }, 1000)
  })
}

run(func)
*/

/**
 * run函数接受一个生成器函数，每当run函数包裹的生成器函数遇到yield
 * 关键字就会停止，当yield后面的promise被解析成功之后就会自动调用
 * next方法执行到下个yield关键字处，最终就会形成每当一个promise被
 * 解析成功就会解析下一个promise，当全部解析成功后打印所有解析的结果
 * 衍变为现在用的最多的async/await语法
 */

 /**
  * 17.函数防抖
  */
/* 
const debounce = (
  func,
  time = 50,
  options = {
    leading: true,
    trailing: true,
    context: null
  }
) => {
  let timer
  const _debounce = function(...args){
    if(timer)
      clearTimeout(timer)
    if(options.leading && !timer){
      timer = setTimeout(null, time)
      func.apply(options.context, args)
    }else if(options.trailing){
      timer = setTimeout(() => {
        func.apply(options.context, args)
        timer = null
      }, time)
    }
  }

  _debounce.cancel = function(){
    clearTimeout(timer)
    timer = null
  }
  return _debounce
}
let exec = function(){
  console.log('I\'am running...')
}
let test = debounce(exec)
 */

/* 
window.onscroll = function(){
  meth()
}

let t = null
function meth(){
  if(t){
    clearTimeout(t)
    t = null
    console.log(444)
  }else{
    t = setTimeout(() => {
      console.log(333)
      console.log(t)
      t = null
    }, 50)
  }
} 

*/

/**
 * 打印结果
333
1
(16)444
333
18

整体思路是，在setTimeout里的函数执行前就将这次的setTimeout删除
只保留最后一次，让他执行
*/

/**
 * leading为是否在进入时立即执行一次，trailing为是否在时间触发结束后
 * 额外再触发一次，原理是利用定时器，如果在规定时间内再次触发事件会将
 * 上次的定时器清除，即不会执行函数并重新设置一个新的定时器，直到超过
 * 规定时间自动触发定时器中的函数
 * 同时通过闭包向外暴露了一个cancel函数，是的外部能直接清除内部的计数器
 */

/**
 * 防抖、节流
 * 防抖和节流是两个相似的技术，都是为了减少一个函数无用的触发次数
 * 以便提高性能或者说避免资源浪费。我们都知道js在操作DOM的时候，
 * 代价是非常昂贵。相对于非DOM操作需要更多的内存和CPU时间，即假如
 * 我们一个函数实在滚动条或者更改窗口大小的时候频繁触发，环视会出现
 * 页面卡顿，如果是一套复杂的操作DOM逻辑，可能还会引起浏览器奔溃，
 * 所以我们需要控制一下触发的次数，来优化一下代码执行的情况
 */

/* 
const throttle = (
  func,
  time = 100,
  options = {
    leading:true,
    trailing:false,
    context:null
  }
) => {
  let previous = new Date(0).getTime()
  let timer
  const _throttle = function(...args){
    let now = new Date().getTime()
    if(!options.leading){
      console.log(1)
      if(timer) return 
      timer = setTimeout(() => {
        timer = null
        func.apply(options.context, args)
      }, time)
    }else if(now - previous > time){
      console.log(2)
      func.apply(options.context, args)
      previous = now;
    }else if(options.trailing){
      console.log(3)
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(options.context, args)
      }, time)
    }
  }

  _throttle.cancel = () => {
    previous = 0
    clearTimeout(timer)
    timer = null
  }

  return _throttle
}

function test1(){
  console.log('111')
}

let th = throttle(test1)

window.onscroll = function(){
  th(Math.random())
} 
和函数防抖类型，区别在于内部额外使用了时间戳作为判断，在一段时间
内没有触发事件才允许下次事件触发
*/


/**
 * 19.图片懒加载
 * 
 */
/* 
let imgList = [...document.querySelectorAll('img')]
let num = imgList.length

let lazyLoad = (function(){
  let count = 0
  return function(){
    let deleteIndexList = []
    imgList.forEach((img, index) => {
      let rect = img.getBoundingClientRect()
      if(rect.top < window.innerHeight){
        img.src = img.dataset.src
        deleteIndexList.push(index)
        count ++ 
        if(count === num){
          document.removeEventListener('scroll', lazyLoad)
        }
      }
    })
    imgList = imgList.filter((_, index) => !deleteIndexList.includes(index))
  }
})()

window.onscroll = function(){
  lazyLoad()
}
 */
/**
 * 20.new关键字
 */
/* 
const isComplexDataType = obj => 
  (typeof obj === 'object' || typeof obj === 'function')
  &&
  obj !== null

const selfNew = function(fn, ...rest){
  let instance = Object.create(fn.prototype)
  let res = fn.apply(instance, rest)
  return isComplexDataType(res) ? res : instance
}

function test(){
  return function(){
    console.log(111)
  }
}

test.prototype.eat = function(){
  console.log('eat...')
}

let t = selfNew(test)
console.log(t)



function Person(name, age){
  this.name = name;
  this.age = age;
} 
*/

/**
 * 21.实现Object.assign
 * 
 */

/*  
'use strict'

const isComplexDataType = obj =>
  (typeof obj === 'object' || typeof obj === 'function') 
  &&
  obj !== null

const selfAssign = function(target, ...source){
  if(target == null)
    throw new TypeError('Cannot covert undefined or null to object')
  return source.reduce((acc, cur) => {
    console.log(cur)
    console.log(Object.keys(cur))
    console.log(Object.getOwnPropertySymbols(cur))
    isComplexDataType(acc) || (acc = new Object(acc))
    if(cur == null) return acc;
    [...Object.keys(cur), ...Object.getOwnPropertySymbols(cur)].forEach(
      key => {
        acc[key] = cur[key]
      }
    )
    return acc
  }, target)   
}


let a = {
  aaa:234,
  bbb:324,
  ccc:435
}

let b = {
  bbb:'adsf',
  ddd:'ad',
  eee:234
}

let c = {
  bbbd:'adsf',
  ddde:'ad',
  eeeq:234
}

let nnn = selfAssign(a, b)

console.log(nnn) 

*/

/**
 * 22.instanceof
 */

/* 
const selfInstanceof = function(left, right){
  let proto = Object.getPrototypeOf(left)
  while(true){
    if(proto == null) return false
    if(proto === right.proto)
      return true
    proto = Object.getPrototypeOf(proto)
  }
}
 */


/**
 * 26.promisify
 */

/* function promisify(asyncFunc){
  return function(...args){
    return new Promise((resolve, rejcet) => {
      args.push(function callback(err, ...values){
        if(err){
          return rejcet(err)
        }
        return resolve(...values)
      })
      asyncFunc.call(this, ...args)
    })
  }
}

function test(a, b){
  setTimeout(() => b('', a), 1000)
}

var p = promisify(test)
p([1,2,3,4]).then(res => {
  console.log('----------------')
  console.log(res)
  console.log('----------------')
}) */

/* const fsp = new Proxy(fs, {
  get(target, key){
    return promisify(target[key])
  }
})
 */
/**
 * promisify函数是将回调函数变为promise的辅助函数，适合error-first
 * （nodejs）的回调函数，原理是给error-first风格的回调无论成功
 * 或者失败，在执行完毕后都会执行最后一个函数，我们需要做的就是让
 * 这个回调函数控制promise的状态即可
 * 
 * 这里还用了proxy代理了整个fs模块，拦截get方法，使得不需要手动
 * 给fs模块所有的方法都包一层promisify函数，更加的灵活
 */

/**
 * 27.有眼的处理async/await
 */


async function errorCaptured(asyncFunc){
  try{
    let res = await asyncFunc()
    return [null, res]
  }catch(e){
    return [e, null]
  }
}

async function test(){
  
  return ['123', {aaa:123}]
}



async function start(){
  let [err, res] = await errorCaptured(test)
  console.log(err, res)
}

start();