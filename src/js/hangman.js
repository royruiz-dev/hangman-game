// For REST Call
// set dificulty parameter value (1..10)
// Pull word list count for specified difficulty value
// Assign random number via Math.random method to START parameter
// Assign count = 1 to return only 1 word
// save word to secretWord string

var wordCount, difficulty, minLength, maxLength, start;

function reqListener () {
  wordCount = this.responseText; //.split('\n').length
  console.log(wordCount);
}

function fetchWord() {
  //http://linkedin-reach.hagbpyjegb.us-west-2.elasticbeanstalk.com/words
  var start;  //Save record to array for total count?

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/words?difficulty=8&start=5278" + "&count=1", true);
  xhttp.addEventListener("load", reqListener);
  xhttp.send(null);
}


var secretWord = "maintain";
var guess, valid;
var wrongBin, correctBin = new Array;
var count, status, guessesAllowed;
var regex = /^[a-zA-Z]$/;
var display = "";

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

//Prompt user to enter a guess letter
function enterGuess() {
  return prompt("Enter a letter!").toUpperCase();
}

function validateGuess(guess, correctBin, wrongBin) {
  if (!guess.match(regex)) return false; // Alert the format of the letter is wrong and User must enter letter from alphabet
  else if (correctBin.indexOf(guess) > -1 || wrongBin.indexOf(guess) > -1) return false; // Alert the letter has already been used and tell User to enter another one
  else return true;
}

//display word with correct guesses
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
}

function initializeNewGame() {
  resetGame();
  display = displayInitialize();
  displayUnderscores();
}

function doGuess() {
  if (status !=0 ) return;  //inversion of while loop

  guess = this.innerText;
  valid = validateGuess(guess, correctBin, wrongBin);

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
    }
  }

  status = gameStatus(count, display, secretWord);
  consoleOutput(display, secretWord, wrongBin, correctBin, count);

  if (status == 1) userWins();
  else if (status == -1) userLoses();
}
