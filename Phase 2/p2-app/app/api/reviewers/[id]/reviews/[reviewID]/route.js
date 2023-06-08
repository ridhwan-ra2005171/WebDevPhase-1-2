import reviewRepo from "../../../review-repo";


export async function GET(request, {params}) {
  try {
      let {reviewID} = params
      // console.log(reviewID);
      const data = await reviewRepo.getReview(reviewID);
      // console.log(data);
      return Response.json(data, { status: 200 });

  } catch (e) {
    console.log(e);
    return Response.json(
      { error: "There was an internal error" },
      { status: 500 }
    );
  }
}


export async function PUT(request, {params}) {
  try {
      const reviewObj = await request.json();
      const {reviewID} = params;
      // console.log(reviewID);
      const data = await reviewRepo.updateReview(reviewID,reviewObj);
      // console.log(data);
      return Response.json(data, { status: 200 });

  } catch (e) {
    console.log(e);
    return Response.json(
      { error: "There was an internal error" },
      { status: 500 }
    );
  }
}
