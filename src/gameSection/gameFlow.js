// Board module to handle game board state and operations
const gameBoard = (function() {
  const BOARD_SIZE = 3;
  let board = [];

  const initialize = () => {
    board = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(''));
  };

  const getBoard = () => board;

  const addMarker = (row, col, marker) => {
    if (isValidMove(row, col)) {
      board[row][col] = marker;
      return true;
    }
    return false;
  };

  const isValidMove = (row, col) => {
    return board[row][col] === '';
  };

  const isFull = () => board.flat().every(cell => cell !== '');

  const reset = () => initialize();

  initialize();

  return { getBoard, addMarker, isFull, reset };
})();

// Player factory function
const Player = (name, marker) => {
  let score = 0;
  
  return {
    getName: () => name,
    getMarker: () => marker,
    getScore: () => score,
    incrementScore: () => score++,
    resetScore: () => score = 0,
    setName: (newName) => name = newName
  };
};

// Game controller to manage game state and flow
const gameController = (function() {
  let players = [
    Player('Player X', 'X'),
    Player('Player O', 'O')
  ];
  let currentPlayerIndex = 0;
  let gameActive = false;

  const getCurrentPlayer = () => players[currentPlayerIndex];

  const switchPlayer = () => {
    currentPlayerIndex = 1 - currentPlayerIndex;
  };

  const checkWin = (marker) => {
    const board = gameBoard.getBoard();
    
    // Check rows
    for (let row = 0; row < 3; row++) {
      if (board[row].every(cell => cell === marker)) return true;
    }
    
    // Check columns
    for (let col = 0; col < 3; col++) {
      if (board.every(row => row[col] === marker)) return true;
    }
    
    // Check diagonals
    const diagonal1 = [board[0][0], board[1][1], board[2][2]];
    const diagonal2 = [board[0][2], board[1][1], board[2][0]];
    
    return diagonal1.every(cell => cell === marker) || 
           diagonal2.every(cell => cell === marker);
  };

  const makeMove = (row, col) => {
    if (!gameActive) return false;

    const currentPlayer = getCurrentPlayer();
    if (gameBoard.addMarker(row, col, currentPlayer.getMarker())) {
      if (checkWin(currentPlayer.getMarker())) {
        currentPlayer.incrementScore();
        return { status: 'win', player: currentPlayer };
      }
      
      if (gameBoard.isFull()) {
        return { status: 'draw' };
      }
      
      switchPlayer();
      return { status: 'continue' };
    }
    return false;
  };

  const startGame = (player1Name, player2Name) => {
    players[0].setName(player1Name || 'Player X');
    players[1].setName(player2Name || 'Player O');
    gameBoard.reset();
    currentPlayerIndex = 0;
    gameActive = true;
  };

  const resetGame = () => {
    players.forEach(player => player.resetScore());
    gameBoard.reset();
    currentPlayerIndex = 0;
    gameActive = true;
  };

  return {
    startGame,
    resetGame,
    makeMove,
    getCurrentPlayer,
    getPlayers: () => players
  };
})();

export { gameBoard, gameController };
