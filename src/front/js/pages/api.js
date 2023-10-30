export async function fetchCocktails() {
  const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.drinks;
}

export async function fetchCocktailDetails(cocktailId) {
  const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.drinks[0]; // Assuming the API response structure
}

export async function fetchCocktailsByIngredient(ingredient) {
  const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(apiUrl);
  const data = await response.json(); 
  return data.drinks;
}

export async function fetchRandomCocktails(count) {
  const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/randomselection.php?number=${count}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.drinks;
}

export async function fetchIngredientDetails(ingredientId) {
  const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${ingredientId}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.ingredients[0]; // Assuming the API response structure
}



export async function fetchCocktailByName(cocktailname) {
  const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailname}`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  if (data.drinks && data.drinks.length > 0) {
    const cocktail = data.drinks[0];
    return {
      Ingredients: getIngredients(cocktail),
      Instructions: cocktail.strInstructions || 'Instructions not available',
      Image:cocktail.strDrinkThumb || "image not available"   };
  } else {
    return {
      Ingredients: [],
      Instructions: 'Cocktail not found',
      Image: "image not available"
    };
  }
}

 export  function getIngredients(cocktail) {
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;
    if (cocktail[ingredientKey]) {
      ingredients.push({
        ingredient: cocktail[ingredientKey],
        measure: cocktail[measureKey] || 'N/A',
      });
    }
  }
  return ingredients;
}
