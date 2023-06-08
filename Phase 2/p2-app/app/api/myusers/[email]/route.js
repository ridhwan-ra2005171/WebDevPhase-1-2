import { getUser } from '../../app-repo';



export async function GET(request,{params}){
    try {
        const {email} = params
        // const intemail
        console.log("test: ",email); 
        console.log("test: ",email); 
        console.log("test: ",email); 
        console.log("test: ",email); 
        // emailInt = parseInt(email)
        const paper = await getUser(email)
        return Response.json(paper, {status:200})
    } catch (error) {
        console.log(error);
        return Response.json({ error: "There was an internal error paperGETUSER" }, { status: 500 });
    }

}