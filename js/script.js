// game variables
const guessedLetters = document.querySelector('.guessed-letters');
const guessBtn = document.querySelector('.guess');
const letterInput = document.querySelector('.letter');
const wordInProgress = document.querySelector('.word-in-progress');
const remainingGuessesP = document.querySelector('.remaining');
const remainingGuessesSpan = document.querySelector('span');
const message = document.querySelector('.message');
const playAgainBtn = document.querySelector('.play-again');

let word = 'magnolia';

// display symbols as placeholders for word
const addPlaceholders = (word) => {
  const placeholderLetters = [];

  for (let letter of word) {
    console.log(letter);
    placeholderLetters.push('●');
  }
  wordInProgress.innerText = placeholderLetters.join('');
}

addPlaceholders(word);


// Event listeners 

guessBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const letterGuess = letterInput.value;
  console.log(letterGuess)
  letterInput.value = '';
});