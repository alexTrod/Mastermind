function currentRowPicker(){
    "use strict";
    let i = 0;
    while(i!==4){
        if(currentGuess["color"+i]==null){
            return i;
        }
        i++;
    }
    return false;
}

function colorPicker(colorPick){
    "use strict";
    let curColor = colors[colorPick];
    let curRowPicker = currentRowPicker();
    console.log(currentRowPicker());
    console.log(curColor);
    $(".tdGuessColumn"+curRowPicker+">div>div").css("color",curColor);
    currentGuess["color"+curRowPicker] = curColor;
    return true;
}

function addClickColor(){
    "use strict";
    for(let i = 0;i<8;i++){       
        $(".tdColorPicker"+i).click(function() {
            colorPicker(i);
        });
        $(".tdColorPicker"+i+">div>div").css("color", colors[i]);
    }
}
function colorRemover(i){
    $(".tdGuessColumn"+i+">div>div").css("color","white");
    currentGuess["color"+i] = null;
}
function addClickRemover(){
    for(let i = 0; i<4;i++){
        $(".tdRemover"+i).click(function(){
            colorRemover(i);
        });
    }
}

function rowsFilled(){
    "use strict";
    for(let i = 0;i<4;i++){
        if(currentGuess["color"+i]==null){
            return false;
        }
    }
    return true;
}

function timer(){
    var secs = 0;
    var min = $(".min");
    var sec = $(".sec");
    var id = setInterval(function(){ 
        secs++;
        if(secs> 1){
            var minutes = Math.floor(secs/60) < 10 ? "0"+Math.floor(secs/60) : Math.floor(secs/60);
            var seconds = secs%60<10 ? "0"+secs%60 : secs%60;
            min.text(minutes);
            sec.text(seconds);
        }
    }, 1000);
}
// CHECK SECTION
function checkColors() {
    userPeg.userPegBlack = [];
    userPeg.userPegWhite.length = [];
    if (rowsFilled()) {
        for(var i = 0; i <4; i++) {
            color = currentGuess["color"+i];
            dcolor = gameSolution["color"+i];
            if (currentGuess["color"+i] == gameSolution["color"+i]){ 
                userPeg.userPegBlack.push(currentGuess["color"+i] );
            }
            else if (color == gameSolution["color"+(i+1)%4] || color == gameSolution["color"+(i+2)%4] || color == gameSolution["color"+(i+3)%4]) {        
                userPeg.userPegWhite.push(currentGuess["color"+i]);
            }        
        }
        //console.table(userPeg);
        pegColor();
        pegsToStyle();
        changeBoardColors();
        removeAllGuessColumn();
    }
    else{
        alert("Please fill");
    }
}
function checkOccurence(arr, str){
    let n = 0;
    for(let i = 0;i<arr.length;i++){
        if(arr[i] == str){
            n++;
        }
    }
    return n;
}
function checkOccurenceDA(arr, str){
    let n = 0;
    for(let i = 0;i<4;i++){
        if(arr["color"+i] == str){
            n++;
        }
    }
    return n;
}
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
function pegColor() {
    var l = 0;
    var k = userPeg.userPegBlack.length;
    while (k > 0) {
        userPegs["peg"+l] = true;
        k--
        l++
    }
    var uniqueWhite = userPeg.userPegWhite.filter(onlyUnique); 

    let numberFalse = 0;

    for(var i = 0; i<uniqueWhite.length; i++) {
       var search =  uniqueWhite[i]; 
       var occWhite = checkOccurence(userPeg.userPegWhite, search);
       var occBlack = checkOccurence(userPeg.userPegBlack, search);
       var occSol = checkOccurenceDA(gameSolution, search);

       if (occBlack > 0) { //occurence case
            numberFalse = numberFalse + Math.min(occSol - occBlack, occWhite);
       }
       else{//no occurence case
            numberFalse = numberFalse +Math.min(occWhite, occSol);
       }
    }
    addFalse(numberFalse, l);
}

function addFalse(nFalse, index){
    for(let i = 0;i<nFalse;i++){
        console.log("false added");
        userPegs["peg"+(index++)] = false;
    }
}

function pegsToStyle(){
    for(let i = 0;i<4;i++){
        if(userPegs["peg"+i]==null){
            $(".peg"+column+"_"+i).css("color","gray");
        }
        else if(userPegs["peg"+i]){
            $(".peg"+column+"_"+i).css("color","green");
        }
        else if(!userPegs["peg"+i]){
            $(".peg"+column+"_"+i).css("color","red");
        }
    }
}

function messageFill(str){
    $(".messageBox").text(str);
}

function removeAllGuessColumn(){
    for(let i = 0;i<=4;i++){
        colorRemover(i);
    }
    column++;
}
function changeBoardColors(){
    let curColumn = column +2;
    for(var i = 0;i<4;i++){
        $(".tdCircles"+curColumn+"_"+i + ">div>div").css("color",currentGuess["color"+i]);
    } 
}

function disableBoard(){
    //POP-UP SHOWS UP, PLAYER A have to chose a combination
}
//Win function

/*
$(function(){
    timer(); 
    addClickColor();
    addClickRemover();    
})();
*/



/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
  fullscreen = true;
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
  fullscreen = false;

}

function fullScreenSet(){
    if(fullscreen){
        closeFullscreen();
    }
    else{
        openFullscreen();
    }
}
