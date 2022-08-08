
/**
 * js执行原理和深入异步
 * 
 * 内存机制之问--数据是如何存储的
 * 
 * 网络上资料基本是这样说的：基本数据类型用栈存储，引用数据类型用堆存储
 * 
 * 看起来没有错误，但实际是有问题的，可以考虑一下闭包的情况，如果变量存在栈中，那函数调用完
 * 栈顶空间销毁，闭包变量不就完了吗
 * 
 * 其实还需要补充一句
 * 
 * 闭包变量是存在堆内存中的
 * 
 * 具体而言一下数据类型存储在栈中
 * 
 * boolean
 * null
 * undefined
 * number
 * string
 * symbol
 * bigint
 * 
 * 而所有的对象数据类型存放在堆中
 * 
 * 值得注意的是，对于赋值操作，原始类型的数据直接完整的复制变量值，对象类型的数据则是复制引用地址
 * 
 * 因此会有以下情况
 * 
 * let obj = {a:1}
 * let newObj = obj;
 * newObj.a = 2
 * console.log(obj)
 * 
 * 之所以这样，是因为obj和newObj是同一份堆空间的地址，改变了newObj，等于改变了共同的堆内存，
 * 这个时候通过obj来获取这个内存的值当然会改变
 * 
 * 当然，你可能会问：为什么不用栈来保存呢？
 * 
 * 首先，对于系统栈来说，它的功能除了保存变量外，还有创建并切换函数执行上下文的功能，举个例子：
 * function f(a){
 *  console.log(a)
 * }
 * 
 * function func(a){
 *  f(a)
 * }
 * 
 * func(a)
 * 
 * 假设用ESP指针来保存当前的执行状态，在系统栈中会产生如下的过程
 * 1.调用func, 将func函数的上下文压栈，ESP指向栈顶
 * 2.指向func，有调用f函数，将f函数的上下文压栈，ESP指针上移
 * 3.执行完f函数，将ESP下移，f函数对应的栈顶空间被回收
 * 4.执行完func，ESP下移，func对应的空间被回收
 * 
 * 如图
 * 
 * 1.                    
 * 
 * esp->  func函数上下文
 *        a : 1         
 * 
 * 
 * 2.
 * 
 * esp->  f函数上下文
 *        a : 1
 *        func函数上下文
 *        a : 1
 * 
 * 3.     f函数上下文  】
 *        a : 1       】被回收
 * esp->  func函数上下文
 *        a : 1
 * 
 * 4.     func函数上下文 】
 *        a : 1         】被回收
 * esp->
 * 
 * 因此你也看到了，如果采用栈来存储相对基本数据类型更加复杂的对象数据，那么切换上下文的开销将变得巨大
 * 
 * 不过堆内存虽然空间大，能存放大量数据，但于此同时的垃圾内存的回收会带来更大的开销。
 * 
 * v8引擎如何进行垃圾内存回收
 * 
 * js语言不像c/c++，让程序员自己去开辟或者释放内存，而是类似java，采用自己的一套垃圾回收算法进行
 * 自动的内存管理。作为一名资深的前端工程师，对于js内存的回收机制是需要非常的清楚，以便于在极端的
 * 环境下能够分析出系统性能的瓶颈，另一方面，学习这其中的机制，也对我们深入理解js的闭包特性、以及
 * 对内存的高效使用，都有很大的帮助。
 * 
 * v8内存限制
 * 
 * 在其他的后端语言中，如java/go，对于内存的使用没有什么限制，但js不一样，v8只能使用系统的一部分内存
 * 具体来说，在64位系统下，v8最多只能分配1.4G，在32位系统中最多只能分配0.7G。你想想在前端这样的大内存
 * 需求其实并不大，但对于后端而言，nodejs如果遇到一个2G的文件，那么将无法全部将其读入内存进行各种操作
 * 
 * 我们知道对于栈内存而言，当ESP指针下移，也就是上下文切换，栈顶的空间会自动回收。但对于堆内存而言就
 * 比较复杂了，下面我们着重堆内存的垃圾回收。
 * 
 * 上一篇我们提到过，所有对象类型的数据在js中都是通过堆进行空间分配的。当我们构造一个对象进行复制操作
 * 的时候，其实相应的内存已经分配到了堆上。你可以不断的这样创建对象，让v8位它分配空间，直到堆的大小
 * 达到上限
 * 那么问题来了，v8为什么要给它设置内存上限？明明我的机器大几十G的内存，只能让我用这么一点点？
 * 究其根本，是由两个因素共同决定的，一个是js单线程的执行机制，另一个是js垃圾回收机制的限制
 * 
 * 首先js是单线程运行的，这意味着一旦进入垃圾回收，那么其他的各种运行逻辑都要暂停；另一方面垃圾回收
 * 其实是非常消耗时间的操作，v8官方是这样形容的：
 * 
 * 以1.5G的垃圾回收为例，v8做一次小的垃圾回收需要50ms以上，做一次非增量式的垃圾回收甚至要1s以上
 * 
 * 可见其消耗之久，而且这么长的时间内，我们的js代码执行会一直没有响应，造成应用卡顿，导致应用性能和响应
 * 性能直线下降。因此v8 做了一个简单粗暴的选择，那就是限制堆内存，也算是是一种权衡的手段，因为大部分
 * 情况是不会遇到操作几个G内存这样的场景。
 * 
 * 不过，如果你想调整这个内存的限制也不是不行。配置命令如下：
 * 
 * node --max-old-space-size=2048 xxx.js
 * 
 * 或者
 * 
 * node --max-new-space-size=2048 xxx.js
 * 
 * 新生代内存的回收
 * 
 * v8把堆内存分成了两部分进行处理--新生代内存和老生代内存。顾名思义，新生代就是临时分配的内存，存活时间短
 * 老生代是常驻内存，存活的时间长。v8的堆内存，也就是两个内存值和
 * 
 * 根据着两种不同种类的堆内存，v8采用了两种不同的回收策略，来根据不同的场景坐针对性的优化
 * 
 * 首先是新生代的内存，刚刚已经介绍了调整新生代内存的方法，那他的内存默认限制是多少？在64和32位系统分别位
 * 32M和16M。够小吧，不过也很好理解，新生代中变量的存活时间短，来了马上就走，不容易产生太大的内存负担，
 * 因此可以将他设的足够小
 * 
 * 那好了，新生代垃圾回收是怎么做的呢？
 * 
 * 首先将新生代内存空间一分位二
 *  from        to
 * 
 * 其中from部分表示正在使用的内存，to表示目前闲置的内存
 * 
 * 当进行垃圾回收时，v8将from部分的对象检查一遍，如果时存活对象那么复制到to内存中（在to内存中按照顺序从
 * 头防止的），如果时非存活对象直接回收即可
 * 
 * 当所有的from中的存活对象按照顺序进入到to内存之后，from和to两者的决定对调，from限制被闲置，to为正在
 * 使用，如此循环。
 * 
 * 你可能会问了，直接将非存活对象回收了不久万事大吉了吗？为什么还要后面的一系列操作？
 * 
 * 注意：我刚刚特别说明了，在to内存中按照顺序从头放置，这是为了应对这样的场景
 * ..  .  .    .   .
 * .   .   .  .    . 
 * ..  .  .    .   .
 * .   .   .  .    . 
 * 
 * 
 * 深色的小方块代表存活的对象，白色部分表示待分配的内存，由于堆内存时连续分配的，这样零散的空间可能会导致
 * 稍微大一点的对象没有办法进行内存分配，这种零散的空间也叫内存碎片，刚刚介绍的新生代垃圾回收算法也叫
 * Scavenge算法
 * 
 * Scavenge算法主要就是解决内存碎片的问题，在进行一顿复制之后，to空间变成这个样子
 * 
 * .....................
 * 
 * 是不是整齐了很多？这样就大大方便了后续连续空间的分配
 * 不过Scavenge碎发的劣势也非常明显，就是内存只能使用新生代内存的一半，但它只存放生命周期短的对象，这种
 * 对象一般很少，因此时间性能非常优秀
 * 
 * 老生代内存回收
 * 
 * 刚刚介绍了新生代的内存回收方式，那么新生代的变量如果经过多次回收后依然存在，那么就会被放入老生代内存
 * 中，这种现象叫做晋升
 * 
 * 发生晋升其实不只是这一种原因，我们来梳理一下会有哪些情况触发晋升
 * 1.已经经历过一次Scavenge回收
 * 2.to（闲置）空间的内存超过了25%
 * 
 * 现在进入到老生代垃圾回收机制当中，老生代中累计的变量空间一般都是很大的，当然不能用Scavenge算法了，浪费
 * 一半内存空间不说，堆庞大的内存空间进行复制岂不是劳民伤财
 * 
 * 那么对老生代而言，究竟是采取怎样的策略进行垃圾回收呢？
 * 
 * 第一步，进行标记-清除。这个过程在js高程三中有详细介绍，主要分成两个阶段，即标记阶段和清除阶段。首先会
 * 遍历堆中的所有对象，对他们进行标记，然后对于代码环境中使用的变量以及被强引用的变量取消标记，剩下的就是
 * 要删除的变量了，在随后的清除阶段对其进行空间的回收。
 * 
 * 当然这又会引发内存碎片的问题，存活对象的空间不连续对后续的空间分配造成障碍。老生代又是如何处理这个问题
 * 的呢？
 * 
 * 第二步，整理内存碎片。v8的解决方式非常简单粗暴，在清除阶段结束后，把存活的对象全部往一端靠拢
 * 
 * 由于是移动对象，它的执行速度不可能会很快，事实也是整个过程中最消耗时间的部分。
 * 
 * 增量标记
 * 
 * 由于js的但线程机制，v8在进行垃圾回收机制的时候，不可避免的阻塞业务逻辑的执行，倘若老生代垃圾回收机制
 * 任务很重，那么耗时会非常可怕，严重影响应用的性能。那这个时候为了避免这样的问题，v8采用增量标记的方式，
 * 即将一口气完成的标记任务分为很多小的部分完成，每做完一个小的部分就休息一下，就js应用逻辑执行一会，然后
 * 在执行下面部分，如此循环，直到标记阶段完成才进入内存碎片的整理上面来。
 * 
 * 经过增量标记之后，垃圾回收过程对js应用的阻塞时间减少到原来的1/6，可以看到，这是一个非常成功的改进
 * 
 * js垃圾回收的原理就讲到这里，其实理解起来非常简单，重要的是理解他 为什么要这样做，而不仅仅是如何做
 * 
 * 描述一下v8执行一段js代码的过程
 * 
 * 前端相对来说是一个新的领域。因此各种前端框架和工具层出不穷，让人眼花缭乱，尤其是各大厂商退出了小程序
 * 之后各自定制标准，让前端开发的工作更加繁琐，在此背景下为抹平平台之间的差异，诞生的各种编译工具/框架
 * 也数不胜数。但无论如何，想要赶上这些框架和工具的更新速度是非常难得，即使赶上也很难产生自己得知识沉淀
 * 一个更好得方式便是学习那些本质知识，抓住上层应用中不变的底层机制，这样我们便能轻松理解上层框架而不仅仅
 * 是被动的使用，甚至能够在适当的场景中自己造出轮子，以满足开发效率的需求
 * 
 * 站在v8的角度，理解其中的执行机制，也能够帮助我们理解很多的上层应用，包括babel、Eslint、前端框架的底层
 * 机制。那么，一段js代码放在v8当中究竟如何执行呢？
 * 
 * 首先需要明白的是，机器是读不懂js代码的，机器只能理解特定的机器码，那如果要让js的逻辑在机器上运行起来
 * 就必须将js的代码翻译成机器码，然后让机器识别，js属于解释型语言，对于解释型语言来说，解释器会对源码做
 * 如下分析：
 * 1.通过此法分析和语法分析生成AST（抽象语法树）
 * 2.生成字节码
 * 
 * 然后解释器根据字节码来执行程序。但js整个执行的过程会比这个更复杂
 * 
 * 1.生成AST
 * 
 * 生成AST分为两个步骤--词法分析和语法分析
 * 词法分析即分词，它的工作就是将一行行的代码分解成一个个的token。比如下面一行代码
 * let name = 'sanyuan'
 * 其中会把句子分解成四个部分
 * 
 * 关键词   变量明    赋值    字符串
 * let      name      =     'sanyuan'
 * 
 * 即解析成了四个token，这就是词法分析的作用
 * 接下来语法分析阶段，将生成的这些token数据，根据一定的语法规则转换为AST：
 * 
 * let name = 'sanyuan'
 * console.log(name)
 * 
 * 最后生成的AST是这样的：
 * 
 * program
 *    VariableDeclaration
 *        VariableDeclarator
 *            name
 *            'sanyuan'
 * 
 *    ExpressionStatement
 *        CallExpression
 *            MemberExpression
 *                console
 *                log
 *            arguments
 *                name
 * 
 * 当生成AST之后，编译器/解释器后续的工作都要依靠AST而不是源码，顺便补充一句，babel的工作原理就是将ES6
 * 的代码解析成ES6的AST，然后将ES6的AST转化为ES5的ast，最后才将ES5的ast转换为具体的ES5代码
 * 
 * 回到v8本身，生成ast后，接下来会生成执行上下文
 * 
 * 2.生成字节码
 * 
 * 开头就已经提到过，生成ast之后，直接通过v8的解释器来生成字节码。字节码并不能让机器直接运行，你可能就会说
 * 不能执行还转成字节码干嘛，直接把ast转换为机器码不久得了，让机器直接执行。确实，在v8早期是这么做的，但后来
 * 因为机器码的体积太大引发严重的内存占用问题。
 * 
 * 一张对比图
 * 
 * js代码
 * 
 * let name = '三元'
 * 
 * v8字节码
 * LdaConstant[0]
 * star r[0]
 * 
 * 86-64位系统汇编指令
 * push %rbp
 * move %rps, %rbp
 * mov  $0x4005e0, %edi
 * ....
 * 
 * 很容易得出，字节码是比机器码轻量的多的代码。那v8为社么要使用字节码，字节码到底是个什么东西
 * 
 * 字节码是介于ast和机器码之间的一种代码，但是与特定类型的机器码无关，字节码需要通过解释器将其转换位机器码
 * 然后执行
 * 
 * 字节码任然需要转换为机器码，但和原来不同的是，现在不同一次性将全部的字节码都转换成为机器码，而是通过
 * 解释器来逐行执行字节码，省去了生成二进制文件的操作，这就大大降低了内存的压力。
 * 
 * 执行代码
 * 
 * 接下来，就进入到了字节码解释执行阶段
 * 
 * 在执行字节码的过程，如果发现某一部分代码重复出现，那么v8将其标记为热点代码（HotSpot），然后将代码编译
 * 成机器码保存起来，这个用来编译的工具就是v8编译器，因此在这样的机制下代码执行的时间越久，那么执行效率会
 * 越来越高，因为有越来越多的字节码被标记为热点代码，遇到他们时直接执行相应的代码，不用再次将其转换为机器码
 * 
 * 其实当你听到有人说js就是一门解释型语言的时候，其实这个说法是有问题的。因为字节码不仅配合了解释器，还和
 * 编译器打交道，所以js并不完全时解释型语言，根本的区别在于前者会编译生成二进制文件但后者不会
 * 
 * 并且，这种字节码跟编译器和解释器结合的过程，梳理一下
 * 1.首先通过词法分析和语法分析生成AST
 * 2.将AST转为字节码
 * 3.有解释器逐行执行字节码，遇到热点代码启动编译器进行编译，生成对应的机器码，以优化执行效率
 * 
 * 
 * 
 * 如何理解EventLoop 宏任务和微任务
 * 
 * 宏任务（MacroTask）引入
 * 
 * 在js中，大部分的任务都是在主线程上执行，常见的任务有：
 * 1.渲染事件
 * 2.用户交互事件
 * 3.js脚本执行
 * 4.网络请求、文件读写完成事件
 * 
 * 为了让这些事情有条不紊的执行，js引擎需要对之执行顺序做一定的安排，v8其实采用的是一种队列的方式来存储
 * 这些任务，即先进来的先执行。模拟如下：
 * 
 * bool keep_running = true;
 * void MainThread(){
 *  for(;;){
 *    Task task = task_queue.takeTask();
 *    ProcessTask(task);
 *  }
 * 
 *  if(!keep_running)
 *    break;
 * }
 * 
 * 这里用到了for循环，将队列中的任务取出，然后执行，这个很好理解。但是其中包含了两种任务列表，除了上述
 * 提到的任务列表，还有一个延迟队列，它专门用来处理诸如setTimeout/setInterval这样的定时器回调任务
 * 
 * 上述提到的，普通任务列表和延迟队列中的任务，都属于宏任务
 * 
 * 微任务（MicroTASK）引入
 * 对于每个宏任务而言，其内部都有一个微任务队列，那为什么要引入微任务？微任务在什么时候执行呢？
 * 其实，引入微任务的初衷是为了解决异步回调的问题。想一想，对于异步回调的处理，有多少中方式？
 * 总结起来有两点：
 * 1.将异步回调进行宏任务队列的入队操作
 * 2.将异步回调放到当前宏任务的末尾
 * 
 * 如果采用第一种方式， 那么执行回调的时机应该是在前面所有的宏任务完成之后，倘若现在的任务队列非常长
 * 那么回调迟迟得不到执行，造成相应卡顿
 * 
 * 为了避免这个问题，v8引入第二种方式，这就是微任务的解决方式，在每个宏任务中定义一个微任务队列，当
 * 该宏任务执行完成，会检查其中的为任务队列，如果为空则执行下一个宏任务，如果不为空，则一次执行微任务
 * 执行完毕才去执行下一个宏任务
 * 
 * 常见的微任务有MutationObserver、Promise.then（或者.reject）以及以Promise为基础开发的技术（比如fetch api）
 * 还包括v8的垃圾回收过程
 * 
 * 这便是宏任务和微任务的概念、接下来介绍js非常重要的运行机制-EventLoop
 * 
 * 如何理解EventLoop浏览器篇
 * 
 */
/* console.log('start')

setTimeout(() => {
  console.log('timeout')
})

Promise.resolve().then(() => {
  console.log('resolve')
})

console.log('end') */

/**
 * 我们来分析一下
 * 1.刚开始整个脚本作为一个宏任务来执行，对于同步代码直接压入执行栈进行执行，因此先打印start, end
 * 2.setTimeout作为宏任务放入宏任务队列
 * 3.Promise.then作为微任务让如到微任务列表
 * 4.当本次宏任务执行完毕，检查为任务队列发现一个Promise.then执行
 * 5.接下来进入下一个宏任务setTimeout执行
 * 
 * 
 * 这样就带大家直观的感受到浏览器环境下EventLoop的执行顺序。不过，这只是其中一部分情况，接下来我们
 * 做一个完整的总结
 * 1.一开始整段代码作为第一个宏任务执行
 * 2.执行过程中同步代码直接执行，宏任务进入宏任务队列，微任务进入微任务队列
 * 3.当前宏任务队列完全出栈，检查微任务队列，如果有则依次执行，直到微任务队列完全为空
 * 4.执行浏览器ui线程的渲染工作
 * 5.检查是否有web worker任务，有则执行
 * 6.执行队首新的宏任务，回到2，依次循环，直到宏任务和微任务都为空
 * 
 */

 /* Promise.resolve().then(() => {
   console.log('Promise1')
   setTimeout(() => {
     console.log('setTimeout2')
   })
 })

 setTimeout(() => {
   console.log('setTimeout1')
   Promise.resolve().then(() => {
     console.log('Promise2')
   })
 })

 console.log('start') */

/**
 * 如何理解EventLoop事件循环----nodejs篇
 * 
 * nodejs和浏览器的EventLoop还是有很大的差别的，值得单独拿出来说一说
 * 
 * 1.三大关键阶段
 * 首先，梳理一下nodejs三大非常重要的执行阶段
 * 1.执行定时器回调的阶段，检查定时器，如果到了时间，就执行回调。这些定时器就是setTimeout,setInterval
 * 这个阶段暂且叫他timer
 * 2.轮询阶段（poll）。因为在node代码中难免会有异步操作，比如文件i/o，网络i/o等，那么当这些异步操作做完了
 * 就会来通知js主线程，怎么通知呢？就是通过'data'、'connect'等事件使得事件循环达到poll阶段，到达这个阶段
 * 后。
 * 如果当前以及存在定时器，而且有定时器到时间了，拿出来执行，eventLoop将回到timer阶段
 * 如果没有定时器，会去看回调函数队列
 * 。如果队列不为空，拿出队列中的方法依次执行
 * 。如果队列为空，检查是否有setImmdiate的回调
 *    。有则往前check阶段
 *    。没有则继续等待，相当于阻塞了一段事件（阻塞事件是上限的），等待callback函数加入队列，加入后会立即执行
 *      一段时间后自动进入check阶段
 * 。check阶段。这是一个比较简单的阶段，直接执行setImmdiate的回调
 * 这三个阶段为一个循环过程，不过现在的eventLoop并不完整，我们现在就来一一第完善
 * 
 * 2.完善
 * 
 * 首先，当1阶段结束后，可能并不会立即等待到异步事件的响应，这时候nodejs会进入到i/o异常的回调阶段。比如
 * 说TCP连接遇到ECONNREFUSED,就会在这个时候执行回调
 * 并且在check阶段结束后还会进入到关闭事件的回调阶段。如果一个socket或者句柄（handle）被突然关闭，
 * 例如socket.destory(), 'close'事件的回调就会在这个阶段执行
 * 梳理一下，nodejs的eventloop分为下面几个阶段
 * 1.timer阶段
 * 2.i/o异常回调阶段
 * 3.空闲、预备状态（第2阶段结束，poll未触发之前）
 * 4.poll阶段
 * 5.check阶段
 * 6.关闭事件的回调阶段
 * 
 * 4.nodejs和浏览器关于eventLoop的主要区别
 * 两者最主要的区别在于浏览器中的微任务是在每个相应的宏任务中执行，而nodejs中微任务是在不同阶段之间执行
 * 
 * 5.关于process.nextTick的一点说明
 * process.nextTick是一个独立于eventLoop的任务队列
 * 在每一个eventLoop阶段完成后回去检查这个队列，如果里面有任务，会让这部分任务优先于微任务执行
 * 
 */
/* 
setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(function(){
    console.log('promise1')
  })
})

setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(function(){
    console.log('promise2')
  })
})
 */
/**
 * nodejs中的异步、非阻塞i/o是如何实现的
 * 
 * 在听到nodejs相关特性时，经常会对异步i/o、非阻塞i/o有所耳闻，听起来好像是差不多的意思，但其实是两码事
 * 
 * 什么是i/o？
 * 首先，我想有必要把i/o的概念解释一下。i/o即input/ouput,输入输出的意思。在浏览器端，只有一种io，那就是
 * 利用ajax发送网络请求，然后读取返回的内容，这属于网络i/o。回到nodejs中，其实这种场景的i/ojjiu更加广泛
 * 了
 * 主要分为两种：
 * 1.文件i/o，比如fs模块对文件进行读写操作
 * 2.网络i/o，比如https模块发起网络请求
 * 
 * 阻塞和非阻塞i/o
 * 
 * 阻塞和非阻塞i/o其实是针对操作系统内核而言的，而不是nodejs本身。阻塞io的特点就是一定要等到操作系统完成
 * 所有操作后才表示调用结束，而非阻塞io是调用后立马返回，不用等操作系统内核完成操作。
 * 
 * 对前者而言，在操作系统进行i/o的操作过程中，我们的应用程序其实是一直处于等待状态的，什么都做不了。那如果
 * 换成非阻塞io，调用返回后我们的nodejs应用程序可以完成其他事情，而操作系统同时也在进行io。这样就把等待
 * 的事件充分利用起来了，提高了执行效率，但是同时有会产生一个问题，nodejs程序怎么知道操作系统已经完成了io
 * 操作了呢
 * 
 * 为了让nodejs知道操作系统已经做完了io操作，需要重复地去操作系统那里判断一下是否完成，这种重复的判断方式
 * 就是轮询。对于轮询而言，有以下这么几种方案：
 * 1.一直轮询检查io状态，知道io完成。这是最原始的方式，也是性能最低的，会让cpu一直耗用在等待上面，其实更
 * 阻塞io的效果是一样的
 * 2.遍历文件描述符（即文件io时操作系统和nodejs之间的文件凭证） 的方式来确定io是否完成，io完成则文件描述
 * 符的状态改变，但cpu轮询消耗还是很大
 * 3.epoll。即在进入轮询的时候如果i/o未完成cpu就休眠，完成之后唤醒cpu
 * 
 * 总之，cpu要么重复检查io，要么重复检查文件描述符，要么休眠，都得不到很好的利用，我们希望的是
 * 
 * node应用程序发起io调用后可以直接去执行别的逻辑，操作系统默默的完成io之后给node发一个信号，nodejs执行回调操作
 * 
 * 这是理想的情况，也是异步io的效果，那如何实现这样的效果呢？
 * 
 * 异步io的本质
 * linux原生存在这样的一种方式，即（AIO）但有两个致命的缺陷
 * 1.只有linux存在下，在其他系统中没有异步io支持
 * 2.无法利用系统缓存
 * 
 * node中的异步io方案
 * 
 * 是不是没有办法了呢？在单线程的情况先确实是这样，但是如果把思想放开一点，利用多线程来考虑这个问题，
 * 就变得轻松多了。我们可以让一个进程进行计算操作，另外一些进行io调用，io完成后把信号传给计算的线程
 * 进而执行回调，这不就很好码？ 没错异步io就是使用这样的线程池来实现的
 * 
 * 只不过在不同的操作系统下面表现得有所差异，在linux下可以直接使用线程池来完成，在window系统下则采用
 * iocp这个系统api（内部还是用线程池完成得）
 * 
 * 有了操作系统得支持，那nodejs如何来对接这些操作系统而实现异步io呢？
 * 以文件为io我们以一段代码为例
 * let fs = require('fs')
 * fs.readFile('/test.txt, (err, data) => {
 *  console.log(data)
 * })
 * 
 * 执行流程
 * 
 * 执行代码得过程大概方式了这些事情
 * 1.首先，fs.readFile调用node得核心模块fs.js
 * 2.接下来，node得核心模块调用内建模块node_file.cc创建对应得文件io观察者对象
 * 3.最后，根据平台得不同（Linux和weindows），内建模块通过libuv中间层进行系统调用
 * 
 * libuv调用过程拆解
 * 重点来了，libuv中如何进行系统调用得呢？也就是uv_fs_open()中做了些什么？
 * 
 * 1.创建请求对象
 * 
 * 以windows为例来说，在这个函数得调用过程中，我们创建了一个文件io得请求对象，并往里面注入了回调函数
 * req_wrap->object_->Set(oncomplete_sym, callback)
 * 
 * req_wrap便是这个请求对象，req_wrap中得object的oncomplete_sym属性对应的值便是我们nodejs应用程序
 * 代码中传入的回调函数
 * 
 * 2.推入线程池，调用返回
 * 
 * 在这个对象包装完成后，QueueUserWorkItem()方法将这个对象推进线程池中等待执行。
 * 
 * 至此现在js的调用就直接返回，我们的js应用程序代码可以继续往下执行， 当然，当前io操作也同时在线程池
 * 中将被执行，这不就完成了异步吗
 * 
 * 3.回调通知
 * 
 * 事实上现在线程池中io无论发送阻塞还是非阻塞都已经无所谓了，因为异步的目的已经达到了。重要的是io完成后
 * 会发生什么
 * 
 * 在介绍后续的故事之前，给大家介绍两个重要的方法：GetQueueCompletionStatus和PostQueueCompleteionStatus
 * 1.还记得之前讲过的eventLoop吗？在每一个tick当中会调用GetQueueCompletionStatus检查线程池中是否有执行
 * 完成的请求，如果有表示时机已经成熟，可以执行回调了
 * 2.PostQueueCompleteionStatus方法则是向iocp提交状态，告诉它当前已经完成了
 * 
 * 当对应线程中的iio完成后，会将获得的结果存储起来，保存到对应的请求对象中，然后调用PostQueueCompleteionStatus
 * 向iocp提交执行完成的状态，并且将线程还给操作系统，一旦Eventloop的轮询操作中调用GetQueueCompletionStatus
 * 监测到完成状态，就会把请求对象塞给io观察者
 * 
 * io观察者现在的行为就是取出请求对象的存储结果，同时也取出它的oncomplete_sym属性，即回调函数。将前者作为
 * 参数传入后者，并执行后者。这里，回调函数就成功完成了
 * 
 * 总结：
 * 1.阻塞和非阻塞io其实是针对操作系统内核而言的。阻塞io的特点就是一定要等到操作系统完成所有操作后在表示调用
 * 结束，而非阻塞io是调用后立马返回，不用等到操作系统内核完成操作
 * 2.nodejs中的异步io采用多线程的方式，由EventLoop、io观察者、请求对象、线程池四大要素相互配合，共同实现
 * 
 * 
 *
 * js异步编程方案有哪些？为什么会出现这些方案
 * 
 * 简单实现node的回调函数机制
 * 
 * 回调函数的方式其实就是利用了发布-订阅模式，
 * 
 */

/**
 * EventEmitter一共要实现这些方法：
 * addEventListener
 * removeListener
 * once
 * removeAllListener
 * emit
 */
function EventEmitter(){
  this.events = new Map()
}

/* 
//addEventListener
const wrapCallBack = (fn, once = false) => ({ callback: fn, once })

EventEmitter.prototype.addEventListener = function(type, fn, once = false){
  let handler = this.events.get(type)
  if(!handler){
    //为type绑定实现回调
    this.events.set(type, wrapCallBack(fn, once))
  }else if(handler && typeof handler.callback === 'function'){
    //目前type事件只有一个回调
    this.events.set(type, [handler, wrapCallBack(fn, once)])
  }else{
    //目前type事件回调函数>=2
    handler.push(wrapCallBack(fn, once))
  }
}

//removeListener
EventEmitter.prototype.removeListener = function(type, listener){
  let handler = this.events.get(type)

  if(!handler) return;

  if(!Array.isArray(handler)){
    if(handler.callback === listener.callback) this.events.delete(type)
    else return
  }

  for(let i = 0; i < handler.length; i++){
    let item = handler[i]
    if(item.callback === listener.callback){
      handler.splice(i, 1)
      i--;
      if(handler.length === 1){
        this.events.set(type, handler[0])
      }
    }
  }
}

EventEmitter.prototype.once = function(type, fn){
  this.addEventListener(type, fn, true)
}

EventEmitter.prototype.emit = function(type, ...args){
  let handler = this.events.get(type);
  if(!handler) return;

  if(Array.isArray(handler)){
    handler.map(item => {
      item.callback.apply(this, args)

      if(item.once) this.removeListener(type, item)
    })
  }else{
    handler.callback.apply(this, args)
  }

  return true;
}

EventEmitter.prototype.removeAllListener = function(type){
  let handler = this.events.get(type)
  if(!handler) return;
  else this.events.delete(type)
}

let e = new EventEmitter()

e.addEventListener('type', () => {
  console.log('type 事件触发!')
})

e.addEventListener('type', () => {
  console.log('type事件又触发了!')
})

function f(){
  console.log('type事件我只触发一次');
}
console.log('-------------------------------------------------')
e.once('type', f)
console.log('-----------------------1--------------------------')
e.emit('type')
console.log('-----------------------2--------------------------')
e.emit('type')
console.log('-----------------------3--------------------------')
e.removeAllListener('type')
e.emit('type')
console.log('-------------------------------------------------')
 */

/**
 * promise凭什么消灭了地狱回调
 * 
 * 什么是地狱回调
 * 1.多层嵌套的问题
 * 2.每种任务的处理结果存在两种可能性（成功或失败），那么需要在每种任务执行结束后分别处理这两种可能性
 * 
 * 这两种问题在回调函数时代由为突出。promise的出现就是解决这两个问题
 * 
 * 解决方法
 * 
 * Promise利用了三大技术手段来解决回调地狱
 * 1.回调函数延迟绑定
 * 2.返回值穿透
 * 3.错误冒泡
 * 
 */
/* 
let readFilePromise = filename => {
  false.readFile(filename, (err, data) => {
    if(err)
      reject(err)
    else
      resolve(data)
  })
}

readFilePromise('1.json').then(data => {
  return readFilePromise('2.json')
}) */

/**
 * 回调函数不是直接声明的，而是在通过后面的then方法传入的，即延迟传入。这就是回调函数的延迟绑定
 * 
 * 然后我们做以下微调
 */
/* 
let x = readFilePromise('1.json').then(res => {
  return readFilePromise('2.json')
})
x.then()
 */
/**
 * 我们会根据then中的回调函数的传入值创造不同类型的promise，然后把返回的Promise穿透到外侧，以供后续调用
 * 这里的x指的就是内部返回的promise，然后在x后面可以依次完成链式调用
 * 这便是返回值穿透效果
 * 
 * 这两种技术一起作用便可以将深层次的嵌套回调写成下面的形式
 */

/* readFilePromise('1.JSON').then(data => {
  return readFilePromise('2.json');
}).then(data => {
  return readFilePromise('3.json')
}).then(data => {
  return readFilePromise('4.json')
}) */

/**
 * promise采用了错误冒泡的方式，其实很简单理解
 * 前面产生的错误会一直向后传递，被catch接收到，就不用频繁地检查错误了
 * 
 * 解决效果
 * 1.实现链式调用，解决多层嵌套效果
 * 2.实现错误冒泡后一站式处理，解决每次任务中判断错误、增加代码混乱度问题
 * 
 * 为什么promise要引入微任务
 * 
 * promise中的执行函数是同步执行的，但是里面存在着异步操作，在异步操作结束后会调用resolve方法，
 * 或者中途遇到错误调用reject方法，这两者都是作为微任务进入到eventLoop中，但promise为什么
 * 要引入微任务
 * 
 * 解决方式
 * 
 * 回到问题本身，其实就是如何处理回调函数的问题。总结起来有三种方式：
 * 1.使用同步回调，直到异步任务进行完，再进行后面的任务
 * 2.使用异步回调，将回调函数放在进行宏任务队列的队尾
 * 3.使用异步回调，将回调函数放到当前宏任务中的最后面
 * 
 * 优劣对比
 * 
 * 第一种方式显然是不可取的，因为同步的问题非常明显，会让整个脚本阻塞住，当前任务等待，后面的任务都无法的到执行
 * 而这部分等待时间可以拿来完成其他事情的，导致cpu的利用率非常低，而且还有另一个致命的问题，就是无法实现延迟绑定
 * 的效果
 * 
 * 如果采用第二种，那么执行回调(resolve/reject)的时机应该是在前面所有宏任务完成之后，倘若现在的任务队列非常长
 * 那么回到迟迟得不到执行，造成应用卡顿
 * 
 * 为了解决上述方案问题，另外也考虑到延迟绑定的需求，Promise采用第三种方式，即引入微任务，即把resolve(reject)
 * 回调的执行放在当前宏任务队列的末尾
 * 
 * 这样，利用微任务解决了两大痛点
 * 1.采用异步回调代替同步回调解决了浪费cpu性能的问题
 * 2.放在当前宏任务最后执行，解决了回调函数执行的实时性问题。
 * 
 * promise如何实现链式调用
 * 
 * 简易版实现
 * 
 */
/* 
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(executor){
  let self = this;
  self.value = null;
  self.error = null;
  self.status = PENDING
  self.onFulfilled = null;
  self.onRejected = null;
  self.onFulfilledCallbacks = []
  self.onRejectedCallbacks = []

  const resolve = value => {
    if(self.status !== PENDING) return;
    setTimeout(() => {
      self.status = FULFILLED;
      self.value = value;
      //self.onFulfilled(self.value)
      self.onFulfilledCallbacks.forEach(callback => callback(self.value))
    })
  }

  const reject = error => {
    if(self.status !== PENDING) return;
    setTimeout(() => {
      self.status = REJECTED;
      self.error = error;
      //self.onRejected(self.error)
      self.onRejectedCallbacks.forEach(callback => self.error)
    })
  }

  executor(resolve, reject)
}

MyPromise.prototype.then = function(onFulfilled, onRejected){
  if(this.status === PENDING){
    //this.onFulfilled = onFulfilled;
    //this.onRejected = onRejected
    this.onFulfilledCallbacks.push(onFulfilled)
    this.onRejectedCallbacks.push(onRejected)
  }else if(this.status === FULFILLED){
    onFulfilled(this.value)
  }else{
    onRejected(this.error)
  }
  return this;
}

let promise1 = new MyPromise((resolve, reject) => {
  fs.readFile('./001.txt', (err, data) => {
    if(!err)
      resolve(data)
    else
      reject(err)
  })
})

let x1 = promise1.then(data => {
  console.log('first show ', data.toString())
})

let x2 = promise1.then(data => {
  console.log('second show ', data.toString())
})

let x3 = promise1.then(data => {
  console.log('third show ', data.toString())
}) */

/**
 * 这里绑定了三个回调，想要在resolve之后一起执行
 * 需要将onFulfiled和onRejected改为数组，调用resolve时将其中的方法拿出来立即执行即可
 */


/**
 * 
 * 生成器Generator
 * 
 * 生成器执行流程
 * 
 * 生成器是一个带*号的函数（注意：它并不是一个真正的函数），可以通过yield关键字暂停执行和恢复执行
 */

/* function* gen(){
  console.log('enter')
  let a = yield 1;
  let b = yield (function(){return 2})
  return 3
}

var g = gen()
console.log(typeof g)

console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next()) */

/**
 * 由此可见，生成器的执行有这样几个关键点：
 * 1.调用gen()后，程序会阻塞住，不会执行任何语句
 * 2.调用g.next()后，程序会继续执行，直到遇到yield程序暂停
 * 3.next方法返回一个对象，有两个属性：value和done。
 * value为当前yield后面的结果
 * done表示是否执行完
 * 遇到了return后，done会由false变为true
 * 
 * yield*
 * 
 * 当一个生成器需要调用另一个生成器时，使用yield*就变得十分方便
 */

/* function* gen1(){
  yield 1;
  yield 4;
}

function* gen2(){
  yield 2;
  yield 3;
} */

/**
 * 想要按照1234得顺序执行，如何来做呢？
 * 
 * 在gen1中，修改如下
 * 
 * function* gen1(){
 *    yield 1;
 *    yield* gen2();
 *    yield 4;
 * }
 * 
 * 生成器实现机制----协程
 * 
 * 可能你比较好奇，生成器如何让函数暂停，又如何恢复得呢？接下来我们就对其中得执行机制---协程 一探究竟
 * 
 * 什么是协程
 * 
 * 协程是一种比线程更加轻量及得存在，协程处在线程得环境中，一个线程存在多个协程，可以将协程理解为线程中的
 * 一个个任务。不像线程和进程，协程不受操作系统管理，而是被具体得应用程序代码控制。
 * 
 * 协程的运作过程
 * 
 * 那可能要问了，js不是单线程执行的吗？开这么多协程难道可以一起执行吗？
 * 
 * 答案是并不能。一个线程一次只能执行一个协程。比如当前执行A协程，另外有一个b协程，如果想要执行b协程，
 * 就必须在a协程中将js线程控制权转交给b协程，那么现在执行b协程，a就相当于处于暂停状态
 * 
 */
/* 
 function* A(){
   console.log('我是A')

   yield B()//A停住了，在这里转交线程执行权给B

   console.log('结束了')
 }

 function B(){
   console.log('我是B')
   return 100;
 }

 let gen = A()
 gen.next()
 gen.next() */

 /**
  * 在这个过程中，A将执行权交给了B，也就是A启动了B，我们也称A是B的父协程。因此B当中最后return 100其实就是
  * 将100传给了父协程。
  * 
  * 需要强调的是，对于协程来说，它并不受操作系统的控制，完全由用户自定义切换，因此并没有进程/线程上下文切换
  * 的开销，这是高性能的重要原因。
  * 
  * ok，
  * 
  * 如何让Generator的异步代码按顺序执行完毕
  * 
  * 这里其实有两个问题：
  * 1.Generator如何跟异步产生关系
  * 2.怎么把Generator按顺序执行完毕
  * 
  * thunk函数
  * 
  * 要想直到Generator跟异步的关系，首先带大家搞清楚一个概念---thunk函数（即偏函数）,虽然这只是实现两者关系的
  * 方式之一
  * 
  * 举个例子，比如我们现在要判断数据类型。可以写如下的判断逻辑
  */
 let isString = obj => {
   return Object.prototype.toString.call(obj) === '[object String]'
 }

 let isFunction = obj => {
   return Object.prototype.toString.call(obj) === '[object Function]'
 }

 let isArray = obj => {
   return Object.prototype.toString.call(obj) === '[object Array]'
 }

 let isSet = obj => {
   return Object.prototype.toString.call(obj) === 'object Set'
 }


 let isType = type => {
   return obj => Object.prototype.toString(obj) === `[object ${type}]`
 }

 /**
  * isType 这样的函数称为thunk 函数。它的核心逻辑是接收一定的参数，生产出定制化的函数，然后使用定制化
  * 的函数去完成功能。
  * thunk函数的实现会比单个的判断函数复杂一点，但就是这一点点的复杂，大大方便了后续操作
  * 
  * Generator和异步
  * thunk版本
  * 
  * 以操作文件为例，我们来看看异步操作 如何应用于Generator
  */
 const fs = require('fs')
 const readFileThunk = filename => {
   return callback => {
     fs.readFile(filename, callback)
   }
 }

 const gen = function*(){
  const data1 = yield readFileThunk('001.txt')
  console.log(data1.toString())
  const data2 = yield readFileThunk('002.txt')
  console.log(data2.toString())
}

let g = gen()
let cb = g.next().value;
cb((err, data) => {
  console.log(data.toString())
})

/**
 * readFileThunk就是一个thunk函数。 异步操作核心的一环就是绑定回调函数，而thunk函数可以帮我们做到。
 * 首先传入文件名，然后生成一个针对某个文件的定制化函数。这个函数中传入回调，这个回调就会成为异步操作
 * 的回调。这就让Generator和异步关联起来了
 * 
 * 
 * 紧接着做如下操作：
 * 
 * 回调函数的延迟
 * 
 */
/* const gen = function*(){
  const data1 = yield readFileThunk('001.txt')
  console.log(data1.toString())
  const data2 = yield readFileThunk('002.txt')
  console.log(data2.toString())
}

let g = gen()

g.next().value((err, data1) => {

  g.next(data1).value((err, data2) => {
    g.next(data2)
  })

}) 

//封装
*/

function run(gen){
  const next = (err, data) => {
    let res = gen.next(data)
    if(res.done) return;
    res.value(next)
  }
  next()
}

//run(g)


function* fibonacci(){
  let [prev, cur] = [0, 1];
  console.log(cur);
  while(true) {
    [prev, cur] = [cur, prev + cur];
    yield cur;
  }
}

for(let item of fibonacci()) {
  if(item > 50) break;
  console.log(item);
}