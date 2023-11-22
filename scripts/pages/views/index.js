let arrayOfUserIngredientSelection = [];
let arrayOfUserDeviceSelection = [];
let arrayOfUserToolSelection = [];
// variable globale, liste des recettes que la vue est en train d'afficher
let listRecipes = null;

function initIndex(recipes){
  listRecipes = recipes
}

function displayListRecipes(recipes){
  let html= "";
  //listRecipes = recipes;


  for (let recipe of recipes) {
    let htmlIngredients = getHtmlIngredientsForCard(recipe);

    html += `
      <div>
        <article class="recipes">
          <img src="assets/images/${recipe.image}" alt="Photo de la recette" class="recipePhoto">
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
          <li> ${components.ingredient} </li>
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
  };
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
};

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

  let ingredientList = document.getElementById("ingredientsList")
  let ingredientSearch = document.getElementById("searchIngredients")
  ingredientList.style.display = "block"
  ingredientSearch.style.display = "block"
  if (ingredientList.classList.contains("open")){
    ingredientList.style.display = "none"
    ingredientSearch.style.display = "none"
    ingredientList.classList.remove("open")
  } else{
    ingredientList.classList.add("open")
  }
  listenOfIngredientsInput();
}

function displayDevicesList(){
  let deviceList = document.getElementById("deviceList")
  let deviceSearch = document.getElementById("searchDevices")
  deviceList.style.display = "block"
  deviceSearch.style.display = "block"
  if (deviceList.classList.contains("open")){
    deviceList.style.display = "none"
    deviceSearch.style.display = "none"
    deviceList.classList.remove("open")
  } else {
    deviceList.classList.add("open")
  }
  listenOfDeviceInput()
}

function displayToolsList() {
  let toolsList = document.getElementById("toolsList")
  let toolSearch = document.getElementById("searchTools")
  toolsList.style.display = "block"
  toolSearch.style.display = "block"
  if (toolsList.classList.contains("open")){
    toolsList.style.display = "none"
    toolSearch.style.display = "none"
    toolsList.classList.remove("open")
  } else {
    toolsList.classList.add("open")
  }
  listenOfToolInput()
}

//fonction recheche dans input list of ingredient
function listenOfIngredientsInput(){
  let input = document.getElementById("searchIngredients");
  let userWord = ""

  input.addEventListener("keyup", function (event){
      userWord = event.target.value
      console.log(userWord)
      // fonction de tri qui renvoie uniquement les bons ingredients
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
  let listOfDevices = document.querySelectorAll(".deviceDeLaListe");
  let listOfTools = document.querySelectorAll(".toolDeLaListe");

  for(let ingredient of listOfIngredients){
    ingredient.addEventListener("click", function(event){
      arrayOfUserIngredientSelection.push(ingredient.textContent)
      displayFiltersActifs(arrayOfUserIngredientSelection, arrayOfUserDeviceSelection, arrayOfUserToolSelection)
    })
  }
  for(let device of listOfDevices){
    device.addEventListener("click", function(event){
      arrayOfUserDeviceSelection.push(device.textContent)
      displayFiltersActifs(arrayOfUserIngredientSelection, arrayOfUserDeviceSelection, arrayOfUserToolSelection)
    })
  }
  for(let tool of listOfTools){
    tool.addEventListener("click", function(event){
      arrayOfUserToolSelection.push(tool.textContent)
      displayFiltersActifs(arrayOfUserIngredientSelection, arrayOfUserDeviceSelection, arrayOfUserToolSelection)
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
  maman();
}

function maman(){
  let filteredRecipes
  filteredRecipes = stockRecipesWithFiltersIngredient(arrayOfUserIngredientSelection, arrayOfUserDeviceSelection, arrayOfUserToolSelection)
  filteredRecipes = stockRecipesWithFiltersDevice(filteredRecipes, arrayOfUserDeviceSelection, arrayOfUserToolSelection)
  filteredRecipes = stockRecipesWithFiltersTools(filteredRecipes, arrayOfUserToolSelection)

  displayListRecipes(filteredRecipes)


}

// fonction de suppression des filtres si clic sur la croix
function removeFiltersActifs(){ // trouver un moyen de faire en sorte que le clic supprime l'element du tableau des choix de l'utilisateur
  let filtersActif = document.querySelectorAll(".yellowFilter:not(.hide)");

  for(let filterActif of filtersActif){
    let filterActifClose = filterActif.querySelector(".fa-xmark")
    filterActifClose.addEventListener("click", function(event) {
      filterActif.classList.add("hide")

      arrayOfUserIngredientSelection = arrayOfUserIngredientSelection.filter(item => item !== filterActif.textContent);
      console.log(arrayOfUserIngredientSelection)
      arrayOfUserDeviceSelection = arrayOfUserDeviceSelection.filter(item => item !== filterActif.textContent);
      arrayOfUserToolSelection = arrayOfUserToolSelection.filter(item => item !== filterActif.textContent);
      maman()
    })
  }
}

// fonction pour le triage des recettes
function stockRecipesWithFiltersIngredient(arrayOfUserIngredientSelection, arrayOfUserDeviceSelection, arrayOfUserToolSelection){
  // faire un tamis different pour chaque fonction
  // 1 pour ingredient
  // recuperer le tableau depuis le controller
  let recipes = [...listRecipes]
  let recipesFilteredWithIngredient = []

  // iterer sur toutes les recettes
  recipes.forEach((recipe) => {
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
function stockRecipesWithFiltersDevice(recipesFilteredWithIngredient, arrayOfUserDeviceSelection, arrayOfUserToolSelection){
  // recuperer le tableau depuis la fonction precedente
  let recipes = recipesFilteredWithIngredient;
  let arrayOfUserDeviceSelectionTrimmed = arrayOfUserDeviceSelection.map(device => device.trim());

  if (recipesFilteredWithIngredient.length === 0) {
    recipes = listRecipes;
  }
  let recipesFilteredWithDevice = []


  // iterer sur toutes les recettes
  recipes.forEach((recipe) => {
    let recipeDevice = recipe.appliance;

    // verifier que le seul appareil de cuisson soit present dans les filtres selctionnés par le user
    let deviceIncluded = arrayOfUserDeviceSelectionTrimmed.includes(recipeDevice.trim());

    // si c'est le cas les mettre dans un nouveau tableau
    if (deviceIncluded) {
      recipesFilteredWithDevice.push(recipe);
    }
    if(recipesFilteredWithDevice.length === 0){
      recipesFilteredWithDevice = recipesFilteredWithIngredient
    }
  });
  // aller vers la fonction pour les filtres tools
  return recipesFilteredWithDevice
};

  // 1 pour tool
function stockRecipesWithFiltersTools(recipesFilteredWithDevice, arrayOfUserToolSelection){
  let recipes = recipesFilteredWithDevice;

  if (recipesFilteredWithDevice.length === 0) {
    recipes = listRecipes;
  }

  let recipesFilteredWithTools = []

  // iterer sur toutes les recettes
  recipes.forEach((recipe) => {
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
  // relancer l'affichage des recettes
    return recipesFilteredWithTools
}

// grosse fonction des filtres
function grosseFonctionDesFiltresEcoute(){
// déclarer les variables utiles
  let bigInput = document.getElementById("searchInput");
  let userWord = "";
  let arrayOfUserSelectionBigInput = [];
  let searchButton = document.querySelector(".fa-magnifying-glass")

  // faire une écoute dans le input
  bigInput.addEventListener("keyup", function (event){
    // selectionner la rentrée User
    userWord = event.target.value
  });
  searchButton.addEventListener("click", function (event){
    arrayOfUserSelectionBigInput.push(userWord)
    grosseFonctionDesFiltresTraitement(arrayOfUserSelectionBigInput)
  });
  // le stocker dans un tableau

  // Ecouter la loupe ou le enter
  // le refaire passer dans les trois filtres tamis
}

function grosseFonctionDesFiltresTraitement(arrayOfUserSelectionBigInput) {

  //maman()
  return arrayOfUserSelectionBigInput
}



// problemes:
// pas de mise a jour du array quand suppression des filtres

//a faire:
// css ++
// suppression des filtres
// que faire si pas de recette? (question a poser à David)

// fonction grosse qui itere avec include sur la description et le titre en plus des ingredients
