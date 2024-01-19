//recuperer la liste de tous les ingredients
function recoveryListOfAll(recipes){

  let allIngredients = [];
  let allAppliances = [];
  let allTools= [];

  for (let recipe of recipes){
    for ( let ingredient of recipe.ingredients){
      allIngredients.push(ingredient.ingredient);
    }
    for (let ustensil of recipe.ustensils){
      allTools.push(ustensil);
    }
    allAppliances.push(recipe.appliance);
  }
  const filteredArrayIngredients = allIngredients.filter(function(ele, pos) {
   return allIngredients.indexOf(ele) == pos;
  });
  const filteredArrayAppliances = allAppliances.filter(function(ele, pos) {
    return allAppliances.indexOf(ele) == pos;
  });
  const filteredArrayTools = allTools.filter(function(ele, pos) {
    return allTools.indexOf(ele) == pos;
  });


  let filteredArrayOfAllIngredients = filteredArrayIngredients.sort();
  let filteredArrayOfAllAppliances = filteredArrayAppliances.sort();
  let filteredArrayOfAllTools = filteredArrayTools.sort();

  return({
    filteredArrayOfAllIngredients,
    filteredArrayOfAllAppliances,
    filteredArrayOfAllTools
  });

}
