/**
 * 数组是值得有序集合。每个值叫做一个元素，而每个元素在数组中有一个位置，以数字表示，称为索引。js数组
 * 是无类型的：数组元素可以是任意类型，并且同一个数组中的不同元素也可能有不同的类型。数组的元素甚至
 * 也可能是对象或其他数组，这允许创建复杂的数据结构，如对象的数组和数组的数组。js数组的索引是基于零
 * 的32位数值：第一个元素的索引为0，最大可能的索引为4 294 967 294 （2^32 - 2），数组最大能容纳
 * 4294969295个元素。js数组是动态的：根据需要他们会增长或缩减并且在创建数组时无需声明一个固定的大小
 * 或者在数组大小变化时无需重新分配空间。js数组可能是稀疏的：数组元素的索引不一定要连续的，他们之间
 * 可以有空缺。每个js数组有一个length属性。针对非稀疏数组，该属性就是数组元素的个数。针对稀疏数组，
 * length比所有元素的索引要大
 * 
 * js数组是js对象的特殊形式，数组索引时间上和碰巧是整数的属性名差不多。我们将在本章的其他地方更多地
 * 讨论特殊化的数组。通常，数组的时间是经过优化的，用数字索引来访问数组元素一般来说比访问常规的对象
 * 属性要快很多
 * 
 * 数组继承自Array.prototype中的属性，它定义了一套丰富的数组操作方法，大多数这些方法是通用的，这
 * 意味着他们不仅对真正的数组有效，而且对'类数组对象'同样有效
 * 
 * 7.1创建数组
 * 
 * 使用数组直接量是创建数组最简单的方法，在方括号中将数组用逗号隔开即可。
 * 例如：
 * var empty = []                 //没有元素的数组
 * var primes = [2, 3, 5, 7, 11]  //有5个数值的数组
 * var misc = [1.1, true, 'a', ]  //有三个不同类型的元素和结尾的逗号
 * 
 * 数组直接量中的值不一定要是常量；他们可以是任意的表达式
 * 
 * var base = 1024
 * var table = [base, base+1, base+2, base+3]
 * 
 * 它可以包含对象直接量或其他数组直接量：
 * var b = [[1, {x:1, y:2}], [2, {x:3, y:4}]]
 * 
 * 如果省略数组直接量中的某个值，省略的元素将被赋予undefined值
 * 
 * var count = [1, , 3] //数组有3个元素，中间的那个元素值为undefined
 * var undefs = [, ,]   //数组有2个元素，都是undefined
 * 
 * 数组直接量的语法允许有可选的结尾的逗号，故[,,]只有两个元素而非三个元素
 * 调用构造函数Array()是创建数组的另一种方法。可以用三种方式调用构造函数。
 * 
 * 调用时没有参数
 * var a = new Array()
 * 该方法创建一个没有任何元素的空数组，等同于数组直接量[]。
 * 
 * 调用时有一个数组参数，它指定长度
 * var a = new Array(10)
 * 该技术创建指定长度的数组。当预先知道所需元素的个数时，这种形式的Array()构造函数可以用来分配一个
 * 数组看空间。注意，数组中没有存储值，甚至数组的索引属性'0'、'1'等还未定义。
 * 显式指定两个或者多个数组元素或者数组的一个非数值元素
 * var a = new Array(5, 4, 3, 2, 1, 'testing, testing')
 * 
 * 以这种形式，构造函数的参数将会成为新数组的元素。使用数组字面量比这样使用Array()构造函数要简单多了。
 * 
 * 7.2数组元素的读和写
 * 
 * 使用[]操作符来访问数组中的一个元素。数组的引用位于方括号的左边，方括号中是一个返回非负整数值的任意
 * 表达式。使用该语法既可以读又可以写数组的一个元素。因此，如下代码都是合法的js语句
 * 
 * var a = ['world']    //从一个元素的数组开始
 * var value = a[0]     //读第0个元素
 * a[1] = 3.14          //写第一个元素
 * i= 2
 * a[i] = 3             //写第2个元素
 * a[i +1] = 'hello'    //写第三个元素
 * a[a[i]] = a[0]       //读第0个和第二个元素，写第3个元素
 * 
 * 请记住，数组是对象的特殊新式。使用方括号访问数组元素就像用方括号访问对象的属性一样。js将指定的
 * 数组索引转换成字符串----索引值1变成'1'----然后将其作为属性名来使用。关于索引值从数字转换为字符串没
 * 什么特别之处；对常规对象也可以这么做；
 * 
 * o = {}           //创建一个普通的对象
 * o[1] = 'one'     //用一个整数来索引它
 * 
 * 数组的特别之处在于，当使用小于2^32的非负数作为属性名时数组会自动维护其length属性值。如上，创建
 * 仅有一个元素的数组。然后在索引1、2和3处分别进行赋值。当我们这么做时数组的length属性值变为：
 * 
 * a.length         // => 4
 * 
 * 清晰区分分数数组的所有和对象的属性名时非常有用的。所有的索引都是属性名，但只有在0~2^32-2之间的
 * 整数属性名才是索引。所有的数组都是对象，可以为其创建任意名字的属性。但如果使用的属性是数组的索引
 * 数组的特殊行为就是将根据需要更新他们的length属性值。
 * 
 * 注意，可以使用负数或非整数来索引数组。这种情况下，数值转换为字符串，字符串作为属性名来用。既然
 * 名字不是非负数，他就只能当做常规的对象属性，而非数组的索引。同样，如果凑巧使用了是非负数的字符串
 * 它就当做数组索引，而非对象属性。当使用的一个浮点数和一个整数相同时情况也是一样的
 * 
 * a[-1.23] = true    //浙江创建一个名为'-1.23'的属性
 * a['1000'] = 0      //这是数组的第1001个元素
 * a[1.000]           //和a[1]相等
 * 
 * 事实上数组索引仅仅是对象属性名的一种特殊类型，这以为这js数组没有‘越界’错误带概念。当试图查询任何
 * 对象中不存在的属性时，不会报错，只会得到undefined值。类似于对象，对于对象同样存在这种情况。
 * 
 * 既然数组是对象，那么他们可以从原型中继承元素。在ECMAScript5中，数组可以定义元素的getter和setter
 * 方法，你应该期望它使用非优化代码路径：访问这种数组的元素的时间会与常规对象属性的查找时间相近。
 * 
 * 7.3 稀疏数组
 * 
 * 稀疏数组就是包含从0开始的不连续索引的数组。通常，数组的length属性代表数组中元素的个数。如果数组是
 * 稀疏的，length属性值大于元素的个数。可以用Array()构造函数或简单地指定数组的索引值大于当前的数组
 * 长度来创建稀疏数组。
 * 
 * a = new Array(5)   //数组没有元素， 但是a.length是5
 * a = []             //创建一个空数组，length = 0
 * a[1000] = 0        //赋值添加一个元素，但是设置length为1001
 * 
 * 后面会看到你也可以用delete操作符来产生稀疏数组。
 * 
 * 足够稀疏的数组通常在实现上比稠密的数组更慢、内存利用率更高，在这样的数组中查找元素的时间与常规
 * 对象属性的查找时间一样长。
 * 
 * 注意。当在数组直接量中省略值时不会创建稀疏数组。省略的元素在数组中是存在的，其值为undefined。
 * 这和数组元素根本不存在是有一些微妙的区别的。可以用in操作符检测两者之间的区别
 * 
 * var a1 = [,,,]   //数组是[undefined, undefined, undefined,]    ---- chrome 测试与结果不符
 * var a2 = new Array(3)  //该数组根本没有元素
 * 0 in a1    //true  a1在索引0处有一个元素 ---- chrome 测试与结果不符
 * 0 in a2    //false a2在索引0处没有元素
 * 
 * 需要注意的是，当省略数组直接量中的值时（使用连续的逗号，比如[1,,3]），这时所得到的数组也是稀疏
 * 数组，省略掉的值是不存在的
 * 
 * var a1 = [,]           //此数组没有元素，长度是1
 * var a2 = [undefined]   //此数组包含一个值为undefined的元素
 * 
 * 0 in a1        //false a1在索引0处没有元素
 * 0 in a2        //true  a2在索引0处有一个值为undefined的元素
 * 
 * 
 * 在一些旧版本的实现中，在存在连续逗号的情况下，插入undefined值得操作则与此不同，在这些实现中，
 * [1,,3]和[1,undefined,3]是一模一样的。
 * 了解稀疏数组是了解js数组的真实本质的一部分。尽管如此，实际上你所碰到的绝大多数js数组不是稀疏数组
 * 并且，如果你确实碰到了稀疏数组，你的代码很可能像对待非稀疏数组一样来对待他们，只不过他们包含一些
 * undefined值。
 * 
 * 7.4 数组长度
 * 
 * 每个数组有一个length属性，就是这个属性使其区别于常规的js对象。针对稠密（也就是非稀疏）数组，length
 * 熟悉值代表数组中元素的个数。其值比数组中最大的索引大1：
 * [].length                //0：数组没有元素
 * ['a', 'b', 'c'].length   //3：最大的索引为2，length为3
 * 
 * 当数组是稀疏的时，length属性值大于元素的个数。而且关于此我们可以说的一切也就是数组长度保证大于
 * 每个元素的索引值。或者，换一种说法，在数组中（无论稀疏与否）肯定找不到一个元素的索引值大于或等于
 * 它的长度。为了维持此规则不变化，数组有两个特殊的行为。第一个如同上面的描述：如果为一个数组元素
 * 赋值他的索引i大于或等于现有数组的长度时，length属性的值将设置为i+1
 * 
 * 第二个特殊的行为就是设置length属性为一个小于当前长度的非负整数n时，当前数组中那些索引值大于或
 * 等于n的元素将从中删除
 * 
 * a = [1,2,3,4,5]      //从5个元素的数组开始
 * a.length = 3;        //现在a为[1,2,3]
 * a.legnth = 0;        //删除所有的元素。a为[]
 * a.legnth = 5;        //长度为5，但是没有元素，就像new Array(5)
 * 
 * 还可以将数组的length属性值设置为大于其当前的长度。实际上这不会向数组中添加新元素，它只是在数组
 * 尾部创建一个空的区域。
 * 
 * 在ECMAScript5中，可以用Object.defineProperty()让数组的length属性变成只读的
 * a = [1, 2, 3]                                          //从3个元素的数组开始
 * Object.defineProperty(a, 'length', {writable:false})   //上length属性只读
 * a.length = 0                                           //a不会改变
 * 
 * 类似地，如果让一个数组元素不能配置，就不能删除它。如果不能删除它，length属性不能设置为小于不可
 * 配置元素的索引值。
 * 
 * 7.5 数组元素的添加和删除
 * 
 * 我们已经见过添加数组元素最简单的方法：为新索引赋值
 * a = []       //开始是一个空数组
 * a[0] = 'zero'//然后像其中添加元素
 * a[1] = 'one'
 * 
 * 也可以使用push()方法在数组末尾则加一个或多个元素
 * a = []                 //开始是一个空数组
 * a.push('zero')         //在末尾添加一个元素。a = ['zero']
 * a.push('one', 'two')   //再添加两个元素。a = ['zero', 'one', 'two']
 * 
 * 在数组尾部压入一个元素与给定数组a[a.length]赋值是一样的。可以使用unshift()方法在数组的首部插入
 * 一个元素，并且将其他元素依次移到更高的索引处。
 * 
 * 可以像删除对象属性一样使用delete运算符来删除数组元素
 * a = [1,2,3]
 * delete a[1]    //a在索引1的位置不再有元素
 * 1 in a         //false 数组索引1并未在数组中定义
 * a.length       //3 delete操作并不影响数组长度
 * 
 * 删除数组元素与为其赋undefined值时类似的（但有一些微妙的区别）。注意，对一个数组元素使用delete
 * 不会修改数组的length属性，也不会将元素从高索引处移下来填充已删除属性留下的空白。如果从数组中删除
 * 一个元素，他就变成稀疏数组。
 * 上面我们看到，也可以简单地设置length属性为一个新的期望长度来删除数组尾部的元素。数组由pop()方法
 * （它和push()一起使用），后者一次使减少长度1并返回被删除元素的值。患有一个shift()方法（它和unshift()
 * 一起使用），从数组都不删除一个元素。和delete不同的是shift()方法将所有元素下移到比当前索引更低
 * 1的地方。
 * 最后，splice()是一个通用的方法来插入、删除或替换数组元素。它会更具需要修改length属性并移动元素
 * 到更高或较低的索引处
 * 
 * 7.6数组遍历
 * 
 * 使用for循环是遍历数组元素最常见的方法：
 * 
 * var keys = Object.keys(o);   //获得o对象属性名组成的数组
 * var values = []              //在数组中存储匹配属性的值
 * for(var i = 0; i < keys.length; i++){    //对于数组中每个索引
 *  var key = keys[i]           //获得索引处的键值
 *  values[i] = o[key];         //在values数组中保存属性值
 * }
 * 在镶嵌循环或其他性能非常重要的上下文中，可以看到这种基本的数组遍历需要优化，数组的长度应该只查询
 * 一次而非每次都要循环
 * 
 * for(var i = 0, len = keys.length; i < len; i++){
 *    //循环体任然不变
 * }
 * 
 * 这些例子假如数组是稠密的，并且所有的元素都是合法数据。否则 ，使用数组元素之前应该检测他们。如果
 * 想要排除null、undefined和不存在的元素，代码如下：
 * 
 * for(var i = 0; i < a.length; i++){
 *    if(!a[i]) continue;   //跳过null、undefined和bu存在的元素
 *    //循环体
 * }
 * 
 * 如果指向跳过undefined和不存在的元素,代码如下：
 * for(var i = 0; i < a.length; i++){
 *    if(a[i] === undefined) continue;  //跳过undefined+不存在的元素
 *    //循环体
 * }
 * 
 * 最后，如果指向跳过不存在的元素而仍然要处理存在的undeined元素，代码如下：
 * for(var i = 0; i < a.length; i++){
 *    if(!(i in a)) continue;   //跳过不存在的元素
 *    //循环体
 * }
 * 
 * 还可以使用for/in循环处理稀疏数组。循环每次将一个可枚举的属性名（包括数组索引）赋值给循环变量。
 * 不存在的索引不会遍历到：
 * 
 * for(var index in sparseArray){
 *    var value = sparseArray[index]
 *    //others
 * }
 * 
 * 在6.5节已经注意到for/in循环能够枚举继承的属性名，如添加到Array.prototype中的方法。由于这个原因
 * 在数组上不应该使用for/in循环，除非使用额外的检测方法来过滤不想要的属性。如下检测代码取其一即可：
 * for(var i in a){
 *    if(!a.hasOwnProperty(i)) continue;  //跳过继承的属性
 *    //循环体
 * }
 * for(var i in a){
 *    //跳过不是非负整数的i
 *    if(String(Math.floor(Math.abs(Number(i)))) !== i) continue
 * }
 * ECMAScript规范运行for/in循环以不同的顺序遍历对象的属性。通常数组元素的遍历实现是升序，但不能
 * 保证一定是这样的。特别地，如果数组同时拥有对象属性和数组元素，返回的属性名很可能是按照创建的顺序
 * 而非数值的大小顺序。如何处理这个问题的实现各不相同，如果算法依赖于遍历的顺序，那么最好不要使用
 * for/in而用常规的for循环。
 * 
 * ECMAScript5定义了一些遍历数组元素的新方法，按照索引的顺序按个传递给定义的一个函数。这些方法中
 * 最常用的就是forEach()方法
 * var data = [1,2,3,4,5]       //这是要遍历的数组
 * var sumOfSquares = 0;        //要得到数据的平方和
 * data.forEach(function(x){    //把每个元素传递给此函数
 *    sumOfSquares += x*x       //平方相加
 * })
 * sumOfSQUARES                 //结果
 * 
 * forEach()和相关的遍历方法使得数组拥有简单而强大的函数式编程风格。他们涵盖在7.9节中，当涉及函数式
 * 编程是，还将在8.8节再次碰到他们
 * 
 * 7.7 多维数组
 * 
 * js不支持真正的多维数组，但可以用数组的数组来近似。访问数组的数组中的元素，只要简单地使用两次[]
 * 操作符即可。例如，假设变量matrix是一个数组的数组，它的基本元素是数值，那么matrix[x]的每个元素
 * 是包含一个数值数组，访问数组中特定数值的代码未matrix[x][y]。这里有一个具体的例子，它使用二维数组
 * 作为一个九九乘法表：
 */

/*  
var table = new Array(10)
for(var i = 0; i < table.length; i++){
  table[i] = new Array(10)
}
for(var row = 0; row < table.length; row++){
  for(col = 0; col < table[row].length; col++){
    table[row][col] = row*col
  }
}

var product = table[5][7] 
*/

/**
 * 7.8数组方法
 * 
 * ECMAScript3 在Array.prototype中定义了一些很有用的操作数组的函数，这意味着这些函数作为任何数组
 * 的方法都是可用的。下面几节介绍ECMAScript3中的这些方法。想通常一样，完整的细节参见第四部分关于
 * 数组的内容。ECMAScript5中新增了一些新数组遍历方法，他们涵盖在7.9节中。
 * 
 * 7.8.1 join
 * Array.join()方法将数组中所有元素都转换为字符串并连接在一起，返回最后生成的字符串。可以指定一个
 * 可选的字符串在生成的字符串中来分割数组的各种元素。如果不指定分隔符，默认使用逗号。如一下代码所示：
 * var a = [1, 2, 3]    //创建一个包含三个元素的数组
 * a.join()             // 1,2,3
 * a.join(' ')          // 1 2 3
 * a.join('')           // 123
 * var b = new Array(10)//长度为10 的空数组
 * b.join('-')          //'---------'9个连字号组成的字符串
 * 
 * Array.join()方法是String.split()方法的逆向操作，后者是将字符串分割成若干块来创建一个数组
 * 
 * 7.8.2 reverse()
 * 
 * Array.reverse()方法将数组中的元素颠倒顺序，返回逆序的数组。它采取了替换；换句话说，它不通过重新
 * 排列的元素创建新的数组，而是在原先的数组中重新排列他们。例如，下面的代码使用reverse()和join()
 * 方法生成字符串'3, 2, 1'
 * 
 * var a = [1, 2, 3]
 * a.reverse().join()   // '3,2,1',并且现在的a是[3, 2, 1]
 * reverse()是在原先的数组中重新排列他们, (也就是原始值改变了)
 * 
 * 7.8.3 sort()
 * 
 * Arry.sort()方法将数组中的元素排序并返回排序后的数组。当不带参数调用sort()时，数组元素
 * 以字母表顺序排序（如有必要将临时转换为字符串进行比较）
 * 
 * var a = new Array('banana', 'cherry', 'apple')
 * a.sort()
 * var s = a.join(', ') //s == 'apple, banbna, cherry'
 * 
 * 如果数组包含undefined元素，他们会被排到数组的尾部。
 * 
 * 为了按照其他方式而非字母表顺序进行数组排序，必须给sort()方法传递一个比比较函数。该函数决定
 * 了它的两个参数在排好序的数组中的先后顺序。假设第一个参数应该在前，比较函数应该返回一个
 * 小于0的数值。反之，假设第一个参数应该在后，函数应该返回一个大于0的数值。并且，假设两个值
 * 相等(也就是说， 我们的顺序无关要紧)，函数应该返回0.因此，例如，用数值大小而非字母表顺序
 * 进行数组排序，代码如下
 * 
 * var a = [33, 4, 1111, 222]
 * a.sort();                    //字母表顺序：1111， 222， 33， 4
 * a.sort(function(a, b){       //数值顺序：4， 33， 222， 111
 *    return a - b              //根据顺序，返回负数、0、正数
 * })
 * a.sort(function(a, b){return b-a}) //数值大小相反的顺序
 * 
 * 个人理解：对于数组来说，升序a - b， 降序b - a （数组为数字）
 * 
 * 注意，这里使用匿名函数表达式非常方便。既然比较函数只使用一次，就没有必要给他们命名了。
 * 
 * 另外一个数组元素排序的例子，也许需要对一个字符串数组执行不区分大小写的字母表排序，比较
 * 函数首先将参数都转换为小写字符串（使用toLowerCase()方法），在开始比较：
 * 
 * a = ['ant', 'Bug', 'cat', 'Dog']
 * a.sort()                   //区分大小写的排序：['Bug', 'Dog', 'ant', 'cat']
 * a.sort(function(s,t){      //不区分大小写的排序
 *    var a = s.toLowerCase()
 *    var b = t.toLowerCase()
 *    if(a < b) return -1;
 *    if(a > b) return 1;
 *    return 0;
 * })
 * 
 * 7.8.4 concat()
 * 
 * Array.concat()方法创建并返回一个新数组，它的元素包括调用concat()的原始数组的元素和concat()
 * 的每个参数。如果这些参数中的任何一个自身是数组，则连接的是数组的元素，而非数组本身。但要
 * 注意，concat()不会递归扁平化数组的数组。concat()也不会修改调用的数组。
 * 
 * var a = [1, 2, 3]
 * a.concat(4, 5)             //返回[1, 2, 3, 4, 5]
 * a.concat([4, 5])           //返回[1, 2, 3, 4, 5]
 * a.concat([4, 5], [6, 7])   //返回[1, 2, 3, 4, 5, 6, 7]
 * a.concat(4, [5, [6, 7]])   //返回[1, 2 ,3 ,4 ,5, [6, 7]]
 * 
 * 7.8.5 slice()
 * 
 * Array.slice()方法返回指定数组的一个片段或子数组。他的两个参数分别指定了片段的开始和结束
 * 的位置。返回的数组包含第一个参数指定的位置和所有到但不含第二个参数指定的位置之间的所有数
 * 组元素。如果只指定一个参数，返回的数组将包含从开始位置到数组结尾元素。如果参数中出现负数
 * 它表示相对于数组中最后一个元素的位置。例如，参数-1指定了最后一个元素，而-3指定了倒数第3
 * 个元素。注意，slice()不会修改调用的数组。下面有一些示例：
 * 
 * slice()不会修改原数组
 * 
 * var a = [1, 2, 3, 4, 5]
 * a.slice(0, 3)    //返回[1, 2, 3]
 * a.slice(3)       //返回[4, 5]
 * a.slice(1, -1)   //返回[2, 3, 4]
 * a.slice(-3, -2)  //返回[3]
 * 
 * 7.8.6 splice()
 * 
 * Array.splice()方法是在数组中插入或删除元素的通用方法。不同于slice()和concat()，splice()
 * 会修改调用的数组。注意，splice()和slice()拥有非常相似的名称，但他们的功能却又本质的区别
 * 
 * splice()能够从数组中删除元素、插入元素到数组中或者同事完成这两种操作。在插入或删除点之后
 * 的数组元素会根据需要增加或减小他们的索引值，因此数组的其他部分仍然保持连续的。splice()的
 * 第一个参数指定了插入和（或）删除的起始位置。第二个参数指定了应该从数组中删除的元素个数。
 * 如果省略第二个参数，从起始点开始到数组结尾的所有元素都将被删除。splice()返回一个由删除元素
 * 组成的数组，或者如果没有删除元素就返回一个空数组。例如
 * 
 * var a = [1, 2, 3, 4, 5, 6, 7, 8]
 * a.splice(4)      //返回[5, 6, 7, 8];a是[1, 2, 3, 4]
 * a.splice(1, 2)   //返回[2, 3];a是[1, 4]
 * a.splice(1, 1)   //返回[4]; a是[1]
 * 
 * splice()的前两个参数指定了需要删除的数组元素。紧随其后的任意个数的参数指定了需要插入到数组
 * 中的元素，从第一个参数指定的位置开始插入。例如：
 * 
 * var a = [1, 2, 3, 4, 5]
 * a.splice(2, 0, 'a', 'b')   //返回[];a是[1, 2, 'a', 'b', 3, 4, 5]
 * a.splice(2, 2, [1, 2], 3)  //返回['a', 'b'];a是[1, 2, [1, 2], 3, 3, 4, 5]
 * 
 * 注意，区别于concat(), splice()会插入数组本身而非数组的元素
 * 
 * 7.8.7 push() 和 pop()
 * 
 * push() 和 pop() 方法允许将数组当做栈来使用。push()方法在数组的尾部添加一个或多个元素。
 * 并返回数组新的长度。pop()方法则相反：它删除数组的最后一个元素，减小数组长度并返回它删除
 * 的值。注意，两个方法都修改并替换原始数组而非生成一个修改版的新数组。组合使用Push()和pop()
 * 能够用js数组实现先进后出的栈。例如：
 * var stack = []       //stack: []
 * stack.push(1, 2)     //stack: [1, 2]
 * stack.pop()          //stack: [1]
 * stack.push(3)        //stack: [1, 3]   返回2
 * stack.pop()          //stack: [1]      返回3
 * stack.push([4, 5])   //stack: [1, [4, 5]] 返回2
 * stack.pop()          //stack [1]       返回[4, 5]
 * stack.pop()          //stack []        返回1
 * 
 * 7.8.8 unshift()和shift()
 * 
 * unshift()和shift()方法的行为非常类似于push()和Pop()，不一样的是前者是在数组的头部而非
 * 尾部进行元素的插入和删除。unshift()在数组的头部添加一个或多个元素，并将已存在的元素移动
 * 到更高的索引的位置来获得足够的空间，最后返回数组新的长度。shift()删除数组的第一个元素并
 * 将其返回，然后把所有随后的元素下移一个位置来填补头部的空缺：
 * 
 * var a = []
 * a.unshift(1)     //a:[1]       return 1
 * a.unshift(22)    //a:[22, 1]   return 2
 * a.shift()        //a:[1]       return 22
 * a.unshift([3, [4, 5]])      //a:[3, [4, 5], 1]     return 3
 * a.shift()        //a:[[4, 5], 1]     return 1
 * a.shift()        //a:[1]       return [4, 5]
 * a.shift()        //a:[]        return 1
 * 
 * 注意，当使用多个参数调用unshift()时它的行为令人惊讶。参数是一次性插入的（就像splice()方法）
 * 而非一次一个地插入。这意味着最终的数组中插入的元素的顺序和他们在参数列表中的顺序一致。而
 * 假如元素是一次一个地插入，他们的属性应该是反过来的。
 * 
 * 7.8.9 toString()和toLocaleString()
 * 
 * 数组和其他js对象一样用用toString()方法。针对数组，是干啥能回个近视其每个元素转化为字符串
 * （如有必要将调用元素的toString()方法）并且输出用逗号分隔的字符串猎豹。注意，输出不包括
 * 方括号或其他新式的包裹数组值得分隔符， 例如
 * [1, 2, 3].toString()       //生成 '1,2,3'
 * ['a', 'b', 'c'].toString() //生成 'a,b,c'
 * [1, [2, 'c']].toString()   //生成 'a,2,c'
 * 
 * 注意，这里与不使用任何参数调用join()方法返回的字符串是一样的。
 * 
 * toLocaleString()是toString()方法的本地化版本。它调用元素的toLocaleString()方法将每个
 * 数组元素转换为字符串，并且使用本地化(和自定义实现的)分隔符将这些字符串连接起来生成最终的衣服穿
 * 
 * 7.9 ECMAScript 5中的数组方法
 * 
 * ECMAScript5定义了9个新的数组方法来遍历、映射、过滤、检测、简化和搜索数组。
 * 在开始详细介绍之前，很有必要对ECMAScript5中的数组方法做一个概述。首先，大多数方法的
 * 第一个参数接受一个函数，并且对数组的每个元素(或一些元素)调用一次该函数。如果是稀疏数组，
 * 对不存在的元素不调用传递的函数。在大多数情况下，调用提供的函数使用三个参数：数组元素、
 * 元素的索引和数组本身。通常，只需要第一个参数值，可以忽略后面两个参数。大多数ECMAScript5
 * 数组的方法的第一个参数是一个函数，第二个参数是可选的。如果有第二个参数，则调用的函数被
 * 看做是第二个参数的方法、也就是说，在调用函数时传递进去的第二个参数作为它的this关键字的值
 * 来使用。被调用的函数的返回值非常重要，但是不同的方法处理返回值的方式也不一样。ECMAScript5
 * 中的数组方法都不会修改他们调用的原始数组。当然，传递给这些方法的函数是可以修改这些数组的
 * 
 * 7.9.1 forEach()
 * 
 * forEach()方法从头至尾遍历数组，为每个元素调用指定的函数。如上所述，传递的数组作为forEach()
 * 的第一个参数。然后forEach()使用三个参数调用该函数；数组元素，元素的索引和数组本身。如果
 * 只关心数组元素的值，可以编写只有一个参数的函数---额外的参数将忽略：
 * 
 * var data = [1, 2, 3, 4, 5]     
 * var sum = 0;
 * data.forEach(function(value){sum += value})
 * sum
 * data.forEach(function(v, i, a){a[i] = v + 1})
 * data
 * 
 * 注意，forEach()无法在所有元素都传递给调用的函数之前终止遍历。也就是说，没有想for循环中
 * 使用的相应的break语句。如果要提前终止，必须把forEach()方法放在一个try块中，并能抛出
 * 一个异常。如果forEach()调用的函数抛出forEach.break异常，循环会提前终止：
 * 
 */

/* 
var BreakException = {}

try{
  [1,2,3].forEach(function(v){
    console.log(v)
    if(v === 2) throw BreakException;
  })
}catch(e){
  console.log(e)
  if(e !== BreakException) throw e;
} 
*/