import { addPaper,getPapers } from './papers-repo';


export async function GET(request){
    const papers = await getPapers()
    return Response.json(papers, {status:200})

}



export async function POST(request){
    
    const paper = await request.json()
    const newPaper = await addPaper(paper)
    return Response.json(newPaper, {status:200})

}
