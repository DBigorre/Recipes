function displayListRecipes(recipes){
  let html= "";
  let recette ="";

  for (let recipe of recipes) {
    recette = recipe
    html += `
      <div>
        <article>
          <img src="assets/images/${recipe.image}" alt="Photo de la recette" class="recipePhoto">
          <h2> ${recipe.name}</h2>
          <h3> Recettes </h3>
          <p> ${recipe.description} </p>
          <h3> Ingredients </h3>
          <div class="recipesCardsIngredient" id="${recipe.name}">
          </div>
        </article>
      </div>
    `
    catchIngredients(recette);
  }
  let htmlSection = document.querySelector(".recipesCardsHeader")
  htmlSection.innerHTML = html
}

function ingredientsListByRecipe(listOfIngredients, recette){
  let ingredientsHtml = "";

  for (let components of listOfIngredients){
      ingredientsHtml += `
        <ul>
          <li> ${components.ingredient} </li>
        </ul>
      `
    }
  let htmlIngredients = document.getElementById(recette.name)
  htmlIngredients.innerHTML = ingredientsHtml
}
