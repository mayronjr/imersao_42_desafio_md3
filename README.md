# Desafio 3 - Quark Log Parser

Um conjunto de algoritmos, classes e funções usadas como parser para o log do jogo Quark.

O resultado final do algoritmo são informações sobre os jogos marcados no arquivo de log.

## Pré-requisitos

`Node-js >= v8.0.0`

## Preparando projeto

Após clonagem do projeto, executar `npm install` na pasta do projeto para baixar as dependencias necessárias.

## Rodando o projeto

Após preparação, é possível executar o projeto com o comando `npm start`.

## Testando o projeto

Os módulos do projeto foram testados usando o Chai, o Mocha e o nyc.

Após preparação, é possível testar o projeto com o comando `npm test`.

# Como usar o Parser

Para usar o quark log parser é necessário importar a classe Parser, localizada no arquivo `/src/parser.js` e criar uma variavel que recebe:

`var parser = new Parser(Log_String)`

A entrada do Parser é uma string que contem o conteudo do arquivo de log.

Junto com o projeto está incluso a função `loadLocalFile(path)`, que carrega os dados de um arquivo local.

Abaixo temos um trecho de código que exemplica o uso do Parser:


    var Parser = require('./src/parser').Parser
    var loadLocalFile = require('./src/loadLocalFile')

    var log = loadLocalFile('./games.log')
    var parser = new Parser(log)
    parser.parse()
    var games_list = parser.getGames_List()


# Descrição das classes e funções

## Função `loadLocalFile(path)`

Essa função usa o modulo `fs` para carregar um arquivo local e retornar os dados desse arquivo.

Entrada:

    path (String): caminho até o arquivo de log

Saida:

    Dados do arquivo em formato String

## Classe Parser

A classe Parser é um conjunto de funções e variaveis que permitem manipular e interpretar os dados contidos no arquivo de log do jogo Quake.

Usando:
    
    var parser = new Parser(dados_log)

### Parser.parse()

A função parse irá interpretar a string `dados_log` caso a mesma exista.

Saidas:

    - null: caso dados_log não seja uma string

    - true: caso dados_log seja uma string e nenhum erro tenha acontecido durante o processo de parsing

### Parser.getGames_List()

A função `getGames_List` retorna pro usuário a lista de jogos identificados pela função `parse`.

Saida:

    Array contendo os jogos identificados

## Classe Game

A classe Game é um conjunto de funções e variaveis que permitem o gerenciamento de um jogo. Ela contém 6 funções:

- `addPlayer(id, name)`
- `changePlayerName(id, name)`
- `makekill(killer_id, killed_id, killed_with)`
- `makeRanking()`
- `playerExist(id)`
- `getGameObject()`
