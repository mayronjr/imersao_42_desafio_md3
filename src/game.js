class Game {
    constructor() {
        this.total_kills = 0
        this.players = []
        this.kills = {}
        this.kills_by_means = {}
        this.ranking = []
    }

    addPlayer(id, name) {
        if (!this.players.find((player) => player.id === id)) {
            this.players.push({ id, name, old_nicks: [] })
            this.kills[id] = 0
            return true
        } else {
            return false
        }
    }

    playerExist(id){
        if (this.players.find((player) => player.id === id)) {
            return true
        } else {
            return false
        }
    }

    changePlayerName(id, newName) {
        if (this.players.find((player) => player.id === id)) {
            let user = this.players.find((player) => player.id === id)
            user.old_nicks.push(user.name)
            user.name = newName
            return true
        } else {
            return false
        }
    }

    makeKill(killer_id, killed_id, killed_with) {
        if (
            (!this.players.find((player) => player.id === killer_id) && killer_id !== "1022") ||
            !this.players.find((player) => player.id === killed_id) ||
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
        
        if (this.kills_by_means[killed_with] === undefined) {
            this.kills_by_means[killed_with] = 1
        } else {
            this.kills_by_means[killed_with] += 1
        }

        return true
    }

    makeRanking() {
        for(let i in this.kills){
            this.ranking.push({id: i, points: this.kills[i]})
        }
        this.ranking.sort((a, b)=> b.points - a.points)
        return true
    }

    getGameObject() {
        return {
            total_kills: this.total_kills,
            players: this.players,
            kills: this.kills,
            kills_by_means: this.kills_by_means,
            ranking: this.ranking
        }
    }
}

module.exports = Game