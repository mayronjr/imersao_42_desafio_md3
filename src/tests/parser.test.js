// Require dev-dependencies 
let chai = require('chai')
let should = chai.should()

// Require functions and test_data for test
let Parser = require('../parser').Parser
let test_log1 = require('../loadLocalFile')('./src/tests/test1.log')

let testParser1 = new Parser(test_log1)
let testParser2 = new Parser()
let testParser3 = new Parser([])

describe('Testing class Parser', ()=>{
    let result

    describe('Function Parser.parse() return ',()=>{
        it('true when path is a string', (done)=>{
            result = testParser1.parse()
            result.should.be.a('boolean')
            result.should.be.eql(true)
            done();
            
        })
        it('null when path is null or not a String',(done)=>{
            result = testParser2.parse()
            should.not.exist(result)
            done();
        })
    })
    
    describe('Function Parser.getGames_List() return', ()=>{
        it('a array of Objects (these are described in the Readme) when Parser.parse() is executed sucefully', (done)=>{
            result = testParser1.getGames_List()
            for(let i in result){
                result[i].should.have.property('total_kills')
                result[i].total_kills.should.be.a('number')
                result[i].should.have.property('players')
                result[i].players.should.be.a('array')
                result[i].should.have.property('kills')
                result[i].kills.should.be.a('object')
                result[i].should.have.property('kills_by_means')
                result[i].kills_by_means.should.be.a('object')
                result[i].should.have.property('ranking')
                result[i].ranking.should.be.a('array')
            }
            done();
        })
        it('null when Parser.parse() has not been executed correctly or at all', (done)=>{
            result = testParser2.getGames_List()
            should.not.exist(result)
            result = testParser3.getGames_List()
            should.not.exist(result)
            done();
        })
    })
})