import locationRepo from "./location-repo";
// import scheduleRepo from "./schedule-repo";


export async function GET(request) {
    try {
  
     
      try {
        const schedules = await locationRepo.getLocations();
        return Response.json(schedules, { status: 200 });
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