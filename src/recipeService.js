import recipesData from '../data/recipes.json';
export class RecipeService {
    constructor() {
        this.STORAGE_KEY = 'recipes';
        this.predefinedRecipes = recipesData.map(recipe => ({
            ...recipe,
            id: recipe.id || `predefined_${this.generateId()}`,
            createdAt: recipe.createdAt || "2025/02/01"
        }));
        this.initializeStorage();
    }

    // Initialize local storage
    initializeStorage() {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
        }
        else {
            console.log('STORAGE_KEY', localStorage.getItem(this.STORAGE_KEY));
        }
    }

    // GET Methods, return all recipes in Array
    getAllRecipes() {
        try {
            const localRecipes = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
            console.log('Local Recipes:', localRecipes);
            return [...this.predefinedRecipes, ...localRecipes];
        } catch (error) {
            console.error('Error getting recipes:', error);
            return [];
        }
    }

    getRecipeById(id) {
        const allRecipes = this.getAllRecipes();
        return allRecipes.find(recipe => recipe.id === id);
    }

    getRecipesByTitle(title) {
        const allRecipes = this.getAllRecipes();
        const searchTerm = title.toLowerCase();
        return allRecipes.filter(recipe => 
            recipe.title.toLowerCase().includes(searchTerm)
        );
    }

    getRecipesByTags(tags) {
        const allRecipes = this.getAllRecipes();
        const searchTags = Array.isArray(tags) ? tags : [tags];
        const normalizedTags = searchTags.map(tag => tag.toLowerCase());

        return allRecipes.filter(recipe => 
            recipe.tags.some(tag => 
                normalizedTags.includes(tag.toLowerCase())
            )
        );
    }

    getRecipesByIngredients(ingredients) {
        const allRecipes = this.getAllRecipes();
        const searchIngredients = Array.isArray(ingredients) ? ingredients : [ingredients];
        const normalizedIngredients = searchIngredients.map(ing => ing.toLowerCase());

        return allRecipes.filter(recipe => {
            const mainIngredientsMatch = recipe.ingredients.items.some(item =>
                normalizedIngredients.some(searchIng => 
                    item.toLowerCase().includes(searchIng)
                )
            );

            const sauceIngredientsMatch = recipe.ingredients.sauce ? 
                recipe.ingredients.sauce.some(item =>
                    normalizedIngredients.some(searchIng => 
                        item.toLowerCase().includes(searchIng)
                    )
                ) : false;

            return mainIngredientsMatch || sauceIngredientsMatch;
        });
    }

    // searchRecipes({ title, tags, ingredients, category }) {
    //     let results = this.getAllRecipes();

    //     if (title) {
    //         results = results.filter(recipe => 
    //             recipe.title.toLowerCase().includes(title.toLowerCase())
    //         );
    //     }

    //     if (tags) {
    //         const searchTags = Array.isArray(tags) ? tags : [tags];
    //         results = results.filter(recipe =>
    //             recipe.tags.some(tag => 
    //                 searchTags.some(searchTag => 
    //                     tag.toLowerCase().includes(searchTag.toLowerCase())
    //                 )
    //             )
    //         );
    //     }

    //     if (ingredients) {
    //         const searchIngredients = Array.isArray(ingredients) ? ingredients : [ingredients];
    //         results = results.filter(recipe => {
    //             const allIngredients = [
    //                 ...recipe.ingredients.items,
    //                 ...(recipe.ingredients.sauce || [])
    //             ];
    //             return searchIngredients.some(searchIng =>
    //                 allIngredients.some(ing =>
    //                     ing.toLowerCase().includes(searchIng.toLowerCase())
    //                 )
    //             );
    //         });
    //     }

    //     if (category) {
    //         results = results.filter(recipe =>
    //             recipe.category.toLowerCase().includes(category.toLowerCase())
    //         );
    //     }

    //     return results;
    // }

    getRecentRecipes(limit=6) {
        console.log('Recent Recipes:', this.getAllRecipes().length);
        return this.getAllRecipes()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, limit);
    }

    getRecipesByDifficulty(level) {
        return this.getAllRecipes()
            .filter(recipe => recipe.meta.level.toLowerCase() === level.toLowerCase());
    }

    getRecipesByCookingTime(maxMinutes) {
        return this.getAllRecipes()
            .filter(recipe => {
                const timeStr = recipe.meta.time;
                const minutes = parseInt(timeStr);
                return minutes <= maxMinutes;
            });
    }

    // POST Method
    createRecipe(recipe) {
        try {
            const localRecipes = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
            const newRecipe = {
                ...recipe,
                id: this.generateId(),
                createdAt: new Date().toISOString(),
            };
            localRecipes.push(newRecipe);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(localRecipes));
            return newRecipe;
        } catch (error) {
            console.error('Error creating recipe:', error);
            return null;
        }
    }

    // PUT Method with selected ID
    updateRecipe(id, updates) {
        try {
            const localRecipes = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
            const index = localRecipes.findIndex(recipe => recipe.id === id);
            
            if (index === -1) return null;
            
            const updatedRecipe = { ...localRecipes[index], ...updates };
            localRecipes[index] = updatedRecipe;
            
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(localRecipes));
            return updatedRecipe;
        } catch (error) {
            console.error('Error updating recipe:', error);
            return null;
        }
    }

    // DELETE Method by selected ID
    deleteRecipe(id) {
        try {
            const localRecipes = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
            const updatedRecipes = localRecipes.filter(recipe => recipe.id !== id);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedRecipes));
            console.log('After deleting, the rest of Recipes:', localStorage.getItem(this.STORAGE_KEY));
            return true;
        } catch (error) {
            console.error('Error deleting recipe:', error);
            return false;
        }
    }

    // Random Recipe Generator
    randomGenerator() {
        const allRecipes = this.getAllRecipes();
        if (allRecipes.length === 0) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * allRecipes.length);
        return allRecipes[randomIndex];
    }

    // Method to generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

export default RecipeService;