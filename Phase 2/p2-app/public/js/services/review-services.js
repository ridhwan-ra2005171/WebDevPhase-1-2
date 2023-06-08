export async function getReview(reviewID) {
  // reviewID = String(reviewID)
  // console.log(reviewID);
  const data = await fetch(`/api/reviewers/${reviewID}/reviews/${reviewID}`);
  const review = await data.json();
  // console.log(review);
  console.log("** Review Service: get a review");
  return review;
}

export async function updateReview(reviewID, reviewData,reviewerID) {
  const data = await fetch(`/api/reviewers/${reviewerID}/reviews/${reviewID}`, {
    method: 'PUT',
    headers: { 'Content-Type': "application/json", },
    body: JSON.stringify(reviewData)
  });
  const review = await data.json();
  console.log("** Review Service: get papers of reveiwer");
  return review;
}

export async function getPapersOfReviewer(reviewerID) {
  const data = await fetch(`/api/reviewers/${reviewerID}/reviews`);
  const review = await data.json();
  console.log("** Review Service: get papers of reveiwer");
  console.log("review: ",review);
  return review;
}
