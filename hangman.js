// For REST Call
// set dificulty parameter value (1..10)
// Pull word list count for specified difficulty value
// Assign random number via Math.random method to START parameter
// Assign count = 1 to return only 1 word
// save word to secretWord string


var secretWord = "maintain";
var guessLetter = prompt("Enter a letter!").toUpperCase();
var incorrectGuesses = new Array;
var correctGuesses = new Array;
var count = 0;
var regex = /^[a-zA-Z]$/;
var display = displayUnderscores();
// var guessLetter = getLetter(guessLetter);

// while (count <= 6){
//   getLetter(guessLetter)
// }

// Ask the user for a letter. It will keep asking until the letter is single character [a-zA-Z]
// function getLetter(guessLetter){
//   while (!(guessLetter.match(regex))) {
//     return guessLetter = prompt("Enter a letter!").toUpperCase();
//   }
// }

// Display a set of underscores equal to lenght of secretWord
function displayUnderscores(){
  var display = "";
  for (i=0; i<secretWord.length; i++){
    display+="_";
  }
  return display;
}

while (count <= 6){
  if (count > 6){
    alert("Computer Wins!");
    break;
  }
  else if (display.indexOf('_') === -1){
    alert("You Win!");
    break;
  }
  else{
    while (!(guessLetter.match(regex)) || correctGuesses.indexOf(guessLetter) > -1 || incorrectGuesses.indexOf(guessLetter) > -1) {
      var guessLetter = prompt("Enter a letter!").toUpperCase();
    }
    if (secretWord.toUpperCase().indexOf(guessLetter) > -1) {
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
  }
  console.log("Display is: "+ display);
  console.log("Secret word is: " + secretWord);
  console.log("Incorrect Guesses: " + incorrectGuesses);
  console.log("Correct Guesses: " + correctGuesses);
  console.log("Misses: " + count);

}


















// var secretWord = "maintain";
// console.log("Secret word is " + secretWord);

// var str = writeWordtoArray(secretWord); //store secret word
// // var str = secretWord.toUpperCase().split("");
// console.log(str);
// var newString = new Array(str.length);

// var index = userEntry();
// var word = correctGuess(newString, "A", index);

// console.log(str[Number(index)]);

// // Turn word into array of characters
// function writeWordtoArray(secretWord){
//   var arr = [];
//   for (i=0; i<secretWord.length; i++) {
//     arr[i] = secretWord[i].toUpperCase();
//   }
//   return arr;
// }

// //Need to implement error checking to ensure entry is ONLY 1 letter

// function userEntry() {
//   var guessLetter = prompt("Enter a letter!").toUpperCase();
//   var position = [];
//   var regex = /^[a-zA-Z]$/;
//   while (!(guessLetter.match(regex))) {
//     var guessLetter = prompt("Enter a letter!").toUpperCase();
//   }
//   for (i=0; i<str.length; i++) {
//     if (str[i].indexOf(guessLetter) != -1) position.push(i);
//   }
//   return position;
// }

// function correctGuess(newString, guessLetter, index) {
//   var output;
//   for (i=0; i<index.length; i++){
//     output = [newString.slice(0, (index[i]+1)), guessLetter, newString.slice(index[i]+1)];
//   }
//   return output;
// }
