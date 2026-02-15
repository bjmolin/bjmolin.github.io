// Define your array of words
const words = ['javascript', 'hangman', 'web', 'programming', 'game'];

// Initialize selectedWord globally
let selectedWord = "";

// Fetch selectedWord asynchronously
fetch('getWord.php', {
    method: 'POST'
})
    .then(response => response.json())
    .then(data => {
        if (data.word) {
            selectedWord = data.word; // Assign fetched word to selectedWord
            initializeGame(); // Call function to initialize game after selectedWord is fetched
        } else {
            console.error('Error fetching word:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));

// Function to initialize the game once selectedWord is fetched
function initializeGame() {
    // Initialize guessedLetters array with underscores
    let guessedLetters = Array(selectedWord.length).fill('_');

    let attemptsLeft = 12; // Initialize attemptsLeft
    let gameEnded = false; // Initialize gameEnded

    // Update attemptsLeft display
    document.getElementById('attemptsLeft').innerText = `Attempts Left: ${attemptsLeft}`;

    // Function to display the hangman image based on attemptsLeft
    function displayMan() {
        switch (attemptsLeft) {
            case 12:
                document.getElementById("HangmanDisplay").src = "stickman/0.png";
                break;
            case 11:
                document.getElementById("HangmanDisplay").src = "stickman/1.png";
                break;
            case 10:
                document.getElementById("HangmanDisplay").src = "stickman/2.png";
                break;
            case 9:
                document.getElementById("HangmanDisplay").src = "stickman/3.png";
                break;
            case 8:
                document.getElementById("HangmanDisplay").src = "stickman/4.png";
                break;
            case 7:
                document.getElementById("HangmanDisplay").src = "stickman/5.png";
                break;
            case 6:
                document.getElementById("HangmanDisplay").src = "stickman/6.png";
                break;
            case 5:
                document.getElementById("HangmanDisplay").src = "stickman/7.png";
                break;
            case 4:
                document.getElementById("HangmanDisplay").src = "stickman/8.png";
                break;
            case 3:
                document.getElementById("HangmanDisplay").src = "stickman/9.png";
                break;
            case 2:
                document.getElementById("HangmanDisplay").src = "stickman/10.png";
                break;
            case 1:
                document.getElementById("HangmanDisplay").src = "stickman/11.png";
                break;
            case 0:
                document.getElementById("HangmanDisplay").src = "stickman/12.png";
                break;
        }
    }

    // Function to update the word display with guessed letters
    function updateWordDisplay() {
        document.getElementById('wordToGuess').innerText = guessedLetters.join(' ');
    }

    

    // Function to handle letter guesses
    function guessLetter(guessedLetter) {
        if (gameEnded) return;
        const guess = guessedLetter.toLowerCase();

        if (guess && !gameEnded) {
            if (selectedWord.includes(guess)) {
                selectedWord.split('').forEach((letter, index) => {
                    if (letter === guess) {
                        guessedLetters[index] = guess;
                    }
                });

                updateWordDisplay();

                if (!guessedLetters.includes('_')) {
                    document.getElementById('status').innerText = 'Congratulations! You won!';
                    gameEnded = true;
                }
            } else {
                attemptsLeft--;
                document.getElementById('attemptsLeft').innerText = `Attempts Left: ${attemptsLeft}`;

                // Update hangman display
                displayMan();

                if (attemptsLeft === 0) {
                    document.getElementById('status').innerText = 'Game Over! You lost.';
                    gameEnded = true;
                }
            }
        }
    }

    // Function to generate letter buttons for user input
    function generateLetterButtons() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lettersDiv = document.getElementById('letters');
        lettersDiv.innerHTML = ''; // Clear previous buttons

        letters.split('').forEach(letter => {
            const button = document.createElement('button');
            button.innerText = letter;

            button.addEventListener("click", function () {
                guessLetter(button.innerText);
            });

            lettersDiv.appendChild(button);
        });
    }

    // Initialize the game
    generateLetterButtons();
    updateWordDisplay();
}

function cheatMode() {
  alert(selectedWord);
}

