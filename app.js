var express = require("express");
var http = require("http");
var websocket = require("ws");
var Game = require("./game");
var messages = require("./public/javascripts/messages");
var indexRouter = require("./routes/index");
var gameStatus = require("./statTracker");

var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));

//Route to SplashScreen
app.get("/", (req, res) => {
    res.sendFile("splash.html", {root: "./public"});
});

app.get("/game", indexRouter);
app.get("/splash", indexRouter);

var server = http.createServer(app);
const wss = new websocket.Server({server}, function(){
    console.log("Web socket is handled");
});

var websockets = {}; //property: websocket, value: game


//TO CHANGE
setInterval(function() {
    for(let i in websockets){
        if(websockets.hasOwnProperty(i)){
            let gameObj = websockets[i];
            //if the gameObj has a final status, the game is complete/aborted
            if(gameObj.finalStatus!=null){
                console.log("\tDeleting element "+i);
                delete websockets[i];
            }
        }
    }
}, 50000);


var currentGame = new Game(gameStatus.gamesInitialized++);
var connectionID = 0;//each websocket receives a unique ID

wss.on("connection", function connection(ws) {

    let con = ws;
    con.id = connectionID++;
    console.log("con.id = "+con.id);
    let playerType = currentGame.addPlayer(con);
    websockets[con.id] = currentGame;

    console.log("Player %s placed in game %s as %s", con.id, currentGame.id, playerType);
    
    // Inform the player which type he is
    
    //con.send((playerType == "A") ? messages.S_PLAYER_A : messages.S_PLAYER_B);

    //client B receives the target word (if already available)
     
    if(playerType == "B" && currentGame.solutionToGuess==null){
        /*let msg = messages.O_TARGET_WORD;
        msg.data = currentGame.solutionToGuess();
        con.send(JSON.stringify(msg));
        */
       console.log("Solution is sent");
    }
    
    //2 players --> a new Game start
    console.log(currentGame.getStatus());
    if (currentGame.hasTwoConnectedPlayers()) {
        currentGame = new Game(gameStatus.gamesInitialized++);
        console.log("Two players are connected to a new game");
    }

    //Message part to implement (abort / Win-lose)
    //Close Part to implement

});

server.listen(port, function(){
    console.log("Server is listening on the port : "+port);
});
