export async function GET(request, {params}) {
  const {reviewID,paperID} = params;
  return new Response("Paper Id: "+paperID+" Rev Id: "+reviewID)
}
