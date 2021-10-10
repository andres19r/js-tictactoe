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
const restartBtn = document.getElementById("btn-restart");
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
    playBtn.disabled = true;
    restartBtn.disabled = false;
    name1.disabled = true;
    name2.disabled = true;
    player1.name = name1.value;
    player2.name = name2.value;
    turn.textContent = `${player1.name}'s turn`;
    addGrids();
    sw += 1;
  } else if (name1.value !== "" && name2.value === "") {
    turn.textContent = "Play against the AI";
    name1.disabled = true;
    name2.disabled = true;
    playBtn.disabled = true;
    restartBtn.disabled = false;
    player1.name = name1.value;
    player2.name = "AI";
    addGridsAI();
    sw += 1;
  }
});

restartBtn.addEventListener("click", () => {
  playBtn.disabled = false;
  restartBtn.disabled = true;
  sw = -1;
  name1.disabled = false;
  name2.disabled = false;
  name1.value = "";
  name2.value = "";
  name1.focus();
  displayController.clearBoard();
  displayController.renderGameBoard();
  turn.textContent = "Insert your names to play!";
  player1.name = "";
  player2.name = "";
  removeGrids();
});

const gameBoard = ((player1, player2) => {
  let winner = false;
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
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
  const playGameAI = (spot) => {
    addMark(player1, spot);
    let aiMove = findBestMove(board,player1,player2)
    checkWinner(player1);
    checkDraw();
    if (winner === false) {
      addMarkAI(aiMove, player2);
      checkWinner(player2);
      checkDraw();
    }
  };
  const addMarkAI = (move,ai) => {
    console.log(move)
    if(move.row===0){
      if(move.col===0){
        board[0][0]=ai.mark
        div1.textContent = ai.mark;
      }else if(move.col===1){
        board[0][1]=ai.mark
        div2.textContent = ai.mark;
      }else if(move.col===2){
        board[0][2]=ai.mark
        div3.textContent = ai.mark;
      }
    }else if(move.row===1){
      if(move.col===0){
        board[1][0]=ai.mark
        div4.textContent = ai.mark;
      }else if(move.col===1){
        board[1][1]=ai.mark
        div5.textContent = ai.mark;
      }else if(move.col===2){
        board[1][2]=ai.mark
        div6.textContent = ai.mark;
      }
    }else if(move.row===2){
      if(move.col===0){
        board[2][0]=ai.mark
        div7.textContent = ai.mark;
      }else if(move.col===1){
        board[2][1]=ai.mark
        div8.textContent = ai.mark;
      }else if(move.col===2){
        board[2][2]=ai.mark
        div9.textContent = ai.mark;
      }
    }
  }
  const checkDraw = () => {
    if (fullBoard()) {
      turn.textContent = "It's a tie!";
    }
  };
  const checkWinner = (player) => {
    if (
      (board[0][0] === player.mark &&
        board[0][1] === player.mark &&
        board[0][2] === player.mark) ||
      (board[1][0] === player.mark &&
        board[1][1] === player.mark &&
        board[1][2] === player.mark) ||
      (board[2][0] === player.mark &&
        board[2][1] === player.mark &&
        board[2][2] === player.mark) ||
      (board[0][0] === player.mark &&
        board[1][0] === player.mark &&
        board[2][0] === player.mark) ||
      (board[0][1] === player.mark &&
        board[1][1] === player.mark &&
        board[2][1] === player.mark) ||
      (board[0][2] === player.mark &&
        board[1][2] === player.mark &&
        board[2][2] === player.mark) ||
      (board[0][0] === player.mark &&
        board[1][1] === player.mark &&
        board[2][2] === player.mark) ||
      (board[0][2] === player.mark &&
        board[1][1] === player.mark &&
        board[2][0] === player.mark)
    ) {
      turn.textContent = `${player.name} wins!`;
      winner = true;
    }
  };
  const fullBoard = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          return false;
        }
      }
    }
    return true;
  };
  const addMark = (player, spot) => {
    switch (parseInt(spot)) {
      case 1:
        board[0][0] = player.mark;
        div1.textContent = player.mark;
        break;
      case 2:
        board[0][1] = player.mark;
        div2.textContent = player.mark;
        break;
      case 3:
        board[0][2] = player.mark;
        div3.textContent = player.mark;
        break;
      case 4:
        board[1][0] = player.mark;
        div4.textContent = player.mark;
        break;
      case 5:
        board[1][1] = player.mark;
        div5.textContent = player.mark;
        break;
      case 6:
        board[1][2] = player.mark;
        div6.textContent = player.mark;
        break;
      case 7:
        board[2][0] = player.mark;
        div7.textContent = player.mark;
        break;
      case 8:
        board[2][1] = player.mark;
        div8.textContent = player.mark;
        break;
      case 9:
        board[2][2] = player.mark;
        div9.textContent = player.mark;
        break;
    }
  };
  const isMovesLeft = (board) => {
    for(let i = 0;i<3;i++){
      for(let j=0;j<3;j++){
        if(board[i][j]==='') return true;
      }
    }
    return false
  }
  const evaluate = (b,player1,player2) => {
    for(let row=0;row<3;row++){
      if(b[row][0] === b[row][1] && b[row][1] === b[row][2]){
        if(b[row][0]===player1.mark){
          return +10
        }else if(b[row][0]===player2.mark){
          return -10
        }
      }
    }
    for(let col=0;col<3;col++){
      if(b[0][col] === b[1][col] && b[1][col] === b[2][col]){
        if(b[0][col]===player1.mark){
          return +10
        }else if(b[0][col]===player2.mark){
          return -10
        }
      }
    }
    if(b[0][2] === b[1][1] && b[1][1] === b[2][0]){
      if(b[0][2] === player1.mark){
        return +10
      }else if(b[0][2] === player2.mark){
        return -10
      }
    }
    return 0
  }
  const minimax = (board,depth,isMax,player1,player2) => {
    let score= evaluate(board,player1,player2)
    if(score === 10) return score
    if(score === -10) return score
    if(isMovesLeft(board)===false) return 0
    if(isMax){
      let best = -1000
      for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
          if(board[i][j]===''){
            board[i][j] = player1.mark
            best = Math.max(best, minimax(board,depth+1,!isMax,player1,player2))
            board[i][j]=''
          }
        }
      }
      return best
    }else{
      let best = 1000
      for(let i =0;i<3;i++){
        for(let j=0;j<3;j++){
          if(board[i][j]===''){
            board[i][j]=player2.mark
            best=Math.min(best,minimax(board,depth+1,!isMax,player1,player2))
            board[i][j]=''
          }
        }
      }
      return best
    }
  }
  const findBestMove = (board,player1,player2)=>{
    let bestVal = -1000
    let bestMove = {
      row: -1,
      col: -1
    }
    for(let i=0;i<3;i++){
      for(let j=0;j<3;j++){
        if(board[i][j]===''){
          board[i][j]=player1.mark
          let moveVal = minimax(board,0,false,player1,player2)
          board[i][j]=''
          if(moveVal > bestVal){
            bestMove.row =i
            bestMove.col=j
            bestVal=moveVal
          }
        }
      }
    }
    return bestMove
  }
  return { board, addMark, playGame, playGameAI };
})(player1, player2);

function addGrids() {
  grids.forEach((grid) => {
    grid.style.cursor = "pointer";
    grid.addEventListener("click", () => {
      if (grid.textContent === "") {
        gameBoard.playGame(grid.id);
      }
    });
  });
}

function addGridsAI() {
  grids.forEach((grid) => {
    grid.style.cursor = "pointer";
    grid.addEventListener("click", () => {
      if (grid.textContent === "") {
        gameBoard.playGameAI(grid.id);
      }
    });
  });
}

function removeGrids() {
  grids.forEach((grid) => {
    grid.style.cursor = "auto";
    grid.removeEventListener("click", () => {
      if (grid.textContent === "") {
        gameBoard.playGame(grid.id);
      }
    });
  });
}

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
  const clearBoard = () => {
    gameBoard.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  };

  return { renderGameBoard, clearBoard };
})();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

displayController.renderGameBoard();
