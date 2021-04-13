// Require dev-dependencies 
let chai = require('chai')
let should = chai.should()

// Require functions and test_data for test
let loadLocalFile = require('../loadLocalFile')

describe('Testing function loadLocalFile', ()=>{
    it('Return data when file exist', (done)=>{
        let data = loadLocalFile('./src/tests/test1.log')
        data.should.be.a('string')
        done();
    })
    it('Return error when file doenst exist', (done)=>{
        let data = loadLocalFile('')
        data.should.be.a('Error')
        done();
    })
})