let clicked = [];
let boardBlocked = false;
let current_player = "X";

let player_clicked = [];
player_clicked["X"] = [];
player_clicked["O"] = [];

let player_counter = [];
player_counter["X"] = 0;
player_counter["O"] = 0;

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));

let restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", handleRestartClick);

function check(current_player) {
  if (player_clicked[current_player].length < 3) {
    return false;
  }
  for (let i = 0; i < player_clicked[current_player].length; i++) {
    for (let j = 0; j < player_clicked[current_player].length; j++) {
      for (let z = 0; z < player_clicked[current_player].length; z++) {
        let combination = [
          player_clicked[current_player][i],
          player_clicked[current_player][j],
          player_clicked[current_player][z],
        ];
        for (let y = 0; y < winningCombination.length; y++) {
          if (
            JSON.stringify(winningCombination[y]) ===
            JSON.stringify(combination)
          ) {
            win();
            return true;
          }
        }
      }
    }
  }
}

function handleCellClick(clickedCellEvent) {
  if (!boardBlocked) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = clickedCell.getAttribute("data-cell");
    if (!clicked.includes(clickedCellIndex)) {
      clicked.push(clickedCellIndex);
      player_clicked[current_player].push(parseInt(clickedCellIndex));
      clickedCell.innerHTML =
        '<span class="player-' +
        current_player +
        '">' +
        current_player +
        "</span>";
      check(current_player);
      changePlayer();
    }
  }
}

function changePlayer() {
  current_player = current_player === "X" ? "O" : "X";
}

function win() {
  boardBlocked = true;
  document.getElementById("board").classList.add("boardBlocked");
  document.getElementById("result").classList.add("visible");
  document.getElementById("result").innerHTML = current_player + " Win!";
  updateMarker(current_player);
}
function handleRestartClick() {
  clicked = [];
  boardBlocked = false;
  current_player = "X";
  player_clicked["X"] = [];
  player_clicked["O"] = [];
  document.getElementById("result").innerHTML = "";
  document.getElementById("board").classList.remove("boardBlocked");
  document.getElementById("result").classList.remove("visible");
  document
    .querySelectorAll(".cell")
    .forEach((cell) => (cell.textContent = ""));
}
function updateMarker(current_player) {
  player_counter[current_player]++;
  document.getElementById("marker-" + current_player).innerHTML =
    player_counter[current_player];
}