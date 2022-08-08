/**
 * 1.
 * get请求传参长度的误区
 * 误区：我们经常说get请求参数的大小存在限制，而post请求的参数大小是无限制的
 * 
 * 实际上HTTP协议从未规定GET/POST的请求长度限制是多少。对get请求参数的限制是来源于浏览器或web服务器，浏览器或web服务器限制了url
 * 的长度。为了明确这个概念，我们必须再次强调下面几点：
 * HTTP协议 未规定GET和POST的长度限制
 * GET的最大长度显示是因为 浏览器和web服务器限制了URI的长度
 * 不同的浏览器和WEB服务器，限制的最大长度不一样
 * 要支持IE，则最大长度为2083byte， 若只支持Chrome，则崔大长度8182byte
 * 
 * 2
 * 补充get和post请求在缓存方面的区别
 * post/get的亲求区别，
 * 补充一个get和post在缓存方面的区别
 * get请求类似于查找的过程，用户获取数据，可以不用每次都与数据库连接，所以可以使用缓存。因此get请求适合于请求缓存
 * 
 * 3
 * 闭包
 * 闭包就是能够读取其他函数内部变量的函数，或者子函数在外调用，子函数所在的父函数的作用域不会被释放
 * 
 * 4
 * 类的创建和继承
 */

/*  function Animal(name){
     this.name = name || 'Animal';
     this.sleep = function(){
         console.log(this.name + '正在睡觉！');
     }
 }

 Animal.prototype.eat = function(food){
     console.log(this.name + '正在吃：' + food)
 } */

 //类的继承
//  function Cat(){}
//  Cat.prototype = new Animal()
//  Cat.prototype.name = 'cat';

 //var cat = new Cat();
//  console.log(cat.name)
//  console.log(cat.eat('fish'))
//  console.log(cat.sleep())
//  console.log(cat instanceof Animal)
//  console.log(cat instanceof Cat)

/**
 * 介绍：在这里我们可以看到new了一个空对象，这个空对象指向Animal并且Cat.prototype指向了这个空对象，这种就是基于原型链的继承
 * 特点：基于原型链，既是父类的实例，也是子类的实例
 * 缺点：无法实现多继承
 */

 //构造继承：使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类(没用用到原型)
//  function Cat(name){
//      Animal.call(this);
//      this.name = name || 'Tom';
//  }

//var cat = new Cat()
//console.log(cat.name)
//console.log(cat.sleep())
//console.log(cat.eat('fish')) //Uncaught TypeError
//console.log(cat instanceof Animal)
//console.log(cat instanceof Cat)

/**
 * 特点：可以实现多继承
 * 缺点：只能继承父类实例的属性和方法，不能继承原型上的属性和方法
 */

 /**
  * 4
  * 实例继承和拷贝继承
  * 
  * 实例继承：为父类实例添加新特性，作为子类实例返回
  * 拷贝继承：拷贝父类元素上的属性和方法
  */


  /**
   * 5
   * 组合继承：相当于构造继承和原型链继承的组合体。通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型
   * 实现函数复用
   */
//   function Cat(name){
//       Animal.call(this)
//       this.name = name || 'Tom'
//   }

//   Cat.prototype = new Animal();
//   Cat.prototype.constructor = Cat;

//   var cat = new Cat();
//   console.log(cat.name)
//   console.log(cat.sleep())
//   console.log(cat instanceof Animal)
//   console.log(cat instanceof Cat)

/**
 * 特点：可以继承实例属性/方法，也可以继承原型属性/方法
 * 缺点：调用了两次父类构造函数，生成了两份实例
 */

 /**
  * 寄生组合继承：通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造函数的时候，就不回初始化两次实例方法/属性
  */
/*  function Cat(name){
     Animal.call(this)
     this.name = name || 'Tom'
 }

 (function(){
     var Super = function(){}
     Super.prototype = Animal.prototype;
     console.log(new Super())
     Cat.prototype = new Super()
 })() */

//  var cat = new Cat();
//  console.log(cat.name)
//  console.log(cat.sleep())
//  console.log(cat instanceof Animal)
//  console.log(cat instanceof Cat)

/**
 * 如何解决异步回调函数地狱
 * promise、 generator、 async/await
 */
 
 /**
  * 前端中的事件流
  * 
  * HTML中与javascript交互是通过事件驱动来实现的，例如鼠标点击事件onclick、页面的滚动事件onscroll等等，
  * 可以想文档或者文档中的元素添加事件侦听器来预订事件。想要知道这些事件是在什么时候进行调用的，就需要了解一一下“事件流”的概念
  * 什么是事件流：事件流描述的是从页面中接受事件的顺序，DOM2级事件流包括下面几种阶段.
  * 事件捕获阶段
  * 处于目标阶段
  * 事件冒泡阶段
  * addEventListener:addEventListener是DOM2级事件新增的预定事件处理程序的操作，
  * 这个方法接受3个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。
  * 最后这个布尔值参数如果是 
  * true，表示捕获阶段调用事件处理程序；
  * false，表示冒泡阶段调用事件处理程序
  * IE只支持事件冒泡
  * 
  * 事件捕获 从window对象  ->  body -> div
  * 事件冒泡 从div -> body -> window
  * 
  * 如何让事件先冒泡后捕获
  * 在DOM标准事件模型中，是先捕获后冒泡。 但是如果要实现先冒泡后捕获的效果，对于同一个事件，舰艇捕获和冒泡，
  * 分别对应相应的处理函数，舰艇到捕获事件，先展缓执行，直到冒泡事件被捕获后再执行捕获事件
  * 
  * 事件委托
  * 时间委托指的是，不在事件的发生地（直接dom）上设置监听函数，二十在其父元素上设置监听函数，通过事件冒泡，
  * 父元素可以监听到子元素上事件的触发，通过判断事件发生元素DOM类型,来做出不同的相应
  * 
  * 举例：最经典的就是ul和li表情的事件监听，比如我们在添加事件时候，采用事件委托机制，不会再li标签上直接添加，二十再ul父元素上添加
  * 
  * 好处：比较适合动态元素的绑定，新添加的子元素也会有监听函数，也可以有事件触发机制。
  * 
  * 图片的懒加载和预加载
  * 预加载：提前加载图片，当用户需要查看时可直接从泵顶缓存中渲染
  * 懒加载：懒加载的主要目的是作为服务器前端的优化，减少请求书或延迟请求书
  * 两种技术的本质：两者的行为是相反的，以一个是提前加载，一个是迟缓甚至不加载。懒加载对服务器前端有一定的缓解压力作用，
  * 预加载则会增加服务器前端压力
  * 
  * mouseover和mouseenter的区别
  * mouseover:当鼠标移入元素或其子元素都会触发事件，所以有一个重复触发，冒泡的过程。对应的移除事件是mouseout
  * mouseenter：当鼠标移入元素本身（不包含元素的子元素）会触发事件，也就是不回冒泡，对应的移除事件是mouseleave
  * 
  * js的new操作符做了哪些事情
  * new操作符新建了一个空对象，这个对象原型指向构造函数的prototype，执行构造函数后返回这个对象
  * 
  * 改变汗阿术内部this指针的指向函数（bind， apply， call的区别）
  * 
  * 通过apply和call改变函数的this指向，他们两个函数的第一个参数都是一样的表示要改变指向的哪个对象，第二个参数，apply是数组，二call则是arg1, arg2这种形式
  * 通过bind改变this作用域会返回一个新的函数，这个函数不回马上执行
  * 
  * js的各种位置，比如clientHeight, scrollHeight, offsetHeight,以及scrollTop, offsetTop, clientTop的区别
  * clientHeight：表示的是可视区域的高度，不包含border和滚动条
  * offsetHeight：表示可视区域的高度，包含了border和滚动条
  * scrollHeight：表示了所有区域的高度，包含了因为滚动被隐藏的部分
  * clientTop:表示边框border的厚度，再未指定的情况下一般为0
  * scrollTop：滚动后被隐藏的高度，获取对象相对于由offsetParent属性制定的父坐标（css定位的元素或body元素）距离顶端的高度
  * 
  * js拖拽功能的实现
  * 首先是三个事件，分别是mousedown, mousemove, mouseup当鼠标点击按下的时候，需要一个tag标识此时已经按下，可执行mousemove里面的具体方法
  * 
  * clientX, clientY标识的是鼠标的坐标，分别标识横坐标和纵坐标，并且我们用offsetX和offsetY来表示元素的初始坐标，
  */


Array.prototype.multiply = function(){
    if(Array.isArray(this)){
        this.forEach(val=>{
            this.push(val * val)
        })
    }
}

const a = [1, 2, 3, 4, 5]

a.multiply();

console.log(0.1 + 0.2 === 0.3)

/**
 * 我们再js中进行如下运算时
 * console.log(0.1+0.2) //结果时0.30000000000000004 而不是0.3
 * 原因：
 *      数字得存储方式
 * 原理
 *      在计算机中数字无论时定点数还时浮点数都是以多为二进制得方式进行存储得。
 *      在js中数字采用得IEEE754得双精度标准进行存储（存储一个数值所使用得二进制位数比较多，精度更准确）
 * 示例
 *      在定点数中，如果我们以8为二进制来存储数字
 * 对于整数来说，十进制得35会被存储为：00100011 其代表2^5 + 2^1 + 2^0
 * 对于纯小数来说，十进制得0.375会被存储为：0.011其代表1/2^2 + 1/2^3 = 1/4 + 1/7 = 0.375
 * 对于像0.1这样得数值用二进制表示你就会发现无法整出，最后算下来回是0.000110011.。。。由于存储弓箭有限，最后
 * 计算机会舍弃后面得数值，所以我们最后就只能得到一个近似值
 * js中采用得IEEE754得双精度标准也是一样得道理在存储空间有限得情况下，当出现这种无法整除得小数的时候就取一个
 * 近似值，在js中如果这个近似值最后近似，那么js就会认为它就是那个值
 * console.log(0.1000000000000001)
 * //0.1000000000000001
 * console.log(0.10000000000000001)
 * //0.1
 * 由于0.1转换成二进制时时无限循环的，所以在计算机中0.1只能存储成一个近似值。例外说一句，除了那些
 * 能表示成x/2^n的数可以被精确表示意外，其余数字都是以及近似值的方式存在的
 * 
 * 在0.1 + 0.2 这个式子中， 0.1和0.2 都是近似表示的， 在他们相加的时候，两个近似值进行了计算，
 * 导致对吼得到的值时0.30000000000000004， 此时对于js来说，其不够近似于0.3，于是就是出现了0.1 + 0.2 ！= 0.3这个现象
 * 当然，也并非所有的近似值相加都得不到正确的结果
 * 
 */


 /**
  * js中有哪些不同的数据类型
  * 
  * 1.基础类
  * Number String boolean undefined null Symbol
  * 
  * 2.引用类
  * Object Array Function
  * 
  * 
  * 
  */



/**
 * 4.解决以下异步代码问题
 */


/* function searchStudent(classId, searchCourses){ 
    let students = []

    //异步接口

    searchCourses(students);

    //return 
}

function searchCourses(students, searchScore){
    let result = []
    for(let i = 0; i< students.length; i++){

        //异步接口
        let courses = [];
        let scores = []
        courses.forEach(item=>{
            (function(j){
                scores.push(searchScore(students[i], courses[j]))
            })(course[i])
        })
    }
}

function searchScore(studentId, course){
    //异步接口
    return score;
}

for(var i = 0; i< 5; i++){
    var arr = [];
    (function(j){
        setTimeout(()=>{
            arr.push(num(j))
        },200)
    })(i)
}

console.log()

function num(i){
    setTimeout(()=>{
        return i * i
    },500)
} */

const a10 = {
    key1: Symbol(),
    key2: 10
}

console.log(JSON.stringify(a10))