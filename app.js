let buttons = document.querySelectorAll(".btn");
let reset = document.querySelector("#reset");
let newGame = document.querySelector("#newGame");
let win = document.querySelector(".win");
let container = document.querySelector(".container");

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let turn = true;
let i = 0;
let player1, player2;
let start = true;

let getName = () => {
  player1 = prompt("Enter name of player#1: ");
  player2 = prompt("Enter name of player#2: ");
};
let newGameBtn = () => {
  i = 0;
  turn = true;
  enableBtns();
  getName();
  container.classList.add("class", "hide");
};
let resetBtn = () => {
  i = 0;
  turn = true;
  enableBtns();
};
const disableBtns = () => {
  for (let btn of buttons) {
    btn.disabled = true;
  }
};
const enableBtns = () => {
  for (let btn of buttons) {
    btn.disabled = false;
    btn.innerText = "";
  }
};

let Draw = () => {
  if (i === 9) {
    win.innerText = `Match Draw!`;
    container.classList.remove("hide");
  }
};

const showWinner = (winner) => {
  disableBtns();
  if (winner === "O")   win.innerText = `Congradulations, ${player1} won.`;
  else                  win.innerText = `Congradulations, ${player2} won.`;
  container.classList.remove("hide");
};

const checkWinner = () => {
  for (let pattern of winningPatterns) {
    let p1 = buttons[pattern[0]].innerText;
    let p2 = buttons[pattern[1]].innerText;
    let p3 = buttons[pattern[2]].innerText;

    if (p1 != "" && p2 != "" && p3 != "")
      if (p1 === p2 && p2 === p3) showWinner(p1);
  }
};

buttons.forEach((button) => {
  if (start) {
    getName();
    start = false;
  }
  button.addEventListener("click", () => {
    if (turn) {
      button.innerText = "O";
      turn = false;
    } else {
      button.innerText = "X";
      turn = true;
    }
    i++;
    button.disabled = true;
    checkWinner();
    Draw();
  });
});

reset.addEventListener("click", resetBtn);
newGame.addEventListener("click", newGameBtn);
