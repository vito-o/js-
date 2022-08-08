/**
 * 通常测试脚本与所要测试的源码脚本名相同，但后缀名为.test.js(表示测试)或者.spec.js(表示规格)
 */

var add = require('./add')
var expect = require('chai').expect;

describe('加法函数的测试', function(){
  it('1 加 1 应该等于 2', function(){
    expect(add(1, 1)).to.be.equal(2)
  })
})

/**
 * describe块称为“测试件套”（test suite）表示一组相关的测试。
 * 他是一个函数，第一个参数是测试件套的名称，第二个参数是一个实际执行的函数
 * it块称为“测试用例”（test case）,表示一个单独的测试，是测试的最小单位。它也是一个函数。
 * 第一个参数是测试用例的名称，第二个参数是实际执行的函数
 */

/**
 * 断言库的用法
 * 
 * expect(add(1, 1)).to.be.equal(2)
 * 
 * 所谓‘断言’，就是判断源码的实际执行结果与预期结果是否一致，如果不一致就抛出一个错误。上面这句断言的意思是
 * 调用add(1, 1)，结果应该等于2
 * 
 * 所有的测试用例(it块)都应该含有一句或者多句的断言。他是编写测试用例的关键。断言功能由断言库实现。
 * mocha本身不带断言库，所以必须先引断言库
 * 
 * var expect = require('chai').expect;
 * 
 * 断言库有很多种，Mocha并不限制使用哪一种。上面代码引入的断言库是chai，并指定它的expect风格。
 * 
 * expect断言的有点是很接近自然语言，
 * 
 * //相等或者不相等
 * expect(4 + 5).to.be.equal(9);
 * expect(4 + 5).to.be.not.equal(10)
 * expect(foo).to.be.deep.equal({bar: 'baz'})
 * 
 * //布尔值
 * expect('evething').to.be.ok;
 * expect(false).to.not.be.ok;
 * 
 * //typeof
 * expect('test').to.be.a('string')
 * expect({foo:'baz'}).to.be.a('object')
 * expect(foo).to.be.an.instanceof(Foo);
 * 
 * //include
 * expect([1,2,3]).to.include(2)
 * expect('foobar').to.contain('foo')
 * expect({foo:'bar', hello:'aaa'}).to.include.keys('foo')
 * 
 * //empty
 * expect([]).to.be.empty;
 * expect('').to.be.empty;
 * expect({}).to.be.empty;
 * 
 * //match
 * expect('foobar').to.match(/^foo/)
 * 
 * 基本上，expect断言的写法都是一样的。头部是expect方法，尾部是断言方法，比如equal、a/an、ok、match等
 * 两者之间使用to或者to.be连接
 * 
 * 如果expect断言不成立，就会抛出一个错误。事实上，只要不抛出错误，测试用例就算通过。
 * it('xxxx', function(){})
 * 上面的这个测试用例，内部没有任何代码，由于没有抛出错误，所以还是会通过
 * 
 * 
 */


/**
 * Mocha的基本用法
 * 
 * mocha 命令后面紧跟测试脚本的路径和文件名， 可以指定多个测试脚本
 * mocha file1 file2 file3
 * 
 * Mocha默认运行test子目录里的测试脚本，所以一般会把测试脚本放在test目录里面，然后执行模块就不需要参数了
 * 
 * 这里可以看到，test子目录里的测试脚本执行了，但，test子目录下，有个dir子目录，里面还有一个测试脚本，并没有执行
 * 原来mocha默认只执行test子目录下第一层测试用例，不会执行更下层测试用例。
 * 
 * 为了改变这种行为，必须加上--recursive参数
 * 
 */

/**
 * 通配符
 * 命令行指定测试脚本时，可以使用通配符，同时指定多个文件
 * mocha spec/{my,awesome}.js
 * 
 */