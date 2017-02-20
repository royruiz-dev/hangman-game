// For REST Call
// set dificulty parameter value (1..10)
// Pull word list count for specified difficulty value
// Assign random number via Math.random method to START parameter
// Assign count = 1 to return only 1 word
// save word to secretWord string

var wordBank = "";
var secretWord;
var start, filter;

//Set certain REST API parameters
var difficulty = 7;
var minLength = 4;
var maxLength = 8;


filter = filterWords(difficulty, minLength, maxLength);

//Return a string for the url in GET method
function filterWords(difficulty, minLength, maxLength) {
  return "&difficulty=" + difficulty + "&minLength=" + minLength + "&maxLength=" + maxLength;
}


function reqListener() {
  if (this.readyState === 4) {
    if (this.status === 200) {
      wordBank = this.responseText;
      initializeNewGame();
    }
    else blockScreen();
  }
}

function blockScreen() {
  var item = document.getElementById('errorOverlay');
  item.style.display = "block";
}

function fetchWord() {
  //http://linkedin-reach.hagbpyjegb.us-west-2.elasticbeanstalk.com/words
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/words?" + filter, true);
  xhttp.addEventListener("load", reqListener);
  xhttp.addEventListener("error", blockScreen);
  xhttp.addEventListener("abort", blockScreen);
  xhttp.send(null);
}

//Randomize a word after the REST call execute and data in wordBank
function randomizeWord() {
  var index = Math.floor(Math.random()*wordBank.split('\n').length);
  return wordBank.split('\n')[index];
}


var guess, valid;
var wrongBin, correctBin = new Array;
var count, status, guessesAllowed;
var regex = /^[a-zA-Z]$/;
var display = "";


//Display a set of underscores to use for later comparison
function displayInitialize() {
  var display = "";
  for (i=0; i<secretWord.length; i++) display+="_";
  return display;
}

// Display a set of underscores equal to length of secretWord
function displayUnderscores() {
  var word = document.getElementById('wordChallenge');
  var displayBlanks = secretWord.replace(/./g,"<div class='letterBox'></div> ")
  word.innerHTML = displayBlanks;
}

//Display Hangman as incorrect guesses appear
function displayHangman(count) {
    var list = document.getElementsByClassName('hangmanDude')[0];
    list.getElementsByTagName('img')[count-1].style.display = "block";
}

//Display word with correct guesses
function displayString(secretWord, guess) {
  var letterBoxes = document.getElementsByClassName('letterBox');
  for (i=0; i<secretWord.length; i++) {
    if (secretWord.toUpperCase().charAt(i) === guess) {
      letterBoxes[i].innerHTML = guess;
      display = display.substr(0,i) + guess + display.substr(i+1);
    }
  }
  return display;
}

//Dump correct guesses in correctBin
function rightGuess(guess, correctBin) {
  correctBin.push(guess);
}

//Display incorrect guesses
function wrongGuess(wrongBin) {
  var wrongBucket = document.getElementById('wrongGuesses');
  var displayWrongGuesses = wrongBin.map(function(x){return "<div class='wrongLetter'>" + x + "</div>"}).join(', ');
  wrongBucket.innerHTML = "Incorrect Guesses: " + displayWrongGuesses;
}

//Display guesses remaining
function guessesRemaining(count){
  var guessesLeft = document.getElementById('guessesLeft');
  guessesLeft.innerHTML = "Guesses remaining: <div class='guessCount'>" + (guessesAllowed - count) + "</div>";
}

//Perform guess and secret word validation
function validateGuess(guess, correctBin, wrongBin, secretWord) {
  if (!guess.match(regex)) return false; // Alert the format of the letter is wrong and User must enter letter from alphabet
  else if (!/[a-zA-Z]/.test(secretWord)) return false;
  else if (correctBin.indexOf(guess) > -1 || wrongBin.indexOf(guess) > -1) return false; // Alert the letter has already been used and tell User to enter another one
  else return true;
}

//Determine status of the the game
function gameStatus(count, display, secretWord) {
  if (count >= guessesAllowed) return -1;  // Computer wins
  else if (display === secretWord.toUpperCase()) return 1; // User wins
  else return 0;  //Let's keep playing
}

//Alert user wins
function userWins() {
  var winner = document.getElementById('gameWinner');
  winner.innerHTML = "Guesser Wins!";
}

//Alert computer wins
function userLoses() {
  var winner = document.getElementById('gameWinner');
  winner.innerHTML = "Secret Keeper Wins!";
}

//Write to the console log for debugging purposes
function consoleOutput(display, secretWord, wrongBin, correctBin, count) {
  console.log("Display is: "+ display);
  console.log("Secret word is: " + secretWord);
  console.log("Wrong Guesses: " + wrongBin);
  console.log("Correct Guesses: " + correctBin);
  console.log("Misses: " + count);
}

//Initializes all variables necessary to reset game
function resetGame() {
  status = 0;
  count = 0;
  correctBin = [];
  wrongBin = [];
  display = "";
  guessesAllowed = 6;

  guessesRemaining(count);
  document.getElementById('gameWinner').innerHTML = "";
  document.getElementById('wrongGuesses').innerHTML = "";
  document.getElementById('wordChallenge').innerHTML = "";

  for (i=0; i<guessesAllowed; i++) {
    var list = document.getElementsByClassName('hangmanDude')[0];
    list.getElementsByTagName('img')[i].style.display = "none";
  }
}

//Initializes a new game
function initializeNewGame() {
  resetGame();
  secretWord = randomizeWord();
  display = displayInitialize();
  displayUnderscores();
}

//Main part of program where it loops until game winner decided
function doGuess() {
  if (status !=0 ) return;  //inversion of while loop

  guess = this.innerText;
  valid = validateGuess(guess, correctBin, wrongBin, secretWord);

  if (valid) {
    if (secretWord.toUpperCase().indexOf(guess) > -1) {
      rightGuess(guess, correctBin);
      display = displayString(secretWord, guess);
    }
    else {
      count+=1;
      wrongBin.push(guess);

      wrongGuess(wrongBin);
      guessesRemaining(count);
      displayHangman(count);
    }
  status = gameStatus(count, display, secretWord);
  }

  consoleOutput(display, secretWord, wrongBin, correctBin, count);

  if (status == 1) userWins();
  else if (status == -1) userLoses();
}
