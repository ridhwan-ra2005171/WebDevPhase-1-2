
// export async function getPapersOfReviewer(reviewerID) {
//   const data = await fetch(`${PAPER_URL}/${reviewerID}`);
//   const papers = await data.json();
//   return papers;
// }

export async function getReview(reviewerID, paperID) {
  const data = await fetch(`/api/papers/${paperID}/reviews/${reviewerID}`);
  const review = await data.json();
  console.log("** Review Service: get review");
  return review;
}
