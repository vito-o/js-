/**
 * 函数值这样的一段js代码，它只定义一次，但可能被执行或调用任意次。你可能已经从诸如子例程(subroutine)
 * 或者过程(procedure)这些名字里对函数的概念有所了解。js函数是参数化的：函数的定义会包括一个
 * 称为形参（parameter）的标识符列表,这些参数在函数体中像局部变量一样工作。函数调用会为形参提供
 * 实参的值。函数使用他们实参的值来计算返回值，成为该函数调用表达式的值。除了实参之外，每次调用
 * 换回拥有另一个值--本次调用的上下文--这就是this关键字的值。
 * 
 * 如果函数挂载在一个对象上，作为对象的一个属性，就称它为对象的方法。当通过这个对象来调用函数时，
 * 该对象就是此次调用的上下文（context），也就是该函数的this的值。用于初始化一个新创建的对象的
 * 函数称为构造函数(constructor)
 * 
 * 在js里，函数即对象，程序可以随意操作他们。比如js可以把函数赋值为变量，或者作为参数传递给其他函数
 * 因为函数就是对象，所以可以给他们设置属性，甚至调用他们的方法。
 * 
 * js的函数可以嵌套在其他函数中定义，这样他们就可以访问他们被定义时所处的作用于中的任何变量。
 * 这以为着js函数构成了一个闭包（closure），它为js带来了非常强劲的编程能力，
 * 
 * 8.1 函数定义
 * 
 * 函数使用function关键字来定义，它可以用在函数定义表达式或者函数声明语句里。这两种形式中，函数
 * 定义都从function关键字开始，气候跟随这些组成部分：
 * 。函数名称标识符。函数名称是函数声明语句必须的部分。它的用途就像变量的名字，新定义的函数对象
 * 会赋值给这个变量。对函数定义表达式来说，这个名字是可选的：如果存在，该名字只存在于函数体中
 * 并指代函数对象本身。
 * 。一堆圆括号，轻重包含由0个或者多个用逗号隔开的标识否组成的列表。这些标识符是函数的参数名称
 * 他们就像函数体中的局部变量。
 * 。一堆花括号，其中包含0条或多条js语句。这些语句构成了函数体：一旦调用函数，就会执行这些语句
 * 
 * 8-1分别展示了函数语句和表达式两种方式的函数定义。注意，以表达式来定义函数只适用于它作为一个
 * 大的表达式的一部分，比如在赋值和调用过程中定义函数：
 * 
 * function printprops(o){
 *    for(var p in o)
 *      console.log(p + ": " + o[p] + "\n");
 * }
 * 
 * function distance(x1, y1, x2, y2){
 *    var dx = x2 - x1;
 *    var dy = y2 - y1
 *    return Math.sqrt(dx*dx + dy*dy)
 * }
 * 
 * function factorial(x){
 *    if(x <= 1) return 1;
 *    return x * factorial(x - 1)
 * }
 * 
 * //函数表达式
 * var square = function(x){return x * x}
 * 
 * var f = function fact(x){if(x <= 1) return 1; else return x*fact(x - 1)}
 * 
 * data.sort(function(a, b){return a - b})
 * 
 * var tensquared = (function(x){return x*x}(10))
 * 
 * 注意：以表达式方式定义的函数，函数的名称是可选的。一条函数声明语句实际上声明了一个变量，并
 * 把一个函数对象赋值给他。相对而言，定义函数表达式时并没有声明一个变量。函数可以命名，就像上
 * 面的阶乘函数，它需要一个名称来指代自己。如果一个函数定义表达式包含名称，函数的局部作用于
 * 将会包含一个绑定到函数对象的函数名称。实际上，函数的名称将成为函数内部的一个局部变量。通常
 * 而言，以表达式方式定义函数时都不需要名称，这会让定义他们的代码更为紧凑。函数定义表达式特别
 * 适合用来定义那些只会用到一次的函数，比如上面展示的最后两个例子。
 * 
 * 如5.3.2所述，函数声明语句‘被提前’到外部脚本或外部函数作用于的顶部，所以以这种方式声明的函数
 * 可以被在他定义之前出现的代码所调用，不过，以表达式定义的函数就另当别论，为了调用一个函数，必须
 * 要能引用它，而要使用一个以表达式方式定义的函数之前，必须把它复制给一个变量。变量的声明提前了
 * 但给变量赋值是不会提前的，所以，以表达式方式定义的函数在定义之前无法调用
 * 
 * 请注意，在8-1中的大多数函数包含一个return语句。return语句导致函数停止执行，并返回它的表达式
 * （如果有的话）的值给调用者。如果return语句没有一个与之相关的表达式，则它返回undefined值，如果
 * 一个函数不包含return语句，那它就只执行函数体中的每条语句，并返回undefined值给调用者。
 * 
 * 例8-1中的大多数函数都是用来计算出一个值得，他们使用return把值返回给调用者。而printprops()
 * 函数的不同之处在于，它的任务是输出对象各属性的名称和值。没有必要返回值，该函数不包含return
 * 语句。printprops()函数的返回值始终是undefined(没有返回值的函数有时候称为过程)
 * 
 * 嵌套函数
 * 
 * 在js里，函数可以嵌套在其他函数里。例如：
 * 
 * function hypotenuse(a, b){
 *    function square(x){return x*x}
 *    return Mah.sqrt(square(a) + square(b))
 * }
 * 
 * 嵌套函数的有趣支撑处在于他的遍历作用于规则：他们可以发放完嵌套他们（或多重嵌套）的函数的参数
 * 和变量。例如，在上面的代码里，内部函数square()可以读写外部函数hypotenuse()函数的参数a和b。
 * 这些作用于规则对内嵌函数非常重要。
 * 
 * 5.3.2节曾提到，函数声明语句并非真正的语句，ECMAScript规范只是允许他们作为顶级语句。他们可以出现在全局
 * 代码里，或者内嵌在其他函数中，但他们不能出现在循环、条件判断，或者try/cache/finallyyiji with
 * 语句中。注意，此限制仅适用于语句声明形式定义的函数。函数定义表达式可以出现在js代码的任何地方
 * 
 * 8.2 函数调用
 * 
 * 构成函数主体的js代码在定义之时并不会执行，只有调用该函数时，他们才会执行。
 * 有4中方式来调用js函数
 * .作为函数
 * .作为方法
 * .作为构造函数
 * .通过他们的call()和apply()方法简介调用
 * 
 * 8.2.1 函数调用
 * 
 * 使用调用表达式可以进行普通的函数调用也可以进行方法调用。一个调用表达式由多个函数表达式组成，
 * 每个函数表达式都是由一个函数对象和左括号、参数猎豹和有括号组成，参数猎豹是由逗号分隔的零个
 * 或多个参数表达式组成。如果函数表达式时一个属性访问表达式，即该函数是一个对象的属性或数组中
 * 的一个元素，那么它就是一个方法调用表达式。下面将会解释这种情况。下面的代码展示了一些普通的
 * 函数调用表达式：
 * printprops({x:1})
 * var total = distance(0, 0, 2, 1) + distance(2,1,3,5)
 * var probabilitty = factorial(5) / factorial(13)
 * 
 * 在一个调用中，每个参数表达式（圆括号之间的部分）都会计算出一个值，计算的结果作为参数传递给
 * 另外一个函数。这些值作为实参传递给声明函数时定义的形参。在函数体中存在一个形参的引用，指向当前
 * 传出的实参列表，通过它可以获得参数的值
 * 
 * 对于普通的函数调用，函数的返回值称为调用表达式的值。如果该函数返回是因为解释器到达结尾，返回
 * 值就是undefined.如果函数返回是因为解释器执行到一条return 语句，返回值就是return之后的表达式
 * 的值，如果return语句没有值，则返回undefined
 * 
 * 根据ECMAScript3和非严格的EMCAScript5对函数调用的规定，调用上下文是全局对象，。而在严格模式下
 * 调用上下文则是undefined
 * 
 * 以函数形式调用的函数通常不适用this关键字。不过，this可以用来判断当前是否都是严格模式。
 * var strict = (fuction(){return !this}())
 * 
 * 8.2.2方法调用
 * 
 * 一个方法无非是个保存在一个对象的属性里的js函数。如果有一个函数f和一个对象o，则可以用下面的代码给
 * o定义一个名为m()的方法：
 * o.m = f;
 * 给对象o定义了方法m()，调用它时就像这样:
 * o.m()
 * 或者，如果m()需要在两个参数，调用起来则像这样：
 * o.m(x, y)
 * 上面的代码是一个调用表达式：它包括一个函数表达式o.m，以及两个实参表达式x和y，函数表达式本身就是
 * 一个属性访问表达式，这意味这该函数被当做一个方法。而不是作为一个普通函数来调用。
 * 
 * 对方法调用的参数和返回值的处理，和上面所描述的普通函数调用完全一致。但是，方法调用和函数调用有一个
 * 重要的区别，即：调用上下文。属性访问表达式由两部分组成：一个对象（本例中的o）和属性名称（m）。这
 * 像这样的方法调用表达式里，对象o成为调用上下文，海曙提可以使用关键字this引用该对象。
 * var calculator = {
 *    operand1:1,
 *    operand2:1,
 *    add:function(){
 *      this.result = this.operand1 + this.operand2;
 *    }
 * }
 * 
 * calculator.add()
 * calculator.result
 * 
 * 大多数方法调用使用点符号来访问属性，使用方括号（的属性访问表达式）也可以进行属性访问操作。
 * o['m'](x, y)
 * a[0](z)
 * 
 * 方法调用可能包括更复杂的属性访问表达式
 * customer.surname.toUpperCase()
 * f().m()
 * 
 * 方法和this关键字是面向对象编程的范例的核心。任何函数只要作为方法调用实际上都会传入一个隐式的实参--
 * 这个实参是一个对象，方法调用的母体就是这个对象。通常来讲，基于那个对象的方法可以执行多种操作，
 * 方法调用的语法已经很清晰地表明了函数将基于一个对象进行操作，比较下面两行代码
 * rect.setSize(width, height)
 * setRectSize(rect, width, height)
 * 
 * 我们假设这两行代码的功能完全一样，他们都作用于一个假定的对象rect。可以看出，第一行的方法调用语法
 * 非常清晰地表明这个函数执行的载体是rect对象，函数中的所有操作都将基于这个对象。
 * 
 * 需要注意的是，this是一个关键字，不是变量也不是属性名。js的语法不允许给this赋值。
 * 和变量不同，关键字this没有作用于的限制，嵌套的函数不会从调用它的函数中继承this。如果嵌套函数作为
 * 方法调用，其this的值指向调用它的对象。如果嵌套函数作为函数调用，其this值不是全局对象（非严格模式下）
 * 就是undefined(严格模式下)。很多人误以为调用嵌套函数时this会指向调用外层函数的上下文。如果你想访问
 * 这个挖我不函数的this值，需要将this的值保存在一个变量里，这个变量和内部函数都同在一个作用于中。通常使用
 * 变量self来保存this，比如：
 * var o = {
 *    m:function(){
 *      var self = this;
 *      console.log(this === o)
 *      f();
 * 
 *      function f(){
 *        console.log(this === o)
 *        console.log(self === o)
 *      }
 *    }
 * }
 * 
 * o.m()
 * 
 * 8.2.3构造函数调用
 * 
 * 如果函数或者方法调用钱带有关键字new,它就是构造函数调用。构造函数调用和普通的函数调用以及方法调用
 * 在实参处理、调用上下文和返回值方面都有不同。
 * 
 * 如果构造函数调用在圆括号内包含一组实参列表，先计算这些实参表达式，然后传入函数内，这和函数调用和方法
 * 调用时一致的。但如果构造函数没有形参，js构造函数调用的语句是允许省略猎豹和括号的。范式没有形参的构造函数
 * 调用都可以省略圆括号，
 * 
 * var o = new Object()
 * var o = new Object;
 * 
 * 构造函数调用创建一个新的空对象，这个对象继承自构造函数的prototype属性。构造函数视图初始化这个新
 * 创建的对象，并将这个对象用做其调用上下文，因此构造函数可以使用this关键字来引用这个新创建的对象。
 * 注意，尽管构造函数看起来像一个方法调用，它依然会使用这个新对象作为调用上下文。也就是说，在表达式
 * new o.m()中，调用上下文并不是o
 * 
 * 构造函数通常不适用return 关键字，他们通常初始化新对象，当构造函数的函数体执行完毕是，它会显示返回。
 * 在这种情况下，构造函数调用表达式的计算结构就是这个新对象的值。然而如果构造函数显示地使用return语句
 * 返回一个对象，那么调用表达式的值就是这个对象。如果构造函数使用return语句但没有指定返回值，或者返回
 * 一个原始值，那么这时将忽略返回值，同时使用这个新对象作为调用结果
 * 
 * 8.2.4  间接调用
 * 
 * js中的函数也是对象，和其他js对象没有什么两样，函数对象也可以包含方法。其中的两个方法call()和
 * apply()可以用来间接地调用函数。两个方法都允许显示指定调用所需的this值，也就是说，任何函数可以
 * 作为任何对象的方法来调用，哪怕这个函数不是那个对象的方法。两个方法都可以指定调用的实参。call()方法
 * 使用它自有的实参列表作为函数的实参，apply()方法则要求以数组的形式传入参数
 * 
 * 8.3 函数的实参和形参
 * 
 * js中的函数定义并未指定函数形参的类型，函数调用也未对传入的实参值做任何类型检查。实际上，js函数调用
 * 甚至不检查传入参数的个数。
 * 
 * 8.3.1 可选形参
 * 
 * 当调用函数的时候传入的实参比函数声明时指定的形参个数要少，剩下的参数豆浆设置为undefined值。因此在
 * 调用函数时形参是否可选以及是否可以省略应当保持较好的适应性为了做到这一点，应当给省略的参数赋值一个
 * 合理的默认值，
 * 
 * function getPropertyNames(o, a){
 *    if(a === undefined) a = []
 *    for(var property in o) a.push(property)
 *    return a;
 * }
 * 
 * var a = getPropertyNames(o)
 * getPropertyNames(p, a)
 * 
 * 如果在第一行代码中不适用if语句，可以使用‘||’运算符，这是一种习惯用法
 * a = a || []
 * 
 * 需要注意的是，当用这种可选实参来实现函数时，需要将可选实参放在实参列表的最后。那些调用你的函数的
 * 程序员没办法省略第一个实参并传入第二个实参的，它必须将Undefined作为第一个实参显式传入。同样注意
 * 在函数定义中使用注释来强调形参是可选的
 * 
 * 8.3.2 可变常的实参列表：实参对象
 * 
 * 当调用函数的时候传入的实参个数超过函数定时是的形参个数是，没有办法直接获得未命名值得引用。参数对象
 * 解决了这个问题。在函数体内，标识符arguments是指向实参对象的引用，实参对象是一个类数组对象，这样
 * 可以通过数字下标就能访问传入函数的实参值，而不用非要通过名字来的到实参
 * 
 * 假设定义了函数f，它的实参只有一个x。如果调用这个函数时传入两个实参，第一个实参可以通过 参数名x来
 * 获得，，也可以通过arguments[0]来的达到。第二个实参只能通过arguments[1]来得到。此外，和真正的数组
 * 一样，arguments也包含一个length属性，用以表示其所包含元素的个数。因此，如果调用函数f()时传入两个
 * 参数，arguments.length的值就是2
 * 
 * 实参对象在很多地方都非常有用，js本身不会这么做
 * function f(x, y, z){
 *    if(arguments.length != 3){
 *      throw new Error('function f called with '+ argument.length +'arguemnts, but it expects 3 arugments')
 *    }
 * }
 * 
 * 需要注意的是，通常不必想这样检查实参个数。大多数情况下js的默认行为是可以满足需要的：省略的实参都将
 * 是undefined,多出的参数会自动省略
 * 
 * 实参对象有一个重要的用处，就是让函数可以操作任意数量的实参。下面的函数就可以接受任意数量的是实参，
 * 并返回传入实参的最大值。
 * 
 * function max(){
 *    var max = Number.NEGATIVE_INFINITY
 *    for(var i = 0; i < arguments.length; i++){
 *      if(arguments[i] > max) max = arguments[i]
 *    }
 *    return max;
 * }
 * 
 * var largest = max(1, 10, 100, 2, 3, 1000 , 5, 4, 10000, 6)
 * 
 * 注意，不定实参函数的实参个数不能为零，arguments[]对象最适合的应用场景是在这样一类函数中，这类函数
 * 包含固定个数的命名和必需参数，以及随后各树不定的可选实参
 * 
 * 记住，arguments并不是真正的数组，他是一个实参对象。每个实参对象都包含以数字为索引的一组元素以及length
 * 属性，但他毕竟不是真正的数组。可以这样理解，它是一个对象，只是碰巧具有以数字为索引的属性。
 * 
 * 实参对象：arguments
 * 
 * 数组对象包含一个非同寻常的特性。在非严格模式下，当一个函数包含若干形参，实参对象的数组元素是形参
 * 所对应实参的别名，实参对象中以数字索引，并且形参名称可以认为是相同变量的不同命名。通过实参名字来修改
 * 实参值得花，通过arguments[]数组也可以获取到更改后的值，
 * 
 * function f(x){
 *    console.log(x)        //输出实参的初始值
 *    arguments[0] = null   //修改实参数组的元素同样会修改x的值
 *    console.log(x)        //输出 'null'
 * }
 * 实参对象：arguments
 * （即  通过修改 arguments 类数组  可以修改 方法参数的值）
 * 
 * 如果实参对象是一个普遍数组的话，第二条console.log(x)语句的结果绝对不会是null，在这个例子中，
 * arguments[0]和x指代同一个值，修改其中一个的值会影响到另一个。
 * 
 * 在ECMAScript5中移除了实参对象的这个特殊特性。在严格模式下还有一点（和非严格模式下相比）不同，在非
 * 严格模式中，函数里的arguments仅仅是一个标识符，在严格模式中，它变成了一个保留字。严格模式中的函数
 * 无法使用arguments作为形参名或局部变量名，也不能给arguments赋值
 * 
 * callee和caller属性
 * 
 * 除了数组元素，实参对象还定义了callee和caller属性。在ECMAScript5严格模式中，对这两个属性的读写操作
 * 都会产生一个类型错误。而在非严格模式下，ECMAScript标准规范规定callee属性指代当前正在执行的函数。
 * caller是非标准的，但大多数浏览器都实现了这个属性，它指代调用当前正在执行的函数的函数。通过caller属性
 * 可以访问调用栈。callee属性在某些时候回非常有用，比如在匿名函数中通过callee来递归地调用自身
 * 
 * var factorial = function(x){
 *    if(x <= 1) return 1;
 *    return x * arguments.callee(x -1)
 * }
 * 
 * ECMAScript 5 严格模式两者都报错
 * callee 指代当前正在执行的函数
 * caller 指代当前执行函数的函数 （非标准）
 * 
 * 8.3.3 将对象属性用作实参
 * 
 * 当一个函数包含超过3个形参时，对于程序员来说，要记住调用函数中实参的正确顺序是在让人头疼。每次调用这个
 * 函数时都要不厌其烦地查阅文档，为了不让程序员每次都翻阅手册这么麻烦，最好通过名/值对的形式来传入参数，
 * 这样参数的顺序就无关要紧了。为了实现这种风格的方法调用，定岗以函数的时候，传入的实参都写入一个单独的对象
 * 之中，在调用的时候传入一个对象，对象中的名/值对是真正需要的实参数据。下面的代码就展示了这种风格的函数
 * 调用，这种写法允许在函数中设置省略参数的默认值
 * 
 * function easyCopy(args){
 *    arrayCopy(
 *      args.from, 
 *      args.from_start || 0,
 *      args.to,
 *      args.to_start || 0,
 *      args.length
 *    )
 * }
 * 
 * var a = [1, 2, 3, 4], b = []
 * easyCopy({from:a, to:b, length:4})
 * 
 * 8.3.4 实参类型
 * 
 * js方法的形参并未声明类型，在形参传入函数体之前也未做任何类型检查。可以采用语义化的单词来给函数实参命名
 * 或者想刚才的实例代码中的arrayCopy()方法一样给实参补充注释，一次使代码自文档化，对于可选的实参来说，
 * 可以在注释中补充一下“这个实参是可选的”。当一个方法可以接受任意数量的实参时，可以使用省略号：
 * 
 * /function max(/*number... /)/
 * 
 * 3.8节已经提到，js在必要的时候回进行类型转换。因此如果函数期望接受一个字符串实参，而调用函数时传入其他
 * 类型的值，所传入的值会在函数体内将其用做字符串的地方转换为字符串类型。所有的原始类型都可以转换为字符串
 * 所有的对象都包含toString()方法，所以这种场景下是不会有任何错误的。
 * 
 * 然而事情不总是这样的，回头看一下刚才提到的arrayCopy()方法。这个方法期望它的第一实参是一个数组。当传入
 * 一个 非数组的值作为第一个实参时，尽管看起来没有问题，实际上会出错。触发所写的函数时只用到一两次的‘用
 * 完即丢’函数，你应当添加类似的实参类型检查逻辑，因为宁愿程序在传入非法值时报错，也不愿非法制导致程序在执行
 * 时报错，相比而言，逻辑执行是的报错消息不堪清晰且更难处理。
 * 
 * function sum(a){
 *    if(isArrayLike(a)){
 *      var total = 0;
 *      for(var i = 0; i < a.length; i++){
 *        var element = a[i]
 *        if(element == null) continue;
 *        if(isFinite(element)) total += element;
 *        else throw new Error('sum(): elements must be finite numbers')
 *      }
 *      return total;
 *    }
 *    else throw new Error('sum(): arggument must be array-like')
 * }
 * 
 * js是一种非常灵活的弱类型语言，有时适合编写实参类型和实参个数的不确定性的函数。接下来flexisum()方法
 * 就是这样。比如，他可以接受任意数量的实参，并可以递归地处理实参是数组的情况，这样的话，它就可以用作不定
 * 参数函数或者实参是数组的函数。此外，这个方法尽可能的在抛出异常之前将非数组转换为数字
 * 
 * function flexisum(a){
 *    var total = 0
 *    for(var i = 0; i < arguments.length; i++){
 *      var element = arguments[i], n;
 *      if(element == null) continue;
 *      if(isArray(element))
 *        n = flexisum.apply(this, element)
 *      else if(typeof element === 'function')
 *        n = Number(element())
 *      else
 *        n = Number(element)
 *      if(isNaN(n))
 *        throw Error('flexisum(): cant convert ' + element + 'to number');
 *      total += n;
 *    }
 *    return total;
 * }
 * 
 * 
 * 8.4 作为值得函数
 * 
 * 函数可以定义，也可以调用，这是函数最重要的特性。函数定义和调用时js的词法特性，对于其他大多数变成语言
 * 来说亦是如此。然而js中，函数不仅是一种语法，也是值，也就是说，可以将函数赋值给变量，存储在对象的属性
 * 或数组的元素中，作为参数传入另外一个函数等。
 * 
 * 为了便于理解js中的函数是如何用作数据的以及js语法
 * function square(x){return x*x}
 * 
 * 这个定义创建一个新的函数对象，并将其赋值给变量square.函数的名称实际上是看不见的，它（square）仅仅是
 * 变量的名字，这个变量指代函数对象。函数还可以赋值给其他的变量，并且仍可以正常工作：
 * 
 * var s = square;
 * square(4)
 * s(4)
 * 
 * 除了可以将函数赋值给变量，同样可以将函数赋值给对象的属性。当函数作为对象的属性调用时，函数就称为方法：
 * var o = {square:function(x){return x*x}}
 * var y = o.square(16)
 * 
 * 函数甚至不需要带名字，当把他们赋值给数组元素时：
 * var a = [function(x){return x*x}, 20]
 * a[0](a[1])
 * 
 * 
 * 函数用作值时的一些例子
 * 
 * function add(x, y){return x + y}
 * function subtract(x, y){return x - y}
 * function multiply(x, y){return x * y}
 * function divide(x, y){return x / y}
 * 
 * function operate(operator, operand1, operand2){
 *    return operator(operand1, operand2)
 * }
 * 
 * var i = operate(add, operate(add, 2, 3), operate(multiply, 4, 5))
 * 
 * var operators = {
 *    add:function(x, y){return x + y},
 *    subtract:function(x, y){return x - y},
 *    multiply:function(x, y){return x * y},
 *    divide:function(x, y){return x / y},
 *    pow:Math.pow
 * }
 * 
 * 自定义函数属性
 * 
 * js中的函数并不是原始值，而是一种特殊的对象，也就是说，函数可以拥有属性。当函数需要一个‘静态’变量来调用
 * 时保持某个值不变，最简便的方式就是给函数定义属性，而不是定义全局变量，显然第一全局变量会让命名空间
 * 变得更加杂乱无章。比如，假设你想写一个返回一个唯一整数的函数，不管在哪里调用函数都会返回这个整数。
 * 而函数不能两次返回同一个值，为了做到这一点，函数必须能够跟踪他每次返回的值，而且这些值得欣喜需要在
 * 不同的函数调用过程中持久化。可以将这些信息存放到全局变量中，但这并不是必须的，因为这个信息仅仅是函数
 * 本身用到的。做好将这个信息保存到函数对象的一个属性中，
 * 
 * uniqueInteger.counter = 0
 * function uniqueInteger(){
 *    return uniqueInteger.counter++;
 * }
 * 
 * function factorial(n){
 *    if(isFinite(n) && n > 0 && n == Math.round(n)){
 *      if(!(n in factorial)){
 *        factorial[n] = n * factorial(n - 1)
 *      }
 *      return factorial[n]
 *    }else{
 *       return NaN;
 *    }
 * }
 * 
 * factorial[1] = 1
 * 
 * 8.5 作为命名空间的函数
 * 
 * 之前介绍了js中的函数作用域的概念：在函数中声明的遍历在整个函数体都是可见的（包括在嵌套的函数中），
 * 在函数的外部是不可见的。不再任何函数内声明的遍历是全局变量，在整个js程序中都是课件的。在js中是无法
 * 声明只在一个代码块内可见的变量的，基于这个原因，我们常常简单地定义一个函数用作临时的命名空间，在这个
 * 命名空间，这个命名空间内定义的函数都不会污染到全局命名空间
 * 
 * 比如，假设你写了一段js模块代码，这段代码将要用在不同的js程序中（对于客户端js来讲通常是用在各种各样的
 * 网页中）。和大多数代码一样，假定这段代码定义了一个用以存储中间计算结果的变量。这样问题就来了，当模块
 * 代码放在不同的程序中运行时，你无法得知这个变量是否已经创建了，如果已经存在这个变量那么将会和代码发生
 * 冲突。解决办法当然是将代码放入一个函数内，然后调用这个函数。这样全局变量就变成了函数内部的局部变量
 * 
 * function mymodule(){
 *  ...
 * }
 * 
 * mymodule()
 * 
 * 这段代码仅仅定义了一个单独的全局变量：名叫‘mymodule’函数，这样还太麻烦，可以直接定义一个匿名函数，并在
 * 单个表达式中调用它
 * 
 * (function(){
 *    //模块代码
 * }())
 * 
 * 这种定义匿名函数并立即在单个表达式中调用它的写法非常常见，已经成为一种惯用法了。注意上面代码的圆括号
 * 的用法，function之前的左括号是必须的，因为如果不写这个左括号，js解释器会视图将关键字function解释为
 * 函数声明语句。使用圆括号js解释器才会正确地将其解析为函数定义表达式。使用圆括号是习惯用法，尽管有些时候
 * 没有必要也不应当省略。这里定义的函数会立即调用.
 * 
 * var a = [3, 5, 2, 4]
 * for (var i of a){console.log(i)}  //结果 3, 5, 2, 4 of 中声明的变量i 为  每一项的值
 * 
 * for (var i in a){console.log(i)}  //结果 0, 1, 2 ,3 in 中声明的遍历i 为  数组的索引
 * 
 * var a = {aaa: 123}
 * for (var i of a){console.log(i)}  //结果 TypeError a is not iterable
 * 
 * for (var i in a){console.log(i)}  //结果 'aaa'  in 遍历对象的key
 * 
 * for in 对于对象和数组来说，作用类似，数组的索引可以看做是 对象的key ，所以产生类似的结果
 * for of 只能对能遍历的数据类型 进行处理
 * 
 */
/* 
  var extend = (function(){
    for(var p in {toString:null}){
      return function extend(o){
        for(var i = 1; i < arguments.length; i++){
          var source = arguments[i]
          for(var prop in source) o[prop] = source[prop]
        }
        return o;
      }
    }

    //这个列表列出了需要检查的特殊属性
    var protoprops = ['toString', 'valueOf', 'constructor', 'hasOwnProperty',
                      'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString']

    return function patched_extend(o){
      for(var i = 1; i < arguments.length; i++){
        var source = arguments[i]
        for(var prop in source) o[prop] = source[prop];

        for(var j = 0; j < protoprops.length; j++){
          prop = protoprops[j]
          if(source.hasOwnProperty(prop)) o[prop] = source[prop]
        }
      }
      return o;
    }
  }())
*/


/**
 * 8.6 闭包
 * 
 * 和其他大多数现代编程语言一样，js也采用词法作用于（lexical scoping）,也就是说，函数的执行依赖于变量
 * 作用域，这个作用于是在函数定义时决定的，而不是函数调用时决定的。为了实现这种词法作用于，js对象的内部
 * 专题不仅包含函数的代码逻辑，还必须应用当前的作用于链。函数对象可以通过作用域链相互关联起来，函数体
 * 内部的变量都可以保存在函数作用域内，这种特性在计算机科学文献中称为‘闭包’。
 * 
 * 从技术的角度讲，所有的js函数都是闭包：他们都是对象，他们都关联到作用域链。定义大多数函数时的作用于链
 * 在调用函数时依然有效，但这并不影响闭包。当调用函数时闭包所指向的所有与链和定义函数时的作用于链时，
 * 事情就变得非常微妙。当一个函数嵌套了另一个函数，外部函数将嵌套的函数对象作为返回值返回的时候往往
 * 会发生这种事情。有很多强大的编程技术都利用到了这类嵌套的函数闭包，以至于这种编程模式在js中非常常见
 * 当你第一次碰到闭包是可能会觉得非常让人费解，一旦你理解了闭包之后，就能非常自如地使用他来，了解这一点
 * 至关重要。
 * 
 * 理解闭包首先要了解嵌套函数的词法作用于规则。看一下这段代码
 * 
 * var scope = "global scope"
 * function checkscope(){
 *    var scope = "local scope"
 *    function f(){return scope;}
 *    return f()
 * }
 * checkscope()
 * 
 * checkscope()函数声明了一个局部变量，并定义了一个函数f()，函数f()返回了这个变量的值，最后将函数
 * f()的执行结果返回。你应当非常清楚为什么调用checkscope()会返回‘local scope’。闲杂我们对这段代码
 * 做一点改动。你知道这段代码返回什么吗？
 * 
 * var scope = 'global scope'
 * function checkscope(){
 *    var scope = 'local scope'
 *    function f(){return scope}
 *    return f;
 * }
 * 
 * checkscope()()
 * 
 * 在这段代码中，我们将函数内的一对圆括号移动到了checkscope()之后。checkscope()现在仅仅返回函数内嵌套的
 * 一个函数对象，而不是直接返回结果。在定义函数的作用域外面，调用这个嵌套的函数
 * 
 * js函数的执行用到了作用域链，这个作用域链是函数定义的时候创建的。嵌套的函数f()定义在这个作用域链里，
 * 其中的变量scope一定是局部变量，不管在何时何地执行函数f()，这种丙丁的执行f()是依然有效。因此最后一行
 * 代码返回'local scope', 而不是‘global scope’。简言值，闭包的这个特性抢单到令人吃惊，他们可以捕捉
 * 到局部变量（和参数），并一直保存下来，看起来像这些变量绑定到了再其中 定义他们的外部变量
 * 
 * 实现闭包
 * 
 * 如果你理解词法作用于的规则，那就能很容易地理解闭包：函数定义时的作用域链到函数执行时依然有效。
 * 然而很多程序员觉得闭包非常难理解，因为他们在深入学习闭包的实现细节时将自己搞得晕头转向。他们觉得在
 * 外部函数中定义的局部变量在函数返回有就不存在了，那么嵌套的函数如何能调用不存在的作用域链呢？如果
 * 你想搞清楚这个问题，你需要更深入地了解类似c语言这种更底层的编程语言，并了解基于栈的CPU架构：如果
 * 一个函数的局部变量定义在CPU的栈中，那么当函数返回时他们的确就不存在了
 * 
 * 但回想在3.10.3节中是如何定义作用域链的。我们将作用域链描述为一个对象列表，不是绑定的栈。每次调用
 * js函数的时候，都会为之创建一个新的对象用来保存局部变量，把这个对象添加至作用域链中。当函数返回的
 * 时候，就从作用域链中将这个绑定变量的对象删除。如果不存在嵌套的函数，也没有其他引用指向这个绑定的
 * 对象，它就会被当做垃圾回收掉。如果定义了嵌套的函数，每个嵌套的函数都各自对应一个作用于链，并且这个
 * 作用于链指向一个变量绑定对象。但如果这些嵌套的函数对象在外部函数中保存下来，那么他们也会和所指向的
 * 变量绑定对象一样当做垃圾回收。但是如果这个函数 定义了嵌套的函数，并将它作为返回值返回或者存储在某
 * 处的属性里，这是就会有一个外部引用指向这个嵌套的函数。它就不会被当做垃圾回收，并且它所指向的变量
 * 绑定对象也不会被当做垃圾回收。
 * 
 * uniqueInteger() 这个函数，这个函数使用自身的一个属性来保存每次返回的值，一遍每次调用都能跟踪上次
 * 的返回值。但这种做法有一个问题，就是恶意代码可能将计数器重置或者把一个非整数赋值给他，导致uniqueInteger()
 * 函数不一定能产生“唯一”的整数。而闭包可以捕捉到单个函数调用你的局部变量，并将这些局部变量用作私有
 * 专题。我们可以利用闭包这样来重写uniqueInteger()函数
 * 
 * var uniqueInteger = (function(){
 *    var counter = 0;
 *    return function(){return counter++;}
 * }())
 * 
 * 第一行代码看起来像将函数赋值给一个变量uniqueInteger 实际上，这段代码定义了一个立即调用函数，
 * 因此是这个函数的返回值赋值给变量UniqueInteger。现在，我们来看函数体，这个函数返回另外一个函数，
 * 这是一个嵌套的函数，我们将它赋值给变量uniqueInteger，嵌套的函数时可以访问作用域内的遍量的，而且
 * 可以访问外部函数中定义的counter变量，当外部函数返回之后，其他任何代码都无法访问counter变量，只有
 * 内部的函数才能访问到它。
 * 
 * 像counter一样的私有变量不是只能用在一个单独的闭包内，在同一个外部函数内定义的多个嵌套函数也可以访问它
 * 这多个嵌套函数都共享一个作用于链，
 * 
 * function counter(){
 *    var n = 0;
 *    return {
 *      count:function(){return n++},
 *      reset:function(){n = 0}
 *    }
 * }
 * 
 * var c = counter(),
 *     d = counter()
 * c.count()
 * d.count()
 * c.reset()
 * c.count()
 * d.count()
 * 
 * counter()函数返回了一个“计数器”对象，这个对象包含两个方法：count()返回下一个整数，reset()将计数器
 * 重置为内部状态。收钱要理解，这个方法都可以访问私有变量n。在这，每次调用counter()都会创建一个新的
 * 作用于链和一个新的私有变量。因此，如果调用counter()两次，则会得到两个计数器对象，而且彼此包含不同的
 * 私有变量，调用其中一个计数器对象的count()或reset()不会影响到另外一个对象
 * 
 * 从技术角度看，其实可以将这个闭包合并为属性存取器方法getter和setter。下面这段代码所展示的counter()
 * 函数的版本是6.6节中代码的变种，所不同的是，这里私有状态的实现是利用了闭包，而不是利用普通的对象属性
 * 来实现：
 * function counter(n){
 *    return {
 *      get count(){return n++},
 *      set count(m){
 *        if(m >= n) n = m;
 *        else throw Error('count can only be set to a larger value')
 *      }
 *    }
 * }
 * 
 * var c = counter(1000)
 * c.count
 * c.count
 * c.count = 2000
 * c.count
 * c.count = 2000
 * 
 * 需要注意的是，这个版本的counter()函数并未声明局部变量，而是只使用参数n来保存私有状态，属性存取器
 * 方法可以访问n。这样的话，调用counter()的函数就可以指定私有变量的初始值了。
 * 
 * 8-4 这种使用闭包技术来共享的私有状态的通用做法。这个例子定义了addPrivateProperty()函数，这个函数
 * 定义了一个私有变量，以及两个嵌套的函数用来获取和设置这个私有变量的值。它将这些嵌套函数添加为所指定
 * 对象的方法
 * 
 * 利用闭包实现的私有属性存取器方法
 * 
 * function addPrivateProperty(o, name, predicate){
 *    var value;
 * 
 *    o['get' + name] = function(){return value};
 * 
 *    o['set' + name] = function(v){
 *      if(predicate && !predicate(v))
 *        throw Error('set' + name + ': invalid value' + v)
 *      else
 *        value = v;
 *    }
 * }
 * 
 * var o = {}
 * 
 * addPrivateProperty(o, 'name', function(x){return typeof x === 'string'})
 * 
 * o.setName('Frank')
 * console.log(o.getName())
 * o.setName(0)
 * 
 * 
 * 我们以及给出了很多例子，在同一个作用于链中定义两个闭包，这两个闭包共享同一的私有变量或变量。这是
 * 一种 非常重要的技术，但还是要特别小心那些不希望共享的遍历忘完不经意间共享给了其他的表
 * 
 * function constfunc(v){return function(){return v}}
 * 
 * var funcs = []
 * 
 * for(var i = 0; i < 10; i++) funcs[i] = constfunc(i)
 * 
 * funcs[5]()
 * 
 * 这段代码利用循环创建了很多个闭包，当写类似这种代码的时候往往会犯一个错误；那就是将循环代码
 * 移入定义这个闭包的函数之内，
 * 
 * function constfuncs(){
 *    var funcs = []
 *    for(var i = 0; i < 10; i++){
 *      funcs[i] = function(){return i}
 *    }
 *    return funcs;
 * }
 * 
 * var funcs = constfuncs()
 * funcs[5]()
 * 
 * 上面这段代码创建了10个闭包，并将他们存储到一个数组中。这些闭包都是在同一个函数调用中定义的，
 * 因此他们可以共享变量i。当constfuncs()返回是，变量i的值时10，所有的闭包都共享这一个值，因此，
 * 数组中的函数的返回值都是同一个值，这不是我们想要的结果。关联到闭包的作用域链都是‘活动的’，记住
 * 这一点非常重要。嵌套的函数不会将作用域内的私有成员复制一份，也不会对所绑定的遍历生成静态快照
 * 
 * 需要注意的一件事情，this是js关键字，而不是变量。正如前面讨论，每个函数调用都是包含一个this值，
 * 如果闭包在外部函数里是无法访问this，触发挖补函数将this转存为一个变量：
 * var self =  this
 * 
 * 绑定arguments的问题与之类似。arguments并不是一个关键字，但在调用每个函数时都会自动声明它，由于
 * 闭包具有自己所绑定的arguments，因此闭包内无法直接访问外部函数的参数数组，触发外部函数将参数数组保存到
 * 另一个 变量中
 * var outerArguments = arguments
 * 
 * 8.7函数属性、方法和构造函数
 * 
 * 我们看到在js程序中，函数是值。对函数执行typeof运算会返回字符串'function'，但是函数时js中特殊的对象。
 * 因为函数也是对象，他们也可以拥有属性和方法，就像普通的对象可以拥有属性和方法一样，甚至可以用function()
 * 构造函数来常见新的函数对象。接下来几节就会着重介绍属性和方法以及Function()构造函数
 * 
 * 8.7.1 length属性
 * 在函数体里，arguments.length表示传入函数的实参的个数而函数本身的length属性则有这不同的含义。函数的length
 * 属性是只读属性，代表函数实参的数量，这里的参数指的是‘形参’而非‘实参’，也就是在函数定义时给出的实参个数
 * 通常也是在函数调用时期望传入的实参个数。
 * 下面的代码定义了一个名叫check()的函数，从另外一个函数给他传入arguments数组，它比较argument。lengthhe 
 * argument.callee.length(期望传入的实参个数)来判断所传入的实参个数是否正确。如果个数不正确，则抛出异常
 * check()函数之后定义一个测试函数f()，用来展示check()的用法：
 * function check(args){
 *    var actual = args.length;
 *    var expected = args.callee.length
 *    if(actual !== expected)
 *        throw Error('Expected ' + expected + 'args; got' + actual)
 * }
 * 
 * 8.7.2 prototpye 属性
 * 
 * 每个函数都包含一个prototype属性，这个属性是指向一个对象的引用，这个对象称作‘原型对象’（prototype object）
 * 每一个函数都包含不同的原型对象。当将函数用作构造函数的时候，新创建的对象会从原型对象上继承属性
 * 
 * 8.7.3 call和apply
 * 我们可以将call()和apply()看做是某个对象的方法，通过调用方法的形式来间接调用函数。call()和apply()的第一个实参是
 * 要调用函数的母对象，它是调用上下文，在函数体内通过this来获得对它的引用。要想以对象o的方法来调用函数f(),可以这样
 * 使用call()和apply()
 * f.call(o)
 * f.apply(o)
 * 每行代码和下面代码的功能类似
 * 
 * o.m = f
 * o.m()
 * delete o.m
 * 
 * 在ECMAScript5的严格模式中，call()和apply()的第一个实参都会变为this的值，哪怕传入的实参是原始值甚至是null或
 * undefined。在ECMAScript3和非严格模式中，传入的Null和undefined都会被全局对象代替。
 * 对于call()来说，第一个调用上下文实参之后的所有实参就是要传入待调用的值。比如一对小o的方法的形式调用函数f(),
 * 并传入两个参数，可以使用这一的代码f.call(o, 1, 2)
 * apply()方法和call()类似，但传入实参的形式和call()有所不同，它的实参都放入一个数组当中：
 * a.apply(o, [1, 2])
 * 如果一个函数的实参可以是任意数量，给apply()传入的参数数组可以是任意长度的。比如，为了找出数组中的最大的数值，调用
 * Math.max()方法的时候可以给apply()传入一个包含任意个元素的数组
 * var biggest = Math.max.apply(Math, array_of_numbers)
 * 
 * 需要注意的是，传入apply()的参数数组可以是类数组对象也可以是真实数组。实际上，可以将当前函数的arguemnts数组传入
 * apply()来调用用另一个函数
 * 
 * function trace(o, m){
 *    var original = o[m]
 *    o[m] = function(){
 *      console.log(new Date(), 'Entering:', m)
 *      var result = original.apply(this, arguments)
 *      console.log(new Date(), 'Exiting:', m)
 *      return result;
 *    }
 * }
 * 
 * 8.7.4 bind()方法
 * bind() 是在ECMAScript5中新增的方法，但在ECMAScript3中科院轻易模拟bind()。从名字就可以看出，这个方法的
 * 主要作用就是将函数绑定至某个对象。当在函数f()上调用bind()方便并传入一个对象o作为参数，这个方法将返回一个
 * 新的函数。（以函数调用的方式）调用新的函数将会把原始的函数f()当做o的方法来调用。传入新函数的任何实参都将传入
 * 原始函数
 * 
 * function f(y){return this.x + y}
 * var o = {x:1}
 * var g = f.bind(o)
 * g(2)     // -> 3
 * 
 * 可以通过如下代码轻易地实现这种绑定：
 * function bind(f, o){
 *    if(f.bind) return f.bind(o)
 *    else return function(){
 *      f.apply(o, arguments)
 *    }
 * }
 * 
 * ECMAScript 5中的bind()方法不仅仅是将函数绑定至一个对象，他换附带一些其他的应用：除了第一个实参之外，传入bind
 * 的实参也会绑定至this,这个附带的应用是一种常见的函数式编程技术，有时也被称为‘柯里化’(currying)
 * 
 * var sum = function(x, y){return x + y}
 * var succ = sum.bind(null, 1)
 * succ(2)
 * 
 * function f(y, z){return this.x + y + z}
 * var g = f.bind({x:1}, 2)
 * g(3)
 * 
 * if(!Function.prototype.bind){
 *    Function.prototype.bind = function(o){
 *      var self = this, boundArgs = arguments
 *      return function(){
 *        var args = [], i;
 *        for(i = 1; i < boundArgs.length; i++) args.push(boundArgs[i])
 *        for(i = 0; i < arguments.length; i++) args.push(arguments[i])
 *        return self.apply(o, args)
 *      }
 *    }
 * }
 * 
 * 我们注意到，bind()方法返回的函数时一个闭包，在这个闭包的外部函数中声明了self和boundArgs变量，这两个变量在
 * 闭包里用到。尽管定义闭包的内部函数已经从外部函数中返回，而且调用这个闭包逻辑的时刻要在外部函数返回之后（在
 * 闭包中照样可以正确访问这两个变量）
 * 
 * ECMAScript5定义的bind()方法也有一些特性是上述ECMAScript3代码无法模拟的。首先真正的bind()方法返回一个函数对象
 * 这个函数对象的length属性是绑定函数的形参个数减去绑定实参的个数（length的值不能小于零）,再者，ECMAScript5的
 * bind()放都可以顺带用作构造函数。如果bind()返回的函数用作构造函数，将忽略传入bind()的this，原始函数就会以构造函数
 * 的形式调用，其实参数也已经绑定。由bind()方法所返回的函数并不包含prototype属性（普通函数固有的prorotype）属性
 * 是不能删除的，并且将这些绑定的函数用作构造函数时所创建的对象从原始的未绑定的构造函数中继承prototype.同样，
 * 在使用instanceof运算符时绑定构造函数和为绑定构造函数并无两样
 * 
 * 8.7.5 toString()方法
 * 和所有的js 对象一样，函数也有toString()方法，ECMAScript规范规定这个方法返回一个字符串，这个字符串和函数
 * 声明语句的语法相关。实际上，大多数（非全部）的toString()方法实现都返回函数的完整源码。内置函数往往返回一个
 * 类似‘[native code]’的字符串作为函数体。
 * 
 * 8.7.6 Function()构造函数
 * 不管是通过函数定义语句函数函数直接量表达式，函数的定义都要使用function关键字。但函数还可以通过Function()构造函数来
 * 定义，比如：
 * var f = new Function('x', 'y', 'return x * y')
 * 这一行代码创建一个新的函数，这个函数和通过下面代码定义的函数几乎等价：
 * var f = function(x, y){return x*y}
 * 
 * Function()构造函数可以传入任意数量的字符串实参，最后一个实参所表示的文本就是函数体；它可以包含任意的js语句，每两条语句之间用
 * 分号分隔。传入构造函数的其他所有的实参字符串是指定函数的形参名字的字符串。如果定义的函数不包含任何参数，只须给构造函数简单
 * 地传入一个字符串---函数体---即可
 * 
 * 注意,Function()构造函数并不需要通过传入实参以指定函数名。就像函数直接量一样，Function()构造函数创建一个匿名函数。
 * 
 * 关于Function()构造函数有几点需要特别注意：
 * 。Function()构造函数允许js在运行时动态地创建并编译函数
 * 。每次调用Function()构造函数都会解析函数体，并创建新的函数对象。如果是在一个循环或者多个调用的函数中执行这个构造函数，执行效率会受影响
 * 相比之下，循环中的嵌套函数和函数定义表达式则不会每次执行时都重新编译
 * 。最后一点，也是关于Function()构造函数非常重要的一点，就是他所创建的函数并不是使用词法作用域，相反，函数体代码的编译总是会在顶层
 * 函数执行(也就是全局作用域执行)
 * 
 * var scope = 'global'
 * function constructFunction(){
 *    var scope = 'local'
 *    return new Function('return scope');    //无法捕获局部作用域
 * }
 * 
 * //这一行代码返回global，因为通过Function()构造函数 所以返回的函数使用的不是局部作用域
 * constructFunction()()    //global
 * 
 * 我们可以将Function()构造函数认为是在全局作用域中执行的eval(),eval()可以在自己的私有作用域内定义新变量和函数，Function()构造函数
 * 在时间编程中很少用到。
 * 
 * 8.7.7 可调用的对象
 * 
 * 我们在7.11节中提到的“类数组对象”并不是真正的数组，但大部分常见下可以将其当做数组来对待。对于函数也存在类似的情况。“可调用的对象”
 * （callable object）是一个对象，可以在函数调用表达式中调用这个对象。所有的函数都是可调用的，但并非所有的可调用的对象都是函数
 * 
 * 截止目前，可调用对象在两个js实现中不能算作函数。首先，IE web浏览器（IE8及之前的版本）实现了客户端方法（诸如window.alert()和
 * Document.getElementsById()）,使用了可调用的宿主对象，而不是内置函数对象。IE中的这些方法在其他浏览器函数中也都存在，但他们本质上
 * 并不是Function对象。IE9将他们实现为真正的函数，一次这类可调用的对象将越来越罕见。
 * 
 * 另外一个常见的可调用对象是RegExp对象（在众多浏览器中均有实现）,可以直接调用RegExp对象，这个比调用它的exec()方法更加快捷一些。
 * 在js中这是一个彻头彻尾的非标准特性，最开始是由Netscape提出，后被其他浏览器厂商复制，仅仅是为了和Netscape兼容。代码最好不要对
 * 可调用哦的RegExp对象有太多依赖，这个特性在不就的将来可能会飞起并删除。对RegExp执行typeof运算的结果并不同意，在有些浏览器中返回
 * function,在有些中返回object
 * 
 * 如果项检测一个对象是否是真正的函数对象（并具有函数方法），可以参照6-5中的代码检测它的class属性
 * 
 * function isFunction(x){
 *  return Object.prototype.toString.call(x) === '[object Function]'
 * }
 * 
 * 注意，这里的isFunction()函数和7.10节的isArray()函数及其类似。
 * 
 * 8.8 函数式编程
 * 
 * 和List、Haskell不同，js并非函数式编程语言，但在js中可以向操控对象一样操控函数，也就是说可以在js中应用函数式编程技术。ECMAScript5
 * 中的数组方法（诸如map()和reduce()）就可以非常时刻使用函数式编程风格。
 * 
 * 8.8.1 使用函数处理数组
 * 假设有一个数组，数组元素都是数字，我们想要计算这些元素的平均值和标准差。若使用非函数式编程分隔的话，代码回事这样
 * 
 * var data = [1, 1, 3, 5, 5]   //这里是待处理的数组
 * var total = 0
 * for(var i = 0; i < data.length; i++) total += data[i]
 * var mean = total/data.length;
 * 
 * //计算标准差，首先计算每个数据减去平均数之后偏差的平方然后求和
 * total = 0;
 * for(var i = 0; i < data.length; i++){
 *    var deviation = data[i] - mean;
 *    total += deviation * deviation
 * }
 * var stddev = Math.sqrt(total/(data.length - 1))
 * 
 * 使用数组方法map()和reduce()来实现同样的计算，这种实现机器间接
 * 
 * var sum = function(x,y){return x+y}
 * var square = function(x){return x*x}
 * 
 * var data = [1, 1, 3, 5, 5]
 * var mean = data.reduce(sum) / data.length
 * var deviations = data.map(function(x){return x-mean})
 * var stddev = Math.sqrt(deviations.map(square).reduce(sum)/(data.length-1))
 * 
 * var map = Array.prototype.map
 *     ? function(a, f){return a.map(f)}
 *     : function(a, f){
 *          var result = []
 *          for(var i=0;i<a.length;i++){
 *            if(i in a) result[i] = f.call(null, a[i], i, a)
 *          }
 *          return result;
 *       }
 * 
 * var reduce = Array.prototype.reduce
 *      ? function(a, f, initial){
 *          if(arguments.length > 2)
 *            return a.reduce(f, initial)
 *          else return a.reduce(f)
 *        }
 *      : function(a, f, initial){
 *          var i = 0, len = a.length, accumulator;
 * 
 *          if(arguments.length > 2) accumulator = initial
 *          else{
 *            if(len == 0) throw TypeError();
 *            while(i < len){
 *              if(i in a){
 *                accumulator = a[i++]
 *                break;
 *              }
 *              else i++;
 *            }
 *            if(i == len) throw TypeError();
 *          }
 *  
 *          while(i < len){
 *            if(i in a){
 *              accumulator = f.call(null, accumulator, a[i], i, a)
 *            }
 *          }
 *          return accumulator;
 *        }
 * 
 * 8.8.2 高阶函数
 * 
 * 所谓高阶函数（higher-order function）就是操作函数的函数，它接受一个或多个函数作为参数，并返回一个新
 * 函数，
 * 
 * function not(f){
 *    return function(){
 *      var result = f.apply(this, arguments)
 *      return !result;
 *    }
 * }
 * 
 * var even = function(x){
 *    return x % 2 = 0
 * }
 * 
 * var odd = not(even)
 * [1,1,3,5,5].every(odd)
 * 
 * 
 */

/* 
function not(f){
      return function(){
        var result = f.apply(this, arguments)
        return !result;
      }
   }
   
   var even = function(x){
      return x % 2 === 0
   }
   
  var odd = not(even)
  console.log(odd);
  console.log([1, 1, 3, 5, 5].every(odd)) 
*/
/* 
function mapper(f){
  return function(a){return map(a, f)}
}

var increment = function(x){return x + 1}
var incrementer = mapper(increment)
incrementer([1,2,3])
*/
/* 
function compose(f, g){
  return function(){
    return f.call(this, g.apply(this, arguments))
  }
}

var square = function(x){return x*x}
var sum = function(x, y){return x + y}
var squareofsum = compose(square, sum)
squareofsum(2, 3)
*/

/**
 * 8.8.3 不完全函数
 * 
 * 函数f()的bind()方法返回一个新函数，给新函数传入特定的上下文和一组指定的参数，然后调用函数f()。我们说
 * 它把函数“绑定至”对象并传入一部分参数。bind()方法只是将实参放在（完整实参列表的）左侧，也就是说传入bind()
 * 的实参都是放在传入原始函数的实参列表开始的位置，但有时我们期望将传入bind()的实参放在（完整实参列表的）右侧：
 * 
 * //实现一个工具函数将类数组对象（或对象）转换为真正的数组
 * function array(a, n){retrun Array.prototype.slice.call(a, n || 0)}
 * 
 * //这个函数的实参传递至左侧
 * function partialLeft(f){
 *    var args = arguments;
 *    return function(){
 *      var a = array(args, 1)
 *      a = a.concat(array(arguments))
 *      return f.apply(this, a)
 *    }
 * }
 * 
 * //这个函数的实参传递至右侧
 * function partialRight(f){
 *    var args = arguments;
 *    return function(){
 *      var a = array(arguments)
 *      a = a.concat(array(args, 1))
 *      return f.apply(this, a)
 *    }
 * }
 * 
 * //这个函数的实参被用作模板
 * function partial(f){
 *    var args = arguments;
 *    return function(){
 *      var a = array(args, 1)
 *      var i = 0, j = 0;
 *      for(;i < a.length; i++)
 *        if(a[i] === undefined) a[i] = arguments[j++]
 *      //现在将剩下的内部实参都追加进去
 *      a = a.concat(array(arguments, j))
 *      return f.apply(this, a)
 *    }
 * }
 * 
 * var f = function(x, y, z){return x * (y - z)}
 * partialLeft(f, 2)(3, 4)      // 2 * (3 - 4)
 * partialRight(f, 2)(3, 4)     // 3 * (4 - 2)
 * partial(f, undefined, 2)(3, 4) // 3 * (2 - 4)
 * 
 * 利用这种不完全函数的编程技巧，可以编写一些有意思的代码，利用已有的函数来定义新的函数
 * 
 * var increment = partialLeft(sum, 1)
 * var cuberoot = partialRight(Math.pow, 1/3)
 * String.prototype.first = partial(String,prototype.charAt, 0);
 * String.prototype.last = partial(String.prototype.substr, -1, 1)
 * 
 * 
 */