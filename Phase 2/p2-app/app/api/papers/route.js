import { getPapers ,getReviewer,addPaper} from '../app-repo';


//works
export async function GET(request){
    const papers = await getPapers()
    return Response.json(papers, {status:200})

}


export async function POST(request){
    console.log("test: ");
    // const reviewer =await getUser(4)
    // const reviewer= await getReviewer(4)
    // console.log("test: ",reviewer);
    const paper = await request.json()
    // console.log(paper);
    // console.log(paper);
    // console.log(paper.reviewer);
    console.log("TESTTTTTT: ",paper['title']);
    // paper['reviewer']=reviewer

    const newPaper = await addPaper(paper)
    return Response.json(newPaper, {status:200})

}
