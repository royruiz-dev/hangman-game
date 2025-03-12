# Hangman Game Web App
## OVERVIEW
<hr>
Enclosed you'll find all contents pertaining to the <b>HANGMAN GAME</b>! This is an application in which anyone can execute and play against the computer. The computer, also known as the "<i>Secret Keeper</i>" will pull a string from the following REST API: <a href="http://linkedin-reach.hagbpyjegb.us-west-2.elasticbeanstalk.com/words">Word List</a>
<br><br>
Once the string value is stored, a game is automatically initialized. The user, also known as the "Guesser", has six tries to guess the secret word. If the "Guesser" guesses the secret word, he/she wins. If not, the "Secret Keeper" wins!
<br><br>
After a winner is determined, a new game is executed for another round of redemption!
<br><br>
For clarity purposes, the game rules are shown below.

## GAME RULES
<hr>
<ol>
<li>At the start of the game the computer/secret-keeper will choose a dictionary word.</li>
<li>The guesser loses the game if they guess 6 letters that are not in the secret word.</li>
<li>The guesser wins the game if they guess all letters in the secret word correctly and have not already lost the game per the conditions above.</li>
</ol>

## HOW TO RUN THE GAME I BUILT
<hr>

1. Configure your web server to proxy REST calls to the word API. In case of nginx, add location spec as follows:

```javascript
location = /words {
  proxy_pass http://linkedin-reach.hagbpyjegb.us-west-2.elasticbeanstalk.com/words;
}
```
* Location does not have to be at the root level on the web server. See sample configuration for nginx in config/proxy.conf.

2. Customize src/js/config.js
  a. Modify variable `url` as necessary to refer to the location of the proxy to the word API.
  b. Set the desired level of difficulty (default 8)
  c. Set min and max word length (default 4 and 8, respectively)
3. Change the email of the administrative contact in index.haml.
4. Build the project files using CodeKit, https://codekitapp.com.
  a. Drop the project folder on CodeKit window.
  b. Click refresh button.
  c. Click Build Project button.
5. Copy contents of `build/js/`, `build/img/` folders, and files `build/index.html` and `build/style.css` to the web server.
6. Navigate to the corresponding URL.


## FEATURES
<hr>

The REST call can be filtered by setting certain parameters. These parameters are `difficulty`, `minLength`, `maxLength`, `start`, and `count`. The first three are the only ones you need to worry about. Fortunately, I've taken care of `start` and `count` to always return a random word from the data pull.

| URL Parameter |  Legal Values  |  Purpose  |
| :-----------: |:--------------:| :---------|
| `difficulty`    | Integer from 1-10  | Filters returned words based on the difficulty level<br>provided: 1 is the lowest level and 10 is the highest<br>level.|
| `minLength`     | Integer >= 0   | Filters returned words to ensure they are at least<br>as long as the provided length. Providing 0 will<br>return all words, providing a number larger than<br>the length of the longest word will return an empty<br>result.|
| `maxLength`     | Integer >= 0   | Filters returned words to ensure they are shorter<br>than the provided length. Providing 0 will return an<br>empty result, providing a number larger than the<br>length of the longest word will return all words.|

## THE USER INTERFACE
<hr>
I built a really nice user interface using both Adobe Illustrator and Sketch App to give you a great seamless experience. I, personally, like the color choice. Hopefully, you do as well!
<br><br>
All you do is open the game in your browser, and the game will initialize for you! Instead of typing the letters in a text box, just click on the letters you choose as guess, and the interface will populate, accordingly.
<br><br>
You can keep track of the guesses remaining on the left panel as well as the incorrect guesses you've selected. Keep in mind if you try to select a letter you've already chosen, it won't let you. It'll just ignore it! It'll feel seamless as described.
<br><br>
Let's just I wanted the hangman to resemble a man (silhouette form) that is scared of the pollution in the air, always "on-call", and ready to go to work! I figured why not hang someone with all of those things on him. I know, it's a bit overkill :)
<br><br>
Please note the interface is simplistic enough that you can split the window in half, so you can play and also do other work on the side!

## ORDER OF FUNCTIONS
<hr>
All functions have been <b>refactored</b>. Here's an overview of the working order of functions. Please note all functions have been commented accordingly with details to understand the flow of the game and my thought process.
<br><br>

- `fetchWord()`
- `reqListener()`
  - if error, `blockScreen()`
  - if pass, fetch response and `initializeNewGame()`
    - `resetGame()`
      - `guessesRemaining()`
    - `randomizeWord()`
    - `displayInitialize()`
    - `displayUnderscores()`
- At DOMContentLoaded, `doGuess()`
  - Run until game is complete
    - `validateGuess()`
      - Guess is right
        - `rightGuess()` *For console purposes only*
        - `displayString()`
      - Guess is wrong
        - `wrongGuess()`
        - `guessesRemaining()`
        - `displayHangman()`
    - `gameStatus()`
    - `consoleOutput()` *For console purposes only*
  - Game is complete
    - If guesser wins, `userWins()`
    - If secret keeper wins, `userLoses()`
- Click on new Game via `initializeNewGame()`
