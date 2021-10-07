const div1 = document.getElementById("1");
const div2 = document.getElementById("2");
const div3 = document.getElementById("3");
const div4 = document.getElementById("4");
const div5 = document.getElementById("5");
const div6 = document.getElementById("6");
const div7 = document.getElementById("7");
const div8 = document.getElementById("8");
const div9 = document.getElementById("9");
const grids = document.querySelectorAll(".grid");
const turn = document.getElementById("turn");
const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");
const playBtn = document.getElementById("btn-play");
let sw = -1;
name1.value = "";
name2.value = "";
name1.focus();

const player = (name, mark) => {
  return { name, mark };
};
const player1 = player(name1.value, "X");
const player2 = player(name2.value, "O");
turn.textContent = "Insert your names to play!";

playBtn.addEventListener("click", () => {
  if (name1.value !== "" && name2.value !== "" && sw === -1) {
    playBtn.textContent = "Restart Game";
    name1.disabled = true;
    name2.disabled = true;
    player1.name = name1.value;
    player2.name = name2.value;
    turn.textContent = `${player1.name}'s turn`;
    addGrids();
    sw += 1;
  } else {
    sw = -1;
    playBtn.textContent = "Start Game";
    name1.disabled = false;
    name2.disabled = false;
    name1.value = "";
    name2.value = "";
    name1.focus();
    displayController.clearBoard();
    displayController.renderGameBoard();
    turn.textContent = "Insert your names to play!";
  }
});

const gameBoard = ((player1, player2) => {
  const playGame = (spot) => {
    if (sw % 2 === 0) {
      turn.textContent = `${player2.name}'s turn`;
      addMark(player1, spot);
      checkWinner(player1);
      checkDraw();
    } else {
      turn.textContent = `${player1.name}'s turn`;
      addMark(player2, spot);
      checkWinner(player2);
      checkDraw();
    }
    sw += 1;
  };
  let board = {
    row1: ["", "", ""],
    row2: ["", "", ""],
    row3: ["", "", ""],
  };
  const checkDraw = () => {
    if (fullBoard()) {
      turn.textContent = "It's a draw!";
    }
  };
  const checkWinner = (player) => {
    if (
      (board.row1[0] === player.mark &&
        board.row1[1] === player.mark &&
        board.row1[2] === player.mark) ||
      (board.row2[0] === player.mark &&
        board.row2[1] === player.mark &&
        board.row2[2] === player.mark) ||
      (board.row3[0] === player.mark &&
        board.row3[1] === player.mark &&
        board.row3[2] === player.mark) ||
      (board.row1[0] === player.mark &&
        board.row2[0] === player.mark &&
        board.row3[0] === player.mark) ||
      (board.row1[1] === player.mark &&
        board.row2[1] === player.mark &&
        board.row3[1] === player.mark) ||
      (board.row1[2] === player.mark &&
        board.row2[2] === player.mark &&
        board.row3[2] === player.mark) ||
      (board.row1[0] === player.mark &&
        board.row2[1] === player.mark &&
        board.row3[2] === player.mark) ||
      (board.row1[2] === player.mark &&
        board.row2[1] === player.mark &&
        board.row3[0] === player.mark)
    ) {
      turn.textContent = `${player.name} wins!`;
    }
  };
  const fullBoard = () => {
    for (const row in board) {
      for (let i = 0; i < board[row].length; i++) {
        if (board[row][i] === "") {
          return false;
        }
      }
    }
    return true;
  };
  const addMark = (player, spot) => {
    switch (parseInt(spot)) {
      case 1:
        board.row1[0] = player.mark;
        div1.textContent = player.mark;
        break;
      case 2:
        board.row1[1] = player.mark;
        div2.textContent = player.mark;
        break;
      case 3:
        board.row1[2] = player.mark;
        div3.textContent = player.mark;
        break;
      case 4:
        board.row2[0] = player.mark;
        div4.textContent = player.mark;
        break;
      case 5:
        board.row2[1] = player.mark;
        div5.textContent = player.mark;
        break;
      case 6:
        board.row2[2] = player.mark;
        div6.textContent = player.mark;
        break;
      case 7:
        board.row3[0] = player.mark;
        div7.textContent = player.mark;
        break;
      case 8:
        board.row3[1] = player.mark;
        div8.textContent = player.mark;
        break;
      case 9:
        board.row3[2] = player.mark;
        div9.textContent = player.mark;
        break;
    }
  };
  return { board, addMark, playGame };
})(player1, player2);

function addGrids() {
  grids.forEach((grid) => {
    grid.style.cursor = 'pointer'
    grid.addEventListener("click", () => {
      if (grid.textContent === "") {
        gameBoard.playGame(grid.id);
      }
    });
  });
}

const displayController = (() => {
  const renderGameBoard = () => {
    div1.textContent = gameBoard.board.row1[0];
    div2.textContent = gameBoard.board.row1[1];
    div3.textContent = gameBoard.board.row1[2];
    div4.textContent = gameBoard.board.row2[0];
    div5.textContent = gameBoard.board.row2[1];
    div6.textContent = gameBoard.board.row2[2];
    div7.textContent = gameBoard.board.row3[0];
    div8.textContent = gameBoard.board.row3[1];
    div9.textContent = gameBoard.board.row3[2];
  };
  const clearBoard = () => {
    gameBoard.board = {
      row1: ["", "", ""],
      row2: ["", "", ""],
      row3: ["", "", ""],
    };
  };

  return { renderGameBoard, clearBoard };
})();

displayController.renderGameBoard();
