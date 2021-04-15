class Parser {
    constructor(log) {
        this.log = log
        this.games_list = null
    }

    getGames_List(){
        return this.games_list
    }

    parse() {
        var log = this.log
        // Verify if log is a string
        if (typeof log !== 'string') return null
        // Creation of variables
        let i, line, game = [], is_game = false
        var games_list = []
        var split_log = log.split('\n')
        // It will filter all lines of the file searching for each InitGame
        for (i in split_log) {
            line = split_log[i]
            if (line.search('InitGame') !== -1) {
                if (game.length !== 0) {
                    games_list.push(game)
                }
                is_game = true
                game = []
            } else if (line.search('ShutdownGame') !== -1) {
                games_list.push(game)
                game = []
                is_game = false
            } else if (is_game) {
                game.push(line.trim())
            }
        }
        // Before returning the games, will transform the lines to something more undertable.
        for (i in games_list) {
            game = games_list[i]
            let transformed_game = {
                total_kills: 0,
                players: [],
                kills: {},
                kills_by_means: {},
                ranking: []
            }
            for (let j in game) {
                if (game[j].search('ClientUserinfoChanged') !== -1) {
                    let id = game[j].trim().split(' ')[2].trim()
                    let name = game[j].trim().split('\\')[1].trim()
                    if (!transformed_game.players.find((player) => player.id === id)) {
                        transformed_game.players.push({ id, name, old_nicks: [] })
                    } else {
                        let user = transformed_game.players.find((player) => player.id === id)
                        user.old_nicks.push(user.name)
                        user.name = name
                    }
                    if (transformed_game.kills[id] === undefined) {
                        transformed_game.kills[id] = 0
                    }
                }
                if (game[j].search('Kill') !== -1) {
                    transformed_game.total_kills += 1

                    let splited_message = game[j].trim().split(':')[2].trim()
                    let killer = splited_message.split(' ')[0].trim()
                    let killed = splited_message.split(' ')[1].trim()

                    if (killer === "1022") {
                        transformed_game.kills[killed] -= 1
                    } else {
                        transformed_game.kills[killer] += 1
                    }
                    let killed_with = game[j].trim().split(':')[3].split('by')[1].trim()
                    if (transformed_game.kills_by_means[killed_with] === undefined) {
                        transformed_game.kills_by_means[killed_with] = 1
                    } else {
                        transformed_game.kills_by_means[killed_with] += 1
                    }
                }
            }
            for(let i in transformed_game.kills){
                transformed_game.ranking.push({id: i, points: transformed_game.kills[i]})
            }
            transformed_game.ranking.sort((a, b)=> b.points - a.points)
            games_list[i] = transformed_game
        }
        this.games_list = games_list
        return true
    }
}

module.exports = {
    Parser
}