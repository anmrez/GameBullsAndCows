# Bulls and cows

[Demo game](http://79.132.136.197:5000/)
[My Boosty](https://boosty.to/anmrez)
[My Patreon](https://www.patreon.com/anmrez)
[my YouTube](https://www.youtube.com/channel/UCB9DSZs7L30FA9zjyz4TTaQ)

My first game

## Rules of the game
The game is played in turns by two opponents who aim to decipher the other's secret code by trial and error.

Each player write a 4-digit secret number. The digits must be all different. Then, in turn, the players try to guess their opponent's number who gives the number of matches. The digits of the number guessed also must all be different. If the matching digits are in their right positions, they are "bulls", if in different positions, they are "cows".

> Example:
    - Secret number: 4271
    - Opponent's try: 1234
    Answer: 1 bull and 2 cows. (The bull is "2" , the cows are "4" and "1" .) 

The first player to reveal the other's secret number wins the game. 

## Install

### Run client by docker
Go to folder 'client'

**Steep 1**

    docker build .

**Steep 2**

    Docker run -d -p 5005:5005 **YourCOntainerID**

> server started on 5000 port

### Run client by NPM
Go to folder 'client'

    npm i
    npm run build
    npm run serve

> server started on 5000 port


### Run server by docker
Go to folder 'server'

**Steep 1**

    docker build .

**Steep 2**

2. run docker container

> server started on 5005 port

### Run server by NPM
Go to folder 'server'

    npm i
    npm run start

> server started on 5005 port


### Additionally
- You can change the server connection address in 'client/.env'
- You can change the server address in 'server/src/main.ts'