import scheduleRepo from "./schedule-repo";
// import {getAllDates} from "./schedule-repo";

//get all schedules [already tested with postman]
export async function GET(request) {
  try {

   
    try {
      const schedules = await scheduleRepo.getSchedules();
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

//addNew Schedules:
export async function POST(request) {
  try {
      const newSchedule = await request.json();
      const added = await scheduleRepo.addSchedule(newSchedule);

      return Response.json(added, { status: 200 });
  } catch (e) {
      console.log(e);
      return Response.json({ error: "There was an internal error" }, { status: 500 });
  }
}
