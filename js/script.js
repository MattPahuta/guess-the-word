// game variables
const guessedLettersUL = document.querySelector('.guessed-letters');
const guessLetterBtn = document.querySelector('.guess');
const letterInput = document.querySelector('.letter');
const wordInProgress = document.querySelector('.word-in-progress');
const remainingGuessesP = document.querySelector('.remaining');
const remainingGuessesSpan = document.querySelector('span');
const message = document.querySelector('.message');
const playAgainBtn = document.querySelector('.play-again');

let word = 'magnolia';
const guessedLetters = [];

// display symbols as placeholders for word
const addPlaceholders = (word) => {
  const placeholderLetters = [];

  for (let letter of word) {
    // console.log(letter);
    placeholderLetters.push('●');
  }
  wordInProgress.innerText = placeholderLetters.join('');
}

addPlaceholders(word);

const validatePlayerInput = (input) => {
  const acceptedLetter = /[a-zA-Z]/;

  if (input.length === 0) { // input empty?
    message.innerText = 'That there is blank. Enter a letter.';
  } else if (input.length > 1) { // input more than one letter?
    message.innerText = 'Just one letter at a time, please.'
  } else if (!input.match(acceptedLetter)) { // input a non letter character?
    message.innerText = 'Please enter a letter from A to Z.';
  } else {
    return input;
  }
};

const makeGuess = (letter) => {
  letter = letter.toUpperCase();
  console.log(letter)

  if (guessedLetters.includes(letter)) {
    message.innerText = `Letter "${letter}" has already been guessed. Try again!`;
  } else {
    guessedLetters.push(letter);
    console.log(`guessedLetters is: ${guessedLetters}`);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
};

// update game page with letters player guesses
const showGuessedLetters = () => {
  guessedLettersUL.innerHTML = ''; // clear the guessedLettersUL
  for (let letter of guessedLetters) { // loop through guessedLetters array
    const li = document.createElement('li'); // create an li
    li.innerText = letter; // add letter as li content
    guessedLettersUL.append(li); // append the li to the UL
  }
};

const updateWordInProgress = (gussedLetters) => {
  const wordUpper = word.toUpperCase(); // change word to upper case
  const wordArray = wordUpper.split(''); // split the upper case word into an array of letters
  console.log(`wordArray is: ${wordArray}`);
  const revealWord = [];

  for (let letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push('●')
    }
  }
  wordInProgress.innerText = revealWord.join('');
  checkWin();
};

const checkWin = () => {
  if (word.toUpperCase() === wordInProgress.innerText) { // change wordIn.innerText to a variable?
    message.classList.add('win');
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
  }
};


// Event listeners 

guessLetterBtn.addEventListener('click', (e) => {
  e.preventDefault();
  message.innerText = ''; // empty message <p>
  const letterGuess = letterInput.value;
  const validGuess = validatePlayerInput(letterGuess);

  if (validGuess) {
    makeGuess(letterGuess) // valid letter, call makeGuess
  }

  letterInput.value = '';

});