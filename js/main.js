const div1 = document.getElementById('1')
const div2 = document.getElementById('2')
const div3 = document.getElementById('3')
const div4 = document.getElementById('4')
const div5 = document.getElementById('5')
const div6 = document.getElementById('6')
const div7 = document.getElementById('7')
const div8 = document.getElementById('8')
const div9 = document.getElementById('9')

const gameBoard = (() => {
  const board = [[0,0,0],[0,0,0],[0,0,0]]
  return {board}
})();

const displayController = (() => {
	
})();

const player = (name, mark) => {
  return { name, mark };
};

const player1 = player('Andres', 'X')
const player2 = player('Eduardo', 'O')

const renderGameBoard = () => {
  div1.textContent = gameBoard.board[0][0]
  div2.textContent = gameBoard.board[0][1]
  div3.textContent = gameBoard.board[0][2]
  div4.textContent = gameBoard.board[1][0]
  div5.textContent = gameBoard.board[1][1]
  div6.textContent = gameBoard.board[1][2]
  div7.textContent = gameBoard.board[2][0]
  div8.textContent = gameBoard.board[2][1]
  div9.textContent = gameBoard.board[2][2]
}

renderGameBoard()
