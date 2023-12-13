let arrayOfUserIngredientSelection = [];
let arrayOfUserApplianceSelection = [];
let arrayOfUserToolSelection = [];
let searchText = "";
// variable globale, liste des recettes que la vue est en train d'afficher
let listRecipes = null;

function initIndex(recipes){
  listRecipes = recipes
}

function displayListRecipes(recipes){
  let html= "";
  let errorSection = document.querySelector(".errorMessage")

  if (recipes.length == 0){

    html +=`
        <h2> Nous sommes désolés, aucune recette ne correspond aux filtres sélectionnés... </h2>
    `
    errorSection.innerHTML = html
  } else {
    errorSection.innerHTML = "";
  }
  html = "";
  for (let recipe of recipes) {
    let htmlIngredients = getHtmlIngredientsForCard(recipe);

    html += `
      <div>
        <article class="recipes">
          <img src="assets/images/${recipe.image}" alt="Photo de la recette" class="recipePhoto">
          <p class="recipeTimeTag"> ${recipe.time}min </p>
          <div class="recipeCardInfo">
            <h2> ${recipe.name}</h2>
            <h3> Recettes </h3>
            <p> ${recipe.description} </p>
            <h3> Ingredients </h3>
            <div class="recipesCardsIngredient" id="${recipe.name}">
            ${htmlIngredients}
            </div>
          </div>
        </article>
      </div>
    `
  }

  let htmlSection = document.querySelector(".recipesCardsHeader")
  htmlSection.innerHTML = html
}

function getHtmlIngredientsForCard(recette){
  let ingredientsHtml = "";
  let listOfIngredients = recette.ingredients;

  for (let components of listOfIngredients){
    if(components.unit == undefined){
      components.unit = " "
    };
    if(components.quantity == undefined){
      components.quantity = " "
    };
      ingredientsHtml += `
        <ul>
          <li class="componentsIngredient"> ${components.ingredient} </li>
          <li class="componentsQuantity"> ${components.quantity} ${components.unit}</li>
        </ul>
      `
    }
  return ingredientsHtml
}

// filter
function fillListOfFilters(filteredArrayOfAllIngredients, filteredArrayOfAllAppliances, filteredArrayOfAllTools){
  let listOfFilterIngredients = document.getElementById("ingredientsList");
  let listOfFilterDevice = document.getElementById("deviceList");
  let listOfFilterTools = document.getElementById("toolsList");

  let ingredientsListHtml = "";
  let deviceListHtml = "";
  let toolsListHtml = "";

  for (let i of filteredArrayOfAllIngredients){
    ingredientsListHtml += `
        <li class="ingredientDeLaListe"> ${i} </li>
    `
  }
  listOfFilterIngredients.innerHTML = ingredientsListHtml

  for (let i of filteredArrayOfAllAppliances){
    deviceListHtml += `
        <li class="deviceDeLaListe"> ${i} </li>
    `
  };
  listOfFilterDevice.innerHTML = deviceListHtml

  for (let i of filteredArrayOfAllTools){
    toolsListHtml += `
        <li class="toolDeLaListe"> ${i} </li>
    `
  };
  listOfFilterTools.innerHTML = toolsListHtml
  listenAndStockIngredients()
}

function listenerForFilters(){
  let ingredientsButton = document.getElementById("ingredientsfilter")
  let deviceButton = document.getElementById("devicefilter")
  let toolsButton = document.getElementById("toolsfilter")

  ingredientsButton.addEventListener("click", function (event){
    displayIngredientsList()
  });
  deviceButton.addEventListener("click", function (event){
    displayDevicesList()
  });
  toolsButton.addEventListener("click", function (event){
    displayToolsList()
  });

}

function displayIngredientsList(){
  let ingredientBtn = document.getElementById("ingredientsfilter")
  let ingredientList = document.getElementById("ingredientsList")
  let ingredientSearch = document.getElementById("searchIngredients")
  ingredientList.style.display = "block"
  ingredientSearch.style.display = "block"
  if (ingredientList.classList.contains("open")){
    ingredientList.style.display = "none"
    ingredientSearch.style.display = "none"
    ingredientBtn.classList.remove("btnOpen")
    ingredientList.classList.remove("open")
  } else{
    ingredientBtn.classList.add("btnOpen")
    ingredientList.classList.add("open")
  }
  listenOfIngredientsInput();
}

function displayDevicesList(){
  let deviceBtn = document.getElementById("devicefilter")
  let deviceList = document.getElementById("deviceList")
  let deviceSearch = document.getElementById("searchDevices")
  deviceList.style.display = "block"
  deviceSearch.style.display = "block"
  if (deviceList.classList.contains("open")){
    deviceList.style.display = "none"
    deviceSearch.style.display = "none"
    deviceBtn.classList.remove("btnOpen")
    deviceList.classList.remove("open")
  } else {
    deviceBtn.classList.add("btnOpen")
    deviceList.classList.add("open")
  }
  listenOfDeviceInput()
}

function displayToolsList() {
  let toolBtn = document.getElementById("toolsfilter")
  let toolsList = document.getElementById("toolsList")
  let toolSearch = document.getElementById("searchTools")
  toolsList.style.display = "block"
  toolSearch.style.display = "block"
  if (toolsList.classList.contains("open")){
    toolsList.style.display = "none"
    toolSearch.style.display = "none"
    toolBtn.classList.remove("btnOpen")
    toolsList.classList.remove("open")
  } else {
    toolBtn.classList.add("btnOpen")
    toolsList.classList.add("open")
  }
  listenOfToolInput()
}

//fonction recheche dans input list of ingredient
function listenOfIngredientsInput(){
  let input = document.getElementById("searchIngredients");
  let userWord = ""
  let closeInIngredientInput = document.getElementById("closeIngredient")

  input.addEventListener("keyup", function (event){
      userWord = event.target.value
      // fonction de tri qui renvoie uniquement les bons ingredients
      trierIngredientsInList(userWord)
  })
  closeInIngredientInput.addEventListener("click", function(event){
    userWord=""
    trierIngredientsInList(userWord)
  })
}

function trierIngredientsInList(userWord) {
  let ingredients = document.querySelectorAll(".ingredientDeLaListe");

  for (let ingredient of ingredients){
    let nameOfIngredient = ingredient.textContent
    if(nameOfIngredient.includes(userWord)){
      ingredient.classList.remove("hide")
    } else{
      ingredient.classList.add("hide")
    }
  }
}


//fonction recherche dans input liste des devices
function listenOfDeviceInput(){
  let input = document.getElementById("searchDevices");
  let userWord = ""

  input.addEventListener("keyup", function (event){
    userWord = event.target.value

    trierDevicesInList(userWord)
  })
}

function trierDevicesInList(userWord) {
  let devices = document.querySelectorAll(".deviceDeLaListe")

  for (let device of devices){
    let nameOfDevice = device.textContent
    if(nameOfDevice.includes(userWord)){
      device.classList.remove("hide")
    }else{
      device.classList.add("hide")
    }
  }
}

//fonction recherche dans input liste des tools
function listenOfToolInput(){
  let input = document.getElementById("searchTools");
  let userWord = ""

  input.addEventListener("keyup", function (event){
    userWord = event.target.value
    trierToolsInList(userWord)
  })
}

function trierToolsInList(userWord) {
  let tools = document.querySelectorAll(".toolDeLaListe")

  for (let tool of tools){
    let nameOfTool = tool.textContent
    if(nameOfTool.includes(userWord)){
      tool.classList.remove("hide")
    }else{
      tool.classList.add("hide")
    }
  }
}

//Ecoute et stockage des ingredients, devices et tools
function listenAndStockIngredients(){
  let listOfIngredients = document.querySelectorAll(".ingredientDeLaListe");
  let listOfAppliances = document.querySelectorAll(".deviceDeLaListe");
  let listOfTools = document.querySelectorAll(".toolDeLaListe");

  for(let ingredient of listOfIngredients){
    ingredient.addEventListener("click", function(event){
      arrayOfUserIngredientSelection.push(ingredient.textContent)
      displayFiltersActifs(arrayOfUserIngredientSelection, arrayOfUserApplianceSelection, arrayOfUserToolSelection)
      maman();
    })
  }
  for(let appliance of listOfAppliances){
    appliance.addEventListener("click", function(event){
      arrayOfUserApplianceSelection.push(appliance.textContent)
      displayFiltersActifs(arrayOfUserIngredientSelection, arrayOfUserApplianceSelection, arrayOfUserToolSelection)
      maman();
    })
  }
  for(let tool of listOfTools){
    tool.addEventListener("click", function(event){
      arrayOfUserToolSelection.push(tool.textContent)
      displayFiltersActifs(arrayOfUserIngredientSelection, arrayOfUserApplianceSelection, arrayOfUserToolSelection)
      maman();
    })
  }
}

function stockerEtCacherLesFiltresActifs(filteredArrayOfAllIngredients, filteredArrayOfAllAppliances, filteredArrayOfAllTools){
  let filtersForYellowDisplay = document.querySelector(".filtersActifs")
  let yellowsFiltersHtml = "";

  for (let ingredient of filteredArrayOfAllIngredients){
    yellowsFiltersHtml += `
      <button class="yellowFilter hide"> ${ingredient} <i class="fa-solid fa-xmark"></i></button>
    `
  }
  for (let device of filteredArrayOfAllAppliances){
    yellowsFiltersHtml += `
      <button class="yellowFilter hide"> ${device} <i class="fa-solid fa-xmark"></i></button>
    `
  }
  for (let tool of filteredArrayOfAllTools){
    yellowsFiltersHtml += `
      <button class="yellowFilter hide"> ${tool} <i class="fa-solid fa-xmark"></i></button>
    `
  }

  filtersForYellowDisplay.innerHTML = yellowsFiltersHtml
}

function displayFiltersActifs(arrayOfUserIngredientSelection, arrayOfUserDeviceSelection, arrayOfUserToolSelection){
  let filtersHide = document.querySelectorAll(".yellowFilter")

  for(let filter of filtersHide){
    for(let ingredient of arrayOfUserIngredientSelection){
      if(filter.textContent == ingredient){
        filter.classList.remove("hide")
      }
    }
    for(let device of arrayOfUserDeviceSelection){
      if(filter.textContent == device){
        filter.classList.remove("hide")
      }
    }
    for(let tool of arrayOfUserToolSelection){
      if(filter.textContent == tool){
        filter.classList.remove("hide")
      }
    }
  }
  removeFiltersActifs()
}

function maman() {
  let filteredRecipes = [...listRecipes]

  filteredRecipes = filterByIngredients(filteredRecipes, arrayOfUserIngredientSelection)
  filteredRecipes = filterByAppliances(filteredRecipes, arrayOfUserApplianceSelection)
  filteredRecipes = filterByUstensils(filteredRecipes, arrayOfUserToolSelection)
  filteredRecipes = filterBySearchText(filteredRecipes, searchText)

  displayListRecipes(filteredRecipes)
  let allList = recoveryListOfAll(filteredRecipes);
  fillListOfFilters(allList.filteredArrayOfAllIngredients, allList.filteredArrayOfAllAppliances, allList.filteredArrayOfAllTools);
}

function filterBySearchText(filteredRecipes, searchText) {
  let searchResult = []

  for (recipe of filteredRecipes){
    if (recipe.name.includes(searchText) || recipe.description.includes(searchText)){
      searchResult.push(recipe)
    } else {
      for( ingredient of recipe.ingredients){
        if ( ingredient.ingredient.includes(searchText)){
          searchResult.push(recipe)
          break
        }
      }
    }
  }
  return searchResult
}

//deuxieme fonction avec l'input de recherche pour le test
function filterBySearchTextTest(filteredRecipes, searchText) {
  return filteredRecipes.filter(recipe => recipe.name.includes(searchText) || recipe.description.includes(searchText) ||
  recipe.ingredients.some(ingredient => ingredient.ingredient.includes(searchText))
  );
}



// fonction de suppression des filtres si clic sur la croix
function removeFiltersActifs(){
  let filtersActif = document.querySelectorAll(".yellowFilter:not(.hide)");

  for(let filterActif of filtersActif){
    let filterActifClose = filterActif.querySelector(".fa-xmark")
    filterActifClose.addEventListener("click", function(event) {
      filterActif.classList.add("hide")

      arrayOfUserIngredientSelection = arrayOfUserIngredientSelection.filter(item => item !== filterActif.textContent);
      arrayOfUserApplianceSelection = arrayOfUserApplianceSelection.filter(item => item !== filterActif.textContent);
      arrayOfUserToolSelection = arrayOfUserToolSelection.filter(item => item !== filterActif.textContent);
      maman()
    })
  }
}

// fonction pour le triage des recettes
function filterByIngredients(filteredRecipes, arrayOfUserIngredientSelection){
  // faire un tamis different pour chaque fonction
  // 1 pour ingredient
  // recuperer le tableau depuis le controller


  let recipesFilteredWithIngredient = []

  // iterer sur toutes les recettes
  filteredRecipes.forEach((recipe) => {
    let recipeIngredients = recipe.ingredients;

    // utiliser le every pour verifier que tous les elements du array ingredient user sont dans les recettes
    let allIngredientsIncluded = arrayOfUserIngredientSelection.every((userIngredient) =>
      recipeIngredients.some((recipeIngredient) => userIngredient.trim() === recipeIngredient.ingredient.trim())
    );
    // si c'est le cas les mettre dans un nouveau tableau
    if (allIngredientsIncluded) {
      recipesFilteredWithIngredient.push(recipe);
    }
  });
  return recipesFilteredWithIngredient
}

  // 1 pour device
function filterByAppliances(filteredRecipes, arrayOfUserApplianceSelection){
  // recuperer le tableau depuis la fonction precedente
  if (arrayOfUserApplianceSelection.length === 0 ){
    return filteredRecipes
  }

  let arrayOfUserApplianceSelectionTrimmed = arrayOfUserApplianceSelection.map(appliance => appliance.trim());


  let recipesFilteredWithAppliance = []

  // iterer sur toutes les recettes
  filteredRecipes.forEach((recipe) => {
    let recipeAppliance = recipe.appliance;

    // verifier que le seul appareil de cuisson soit present dans les filtres selctionnés par le user
    let applianceIncluded = arrayOfUserApplianceSelectionTrimmed.includes(recipeAppliance.trim());

    // si c'est le cas les mettre dans un nouveau tableau
    if (applianceIncluded) {
      recipesFilteredWithAppliance.push(recipe);
    }
  });

  return recipesFilteredWithAppliance
  // device en appliance renom
};

  // 1 pour tool
function filterByUstensils(filteredRecipes, arrayOfUserToolSelection){
  let recipesFilteredWithTools = []

  // iterer sur toutes les recettes
  filteredRecipes.forEach((recipe) => {
    let recipeTools = recipe.ustensils;


    // utiliser le every pour verifier que tous les elements du array ingredient user sont dans les recettes
    let allToolsIncluded = arrayOfUserToolSelection.every((userTool) =>
    recipeTools.some((recipeTool) => userTool.trim() === recipeTool.trim())
    );

    // si c'est le cas les mettre dans un nouveau tableau
    if (allToolsIncluded) {
      recipesFilteredWithTools.push(recipe);
    }
  });
  return recipesFilteredWithTools
}

/*function resetInputSearch(){
  let closeInIngredientInput = document.getElementById("closeIngredient")
  closeInIngredientInput.addEventListener("click", function(event){
    console.log("a")
  })
}*/

// grosse fonction des filtres
function grosseFonctionDesFiltresEcoute(){
// déclarer les variables utiles
  let bigInput = document.getElementById("searchInput");

  // faire une écoute dans le input
  bigInput.addEventListener("keyup", function (event){
    // selectionner la rentrée User
    searchText = event.target.value.trim()
    if (searchText.length >= 3){
      maman()
    }
  });
}


//a faire:

// rajouter la croix pour remettre à zéro la recherche dans les filtres --fait-- et coder la fonction correspondant --l188--
    //probleme remise à zero de l'input
        //solution: relancer l'affichage de l'input? vider l'input? remplacer les donnees par une chaine vide?
// changer chevron quand liste ouverte --<i class="fa-solid fa-chevron-up"> --en cours html l28--</i>
    // probleme hide non pris en compte dans les class
        //solution: faire une nouvelle class css display none? --ne marche pas--
        //ajouter un id au lieu d'une class?
        // comportements étrange sur id hidden et class hide ??????
// echanger les fonction test pour y mettre la plus rapide
