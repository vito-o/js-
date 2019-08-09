/**
 * 第6章详细介绍了js对象，每个js对象都是一个属性集合，相互之间没有任何联系。在js中也可以定义对象的类，让每个对象
 * 共享某些属性，这种“共享”的特性是非常有用的。类的成员或实例都包含一些属性，用以存放或定义他们的状态，其中有些
 * 属性定义了他们的行为（通常称为方法）。这些行为通常是由类定义的，而且为所有实例所共享。例如，假设有一个名为
 * Complex的类用来表示复数，同时还定义了一些复数运算。一个Complex实例应当包含复数的实部和虚部（状态），同样
 * Complex类还会定义复数的加法和乘法操作（行为）
 * 
 * 在js中，类的实现是基于其原型继承机制的。如果两个实例都从同一个原型对象上继承了属性，我们说他们是同一个类的实例。
 * js原型和继承在6.1.3和6.2.2节中有详细讨论
 * 如果两个对象继承自同一个原型，往往以为这（但不是绝对）他们是由同一个构造函数创建并初始化的。
 * 
 * 如果你对诸如java和c++这种强类型的面向对象编程比较熟悉，你回返现js中的类和java以及c++中的类有很大的不同。尽管在
 * 写法上类似，而且在js中也能“模拟”处很多经典的类的特性，但是最好要理解js的类和基于原型的继承机制，以及和传统的java
 * （当然还有类似java的语言）的类和基于类的继承机制的不同之处。
 * 
 * js中类的一个重要特性是“动态可继承”（dynamically extendable），
 * 
 * 
 * 9.1 类和原型
 * 
 * 在js中，类的所有实例对象都从同一个原型对象上继承属性。因此，原型对象是类的核心。在例6-1中定义了inherit()函数，这个
 * 函数返回一个新创建的对象，后继承自某个原型对象。如果定义一个原型对象，然后通过inherit()函数创建一个继承自它的对象
 * 这样就定义了一个js类。通常，类的实例还需要进一步的初始化，通常是通过定义一个函数来创建并初始化这个新对象，参照例9-1
 * 给一个表示“值的范围”的类定义一个原型对象，还定义了一个“工厂”函数用以创建并初始化类的实例
 * 
 * 例9-1：一个简单的js类
 * 
 * function inherit(p){
 *    if(p == null) throw TypeError();
 *    if(Object.create){
 *      return Object.create(p)
 *    }
 *    
 *    var t = typeof p;
 *    if(t !== 'object' || t !== 'function') throw TypeError;
 *    function f(){}
 *    f.prototype = p;
 *    return new f()
 * }
 * 
 * function range(from, to){
 *    var r = inherit(range.methods);
 *    r.from = from;
 *    r.to = to;
 *    return r;
 * }
 * 
 * range.methods = {
 *    includes:function(x){
 *      return this.from <= x && x <= this.to
 *    },
 *    foreach:function(f){
 *      for(var x = Math.ceil(this.from); x <= this.to; x++) f(x);
 *    },
 *    toString:function(){return '(' + this.from + '...' + this.to + ')';}
 * }
 * 
 * var r = range(1, 3)
 * r.includes(2)
 * r.foreach(console.log)
 * console.log(r)
 * 
 * 自我理解----类  =  函数 + 原型对象 
 * 
 * 在例9-1中 有一些代码是没有用的。这段代码定义了一个工厂方法range()，用来创建新的范围对象。
 * 我们注意到，这里给range()函数定义了一个属性range.methods,用以快捷地存放定义类的原型对象
 * 把原型对象挂在函数上没什么大不了，但也不是惯用做法。在这，注意range()函数给每个范围对象
 * 都定义了from盒to属性，用以定义范围的其实和结束为止，这两个属性是非共享的，当然也不是可继承
 * 的。最后，注意在range.methods中定义的那些可共享、科技城的方法都用到了from和to属性，而且
 * 使用了this关键字，为了指代他们，两者使用this关键字来指代调用这个方法的对象。任何类的方法
 * 都可以通过this的这种基于用法来读取对象的属性。
 * 
 * 9.2 类和构造函数
 * 
 * 例9-1展示了在js中定义类的其中一种方法。但这种方法并不常用，毕竟他没有定义构造函数，
 * 构造函数是用来初始化新创建的对象的。8.2.3节已经讲到，使用关键字new来调用构造函数。使用new调用构造函数会自动
 * 创建一个新对象，因此构造函数本身只需初始化这个新对象的状态即可。调用构造函数的一个重要特征是，构造函数的prototype
 * 属性被用作新对象的原型。这意味着通过同一个构造函数创建的所有对象都继承自同一个对象，因此他们都是同一个类的成员
 * 例9-2对例9-1中的‘范围类’做了修改，使用构造函数代替工厂函数：
 */

function Range(from, to){
  this.from = from;
  this.to = to;
}

Range.prototype = {
  includes:function(x){return this.from <= x && x <= this.to},
  foreach:function(f){
    for(var x = Math.ceil(this.from); x <= this.to; x++) f(x)
  },
  toString:function(){return '(' + this.from + '...' + this.to + ')'}
}

var r = new Range(1, 3)
/* console.log(r.includes(2))
r.foreach(console.log)
console.log(r) */

/**
 * 将例9-1和9-2中的代码做一个仔细的对吧，可以发现两种定义类的技术的差别。首先，注意当工厂函数range()转换为构造函数
 * 时被重命名为Range()。这里遵循了一个常见的编程约定：从某种意义上讲，定义构造函数即使定义类，并且类名首字母要大写。
 * 而普通的函数和方法都是首字母小写。
 * 
 * 再者，注意Range()构造函数是通过new关键字调用的，而range()工厂函数则不必使用New。例9-1通过调用普通函数来创建
 * 新对象，例9-2则使用构造函数调用来创建新对象。由于Range()构造函数是通过New关键字调用的，因此不必调用inHerit()
 * 或其他什么逻辑来创建新对象。在调用构造函数之前就已经创建了新对象，通过this关键字可以获取这个新对象。Range()
 * 构造函数只不过是初始化this而已。构造函数甚至不必返回这个新创建的对象，构造函数会自动创建对象，然后将构造函数
 * 作为这个对象的方法来调用一次，最后返回这个新对象。事实上，构造函数的命名规则（首字母大写）和普通函数是如此不同
 * 还有另外一个原因，构造函数调用和普通函数调用是不尽相同的。构造函数就是用来“构造新对象”的，它必须通过关键字new
 * 调用，如果将构造函数用做普通函数的话，往往不会正常工作。开发者可以通过命名约定来（构造函数首字母大写，普通方法
 * 首字母小写）判断是否应当在函数之前冠以关键字new
 * 
 * 在调用构造函数之前就已经创建了新对象
 * 
 * 构造函数会自动创建对象，然后将构造函数作为这个对象的方法来调用一次，最后返回这个新对象（***重点***）
 * 
 * 例9-1和例9-2之间还偶一个非常重要的区别，就是原型对象的命名。在第一段示例代码中的原型是range.methods。这种命名
 * 方式很方便同时具有很好的意义，但又过于随意。在第二段示例代码中的原型是Range.prototype，这是一个强制的命名。
 * 对Range()构造函数的调用会自动使用Range.prototype作为新Range对象的原型。
 * 
 * 最后，需要注意到在例9-1和例9-2中定义方式的相同之处，两者方法定义和方法调用时完全一样的。
 * 
 * 9.2.1 构造函数和类的标识
 * 
 * 上文提到，原型对象是类的唯一标识：当且仅当两个对象继承自同一个原型对象时，他们才属于同一个类的实例。而初始化
 * 对象的状态的构造函数则不能作为类的标识，两个构造函数的prototype属性可能指向同一个原型对象。那么这两个构造函数
 * 创建的实例是属于同一个类的。
 * 
 * 尽管构造函数不想原型那样基础，但构造函数是类的“外在表现”。很明显的，构造函数的名字通常用作类名。比如，我们说
 * Range()构造函数创建Range对象。然而，更根本的讲，当使用instanceof运算符来检测对象是否属于某个类时会用到构造
 * 函数。假设这里有一个对象r，我们想知道r是否是Range对象，我们这样写：
 * r instanceof Range      //如果r继承自Range.prototype,则返回true
 * 
 * 实际上instanceof运算符并不会检查r是否是由Range()构造函数初始化而来，而会检查是否继承自Range.prototype。
 * 不过，instanceof的语法则强化了“构造函数是类的共有标识”的概念
 * 
 * 9.2.2 constructor 属性
 * 
 * 在例9-2中，将Range.prototype定义为一个新对象，这个对象包含类所需要的方法。其实没有必要新创建一个对象，用单个
 * 对象直接量的属性就可以方便地定义原型上的方法。任何js函数都可以用作构造函数，并且调用构造函数时需要用到一个prototype
 * 属性的。因此，每个js函数（ECMAScript 5中的Function.bind()方法返回的函数除外)都自动拥有一个prototype属性。
 * 这个属性的值时一个对象，这个对象包含唯一一个不可枚举属性cconstructor。constructor属性的值是一个函数对象：
 * 
 * var F = function(){}       //这是一个函数对象
 * var p = F.prototype        //这是F相关联的原型对象
 * var c = p.constructor      //这是与原型相关联的函数
 * 
 * c === F                    //->true:对于任意函数F.prototype.constructor == F
 * 
 * 可以看到构造函数的原型中存在预先定义好的constructor属性，这意味这对象通常继承的constructor均指代他们的构造函数
 * 由于构造函数是类的“公共标识”，因此这个constructor属性为对象提供了类。
 * 
 * var o = new F()        //创建类F的一个对象
 * o.constructor === F    //true, constructor属性指代这个类
 * 
 * 如图9-1所示，图9-1展示了构造函数和原型对象之间的关系，包括原型到构造函数的反向引用以及构造函数创建的实例。
 * 
 *     构造函数           原型                      实例
 *                                    继承
 *     Range    <----  构造函数     <--------  new Range(1,2)
 *         原型---->   includes..       
 *                     foreach...     继承
 *                     toString... <--------  new Range(1,2)
 * 
 * 图9-1：构造函数及其原型和实例
 * 
 * 需要注意的是，图9-1用Range()构造函数作为实例，但实际上，例9-2中定义的Range类使用它自身的一个新对象重写
 * 预定义的Range.prototype对象。这个新定义的原型对象不含有constructor属性。因此Range类的实例也不含有constructor
 * 属性。我们可以通过补救措施来修正这个问题，显式给原型添加一个构造函数：
 * 
 * Range.prototype = {
 *    constructor:Range,  //显式设置构造函数反向引用
 *    includees:function(x){return this..from <= x && x <= this.to},
 *    ......
 * }
 * 
 * 另一种常见的解决办法是使用预定义的原型对象，预定义的原型对象包含constructor属性，然后依次给原型对象添加方法：
 * 
 * Range.prototype.includes = function(x){return this.from <= x && x <= this.to}
 * 
 * 9.3 js中java式的类继承
 * 
 * 如果你有过java或其他类似强类型面向对象语言的开发经历的话，在你的脑海中，类成员的模样可能会是这个样子：
 * 
 * 实例字段
 *        他们是基于实例的属性或变量，用以保存独立对象的状态
 * 实例方法 
 *        他们是类的所有实例所共享的方法，由每个独立的实例调用
 * 
 * 类字段
 *        这些属性或变量是属于类的，而不是属于类的某个实例的。
 * 类方法
 *        这些方法是属于类的，而不是属于类的某个实例的
 * 
 * javaScript和java的一个不同之处在于，js中的函数都是以值的形式出现的，方法和字段之间并没有太大的区别。
 * 如果属性值时函数，那么这个属性就定义一个方法；否则，它只是一个普通的属性或“字段”。尽管存在差异，我们还是可以
 * 用js模拟出java中的这四种类成员类型。js中的类牵扯三种不同的对象，三种对象的属性和行为和下面三种类成员非常相似
 * 
 * 构造函数对象
 *  之前提到，构造函数（对象）为js的类定义了名字。任何添加到这个构造函数对象中的属性都是都是类字段和类方法（如果
 *  属性值时函数的话就是类方法）
 * 原型对象
 *  原型对象的属性被类的所有实例所继承，如果原型对象的属性值是函数的话，这个函数就作为类的实例的方法来调用
 * 实例对象
 *  类的每个实例都是一个独立的对象，直接给这个实例定义的属性是不会为所有实例对象所共享的。定义在实例上的非函数
 * 属性，实际上是实例的字段。
 * 
 * 在js中定义类的步骤可以缩减为一个分三步的算法。第一步，先定义一个构造函数，并设置初始化新对象的实例属性。
 * 第二步，给构造函数的prototype对象定义实例的方法。第三步，给构造函数定义类字段和类属性。我们可以将这三个步骤
 * 装进一个简单的defineClass()函数中：
 * function defineClass(
 *    constructor,  //用以设置实例的属性的函数
 *    methods,      //实例的方法，复制至原型中
 *    statics       //类属性，复制至构造函数中
 * ){
 *    if(methods) extend(constructor.prototype, methods);
 *    if(statics) extend(constructor, statics)
 *    return constructor
 * }
 * 
 * var SimpleRange = 
 *     defineClass(
 *        function(f,t){this.f = f;this.t=t},
 *        {
 *            includes:function(x){return this.f <= x && x <= this.t}
 *        },
 *        {
 *            upto:function(t){return new SimpleRange(o, t)}
 *        }
 *     )
 * 
 * 例9-3中定义类的代码更长一些。这里定义了一个表示复数的类，这段代码展示了如何使用js来模拟实现java式的类成员。
 * 例9-3中的代码没有用到上面的defineClass()函数，而是“手动”来实现：
 * 
 * 这个文件定义了Complex类，用来描述复数
 * 复数是实数和虚数的和，并且虚数i是-1的平方根
 * 
 * 这个构造函数为他所创建的每个实例定义了实例字段r和i
 * 这两个字段分别保存复数的实部和虚部
 * 他们是对象的状态
 * 
 * function Complex(real, imaginary){
 *    if(isNaN(real) || isNaN(imaginary))
 *       throw New TypeError();
 *    this.r = real;        //复数的实部
 *    this.i = imaginary;   //复数的虚部
 * }
 * 
 * 类的实例方法定义为原型对象的函数值属性
 * 这里定义的方法可以被所有实例继承，并未他们提供共享的行为
 * 需要注意的是，js的实例方法必须使用关键字this来存取实例的字段
 * 
 * Complex.prototype.add = function(that){
 *    return new Complex(this.r + that.r, this.i + that.i);
 * }
 * 
 * Complex.prototype.mul = function(that){
 *    return new Complex(this.r * that.r - this.i * that.i, this.r * that.i + this.i * that.r)
 * }
 * 
 * Complex.prototype.mag = function(){
 *    return Math.sqrt(this.r * this.r + this.i * this.i)
 * }
 * 
 * Complex.prototype.neg = function(){
 *    return new Complex(-this.r, -this.i)
 * }
 * 
 * Complex.prototype.toString = function(){
 *    return '{' +this.r + ',' + this.i + '}'
 * }
 * 
 * Complex.prototype.equals = function(that){
 *    return that != null &&
 *           that.constructor === Complex &&
 *           this.r === that.r && this.i === that.i
 * }
 * 
 * 类字段（比如常量）和类方法直接定义为构造函数的属性
 * 需要注意的是，类的方法通常不适用关键字this，他们只对其参数进行操作
 * 
 * 这里预定义了一些对复数运算有帮助的类字段
 * 他们的命名全是大写，用以表明他们是常量
 * （在ECMAScrpt 5中，还能设置这些类字段的属性为只读）
 * Complex.ZERO = new Complex(0, 0)
 * Complex.ONE = new Complex(1, 0)
 * cOMPLEX.i = new Complex(0, 1)
 * 
 * Complex.parse = function(s){
 *    try{
 *      var m = Complex._format.exec(s)
 *      return new Complex(parseFloat(m[1]),parseFloat(m[2]))
 *    }catch(x){
 *      return new TypeError("Can't parse " + s + "as a complex number.")
 *    }
 * }
 * 
 * Complex._format = /^\{([^,]+),([^}]+)\}$/;
 * 
 * var c = new Complex(2, 3)
 * var d = new Complex(c.i, c.r)
 * c.add(d).toString()
 * Complex.parse(c.toString()).
 *  add(c.neg()).
 *  equals(Complex.ZERO)
 * 
 * 尽管js可以模拟出java式的类成员，但java中有很多重要的特性是无法在js类中模拟的。首先，对于java类的实例方法
 * 来说，实例字段可以用作局部变量，而不需要使用关键字this来引用他们。js是没有办法模拟这个特性的，但可以使用
 * with语句来近似地实现这个功能（但这种做法并不推荐）
 * Complex.prototype.toString = function(){
 *    with(this){
 *      return '{' + r + ',' + i + '}'
 *    }
 * }
 * 
 * 在java中可以使用final声明的字段为常量，并且可以将字段和方法声明为private，用以表示他们是私有成员且在类的外面
 * 是不可见的。在js中没有这些关键字。例9-3中使用了一些命名写法上的约定来给出一些暗示，比如哪些成员是不能修改的（
 * 以大写字母命名的命名），哪些成员在类玩不是不可见的（以下划线为前缀的命名）。关于这两个主题的讨论在章节后面还会
 * 碰到：私有属性可以使用闭包里的局部变量来模拟，常量属性可以在ECMAScript5中直接实现。
 * 
 * 9.4 类的扩充
 * 
 * js中基于原型的继承机制是动态的：对象从其原型继承属性，如果创建对象之后原型的属性发送了改变，也会影响到继承这个
 * 原型的所有实例对象。这以为着我们可以通过给原型对象添加新方法来扩充js类。这里我们给9-3中的Complex类添加方法来
 * 计算复数的共轭复数
 * 
 * //返回当前复数的共轭复数
 * Complex.prototype.conj = function(){return new Complex(this.r - this.i)}
 * 
 * js内置类的原型对象也是一样如此‘开放’，也就是说给数字、字符串、数组、函数等数据类型添加方法。在例8-5中我们曾给
 * ECMAScript3中的函数添加了bind()方法，这个方法原来是没有的：
 * 
 * if(!Function.prototype.bind){
 *    Function.prototype.bind = function(o){
 *      //bind()方法的代码。。。
 *    }
 * }
 * 
 * 这里有一些其他的例子
 * 
 * var n = 3;
 * n.times(function(n){console.log(n + ' hello')})
 * Number.prototype.times = function(f, context){
 *    var n = Number(this)
 *    for(var i = 0; i < n; i++) f.call(context, i)
 * }
 * 
 * String.prototype.trime = String.prototype.trim || function(){
 *    if(!this) return this;
 *    return this.replace(/^\s+|S+$/g, "")
 * }
 * 
 * Function.prototype.getName = function(){
 *    return this.name || this.toString().match(/function\s*([^()*]\(/)[1])
 * }
 * 
 * 可以给Object.prototype添加方法，从而使所有的对象都可以调用这些方法。但这种做法并不推荐，因为在ECMAScript5
 * 之前，无法将这些新增的方法设置为不可枚举的，如果给Object.prototype添加属性，这些属性是可以被for/in循环遍历
 * 到的。在9.7.1节中会给出ECMAScript5中的例子，使其中使用Object.defineProperty()方法可以安全地扩充Object.
 * prototype。
 * 
 * 然而并不是所有的宿主环境（比如web浏览器）都可以使用Object.defineProperty(),这跟ECMAScript的具体实现有关。
 * 比如，在很多web浏览器中，可以给HTMLElement.prototype添加方法，这样当前文档中标识HTML标记的所有对象就可以继承
 * 这些方法。但当前版本的IE则不支持这样做。这对客户端编程使用技术有着严重的限制。
 * 
 * 
 * 9.5 类和类型
 * 
 * 回想一下第三章的内容，js定义了少量的数据类型：null、undefined、布尔值、数字、字符串、函数和对象。typeof运算符
 * 可以得出值得类型。然而，我们往往更希望将类作为类型来对待，这样就可以根据对象所述的类来区分它们。js语言核心中的
 * 内置对象（通常是指客户端js的宿主对象）可以更具它们的class来区分彼此，比如在6-4中用到了classof()函数。但当我们
 * 使用本章所提到的技术来定义类的话，实例对象的class属性都是‘Object’，这时classof()函数也无用武之地。
 * 
 * 接下来的几节介绍了3中用以检测任意对象的类的技术：instanceof运算符,constructor属性，以及构造函数的名字。但每种
 * 技术都不完美，本节总结讨论了鸭式辩型，这种编程哲学更加关注对象可以完成什么工作（它包含什么方法）而不是对象属于哪个类
 * 
 * 9.5.1 instanceof运算符
 * 
 * 4.9.4节已经讨论过instanceof运算符。左操作数是待检测其类的对象，右操作数是定义类的构造函数。如果o继承自c.prototype
 * 则表达式o instanceof c值为true。这里的继承可以不是直接继承，如果o所继承的对象继承自另一个对象，后一个对象继承
 * 自c.prototype，这个表达式的运算结果也是true。
 * 
 * 正如在本章前面所讲到的，构造函数是类的公共标识，但原型是唯一的标识。尽管instanceof运算符的右操作数是构造函数，
 * 但计算过程实际上检测了对象的继承关系，而不是检测创建对象的构造函数。
 * 
 * 如果你想检测对象的原型链上是否在某个特定的原型对象，有没有不使用构造函数作为中介的方法呢？答案是肯定的，可以使用
 * isPrototypeOf()方法。比如，可以通过如下代码来检测对象r是否是例9-1中定义的范围类的成员：
 * range.methods.isPrototypeOf(r)   //range.method 是原型对象
 * 
 * var o = {aa:123}
 * var b = Object.create(o)
 * 
 * o.isPrototypeOf(b)
 * 
 * instanceof 运算符和isPrototypeOf()方法的缺点是，我们无法通过对象来获得类名，只能检测对象是否属于指定的类名。
 * 在客户端js中还有一个比较严重的不足，就是在多窗口和多框架子页面的web应用中兼容性不佳。每个窗口和框架子页面都具有
 * 单独的执行上下文，每个上下文都包含独有的全景变量和一组构造函数。在两个不同框架页面中创建的两个数组继承自两个相同
 * 但互相独立的原型对象，其中一个框架页面中的数组不是另一个框架页面的Array()构造函数的实例，instanceof运算结果是
 * false。
 * 
 * 9.5.2 constructor属性
 * 
 * 另一种识别对象是否属于某个类的方法是使用constructor属性。因为构造函数是类的公共标识，所以最直接的方法就是使用
 * constructor属性，比如：
 * 
 * function typeAndValue(x){
 *    if(x == null) return "";
 *    switch(x.constructor){
 *      case Number: return "Number: " + x;
 *      case String: return "String: " + x;
 *      case Date: return "Date: " + x;
 *      case RegExp: return "RegExp: " + x;
 *      case Complex: return "Complex: " + x;
 *    }
 * }
 * 
 * var i = 10;
 * 
 * i.constructor === Number;   //true
 * 
 * 需要注意的是，在代码的关键字case后的表达式都是函数，如果改用typeof运算符或获取对象的class属性的话，他么应当为
 * 字符串。
 * 
 * 使用constructor属性检测对象属于某个类的技术的不足之处和instanceof一样。在多个执行上下文的场景中它是无法正常
 * 工作的（比如在浏览器窗口的多讴歌框架子页面中）。在这种情况下，每个框架页面个自拥有独立的构造函数，一个框架页面
 * 中的Array构造函数和另一个框架页面的Array构造函数不是同一个构造函数。
 * 
 * 同样，在js中也并非所有的对象都包含constructor属性。在每个新创建的函数原型上默认会有constructor属性，但我们常常
 * 会忽略原型上的constructor属性。比如本章前面的实例代码中所定义的两个类，他们的实例都没有constructor属性。
 * 
 * 9.5.3构造函数的名称
 * 
 * 使用instanceof运算符和constructor属性来检测对象所属的类有一个主要的问题，在多个执行上下文中存在构造函数的多个
 * 副本的时候，这两个方法检测结果会出错。多个执行上下文中的函数看起来一模一样，但他们是相互独立的对象，因此彼此也
 * 不相等。
 * 
 * 一种可能的解决方案是使用构造函数的名字而不是构造函数本身作为类标识符。一个窗口里的Array构造函数和另一个窗口的
 * Array构造函数是不相等的，但是他们的名字是一样的。在一些js的实例中为函数对象提供了一个非标准的属性name，用来表示
 * 函数的名字。对于那些没有name属性的js实现来说，可以将函数转换为字符串，然后从中提取出函数名。
 * 
 * 
 * 
 * function type(o){
 *    var t, c, n;
 * 
 *    if(o === null) return 'null'
 * 
 *    if(o !== o) return 'nan'
 * 
 *    if((t = typeof o) !== 'object') return t;
 * 
 *    if((c = classof(o)) !== 'Object) return c;
 * 
 *    if(o.constructor && typeof o.constructor === 'function' && (n = o.constructor.getName())) return n;
 * 
 *    return 'Object'
 * }
 * 
 * function classof(o){
 *    return  Object.prototype.toString.call(o).slice(8, -1)
 * }
 * 
 * Function.prototype.getName = function(){
 *    if('name' in this) return this.name;
 *    return this.name = this.toString().match(/function\s*([^(]*)\(/)[1]
 * }
 * 
 * 这种是用构造函数名字来识别对象的类的做法和使用constructor属性一样有一个问题：并不是所有的对象都具有constructor
 * 属性。此外，并不是所有的函数都有名字。如果使用不带名字的函数定义表达式定义一个构造函数，getName()方法则会返回空
 * 字符串：
 * var Complex = function(x, y){thihs.r = x; this.i = y}
 * 
 * var Range = function Range(f, t){this.from = f; this.to = t}
 * 
 * 9.5.4 鸭式辩型
 * 
 * 上文所描述的检测对象的类的各种技术多少都会有些问题，至少在客户端js中是如此。解决办法就是规避这些问题：不要关注
 * “对象的类是什么”，而是关注“对象能做什么”。这种思考问题的方式在Python和Ruby中非常普遍，称为“鸭式辩型”
 * 
 * 像鸭子一样走路、游泳兵器嘎嘎叫的鸟就是鸭子。
 * 
 * 对于js程序员来说，这句话可以理解为“如果一个对象可以向鸭子一样走路、游泳并且嘎嘎叫，就认为这个对象是鸭子，哪怕他
 * 并不是从鸭子类的原型对象继承而来的”
 * 
 * 我们拿例9-2中的Range类来举例好了。期初定义这个类用以描述数字的范围。但要注意，Range()构造函数并没有对实参进行
 * 类型检查以确保实参是数字类型。但却将参数使用“>”运算符进行比较运算，因为这里假定它们是可比较的。同样，includes()
 * 方法使用"<="运算符进行比较，但没有对范围的结束点进行类似的假设。因为类并没有强制使用特定的类型，它的includes()
 * 方法可以作用于任何结束点，只要结束点可以用关系运算符执行比较运算。
 * 
 *function Range(from, to){
    this.from = from;
    this.to = to;
  }

  Range.prototype = {
    includes:function(x){return this.from <= x && x <= this.to},
    foreach:function(f){
      for(var x = Math.ceil(this.from); x <= this.to; x++) f(x)
    },
    toString:function(){return '(' + this.from + '...' + this.to + ')'}
  }
 * 
 * 
 * var lowercase = new Range("a", "z")
 * var thisYear = new Range(new Date(2009, 0 1), new Date(2010, 0, 1))
 * 
 * Range类的foreach()方法中也没有显示地检测标识范围的结束点的类型，但Math.ceil()和"++"运算符表明它只能对数字结束点
 * 进行操作。
 * 
 * 另外一个例子，回想一下7.11节中所讨论的类数组对象。在很多场景下，我们并不知道一个对象是否真的是Array的实例，当然
 * 可以通过判定是否包含非负的length属性来得知是否是Array的实例。我们说“包含一个值得非负整数的length”是数组的一个特征
 * ---“会走路”，任何具有“会走路”这个特征的对象都可以当做数组来对待（在很多情形中）。
 * 
 * 然而必须要了解的是，正在数组的length属性有一些独有的行为：当添加新的元素时数组的长度会自动更新，并且当给Length
 * 属性这只一个更小的整数时，数组会被自动截断。我们说这些特征是“会游泳”和“嘎嘎叫”。如果所实现的代码需要“会游泳”且
 * 能“嘎嘎叫”，则不能使用只“会走路”的类似数组对象 。
 * 
 * 上文所讲到的鸭式辩型的例子提到了进行对象的“<”运算符的职责以及length属性的特殊行为。但当我们提到鸭式辩型时，往往
 * 是说检测对象是否实现了一个或多个方法。一个强类型的triathlon()函数所需要的参数必须是TriAthlete对象。而一种“鸭式
 * 辩型”式的做法是，只要对象包含walk()、swim()、和bike()这三个方法就可以作为参数传入。同理，可以重新设计Range类，
 * 使用结束对象的compareTo()和succ()方法来代替“<”和“++”运算符。
 * 
 * 鸭式辩型的实现让人感觉太“放任自流”：仅仅是假设输入对象实现了必要的方法，根本没有执行进一步的检查。如果输入对象没有
 * 遵循“假设”，那么当代码试图调用那些不存在的方法时就会报错。另一种实现方法时对输入对象进行检查。但不是检查他们的类，
 * 而是用适当的名字来检查他们所实现的方法。这样可以将非法输入尽可能早地拦截在外，并可给出带有跟多提示信息的报错。
 * 
 * 例9-5中按鸭式辩型的理念定义了quacks()函数。quack()用以检查一个对象是否实现了身下的从参数所表示的方法。对于除第
 * 一个参数外的每个参数，如果是字符串的话则直接检查是否存在它的命名的方法；如果是对象的话则检查第一个对象中的方法
 * 是否在这个对象中也具有同名的方法；如果参数是函数，则假定它是构造函数，函数将检查第一个对象实现的方法是否在构造函数
 * 的原型对象中也具有同名的方法。
 * 
 * //如果o实现了除第一个参数之外的参数所表示的方法，则返回true
 * function quacks(o){
 *    for(var i = 1; i < arguments.length; i++){
 *       var arg = arguments[i]
 *       switch(typeof arg){
 *          case 'string':
 *            if(typeof o[arg] !== 'function') return false;
 *            continue;
 *          case 'function':
 *            arg = arg.prototype;
 *          case 'object':
 *            for(var m in arg){
 *              if(typeof arg[m] !== 'function') continue;
 *              if(typeof o[m] == 'function') return false;
 *            }
 *       }
 *    }
 *     return true;
 * }
 * 
 * 关于这个quacks()函数还有一些地方是需要尤为注意的。首先，这里只是通过特定的名称来检测对象是否含有一个或多个值为
 * 函数的属性。我们无法得知这些已经存在的属性的细节信息，比如，函数是干什么用的？他们需要多少参数？参数类型是什么？
 * 然而这时鸭式辩型的本质 所在，如果使用鸭式辩型而不是强制的类型检测的方式定义API，那么创建的API应当更具利灵活性
 * 才可以，这样才能确保你提供给用户的API更加安全可靠。关于quacks()函数还有另有一问题需要注意，就是他不能应用于内置
 * 类。比如，不能通过quacks(o, Array)来检测o是否实现了Array中所有同名的方法。原因是内之类的方法都是不可枚举的，quacks()
 * 中的for/in循环无法遍历到他们（注意，在ECMAScript5中哟一个不就方法，就是使用Object.getOwnPropertyNames()）
 * 
 * 9.6 js中的面向对象技术
 * 
 * 到目前为止，我们讨论了js中类的基础知识：原型对象的重要性、它和构造函数之间的联系、instanceof运算符如何工作等。
 * 本节将目光转向一些实际的例子（尽管这不是基础知识），包括如何利用js中的类进行编程。
 * 
 * 9.6.1 一个例子：集合类
 * 
 * 集合（set）是一种数据结构，用以表示非重复值的无序集合。集合的基础方法包括添加值、检测值是否在集合中，这种集合
 * 需要一种通用的实现，以保证效率。js的对象是属性名以及与之对应的值得基本集合。因此将对象只用作字符串的集合是大材
 * 小用。例9-6用js实现了一个更加通用的Set类，它实现了从js值到唯一字符串的映射，然后将字符串用作属性名。对象和函数
 * 都不具备如此简明可靠的唯一字符串标识。
 * 
 */       

function Set(){
  this.values = {}
  this.n = 0
  this.add.apply(this, arguments)
}

Set.prototype.add = function(){
  for(var i = 0; i < arguments.length; i++){
    var val = arguments[i]
    var str = Set._v2s(val)
    if(!this.values.hasOwnProperty(str)){
      this.values[str] = val;
      this.n++;
    }
  }
  return this;    //支持链式方法调用
}

Set.prototype.remove = function(){
  for(var i = 0; i < arguments.length; i++){
    var str = Set._v2s(arguments[i])
    if(this.values.hasOwnProperty(str)){
      delete this.values[str];
      this.n--;
    }
  }
  return this;
}

Set.prototype.contains = function(value){
  return this.values.hasOwnProperty(Set._v2s(value))
}

Set.prototype.size = function(){
  return this.n;
}

Set.prototype.foreach = function(f, context){
  for(var s in this.values){
    if(this.values.hasOwnProperty(s))
    f.call(context, this.values[s])
  }
}

Set._v2s = function(val){
  switch(val){
    case undefined:     return 'u';
    case null:          return 'n';
    case true:          return 't';
    case false:         return 'f';
    default:switch(typeof val){
      case 'number':  return '#' + val;
      case 'string':  return '"' + val;
      default: return '@' + objectId(val)
    }

    function objectId(o){
      var prop = '|**objectid**|'
      if(!o.hasOwnProperty(prop))
        o[prop] = Set._v2s.next++;
      return o[prop]
    }

  }
}

Set._v2s.next = 100;


/**
 * 9.6.2 一个例子：枚举类型
 * 
 * 枚举类型（enumerated type）是一种类型，它是值得有限集合，如果定义为这个类型则该值是可
 * 列出（或“可枚举”）的。在C及其拍摄语言中，枚举类是通过关键字enum声明的。Enum是ECMAScript5
 * 中的保留字（还未使用），很有可能在将来js就会内置支持枚举类型。到那时，例9-7展示了如何在
 * js中定义枚举类型的数据。需要注意的是，这里用到了例6-1中的inherit()函数。
 * 
 * 例9-7包含一个单独函数enumeration()。但他不是构造函数，它并没有定义一个名叫“enumeration”
 * 的类。相反，他是一个工厂方法，每次调用它都会创建并返回一个新的类型，比如：
 * 
 * var Coin = enumeration({Penny:1, Nickel:5, Dime:10, Quarter:25})
 * var c = Coin.Dime;
 * c instanceof Coin
 * c.constructor = Coin
 * Coin.Quarter + 3*Coin.Nickel
 * Coin.Dime == 10
 * Coin.Dime > Coin.Nickel
 * String(Coin.Dime) + ":" + Coin.Dime
 * 
 * 
 */

function inherit(o){
  if(Object.create)
    return Object.create(o)
  
  function f(){}
  f.prototype = o
  return new f();
}

function enumeration(namesToValues){
  var enumeration = function(){throw "Can't Instantiate Enumerations"}

  var proto = enumeration.prototype = {
    constructor:enumeration,
    toString:function(){return this.name},
    valueOf:function(){return this.value},
    toJSON:function(){return this.name}
  }

  enumeration.values = []

  for(name in namesToValues){
    var e = inherit(proto)
    e.name = name;
    e.value = namesToValues[name]
    enumeration[name] = e;
    enumeration.values.push(e)
  }

  enumeration.foreach = function(f, c){
    for(var i = 0; i < this.values.length; i++) f.call(c, this.values[i])
  }
  return enumeration;
}

var Coin = enumeration({Penny:1, Nickel:5, Dime:10, Quarter:25})

//使用枚举类型来表示一副扑克牌

function Card(suit, rank){
  this.suit = suit;     //花色
  this.rank = rank;     //点数
}

Card.Suit = enumeration({Clubs:1, Diamonds:2, Hearts:3, Spades:4})
Card.Rank = enumeration({
  Two:2, Three:3, Four:4, Five:5, Six:6,
  Seven:7, Eight:8, Nine:9, Ten:10,
  Jack:11, Queen:12, King:13, Ace:14
})

//定义用以描述牌面的文本
Card.prototype.toString = function(){
  return this.rank.toString() + ' of ' + this.suit.toString();
}

//比较扑克牌中两张牌的大小
Card.prototype.compareTo = function(that){
  if(this.rank < that.rank) return -1;
  if(this.rank > that.rank) return 1;
  return 0;
}

//以扑克牌的玩法规则对牌进行排序的函数
Card.orderByRank = function(a, b){return a.compareTo(b)}

//以桥牌的玩法规则对扑克牌进行排序的函数
Card.orderBySuit = function(a, b){
  if(a.suit < b.suit) return -1;
  if(a.suit > b.suit) return 1;
  if(a.rank < b.rank) return -1;
  if(a.rank > b.rank) return 1;
  return 0;
}

//第一一副标准的扑克牌
function Deck(){
  var cards = this.cards = []
  Card.Suit.foreach(function(s){
    Card.Rank.foreach(function(r){
      cards.push(new Card(s, r))
    })
  })
}

//洗牌的方法：重新洗牌并返回洗好的牌
Deck.prototype.shuffle = function(){
  var deck = this.cards, len = deck.length;
  for(var i = len - 1; i > 0; i--){
    var r = Math.floor(Math.random() * (i + 1)), temp;
    temp = deck[i],
    deck[i] = deck[r];
    deck[r] = temp;
  }
  return this;
}

//发牌
Deck.prototype.deal = function(n){
  if(this.cards.length < n) throw 'Out of cards';
  return this.cards.splice(this.cards.length - n, n);
}

var deck = (new Deck()).shuffle()
var hand = deck.deal(13).sort(Card.orderBySuit)

/**
 * 9.6.3 标准转换方法
 * 
 * 3.8.3和6.10节讨论了对象类型转换所用到的重要方法，有一些方法是在需要所类型转换时由js解释
 * 器自动调用的。不需要为定义的每个类都实现这些方法，但这些方法都非常重要，如果没有为自定义
 * 的类实现这些方法，也应当是有意为之，而不应当因为疏忽而漏掉了他们。
 * 
 * 最重要的方法首先当toString()。这个方法的作用是返回一个可以表示一个对象的字符串，在希望
 * 使用字符串的地方用到对象的话（比如将对象用作属性名或使用“+”运算符来进行字符串连接运算），
 * js会自动调用这个方法。如果没有实现这个方法，类会默认从Object.prototype中继承toString()
 * 方法，这个方法的运算结果是“[object Object]”，这个字符串用处不大，toString()方法应当返回
 * 一个可读的字符串，这样最终用户才能将这个输出值利用起来，然而有时候并不一定非要如此，不管
 * 怎样，可以返回可读字符串的toString()方法也会让程序调试变得更加轻松。例9-7中的枚举类型也
 * 定义了toString()。下面我们会给例9-6中的Set类也定义toString()方法。
 * 
 * toLocaleString()和toString()极为类似：toLocaleString()是以贝蒂敏感性(locale-sensitive)
 * 的方式来讲对象转换为字符串。默认情况下，对象所继承的toLocaleString()方法只是简单地调用
 * toString()方法。有一些内置类型包含有用的toLocaleString()方法用以实际上返回本地化相关的
 * 字符串。如果需要为对象到字符串的转换定义toString()方法，那么同样需要定义toLocaleString()
 * 方法用以处理本地化的对象到字符串的转换。下面的Set类的定义中会有相关代码。
 * 
 * 第三个方法是valueOf(),它用来将对象转换为原始值。比如，当数学运算符（除了“+”运算符）和关系
 * 运算符作用于数字文本标识的对象时，会自动调用valueOf()方法。大多数对象都没有合适的原始值
 * 来表示他们，也没有定义这个方法。但在例9-7中的枚举类型的实现则说明valueOf()方法是非常重要的。
 * 
 * 第四个方法是toJSON(),这个方法是由JSON.stringify()自动调用的。JSON格式用于序列化良好的数据
 * 结构，而且可以处理js原始值、数组和纯对象。它和类无关，当对一个对象执行序列化操作时，它会
 * 忽略对象的原型和构造函数。比如将Range对象或Complex对象作为参数传入JSON.stringify()，将
 * 会返回诸如{'from':1, 'to', 3}或{'r':1, 'i':-1}这种字符串。如果将这些字符串传入JSON.parse()
 * 则会得到一个和Range对象和Complex对象具有相同属性的纯对象，但这个对象不会包含从Range和
 * Complex继承来的方法。
 * 
 * 这种序列化操作非常适用于诸如Range和Complex这种类，但对于其他一些类则必须自定义toJSON()方法来定制个性化的序列化
 * 格式。如果一个对象有toJSON()方法，JSON.stringify()并不会对传入的对象做序列化操作，而会调用toJSON()来执行
 * 序列化操作（序列化的值可能是原始值也可能是对象）。比如Date对象的toJSON()方法可以返回一个表示日期的字符串。
 * 例9-7中的枚举类型也是如此：他们的toJSON()方法和toString()方法完全一样。如果要模拟一个集合，最接近JSON的表示
 * 方法就是数组，因此在下面的例子中将定义toJSON()方法用以将集合对象转换为值数组。
 * 
 * extend(Set.prototype, {
 *    toString:function(){
 *      var s = "{",
 *          i = 0;
 *      this.foreach(function(v){s +=((i++>0) ? ", " : "") + v;})
 *      return s + "}"
 *    },
 *    toLocaleString:function(){
 *      var s = "{",
 *          i = 0;
 *      this.foreach(function(v){
 *        if(i ++ > 0) s += ", ";
 *        if(v == null) s += v;
 *        else s += v.toLocaleString()
 *      })
 *      return s + "}"
 *    },
 *    toArray:function(){
 *      var a = []
 *      this.foreach(function(v){a.push(v)})
 *      return a;
 *    }
 * })
 * 
 * Set.prototype.toJSON = Set.prototype.toArray;
 * 
 * 9.6.4 比较方法
 * 
 * js的相等运算符比较对象时，比较的是引用而不是值。也就是说，给定两个对象引用，如果要看他们是否指向同一个对象，
 * 不是检查这两个对象是否具有相同的属性名和相同的属性值，而是直接比较这两个单独的对象是否相等，或者比较他们的属性。
 * 如果定义一个类，并且希望比较类的实例，应该定义合适的方法来执行比较操作。
 * 
 * java编程语言有很多用于对象比较的方法，将java中的这些方法借用到js中是一个不错的注意。为了能让自定义类的实例具有
 * 比较功能，定义一个叫equals()实例方法。这个方法只能接受一个实参，如果这个实参和调用此方法的对象相等的话则返回
 * true。当然，这里所说的“相等”的含义是根据类的上下文来决定的。对于简单的类可以通过简单地比较他们的constructor属性
 * 来确保两个对象是相同类型，然后比较两个对象实例属性以保证他们的值相等。例9-3中的Complex类就实现了这样的equals()
 * 方法，我们可以轻易地为Range类也实现类似的方法；
 * 
 * Range.prototype.constructor = Range
 * 
 * Range.prototype.equals = function(that){
 *    if(that == null) return false;
 *    if(that.constructor !== Range) return false;
 *    return this.from == that.from && this.to == that.to
 * }
 * 
 * Set.prototype.equals = function(that){
 *    if(this === that) return true;
 * 
 *    if(!(that instanceof Set)) return false
 * 
 *    if(this.size() != that.size()) return false
 * 
 *    try{
 *      this.foreach(function(v){if(!that.contains(v)) throw false})
 *      return true;
 *    }catch(x){
 *      if(x === false) return false
 *      throw x
 *    }
 * }
 * 
 * 按照我们需要的方式比较对象是否相等常常是很有用的。对于某个类来说，往往需要比较一个实例“大于”或者“小于”另外一个示例
 * 比如，你可能会基于Range对象的下边界来定义实例的大小关系。枚举类型可以根据名字的字母表顺序来定义实例的大小，也可以
 * 根据它包含的数值（假定它包含的都是数字）。另一方面，Set对象其实无法排序的。
 * 如果将对象用于js的关系比较运算符，比如‘<’和‘<=’，js会首先调用对象的valueOf()方法，如果这个方法返回一个原始值，
 * 则直接比较原始值。例9-7中由enumeration()方法所返回的枚举类型包含valueOf()方法，因此可以使用关系运算符对他们
 * 做有意义的比较。但大多数类并没有valueOf()方法，为了按照现实定义的规则来比较这些类型的对象，可以定义一个名叫
 * compareTo()的方法(同样，这里遵照java的命名约定)
 * 
 * compareTo()方法应当只能接受一个参数，这个方法将这个参数和调用它的对象进行比较。如果this对象小于参数对象，
 * compareTo()应当返回比0小的值。如果this对象大于参数对象，应当返回比0大的值。如果两个对象相等，应当返回0.这些
 * 关于返回值的约定非常重要，这样我们可以用下面的表达式替换调用关系比较和相等性运算符：
 * 
 * a < b        a.compareTo(b) < 0
 * 
 * Range.prototype.compareTo = function(that){
 *    return this.from - that.from;
 * }
 * 
 * 需要注意的是，这个方法中的减法操作根据两个Range对象的关系正确地返回了小于0、等于0和大于0的值。
 * 
 * 上文所提到的equals()方法对其参数执行了类型检查，如果参数类型不符合则返回false。compareTo()方法并没有返回一个
 * 表示“这两个值不能比较”的值，由于compareTo()没有对参数做任何类型检查，因此如果给compareTo()方法传入错误类型的
 * 参数，往往会抛出异常。
 * 
 * Range.prototype.compareTo = function(that){
 *    if(!(that instanceof Range))
 *      throw new Error("Can't compare a Range with " + that)
 * 
 *    var diff = this.from - that.from
 *    if(diff == 0) diff = this.to - that.to
 *    return diff
 * }
 * 
 * 9.6.5 方法借用
 * 
 * js中的方法没有什么特别：无非是一些简单的函数，赋值给了对象的属性，可以通过对象来调用它。一个函数可以赋值给两个
 * 属性，然后作为两个方法来调用它。比如，我们在Set类中就这样做了，将toArray()方法创建了一个副本，并让它可以和toJSON
 * 方法一样完成同样的功能。
 * 
 * 多个类中的方法可以共用一个单独的函数。比如，Array类通常定义了一些内置方法，如果定义了一个类，它的实例是类数组的
 * 对象，则可以从Array.prototype中将函数复制至所定义的类的原型对象中。如果以经典的面向对象语言的视角来看js的话，吧
 * 一个类的方法用到其他的类中的做法也称作“多重继承”。然而，js并不是经典的面向对象语言，我更倾向于将这种方法重用更
 * 正式地称为“方法借用”。
 * 
 * 不仅Array的方法可以借用，还可以自定义泛型方法。例9-9定义了泛型方法toString()和equals()，可以被Range、Complex和
 * Card这些简单的类使用。如果Range没有定义equals()方法，可以这样借用泛型方法equals()
 * 
 * Range.prototype.equals = generic.equals;
 * 
 * 注意，generic.equals()只会执行浅比较，因此这个方法并不适用于其实例太复杂的类，他们的实例属性通过其equals()方法
 * 指代对象。同样需要注意，这个方法包含一些特殊情况的程序逻辑，以处理新增至Set对象中的属性。
 * 
 * var generic = {
 *    toString:function(){
 *      var s = '[';
 *      if(this.constructor && this.constructor.name)
 *        s += this.constructor.name + ': '
 * 
 *      var n = 0
 *      for(var name in this){
 *        if(!this.hasOwnProperty(name)) continue;
 *        var value = this[name]
 *        if(typeof value === 'function') continue;
 *        if(n++) s += ', '
 *        s += name + '=' + value
 *      }
 *      return s + ']'
 *    },
 *    equals:function(that){
 *      if(that == null) return false;
 *      if(this.constructor !== that.constructor) return false;
 *      for(var name in this){
 *        if(name === '|**objectid**|') continue;
 *        if(!this.hasOwnProperty(name)) continue;
 *        if(this[name] !== that[name]) return false
 *      }
 *      return true
 *    }
 * }
 * 
 * 9.9.6 私有状态
 * 
 * 在经典的面向对象编程中，经常需要将对象的某个状态封装或隐藏在对象内，只有通过对象的方法才能访问这些状态，对外
 * 只暴露一些重要的状态变量可以直接读写。为了实现这个目的，类似java的编程语言允许声明类的“私有”实例字段，这些私有
 * 实例字段只能被类的实例方法访问，且在类的外部是不可见的。
 * 
 * 我们可以通过将变量（或参数）闭包在一个构造函数内来模拟实现私有实例字段，调用构造函数会创建一个实例。为了做到
 * 这一点，需要在构造函数内部定义一个函数（因此这个函数可以访问构造函数内部的参数和变量），并将这个函数赋值给新
 * 创建对象的属性。例9-10展示了对Range类的另一种封装，新版本的类的实例包含from()和to()方法用以范围的端点，而不是
 * 用from和to属性来获取端点。这里的from()和to()方法是定义在每个Range对象上的，比如不是从原型中继承来的。其他的
 * Range方法还是和之前一样定义在原型中，但获取端点的方法从之前直接从属性读取变成了通过from()和to()方法来读取。
 * 
 * function Range(from, to){
 *    this.from = function(){return from}
 *    this.to = function(){return to}
 * }
 * 
 * Range.prototype = {
 *    constructor:Range,
 *    includes:function(x){return this.from() <= x && x <= this.to()},
 *    foreach:function(f){
 *      for(var x = Math.ceil(this.from()), max = this.to(); x <= max; x++) f(x)
 *    },
 *    toString:function(){return "(" + this.from() + "..." + this.to() + ")"}
 * }
 * 
 * 这个新的Range类定义了 用以读取范围端点的方法，但没有定义这只端点的方法或属性。这让类的实例看起来是不可修改的。
 * 如果使用正确的话，一旦创建Range对象，端点数据就不可修改了。除非使用ECMAScript5中的某些特性，但from和to属性
 * 依然是可写的，并且Range对象实际上并不是真正不可修改的：
 * 
 * var r = new Range(1, 5)
 * r.from = function(){return 0;}
 * 
 * 但需要注意的是，这种封装技术造成了更多系统开销。使用闭包来封装类的状态的类一定会比不适用封装的状态变量的等价
 * 类运行速度更慢，并占用更多内存。
 * 
 * 9.6.7 构造函数的重载和工厂方法
 * 
 * 有时候，我们希望对象的初始化有多种方式。比如，我们想通过半径和角度（极坐标）来初始化一个Complex对象，而不是
 * 通过实部和虚部来初始化，或者通过元素组成的数组来初始化一个Set对象，而不是通过传入构造函数的参数来初始化它。
 * 
 * 有一个方法可以实现，通过重载(overload)这个构造函数让它根据传入参数的不同来执行不同的初始化方法。下面这段代码
 * 就是重载Set()构造函数的例子：
 * 
 * function Set(){
 *    this.values = {}
 *    this.n = 0;
 * 
 *    if(arguments.length == 1 && isArrayLike(arguments[0]))
 *      this.add.apply(this, arguments[0])
 *    else if(arguments.length > 0)
 *      this.add.apply(this, arguments)
 * }
 * 
 */