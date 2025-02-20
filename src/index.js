import "./style.css";
import { loadNavBar } from "./navBar.js";
import { loadCarousel } from "./homeCarousel";
import { loadRecentRecipes } from "./recentRecipesCards";
import { displayGameController } from "./gameSection/gameBoard.js";


document.addEventListener("DOMContentLoaded", () => {
    loadNavBar();
    loadCarousel();
    loadRecentRecipes();
    startGameBoard();

});

function clearSotrage() {
    localStorage.clear();
}

function startGameBoard() {
    displayGameController.initialize();
};