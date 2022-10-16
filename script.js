'use strict';

// Set a starting screen / Clear numbers and scores

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const rollDice = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const diceImg = document.querySelector('.dice');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let score, currentPlayer, currentScore, isPlaying;

//Initialise function and call after for starting screen

let init = function () {
  score0.textContent = 0;
  score1.textContent = 0;
  diceImg.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  current0.textContent = 0;
  current1.textContent = 0;
  score = [0, 0];
  currentPlayer = 0;
  currentScore = 0;
  isPlaying = true;
  diceImg.classList.add('hidden');
};
init();

// Switch between players

let switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${currentPlayer}`).textContent = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  currentPlayer = currentPlayer === 0 ? 1 : 0;
};

//Roll dice function
rollDice.addEventListener('click', function () {
  if (isPlaying) {
    // Generate random number and display
    let randomNum = Math.trunc(Math.random() * 6) + 1;
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${randomNum}.png`;

    //If dice is not 1
    if (randomNum !== 1) {
      currentScore += randomNum;
      document.querySelector(`#current--${currentPlayer}`).textContent =
        currentScore;
      //If dice is 1 switch player
    } else {
      switchPlayer();
    }
  }
});

//Hold button
holdBtn.addEventListener('click', function () {
  if (isPlaying) {
    score[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      score[currentPlayer];

    //Check for score above 100
    if (score[currentPlayer] >= 100) {
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      diceImg.classList.add('hidden');
      isPlaying = false;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
