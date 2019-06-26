/**
 * 对象
 * 
 * 对象是js的基本数据类型。对象是一种复合值：它将很多值（原始值或者其他对象）聚合在一起
 * 可通过名字访问这些值。对象也可看作是属性的无序集合，每个属性都是一个名/值对。属性名
 * 是字符串，因此我们可以把对象看成是从字符串到值的映射。这种基本数据结构还有很多种叫法
 * 有些我们已然非常熟悉，比如‘散列’（hash）、‘散列表’（hashtable）、‘字典’（dictionary）
 * ‘关联数组’(associative array)。然而对象不仅仅是字符串到值得映射，除了可以保持自有
 * 的属性，js对象还可以总一个称为原型的对象继承属性。对象的方法通常是继承的属性。这种
 * 原型式继承（prototypal inheritance）是js的核心特征
 * 
 * js对象是动态的--可以新增属性也可以删除属性--但他们常用来模拟静态对象以及静态类型语言
 * 中的‘结构体’（struct）。有时他们也用做字符串的集合（忽略名值对中的值）。
 * 
 * 除了字符串、数字、true、false、null和undefined之外，js中的值都是对象。js中的值都是
 * 对象。尽管字符串、数字和布尔值不是对象，但他们的行为和不可变对象非常相似。
 * 
 * 3.7节已经降到，对象是可变的，我们通过引用而非值来操作对象。如果变量x是指向一个对象的
 * 引用，那么指向代码var y = x;变量y也是指向同一个对象的引用，而非这个对象的副本。通过
 * 变量y修改这个对象亦会对变量x造成影响。
 * 
 * 对象最常见的用法是创建（create）、设置（set）、查找（query）、删除（delete）、检测
 * （test）和枚举（enumerate）它的属性。我们会在开始的几节讲述这些基础操作。后续的几节
 * 讲述高级主题，其中相当一部分内容来自于ECMAScript5
 * 
 * 属性包括名字和值。属性名可以是包含空字符串在内的任意字符串，但对象中不能存在两个同名
 * 的属性。值可以是任意js值，或者可以是一个getter或setter函数（或两者都有）。6.6节会有
 * 关于getter和setter函数的讲解。除了名字和值之外，每个属性还有一些与之相关的值，称为
 * “属性特性”（property attribute）
 * 。可写（writable attribute），表明是否可以设置该属性的值
 * 。可枚举（enumerable attribute），表明是否可以通过for/in循环返回该属性
 * 。可配置（configurable attribute），表明是否可以删除或修改该属性
 * 
 * 在ECMAScript5之前，通过代码给对象创建的所有属性都是可写的、可枚举的盒可配置的。在
 * ECMAScript5中则可以对这些特性加以配置。
 * 
 * 除了包含属性之外，每个对象还拥有三个相关的对象特性（object attribute）
 * 。对象的原型（prototype）指向另一个对象，本对象的属性继承自它的原型对象
 * 对象的类（class）是一个标识对象类型的字符串
 * 对象的扩展标记（extensible flag）指明了是否可以向该对象添加新属性
 * 
 * 最后，我们用下面这些术语来对三类js对象和两类属性做区分
 * 。内置对象（native object）是由ECMAScript规范定义的对象或类。例如，数组、函数、日期
 * 和正则表达式都是内置对象。
 * 。宿主对象（host object）是由js解释器所嵌入的宿主环境（比如web浏览器）定义的。客户端
 * js中标识网页结构的HTMLElement对象均值宿主对象。既然宿主环境定义的方法可以当成普通的
 * js函数对象，那么宿主对象也可以当成内置对象。
 * 。自定义对象（user-defined object）是由允许中的js代码创建的对象。
 * 。自有属性（own property）是直接在对象中定义的属性
 * 。继承属性（inherited property）实在对象的原型对象中定义的属性
 * 
 * 6.1 创建对象
 * 
 * 可以通过对象直接量、关键字new和Object.create()函数来创建对象
 * 
 * 6.1.1 对象直接量
 * 
 * 创建对象最简单的方式就是在js代码中使用对象直接量。对象直接量是由若干名/值对组成的映射
 * 表，名/值对中间用冒号分隔，名/值对之间用逗号分隔，整个映射表用花括号括起来。属性名可以
 * 是js标识符也可以是字符串直接量（包括空字符串）。属性的值可以是任意类型的js表达式，表
 * 达式的值（可以是原始值也可以是对象值）就是这个属性的值
 * 
 *  var empty = {}     //没有任何属性的对象
    var point = {x:0, y:1}  //两个属性
    var point2 = {x:point.x, y:point.y+1}  //更复杂的值
    var book = {
        "main title": 'Javascript',    //属性名字里有空格，必须用字符串表示
        'sub-title': 'The Definitive Guide',   //属性名字里有连字符，必须用字符串表示
        "for": "all audiences",        //‘for’是保留字，因此必须用引号
        author:{                       //这个属性的值是一个对象
            firstname:"David",         //注意，这里的属性名没有引号
            surname:"Flanagan"
        }
    }
 * 
 *
 * 在ECMAScript 5（以及ECMAScript 3的一些实现）中，保留字可以用用作不带引号的属性名。
 * 然而对于ECMAScript3来说，使用保留字作为属性名必须使用引号引起来。在ECMAScript5中，
 * 对象直接量中的最后一个属性后的逗号将忽略，而在ECMSAScript3的大部分实现中也可以忽略
 * 这个逗号，单在IE中则报错
 * 
 * 对象直接量是一个表达式，这个表达式的每次运算都创建并初始化一个新的对象。每次计算对象
 * 直接量的时候，也都会计算他的每个属性的值，也就是说，如果在一个重复调用的函数中的循环
 * 体内使用了对象直接量，他将创建很多新对象，并且每次创建的对象的属性值也有可能不同
 * 
 * 6.1.2 通过new创建对象
 * 
 * new运算符创建并初始化一个新对象。关键字new后跟随一个函数调用。这里的函数称作构造函数
 * （constructor），构造函数用以初始化一个新创建的对象。js语言核心中的原始类型都包含内置
 * 构造函数。例如：
 * 
 *  var o = new Object()    //创建一个空对象，和{}一样
    var a = new Array()     //创建一个空数组，和[]一样
    var d = new Date()      //创建一个表示当时时间的Date对象
    var i = new RegExp('js')//创建一个可以进行模式匹配的RegExp对象

 * 
 * 除了这些内置构造函数，用自定义构造函数来初始化新对象也是非常常见的
 * 
 * 6.1.3原型
 * 
 * 在讲述第三种对象创建技术之前，我们应当首先解释一下原型。每一个js对象（null除外）都和
 * 另一个对象相关联。‘另一个’对象就是我们熟知的原型，每一个对象都从原型继承属性
 * 
 * 所有通过对象直接量创建的对象都具有同一个原型对象，并可以通过js代码Object.prototype获得
 * 对原型对象的引用。通过关键字new和构造函数调用创建的对象的原型就是构造函数的prototype
 * 属性的值。因此，同使用{}创建对象一样，通过new Array()创建的对象的原型就是Array.prototype
 * 通过new Date()创建的对象的原型就是Date.prototype。
 * 
 * 没有原型的对象为数不多，Object.prototype就是其中之一。它不继承任何属性。其他原型对象
 * 都是普通对象，普通对象都具有原型。所有的内置构造函数（以及大部分自定义的构造函数）都
 * 具有一个继承自Object.prototype的原型。例如，Date.prototype的属性继承自Object.prototype
 * 因此new Date()创建的Date对象的属性同事继承自Date.prototype和Object.prototype。这
 * 一系列连接的原型对象就是所谓的‘原型链’（prototype chain）
 * 
 * 6.1.4 Object.create()
 * 
 * ECMAScript 5定义了一个名为Object.create()的方法，它创建一个新对象，其中第一个参数是
 * 这个对象的原型。Object.create()提供第二个可选参数，用以对对象的属性进行进一步描述
 * 
 * Object.create()是一个静态函数，而不是提供给某个对象调用的方法。使用它的方法很简单，
 * 只需传入所需的原型对象即可：
 * 
 * var o1 = Object.create({x:1, y:2})  //o1继承了属性x和y
 * 
 * 可以通过传入参数null来穿件一个没有原型的对象，但通过这种方式创建的对象不会继承任何东西
 * 甚至不包括基础方法，比如toString()，也就是说，它将不能和'+'运算符一起正常使用
 * 
 * var o2 = Object.create(null)     //o2不继承任何属性和方法
 * 
 * 如果创建一个普通的空对象（比如通过{}或new Object()创建的对象），需要传入Object.prototye
 * var o3 = Object.create(Object.prototype)
 * 
 * 可以通过任意原型创建新对象（换句话说，可以使任意对象可继承），这是一个强大的特性。
 * 在ECMAScript3中可以用类似的代码来模拟原型继承
 * 
 * //例6-1：通过原型继承创建一个新对象
 */

function inherit(p){
    if(p == null) throw TypeError()
    if(Object.create)
        return Object.create(p)
    var t = typeof p;
    if(t != 'object' && t != 'function') throw TypeError();
    function f(){}
    f.prototype = p;
    return new f();
} 

/**
 * 看完第九章关于构造函数的内容后，例6-1的inherit()函数会更容易理解。现在只要知道他返回
 * 的新对象继承了参数对象的属性就可以了。注意，inherit()并不能完全代替Object.create()，
 * 它不能通过传入Null原型来创建对象，而且不能接受可选的第二个参数。不过我们任会在本章和
 * 第九章的代码示例中多次用到inherit()
 * 
 * inherit()函数的其中一个用途就是防止库函数无意间（非恶意地）修改哪些不受你控制的对象。
 * 不是将对象直接作为参数传入函数，而是将他的继承对象传入函数。当函数读取继承对象的属性
 * 时，实际上读取的是继承来的值。如果给继承对象的属性赋值，则这些属性只会影响这个继承对象
 * 自身，而不是原始对象
 *  var o = {x:"don't change this value"}
 var p1 = inherit(o)
 var p2 = inherit(o)
 * 
 *6.2属性的查询和设置
 * 5.5节已经提到，可以通过点（.）或者方括号（[]）运算符来获取属性的值。运算符左侧应当是
 * 一个表达式，它返回一个对象。对于点（.）来说，右侧必须是一个以属性名称命名的简单标识符
 * 对于方括号来说（【】）,方括号内必须是一个计算结果为字符串的表达式，这个字符串就是属性
 * 名字：
 * var author = book.author
 * var name = author.surname
 * var title = book['main title']
 * 和查询属性值的写法一样，通过点和方括号也可以创建属性或给属性赋值，但需要将他们放在一个
 * 赋值表达式的左侧
 * book.edition = 6
 * book['main title'] = 'ECMAScript'
 * 
 * 在CMAScript3中，点运算符后的标识符不能是保留字，比如，o.for或o.class是非法的，因此for
 * 是js的关键字。如果一个对象的属性名是保留字，则必须使用方括号的形式访问他们，比如o['for']
 * 和o['class'].ECMAScript5对此放款了显示，可以在点运算符后面直接使用保留字。
 * 
 * 当使用方括号时，我们说方括号内的表达式必须返回字符串。其实跟严格地讲，表达式必须返回
 * 字符串和返回一个可以转换为字符串的值。在第7章里有一些例子中的方括号内使用了数字，这种
 * 情况像是非常常见的。
 * 
 * 6.2.1作为关联数组的对象
 * 上文提到，下面两个js表达式的值相同
 * object.prototye
 * Object['prototype']
 * 第一种语法使用点运算符和一个标识符，这和C和Java中访问一个结构体或对象的静态字段非常类似
 * 第二种语法使用方括号和一个字符串，看起来更像数组，只是这个数组元素是通过字符串索引而不是
 * 数字索引。这种数组就是我们所说的关联数组（associative array），也称作散列、映射或字典
 * （dictionary）.js对象都是关联数组
 * 
 * 在c、c++和java和一些抢类型（strong typed）语言中，对象只能拥有固定数目的属性，并且这
 * 谢属性名称必须提前定义好。由于js是弱类型语言，因此不必遵循这条规矩，在任何对象中程序都
 * 可以创建任意数量的属性。但当通过点运算符（.）访问对象的属性时，属性名用一个标识符来表示
 * 标识符来表示。标识符必须直接出现在js程序中，他们不是数据类型，因此程序无法修改他们。
 * 
 * 反过来讲，当通过[]来访问对象的属性时，属性名通过字符串来表示。字符串是js的数据类型，在
 * 程序运行时可以修改和创建它们。因此，可以在js中使用下面这种代码
 * 
 */
/* 
var addr = ''
for(i = 0; i < 4; i++){
    addr += customer['address' + i]
}
 */

/**
 * 这个例子主要说明了使用数组写法和用字符表达式来访问对象属性的灵活性。这段代码也可以通过
 * 点运算符来重写，但是很多场景只能使用数组写法来完成。结社你正在写一个程序，这个程序利用
 * 网络资源计算当前用户股票市场投资的金额。程序允许用户输入每只股票的名字和勾股份额。该程序
 * 使用名为portfolio的对象来存储这些信息。每只股票在这个对象都有对应的属性，属性名称就是
 * 股票名称，属性值就是购股熟料，例如，如果用户持有IBM的50股，那么portfolio.ibm属性的值
 * 就是50
 * 
 * function addstock(profolio, stockname, shares){
 *  protfolio[stockname] = shares;
 * }
 */
/* 
function getVlue(protfolio){
    var total = 0.0
    for(stock in portfolio){
        var shares = protfolio[stock]
        var price = getQuote(stock)
        total += shares * price
    }
    return total
}
 */

/**
 * 6.2.2继承
 * 
 * js对象具有‘自有属性’(own property)，也有一些属性是从原型对象继承而来的。为了更好地理解
 * 这种继承，必须更深入地 了解属性访问的细节。本节中的许多示例代码借用了6-1中的inherit()
 * 函数，通过给它传入置顶原型对象来创建实例
 * 
 * 结社要查询对象o的属性x，如果o中不存在x，那么将会继续在o的原型对象中查询属性x。如果原型对象中也
 * 没有x，但这个原型对象也有原型，那么继续在这个原型对象的原型上执行查询，知道找到x或者查找
 * 到一个原型是null的对象位置。可以看到，对象的原型属性构成了一个‘链’，通过这个‘链’可以实现
 * 属性的继承。
 * 
 */

/* var o = {}
o.x = 1;
var p = inherit(o)
p.y = 2
var q = inherit(p)
q.z = 3
var s = q.toString()
q.x + q.y */

/**
 * 现在假设给对象o的属性x赋值，如果o中已经有属性x（这个属性不是继承来的），那么这个赋值操作
 * 只改变这个以后属性x的值。如果o中不存在属性x，那么复制操作给o添加一个新属性x。如果之前o
 * 继承自x，那么这个继承的属性就被新创建的同名属性覆盖了
 * 
 * 属性赋值操作首先检查原型链，以此判断是否允许赋值操作。例如，如果o继承自一个值读属性x
 * 那么复制操作是不允许的。如果允许属性赋值操作，它也总是在原始对象上创建属性或对已有的属性赋值
 * 而不会去修改原型链。js中，只有在查询属性时才会体会到继承的存在，而设置属性则和继承无关
 * 这是js的一个重要特性，该特性让程序员可以有选择地覆盖继承的属性。
 * 
 */
/* var unitcicle = {r:1}
var c = inherit(unitcicle)
c.x = 1
c.y = 1
c.r = 2
console.log(unitcicle)
console.log(c) */

/**
 * 属性赋值要么失败，要么创建一个属性，要么在原始对象中设置属性，但有一个例外，如果0
 * 继承自属性x，而这个属性是一个具有setter方法的accessor属性，那么这时将调用setter方法
 * 而不是给o创建一个属性x，需要注意的是，setter方法是有对象o调用的，而不是定义这个属性
 * 的原型对象调用的。因此如果setter方法定义任意属性，这个操作只是针对o本身，并不会修改
 * 原型链
 * 
 * 6.2.3属性访问错误
 * 属性访问并不是总是返回或设置一个值。本节讲述查询或设置属性时的一些出错情况
 * 查询一个不存在的属性并不会报错，如果在对象o自身的属性或集成的属性中均未找到属性x，
 * 属性访问表达式o.x返回undefined。回想一下我们的book对象有属性'sub-title'，而没有
 * 属性'subtitle'
 * book.subtitle; // => undefined:属性不存在
 * 但是，如果对象不存在，那么试图查询这个不存在的对象的属性就会报错。null和undefined
 * 值都没有属性，因此查询这些值得属性会报错，接上例：
 * var len = book.subtitle.length;
 * 除非确定book和book.subtitle都是（或在行为上）对象，否则 不能这样写表达式book.subtitle.length
 * 因为这样会报错，下面提供了两种避免出错的方法
 * var len = undefined;
 * if(book){
 *      if(book.subtitle) len = book.subtitle.length
 * }
 * 
 * var len = book && book.subtitle && book.subtitle.length
 * 
 * 当然，给null和undefined设置属性也会报类型错误。给其他值设置属性也不总是成功，有一些属性
 * 是只读的，不能重新复制，有一些对象不允许新增属性，但让人颇感意外的是，这些设置属性的操作
 * 不会报错
 * 内置构造函数的原型是只读的
 * Object.prototye = 0 //复制失败，但没报错，Object.prototye没有修改
 * 这是一个历史遗留问题，这个bug在ECMAScript5的严格模式中已经修改。在严格模式中，任何
 * 失败的属性设置操作都会抛出一个类型错误异常。
 * 
 * 尽管属性赋值成功或失败的规律看起来简单，但要描述清楚并不容易。在这些场景下给对象o设置属性
 * p会失败：
 * 。o中的属性p是只读的：不能给只读属性重新赋值（defineProperty()方法中有一个例外，可以
 * 对可配置的只读属性重新赋值）
 * 。o中的属性p是继承属性，且它是只读的：不能通过同名自有属性覆盖只读的继承属性
 * 。o中不存在自有属性p：o没有使用setter方法继承属性p，并且o的可扩展性（extensible attribute）
 * false.如果o中不存在p，而且没有setter方法可供调用，则p一定会添加至o中。但如果o不是可
 * 扩展的，那么在o中不能定义新属性
 * 
 * 6.3删除属性
 * delete运算符可以删除对象的属性。他的操作数应当是一个属性访问表达式。让人感到意外的是
 * delete只是断开属性和宿主对象的联系，而不会去操作属性的中的属性
 * 
 * delete book.author;  //book不再有属性author
 * delete book['main title'] //book不再有属性main title
 * 
 * delete运算符只能删除自有属性，不能删除继承属性（要删除继承属性必须从定义这个属性的
 * 原型对象删除它，而且这会影响到所有继承自这个原型的对象）
 * 
 * 当delete表达式删除成功或没有任何副作用（比如删除不存在的属性）时，它返回true。如果
 * delete后不是一个属性访问表达式，delete同样返回true
 * 
 * o = {x:1}    o有一个属性x，并继承属性toString
 * delete o.x   删除x，返回true
 * delete o.x   什么也没做（x已经不存在了），返回true
 * delete o.toString 什么也没做（toString是继承来的），返回true
 * delete 1;    无意义，返回true
 * 
 * delete不能删除那些可配置性为false的属性（尽管可以删除不可扩展对象的可配置属性）
 * 某些内置对象的属性是不可配置的，比如通过变量声明和函数声明创建的全局对象的属性
 * 在严格模式中国，删除一个不可配置属性会报一个类型错误。在非严格模式中，在这些情况
 * 下的delete操作会返回false
 * delete Object.prototye   不能删除，属性是不可配置的
 * var x = 1    、、声明一个全局变量
 * delete this.x    //不能删除这个属性
 * function f(){}   //声明一个全局函数
 * delete this.f    //也不能删除全局函数
 * 
 * 当在非严格模式中，删除全局对象的可配置属性时，可以省略对全局对象的引用，直接在delete
 * 操作符后跟随要删除的属性名饥渴
 * this.x = 1
 * delete x; //将他删除
 * 
 * 然而在严格模式中，delete后跟随一个非法的操作数 ，则会报一个语法错误，因此必须显示
 * 指定对象及其属性：
 * delete x;
 * delete this.x 
 * 
 * 6.4检测属性
 * 
 * js对象可以看做属性的集合，我们经常会检测集合中成员的所属关系-判断某个属性是否存在于
 * 某个对象中。可以通过in运算符、hasOwnProperty()和propertyIsEnumerable()方法来完成
 * 这个工作，甚至通过属性查询也可以做到这一点
 * 
 * in运算符的左侧是属性名（字符串）, 右侧是对象。如果对象的自有属性或继承属性中包含这个
 * 属性则返回true
 *  var o = { x : 1 }
    'x' in o;  //true  x 是 o 的属性
    'y' in o;  //false y 不是o的属性
    'toString' in o;   //true o继承toSting属性
 * 
 * 对象的hasOwnProperty()方法用来检测给定的名字是否是对象的自有属性。对于继承属性它将
 * 返回false
 * 
 * var o = { x : 1}
 * o.hasOwnProperty('x')    //true o有一个自有属性x
 * o.hasOwnProperty('y')    //false o中不存在属性y
 * o.hasOwnProperty('toString') //false toString是继承属性
 * 
 * propertyIsEnumerable()是hasOwnProperty()的增强版，只有检测到时自有属性且这个属性
 * 的可枚举性（enumerable attribute）为true时它才返回true。某些内置属性是不可枚举的。
 * 通常由js代码创建的属性是可枚举的，除非在ECMAScript5中使用一个特殊的方法来改变属性的
 * 可枚举性，随后会提到
 * var o - inherit({y:2})
 * o.x = 1
 * o.propertyIsEnumerable('x')  //true o有一个可枚举的自有属性x
 * o.propertyIsEnumerable('y')  //false y是继承来的
 * Object.prototype.prototypeIsEnumerable('toString')   //false 不可枚举
 * 
 * 除了使用in运算符之外，另一种更简便的方法是使用'!=='判断一个属性是否是Undefined
 * var o = {x:1}
 * o.x !== undefined    //true o中有属性x
 * o.y !== undefined    //false o中没有属性y
 * o.toString !== undefined //true o继承了toString属性
 * 
 * 然而有一种场景只能使用in运算符而不能使用上述属性访问的方式。in可以区分不存在的属性和
 * 存在但值为undefined的属性
 * var o = {x:undefined}
 * o.x !== undefined    //false 属性存在，但值为undefined
 * o.y !== undefined    //false 属性不存在
 * 'x' in o             //true 属性存在
 * 'y' in o             //false 属性不存在
 * delete o.x           //删除了属性x
 * 'x' in o             //false 属性不再存在
 * 注意，上述代码中使用的是'!=='运算符，而不是'!='。 '!=='可以区分undefined和null.
 * 又是则不必作这种区分：
 * 
 * //如果o中函数属性x，且x的值不是null或undefined，o.x乘以2
 * if(o.x != null) o.x *=2;
 * //如果o中含有属性x，且x的值不能转换为false，o.x乘以2
 * //如果x是undefined、null、false、 ''、0或NaN，则它保值不变
 * 
 * 6.5枚举属性
 * 除了检测对象的属性是否存在，我们还会经常遍历对象的属性。通常使用for/in循环遍历，
 * ECMAScript5提供了两个更好用的代替方案
 * 
 * 5.5.4节讨论过for/in循环，for/in循环可以在循环体中遍历对象中所有可枚举的属性（包括
 * 自有属性和继承的属性），把属性名称赋值给循环变量。对象继承的内置方法不可枚举的，但
 * 在代码中给对象添加的属性都是可枚举的（除非用下午中提到的一个方法将他们转换为不可枚举
 * 的）
 * 
 * var o = {x:1, y:2, z:3}  //三个可枚举的自有属性
 * o.propertyIsEnumerable('toString')   //false 不可枚举
 * for(p in o)              //遍历属性
 *  console.log(p)          //输出x、y和z，不会输出toString
 * 
 * 有许多实用工具库给Object.prototype添加了新的方法或属性，这些方法和属性可以被所有对象
 * 继承并使用。然而zaiECMAScript5标准之前，折现新添加的方法是不能定义为不可枚举的，因此
 * 他们都可以在for/in循环中枚举出来。为了避免这种强开，需要过滤for/in循环返回的属性
 * 
 * for(p in o){
 *  if(!o.hasOwnProperty(p)) continue   //跳过继承的属性
 * }
 * 
 * for(p in o){
 *  if(typeof o[p] === 'function') continue;    //跳过方法
 * }
 * 
 * 例6-2定义了一些有用的工具函数来操作对象的属性，这些函数用到了for/in循环。实际上
 * extend()函数经常出现在js使用工具库中。
 * 
 * 例6-2：用来枚举属性的对象工具函数
 * 
 * 把p中的可枚举属性复制到o中，并返回o，如果o和p中含有同名属性，则覆盖o中的属性，这个
 * 函数并不处理getter和setter以及赋值属性
 * 
 * function extend(o, p){
 *  for(prop in p){
 *      o[prop] = p[prop]
 *  }
 *  return o
 * }
 * 
 * 将p中的可枚举属性复制至o中，并返回o，如果o和p中有相同的属性，o中的属性将不受影响，
 * 这个函数并处理getter和setter以及赋值属性
 * function merge(o, p){
 *  for(prop in p){
 *      if(o.hasOwnProperty[prop]) continue;
 *      o[prop] = p[prop]
 *  }
 *  return o
 * }
 * 
 * 如果o中的属性在p中没有同名属性，则从o中删除这个属性
 * function resetrict(o, p){
 *  for(prop in o){
 *      if(!(prop in p)) delete o[prop]
 *  }
 *  return o
 * }
 * 
 * 
 * 
 */


 