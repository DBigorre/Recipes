let arrayOfUserIngredientSelection = [];
let arrayOfUserDeviceSelection = [];
let arrayOfUserToolSelection = [];
// variable globale, liste des recettes que la vue est en train d'afficher
let listRecipes = null;

function displayListRecipes(recipes){
  let html= "";
  listRecipes = recipes;

  for (let recipe of recipes) {
    let htmlIngredients = getHtmlIngredientsForCard(recipe);

    html += `
      <div>
        <article>
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
  //let htmlIngredients = document.getElementById(recette.name)
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
  listenOfIngredientsInput()
  listenAndStockIngredients()
}

function displayDevicesList(){
  let deviceList = document.getElementById("deviceList")
  let deviceSearch = document.getElementById("searchDevices")
  deviceList.style.display = "block"
  deviceSearch.style.display = "block"
  listenOfDeviceInput()
}
function displayToolsList() {
  let toolsList = document.getElementById("toolsList")
  let toolSearch = document.getElementById("searchTools")
  toolsList.style.display = "block"
  toolSearch.style.display = "block"
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

  input.addEventListener("keypress", function (event){
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
  //displayFiltersActifs(arrayOfUserIngredientSelection)

}

/*function displayFiltersActifs(arrayOfUserIngredientSelection, arrayOfUserDeviceSelection, arrayOfUserToolSelection){
  let filtersForYellowDisplay = document.querySelector(".filtersActifs")
  let yellowsFiltersHtml = "";
  for (let i of arrayOfUserIngredientSelection){
    yellowsFiltersHtml += `
    <button class="yellowFilter"> ${i} <i class="fa-solid fa-xmark"></i></button>
    `
  }
  for (let i of arrayOfUserDeviceSelection){
    yellowsFiltersHtml += `
    <button class="yellowFilter"> ${i} <i class="fa-solid fa-xmark"></i></button>
    `
  }
  for (let i of arrayOfUserToolSelection){
    yellowsFiltersHtml += `
    <button class="yellowFilter"> ${i} <i class="fa-solid fa-xmark"></i></button>
    `
  }
  filtersForYellowDisplay.innerHTML = yellowsFiltersHtml
  removeFiltersActifs()
}*/

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
  let filtersForYellowDisplay = document.querySelectorAll(".filtersActifs")
  let filtersHide = document.querySelectorAll(".yellowFilter")
  let yellowsFiltersHtml = "";

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

  filtersForYellowDisplay.innerHTML = yellowsFiltersHtml
  removeFiltersActifs()



  /*for (let i of arrayOfUserDeviceSelection){
    yellowsFiltersHtml += `
    <button class="yellowFilter"> ${i} <i class="fa-solid fa-xmark"></i></button>
    `
  }
  for (let i of arrayOfUserToolSelection){
    yellowsFiltersHtml += `
    <button class="yellowFilter"> ${i} <i class="fa-solid fa-xmark"></i></button>
    `
  }*/
}

// fonction de suppression des filtres si clic sur la croix
function removeFiltersActifs(){
  let filtersActif = document.querySelectorAll(".yellowFilter");

  /*for(let filterActif of filtersActif){
    if (!filterActif.classList.contains("hide")){
      filterActif.addEventListener("click", function(event) {
        console.log(filterActif)
        filterActif.classList.add("hide")
      })
    }
  }

  for(let filterActif of filtersActif){
    let filterActifClose = filterActif.querySelector(".fa-xmark")
    filterActifClose.addEventListener("click", function(event) {
      console.log(filterActif)
      filterActif.classList.add("hide")
    })
  }*/
  //let filterActifClose = document.querySelectorAll(".fa-xmark");
  //for (let filterActif of filtersActif){
    //console.log(filterActif)
    //filterActifClose.addEventListener("click", function(event) {
      //filterActif.classList.add("hide")
    //})
  //}
}

// fonction pour le triage des recettes
// grosse fonction des filtres




// problemes:
//lorsque je reselectionne un filtre après une suppression, tous les filtres supprimés reviennent


//a faire:
// refermer la liste (rajouter un classe open a l'ouverture et si reclick alors que la liste est ouverte faire un display none)
// supprimer la possibilité de douclons dans les filtres
