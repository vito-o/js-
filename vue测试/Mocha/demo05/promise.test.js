var expect = require('chai').expect;

describe('promise test group', function(){
  it('promise test', function(){
    return fetch('https://api.github.com')
      .then(function(res){
        return res.json;
      }).then(function(json){
        expect(json).to.be.an('object')
      })
  })
})