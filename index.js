var fs = require('fs')
var logParser = require('./src/parser')

// In the index.js file, we will use a static file to pass by the logParser.

fs.readFile('games.log', function(err, data){
    if(!err){
        // Here we will manipule the log file to extract the list of games.
        // For Each extracted game, we will extract the necessary information.
        // The extracted information of each game is analised to resolve:
        /* 
            1. Death information.
            Must return a object that contain the following information:
                - Total Kills
                - List of Players
                - Kills per player
            Obs.:
                - When the world kills a player, the palyer lose 1 kill
                - World is not a player, thereafter should not appear in
                the player list neither in the Kills per Player.
                - Total Kills are all the deaths in game, included World Kills.
        */
        /* 
            2. ???
        */
        /* 
            3. Generate a Relatory of Types of Death.
        */
        /* 
            Plus. Generate the final inventory of each player for each game. 
        */
    }
})