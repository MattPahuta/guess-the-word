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

async function getWord() {
  const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const data = await request.text();
  const wordArray = data.split('\n');
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim(); // assign word a random, trimmed word
  // console.log(word);
  addPlaceholders(word);
}

// execute game
getWord();

// display symbols as placeholders for the random word
function addPlaceholders(word) {
  const placeholderLetters = [];
  for (const letter of word) {
    placeholderLetters.push('●');
  }
  wordInProgress.innerText = placeholderLetters.join('');
}

function validatePlayerInput(input) {
  const acceptedLetter = /[a-zA-Z]/; // regex to check against user input

  if (input.length === 0) { // input empty?
    message.innerText = 'Please enter a letter.';
  } else if (input.length > 1) { // input more than one letter?
    message.innerText = 'Please enter a single letter only.'
  } else if (!input.match(acceptedLetter)) { // input a non letter character?
    message.innerText = 'Please enter a letter from A to Z.';
  } else {
    return input;
  } 
}

function makeGuess(letter) {
  letter = letter.toUpperCase();
  if (guessedLetters.includes(letter)) {
    message.innerText = `Letter "${letter}" has already been guessed. Try again!`;
  } else {
    guessedLetters.push(letter);
    showGuessedLetters();
    countGuessesRemaining(letter);
    updateWordInProgress(guessedLetters);
  }  
}

// update game page with letters player guesses
function showGuessedLetters() {
  guessedLettersUL.innerHTML = ''; // clear the guessedLettersUL
  for (let letter of guessedLetters) { // loop through guessedLetters array
    const li = document.createElement('li'); // create an li
    li.innerText = letter; // add letter as li content
    guessedLettersUL.append(li); // append the li to the UL
  }  
}

// display word-in-progress while being guessed
function updateWordInProgress(guessedLetters) {
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
}

// count guesses remaining
function countGuessesRemaining(guess) {
  const upperWord = word.toUpperCase(); // change word to upper case

  if (!upperWord.includes(guess)) { // check if truthy/falsey
    message.innerText = `Sorry, "${guess}" isn't part of the word.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Yes! "${guess}" is found in the word.`;
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
}

// check for game win
function checkWin() {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add('win');
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    startOver(); 
  } 
}

// replay game
function startOver() {
  guessLetterBtn.classList.add('hide');
  remainingGuessesP.classList.add('hide');
  guessedLettersUL.classList.add('hide');
  playAgainBtn.classList.remove('hide'); 
}

// reset game to original values, get a new word
function resetGame() {
  message.classList.remove('win');
  guessedLetters = [];
  remainingGuesses = 8;
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  guessedLettersUL.innerHTML = ''; 
  message.innerText = '';
  getWord();
  guessLetterBtn.classList.remove('hide');
  playAgainBtn.classList.add('hide');
  remainingGuessesP.classList.remove('hide');
  guessedLettersUL.classList.remove('hide');
}

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

playAgainBtn.addEventListener('click', resetGame);