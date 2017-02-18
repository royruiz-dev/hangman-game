// For REST Call
// set dificulty parameter value (1..10)
// Pull word list count for specified difficulty value
// Assign random number via Math.random method to START parameter
// Assign count = 1 to return only 1 word
// save word to secretWord string

var secretWord = "maintain";
var guessLetter;
var incorrectGuesses = new Array;
var correctGuesses = new Array;
var count = 0;
var regex = /^[a-zA-Z]$/;
var display = displayUnderscores();
var status = 0;
// var gameOver = false;

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

while (status == 0) {
  guessLetter = prompt("Enter a letter!").toUpperCase();

  if (!guessLetter.match(regex)) {
    alert("You must enter a single letter from the alphabet! Numbers, special characters, and string of letters are not allowed.");// Alert the format of the letter is wrong and User must enter letter from alphabet
    continue;  // This skips the rest of the code below and brings the execution back to the beginning of the loop ‘while(!(gameOver=false))’
  }

  //Check if guesses entered have not been used before
  else if (correctGuesses.indexOf(guessLetter) > -1 || incorrectGuesses.indexOf(guessLetter) > -1) {
    alert("You have already entered letter: " + guessLetter.toUpperCase() + ". Please enter a different letter!");  // Alert the letter has already been used and tell User to enter another one
    continue;
  }

  else if (secretWord.toUpperCase().indexOf(guessLetter) > -1) {
      correctGuesses.push(guessLetter);
      for (i=0; i<secretWord.length; i++) {
        if (secretWord.toUpperCase().charAt(i) === guessLetter) {
          display = display.substr(0,i) + guessLetter + display.substr(i+1);
        }
      }
  }
  else {
    incorrectGuesses.push(guessLetter);
    count+=1;
  }

  status = gameStatus(count, display, secretWord);
  // }
  console.log("Display is: "+ display);
  console.log("Secret word is: " + secretWord);
  console.log("Incorrect Guesses: " + incorrectGuesses);
  console.log("Correct Guesses: " + correctGuesses);
  console.log("Misses: " + count);
}

  // Check for terminating conditions: "Computer wins if more than 6 guesses", "User wins if all letters are guessed correctly"
if (status == 1) userWins();
else userLoses();
