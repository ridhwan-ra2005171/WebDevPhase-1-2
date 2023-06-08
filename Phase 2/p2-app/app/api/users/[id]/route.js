import userRepo from "./user-repo";

//to get all users
export async function GET(request, {params}) {
    try {
        const {id} = params;
        let users = await userRepo.getOneUser(id)
    
        return Response.json(users, { status: 200 })
    } catch (e) {
        console.log(e);
        return Response.json({ error: 'There was an internal error' }, { status: 500 })
    }
}