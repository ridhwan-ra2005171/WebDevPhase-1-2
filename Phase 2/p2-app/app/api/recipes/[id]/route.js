import recipesRepo from "../recipe-repo.js";

export async function GET(request, { params }) {
    try {
        const { id } = params
        const response = await recipesRepo.getRecipe(id)
        return Response.json(response, { status: 200 })
    } catch (e) {
        console.log(e);
        return Response.json({ error: 'There was an internal error' }, { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params
        const response = await recipesRepo.deleteRecipe(id)
        return Response.json(response, { status: 200 })
    } catch (e) {
        console.log(e);
        return Response.json({ error: 'There was an internal error' }, { status: 500 })
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = params
        const newRecipe = await request.json()
        const response = await recipesRepo.updateRecipe(newRecipe)
        return Response.json(response, { status: 200 })
    } catch (e) {
        console.log(e);
        return Response.json({ error: 'There was an internal error' }, { status: 500 })
    }
}