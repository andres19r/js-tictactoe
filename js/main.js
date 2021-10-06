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
let sw = 0;

const player = (name, mark) => {
  return { name, mark };
};

const player1 = player("Andres", "X");
const player2 = player("Eduardo", "O");

const gameBoard = ((player1, player2) => {
  const playGame = (spot) => {
    if (sw % 2 === 0) {
      turn.textContent = "Player 2";
      addMark(player1, spot);
      checkWinner(player1);
      checkDraw();
    } else {
      turn.textContent = "Player 1";
      addMark(player2, spot);
      checkWinner(player2);
      checkDraw();
    }
    sw += 1;
  };
  const board = {
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
          return false
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

grids.forEach((grid) => {
  grid.addEventListener("click", () => {
    gameBoard.playGame(grid.id);
  });
});

const displayController = (() => {
  const renderGameBoard = () => {
    div1.textContent = gameBoard.board[0][0];
    div2.textContent = gameBoard.board[0][1];
    div3.textContent = gameBoard.board[0][2];
    div4.textContent = gameBoard.board[1][0];
    div5.textContent = gameBoard.board[1][1];
    div6.textContent = gameBoard.board[1][2];
    div7.textContent = gameBoard.board[2][0];
    div8.textContent = gameBoard.board[2][1];
    div9.textContent = gameBoard.board[2][2];
  };

  return { renderGameBoard };
})();

displayController.renderGameBoard;
