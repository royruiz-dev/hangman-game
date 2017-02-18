// For REST Call
// set dificulty parameter value (1..10)
// Pull word list count for specified difficulty value
// Assign random number via Math.random method to START parameter
// Assign count = 1 to return only 1 word
// save word to secretWord string

var secretWord = "maintain";
var guess;
var wrongBin = new Array;
var correctBin = new Array;
var count = 0;
var regex = /^[a-zA-Z]$/;
var display = displayUnderscores();
var status = 0;
var valid;

// Display a set of underscores equal to length of secretWord
function displayUnderscores(){
  var display = "";
  for (i=0; i<secretWord.length; i++){
    display+="_";
  }
  return display;
}

function gameStatus(count, display, secretWord){
  if (count > 6) return -1;  // Computer wins
  else if (display === secretWord.toUpperCase()) return 1; // User wins
  else return 0;  //Let's keep playing
}

function userWins(){
  alert("User Wins!");
}

function userLoses(){
  alert("Computer Wins!");
}

function enterGuess(){
  return prompt("Enter a letter!").toUpperCase();
}

function validateGuess(guess, correctBin, wrongBin){
  if (!guess.match(regex)) return false; // Alert the format of the letter is wrong and User must enter letter from alphabet
  else if (correctBin.indexOf(guess) > -1 || wrongBin.indexOf(guess) > -1) return false; // Alert the letter has already been used and tell User to enter another one
  else return true;
}

function rightGuess(guess, correctBin){
  correctBin.push(guess);
}

function wrongGuess(guess, wrongBin){
  wrongBin.push(guess);
}

function displayString(display, secretWord, guess){
  for (i=0; i<secretWord.length; i++) {
    if (secretWord.toUpperCase().charAt(i) === guess) {
      display = display.substr(0,i) + guess + display.substr(i+1);
    }
  }
  return display;
}

while (status == 0) {
  guess = enterGuess();
  valid = validateGuess(guess, correctBin, wrongBin);

  if (valid) {
    if (secretWord.toUpperCase().indexOf(guess) > -1) {
      rightGuess(guess, correctBin);
      display = displayString(display, secretWord, guess);
    }
    else {
      wrongGuess(guess, wrongBin);
      count+=1;
    }
  }

  status = gameStatus(count, display, secretWord);

  console.log("Display is: "+ display);
  console.log("Secret word is: " + secretWord);
  console.log("Wrong Guesses: " + wrongBin);
  console.log("Correct Guesses: " + correctBin);
  console.log("Misses: " + count);
}

  // Check for terminating conditions: "Computer wins if more than 6 guesses", "User wins if all letters are guessed correctly"
if (status == 1) userWins();
else userLoses();
