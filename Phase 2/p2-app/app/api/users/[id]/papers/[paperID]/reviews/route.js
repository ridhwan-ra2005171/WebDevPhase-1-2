import reviewRepo from "./review-repo.js";


// export async function GET(request, {params}) {
//   const {reviewID,paperID} = params;
//   // const data = {};
//   const data = await reviewRepo.getReview(12,5);
//   return new Response("Paper Id: "+paperID+" Rev Id: "+reviewID+" Data: "+data)
// }

export async function GET(request, {params}) {
  try {
      let {id, paperID} = params
      console.log(id + " "+ paperID);
      const data = await reviewRepo.getReview(id,paperID);
      return Response.json(data, { status: 200 });

  } catch (e) {
    console.log(e);
    return Response.json(
      { error: "There was an internal error" },
      { status: 500 }
    );
  }
}