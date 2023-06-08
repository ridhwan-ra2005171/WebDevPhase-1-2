import {getInstitutions} from "../app-repo"
//to get all institutions

//perfecto
export async function GET(request) {
    try {
        let institutions = await getInstitutions()
    
        return Response.json(institutions, { status: 200 })
    } catch (e) {
        console.log(e);
        return Response.json({ error: 'There was an internal error:institutions' }, { status: 500 })
    }

}