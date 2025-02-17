export function loadNavBar() {
    const body = document.body;
    
    const header = document.createElement('header');
    header.classList.add("bg-orange-200", "text-center", "py-6", "shadow-md", "bg-cover", "bg-center");
    header.style.backgroundImage = "url('./images/background.jpg')";
    header.innerHTML = `
        <div>
            <div class="logoSet">
                <span class="logoBar"></span>
                <h1 class="text-4xl text-blue-700">
                    <span class="logoTop">What's for? </span> DINNER
                </h1>
            </div>
            <span class="logoButtonBar"></span>
            <p class="text-sm text-blue-700">to discover</p>
        </div>
    `;
    
    const navContainer = document.createElement('div');
    navContainer.classList.add("bg-sky-700", "text-stone-300", "px-4", "py-2", "rounded", "flex", "justify-between");
    navContainer.innerHTML = `
        <div class="logoSet">
            <span class="logoBar"></span>
        </div>
        <div>
            <nav class="p-2 text-center">
                <a href="#home" class="px-4">Home</a>
                <a href="#recipes" class="px-4">Recipes</a>
                <a href="#game" class="px-4">Game</a>
                <a href="#about" class="px-4">About</a>
            </nav>
        </div>
        <div>
            <button id="add-book-btn" class="bg-rose-200 hover:bg-blue-300 text-indigo-950 px-2 py-2 rounded">+ Recipe</button>
            <button id="play-game-btn">Play</button>
        </div>
    `;
    
    body.prepend(navContainer);
    body.prepend(header);
}