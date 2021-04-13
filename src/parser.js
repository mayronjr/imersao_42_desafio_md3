function parser(log){
    // Verify if log is a string
    if(typeof log !== 'string') return null
    // Creation of variables
    let i, line, game = [], is_game = false
    var games_list = []
    var split_log = log.split('\n')
    // It will filter all lines of the file searching for each InitGame
    for(i in split_log){
        line = split_log[i]
        if(line.search('InitGame') !== -1){
            if(game.length !== 0){
                games_list.push(game)
            }
            is_game = true
            game = []
        }else if(line.search('ShutdownGame') !== -1){
            games_list.push(game)
            game = []
            is_game = false
        }else if(is_game){
            game.push(line.trim())
        }
    }
    for(i in games_list){
        game = games_list[i]
        console.log(game)
    }
    return games_list
}

module.exports = {
    parser
}