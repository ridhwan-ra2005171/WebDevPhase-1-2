export async function getReview(reviewID) {
  paperID = parseInt(reviewID)
  console.log("Rev ID: ",reviewID);
  const data = await fetch(`/api/reviewers/${reviewID}/reviews/${reviewID}}`);
  const review = await data.json();
  console.log("** Review Service: get a review");
  return review;
}


export async function getPapersOfReviewer(reviewerID) {
  const data = await fetch(`/api/reviewers/${reviewerID}/reviews`);
  const review = await data.json();
  console.log("** Review Service: get papers of reveiwer");
  return review;
}