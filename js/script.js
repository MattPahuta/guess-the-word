// game variables - global
const guessedLettersUL = document.querySelector('.guessed-letters');
const guessLetterBtn = document.querySelector('.guess');
const letterInput = document.querySelector('.letter');
const wordInProgress = document.querySelector('.word-in-progress');
const remainingGuessesP = document.querySelector('.remaining');
const remainingGuessesSpan = document.querySelector('span');
const message = document.querySelector('.message');
const playAgainBtn = document.querySelector('.play-again');

let remainingGuesses = 8;
let word = 'magnolia'; // placeholder word
let guessedLetters = [];

const getWord = async function() {
  const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const data = await request.text();
  const wordArray = data.split('\n');
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim(); // assign word a random, trimmed word
  addPlaceholders(word);
};

// execute game
getWord();

// display symbols as placeholders for the random word
const addPlaceholders = (word) => {
  const placeholderLetters = [];
  for (let letter of word) {
    // console.log(letter);
    placeholderLetters.push('●');
  }
  wordInProgress.innerText = placeholderLetters.join('');
};

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
  if (guessedLetters.includes(letter)) {
    message.innerText = `Letter "${letter}" has already been guessed. Try again!`;
  } else {
    guessedLetters.push(letter);
    showGuessedLetters();
    countGuessesRemaining(letter); // call function to update guesses left
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
  const revealWord = []; // array to push guessed letters to

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

// count guesses remaining
const countGuessesRemaining = (guess) => { // accept guess input (letterInput)
  const upperWord = word.toUpperCase(); // change word to upper case

  if (!upperWord.includes(guess)) { // check if truthy/falsey
    message.innerText = `Nope. The word has no ${guess}`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Yep! The word has the letter ${guess}.`;
  }

  // Update the message and guess count
  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`
    startOver(); // call startOver when game is lost
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  }

};

const checkWin = () => {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add('win');
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    startOver(); // call startOver when game is won
  }
};

// Start game over
const startOver = () => {
  // hide elements when game ends
  guessLetterBtn.classList.add('hide');
  remainingGuessesP.classList.add('hide');
  guessedLettersUL.classList.add('hide');
  // show play again button when game ends
  playAgainBtn.classList.remove('hide');
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

playAgainBtn.addEventListener('click', () => {
  // reset to original values
  message.classList.remove('win');
  guessedLetters = [];
  remainingGuesses = 8;
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  guessedLettersUL.innerHTML = ''; // empty guessed letters ul
  message.innerText = '';
  getWord(); // call getWord
  // show/hide appropriate elements
  guessLetterBtn.classList.remove('hide');
  playAgainBtn.classList.add('hide');
  remainingGuessesP.classList.remove('hide');
  guessedLettersUL.classList.remove('hide');
});