const Player = (name, marker) => {
  const moves = 5;
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker, moves };
};

// temporary
const player1 = Player('jk', 'O');
const player2 = Player('ellen', 'X');

const game = (() => {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  let currPlayerMarker;
  const getPlayerTurn = () => {
    if (player1.moves >= player2.moves) {
      player1.moves -= 1;
      currPlayerMarker = player1.getMarker();
    } else {
      player2.moves -= 1;
      currPlayerMarker = player2.getMarker();
    }
  };
  const getCurrPlayerMarker = () => currPlayerMarker;

  return {
    board,
    getPlayerTurn,
    getCurrPlayerMarker,
  };
})();
// const player1 = Player(prompt('First player name?'), prompt('Choose a marker: O | X'));
// const player2 = Player(prompt('Second player name?'), prompt('Choose a marker: O | X'));

const grids = document.querySelectorAll('.grids');
grids.forEach((grid) => {
  grid.addEventListener('click', (marker) => {
    game.getPlayerTurn();
    const span = document.createElement('span');
    span.id = game.getCurrPlayerMarker();
    marker.target.appendChild(span);
    const firstData = marker.target.getAttribute('data-first');
    const secondData = marker.target.getAttribute('data-second');
    game.board[firstData][secondData] = game.getCurrPlayerMarker();
  });
});

function checkWinner() {
  const currPlayerMarker = game.getCurrPlayerMarker();
  // check for row winners
  for (let i = 0; i < game.board.length; i += 1) {
    const row = game.board[i];
    if (row.every((cell) => cell === currPlayerMarker)) {
      console.log('win');
    }
  }
  // check for column winners
  for (let i = 0; i < game.board.length; i += 1) {
    const col = [];
    for (let j = 0; j < game.board.length; j += 1) {
      col.push(game.board[j][i]);
    }
    if (col.every((cell) => cell === currPlayerMarker)) {
      console.log('win');
    }
  }
  // check for diagonal winners

  // check for right diagonal winners
  for (let i = 0; i < game.board.length;) {
    const rightDiag = [];
    console.log(rightDiag);
    for (let j = 0; j < game.board.length; j += 1) {
      rightDiag.push(game.board[i][j]);
      i += 1;
    }
    if (rightDiag.every((cell) => cell === currPlayerMarker)) {
      console.log('win');
    }
  }
  // check for left diagonal winners
  for (let i = 0; i < game.board.length;) {
    const leftDiag = [];
    for (let j = game.board.length - 1; j >= 0; j -= 1) {
      leftDiag.push(game.board[i][j]);
      i += 1;
    }
    if (leftDiag.every((cell) => cell === currPlayerMarker)) {
      console.log('win');
    }
  }
};