// First, import the recipes data
import recipes from '../data/recipes.json';

export function loadHome() {
    const content = document.getElementById('welcome-content');
    
    // Create elements
    const headline = document.createElement('h1');
    headline.textContent = "Today's Recommendation";
    headline.classList.add("text-3xl", "font-bold", "text-center", "mt-4");
    
    const text = document.createElement('p');
    text.textContent = "Discover delicious and healthy recipes to inspire your cooking. Our curated collection will help you create nutritious meals effortlessly.";
    text.classList.add("text-lg", "text-center", "mt-2", "px-4");
    
    const image = document.createElement('img');
    image.src = "";
    image.alt = "Spin Recipes";
    image.classList.add("mx-auto", "mt-4", "rounded-lg", "w-3/4", "shadow-lg", "width-40");
    
    // Create a outer container for carousel and recipe details
    const carouselAndRecipeContainer = document.createElement('div');
    carouselAndRecipeContainer.classList.add(
        "flex",
        "flex-col",
        "md:flex-row",
        "gap-6",
        "mt-6",
        "px-4",
        "w-full",
        "max-w-7xl",
        "mx-auto"
    );

    // Carousel container
    const carouselDiv = document.createElement('div');
    carouselDiv.classList.add(
        "carousel-div",
        "relative",
        "w-full",
        "md:w-1/2",
        "overflow-hidden",
        "h-96"
    );
    // Create the carousel images HTML from recipe images (carousel-item)
    const carouselImagesHTML = recipes.map((recipe, index) => `
    <img src="${recipe['img-url']}" 
         alt="${recipe.title}" 
         class="carousel-item w-full h-full object-cover"
         data-index="${index}"
    >
    `).join('');
    

    
    carouselDiv.innerHTML = `
    <div class="carousel-images flex transition-transform duration-500">
        ${carouselImagesHTML}
    </div>
    <button class="prev absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-r" onclick="moveImage(-1)">&#10094;</button>
    <button class="next absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-l" onclick="moveImage(1)">&#10095;</button>
    `;

    // Recipe details section (right side)
    const recipeDetails = document.createElement('div');
    recipeDetails.classList.add(
        "w-full",
        "md:w-1/2",
        "bg-white",
        "rounded-lg",
        "shadow-md",
        "p-6"
    );

    // Function to update recipe details
    function updateRecipeDetails(index) {
        const recipe = recipes[index];
        recipeDetails.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">${recipe.title}</h2>
        <p class="text-gray-600 mb-4">${recipe["recipe-summary"]}</p>
        
        <div class="mb-4">
            <div class="flex items-center gap-4 mb-2">
                <span>🕒 ${recipe["recipe-meta"].time}</span>
                <span>👩🏼‍🍳 Difficulty: ${recipe["recipe-meta"].level}</span>
            </div>
            <div class="flex flex-wrap gap-2">
                ${recipe.tags.map(tag => `
                    <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                        ${tag}
                    </span>
                `).join('')}
            </div>
        </div>
        
       
    `;
    }

    // Initialize with first recipe
    updateRecipeDetails(0);

    let index = 0;
    function showImage() {
    const totalSlides = document.querySelectorAll('.carousel-item').length;

    index = (index + 1) % totalSlides; // Loop back to the first slide after the last one
    document.querySelector('.carousel-images').style.transform = `translateX(-${index * 100}%)`;
    updateRecipeDetails(index);
    }

    // Auto-slide every 3 seconds
    setInterval(showImage, 5000);

    // Update moveImage function to also update recipe details
    window.moveImage = function (direction) {
        const totalSlides = document.querySelectorAll('.carousel-item').length;

        index += direction;
        if (index < 0) {
        index = totalSlides - 1;
        } else if (index >= totalSlides) {
        index = 0;
        }

        document.querySelector('.carousel-images').style.transform = `translateX(-${index * 100}%)`;
        updateRecipeDetails(index);
    };

    // Append carousel and recipe details to container
    carouselAndRecipeContainer.appendChild(carouselDiv);
    carouselAndRecipeContainer.appendChild(recipeDetails);

    // Append the container to content
    content.appendChild(headline);
    content.appendChild(text);
    content.appendChild(carouselAndRecipeContainer);

}