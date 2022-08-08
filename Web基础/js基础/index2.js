/**
 * 第七篇：函数的arguments为什么不是数组？如何转换成数组？
 * 因为arguments本身并不能调用数组方法，他是一个另外一种对象类型，只不过属性从0开始排，依次为0, 1, 2,..
 * 最后还有callee和length属性。我们也把这样的对象称为类属性。
 * 常见的类属性还有：
 * 。1，用getElementsByTagName/ClssName()获得的HTMLCollection
 * 。2，用querySelector获得的nodeList
 * 
 * 那这导致很多数组的方法就不能用了，必要时需要我们将他们转换成数组，有哪些方法呢？
 * 
 * 1.Array.prototype.slice.call()
 */

function sum(a, b){
    let args = Array.prototype.slice.call(arguments);
    console.log(args.reduce((sum, cur) => sum + cur))
}

/**
 * 2.Array.from()
 * Array.from()方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。
 * 
 * sequence generator
 * const range = (start, stop, step) => 
    Array.from({length: (stop - start) / step + 1}, (_, i) => start + (i * step))

    console.log(range(0, 4, 1))

    range('A'.charCodeAt(0), 'Z'.charCodeAt(0), 1).map(x => String.fromCharCode(x))

    数组去重
    function combine(){
        let arr = [].concat.apply([], arguments)
        return Array.from(new Set(arr))
    }

    var m = [1, 2, 2], n = [2, 3, 3]
    console.log(combine(m, n))
 * 
 */
function sum2(a, b){
    let args = Array.from(arguments)
    console.log(args.reduce((sum, cur) => sum + cur))
}

/**
 * 3.ES6展开运算符
 */
function sum3(a, b){
    let args = [...arguments]
    console.log(args.reduce((sum, cur) => sum + cur))
}

/**
 * 4.利用concat + apply
 */
function sum4(a, b){
    let args = Array.prototype.concat.apply([], arguments)
    console.log(args.reduce((sum, cur) => sum + cur))
}

/**
 * 第八篇：forach中的return有效果吗？如何终端forEach循环？
 * 
 * 在forEach中用return 不会返回，函数会继续执行。
 */
/* let nums = [1, 2, 3]
nums.forEach((item, index) => {
    console.log(index)
    if(index == 1) throw new Error('报错咯');
}) */
/**
 * 中断方法：
 * 1.使用try监听代码块，在需要中断的地方抛出异常
 * 2.官方推荐方法（替换方法）：用every和some代替forEach函数。every在碰到return false时候，终止循环。
 * some在碰到return true的时候，中止循环
 */

/**
 * 第九篇：JS判断数组中是否包含某个值
 * 
 * 方法一：array.indexOf
 * 
 * 此方法判断数组中是否存在某个值，如果存在，则返回数组元素得下标，否则返回-1
 * 
 * var arr = [1, 2, 3, 4]
 * var index = arr.indexOf(3)
 * 
 * 方法二：array.includes(searchElement[, fromIndex])   fromIndex 从哪个索引开始
 * 此方法判断数组中是否存在某个值，如果存在返回true，否则返回false
 * 
 * var arr = [1, 2, 3, 4]
   console.log(arr.includes(3, 2))

 * 方法三：array.find(callback[,thisArg])
 * 返回数组中满足条件的第一个元素的值，如果没有，返回undefined
 * 
 *  var arr = [1, 2, 3, 4]
 *  var result = arr.find(item => {
 *      return item > 3
 *  })
 * 
 * 方法四：array.findIndex(callback[,thisArg])
 * 返回数组中满足条件的第一个元素的下标，如果没有找到，返回-1
 * 
 * var arr = [1, 2, 3, 4]
 * var result = arr.findIndex(item => item > 3)
 */

/**
 * 第十篇：JS中flag---数组扁平化
 * 
 * 对于前端项目开发过程中，偶尔会出现层叠数据结构的驻足，我们需要将多层级数组转化为一级数组（
 * 即提取嵌套数组元素最终合并为一个数组），使用内容合并且展开，
 * 
 * 需求：多维数组 => 一维数组
 * 
 * let ary = [1, [2, [3, [4, 5]]], 6]
   let str = JSON.stringify(ary)
 * 
 * 1.调用ES6中的flat方法
 * ary = ary.flat(Infinity);
 * 
 * 2.replace + split
 * let str = JSON.stringify(ary)
 * ary = str.replace(/\[|\]/g, '').split(',')
 * 
 * 3.replace + JSON.parse
 * let str = JSON.stringify(ary)
 * let ary = str.replace('/\[|\]/g', '')
 * ary = '[' + ary + ']'
 * JSON.parse(ary)
 * 
 * 4.普通递归
 *  let result = []
    let fn = function(ary){
        for(let i = 0; i < ary.length; i++){
            let item = ary[i]
            if(Array.isArray(item)){
                fn(item)
            }else{
                result.push(item)
            }
        }
    }
 * 
 * 5.利用reduce函数迭代
 *  function flatten(ary){
        return ary.reduce((pre, cur) => {
            return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
        }, [])
    }
 * 
 * 6.扩展运算符
 * while(ary.some(Array.isArray)){
 *      ary = [].concat(...ary)
 * }
 */

/**
 * 第十一篇：JS数组的高阶函数---基础篇
 * 
 * 1.什么是高阶函数
 * 
 * 概念非常简单，如下：
 * 一个函数 就可以接收另一个函数作为参数或者返回值为一个函数，这种函数就称为高阶函数
 * 对应到数组中有哪些方法呢？
 * 
 * 2.数组中的高阶函数
 * 
 * 1.map
 * 。参数：接受两个参数，一个是回调函数，一个是回调函数的this值（可选）
 * 其中，回调函数被默认传入三个值，依次为当前元素、当前索引、整个数组。
 * 
 * 。创建一个新的数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果
 * 。对原来的数组没有影响
 * 
 *  let nums = [1, 2, 3]
    let obj = {val:5}
    let newNums = nums.map(function(item, index, arr){
        return item + index + arr[index] + this.val
    }, obj)
 *  
 * 2.reduce
 * 。参数：接收两个氮素，一个为回调函数，另一个为初始值。
 * 回调函数中有三个默认参数，以此为：积累值、当前值、整个数组。
 * 
 * let nums = [1, 2, 3]
 * let newNums = nums.reduce(function(preSum, curVal, array){
 *     return preSum + curVal
 * }, 0)
 * 
 * 不传默认值会怎样？
 * 不穿默认值会自动以第一个元素为初始值，然后从第二个元素开始依次累计
 * 
 * 3.filter
 * 参数：一个函数参数。这个函数参数接收一个默认参数，就是当前元素。这个作为参数的函数返回值为一个布尔类型
 * 决定元素是否保留。
 * 
 * filter方法返回值为一个新的数组，这个数组里面包含参数里面所有被保留的项
 * 
 * let nums = [1, 2, 3]
 * let oddNums = nums.filter(item => item % 2)
 * 
 * 4.sort
 * 参数：一个用于比较的函数，他有两个默认参数，分别是代表比较的两个元素
 * 
 * 举个例子：
 * 
 *  let nums = [2, 3, 1]
    nums.sort(function(a, b){
        if(a > b) return 1;
        else if(a < b) return -1;
        else if(a == b) return 0;
    })
 * 
 * 当比较函数返回值大于0， 则a在b的后面，即a的下标应该比b大
 * 反之，则a在b的后面，即a的下标比b小
 * 整个过程就完成了一次升序的排列
 * 当然还有一个需要注意的情况，就是比较函数不传的时候，是如何进行排序的？
 * 
 * 答案是将数字转换为字符串，然后 更具字母unicode值进行升序培训，也就是根据字符串的比较规则进行升序排序
 * 
 */

/**
 * 第十二篇：能不能实现数组map方法？
 * 
 * 
 */

/* 
Array.prototype.map = function(fn, thisArg){
    var args = this;
    var that = thisArg || null;

    var result = []
    for(var i = 0; i < args.length; i++){
       result.push(fn.call(that, args[i], i, args));
    }

    return result;
};
let a = [1,2,3,4].map(function(item, i, arr){
        return item + i + arr[i] + this.a
}, {a:5}); 
*/
/* 
Array.prototype.map = function(callbackFn, thisArg){
    //处理数组类型异常
    if(this === null || this === undefind)
        throw new TypeError("Cannot read property 'map' of null or undefined");

    //处理回调类型异常
    if(Object.prototype.toString.call(callbackFn) != "[object Function]") {
        throw new TypeError(callbackFn + ' is not a function')
    }

    //草案中提到要先转换为对象
    let O = Object(this);
    let T = thisArg;

    let len = O.length >>> 0;
    let A = new Array(len);

    for(let k = 0; k < len; k++){
        if(k in O){
            let kValue = O[k];
            let mappedValue = callbackFn.call(T, kValue, k, O);
            A[k] = mappedValue;
        }
    }
    return A;
}
 */

/**
 * 第十三篇：能不能实现数组reduce方法？
 */
/* 
Array.prototype.reduce = function(fn, initialValue){
    if(this === null || this === undefined){
        throw new TypeError("cannot read property 'reduce' of unll or undefined");
    }

    if(Object.prototype.toString.call(fn) !== '[object Function]'){
        throw new TypeError(fn + ' is not a function');
    }

    let args = this;
    let result = 0 || initialValue;

    for(var i = 0; i < args.length; i++){
        //console.log(fn.call(null, result, args[i], i, args))
        result = fn.call(null, result, args[i], i, args)
    }
    return result;
}
*/

Array.prototype.reduce = function(callbackfn, initialValue){
    //异常处理，和map一样
    //处理数组类型异常
    if(this === null || this === undefined){
        throw new TypeError("Cannot read property 'reduce' of null or undefined");
    }

    //处理回调函数类型异常
    if(Object.prototype.toString.call(callbackfn) != "[object Function]"){
        throw new TypeError(callbackfn + ' is not a function');
    }

    let O = Object(this);
    let len = O.length >>> 0;
    let k = 0;
    let accumulator = initialValue;
    if(accumulator === undefined){
        for(; k < len; k++){
            //查找原型链
            if(k in o){
                accumulator = O[k];
                k++;
                break;
            }
        }
    }

    //表示数组全为空
    if(k === len && accumulator === undefined)
        throw new Error('Each element of the array is empty');
    for(;k < len; i++){
        if(k in o){
            accumulator = callbackfn.call(undefined, accumulator, O[k], k, O)
        }
    }
    return accumulator;
}

let a = [1,2,3].reduce(function(pre, cur, index, arr){
    console.log(pre, cur)
    return pre + cur
}, 5)

console.log(a)