const scoreSection = document.getElementById("score");
const playSelectionsSection = document.getElementById("playerSelections");
const resultsSection = document.getElementById("results");
const winnerSection = document.getElementById("winner");
const buttons = document.querySelectorAll('button');

const score = {
  player: 0,
  computer: 0,
};

const choices = {
  0: "Rock",
  1: "Paper",
  2: "Scissors",
};

function getComputerChoice() {
  let randomInt = Math.floor(Math.random() * (2 + 1));

  return choices[randomInt];
}

function playRound(playerSelection) {
  let computerSelection = getComputerChoice();

  playSelectionsSection.innerText = `Player: ${playerSelection} | Computer: ${computerSelection}`;

  if (isDraw(playerSelection, computerSelection)) {
    resultsSection.innerText = `Its a Draw. You both chose ${playerSelection}`;
  }

  if (isWin(playerSelection, computerSelection)) {
    resultsSection.innerText = `You Win! ${playerSelection} beats ${computerSelection}`;
    score.player++;
  } else {
    resultsSection.innerText = `You Lose! ${computerSelection} beats ${playerSelection}`;
    score.computer++;
  }

  scoreSection.innerText = `Score: Player[${score.player}] | Computer[${score.computer}]`;

  if (isGameOver()) {
    winnerSection.innerText = gameOverMessage();
    disableButtons();
  }
}

function isGameOver() {
  return score.player === 5 || score.computer === 5;
}

function gameOverMessage() {
  return score.player === 5
    ? "You Win!! Congratulations. Reload to play again"
    : "You Lose!! Sorry Reload to play again";
}

function isDraw(playerSelection, computerSelection) {
  return playerSelection === computerSelection;
}

function isWin(playerSelection, computerSelection) {
  return (playerSelection === "Rock" && computerSelection === "Scissors") ||
      (playerSelection === "Paper" && computerSelection === "Rock") ||
      (playerSelection === "Scissors" && computerSelection === "Paper");

}

function disableButtons() {
  buttons.forEach(elem => elem.disabled = true);
}
