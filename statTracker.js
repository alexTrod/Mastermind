/* 
 In-memory game statistics "tracker".
*/

var gameStatus = {
    since : Date.now(),     /* since we keep it simple and in-memory, keep track of when this object was created */
    gamesWonCM : 0,   /* number of games won as codemaker */
    gamesWONCB : 0,       /* number of games won as codebreaker */
    gamesInitialized : 0      /* Time spent playing the game */
};

module.exports = gameStats;
