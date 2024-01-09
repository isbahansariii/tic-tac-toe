let buttons = document.querySelectorAll(".btn");
let reset = document.querySelector("#reset");
let resetGame = document.querySelector("#resetGame");
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
let player1, player2; //for storing name of player1 and player2
let start = true;
let boolWinner = true;
let resetGameBtnClick = 0; // no of time reset game button is clicked
let playOne = 0,
  playTwo = 0; // score purpose

const winnerBtnColor = (p1, p2, p3) => {
  // here p1, p2, p3 is buttons
  p1.style.backgroundColor = "#820300";
  p2.style.backgroundColor = "#820300";
  p3.style.backgroundColor = "#820300";
};

const resetBtnColor = () => {
  for (let button of buttons) {
    button.style.backgroundColor = "#b80000";
  }
};

let getName = () => {
  player1 = prompt("Enter name of player#1: ");
  player2 = prompt("Enter name of player#2: ");
};

let newGameBtn = () => {
  (playOne = 0), (playTwo = 0);   //score will set to 0
  resetGameBtnClick = 0;          // it will not show the score of previous game
  win.classList.remove("class", "winScore");    //score style will remove
  i = 0;
  turn = true;
  getName();
  enableBtns();
  resetBtnColor();
  container.classList.add("class", "hide");
};

const score = (winner) => {
  //score take O or X
  if (winner === "O") {
    playOne++;
  } else {
    playTwo++;
  }
};

const showScore = () => {
  win.classList.add("class", "winScore"); //score styling will add
  win.innerText = `${player1}: ${playOne}\n${player2}: ${playTwo}`;
};

let resetBtn = () => {
  i = 0;
  turn = true;
  resetGameBtnClick=1;
  boolWinner = true;
  container.classList.add("class", "hide");
  enableBtns();
  resetBtnColor();
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

const showWinner = (winner) => {
  disableBtns();
  score(winner);
  if (resetGameBtnClick > 0)
    showScore(); //if one time click on resetGameBtn then save the previous score and show it
  else {
    if (winner === "O") {
      win.innerText = `Congradulations, ${player1} won.`;
    } else {
      win.innerText = `Congradulations, ${player2} won.`;
    }
  }
  container.classList.remove("hide");
};

let Draw = () => {
  if (i === 9 && boolWinner === true) {
    win.innerText = `Match Draw!`;
    container.classList.remove("hide");
  }
};

const checkWinner = () => {
  for (let pattern of winningPatterns) {
    let p1 = buttons[pattern[0]].innerText;
    let p2 = buttons[pattern[1]].innerText;
    let p3 = buttons[pattern[2]].innerText;

    if (p1 != "" && p2 != "" && p3 != "")
      if (p1 === p2 && p2 === p3) {
        showWinner(p1);
        winnerBtnColor(
          buttons[pattern[0]],
          buttons[pattern[1]],
          buttons[pattern[2]]
        );
        boolWinner = false;
      }
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
resetGame.addEventListener("click", resetBtn);
newGame.addEventListener("click", newGameBtn);
