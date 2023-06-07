import {getReviewers} from "../app-repo";

//to get all users
export async function GET(request) {
    try {
        // console.log("**** I HAVE BEEN CALLED, app/api/recipes/route.js");
        let users = await getReviewers()
    
        return Response.json(users, { status: 200 })
    } catch (e) {
        console.log(e);
        return Response.json({ error: 'There was an internal error' }, { status: 500 })
    }
}


