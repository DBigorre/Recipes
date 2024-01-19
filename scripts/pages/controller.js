import Model from "./model.js";

async function init() {
  // Récupère les datas
  const model = new Model();
  const datas = await  model.getDatas();
  const recipes = await datas.recipes;

  initIndex(recipes);
  displayListRecipes(recipes);
  displaySelectList(recipes);
  listenAndStockIngredients();
  grosseFonctionDesFiltresEcoute();
}

function displaySelectList(recipes){

  let allList = recoveryListOfAll(recipes);
  fillListOfFilters(allList.filteredArrayOfAllIngredients, allList.filteredArrayOfAllAppliances, allList.filteredArrayOfAllTools);
  listenerForFilters();
  stockerEtCacherLesFiltresActifs(allList.filteredArrayOfAllIngredients, allList.filteredArrayOfAllAppliances, allList.filteredArrayOfAllTools);

}

init();
