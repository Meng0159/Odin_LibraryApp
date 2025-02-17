// game.js - Tic Tac Toe logic

const gameFlow = (function() {
  const newGame = gameSetUp();
  const board = newGame.gameboard;
  const playerOne = newGame.createPlayer("Player 1", "x");
  const playerTwo = newGame.createPlayer("Player 2", "o");
  const players = [playerOne, playerTwo];


  const setNames = (player1Name, player2Name) => {
      players[0].setName(player1Name);
      players[1].setName(player2Name);
  }

  const getPlayers = () => players;
  const getBoard = () => board.getBoard();

  let activePlayer = players[0];

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  // check the spot for the marker and check for win conditions and switch player
  const placeMarker = (row, col) => {
    if (board.getBoard()[row][col] === "") {
      board.addMarker(row, col, activePlayer);

      if (checkWin(activePlayer.getMarker())) {
        console.log(checkWin(activePlayer.getMarker()));
        setTimeout(() => {
          alert(`${activePlayer.getName()} wins!`);
          activePlayer.addPoint();
          board.restartBoard();
          updateScreen();
        }, 200);
      } else if (board.isFull()) {
        // check no one win but the spot is full
        setTimeout(() => {
          alert("It's a draw!");
          board.restartBoard();
          updateScreen();
        }, 200);
      } else {
        switchPlayer();
      }
    }
  };

  
  const checkWin = (marker) => {
    const boardArray = board.getBoard();

    // Check rows, columns, and diagonals
    return (
      boardArray.some(row => row.every(cell => cell === marker)) || // Rows
      [0, 1, 2].some(col => boardArray.every(row => row[col] === marker)) || // Columns
      [boardArray[0][0], boardArray[1][1], boardArray[2][2]].every(cell => cell === marker) || // Diagonal 1
      [boardArray[0][2], boardArray[1][1], boardArray[2][0]].every(cell => cell === marker) // Diagonal 2
    );
  };

  const resetGame = () => {
    newGame.gameboard.restartBoard();
    playerOne.resetPoints();
    playerTwo.resetPoints();
  }

  return {setNames, getPlayers, getBoard, placeMarker, resetGame};
})();


function gameSetUp() {
  //Create array for the board
  const gameboard = (function () {
    const board = [];
    const size = 3;
    let i, j;
    // Create a 2D array for the board
    for (i = 0; i < size; i++) {
      board[i] = []
      for (j = 0; j < size; j++) {
        board[i].push('');
      }
    }

    const restartBoard = () => {
      for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
          board[i][j] = '';
        }
      }
    }

    const getBoard = () => board;

    const addMarker = (row, col, player) => {
      board[row][col] = player.getMarker();
    };

    const isFull = () => board.flat().every(cell => cell !== "");


    return { getBoard, restartBoard, addMarker, isFull };

  })();

  // Player factory function
  function createPlayer(name, marker) {
    let points = 0;
    
    return {
        getName: () => name,
        getMarker: () => marker,
        setName: (newName) => name = newName,
        getPoints: () => points,
        addPoint: () => points++,
        resetPoints: () => points = 0
    };
  }
  return { gameboard, createPlayer };
}



// Screen Controller for each button and cell click
function ScreenController(){
  const startButton = document.querySelector("#start-button");
  const restartButton = document.querySelector("#restart-button");
  //  ID selector for the name dialog and the save button
  const nameDialog = document.querySelector("#input-dialog");
  const dialogSaveButton = document.querySelector("#save-setup-btn");
  const gameBoardElement = document.querySelector("#game-board");

  // Display the player names dialog when the start button is clicked
  startButton.addEventListener("click", () => nameDialog.showModal());

  // Save to the player names and start the game
  dialogSaveButton.addEventListener("click", (e) => {
      e.preventDefault();
      gameFlow.setNames(
          document.getElementById("input-player1-name").value,
          document.getElementById("input-player2-name").value
      );
      nameDialog.close();
      updateScreen();
  });


  restartButton.addEventListener("click", gameFlow.resetGame);

  // Handle board update for every clicking on cell using event delegation

  gameBoardElement.addEventListener("click", (e) => {
      const cell = e.target; // Get the clicked element inside the board, class = cell
      if (cell.classList.contains("cell")) {
          // Get the row and column of the clicked cell (data-row="0" data-col="0")
          const row = cell.dataset.row;
          const col = cell.dataset.col;
          gameFlow.placeMarker(row, col);
          updateScreen();
      }
  });


  // restart the game
  restartButton.addEventListener("click", () => {
    gameFlow.resetGame();
    updateScreen();
  })
  
};


function updateScreen() {
  const boardArray = gameFlow.getBoard();
  const boardElement = document.querySelector("#game-board");
  boardElement.innerHTML = ""; // Clear the board
  // Create the new board
  boardArray.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
          const cellElement = document.createElement("div");
          cellElement.classList.add("cell");
          cellElement.dataset.row = rowIndex;
          cellElement.dataset.col = colIndex;
          cellElement.textContent = cell;
          boardElement.appendChild(cellElement);
      });
  });
  // replace the player names
  const players = gameFlow.getPlayers();
  document.querySelector("#player1-name").textContent = players[0].getName()+" (X):";
  document.querySelector("#player2-name").textContent = players[1].getName()+" (O):";
  // replace the player points
  document.querySelector("#player1-points").textContent = players[0].getPoints();
  document.querySelector("#player2-points").textContent = players[1].getPoints();
};
  
export {ScreenController};
  