/**
 * 1.JS原始数据类型有哪些？ 引用数据类型有哪些？
 * 
 * JS中的原始数据类型有：boolean, null, undefined, number, string, symbol, bigint
 * JS中的引用数据类型有：对象object
 * （包含普通对象object, 数组Array, 正则表达式RegExp, 日期对象Date, 数学函数Math, 函数对象Function）
 * 
 * null, nudefined, string, boolean, number
 * array object
 */

// function test(person){
//     person.age = 26;
//     person = {
//         name: 'hzj',
//         age: 18
//     }
//     return person
// }

// const p1 = {
//     name: 'fyq',
//     age: 19
// }

// const p2 = test(p1)
// console.log(p1)
// console.log(p2)

/**
 * p1 = {
 *  name:'fyq',
 *  age:26
 * }
 * p2 = {
 *  name:'hzj',
 *  age:18
 * }
 * 
 * 原因：在函数传参的时候传递的是对象在堆栈中的内存地址值，test函数中的实参person是p1对象的内存地址，
 * 通过调用Person.age = 26确实改变了p1的值，但随后person变成了另一块内存空间的地址，并且在最后将
 * 这衣服内存空间的地址返回，赋值给了P2
 * 
 */

/**
 * null是对象吗？ 为什么
 * 
 * 结论：null不是对象。
 * 解释：虽然typeof null会输出object，但是这只是js存在的一个悠久Bug。在js的最初版本中使用的是32位
 * 系统，为了性能考虑使用地位存储变量的类型信息，000开头代表是对象然而null表示为全零，所以将他错误
 * 的判断为object。
 */

/**
 * '1'.toString()为什么可以调用?
 * 
 * 其实在这个语句运行的过程中做了这样几件事情：
 * var s = new Object('1')
 * s.toString();
 * s = null;
 * 
 * 第一步：创建Object类实例。注意为什么不是String? 由于Symbol和BigInt的出现，对他们调用new都会报错
 * 目前ES6规范也不建议用new来创建级别类型的包装类。
 * 第二步：调用实例方法
 * 第三步：执行完方法立即销毁这个实例
 * 这个过程体现了 基本包装类型 的性质，而基本包装类型恰恰属于基本数据类型， 包括Boolean, Number和 String
 */

/**
 * 0.1 + 0.2为什么不等于0.3
 * 0.1和0.2在转换成二进制后会无限循环，由于标准位数的限制后面多余的位数会被截掉，此时就已经出现了精度
 * 的损失，相加后因浮点小数位的显示而截断的二进制数字在 转换为十进制就会变成0.30000000000004
 */

/**
 * 如何理解BigInt
 * 什么是BigInt?
 * BigInt是一种新的数据类型，用于当整数值大于Number数据类型支持的范围时。这种数据类型允许我们安全地对
 * 大整数执行算数操作，表示高分辨率的时间戳，使用大整数id，等等，而不需要使用库。
 * 为什么需要BigInt？
 * 在js中，所有的数字都以双精度64为浮点格式表示，那这会带来什么问题？
 * 这导致js中的NUmber无法精确表示非常大的整数，它会将非常大的整数四舍五入，确切地说，js中的Number类型
 * 只能安全地表示-9007199254740991(-(2^53-1))和9007199254740991（(2^53-1)），任何超出此范围的整数
 * 值都可能失去精度。
 * console.log(999999999999999);  //=>10000000000000000  chrome显示结果不一致
 * 同时也有一定的安全性问题
 * 9007199254740992 === 9007199254740993;    // → true 居然是true!
 * 
 * 如何创建并使用BigInt？
 * 要创建BigInt，只需要在数字末尾追加n即可
 * console.log( 9007199254740995n );    // → 9007199254740995n	
 * console.log( 9007199254740995 );     // → 9007199254740996
 * 
 * 另一种创建BigInt的方法是用BigInt()构造函数、
 * BigInt("9007199254740995")
 * BigInt("9007199254740995");    // → 9007199254740995n
 * 
 * 简单使用如下：
 * 10n + 20n // 30n
 * 
 * 值得警惕的点
 * 1.BigInt不支持一元加号运算符，这可能是某些程序肯能依赖于 + 始终生成Number的不变量，或者抛出异常。
 * 另外，更改 + 的行为也会破坏asm.js代码。
 * 2.因为隐式类型转换可能丢失信息，所以不允许在bigint和Number之间进行混合操作。当混合使用大整数和浮点数
 * 时，结果值可能无法由BigInt或者Number精确表示
 * 3.不能将BigINt传递给web api和内置的js函数，这些函数需要一个NUmber类型的数字。尝试这样做会报TypeError
 * 错误
 * Math.max(2n, 4n, 6n)   //typeError
 * 4.当Boolean类型与BigInt类型相遇时，BigInt的处理方式与Number类型，换句话说，只要不是0n，BigInt
 * 就被是为truthy的值。
 * 5.元素都为BigInt的数组可以进行sort
 * 6.Bigint可以正藏地进行位运算， 如 | & << >>
 */

/**
 * JS 数据类型之问-监测篇
 * 1.typeof是否能正确判断类型？
 * 对于原始数据类型来说，除了null都可以调用typeof显示正确的类型
 * 
 * typeof 1  -number
 * typeof '1' -string
 * typeof true -boolean
 * typeof undefined -undefined
 * typeof Symbol() -symbol
 * 
 * 但对于引用数据类型，除了函数之外，都会显示'object'
 * typeof [] -object
 * typeof {} -object
 * typeof console.log -function
 * 
 * 因此采用typeof判断对象数据类型是不合适的，采用instanceof会更好，instanceof的原理时基于原型链的查询
 * 只要处于原型链，判断永远为true
 * 
 * const Person = function(){}
 * const p1 = new Person()
 * p1 instanceof Person -true
 * 
 * var str1 = 'hello world'
 * str1 instanceof String -false
 * 
 * var str2 = new String('hello world')
 * str2 instanceof String -true
 *
 * 2.instanceof能否判断数据类型？
 * 能，比如下面这种方式：
 * class PrimitiveNumber {
 *  static [Symbol.hasInstance](x){
 *      return typeof x === 'number'
 *  }
 * }
 * 
 * console.log(111 instanceof PrimitiveNumber) --true
 * 
 * 其实就是自定义instanceof行为的一种方式 ，这里将原有的instanceof方法重定义，换成了typeof，因此能够
 * 判断基本数据类型。
 * 
 * 3.能不能手动实现一下instanceof的功能？
 * 核心：原型链上向上查找
 */
function myInstanceof(left, right){
    //基本数据类型直接返回false
    if(typeof left !== 'object' || left === null) return false;
    //getProtypeOf是object对象自带的一个方法，能够拿到参数的原型对象
    let proto = Object.getPrototypeOf(left)
    while(true){
        if(proto == null) return false;
        if(proto == right.prototype) return true;
        proto = Object.getPrototypeOf(proto)

    }
}
/* 
console.log(myInstanceof('111', String))
console.log(myInstanceof(new String('111'), String))
*/

/**
 * 4.Object.is和===的区别
 * Object在严格等于的基础上修复了一些特殊情况下的失误，具体来说就是+0和-0，NaN和NaN。源码如下：
 */

function is(x, y){
    if(x === y){
        //运行到1/x === 1/y的时候x和y都为0，但是1/+0 = +Infinity， 1/-0 = -Infinity，是不一样的
        return x !== 0 || y !== 0 || 1 / x === 1 / y;
    }else{
        //NaN===NaN是false，这是部队的，我们在这里做一个拦截， x !== x, 那么一定是NaN, y同理
        //两个都是NaN的时候返回true
        return x !== x && y !== y;
    }
}

/**
 * 第三篇：JS数据类型之问---转换篇
 * 
 * 1.[] == ![]结果是什么？为什么？
 * 
 * 解析 ： == 中， 左右两边都需要转换为数字然后进行比较。
 * []转换为数字为0.
 * ![] 首先是转换为布尔值，由于[]座位一个引用类型转换为布尔值为true
 * 因此![]为false，进而在转换成数字，变为0
 * 
 * 0 == 0 结果为true
 */

/**
 * 2.js中类型转换有哪几种
 * js中，类型转换只有三种：
 * .转换成数字
 * .转换成字符串
 * .转换成布尔
 * 
 * 转换具体规则如下：
 * 注意“Boolean转字符串”这行结果指的是true转字符串的例子
 * 
 * 原始值           转换目标            结果
 * number           布尔值          除了0、0、NaN都为true
 * string           布尔值          除了空串都为true
 * undefined\null   布尔值          false
 * 引用类型          布尔值          true
 * number           字符串          5 => '5'
 * Boolean\函数\
 * Symbol\          字符串          true
 * 数组             字符串          [1,2] => '1,2'
 * 对象             字符串          '[object Object]'
 * string           数字            '1'=>1, 'a'=>NaN
 * 数组             数字            空数组为0，存在一个元素切为数字转为数字，其他情况NaN
 * null             数字            0
 * 除了数组的引用类型 数字              NaN
 * Symbol           数字            抛错
 * 
 */

/**
 * 3. == 和 === 有什么区别
 * 
 * ===叫做严格相等，是指：左右两边不仅值要相等，类型也要相等，例如'1' === 1的结果是false，因为一边是string，另一边是number
 * 
 * == 不像 ===那样严格，对于以便情况，只要值相等，就返回true，但==还设计一些类型转换，他的转换规则如下：
 * 。两边的类型是否相同，相同的话就比较值的大小，例如1==2，返回false
 * 。判断的是否是null和undefined，是的话就返回true
 * 。判断的类型是否是String和Number，是的话，把String类型转换成Number，在进行比较
 * 。判断的其中一方是否是Boolean，是的话就把Boolean转换成Number再进行比较
 * 。如果其中一方为Object，且另一方为String、Number或者Symbol,会将Object转换成字符串再进行比较
 */

/**
 * 4.对象转原始类型是根据什么流程运行的？
 * 对象转原始类型，会调用内置的[ToPrimitive]函数，对于该函数而言，其逻辑如下：
 * 1.如果Symbol.toPrimitive()方法，有限调用再返回
 * 2.调用valueOf()，如果转换为原始类型，则返回
 * 3.调用toString()，如果转换为原始类型，则返回
 * 4.如果都没有返回原始类型，会报错
 */
var obj = {
    value: 3,
    valueOf(){
        return 4;
    },
    toString(){
        return '5'
    },
    [Symbol.toPrimitive](){
        return 6;
    }
}

//console.log(obj + 1)

/**
 * 如何让if(a == 1 && a == 2)条件成立？
 * 其实就是上一个问题的应用
 */
var a = {
    value: 0,
    valueOf(){
        this.value++;
        return this.value;
    }
}

/**
 * 第四篇：探讨你对闭包的理解
 * 
 * 什么是闭包？
 * 
 * 红宝书上对于闭包的定义：闭包是指有权访问另外一个函数作用域中的变量的函数
 * 
 * MDN对闭包的的定义为：闭包是指哪些能够访问自由变量的函数。（其中自由变量，指再函数中使用的，但既不是
 * 函数参数arguments也不是函数的局部变量的变量，其实就是另一个函数作用域中的变量）
 * 
 * 闭包产生的原因？
 * 首先要明白作用域链的概念，其实很简单，再ES5中只存在两种作用域----全局作用域和函数作用域。当访问一个
 * 变量时，解释器回显再当前作用域查找标识符，如果没有找到，就区父作用域赵，直到找到该变量的标识符或者不在
 * 父作用域中，这就是作用域链，值得注意的是，每一个子函数都会拷贝上级的作用域，形成一个作用域的链条。比如：
 * var a = 1;
 * function f1(){
 *      var a = 2
 *      function f2(){
 *          var a = 3;
 *          console.log(a) //3
 *      }
 * }
 * 
 * 在这段代码中，f1的作用域指向有全局作用域（window）和它本身，而f2的作用域指向全局作用域（window）、f1和
 * 他本身。而且作用域是从最底层向上找，知道找到全局作用域window为止，如果全局还没有的话就会报错。就这么
 * 简单一件事情！
 * 
 * 闭包产生的本质就是，当前环境中存在指向父级作用域的引用。还是举上面的例子：
 * function f1(){
 *      var a = 2
 *      function f2(){
 *          console.log(a)
 *      }
 *      return f2;
 * }
 * 
 * var x = f1()
 * x()
 * 那是不是只有返回函数才算是产生了闭包呢？
 * 回到闭包的本质，我们只需要让父级作用域的引用存在即可，因此我们还可以这么做；
 * var f3;
 * function f1(){
 *      var a = 2
 *      f3 = function(){
 *          console.log(a)
 *      }
 * } 
 * f1()
 * f3()
 * 
 * 让f1执行，给f3赋值后，等于说现在f3拥有了window、f1和f3本身这几个作用域的访问权限，还是自底向上查找，
 * 最近是在f1中找到了a因此输出2‘
 * 
 * 在这里是外面的变量f3存在着父级作用域的引用，因此产生了闭包，形式变量，本质没有改变
 * 
 * 闭包有哪些表现形式？
 * 明白了本质之后，我们就来看看，在真实的场景中，究竟在哪些地方能体现闭包的存在？
 * 1.返回一个函数。刚刚一级举例
 */
/* 
var a = 1;
function foo(){
    var a = 2;
    function baz(){
        console.log(a)
    }
    bar(baz)
}

function bar(fn){
    fn()
}

foo(); 
*/

/**
 * 3.在定时器、事件监听、Ajax请求、跨窗口通信、web Workers或者任何异步中，只要使用了回调函数，实际上
 * 就是在使用闭包
 * 以下的闭包保存了仅仅是window和当前作用域
 * 
 */
/* 
setTimeout(function timeHandler(){
    console.log('111')
}, 100)

$('#app').click(function(){
    console.log('DOM Listener')
})
 */

/**
 * 4.IIFE(立即执行函数表达式)创建闭包，保存了全局作用域window和当前函数的作用域，因此可以全局的变量
 * 
 */
/* var a = 2;
(function IIFE(){
    console.log(a)
})(); */

/**
 * 如何解决下面的循环输出问题？
 * 
 */
/* for(var i = 1; i <= 5; i++){
    setTimeout(function timer(){
        console.log(i)
    }, 0)
} */

/**
 * 如何改进，让它输出1，2，3，4，5？（方法越多越好）
 * 
 * 因为setTimeout为宏任务，由于JS中单线程eventLoop机制，在主线程同步任务执行完后才去执行宏任务，因此
 * 循环结束后setTimeout中的回调才依次执行，但输出i的时候当前作用域没有，网上一级在找，发现了i，此时循环
 * 已经结束，i变成了6。因此会全部输出6.
 * 
 * 1.利用IIFE（立即执行函数表达式）当每次for循环时，把此时的i变量传递到定时器中
 */
/* for(var i = 1; i <= 5; i++){
    (function(j){
        setTimeout(function timer(){
            console.log(j)
        })
    })(i)
} */

/**
 * 2.给定时器传入第三个参数，座位timer函数的第一个函数参数
 */
/* for(var i = 1; i <= 5; i++){
    setTimeout(function timer(j){
        console.log(j)
    },0, i)
} */

/**
 * 3.使用es6中的let
 */
/* for(let i = 1; i<=5; i++){
    setTimeout(function timer(){
        console.log(i)
    },0)

    let使JS发生革命性的变化，让js有函数作用域变为了块级作用域，用let后作用域链不复存在。代码的作用域
    以块级为单位，以上面代码为例
} */

/**
 * 谈谈你对原型链的理解
 * 
 * 1.原型对象和构造函数有何关系？
 * 
 * 在js中，每当定义一个函数数据类型（普通函数、类）时候，都会天生自带一个prototype属性，这个属性指向
 * 函数的原型对象。
 * 当函数经过new调用时，这个函数就成了构造函数，返回一个全新的实例对象，这个实例对象有一个__proto__属性
 * 指向构造函数的原型对象。
 * 
 * 2.能不能描述一下原型链
 * js对象通过prototype指向父类对象，直到指向Object对象为止，这样就形成了一个原型指向的链条，即原型链
 * 。对象的hasOwnProperty()来检查对象自身中是否含有该属性
 * 。使用in检查对象中是否含有某个属性时，如果对象中没有但时原型链中有，也会返回true
 */

 /**
  * js如何实现继承？
  * 
  * 第一种：借助call
  */
/* 
function Person1(){
    this.name = 'person1'
}

function Child1(){
    Person1.call(this)
}

var child = new Child1()
console.log(child.name) 

这样写的时候子类虽然能够拿父类的属性值，但是问题是父类原型对象中一旦存在方法那么子类无法继承。那么
引入下面的方法。
*/

/**
 * 第二种：借助原型链
 */
/* function Person2(){
    this.name = 'person2'
    this.play = [1, 2, 3]
}
function child2(){
    this.type = 'child2'
}

child2.prototype = new Person2();

var child = new child2();

var s1 = new child2()
var s2 = new child2()
s1.play.push(4)
console.log(s1.play, s2.play)
//(4) [1, 2, 3, 4] (4) [1, 2, 3, 4]

 */

/**
 * 第三中：将前两种组合
 */
/* function Parent3(){
    this.name = 'parent3'
    this.play = [1, 2, 3]
}

function Child3(){
    Parent3.call(this)
}

Child3.prototype = new Parent3()

var s3 = new Child3()
var s4 = new Child3()

s3.play.push(4)
console.log(s3.play, s4.play) 
*/

/**
 * 第四种：组合继承的优化1
 */
/* function Parent4(){
    this.name = 'parent4'
    this.play = [1, 2, 3]
}

function Child4(){
    Parent4.call(this)
}

Child4.prototype = Parent4.prototype;

var c1 = new Child4()
var c2 = new Child4();

c1.play.push(4) */

/**
 * 第五种：组合继承的优化1
 */
/* function Person5(){
    this.name = 'person5'
    this.play = [1, 2, 3]
}

function Child5(){
    Person5.call(this)
}

Child5.prototype = Object.create(Person5.prototype)
Child5.prototype.constructor = Child5;

let c1 = new Child5()
let c2 = new Child5()
 */

/**
 * ES6的extends被编译后的js代码
 * 
 * ES6的代码最后都要在浏览器上能够跑起来，着中间就利用了babel这个编译工具，将ES6的代码编译成ES5
 * 让一些不支持新语法的浏览器也能运行
 */
/* function _possibleConstructorReturn(self, call){
    return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits(subClass, superClass){
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    })

    if(superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Child = (function(_parent){
    _inherits(Child, _Parent)

    function Child(){
        _classCallCheck(this, Child)

        return _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).apply(this.arguments))
    }

    return Child;
})(Parent)
 */

"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { 
    if (call && (_typeof(call) === "object" || typeof call === "function")) { 
        return call; 
    } return 
    _assertThisInitialized(self); }

function _assertThisInitialized(self) { 
    if (self === void 0) { 
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); 
    } return self; 
}

function _getPrototypeOf(o) {
     _getPrototypeOf = Object.setPrototypeOf ? 
        Object.getPrototypeOf : 
        function _getPrototypeOf(o) { 
            return o.__proto__ || Object.getPrototypeOf(o); 
        }; 
        return _getPrototypeOf(o); 
    }

function _inherits(subClass, superClass) { 
    if (typeof superClass !== "function" && superClass !== null) { 
        throw new TypeError("Super expression must either be null or a function"); 
    } 
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass, 
            writable: true, 
            configurable: true 
        } 
    }); 
    //debugger
    if (superClass) _setPrototypeOf(subClass, superClass); 
}

function _setPrototypeOf(o, p) { 
    _setPrototypeOf = Object.setPrototypeOf || 
        function _setPrototypeOf(o, p) { 
            o.__proto__ = p; 
            return o; 
        };
        return _setPrototypeOf(o, p); 
}

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
         return !!right[Symbol.hasInstance](left); 
    } else {
         return left instanceof right; 
    } 
}

function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
          throw new TypeError("Cannot call a class as a function"); 
    } 
}

var Person = function Person() {
    _classCallCheck(this, Person);

    this.name = 'aaa';
};

;

var Child =
    /*#__PURE__*/
    function (_Person) {
        _inherits(Child, _Person);

        function Child() {
            _classCallCheck(this, Child);
            console.log()
            return _possibleConstructorReturn(this, _getPrototypeOf(Child).call(this));
        }

        return Child;
    }(Person);

;