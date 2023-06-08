import reviewRepo from "./review-repo.js";

export async function GET(request, {params}) {
  try {
      let {id, paperID} = params
      const data = await reviewRepo.getPapersToReview(id);
      return Response.json(data, { status: 200 });

  } catch (e) {
    console.log(e);
    return Response.json(
      { error: "There was an internal error" },
      { status: 500 }
    );
  }
}