import path from "path";
import fsx from "fs-extra";

// const dataPath = path.join(process.cwd(), "data/recipes.json");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


class recipesRepo {
  constructor() {
    // console.log("Recipe path", dataPath);
  }

  async getRecipes() { // this is using prisma
    const recipes = await prisma.recipe.findMany();
    console.log("** GET all recipes ");
    return recipes;
  }

//   async getRecipe(id) {
//     const recipe = (await this.getRecipes()).find((recipe) => recipe.id == id);
//     console.log("** GET a recipe from ID");
//     return recipe;
//   }

//   async addRecipe(recipe) {
//     console.log("** POST a recipe");
//     const recipes = await this.getRecipes();
//     const newID = Math.max(...recipes.map((rec) => rec.id)) + 1;
//     let newRecipe = null;
//     if (!recipe.id) {
//       // if recipe has id OR its id is empty, change it to the correct id in sequence
//       recipe.id = newID;
//       newRecipe = recipe;
//     } else {
//       // if recipe does not have id defined, make a new one
//       newRecipe = { id: newID, ...recipe };
//     }
//     recipes.push(newRecipe);
//     await fsx.writeJSON(dataPath, recipes);
//     return newRecipe;
//   }

//   async updateRecipe(newRecipe) {
//     console.log("** PUT a recipe");
//     const recipes = await this.getRecipes();
//     console.log("New: ", newRecipe);
//     let index = recipes.findIndex((rec) => rec.id == newRecipe.id);
//     console.log(index);
//     if (index == -1)
//       return {
//         error: `Unable to update as there is No Recipe with id : ${newRecipe.id}`,
//       };

//     recipes[index] = { ...recipes[index], ...newRecipe };
//     await fsx.writeJSON(dataPath, recipes);
//     // get the updated recipe from the json file
//     const updatedRecipe = (await this.getRecipes()).find(
//       (rec) => rec.id == newRecipe.id
//     );
//     return {
//       message: `Recipe with id : ${newRecipe.id} is updated`,
//       updatedRecipe: updatedRecipe,
//     };
//   }

//   async deleteRecipe(id) {
//     console.log("** DELETE a recipe");
//     const recipes = await this.getRecipes();
//     const index = recipes.findIndex((rec) => rec.id == id);
//     if (index == -1) {
//       return { error: `No recipe with id : ${id}` };
//     }
//     recipes.splice(index, 1);
//     await fsx.writeJSON(dataPath, recipes);
//     return { message: `Recipe with id : ${id} deleted` };
//   }
}

export default new recipesRepo();