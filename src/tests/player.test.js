// Require dev-dependencies 
let chai = require('chai')
let should = chai.should()

// Require functions and test_data for test
let Player = require('../player')

describe('Testing class Player', ()=>{
    
    describe('new Player(id, name)',()=>{
        it('throws exception when name is not a String', (done)=>{
            try {
                new Player(1, 0)    
            } catch (error) {
                done()
            }
            throw Error()
        })
        it('throws exception when id is not a number or a String', (done)=>{
            try {
                new Player([], 'teste')  
            } catch (error) {
                done()
            }
            throw Error()
        })
        it('sucefull create a new player when nothing is wrong', (done)=>{
            new Player(1, 'teste')
            done()
        })
    })
    describe('Function Player.getId() return', ()=>{
        it('the id of the Player',(done)=>{
            let tp = new Player(1, 'NNN')
            tp.getId().should.be.a('number')
            tp = new Player('1', 'NNN')
            tp.getId().should.be.a('string')
            done()
        })
    })
    describe('Function Player.getInventory() return', ()=>{
        it('the array of item of the player',(done)=>{
            let tp = new Player(1, 'NNN')
            tp.getInventory().should.be.a('array')
            done()
        })
    })
    describe('Function Player.resetInventory()', ()=>{
        it('reset the inventory of the player a empty array',(done)=>{
            let tp = new Player(1, 'NNN')
            tp.addItem('Teste', 1, 1)
            tp.resetInventory()
            tp.getInventory().should.be.a('array')
            tp.getInventory().length.should.be.eql(0)
            done()
        })
    })
    describe('Function Player.changeName(newName)', ()=>{
        it('throw exception if newName is not a String', (done)=>{
            let tp = new Player(1, 'NNN')
            try {
                tp.changeName([])
            } catch (error) {
                done()
            }
            throw Error()
        })
        it('return true when name is sucefully changed', (done)=>{
            let tp = new Player(1, 'NNN')
            tp.changeName('Name').should.be.eql(true)
            done()
        })
    })
    describe('Function Player.addItem(name, timeHours, timeMinutes)', ()=>{
        it('throw exception if name is not a String', (done)=>{
            let tp = new Player(1, 'NNN')
            try {
                tp.addItem(1, 10, 1)
            } catch (error) {
                done()
            }
            throw Error()
        })
        it('throw exception if timeHours is not a Number', (done)=>{
            let tp = new Player(1, 'NNN')
            try {
                tp.addItem('1', '10', 1)
            } catch (error) {
                done()
            }
            throw Error()
        })
        it('throw exception if timeMinutes is not a Number', (done)=>{
            let tp = new Player(1, 'NNN')
            try {
                tp.addItem('1', 10, '1')
            } catch (error) {
                done()
            }
            throw Error()
        })
        it('return true when name is sucefully changed', (done)=>{
            let tp = new Player(1, 'NNN')
            tp.addItem('ItemName', 10, 1).should.be.eql(true)
            done()
        })
    })
    describe('Function Player.getPlayerObject() return',()=>{
        it('a object contining all of variables of the class when user is sucefully created', (done)=>{
            var player_test = new Player(1, 'Name')
            var obj = player_test.getPlayerObject()
            obj.should.have.property('name')
            obj.name.should.be.a('string')
            obj.should.have.property('id')
            obj.should.have.property('old_nicks')
            obj.old_nicks.should.be.a('array')
            done()
        })
    })    
})