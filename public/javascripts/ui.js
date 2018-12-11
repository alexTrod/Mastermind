let colors = [
    "Grey",
    "Tomato",
    "RoyalBlue",
    "SlateBlue",
    "Orange",
    "Yellow",
    "Green",
    "Red"
]
let userPeg = {
  userPegWhite : [],
  userPegBlack : []
}
let userPegs = {
   peg0: null,
   peg1: null,
   peg2: null,
   peg3: null
}

let oponentPegs = {
    peg0:null,
    peg1:null,
    peg2:null,
    peg3:null
}

let gameSolution = {
   color0:"Red",
   color1:"Red",
   color2:"Red",
   color3:"Orange"
}

let currentGuess = {
   color0:null,
   color1:null,
   color2:null,
   color3:null
}

let oldGuess = [
    {color0:[]},
    {color1:[]},
    {color2:[]},
    {color3:[]}
]
//Game state variables
var column = 0;