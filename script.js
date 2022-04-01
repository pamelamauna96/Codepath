//global constants
//how long to hold each clues light/sound/seperation between each clue
const clueHoldTime = 1000;
//how long to pause in between clues
const cluePauseTime = 333;
//how long to wait before playing sequence
const nextClueWaitTime = 1000;
console.log()

//Global Variables
//pattern keeps track of the secret pattern
var pattern = [2, 2, 4, 3, 2, 1, 2, 4];

//represent how far the player keeps going
var progress = 0;

//boolean value that will keep track if player is active
var gamePlaying = false;

//var tonePlaying = false
var tonePlaying = false;

//var volume = 0.5 must be between 0.0-1.0
var volume = 0.5;

//track of where the user is in the clue sequence
var guessCounter = 0;


function startGame() {
    //initialize game variables
    progress = 0;
    gamePlaying = true;

    //whenever the game is started the start button will be hidden
    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("stopBtn").classList.remove("hidden");
    playClueSequence();
}
//swap the start and stop button

function stopGame() {
    gamePlaying = false;

    //the start button will appear and stop button will disappear
    document.getElementById("startBtn").classList.remove("hidden");
    document.getElementById("stopBtn").classList.add("hidden");
}

// Sound Synthesis Functions
const freqMap =
{
    1: 261.6,
    2: 329.6,
    3: 392,
    4: 466.2
}
//it plays a tone for the amount of time specified
function playTone(btn, len) {
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025)
    context.resume()
    tonePlaying = true
    setTimeout(function () {
        stopTone()
    }, len)
}
//will continue the tone until you call the stopTone
function startTone(btn) {
    if (!tonePlaying) {
        context.resume()
        o.frequency.value = freqMap[btn]
        g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025)
        context.resume()
        tonePlaying = true
    }
}
function stopTone() {
    g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025)
    tonePlaying = false
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0, context.currentTime)
o.connect(g)
o.start(0)

function lightButton(btn) {
    document.getElementById("button" + btn).classList.add("lit")
}
function clearButton(btn) {
    document.getElementById("button" + btn).classList.remove("lit")
}
//playing a one/single clue
function playSingleClue(btn) {
    if (gamePlaying) {
        lightButton(btn);
        playTone(btn, clueHoldTime);
        setTimeout(clearButton, clueHoldTime, btn);
    }
}

function playClueSequence() {
    //context.resume()
    //Counter = 0;
    //set the delay to initial wait time
    let delay = nextClueWaitTime;
    for (let i = 0; i <= progress; i++) {
        //for each clue that is revealed
        console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
        //set a timeout to play that clue
        setTimeout(playSingleClue, delay, pattern[i])
        delay += clueHoldTime
        delay += cluePauseTime;
    }
}

//function that shows if the user loses
function loseGame() {
    stopGame();
    alert("Game Over.");
}

//Let's the user know if they have won the game
function winGame() {
    stopGame();
    alert("You've Won!");
}

function guess(btn) {
    console.log("user guessed: " + btn);
    if (!gamePlaying) {
        return;
    }

    //add game logic here???
    if (btn === pattern[progress]) {
        if(progress === pattern.length-1)
        {
            winGame()
            return;
        }
        progress+=1
        guessCounter+=1
        playClueSequence()
            
    }

    //if user does not get it correct, user loses
    else {
        loseGame();
    }
}