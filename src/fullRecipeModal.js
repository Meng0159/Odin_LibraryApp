export function showFullRecipeModal(recipeService, recipeId) {
    const recipe = recipeService.getRecipeById(recipeId);
    console.log(recipe);

    if (!recipe) return;

    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add(
        'fixed',
        'inset-0',
        'bg-black',
        'bg-opacity-50',
        'flex',
        'items-center',
        'justify-center',
        'p-4',
        'z-50'
    );

    const modalContent = document.createElement('div');
    modalContent.classList.add(
        'bg-white',
        'rounded-lg',
        'max-w-3xl',
        'w-full',
        'max-h-[80vh]',
        'overflow-y-auto'
    );

    modalContent.innerHTML = `
        <div class="relative">
            <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            
            <div class="p-6">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">${recipe.title}</h2>
            <div class="flex gap-8 mb-6">
                <div class="meta-div basis-3/5">
                    <div class="recipe-meta" >
                        <span class="time-meta">
                            ${recipe["recipe-meta"].time}
                        </span>
                        <span class="level-meta" data-level="${recipe["recipe-meta"].level.toLowerCase()}">
                            ${recipe["recipe-meta"].level}
                        </span>
                    </div>

                    <div class="mt-4">
                        ${recipe.tags.map(tag => `
                            <span class="meta-tags">
                                #${tag}
                            </span>
                        `).join('')}
                    </div>
                </div>
                <div class="img-div flex-shrink-0 w-40 h-40">
                    <img src="${recipe['img-url']}" alt="${recipe.title}" class="w-full h-full object-cover rounded-lg">
                </div>
            </div>

                <p class="text-gray-600 mb-6">${recipe['recipe-summary']}</p>

                <div class="mb-6">
                    <h3 class="text-xl font-semibold mb-3">Ingredients</h3>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-medium mb-2">Main Ingredients:</h4>
                            <ul class="list-disc list-inside text-gray-600 space-y-1">
                                ${recipe.ingredients.items.map(item => `
                                    <li>${item}</li>
                                `).join('')}
                            </ul>
                        </div>
                        ${recipe.ingredients.sauce && recipe.ingredients.sauce.length > 0 ? `
                            <div>
                                <h4 class="font-medium mb-2">Sauce:</h4>
                                <ul class="list-disc list-inside text-gray-600 space-y-1">
                                    ${recipe.ingredients.sauce.map(item => `
                                        <li>${item}</li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                </div>

                <div class="mb-6">
                    <h3 class="text-xl font-semibold mb-3">Instructions</h3>
                    <ol class="space-y-4">
                        ${recipe.instructions.map(instruction => `
                            <li class="flex gap-4">
                                <span class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                                    ${instruction.step}
                                </span>
                                <p class="text-gray-600 pt-1">${instruction.text}</p>
                            </li>
                        `).join('')}
                    </ol>
                </div>
            </div>
        </div>
    `;

    // Add close button handler
    modalContent.querySelector('button').addEventListener('click', () => {
        modalOverlay.remove();
    });

    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
        }
    });

    // Add keyboard event listener for Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            modalOverlay.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
}