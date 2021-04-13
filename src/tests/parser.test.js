// Require dev-dependencies 
let chai = require('chai')
let should = chai.should()

// Require functions and test_data for test
let parser = require('../parser').parser
let test_log1 = require('../loadLocalFile')('./src/tests/test1.log')

describe('Testing Parser.js', ()=>{
    let result
    describe('Parser.parser(path) returns a List of games',()=>{
        it('When path is a string', (done)=>{
            result = parser(test_log1)
            result.should.be.a('array')
            done();
        })
    })
    describe('Parser.parser(path) returns null',()=>{
        it('When path is null',(done)=>{
            result = parser()
            should.not.exist(result)
            done();
        })
        it('When path is a object', (done)=>{
            result = parser([])
            should.not.exist(result)
            done();
        })
    })
})