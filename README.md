# Hangman Game Web App
This is a web-based Hangman game where players try to guess the word before running out of attempts. It was originally created for LinkedIn REACH's 1-week competition but stopped working when their API became unavailable. I rebuilt it using Flask for the backend, while keeping JavaScript for the frontend.

### Game Rules
- The game is automatically started when the page is loaded
- The computer, also known as the *Secret Keeper*, will fetch a secret word
- The user, also known as the *Player*, has 6 tries to guess the secret word
- The user loses the game if 6 letters not in the secret word are guessed
- The user wins the game if all letters in the secret word are guessed correctly
- After a winner is determined, a new game is executed for another round of redemption!

### Features
- Play Hangman with *randomly* fetched words
- Responsive user interface (designed with Sketch/AI)
- Interactive graphics for correct and incorrect guesses
- Backend powered by Flask
- Frontend built with HTML, CSS, and JavaScript
- Lightweight and easy to deploy
  
### Technologies Used
- **Programming Languages**: Python, JavaScript
- **Backend:** Flask (Python)
- **Frontend:** HTML (HAML), CSS (SASS), JavaScript
- **Deployment Tools**: Bash scripts
- **Web Server:** Nginx

### Installation
#### Prerequisites
Ensure you have the following installed:
- Python 3.x
- pip (Python package manager)
- virtualenv (optional but recommended)
- Nginx (for serving the application)

#### Clone the Repository
```bash
git clone https://github.com/royruiz-dev/hangman-game.git
cd hangman-game
```

#### Python Dependencies
Set up a virtual environment and install the required Python packages:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
```

### Deploy the Application
After setting up the Python environment, deploy the application by running the deploy script:
```bash
./deploy.sh
```
This script will:

1. Install required system dependencies like HAML and SASS
2. Build assets such as HTML and CSS
3. Start the Nginx server using the proxy configuration from the `config/` folder
4. Launch the Flask application using `python app.py`

Once the application is running, you can access the game at http://localhost:8080/.

To stop the NGINX server after exiting the application, run the following command:
```bash
./scripts/nginx_stop.sh
```

### Game Logic

All functions have been **refactored**. Below is an overview of the order in which the functions execute, along with key details to understand the game logic. Each function is commented to help explain its role in the process of the game:

- `fetchWord()`
- `reqListener()`
  - if error, call `blockScreen()`
  - if successful, fetch the response and call `initializeNewGame()`
    - `resetGame()`
      - `guessesRemaining()`
    - `randomizeWord()`
    - `displayInitialize()`
    - `displayUnderscores()`
- On DOMContentLoaded, call `doGuess()`
  - Run until game is complete
    - `validateGuess()`
      - If guess is correct:
        - `rightGuess()` *For console purposes only*
        - `displayString()`
      - If guess is incorrect:
        - `wrongGuess()`
        - `guessesRemaining()`
        - `displayHangman()`
    - `gameStatus()`
    - `consoleOutput()` *For console purposes only*
  - If the game is complete:
    - If the player wins, call `userWins()`
    - If the secret keeper wins, call `userLoses()`
- To start a new game, call `initializeNewGame()`
