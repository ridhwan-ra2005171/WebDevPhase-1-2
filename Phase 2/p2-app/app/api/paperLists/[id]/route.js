// import locationRepo from "../location-repo";
import paperListRepo from "../paperList-repo";



export async function GET(request, { params }) {
    try {
        const { id } = params
        //remove parseInt once it has been changed
        const paper = await paperListRepo.getPaper(id);
        return Response.json(paper, { status: 200 });
    } catch (e) {
        console.log(e);
        return Response.json({ error: "There was an internal error" }, { status: 500 });
    }
}
