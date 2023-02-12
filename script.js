const selectors = {
  startGame: document.querySelector('#startGame'),
  startGame_button: document.querySelector('#startButton'),
  gameInfo: document.querySelector('#gameInfo'),
  playerBoard: document.querySelector('#playerBoard'),
  playerBoard_button: document.querySelector('#playGame'),
  playerBoard_input: document.querySelectorAll('.playerInput'),
  playerBoard_round: document.querySelector('#round'),
  playerBoard_roundScore: document.querySelector('#roundScore'),
  playerBoard_player1Name: document.querySelector('#player1Name'),
  playerBoard_player2Name: document.querySelector('#player2Name'),
  playerBoard_player1Input: document.querySelector('#player1'),
  playerBoard_player2Input: document.querySelector('#player2'),
  playerBoard_player1Score: document.querySelector('#player1Score'),
  playerBoard_player2Score: document.querySelector('#player2Score'),
  gameBoard: document.querySelector('#gameBoard'),
  gameBoard_grids: document.querySelectorAll('.grids'),
  resetButton: document.querySelector('#resetButton'),
};

const Player = (name) => {
  const moves = 5;
  const score = 0;
  const getName = () => name;
  return { getName, moves, score };
};

let player1;
let player2;

const game = (() => {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  const getCurrentRound = 1;
  const winnerFound = false;
  let currPlayerMarker;
  let currTurn;
  const getPlayerTurn = () => {
    if (player1.moves >= player2.moves) {
      player1.moves -= 1;
      currPlayerMarker = player1.marker;
      currTurn = player2.getName();
    } else {
      player2.moves -= 1;
      currPlayerMarker = player2.marker;
      currTurn = player1.getName();
    }
  };
  const getCurrTurn = () => currTurn;
  const getCurrPlayerMarker = () => currPlayerMarker;

  const addArrowIcon = () => {
    const arrow = document.querySelector('box-icon');
    const icon = document.createElement('box-icon');
    icon.setAttribute('name', 'chevrons-down');
    icon.setAttribute('animation', 'fade-down');
    if (game.getCurrTurn() === player1.getName()) {
      icon.classList.add('left');
      selectors.gameInfo.appendChild(icon);
    } else {
      icon.classList.add('right');
      selectors.gameInfo.appendChild(icon);
    }
    selectors.gameInfo.removeChild(arrow);
  };

  const nextRound = () => {
    const span = document.querySelectorAll('.span');
    span.forEach((marker) => marker.remove());
    game.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    game.winnerFound = false;

    player1.moves = 5;
    player2.moves = 5;

    const arrow = document.querySelector('box-icon');
    selectors.gameInfo.removeChild(arrow);
    const arrowIcon = document.createElement('box-icon');
    arrowIcon.setAttribute('name', 'chevrons-down');
    arrowIcon.setAttribute('animation', 'fade-down');
    arrowIcon.classList.add('left');
    selectors.gameInfo.appendChild(arrowIcon);
  };

  const resetGame = () => {
    const span = document.querySelectorAll('.span');
    span.forEach((marker) => marker.remove());
    game.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];

    game.winnerFound = false;

    player1.moves = 5;
    player2.moves = 5;
    player1.score = 0;
    player2.score = 0;
    selectors.playerBoard_player1Score.textContent = player1.score;
    selectors.playerBoard_player2Score.textContent = player2.score;
    game.getCurrentRound = 1;
    selectors.playerBoard_roundScore.textContent = game.getCurrentRound;

    const arrow = document.querySelector('box-icon');
    selectors.gameInfo.removeChild(arrow);
    const arrowIcon = document.createElement('box-icon');
    arrowIcon.setAttribute('name', 'chevrons-down');
    arrowIcon.setAttribute('animation', 'fade-down');
    arrowIcon.classList.add('left');
    selectors.gameInfo.appendChild(arrowIcon);
  };

  const checkWinner = () => {
    const currPlayer = game.getCurrPlayerMarker();
    // check for row winners
    for (let i = 0; i < game.board.length; i += 1) {
      const row = game.board[i];
      if (row.every((cell) => cell === currPlayer)) {
        if (currPlayer === player1.marker) {
          game.winnerFound = true;
          player1.score += 1;
          selectors.playerBoard_player1Score.textContent = player1.score;
        } else {
          game.winnerFound = true;
          player2.score += 1;
          selectors.playerBoard_player2Score.textContent = player2.score;
        }
      }
    }
    // check for column winners
    for (let i = 0; i < game.board.length; i += 1) {
      const col = [];
      for (let j = 0; j < game.board.length; j += 1) {
        col.push(game.board[j][i]);
      }
      if (col.every((cell) => cell === currPlayer)) {
        if (currPlayer === player1.marker) {
          game.winnerFound = true;
          player1.score += 1;
          selectors.playerBoard_player1Score.textContent = player1.score;
        } else {
          game.winnerFound = true;
          player2.score += 1;
          selectors.playerBoard_player2Score.textContent = player2.score;
        }
      }
    }
    // check for diagonal winners

    // check for right diagonal winners
    for (let i = 0; i < game.board.length;) {
      const rightDiag = [];
      for (let j = 0; j < game.board.length; j += 1) {
        rightDiag.push(game.board[i][j]);
        i += 1;
      }
      if (rightDiag.every((cell) => cell === currPlayer)) {
        if (currPlayer === player1.marker) {
          game.winnerFound = true;
          player1.score += 1;
          selectors.playerBoard_player1Score.textContent = player1.score;
        } else {
          game.winnerFound = true;
          player2.score += 1;
          selectors.playerBoard_player2Score.textContent = player2.score;
        }
      }
    }
    // check for left diagonal winners
    for (let i = 0; i < game.board.length;) {
      const leftDiag = [];
      for (let j = game.board.length - 1; j >= 0; j -= 1) {
        leftDiag.push(game.board[i][j]);
        i += 1;
      }
      if (leftDiag.every((cell) => cell === currPlayer)) {
        if (currPlayer === player1.marker) {
          game.winnerFound = true;
          player1.score += 1;
          selectors.playerBoard_player1Score.textContent = player1.score;
        } else {
          game.winnerFound = true;
          player2.score += 1;
          selectors.playerBoard_player2Score.textContent = player2.score;
        }
      }
    }
    // check for tie
    if (player1.moves === 0 && player2.moves === 1) {
      game.winnerFound = true;
    }
  };

  return {
    board,
    getPlayerTurn,
    getCurrPlayerMarker,
    nextRound,
    checkWinner,
    winnerFound,
    getCurrentRound,
    getCurrTurn,
    addArrowIcon,
    resetGame,
  };
})();

selectors.startGame_button.addEventListener('click', () => {
  selectors.startGame.classList.remove('active');
  selectors.startGame_button.classList.add('inactive');
  selectors.playerBoard.classList.add('show');
  selectors.playerBoard.classList.add('active');
});

selectors.playerBoard_button.addEventListener('click', () => {
  selectors.playerBoard_button.classList.add('inactive');
  selectors.playerBoard.classList.remove('active');
  selectors.playerBoard_input.forEach((input) => input.classList.add('inactive'));
  selectors.playerBoard_player1Score.classList.remove('inactive');
  selectors.playerBoard_player2Score.classList.remove('inactive');
  selectors.playerBoard_round.classList.add('active');
  selectors.gameBoard.classList.add('active');
  selectors.gameBoard_grids.forEach((grid) => grid.classList.add('active'));
  setTimeout(() => {
    selectors.gameInfo.classList.add('active');
    selectors.resetButton.classList.add('active');
  }, 1550);
  // player1 = Player(selectors.playerBoard_player1Input.value);
  // player1.marker = 'O';
  // player2 = Player(selectors.playerBoard_player2Input.value);
  // player2.marker = 'X';
  if (selectors.playerBoard_player1Input.value === '') {
    player1 = Player('Player1');
    player1.marker = 'O';
    selectors.playerBoard_player1Name.textContent = 'Player 1';
  } else {
    player1 = Player(selectors.playerBoard_player1Input.value);
    player1.marker = 'O';
    selectors.playerBoard_player1Name.textContent = player1.getName();
  }
  if (selectors.playerBoard_player2Input.value === '') {
    player2 = Player('Player 2');
    player2.marker = 'X';
    selectors.playerBoard_player2Name.textContent = 'Player 2';
  } else {
    player2 = Player(selectors.playerBoard_player2Input.value);
    player2.marker = 'X';
    selectors.playerBoard_player2Name.textContent = player2.getName();
  }
});

selectors.gameBoard_grids.forEach((grid) => {
  grid.addEventListener('click', (marker) => {
    game.getPlayerTurn();

    game.addArrowIcon();

    const firstData = marker.target.getAttribute('data-first');
    const secondData = marker.target.getAttribute('data-second');
    if (game.board[firstData][secondData] === '') {
      game.board[firstData][secondData] = game.getCurrPlayerMarker();
      const span = document.createElement('span');
      span.id = game.getCurrPlayerMarker();
      span.classList.add('span');
      marker.target.appendChild(span);
    }
    game.checkWinner();
    if (game.winnerFound) {
      setTimeout(() => {
        game.nextRound();
        game.getCurrentRound += 1;
        selectors.playerBoard_roundScore.textContent = game.getCurrentRound;
      }, 500);
    }
  });
});

selectors.resetButton.addEventListener('click', () => game.resetGame());
