import reviewRepo from "../review-repo";


// export async function GET(request, {params}) {
//   const {reviewID,paperID} = params;
//   // const data = {};
//   const data = await reviewRepo.getReview(12,5);
//   return new Response("Paper Id: "+paperID+" Rev Id: "+reviewID+" Data: "+data)
// }

export async function GET(request, {params}) {
  try {
      let {reviewID} = params
      const data = await reviewRepo.getReview(reviewID);
      return Response.json(data, { status: 200 });

  } catch (e) {
    console.log(e);
    return Response.json(
      { error: "There was an internal error" },
      { status: 500 }
    );
  }
}