var expect = require('chai').expect;

describe('timeout - test 超时测试', function(){
  it('测试应该5000毫秒后结束', function(done){
    var x = true;
    var f = function(){
      x = false;
      expect(x).to.be.not.ok;
      done()
    }
    setTimeout(f, 4000)
  })
})

/**
 * 上面的测试用例， 需要4000毫秒后，才有运行的结果。所以需要用 -t 或 -timeout 参数，改变默认的超时时间
 * mocha -t 5000 ./timeout.test.js
 * 
 * 另外，上面的测试用例里，有一个done函数。it执行的时候，传入done参数。当测试 结束的时候，必须显示调用这个参数
 * 告诉mocha测试结束了。否则，mocha就无法知道，测试是否结束，会一直等到超时报错
 * 
 * mocha默认会高亮显示超过75毫秒的测试用例，可以用-s或者-slow调整这个参数
 * 
 */