// For REST Call
// set dificulty parameter value (1..10)
// Pull word list count for specified difficulty value
// Assign random number via Math.random method to START parameter
// Assign count = 1 to return only 1 word
// save word to secretWord string


// filter = filterWords(difficulty, minLength, maxLength);

// //Return a string for the url in GET method
// function filterWords(difficulty, minLength, maxLength) {
//   return "&difficulty=" + difficulty + "&minLength=" + minLength + "&maxLength=" + maxLength;
// }

//This function allows the XMLHttpRequest object to obtain the response from the server once it reaches a good readyState and status is clear to fetch. This is a robust way to perform request. After the response(long string value) is obtained by the object, it is saved in wordBank string and the game initializes by calling initializeGame()

//If the server is not responding, then it will execute blockScreen() and game will not be started
function reqListener() {
  if (this.readyState === 4) {
    if (this.status === 200) {
      wordBank = JSON.parse(this.responseText);
      initializeNewGame();
    }
    else blockScreen();
  }
}

//This function initializes an object with the document elements associated to id='errorOverlay' and then changes the CSS to show a blocked screen via 'display: block'. This functions is created for error handling
function blockScreen() {
  var item = document.getElementById('errorOverlay');
  item.style.display = "block";
}

//Function that executes a REST call via the xMLHttpRequest object. First, it executes an open method to initialize a request. It runs the 'GET' method to fetch data pointing to the string concatenated by 'url + filter'. The third parameter is a Boolean determining this request will be asynchronous. Asynchronous request allows the browser to continue to be responsive while it requests the data. It appears to be recommended.

//After fetching the data, an event handler runs as 'load' implementing the reqListener(). For error handling, two event handlers were added to also execute blockScreen() in the case there is and 'error' or 'abort' on the server-side
function fetchWord() {

  var xhttp = new XMLHttpRequest();
  // xhttp.open("GET", url + filter, true);
  xhttp.open("GET", url , true);
  xhttp.addEventListener("load", reqListener);
  xhttp.addEventListener("error", blockScreen);
  xhttp.addEventListener("abort", blockScreen);
  xhttp.send(null);
}

//This function determines the word count of wordBank array by calling 'length' property. It uses the count to provide a random number. A number is used to pull one array element, which becomes our secret word for the current game
function randomizeWord() {
  var index = Math.floor(Math.random() * wordBank.length);
  return wordBank[index];
}

//This function initializes a set of underscores according to the length of secretWord. This is then used as a comparison to the secretWord string and verify whether game is completed or not. The value of display can also be found in the console for debugging purposes.
function displayInitialize() {
  var display = "";

  for (i=0; i<secretWord.length; i++) display+="_";
  return display;
}

//This function initializes an object with the document elements associated to id='wordChallenge' and then displays a set of underscores equal to length of secretWord. It does this by calling the replace method where it looks for a letter and replaces each letter with some innerHTML. This shows the user how many blanks need to be guessed.
function displayUnderscores() {
  var word = document.getElementById('wordChallenge');
  var displayBlanks = secretWord.replace(/./g,"<div class='letterBox'></div> ")
  word.innerHTML = displayBlanks;
}

//This function initializes an object with the document elements associated to class='letterBox'. This object is of Array type and used to pull 'img' tags within the class. It uses the count value, which corresponds to a value that increments as the user guesses incorrectly. In doing so, images of the Hangman silhouette are displayed by changing its CSS to 'display: block' one incorrect guess at a time
function displayHangman(count) {
    var list = document.getElementsByClassName('hangmanDude')[0];
    list.getElementsByTagName('img')[count-1].style.display = "block";
}

//This function initializes an object (Array type) with the document elements associated to class='letterBox'. Because this object is an array, a for loop is used to check where the guess letter matches the character position of secretWord. innerHTML is used to enter the guess letter in the correct position of the secret word. Display is also being tracked again for comparison and debugging purposes.
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

//This function is used to push the guess letter into 'correctBin' array to keep track of correct guesses. We don't show it in the interface since we already show the correct letters in the HTML; however, this was created for debugging purposes.
function rightGuess(guess) {
  correctBin.push(guess);
}

//This function initializes an object with the document elements associated to id='wrongGuesses'. A map function is called where it returns each element in wrongBin array contained by the HTML below. Finally, a innerHTML is used to enter the incorrect guesses in the left panel
function wrongGuess(wrongBin) {
  var wrongBucket = document.getElementById('wrongGuesses');
  var displayWrongGuesses = wrongBin.map(function(x){return "<div class='wrongLetter'>" + x + "</div>"}).join(', ');
  wrongBucket.innerHTML = "<b>Failed Guesses:</b> " + displayWrongGuesses;
}

//This function does a similar execution to wrongGuess(); however, it's simpler because it is not dealing with an array. Instead, it uses the count value incremented every time there is an incorrect guess to run innerHTML and output in the DOM the guesses remaining to the user playing.
function guessesRemaining(count){
  var guessesLeft = document.getElementById('guessesLeft');
  guessesLeft.innerHTML = "<b>Attempts Left:</b> <div class='guessCount'>" + (guessesAllowed - count) + "</div>";
}

//This function validates the letter (guess) being clicked on has not been saved as an incorrect or correct guess. If it has, then one of the conditions in line 108 will output true, which then returns false and wants the user to select another letter for guess. If it does not meet any of the conditions, then the function returns true and continues to next line of code.
function validateGuess(guess, correctBin, wrongBin, secretWord) {
  if (!guess.match(/^[a-zA-Z]$/)) return false; // Checks the format of the letter is wrong and User must enter letter from alphabet. This was used when a prompt was executed and needed to check the letter format was correct.
  else if (!/[a-zA-Z]/.test(secretWord)) return false; //checks secretWord is not an empty string.
  else if (correctBin.indexOf(guess) > -1 || wrongBin.indexOf(guess) > -1) return false; // Alert the letter has already been used and tell User to enter another one
  else return true;
}

//At every turn, this function checks the game status to see whether the user or computer has won. If not, it returns 0 to keep the party going!
function gameStatus(count, display, secretWord) {
  if (count >= guessesAllowed) return -1;  // Computer wins
  else if (display === secretWord.toUpperCase()) return 1; // User wins
  else return 0;  //Let's keep playing
}

//Once gameStatus() returns a value that shows user wins, a innerHTML is output to the DOM to say 'Guesser Wins!' Note the return value of gameStatus() is executed at every turn and saved in 'status' variable.
function userWins() {
  var winner = document.getElementById('gameWinner');
  winner.innerHTML = "GUESSER WINS!";
  // Element visible after winner is announced
  winner.style.display = 'flex';
}

//Once gameStatus() returns either a value that shows computer wins, a innerHTML is output to the DOM to say 'Secret Keeper Wins!'. Note the return value of gameStatus() is executed at every turn and saved in 'status' variable.
function userLoses() {
  var winner = document.getElementById('gameWinner');
  winner.innerHTML = "SECRET KEEPER WINS!";
  // Element visible after winner is announced
  winner.style.display = 'flex';
}


//This function eexceutes within initializeNewGame() to reset all necessary values to be ready for a new game. It also clears all innerHTML manipulated throughout the game when playing. At the start of a game, the guesses remaining appears because it is assumed the game already started and lets the user know he/she has six guesses remaining
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

  // Hide winner display 'flex' block
  var winner = document.getElementById('gameWinner');
  winner.style.display = 'none';

  //A for loop is used to initialize since the 'list' object is of Array type and each element within the array must be initialized.
  for (i=0; i<guessesAllowed; i++) {
    var list = document.getElementsByClassName('hangmanDude')[0];
    list.getElementsByTagName('img')[i].style.display = "none";
  }
}

//This function executes the functions noted below at the start of every new game.
function initializeNewGame() {
  resetGame();
  secretWord = randomizeWord();
  display = displayInitialize();
  displayUnderscores();
}

//This function executes every time a letter in class='alphabet' is handled by a 'click' event. This function executes when DOM Content has been loaded and it executes at every turn until a game winner has been decided. Most of the function calls explained above occur here!
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

  //For debugging purposes only. See explanation below above its function call.
  consoleOutput(display, secretWord, wrongBin, correctBin, count);

  if (status == 1) userWins();
  else if (status == -1) userLoses();
}

//This is strictly for debugging purposes only and is not to be included as part of the game code. I have it here, so I can see what is the console outputting as I go through the game.
function consoleOutput(display, secretWord, wrongBin, correctBin, count) {
  console.log("Display is: "+ display);
  console.log("Secret word is: " + secretWord);
  console.log("Wrong Guesses: " + wrongBin);
  console.log("Correct Guesses: " + correctBin);
  console.log("Misses: " + count);
}
