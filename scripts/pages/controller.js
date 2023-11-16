async function init() {
  // Récupère les datas
  const model = new Model();
  const datas = await  model.getDatas();
  const recipes = await datas.recipes

  displayListRecipes(recipes);
  displaySelectList(recipes);
  listenAndStockIngredients() 
};

function displaySelectList(recipes){

  let allList = recoveryListOfAll(recipes);
  fillListOfFilters(allList.filteredArrayOfAllIngredients, allList.filteredArrayOfAllAppliances, allList.filteredArrayOfAllTools);
  listenerForFilters();
  stockerEtCacherLesFiltresActifs(allList.filteredArrayOfAllIngredients, allList.filteredArrayOfAllAppliances, allList.filteredArrayOfAllTools)
};
