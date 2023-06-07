export async function getReview(reviewerID, paperID) {
  const data = await fetch(`/api/users/${reviewerID}/papers/${paperID}/reviews/`);
  const review = await data.json();
  console.log("** Review Service: get review");
  return review;
}


export async function getReview(reviewerID) {
  const data = await fetch(`/api/users/${reviewerID}/papers?paperType=review`);
  const review = await data.json();
  console.log("** Review Service: get papers of reveiwer");
  return review;
}