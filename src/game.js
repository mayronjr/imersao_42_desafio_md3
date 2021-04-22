let Player = require('./player')

function timeStringToSeconds(str){
    return Number(str.split(':')[0])*60 + Number(str.split(':')[1])
}

class Game {
    constructor() {
        this.total_kills = 0
        this.players = []
        this.kills = {}
        this.kills_by_means = {}
        this.ranking = []
    }

    addPlayer(id, name) {
        if (!this.playerExist(id)) {
            this.players.push(new Player(id, name))
            this.kills[id] = 0
            return true
        } else {
            return false
        }
    }

    playerExist(id){
        if (this.players.find((player) => player.getId() === id)) {
            return true
        } else {
            return false
        }
    }

    changePlayerName(id, newName) {
        if (this.playerExist(id)) {
            let user = this.players.find((player) => player.getId() === id)
            user.changeName(newName)
            return true
        } else {
            return false
        }
    }

    makeKill(killer_id, killed_id, killed_with) {
        if (
            (!this.playerExist(killer_id) && killer_id !== "1022") ||
            !this.playerExist(killed_id) ||
            killed_id === "1022"
        ) {
            return false
        }
        this.total_kills += 1
        if (killer_id === "1022") {
            this.kills[killed_id] -= 1
        } else {
            this.kills[killer_id] += 1
        }
        this.transferinventory(killer_id, killed_id)
        
        if (this.kills_by_means[killed_with] === undefined) {
            this.kills_by_means[killed_with] = 1
        } else {
            this.kills_by_means[killed_with] += 1
        }
        return true
    }

    additemToPlayer(itemName, time, player_id){
        if(this.playerExist(player_id)){
            let player = this.players.find((player) => player.getId() === player_id)
            player.addItem(itemName, time)
            return true
        }else{
            return false
        }
    }

    transferinventory(killer_id, killed_id){
        if(killer_id === "1022"){
            this.players.find((player) => player.getId() === killed_id).resetInventory()
        }else{
            let PKiller = this.players.find((player) => player.getId() === killer_id)
            let PKilled = this.players.find((player) => player.getId() === killed_id)
            let PKDInventory = PKilled.getInventory()
            for(let i in PKDInventory){
                PKiller.addItem(PKDInventory[i].name, PKDInventory[i].time)            
            }
            PKilled.resetInventory()
        }
    }

    verifyItems(final_time){
        let {players} = this
        final_time = timeStringToSeconds(final_time)
        // tempo é mm:ss
        for(let i in players){
            players[i].inventory = players[i].getInventory().filter((a)=>{
                return final_time - timeStringToSeconds(a.time) <= 180
            })
        }
    }

    makeRanking() {
        for(let i in this.kills){
            this.ranking.push({id: i, points: this.kills[i]})
        }
        this.ranking.sort((a, b)=> b.points - a.points)
        return true
    }

    getGameObject() {
        let playerArray = []
        for(let i in this.players){
            playerArray.push(this.players[i].getPlayerObject())
        }
        return {
            total_kills: this.total_kills,
            players: playerArray,
            kills: this.kills,
            kills_by_means: this.kills_by_means,
            ranking: this.ranking
        }
    }
}

module.exports = Game