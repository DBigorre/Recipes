async function init() {
  // Récupère les datas
  const model = new Model();
  const datas = await  model.getDatas();
  const recipes = await datas.recipes

  displayListRecipes(recipes);
  ingredientsListByRecipe(recipes);
};
