async function init() {
  // Récupère les datas
  const model = new Model();
  const datas = await  model.getDatas();
  const recipes = await datas.recipes

  displayListRecipes(recipes);
};

async function catchIngredients(recette){
  const model = new Model();
  const datas = await  model.getDatas();
  //let array = [];
  let listOfIngredients = recette.ingredients;

  /*for( let ingredient of listOfIngredients){
    array.push(ingredient)
  }*/
  ingredientsListByRecipe(listOfIngredients, recette);
};
