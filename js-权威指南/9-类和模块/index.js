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
 */