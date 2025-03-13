//Parameters for REST API call executions
// var difficulty = 6;  //set to return words based on dificulty level
// var minLength = 4;  //set to return words longer than the provided length
// var maxLength = 8;  //set to return words shorter than the provided length

//http://linkedin-reach.hagbpyjegb.us-west-2.elasticbeanstalk.com/words
//Due to CORS issue, the application is proxying to the domain above via nginx defined in 'proxy.conf' file in the 'config' folder. This way the REST API can still be executed via GET method
// var url = "/words?"
var url = "/nouns"

var wordBank = "";  //initialize string variable to store the value returned by REST call. The return value is used to output a random word every time new game is executed
var secretWord;  //variable used to store string value returned by REST call
// var filter;   //variable used to store string value needed to concatenate with url to pull a subset of words via REST call

var guess;  //assigned to innerText property where it reads the string value within 'alphabet' class when executing doGuess()
var valid;  //assigned to boolean return from validateGuess(). This boolean value tells us whether the guess being passed is valid for the game.

var wrongBin, correctBin = new Array;  //initializes the arrays used to store the correct and incorrect guesses. The user interface outputs the incorrect guess during application run; however, the console uses the correct guesses for debugging purposes.

var count, status, guessesAllowed;  //these variables are initialized in resetGame(). They are used to track the number of incorrect guesses, guesses remaining, and whether we have a game winner or keep playing.

var display = "";  //string variable is used to validate competion of secret word by user
