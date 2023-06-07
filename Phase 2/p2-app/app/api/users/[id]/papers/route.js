import reviewRepo from "./[paperID]/reviews/review-repo"


export async function GET(request, {params}) {
    try {
        let {id} = params;
        id = parseInt(id);
        const { searchParams } = new URL(request.url)
        const paperType = searchParams.get('paperType')
        let data = "~~ You did not query param a paper type. ~~"
        if(paperType == "review") {
            data = await reviewRepo.getPapersToReview(id)
        }
        
        return Response.json(data, { status: 200 })
    } catch (e) {
        console.log(e);
        return Response.json({ error: 'There was an internal error' }, { status: 500 })
    }
}
