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

//recuperer la liste de tous les ingredients
async function recoveryListOfAll(){
  const model = new Model();
  const datas = await model.getDatas();
  const recipes = await datas.recipes;

  let allIngredients = [];
  let allAppliances = [];
  let allTools= [];

  for (let recipe of recipes){
    for ( let ingredient of recipe.ingredients){
      allIngredients.push(ingredient.ingredient)
    }
    for (let ustensil of recipe.ustensils){
      allTools.push(ustensil)
    }
    allAppliances.push(recipe.appliance)
  }
  const filteredArrayIngredients = allIngredients.filter(function(ele, pos) {
   return allIngredients.indexOf(ele) == pos;
  })
  const filteredArrayAppliances = allAppliances.filter(function(ele, pos) {
    return allAppliances.indexOf(ele) == pos;
   })
   const filteredArrayTools = allTools.filter(function(ele, pos) {
    return allTools.indexOf(ele) == pos;
   })


let filteredArrayOfAllIngredients = filteredArrayIngredients.sort();
let filteredArrayOfAllAppliances = filteredArrayAppliances.sort();
let filteredArrayOfAllTools = filteredArrayTools.sort();

fillListOfFilters(filteredArrayOfAllIngredients, filteredArrayOfAllAppliances, filteredArrayOfAllTools)
}
