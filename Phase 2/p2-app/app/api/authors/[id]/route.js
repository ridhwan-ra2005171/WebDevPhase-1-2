import { getAuthor } from '../../app-repo';



//works
export async function GET(request,{params}){
    try {
        const {id} = params
        // const intID
        console.log("test: ",id); 
        // idInt = parseInt(id)
        const paper = await getAuthor(parseInt(id))
        return Response.json(paper, {status:200})
    } catch (error) {
        console.log(error);
        return Response.json({ error: "There was an internal error paper" }, { status: 500 });
    }

}