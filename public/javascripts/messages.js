(function(exports){

    exports.gameSolution = {
        solutionChoice : {
            color0:null, 
            color1:null,
            color2:null, 
            color3:null}
    }    
    exports.S_gameSolution = JSON.stringigy(exports.gameSolution);

  
    exports.PlayerType = "PLAYER-TYPE";

    exports.playerTypeA = {                            
        type: exports.PlayerType,
        data: "A"
    };
    exports.S_playerTypeA = JSON.stringify(exports.playerTypeA);

    exports.playerTypeB = {
        type : exports.PlayerType,
        data : "B"
    }

    exports.S_playerTypeB = JSON.stringify(exports.playerTypeB);

    exports.gameAbortedPlayer = "Game Aborted Player"

    exports.gameAborted = {
        type : exports.gameAbortedPlayer
    }

    exports.S_gameAborted = JSON.stringify(exports.gameAborted);


    exports.gameWonBy  = "Game-won-by";
    
    exports.gameWinnerA = {
        type: exports.gameWonBy,
        data : "A"                                                              
    }
    exports.S_gameWinnerA = JSON.stringify(exports.gameWinnerA);
    
    exports.gameWinnerB = {
        type: exports.gameWonBy,
        data : "B"                                                              
    }
    exports.S_gameWinnerB = JSON.stringify(exports.gameWinnerB);
    }(typeof exports === 'undefined' ? this.utilities = {} : exports));
