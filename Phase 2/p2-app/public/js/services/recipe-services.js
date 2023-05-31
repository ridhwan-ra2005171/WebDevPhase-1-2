// replace this with your own url that reads data from the data/recipes.json file
// const BASE_URL = 'https://gist.githubusercontent.com/abdalabaaji/8ac1f0ff9c9e919c72c5f297a9b5266e/raw/a67887ba7445a6887be4c748fcfa0931f0dd165c/recipes'
const API_URL = "/api/recipes";

export async function getRecipes(region) {
    let response = [];
    if (region === undefined || region === null || !region) {
        response = await  fetch(API_URL)
    } else {
         response = await  fetch(`${API_URL}?region=${region}`)
    }
    const recipes = await response.json() 
    return recipes;
}

export async function getRecipe(id) {
    const response = await  fetch(`${API_URL}/${id}`)
    const recipe = await response.json() 
    return recipe;
}

export async function addRecipe(recipe) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe) 
    })
    return await response.json()
}

export async function updateRecipe(id, updatedRecipe) {
    console.log("UPD: ",`${API_URL}/${id}`);
    const response = await  fetch(`${API_URL}/${id}`
    , {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRecipe)
    })
    return await response.json()
}

export async function deleteRecipe(id) {
    const response = await fetch(`${API_URL}/${id}`,{
        method: 'DELETE'
    })
    return await response.json()
}