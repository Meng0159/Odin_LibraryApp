import { gameBoard, gameController } from './gameFlow.js';
import { RecipeService } from '../recipeService';
import {createRecipeCard} from '../recentRecipesCards.js';

// Display game board and handle UI updates

const displayGameController = (function () {
    const updateBoard = () => {
        const board = gameBoard.getBoard();
        const boardElement = document.getElementById('game-board');

        boardElement.innerHTML = '';
        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.dataset.row = rowIndex;
                cellElement.dataset.col = colIndex;
                cellElement.textContent = cell;
                boardElement.appendChild(cellElement);
            });
        });
    };

    const updateScores = () => {
        const players = gameController.getPlayers();
        document.getElementById('player1-name').textContent = `${players[0].getName()} (X):`;
        document.getElementById('player2-name').textContent = `${players[1].getName()} (O):`;
        document.getElementById('player1-points').textContent = players[0].getScore();
        document.getElementById('player2-points').textContent = players[1].getScore();
    };

    const gameSettingDialog = () => {
        const dialog = document.createElement('dialog');
        dialog.innerHTML = `
        <form method="dialog" class="relative p-4">
            <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
          <h2 class="text-xl mb-4">Enter Player Names</h2>
          <div class="mb-4">
            <label for="player1">Player X:</label>
            <input type="text" id="player1" class="border border-gray-500 p-2">
          </div>
          <div class="mb-4">
            <label for="player2">Player O:</label>
            <input type="text" id="player2" class="border  border-gray-500 p-2">
          </div>
          <button type="submit" class="bg-primary text-txcolor px-4 py-2 rounded">Start Game</button>
        </form>
      `;

        document.body.appendChild(dialog);
        dialog.showModal();

        dialog.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            const player1Name = dialog.querySelector('#player1').value;
            const player2Name = dialog.querySelector('#player2').value;

            gameController.startGame(player1Name, player2Name);
            updateBoard();
            updateScores();

            dialog.remove();
        });
    };

    const recipeCardDisplay = () => {
        // First, remove any existing recipe card
        const existingCard = document.getElementById('random-recipe-card');
        // console.log(existingCard);
        if (existingCard) {
            existingCard.remove();
        }
        const RecipeServiceInstance = new RecipeService();
        const newRecipeCard = createRecipeCard(RecipeServiceInstance, RecipeServiceInstance.randomGenerator());
        const recipeCardContent = document.getElementById('recipe-content');
        newRecipeCard.id = 'random-recipe-card';
        recipeCardContent.appendChild(newRecipeCard);

    }

    const initialize = () => {
        const gameContainer = document.getElementById('game-container');
        gameContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center h-screen " id="game-content">
            <div class="flex gap-8 bg-general p-6 rounded-lg shadow-2xl w-4/5 max-w-5xl">
                <div class="w-1/2 flex flex-col items-center">
                    <h1 class="text-4xl font-bold mb-6">Tic-Tac-Toe</h1>
                    <div id="game-board" class="grid grid-cols-3 gap-3 bg-gray-100 p-4 rounded-lg shadow-lg"></div>
                    <div class="flex justify-between w-64 mt-6">
                    <button id="restart-btn" class="border-2 border-accent text-txcolor font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-110">Restart</button>
                    <button id="start-btn" class="bg-primary hover:bg-secondary text-txcolor font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-110">Start</button>
                    </div>

                </div>
        
                <div class="w-1/2 flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg">
                    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Who Cooks Tonight?</h2>
                    <div class="flex mb-4 text-txcolor text-xl">
                        <div class="mr-8">
                            <span id="player1-name"></span>
                            <span id="player1-points" class="font-bold"></span>
                        </div>
                        <div>
                            <span id="player2-name"></span>
                            <span id="player2-points" class="font-bold"></span>
                        </div>
                    </div>
                    <div class="text-center text-gray-700 italic mb-4">
                        <button id="random-recipe" class="bg-primary hover:bg-secondary text-txcolor font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-110">Random Recipe</button>
                        <p> Don't know what to cook? Click the button to get a recipe!</p>
                        <div id="recipe-content" class="mt-4"></div>
                    </div>
        
                </div>
  
            </div>
        </div>
      `;

        // Event Listeners
        document.getElementById('start-btn').addEventListener('click', async () => {
            gameSettingDialog();
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            gameController.resetGame();
            updateBoard();
            updateScores();
        });

        document.getElementById('random-recipe').addEventListener('click', () => {
            recipeCardDisplay();
        });

        document.getElementById('game-board').addEventListener('click', (e) => {
            if (e.target.classList.contains('cell')) {
                const row = parseInt(e.target.dataset.row);
                const col = parseInt(e.target.dataset.col);

                const result = gameController.makeMove(row, col);
                if (result) {
                    updateBoard();

                    if (result.status === 'win') {
                        setTimeout(() => {
                            alert(`${result.player.getName()} wins!`);
                            gameBoard.reset();
                            updateBoard();
                            updateScores();
                        }, 100);
                    } else if (result.status === 'draw') {
                        setTimeout(() => {
                            alert("It's a draw!");
                            gameBoard.reset();
                            updateBoard();
                        }, 100);
                    }
                }
            }
        });
    };

    return { initialize };
})();


export { displayGameController };