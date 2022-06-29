const searchBtn = document.getElementById('search-btn');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
searchBtn.addEventListener('click', getMealList);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=23LylswF89pj0okxN3rGrWcKdSlwWUBCbZe3LfnS&query=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = `
                <h2 class = "recipe-log">${data.foods[0].description}</h2>`;
            if (data.foods[0].foodNutrients) {
                data.foods[0].foodNutrients.forEach(foodNutrients => {
                    html += `<div>
                    <h2 class = "recipe-title">${foodNutrients.nutrientName} :${foodNutrients.value} ${foodNutrients.unitName}</h2>
                </div>`;
                });
            }

            mealDetailsContent.innerHTML = html;
            mealDetailsContent.parentElement.classList.add('showRecipe');
        });
}
