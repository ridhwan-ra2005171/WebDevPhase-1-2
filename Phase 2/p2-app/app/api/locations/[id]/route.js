import locationRepo from "../location-repo";


export async function GET(request, { params }) {
    try {
        const { id } = params
        //remove parseInt once it has been changed
        const location = await locationRepo.getLocation(id);
        return Response.json(location, { status: 200 });
    } catch (e) {
        console.log(e);
        return Response.json({ error: "There was an internal error" }, { status: 500 });
    }
}
