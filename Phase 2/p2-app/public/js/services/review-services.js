const BASE_URL = '/api/paper/review'

export async function getPapersOfReviewer(reviewerID) {
    const data = await fetch(`${BASE_URL}/${reviewerID}`)
    const papers = await data.json();
    return papers;
  } 