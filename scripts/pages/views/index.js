function displayListRecipes(recipes){
  let html= "";
  for (let recipe of recipes) {

    html += `
      <div>
        <article>
          <img src="assets/images/${recipe.image}" alt="Photo de la recette" class="recipePhoto">
          <h2> ${recipe.name}</h2>
          <h3> Recettes </h3>
          <p> ${recipe.description} </p>
          <h3> Ingredients </h3>

        </article>
      </div>
    `
  }

  let htmlSection = document.querySelector(".recipesCards")
  htmlSection.innerHTML = html
}

function ingredientsListByRecipe(recipes){
  for (let recipe of recipes){
    console.log(recipe.ingredients)
  }
}
