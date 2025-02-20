import { addRecipeForm } from './addRecipeForm';

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
                <a href="#about" class="px-4">About</a>
                <a href="#recipes" class="px-4">Recipes</a>
                <a href="#game" class="px-4">Game</a>
                
            </nav>
        </div>
        <div class="flex justify-center gap-4">
            <button id="add-recipe-btn" class="w-24 bg-secondary hover:bg-general text-txcolor px-2 py-2 rounded">+ Recipe</button>
            <button id="play-game-btn" class="w-16 relative px-2 rounded">
                <span class="absolute inset-[1px] border-4 border-accent  hover:border-general rounded-lg"></span>
                Play
            </button>
        </div>
        `;
    
    body.prepend(navContainer);
    body.prepend(header);

    // Add click event listener
    document.getElementById('add-recipe-btn').addEventListener('click', () => {
        addRecipeForm();
    });

    // Add click event listener for game button to mve to game section
    document.getElementById('play-game-btn').addEventListener('click', () => {
        document.getElementById('play-game-section').scrollIntoView({ behavior: 'smooth' });
    });


}