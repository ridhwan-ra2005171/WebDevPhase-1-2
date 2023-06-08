import { getReviews} from '../app-repo';


//works
export async function GET(request){
    const papers = await getReviews()
    return Response.json(papers, {status:200})

}


