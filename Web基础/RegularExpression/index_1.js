/**
 * 普通字符：在正则中的含义就是检索它本身。除了正则规定的部分字符外，
 *          其余的都是普通字符，包括各种人类语言，包括emoji，只要能够表达为字符串
 * 
 * 开始与结束
 * ^字符的英文是caret，翻译成中文是 ‘脱字符’。它在正则中属于元字符，通常代表的意义是文本的开始
 * 说通常是因为当他在字符组中[^abc]另有含义。
 * 
 * 什么叫文本的开始？就是如果它是正则主体的第一个字符，那紧跟着它的字符必须是被匹配文本的第一个字符
 * 'regex'.match(/^r/);             
 * //["r", index: 0, input: "regex", groups: undefined]
 * 如果^不是正则的第一个字符
 * 'regex'.match(/a^r/)
 * 关于它有三点需要注意：
 * 1.作为匹配文本开始元字符的时候必须是正则主体的第一个字符，否则正则无效
 * 2.它匹配的是一个位置，而不是具体的文本
 * 3.它在其他规则中有另外的含义
 * 
 * $字符与^正好相反。它待变文本的结束，并且没有其他含义，它必须是正则主题的最后一个字符
 * 'regex'.match(/x$/);
 * // ["x", index: 4, input: "regex", groups: undefined]
 * ^与$特殊的地方在于它匹配的是一个位置。位置不像字符，它看不见，所以更不容易理解
 * 
 * 转义
 * 我们现在已经知道$匹配文本的结束位置，它是元字符。但是如果我想匹配$本身呢？
 * 可以用到\反斜杠
 * 'price: $3.6'.match(/\$[0-9]+\.[0-9]+$/)
 * //["$3.6", index: 7, input: "price: $3.6", groups: undefined]
 * 你可以认为\也是一个元字符，它更在另一个元字符后面，就能还原它本来的含义。
 * 如果有两个\呢？那就是转义自身了。如果有三个\呢？我们得分成两段去理解。一次类推
 * 普通字符见面跟了一个\是什么效果？首先他们是一个整体，然后普通字符转义后还是普通字符
 * 
 * 一般来说，普通字符前面带反斜杠还是普通字符，但是有一些普通字符，带斜杠后反而变成了元字符
 * 只能怪计算机领域的常用符号太少了
 * 
 * 元字符   含义
 * \b       匹配一个单词边界(boundary)
 * \B       匹配一个非单词边界
 * \d       匹配一个数字字符（digit）
 * \D       匹配一个非数字字符
 * \s       匹配一个空白字符（space）
 * \S       匹配一个非空白字符
 * \w       匹配一个字母或者一个数字或者一个下划线（word）
 * \W       匹配一个字母、数字和下划线之外的字符
 * 
 * \b元字符
 * \b匹配的也是一个位置，而不是一个字符。单词和空格之间的位置，就是所谓单词边界
 * 'hello regex'.match(/\bregex$/)
 * //["regex", index: 6, input: "hello regex", groups: undefined]
 * 
 * 'hello regex'.match(/\Bregex$/)
 * //null
 * 所谓单词边界，对中文等其他语言是无效的。
 * 'jiangshuying gaoyuanyuan huosiyan'.match(/\bgaoyuanyuan\b/)
 * 
 * '江疏影 高圆圆 霍思燕'.match(/\b高圆圆/)
 * //null
 * 
 * 所以\b翻译一下就是^\w|w$|\W\w|\w\W
 * 
 * 
 * \d元字符
 * \d匹配一个数字，注意，这里的数字不是指javascript中的数字类型，因为文本全是字符串，它指的是代表数字的字符
 * '123'.match(/\d/)
 * // ["1", index: 0, input: "123", groups: undefined]
 * 
 * \s元字符
 * \s匹配一个空白字符
 * 这里需要解释一下什么是空白字符
 * 空白字符不是空格，他是空格的超集。很多人说他是\f\n\r\t\v的总和 - 显然没有做过实验
 * 其中
 * \f是换页符， 
 * \n是换行符 
 * \r是回车符 
 * \t是水平制表符 
 * \v是垂直制表符
 *
 * 'a b'.match(/\w\s\w/)
 * //["a b", index: 0, input: "a b", groups: undefined]
 * 
 * 'a b'.match(/\w\f\w/)    换页符
 * //null
 * 
 * 'a b'.match(/\w\n\w/)    换行符
 * //null
 * 
 * 'a b'.match(/\w\r\w/)    回车符
 * //null
 * 
 * 'a b'.match(/\w\t\w/)    水平制表符
 * //null
 * 
 * 'a b'.match(/\w\v\w/)    垂直制表符
 * //null
 * 
 * 'a b'.match(/\w \w/)
 * ["a b", index: 0, input: "a b", groups: undefined]
 * 其实正确的写法是'空格\f\n\r\t\v'的总和,集合里面包含一个空格，千万别忽略了，
 * 难道在正则中的写法就是空-格么，是的，就是这样随意
 * 
 * 集合中很多都是不可打印字符，只有\n可以，如果不需要区分空格和换行的话，大胆的用\s把
 * 
 * \w元字符
 * \w匹配一个字母或者一个数字或者一个下划线，大概是用户名只能这三样
 * 不过要注意，字母指的是26个英文字母，其他的不行
 * '正则'.match(/\w/)
 * //null
 * 
 * 负阴抱阳
 * 如果我们将大写和小写的带反斜杠的元字符组合在一起，就能匹配任何字符。是的，不针对任何人
 * '@regex'.match(/[\s\S]/)
 * //["@", index: 0, input: "@regex", groups: undefined]
 * 
 * 道生一
 * '.'点在正则中含义仙风道骨，它匹配换行符之外的任意单个字符。
 * 如果文本不存在换行符，那么.和[\b\B]和[\d\D]和[\s\S]和[\w\W]是等价的
 * 如果文本存在换行符，那么(.|\n)和[\b\B]和[\d\D]和[\s\S]和[\w\W]是等价的
 * '@regex'.match(/./)
 * //["@", index: 0, input: "@regex", groups: undefined]
 * 
 * 
 * 量词
 * 我们之前一直在强调，一个元字符只能匹配一个字符。即便强大如.它也只能匹配一个
 * 那么匹配gooooogle的正则是不是得写成/gooooogle/呢？
 * 如果匹配得模式有重复，我们可以声明它重复得次数
 * 量词     含义
 * ？       重复0次或者一次
 * +        重复1次或者多次，也就是至少一次
 * *        重复0次或者多次，也就是任意次数
 * {n}      重复n次
 * {n,}     重复n次或者更多次
 * {n,m}    重复n次到m次之间得次数，包含n次和m次
 * 有三点需要注意：
 * 1.？在诸如匹配http协议得时候非常有用，就像这样/http(s)?/。它在正则中除了是量词还有别饿含义，后面会提到
 * 2.我们习惯用/.* /来匹配若干对我们没有价值得文本，他的含义是'若干除换行符之外得字符'。比如我们需要文本两头得格式化信息，中间是什么无所谓，它就派上用场了。不过它得性能可不好
 * 3.{n,m}之间不能有空格，空格在正则中是有含义的
 * 关于两次最令人困惑的是什么：它重复什么？
 * 它重复紧贴在它前面的某个集合。
 * 第一点，必须是紧贴在它前面；
 * 第二点，重复一个集合。
 * 最常见的集合就是一个字符，当然正则中有一些元字符能够将若干字符变成一个集合
 * 'gooooogle'.match(/go{2,5}gle/)
 * //["gooooogle", index: 0, input: "gooooogle", groups: undefined]
 * 如果一个量词紧贴另一个量词后面会怎样
 * 'gooooogle'.match(/go{2,5}+gle/)
 * //index_1.js:149 Uncaught SyntaxError: Invalid regular expression: /go{2,5}+gle/: Nothing to repeat
 * 
 * 贪婪模式与非贪婪模式
 * 前面提到量词不能紧跟在另一个量词后面， 马上要打脸
 * 'https'.match(/http(s)?/)
 * //["https", "s", index: 0, input: "https", groups: undefined]
 * 'https'.match(/http(s)??/)
 * //["http", undefined, index: 0, input: "https", groups: undefined]
 * 然而，脸不是这么好打的
 * 紧跟在？后面的?它不是一个量词，二十一个模式切换符，从贪婪模式切换到非贪婪模式
 * 贪婪模式在正则中是默认的模式，就是在既定规则之下匹配尽可能多的文本。因为正则这种有量词，
 * 它的重复次数可能是一个区间，这就有了取舍
 * 紧跟在量词之后加上？就可以开启非贪婪模式。怎么省事怎么来
 * 这里的要点是，?必须紧跟着量词，否则的话它自己变成量词了
 * 
 * 字符组
 * 正则中的普通字符只能匹配它自己。如果我要匹配一个普通字符，但是不确定它是什么，怎么办
 * 'gray or gray'.match(/gr[ae]y/)
 * //["gray", index: 0, input: "gray or gray", groups: undefined]
 * 方括号在正则表达式中表示一个区间，我们称它未字符组
 * 首先，字符组中的字符集合只是所有的可选项，最终它只能匹配一个字符。
 * 然后，字符组是一个独立的世界，元字符不需要转义
 * '$'.match(/[$&@]/
 * //["$", index: 0, input: "$", groups: undefined]
 * 
 * 最后，有两个字符在字符组中有特殊含义
 * ^在字符组中表示去翻，不在是文本开始的位置
 * 'regex'.match(/[^abc]/)
 * //["r", index: 0, input: "regex", groups: undefined]
 * 
 * 如果我就要^呢？前面已经讲过了，转义
 * 
 * -本来就是一个普通字符，在 字符组中摇身一变成了连字符
 * '13'.match(/[1-9]/)
 * //["1", index: 0, input: "13", groups: undefined]
 * 
 * 如果我这样呢？
 * 'abc-3'.match(/[0-z]/)
 * //["a", index: 0, input: "abc-3", groups: undefined]
 * 
 * 'xyz-3'.match(/[0-c]/)
 * //["3", index: 4, input: "xyz-3", groups: undefined]
 * 
 * 'xyz-3'.match(/[0-$]/)
 * //Uncaught SyntaxError: Invalid regular expression: /[0-$]/: Range out of order in character class
 * 发现什么了没有？只有两种字符是可以用连字符的：英文字母和数字。而且英文字母可以和数字连恰里
 * 英文字母的顺序在后面。这和扑克牌1 2 3 4 5 6 7 8 9 10 J Q K 是一个道理
 * 
 * 捕获组与非捕获组
 * 我们已经找到量词是怎么回事了，我们也知道量词只能重复紧贴在它前面的字符
 * 如果我要重复的是一串字符呢
 * 'i love you very very much'.match(/i love you very +much/)
 * //null
 * 'i love you very very much'.match(/i love you v+e+r+y+ +much/)
 * null
 * 这肯定是不行的。是时候请圆括号出山了
 * 'i love you very very much'.match(/i love you (very )+much/)
 * //["i love you very very much", "very ", index: 0, input: "i love you very very much", groups: undefined]
 * 圆括号的意思是将它其中的字符集和打包成一个整体，然后量词就可以操作这个整体了。 这和方括号的效果是完全不一样的。
 * 
 * 而且默认的，圆括号的匹配结果是可以捕获的。
 * 
 * 正则内捕获
 * 
 * 现在我们有一个需求，匹配<div>标签
 * '<div>hello regex</div>'.match(/<div>.*<\/div>/)
 * //["<div>hello regex</div>", index: 0, input: "<div>hello regex</div>", groups: undefined]
 * 
 * 这很简单。但如果我要匹配的是任意标签，包括自定义的标签呢？
 * 
 * '<div>hello regex</div>'.match(/<([a-zA-Z]+)>.*<\/\1>/)
 * //["<div>hello regex</div>", "div", index: 0, input: "<div>hello regex</div>", groups: undefined]
 * 这时候就要用到正则的捕获特性。正则内捕获使用\数字的形式,分别对应前面的圆括号捕获的内容
 * 这种捕获的引用也叫反向引用
 * '<App>hello regex</App><p>A</p><p>hello regex</p>'.match(/<((A|a)pp)>(hello regex)+<\/\1><p>\2<\/p><p>\3<\/p>/)
 * //["<App>hello regex</App><p>A</p><p>hello regex</p>", "App", "A", "hello regex", index: 0, input: "<App>hello regex</App><p>A</p><p>hello regex</p>", groups: undefined]
 * 如果有嵌套的圆括号，那么捕获的应用是先递归的，然后才是下一个顶级捕获
 * 
 * 正则外捕获
 * 
 * '@abc'.match(/@(abc)/)
 * //["@abc", "abc", index: 0, input: "@abc", groups: undefined]
 * RegExp.$1
 * //"abc"
 * 没错，RegExp就是构造正则的构造函数。如果有捕获组，他的实例属性$数字 会显示对应的引用
 * 如果有多个正则呢
 * '@abc'.match(/@(abc)/)
 * '@xyz'.match(/@(xyz)/)
 * //["@xyz", "xyz", index: 0, input: "@xyz", groups: undefined]
 * RegExp.$1
 * "xyz"
 * 
 * RegExp构造函数的引用只显示最后一个正则的捕获
 * 另外还有一个字符串实例方法也支持正则捕获的引用，它就是replace方法
 * 'hello **regex**'.replace(/\*{2}(.*)\*{2}/, '<strong>$1</strong>')
 * //hello <strong>regex</strong>
 * 实际上它才是最常用的引用捕获方式
 * 
 * 
 * 捕获命名
 * 
 * 这是ES2018的最新特性
 * 使用\数字 引用捕获必须保证捕获组的顺序不变。现在开发者可以给捕获组命名了，有了名称以后，引用起来更加确定
 * '<App>hello regex</App>'.match(/<(?<tag>[a-zA-Z]+)>.*<\/\k<tag>>/
 * //["<App>hello regex</App>", "App", index: 0, input: "<App>hello regex</App>", groups: {…}]
 * 在捕获组内部最前面加上?<key>,它就被命名了。使用\k<key>语法就可以引用已经命名的捕获组
 * 是不是很简单？
 * 通常情况下，开发者只是想在正则中将某些字符当成一个整体看待。捕获组很棒，但是它做了额外的事情
 * 肯定需要额外的内存占用和计算资源。于是正则又有了非捕获组的概念
 * 
 * '@abc'.match(/@(abc)/)
 * //["@abc", "abc", index: 0, input: "@abc", groups: undefined]
 * 
 * '@abc'.match(/@(?:abc)/)
 * //["@abc", index: 0, input: "@abc", groups: undefined]
 * 只要在圆括号内最前面加上?:表示，就是告诉正则引擎：我只要这个整体，不需要它的引用，你就别
 * 费劲了。从上面的例子可以看出来，match方法返回的结果有些许不一样
 * 
 * 个人观点：我觉得正则的捕获设计应该反过来，默认不捕获，加上?:表示后才捕获。因为大多数时候
 * 开发者是不需要捕获的。但是它又懒得加?:标识，会又许些性能浪费
 * 
 * 分支
 * 
 * 有时候开发着需要在正则中使用  或者
 * '高圆圆'.match(/陈乔恩|高圆圆/)
 * //["高圆圆", index: 0, input: "高圆圆", groups: undefined]
 * | 就代表 或者。字符组其实也是一个多选结构，但是他们俩有本质区别。字符组最终只能匹配一个字符，
 * 而峰值匹配的是左边所有字符或者右边所有字符
 * 
 * 我们来看一个例子
 * '我喜欢高圆圆'.match(/我喜欢陈乔恩|高圆圆/)
 * //["高圆圆", index: 3, input: "我喜欢高圆圆", groups: undefined]
 * 
 * 因为|是将左右两边一切两半，然后匹配左边或者右边。搜友上面的正则显然达不到我们想要的效果
 * 这个时候就需要一个定西来缩小分支的范围。你可能已经想到了
 * 
 * '我喜欢高圆圆'.match(/我喜欢(?:陈乔恩|高圆圆)/
 * //["我喜欢高圆圆", index: 0, input: "我喜欢高圆圆", groups: undefined]
 * 
 * 零宽断言
 * 
 * 正则中有一些元字符，它不匹配字符，而是匹配一个位置。比如之前提到的^和$。^的意思是说
 * 这个位置应该是文本开始的位置
 * 
 * 正则还有一些比较高级的匹配位置的语法，它匹配的是：在这个位置之前或者之后应该有什么内容。
 * 零宽(zero-weith)是什么意思？指得就是它匹配一个位置，本身没有宽度
 * 断言(assertion)是什么意思？指得是一种判断，断言之前或之后应该有什么或应该没有什么
 * 
 * 1、零宽肯定先行断言
 * 
 * 所谓的肯定就是判断有什么，而不是判断没有什么
 * 
 * 而先行值得是向前看(lookahead)，断言得这个位置是为前面得规则服务的。
 * 语法很简单：圆括号内最左边加上?=标识
 * 'CoffeeScript JavaScript javascript'.match(/\b\w{4}(?=Script\b)/
 * //["Java", index: 13, input: "CoffeeScript JavaScript javascript", groups: undefined]
 * 
 * 上面匹配的是四个字母，这四个字母要满足以下条件：紧跟着的应该是Script字符串，
 * 而且Script字符串应该是单词的结尾部分
 * 
 * 所以，
 * 零宽肯定先行断言的意思是：
 * 现在有一段正则语法，用这段语法去匹配给定的文本。但是，
 * 满足条件的文本不仅要匹配这段语法，紧跟着它的必须是一个位置，这个位置又必须满足一段正则语法
 * 
 * 说的再直白点，我要匹配一段文本，但是这段文本后面必须紧跟着另一段特定的文本。零宽肯定先行断言
 * 就是一个界碑，我要满足前面和后面所有的条件，但是我只要前面的文本
 * 
 * 'CoffeeScript JavaScript javascript'.match(/\b\w{4}(?=Script\b)\w+/
 * //["JavaScript", index: 13, input: "CoffeeScript JavaScript javascript", groups: undefined]
 * 
 * 上面的例子更加直观，零宽肯定先行断言已经匹配过Script一次了，后面的\w+缺还是能匹配Script成功
 * 足以说明他的零宽特性。他为紧贴再它前面的规则服务，并不影响后面的匹配规则
 * 
 * 2、零宽肯定后行断言
 * 
 * 先行是向前看，那后行就是向后看(lookbehind)
 * 语法是圆括号内最左边加上?<=标识
 * 
 * '演员高圆圆 将军霍去病 演员霍思燕'.match(/(?<=演员)霍\S+/
 * //["霍思燕", index: 14, input: "演员高圆圆 将军霍去病 演员霍思燕", groups: undefined]
 * 
 * 一个正则可以有多个断言
 * '演员高圆圆 将军霍去病 演员霍思燕'.match(/(?<=演员)霍.+?(?=\s|$)/
 * ["霍思燕", index: 14, input: "演员高圆圆 将军霍去病 演员霍思燕", groups: undefined]
 * 
 * 
 * 3、零宽否定先行断言
 * 
 * 肯定是判断有什么，否定就是判断没有什么
 * 
 * 语法是圆括号内最左边加上?!标识
 * 
 * 'TypeScript Perl JavaScript'.match(/\b\w{4}(?!Script\b)/)
 * //["Perl", index: 11, input: "TypeScript Perl JavaScript", groups: undefined]
 * 
 * 4、零宽否定后行断言
 * 
 * 语法是圆括号最左边加上?<!标识
 * '演员高圆圆 将军霍去病 演员霍思燕'.match(/(?<!演员)霍\S+/)
 * //["霍去病", index: 8, input: "演员高圆圆 将军霍去病 演员霍思燕", groups: undefined]
 * 
 * 修饰符
 * 
 * 正则表达式除了主体语法，还有若干可选的模式修饰符
 * 写法就是将修饰符安插再正则主体的尾巴上。比如这样：/abc/gi
 * 
 * g修饰符
 * 
 * g是global的缩写。默认情况下，正则从左向右匹配，只要匹配到记过就会收工。
 * g修饰符会开启全局匹配模式，找到所有匹配的结果。
 * '演员高圆圆 将军霍去病 演员霍思燕'.match(/(?<=演员)\S+/)
 * //["高圆圆", index: 2, input: "演员高圆圆 将军霍去病 演员霍思燕", groups: undefined]
 * '演员高圆圆 将军霍去病 演员霍思燕'.match(/(?<=演员)\S+/g)
 * //["高圆圆", "霍思燕"]
 * 
 * i修饰符
 * 
 * i是ignoreCase的缩写。默认情况下， /z/是无法匹配Z的，所有我们有时候不得不这样写
 * /[a-zA-Z]/。i修饰符可以全局忽略大小写
 * 很多时候我们不在乎文本是大写、小写还是大小写混写，这个修饰符还是很有用的
 * 'javascript is great'.match(/JavaScript/)
 * //null
 * 
 * 'javascript is great'.match(/JavaScript/i)
 * //["javascript", index: 0, input: "javascript is great", groups: undefined]
 * 
 * m修饰符
 * 
 * m是multiline的缩写。这个修饰符有特定起作用的常见：它要和^和$搭配起来使用。默认情况下，
 * ^和$匹配的是文本的开始和结束，加上m修饰符，他们的含义就变成了行的开始和结束。
 * console.log(
 * `
 * abc
 * xyz
 * `.match(/xyz/)
 * )
 * //["xyz", index: 5, input: "↵abc↵xyz↵", groups: undefined]
 * 
 * console.log(
 * `
 * abc
 * xyz
 * `.match(/^xyz$/)
 * )
 * //null
 * 
 * console.log(
 * `
 * abc
 * xyz
 * `.match(/^xyz$/m)
 * )
 * //["xyz", index: 5, input: "↵abc↵xyz↵", groups: undefined]
 * 
 * y修饰符
 * 
 * 这是ES015的新特性
 * 
 * y是sticky测缩写。y修饰符有和g修饰符重合的功能，他们都是全局匹配。所以重点再sticky上，
 * 怎么理解这个 粘连  呢？
 * 
 * g修饰符不挑食，匹配完一个接着匹配下一个， 对于文本的位置没有要求。但是y修饰符要求必须
 * 从文本的开始实施匹配，因为他会开启全局匹配，匹配到的文本的下一个字符就是下一次文本的开始
 * 这就是所谓的粘连
 * 'a bag with a tag has a mag'.match(/\wag/g)
 * //["bag", "tag", "mag"]
 * 
 * 'a bag with a tag has a mag'.match(/\wag/y)
 * //null
 * 
 * 'bagtagmag'.match(/\wag/y)
 * //["bag", index: 0, input: "bagtagmag", groups: undefined]
 * 
 * 'bagtagmag'.match(/\wag/gy)
 * //["bag", "tag", "mag"]
 * 
 * 有人肯定发现了猫腻：你不是说y修饰符是全局匹配么？看上面的例子，单独一个y修饰符用match方法
 * 怎么并不是全局匹配呢？
 * 
 * 这就涉及到y修饰符的本质是什么。它的本质有二
 * 1、全局匹配
 * 2、从文本的lastIndex位置开始新的匹配。lastIndex是什么？他是正则表达式的一个属性，如果是
 * 全局匹配，它用来标注下一次匹配的起始点，这才是粘连的本质所在
 * 
 * 不知道你们发现了什么了没有：lastIndex是正则表达式的一个属性。而上面例子中的match方法是作用
 * 再字符串上的，都没有lastIndex属性，所以不工作
 * const reg = /\wag/y
 * reg.exec('bagtagmag')
 * //["bag", index: 0, input: "bagtagmag", groups: undefined]
 * reg.exec('bagtagmag')
 * //["bag", index: 3, input: "bagtagmag", groups: undefined]
 * reg.exec('bagtagmag')
 * //["bag", index: 6, input: "bagtagmag", groups: undefined]
 * 
 * 咋们换成正则方法exec，所赐执行，正则的lastIndex在变，匹配的结果也在变。全局匹配无疑了把
 * 
 * s修饰符
 * 这是ES2018的新特性
 * s不是dotAll的缩写。s修饰符要和.搭配使用， 默认情况下， .匹配除了换行符之外的任意单个字符
 * 然而它换美元强大到无所不能的地步，所以正则索性给他开了挂
 * s修饰符的作用就是让.可以匹配任意单个字符
 * s是singleline的缩写
 * 
 * console.log(
 * `
 * abc
 * xyz
 * `.match(/c.x/)
 * )
 * //null
 * 
 * console.log(
 * `
 * abc
 * xyz
 * `.match(/c.x/s)
 * )
 * //["c↵x", index: 3, input: "↵abc↵xyz↵", groups: undefined]
 * 
 * 
 * u修饰符
 * 这是ES2015的新特性
 * 
 * u是unicode的缩写。有一些Unicode字符超过一个字节，正则就无法正确的识别他们。
 * u修饰符就是用来处理着些不常见的情况的。
 * '𠮷'.match(/^.$/)
 * null
 * 
 * '𠮷'.match(/^.$/u)
 * ["𠮷", index: 0, input: "𠮷", groups: undefined]
 * 
 */