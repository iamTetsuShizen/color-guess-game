
// VARIABLES FOR THE PROGRAM
var numSquares = 6;
var colors = [];
var pickedColor;

// SELECTORS
var squares = document.querySelectorAll(".square");
var h1 = document.querySelector("h1"); // only takes the first h1, in this case is good enough.

// control behaviour
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

// display behaviour
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");


// PROGRAM
function init() {
    setUpModeButtons();
    setUpSquares();
    Game();
}

init();

resetButton.addEventListener("click", Game);


// FUNCTIONS USED IN PROGRAM

function Game() {
    // genarate new colors
    colors = generateRandomColors(numSquares);
    // pick a new random color
    pickedColor = pickColor();
    // change color display to mach picked color
    colorDisplay.textContent = pickedColor;
    //"refresh" the page to apply changes
    h1.style.backgroundColor = "steelblue";
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = " ";

    for(var i = 0; i < squares.length; i++ ) {
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else{
            squares[i].style.display = "none";
        }
    }
}
// mode buttons event listeners
function setUpModeButtons() {
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            // if there where more modes than easy and hard, this resets all hard coded
            for (var j = 0; j < modeButtons.length; j++){
                modeButtons[j].classList.remove("selected");
            }
            this.classList.add("selected");

            //figure out how many squares to show using ternary operator (condición ? expr1 : expr2)
            // same as doing an if else statement.
            if(this.textContent === "Easy") {
                numSquares = 3;
            } else if (this.textContent === "Medium"){
                numSquares = 6;
            } else {
                numSquares = 9;
            }
            
            Game();
        });
    }
}
// event listeners for squares
function setUpSquares() {
    for(var i = 0; i < squares.length; i++ ){
        // add event listeners to squares
        squares[i].addEventListener("click", function () {
            // grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            // compare color to pickedColor
            if(clickedColor === pickedColor){
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else{
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again!";
            }
        });

    }
}

function generateRandomColors(num){
    var arr = [];
    // add num random colors to array
    for(var i = 0; i < num; i++){
        // push random color to the array 'X' times
        arr.push(randomColor());
    }

    return arr;
}

function changeColors(color){
    // loop through all squares
        for(var i = 0; i < squares.length; i++){
            // change each color to match given color
            squares[i].style.backgroundColor = color;
        }
}

function pickColor() {
    // pick random number for how many squares in it (3 or 6)
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function randomColor(){
    // pick a red from 0 - 255
    var r = Math.floor(Math.random()* 256);
    // pick a green from 0 - 255
    var g = Math.floor(Math.random()* 256);
    // pick a blue  from 0 - 255
    var b = Math.floor(Math.random()* 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}