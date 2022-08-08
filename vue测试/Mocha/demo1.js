/**
 * Mocha只有两个主要API
 * describe(name, fn) 定义一组测试
 * it(name, fn) 定义一项测试
 * 
 * describe(name, fn) 定义一组测试
 * it(name, fn) 定义一项测试
 * 
 */
/* 
describe('proxy', function(){
  it('proxy data 1', function(done){
    this.timeout(1000)
    assert.ok(true, 'fail')
  })
})

//在一组测试里面再定义一组测试
describe('group1', function(){
  describe('child1', function(){

  })
})

//只测试其中某一组测试
describe('test', function(){
  describe.only('testc1', function(){

  })
})

//跳过某一组测试
describe('test', function(){
  describe.skip('testc1', function(){

  })
})
 */
//断言
/**
 * mocha没有自己佩戴自己的断言库，它允许你使用第三方断言库，如node内置的assert, chai等。
 * 只要程序抛出一个错误。mocha就认为测试不通过
 * 
 * assert.fail(String|Error)
 * 抛出一个AssertionError，如果参数是一个Error，则会抛出这个Error
 * 
 * assert.ifError(any)
 * 只要any不等于undefined|null就抛出any
 * 
 * assert.ok(value[,message])
 * 测试value是否为真值
 * 
 * assert.equal(actual, expected [, message]) | assert.notEqual(actual, expected [,message])
 * 对actual和expected执行 == 比较
 * 
 * assert.strictEqual(actual, expected [, message]) | assert.notStrictEqual(actual, expected, [, message])
 * 对actual和expected执行 === 比较
 * 
 * assert.deepStrictEqual(actual, expected [, message]) | assert.notDeepStrictEqual(actual, expected [, message])
 * 测试是否深度全等， 执行的是===比较
 */
const assert = require('assert')

describe('proxy', function(){
  it('proxy data 1', function(done){
    this.timeout(1000)
    assert.ifError(null)
    done()
  })
})

//异步测试
/**
 * 回调形式
 * 如果done执行的时候有参数，如done('错误')，那么mocha判定不通过。你也可直接传入一个
 * Error对象到done函数中，如done(new Error('fail'))
 */
describe('Array', function(){
  it('should correct', function(done){
    setTimeout(()=>{
      done()//done(new Error('fail'))
    }, 1000)
  })
})

/**
 * promise形式
 * 如果it函数返回值时一个promise,将被认为是一个异步测试，并根据promise的fullfill状态来来决定测试是否通过
 */
describe('Array', function(){
  it('should correct', function(){
    return Promise.resolve()//Promise.reject()
  })
})

/**
 * 箭头函数
 * mocha 不提倡使用箭头函数，因为describe都是绑定mocha context执行的，
 * 在箭头函数中，无法获取到mocha context。如下会报错
 */
describe('Array', () => {
  it('should correct', (done) => {
    //this.timeout(1000) 
    //TypeError：this timeout is not a function
  })
})

/**
 * hook
 * mocha在整个测试周期中，提供了一组hook钩子来让开发者在测试开始之前准备环境或者
 * 是在测试完成之后清理环境
 */
describe('hooks', function(){
  before(function(){
    //run before all tests in this block
    console.log('before')
  })

  after(function(){
    //run after all tests in this block
    console.log('after')
  })

  beforeEach(function(){
    //run before each in this block
    console.log('beforeEach')
  })

  afterEach(function(){
    //run after each in this block
    console.log('afterEach')
  })
})


