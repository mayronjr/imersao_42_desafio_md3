// Require dev-dependencies 
let chai = require('chai')
let should = chai.should()

// Require functions and test_data for test
let Game = require('../game')

describe('Testing class Game', ()=>{
    let game_test = new Game()
    game_test.addPlayer('10', 'Teste')
    game_test.addPlayer('5', 'Teste')

    describe('Function Game.addPlayer(id, name) return',()=>{
        it('true when player is add with sucess', (done)=>{
            game_test.addPlayer('1', 'Testing').should.be.eql(true)
            done()
        })
        it('false when player already exists', (done)=>{
            game_test.addPlayer('10', 'Testing').should.be.eql(false)
            done()
        })
    })
    describe('Function Game.changePlayerName(id, name) return',()=>{
        it('true when player name is altered with sucess', (done)=>{
            game_test.changePlayerName('10', 'Test').should.be.eql(true)
            done()
        })
        it('false when player doesnt exist', (done)=>{
            game_test.changePlayerName('2', 'Testing').should.be.eql(false)
            done()
        })
    })
    describe('Function Game.makekill(killer_id, killed_id, killed_with) return',()=>{
        it('true when killer and killed exist', (done)=>{
            game_test.makeKill('5', '10', 'testing').should.be.eql(true)
            done()
        })
        it('true when killer is the <world> (id = 1022) and killed exist', (done)=>{
            game_test.makeKill('1022', '10', 'testing').should.be.eql(true)
            done()
        })
        it('false when killer exist and killed is the <world> (id = 1022)', (done)=>{
            game_test.makeKill('10', '1022', 'testing').should.be.eql(false)
            done()
        })
        it('false when killer doesnt exist', (done)=>{
            game_test.makeKill('-1', '10', 'testing').should.be.eql(false)
            done()
        })
        it('false when killed doesnt exist', (done)=>{
            game_test.makeKill('10', '-1', 'testing').should.be.eql(false)
            done()
        })
    })
    describe('Function Game.makeRanking() return',()=>{
        it('true', (done)=>{
            game_test.makeRanking().should.be.eql(true)
            done()
        })
    })
    describe('Function Game.getGameObject() return',()=>{
        it('a object contining all of variables of the class', (done)=>{
            var obj = game_test.getGameObject()
            obj.should.have.property('total_kills')
            obj.total_kills.should.be.a('number')
            obj.should.have.property('players')
            obj.players.should.be.a('array')
            obj.should.have.property('kills')
            obj.kills.should.be.a('object')
            obj.should.have.property('kills_by_means')
            obj.kills_by_means.should.be.a('object')
            obj.should.have.property('ranking')
            obj.ranking.should.be.a('array')
            done()
        })
    })
    describe('Function Game.playerExist(id) return',()=>{
        it('true when player exist', (done)=>{
            game_test.playerExist('10').should.be.eql(true)
            done()
        })
        it('false when player doesnt exist', (done)=>{
            game_test.changePlayerName('2').should.be.eql(false)
            done()
        })
    })

    describe('Function Game.addItemToPlayer(itemName, time, player_id) returns',()=>{
        it('true when player exists', (done)=>{
            game_test.additemToPlayer('Teste', '00:00', '10').should.be.eql(true)
            done()
        })
        it('false when player doesnt exist', (done)=>{
            game_test.additemToPlayer('Teste', '00:00', -1).should.be.eql(false)
            done()
        })

    })

    describe('Function Game.transferinventory(killer_id, killed_id)',()=>{
        it('When killer is the world, the items of the killed player are destroyed', (done)=>{
            let inventoryPlayer10 = game_test.players.find((player) => player.getId() === "10").getInventory()
            inventoryPlayer10.length.should.be.eql(1)
            game_test.transferinventory("1022", "10")
            inventoryPlayer10 = game_test.players.find((player) => player.getId() === "10").getInventory()
            inventoryPlayer10.length.should.be.eql(0)
            done()
        })
        it('when killer is not the world, the inventory of the killed pass to the killer', (done)=>{
            game_test.additemToPlayer('teste', '00:00', '5')
            
            let invPlayer = game_test.players.find((player) => player.getId() === "5").getInventory()
            invPlayer.length.should.be.eql(1)
            invPlayer = game_test.players.find((player) => player.getId() === "1").getInventory()
            invPlayer.length.should.be.eql(0)
            
            game_test.transferinventory("1", "5")
            
            invPlayer = game_test.players.find((player) => player.getId() === "5").getInventory()
            invPlayer.length.should.be.eql(0)
            invPlayer = game_test.players.find((player) => player.getId() === "1").getInventory()
            invPlayer.length.should.be.eql(1)
            done()
        })
    })

    describe('Function Game.verifyItems(final_time)', ()=>{
        it('Make every item that is more than 3 minutes old expire', (done)=>{
            game_test.additemToPlayer('Item', '01:00', '1')
            
            let inventoryPlayer1 = game_test.getGameObject().players[2].inventory
            inventoryPlayer1.length.should.be.eql(2)
            
            game_test.verifyItems('03:01')
            
            inventoryPlayer1 = game_test.getGameObject().players[2].inventory
            inventoryPlayer1.length.should.be.eql(1)
            
            done()
        })
    })
      
})