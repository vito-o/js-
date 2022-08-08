var request = require('superagent');
var expect = require('chai').expect;

describe('async', function(){
  it('async test', function(done){
    request
      .get('https://api.github.com')
      .end(function(req, res){
        //console.log(res)
        expect(res).to.be.an('object');
        done();
      })
  })
})
