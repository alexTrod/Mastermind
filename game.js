var game = function (gameID) {
    this.playerA = null;
    this.playerB = null;
    this.id = gameID;
    this.solutionToGuess = null; 
    this.gameState = "0 JOINT"; //"A" means A won, "B" means B won, "ABORTED" means the game was aborted
 };

game.prototype.getSolutionToGuess = function(){
    return this.solutionToGuess;
};
game.prototype.getStatus = function(){
    return this.gameState;
}


game.prototype.setStatus = function (w) {
    this.gameState = w;
};

game.prototype.hasTwoConnectedPlayers = function(){
    return (this.gameState == "2 JOINT");
};

game.prototype.addPlayer = function (p) {
    if(this.gameState == "0 JOINT"){
        this.playerA = p;
        this.setStatus("1 JOINT");
        return "A";
    }

    else if(this.gameState == "1 JOINT" ){
        this.playerB = p;
        this.setStatus("2 JOINT");
        return "B";
    }

    //If already 2 players
    else if (this.gameState != "0 JOINT" && this.gameState != "1 JOINT") {
        return new Error("Invalid call to addPlayer, current state is %s", this.gameState);
    }
};

 module.exports = game;
