import recipesRepo from "./recipe-repo.js";

export async function GET(request) {
    try {
        console.log("**** I HAVE BEEN CALLED, app/api/recipes/route.js");

        const { searchParams } = new URL(request.url)
        const region = searchParams.get('region')
        
        let recipes = await recipesRepo.getRecipes(region)
        console.log("REGL ",region);

        if (region) {
           recipes = recipes.filter(rec => (rec.region).toLocaleLowerCase() == region.toLocaleLowerCase())
        }
        return Response.json(recipes, { status: 200 })
    } catch (e) {
        console.log(e);
        return Response.json({ error: 'There was an internal error' }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const newRecipe = await request.json()
        const response = await recipesRepo.addRecipe(newRecipe)         
        return Response.json(response, { status: 200 })
    } catch (e) {
        console.log(e);
        return Response.json({ error: 'There was an internal error' }, { status: 500 })
    }
}