import { RecipeService } from './recipeService';
import { showFullRecipeModal } from './fullRecipeModal';

export function loadRecentRecipes() {
    const recipeService = new RecipeService();
    // recipeService.init();

    // Create container
    const cardsContainer = document.getElementById('recipe-cards-section');
    cardsContainer.classList.add('py-8', 'px-4', 'max-w-7xl', 'mx-auto');

    // Section header
    const header = document.createElement('div');
    header.classList.add('mb-8');
    header.innerHTML = `
        <h2 class="text-3xl font-bold text-gray-900">New Recipes</h2>
        <p class="mt-2 text-lg text-gray-600">Explore the latest recipes</p>
    `;

    // Create grid for recipe cards
    const cardsGrid = document.getElementById('recipes-cards-div');
    cardsGrid.classList.add(
        'grid',
        'grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-3',
        'gap-6'
    );


    // Create recipe cards from Get recent recipes func.
    recipeService.getRecentRecipes(recipeService.getAllRecipes().length).forEach(recipe => {
        const oneCard = createRecipeCard(recipeService,recipe);
        // Add the delete button to the card
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"      stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        `; 
        deleteButton.classList = 'text-gray-500 hover:text-red-700';
        
        // delete functionality
        deleteButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any parent click events
            oneCard.remove();
            recipeService.deleteRecipe(recipe.id);
        });
        
        oneCard.appendChild(deleteButton);
        // add a shortcut in the card for the ingredients
        const ingredientsShortcut = oneCard.querySelector(`#ingredients-shortcut-${recipe.id}`);
        if (ingredientsShortcut) {
            ingredientsShortcut.innerHTML = `
                <h4 class="font-semibold text-gray-900 mb-2">Main Ingredients:</h4>
                <ul class="list-disc list-inside text-gray-600">
                    ${recipe.ingredients.items.slice(0, 3).map(item => `
                        <li class="truncate">${item}</li>
                    `).join('')}
                    ${recipe.ingredients.items.length > 3 ? 
                        `<li class="text-gray-400">+${recipe.ingredients.items.length - 3} more...</li>` : 
                        ''}
                </ul>
            `;
        }
        cardsGrid.appendChild(oneCard); 
    });

    cardsContainer.appendChild(header);
    cardsContainer.appendChild(cardsGrid);
    
    return cardsContainer;
}

export function createRecipeCard(recipeService,recipe) {
    const card = document.createElement('div');
    card.id = `recipe-card-${recipe.id}`;
    card.classList.add(
        'bg-white',
        'rounded-lg',
        'shadow-md',
        'overflow-hidden',
        'transition-transform',
        'duration-200',
        'hover:shadow-lg',
        'hover:-translate-y-1'
    );

    card.innerHTML = `
        <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">${recipe.title}</h3>
            
            <div class="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <span>
                    <i class="far fa-clock"></i> ${recipe['recipe-meta'].time}
                </span>
                <span>
                    <i class="far fa-signal"></i> ${recipe['recipe-meta'].level}
                </span>
            </div>

            <div class="mb-3">
                ${recipe.tags.map(tag => `
                    <span class="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mr-2 mb-2">
                        #${tag}
                    </span>
                `).join('')}
            </div>

            <p class="text-gray-600 mb-4">${recipe['recipe-summary']}</p>
            <div id="ingredients-shortcut-${recipe.id}" class="mb-4"></div>
            <button class="view-recipe-btn w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    data-recipe-id="${recipe.id}">
                View Full Recipe
            </button>
        </div>
    `;

    // Add click handler for view full recipe button
    card.querySelector('.view-recipe-btn').addEventListener('click', () => {
        showFullRecipeModal(recipeService, recipe.id);
    });

    return card;
}
