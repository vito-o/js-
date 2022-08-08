var expect = require('chai').expect;

describe('beforeEach-async', function(){
  var foo = false;

  this.beforeEach(function(done){
    setTimeout(function(){
      foo = true;
      done()
    },4000)
  })

  it('async-test', function(){
    expect(foo).to.be.equal(true)
  })
})