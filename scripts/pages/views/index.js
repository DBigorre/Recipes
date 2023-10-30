function displayListRecipes(recipes){
  let html= "";

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
      <ul>
        <li class="ingredientDeLaListe"> ${i} </li>
      </ul>
    `
  };
  listOfFilterIngredients.innerHTML = ingredientsListHtml

  for (let i of filteredArrayOfAllAppliances){
    deviceListHtml += `
      <ul>
        <li class="deviceDeLaListe"> ${i} </li>
      </ul>
    `
  };
  listOfFilterDevice.innerHTML = deviceListHtml
  for (let i of filteredArrayOfAllTools){
    toolsListHtml += `
      <ul>
        <li> ${i} </li>
      </ul>
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
}

//fonction recheche dans input list of ingredient
function listenOfIngredientsInput(){
  let input = document.getElementById("searchIngredients");
  let userWordArray = [];
  let userWord = ""

  input.addEventListener("keypress", function (event){
      userWordArray.push(event.key)
      userWord = userWordArray.join("")
      // fonction de tri qui renvoie uniquement les bons ingredients
      trierIngredientsInList(userWord)
  })
  /*input.addEventListener("keydown", function(event){
    if (event.key == "Backspace") {
      userWordArray.pop()
      trierIngredientsInList(userWord)
    }
  })*/
}

function trierIngredientsInList(userWord) {
  let ingredients = document.querySelectorAll(".ingredientDeLaListe")
  let ingredientArrayFilteredWithUserWord = [];

  for (let ingredient of ingredients){
    let nameOfIngredient = ingredient.textContent
    if(nameOfIngredient.includes(userWord)){
      ingredientArrayFilteredWithUserWord.push(nameOfIngredient)
    }
  }
  afficherLaListeDesIngredientsFilteeAvecLeUserWord(ingredientArrayFilteredWithUserWord)
}

function afficherLaListeDesIngredientsFilteeAvecLeUserWord(ingredientArrayFilteredWithUserWord){
  let listOfFilterIngredients = document.getElementById("ingredientsList");
  let ingredientsListHtml = "";

  for (let i of ingredientArrayFilteredWithUserWord){
    ingredientsListHtml += `
      <ul>
        <li class="ingredientDeLaListe"> ${i} </li>
      </ul>
    `
  };
  listOfFilterIngredients.innerHTML = ingredientsListHtml
};

//fonction recherche dans input liste des devices
function listenOfDeviceInput(){
  let input = document.getElementById("searchDevices");
  let userWordArray = [];
  let userWord = ""

  input.addEventListener("keypress", function (event){
    userWordArray.push(event.key)
    userWord = userWordArray.join("")

    trierDevicesInList(userWord)
  })
  /*input.addEventListener("keydown", function(event){
    if (event.key == "Backspace") {
      userWordArray.pop()
      trierDevicesInList(userWord)
    }
  })*/
}

function trierDevicesInList(userWord) {
  let devices = document.querySelectorAll(".deviceDeLaListe")
  let deviceArrayFilteredWithUserWord = [];

  for (let device of devices){
    let nameOfDevice = device.textContent
    if(nameOfDevice.includes(userWord)){
      deviceArrayFilteredWithUserWord.push(nameOfDevice)
    }
  }
  afficherLaListeDesDevicesFiltreeAvecLeUserWord(deviceArrayFilteredWithUserWord)
}

function afficherLaListeDesDevicesFiltreeAvecLeUserWord(deviceArrayFilteredWithUserWord){
  let listOfFilterDevice = document.getElementById("deviceList");
  let deviceListHtml = "";

  for (let i of deviceArrayFilteredWithUserWord){
    deviceListHtml += `
      <ul>
        <li class="deviceDeLaListe"> ${i} </li>
      </ul>
    `
  };
  listOfFilterDevice.innerHTML = deviceListHtml
};



//fonction recherche dans input liste des tools

// problemes:
// bouton suppr
// tableau vide bug
