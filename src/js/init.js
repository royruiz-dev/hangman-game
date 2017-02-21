// https://developer.mozilla.org/en/docs/Web/Events/DOMContentLoaded
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

//Performs the  time content is loaded
document.addEventListener('DOMContentLoaded', function() {

//Returns a reference associated to id='newGame' where it waits on user to perform 'click' event in order to run initializeNewGame()
  document.getElementById('newGame').addEventListener('click',initializeNewGame);

//Here 'letters' is an object array of elements associated to class 'alphabet'.
  var letters = document.getElementsByClassName('alphabet');

//Executes the Map Call method against each element in 'letters' where doGuess() runs every time user performs 'click' event
  Array.prototype.map.call(letters,function(x) {
    x.addEventListener('click', doGuess);
  });

//As soon as content is loaded onto page, fetch a word from fetchWord()
  fetchWord();
});
