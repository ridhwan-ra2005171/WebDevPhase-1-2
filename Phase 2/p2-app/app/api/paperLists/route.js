// import locationRepo from "./location-repo";
// import scheduleRepo from "./schedule-repo";
import paperListRepo from "./paperList-repo";


export async function GET(request) {
    try {
  
     
      try {
        const paperList = await paperListRepo.getPapers();
        return Response.json(paperList, { status: 200 });
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
      return Response.json(
        { error: "There was an internal error" },
        { status: 500 }
      );
    }
  }