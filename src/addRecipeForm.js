import { RecipeService } from './recipeService';

export function addRecipeForm() {
    const recipeService = new RecipeService();


    // Create modal overlay with fixed positioning and center alignment
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

    // Create modal container with defined size and scrolling
    const modalContent = document.createElement('div');
    modalContent.classList.add(
        'bg-white',
        'rounded-lg',
        'relative',  // For absolute positioning of close button
        'w-full',
        'max-w-2xl',  // Maximum width
        'h-auto',
        'max-h-[90vh]',  // Maximum height of 90% viewport height
        'flex',
        'flex-col'
    );

    // Close button (X) in top right corner
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.classList.add(
        'absolute',
        'top-2',
        'right-2',
        'text-gray-500',
        'hover:text-gray-700',
        'text-2xl',
        'font-bold',
        'w-8',
        'h-8',
        'flex',
        'items-center',
        'justify-center',
        'rounded-full',
        'hover:bg-gray-100',
        'transition-colors',
        'z-10'
    );
    closeButton.onclick = () => modalOverlay.remove();

    // Form header
    const header = document.createElement('div');
    header.classList.add('flex', 'justify-between', 'items-center', 'mb-4');

    const title = document.createElement('h2');
    title.textContent = 'Add New Recipe';
    title.classList.add('text-2xl', 'font-bold');

    // Scrollable content container
    const scrollableContent = document.createElement('div');
    scrollableContent.classList.add(
        'p-6',
        'overflow-y-auto',  // Enable vertical scrolling
        'flex-grow'  // Allow content to grow and enable scrolling
    );


    header.appendChild(title);
    header.appendChild(closeButton);


    // Create form
    const form = document.createElement('form');
    form.classList.add('space-y-4');

    // Basic info section
    const basicInfo = `
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700">Recipe Title</label>
                <input type="text" name="title" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Image URL</label>
                <input type="url" name="img-url" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Category</label>
                <input type="text" name="category" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                <input type="text" name="tags" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Cooking Time</label>
                <input type="text" name="time" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Difficulty Level</label>
                <select name="level" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="easy">Easy</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Recipe Summary</label>
                <textarea name="summary" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
            </div>
        </div>
    `;
    form.innerHTML = basicInfo;

    // Ingredients section
    const ingredientsSection = document.createElement('div');
    ingredientsSection.classList.add('space-y-4', 'mt-6');

    const ingredientsTitle = document.createElement('h3');
    ingredientsTitle.textContent = 'Ingredients';
    ingredientsTitle.classList.add('text-lg', 'font-medium');

    const itemsField = document.createElement('div');
    itemsField.innerHTML = `
        <label class="block text-sm font-medium text-gray-700">Items (one per line)</label>
        <textarea name="items" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" rows="5"></textarea>
    `;

    const sauceCheckbox = document.createElement('div');
    sauceCheckbox.classList.add('flex', 'items-center', 'mt-4');
    sauceCheckbox.innerHTML = `
        <input type="checkbox" id="hasSauce" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
        <label for="hasSauce" class="ml-2 block text-sm text-gray-900">Include Sauce Instructions</label>
    `;

    const sauceField = document.createElement('div');
    sauceField.classList.add('hidden', 'mt-4');
    sauceField.innerHTML = `
        <label class="block text-sm font-medium text-gray-700">Sauce Ingredients (one per line)</label>
        <textarea name="sauce" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" rows="3"></textarea>
    `;

    sauceCheckbox.querySelector('#hasSauce').addEventListener('change', (e) => {
        sauceField.classList.toggle('hidden', !e.target.checked);
    });

    ingredientsSection.appendChild(ingredientsTitle);
    ingredientsSection.appendChild(itemsField);
    ingredientsSection.appendChild(sauceCheckbox);
    ingredientsSection.appendChild(sauceField);

    // Instructions section
    const instructionsSection = document.createElement('div');
    instructionsSection.classList.add('space-y-4', 'mt-6');

    const instructionsTitle = document.createElement('h3');
    instructionsTitle.textContent = 'Instructions';
    instructionsTitle.classList.add('text-lg', 'font-medium');

    const instructionsList = document.createElement('div');
    instructionsList.classList.add('space-y-2');

    function createInstructionField(step) {
        const field = document.createElement('div');
        field.innerHTML = `
            <label class="block text-sm font-medium text-gray-700">Step ${step}</label>
            <input type="text" name="instruction-${step}" placeholder="Enter step ${step} instructions" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
        `;
        return field;
    }

    // Add initial 3 steps
    for (let i = 1; i <= 3; i++) {
        instructionsList.appendChild(createInstructionField(i));
    }

    const addStepButton = document.createElement('button');
    addStepButton.type = 'button';
    addStepButton.textContent = '+ Add Step';
    addStepButton.classList.add('mt-2', 'text-blue-600', 'hover:text-blue-700', 'text-sm', 'font-medium');
    addStepButton.onclick = () => {
        const nextStep = instructionsList.children.length + 1;
        instructionsList.appendChild(createInstructionField(nextStep));
    };

    instructionsSection.appendChild(instructionsTitle);
    instructionsSection.appendChild(instructionsList);
    instructionsSection.appendChild(addStepButton);

    // Submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Add Recipe';
    submitButton.classList.add('mt-6', 'w-full', 'bg-blue-600', 'text-white', 'py-2', 'px-4', 'rounded-md', 'hover:bg-blue-700', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500', 'focus:ring-offset-2');

    // Form submission handling
    form.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        
        // Convert form data to recipe object
        const recipe = {
            title: formData.get('title'),
            "img-url": formData.get('img-url'),
            category: formData.get('category'),
            tags: formData.get('tags').split(',').map(tag => tag.trim()),
            "recipe-meta": {
                time: formData.get('time'),
                level: formData.get('level')
            },
            "recipe-summary": formData.get('summary'),
            ingredients: {
                items: formData.get('items').split('\n').filter(item => item.trim()),
                sauce: formData.get('sauce') ? formData.get('sauce').split('\n').filter(item => item.trim()) : []
            },
            instructions: Array.from(form.querySelectorAll('input[name^="instruction-"]'))
                .map((input, index) => ({
                    step: index + 1,
                    text: input.value
                }))
        };

        // Send the new recipe to your backend (service)
        const savedRecipe = recipeService.createRecipe(recipe);
        
        if (savedRecipe) {
            // Show success message
            showNotification('Recipe saved successfully!', 'success');
            console.log('New Recipe:', savedRecipe);
            modalOverlay.remove();

        } else {
            showNotification('Error saving recipe. Please try again.', 'error');
        }

    };

    // Helper function to show notifications
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.classList.add(
            'fixed',
            'bottom-4',
            'right-4',
            'p-4',
            'rounded-lg',
            'shadow-lg',
            'text-white',
            type === 'success' ? 'bg-green-500' : 'bg-red-500',
            'transition-opacity',
            'duration-500'
        );
        notification.textContent = message;

        document.body.appendChild(notification);
    }

    // Add keyboard event listener for Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            modalOverlay.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);

    // Add click handler for overlay background
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
        }
    });
    // Assemble form
    form.appendChild(ingredientsSection);
    form.appendChild(instructionsSection);
    form.appendChild(submitButton);
    

    // Assemble modal
    modalContent.appendChild(header);
    modalContent.appendChild(form);

    scrollableContent.appendChild(form);
    modalContent.appendChild(scrollableContent);

    modalOverlay.appendChild(modalContent);

    // Add to document
    document.body.appendChild(modalOverlay);
}