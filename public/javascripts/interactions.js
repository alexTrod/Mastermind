function messageFill(str){
    $(".messageBox").text(str);
}

function enableSolutionPicker(){
    $(".tableChoose").css("display", "table"); 

}
function disableSolutionPicker(){
    $(".tableChoose").css("display","none");
}
function enableMastermindBoard(){
    $(".tableMastermind").css("display", "table");
}
function currentRowPickerSolution(){
    "use strict";
    let i = 0;
    while(i!==4){
        if(gameSolution["color"+i]==null){
            return i;
        }
        i++;
    }
    return false;
}

function colorPickerSolution(c){
    "use strict";
    let curColor = colors[c];
    let curRowPicker = currentRowPickerSolution();
    console.log($(".tdGuessColumnSolution"+curRowPicker + ">div>div"));
    $(".tdGuessColumnSolution"+curRowPicker + ">div>span").css("color",curColor);
    gameSolution["color"+curRowPicker] = curColor;
    return true;
}
function addClickColorSolution(){
    "use strict";
    for(let i = 0;i<8;i++){ 
        $(".tdColorPickerSolution"+i+">div>div").css("color", colors[i]);      
        $(".tdColorPickerSolution"+i).click(function() {
            colorPickerSolution(i);
        });
    }
}
function colorRemoverSolution(i){
    $(".tdGuessColumnSolution"+i+">div>span").css("color","white");
    gameSolution["color"+i] = null;
}
function addClickRemoverSolution(){
    for(let i = 0; i<4;i++){
        $(".tdRemoverSolution"+i).click(function(){
            colorRemoverSolution(i);
        });
    }
}
function sendGameSolution(){
    for(let i = 0;i<4;i++){
        Messages.gameSolution.solutionChoice["color"+i] = gameSolution["color"+i];
        console.log( Messages.gameSolution.solutionChoice["color"+i] );
    }
    return JSON.stringify(Messages.gameSolution);
}

//Set UP
(function setup(){
    var socket = new WebSocket("ws://127.0.0.1:2500");
    socket.onopen = function(){
        messageFill("Wait another player...");
        console.log("A web socket connection was opened");
    }

    socket.onmessage = function(event){ 
        
        let incomingMsg = JSON.parse(event.data);
        if (incomingMsg.type == Messages.PlayerType) { //handle player type
            letter = incomingMsg.data;
            if(letter == "A"){                
                messageFill("You are the code maker, make a code...");
                enableSolutionPicker();
                addClickColorSolution();
                addClickRemoverSolution();
                $(".buttonSolution").click(function() {
                   socket.send(sendGameSolution());
                   disableSolutionPicker();
                   messageFill("The code breaker tries to break your code...");
                });
                //showChoser();
                //sendCombination();
            }
            else{       //letter = B
                messageFill("You are the code breaker... The code maker is making the code...");
               
            }
        }
        if(incomingMsg.type == Messages.gameSolutionType){ //handle gameSolution
            gameSolution = incomingMsg.solutionChoice;
            if(letter == "B"){
                timer();
                messageFill("You are the code breaker... You can start...");
                addClickColor();
                addClickRemover();    
                enableMastermindBoard();
            }
            else{
            }
            timer();
        }
    }
})();
