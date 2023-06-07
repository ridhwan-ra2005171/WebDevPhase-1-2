import { getPaper } from '../papers-repo';

export async function GET(request,{params}){
    try {
        const {id} = params
        console.log("test: ",id); 
        // idInt = parseInt(id)
        const paper = await getPaper(id)
        return Response.json(paper, {status:200})
    } catch (error) {
        console.log(e);
        return Response.json({ error: "There was an internal error paper" }, { status: 500 });
    }

}