import paperRepo from "../../paper-repo";

//to get all users
export async function GET(request) {
    try {
        const {reviewerID} = request;
        console.log("RVWR ID: ",reviewerID); 
        const data = await paperRepo.getPapersOfReviewer();
    
        return Response.json( data, { status: 200 })
    } catch (e) {
        console.log(e);
        return Response.json(request,{ error: 'There was an internal error' }, { status: 500 })
    }
}