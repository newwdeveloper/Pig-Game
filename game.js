const totScore1 = document.querySelector("#h1-1");
const totScore2 = document.querySelector("#h1-2");
const currentScore1 = document.querySelector("#h2-1");
const currentScore2 = document.querySelector("#h2-2");
const btn = document.querySelector(".img");
const btnnew = document.querySelector("#btn-new");
const btnroll = document.querySelector("#btn-roll");
const btnhold = document.querySelector("#btn-hold");
const diceImage = document.querySelector("#dice");
const one = document.querySelector(".one");
const two = document.querySelector(".two");

let num;
let totalScore1 = 0;
let totalScore2 = 0;
let currentPlayer = 1;
let currentScore = 0; // Track current score separately

// Function to handle the rolling of the dice
btnroll.addEventListener("click", function () {
  let imagePrefix = "dice-";
  num = Math.ceil(Math.random() * 6);
  let image = `${imagePrefix}${num}.png`;
  diceImage.src = image;
  diceImage.hidden = false;

  if (num !== 1) {
    currentScore += num; // Accumulate current score
    if (currentPlayer === 1) {
      currentScore1.textContent = currentScore; // Update current score display for Player 1
    } else {
      currentScore2.textContent = currentScore; // Update current score display for Player 2
    }
  } else {
    // If rolled a 1, reset current score and switch players
    currentScore = 0; // Reset current score
    if (currentPlayer === 1) {
      currentScore1.textContent = 0; // Reset Player 1's current score display
    } else {
      currentScore2.textContent = 0; // Reset Player 2's current score display
    }
    switchPlayer(); // Switch to the next player
  }
});

// Function to handle holding the current score
btnhold.addEventListener("click", function () {
  if (currentPlayer === 1) {
    totalScore1 += currentScore; // Add current score to Player 1's total score
    totScore1.textContent = totalScore1; // Update total score display
  } else {
    totalScore2 += currentScore; // Add current score to Player 2's total score
    totScore2.textContent = totalScore2; // Update total score display
  }

  // Reset current score and score displays
  currentScore = 0; // Reset current score
  currentScore1.textContent = 0; // Reset Player 1's current score display
  currentScore2.textContent = 0; // Reset Player 2's current score display

  checkWinner(); // Check for a winner
  switchPlayer(); // Switch to the next player
});

function switchPlayer() {
  if (currentPlayer === 1) {
    currentPlayer = 2; // Switch to Player 2
  } else {
    currentPlayer = 1; // Switch back to Player 1
  }
}

function checkWinner() {
  if (parseInt(totScore1.textContent) >= 100) {
    btnroll.disabled = true; // Disable roll button
    btnhold.disabled = true; // Disable hold button
    diceImage.hidden = true; // Hide dice image
    currentScore1.textContent = "0";
    currentScore2.textContent = "0";
    one.style.backgroundColor = "lightgreen"; // Indicate Player 1 as winner
  } else if (parseInt(totScore2.textContent) >= 100) {
    btnroll.disabled = true; // Disable roll button
    btnhold.disabled = true; // Disable hold button
    diceImage.hidden = true; // Hide dice image
    currentScore1.textContent = "0";
    currentScore2.textContent = "0";
    two.style.backgroundColor = "lightgreen"; // Indicate Player 2 as winner
  }
}
// Reset game button
btnnew.addEventListener("click", function () {
  totalScore1 = 0;
  totalScore2 = 0;
  num = 0;
  totScore1.textContent = totalScore1; // Reset Player 1 total score
  totScore2.textContent = totalScore2; // Reset Player 2 total score
  currentScore1.textContent = 0; // Reset Player 1 current score
  currentScore2.textContent = 0; // Reset Player 2 current score
  currentScore = 0; // Reset current score
  diceImage.hidden = true; // Hide the dice image
  btnhold.disabled = false; // Enable the Hold button for the new game
  currentPlayer = 1; // Reset to Player 1
  btnroll.disabled = false; // Enable roll button
  one.style.backgroundColor = ""; // Reset background colors
  two.style.backgroundColor = "";
});
