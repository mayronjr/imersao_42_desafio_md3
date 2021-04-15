var Parser = require('./src/parser').Parser
var loadLocalFile = require('./src/loadLocalFile')

var log = loadLocalFile('./games.log')

let parser = new Parser(log)
parser.parse()
let games_list = parser.getGames_List()
for(let i in games_list){
    console.log(games_list[i])
}