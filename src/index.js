import "./style.css";
import {ScreenController} from "./game.js";
import { addBookToLibrary, updateLibraryDisplay } from "./library.js";
import { loadHome } from "./home";
import { loadNavBar } from "./navBar.js";


// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    loadNavBar();
    loadHome();
    // updateLibraryDisplay();
    startGameBoard();

});

// Add Book Form
document.getElementById("book-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);
});

// Game Board Generation
// Game Board Generation
function startGameBoard() {
    ScreenController();
};