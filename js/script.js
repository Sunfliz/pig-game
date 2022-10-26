'use strict';

// Selecting Element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score = document.querySelector('.score');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const winner0El = document.querySelector('.winner--0');
const winner1El = document.querySelector('.winner--1');
// Declaring empty variable for accessibility in the init function
let scores, currentScore, activePlayer, playing;

// Initial condition
const init = function () {
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  // Setting condition for the game, whether it is playing  or not
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  winner0El.classList.add('hidden');
  winner1El.classList.add('hidden');
};

init();

// Function to switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
//ROLL DICE BUTTON
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1). Generating a dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2). Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`;

    //3). Check if rolled is 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// HOLD BUTTON
btnHold.addEventListener('click', function () {
  console.log('Hold button');
  if (playing) {
    // 1). Add current score to active palyer's score
    // scores[1]= scores[1] + currentScore
    scores[activePlayer] += currentScore;
    // console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2). Check score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.winner--${activePlayer}`)
        .classList.remove('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // Switch to the next player
      switchPlayer();
    }
    // Finish the game
  }
});

// NEW GAME BUTTON
// Resetting all to initial state
btnNew.addEventListener('click', init);

// SETTING ESC key as a reset button
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    init();
  }
});
