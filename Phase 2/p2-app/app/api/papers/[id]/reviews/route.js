import {addReview,getReview} from "../../../app-repo";


export async function GET(request,{params}){
    try {
        const {id} = params
        // const intID
        console.log("test: ",id); 
        // idInt = parseInt(id)
        const review = await getReview(id)
        return Response.json(review, {status:200})
    } catch (error) {
        console.log(error);
        return Response.json({ error: "There was an internal error review" }, { status: 500 });
    }

}

export async function POST(request,{params}){
    console.log("test: ");
    // const reviewer =await getUser(4)
    // const reviewer= await getReviewer(4)
    // console.log("test: ",reviewer);
    const review = await request.json()
    // console.log(paper);
    // console.log(paper);
    // console.log(paper.reviewer);
    // console.log("TESTTTTTT: ",paper['title']);
    // paper['reviewer']=reviewer

    const newPaper = await addReview(review)
    return Response.json(newPaper, {status:200})

}

