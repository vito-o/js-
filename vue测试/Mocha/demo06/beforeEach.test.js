var expect = require('chai').expect;

describe('beforeEach', function(){
  var foo = false;

  beforeEach(function(){
    foo = true;
  })

  it('修改全局变量应该成功', function(){
    expect(foo).to.be.equal(true)
  })
})