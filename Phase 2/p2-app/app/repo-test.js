import scheduleRepo from "../app/api/schedules/schedule-repo.js";
import locationRepo from "./api/locations/location-repo.js";
import papersRepo from "./api/papers/papers-repo.js";
import sessionRepo from "./api/sessions/session-repo.js";
//to use repo-test u need type:module in the package.Json


async function createSchedule(newDate,newSessions,newPaperIDs) {
  // First you have to make a schedule
  const newSchedule = await scheduleRepo.addSchedule({date : newDate});
  // Then save that schedules ID
//   console.log("sssss",newSchedule);
  const scheduleID = newSchedule.schID;
  // Get the paper objects for each session IN ORDER from prisma
//   const papersArray = newPaperIDs.map(async (pID) => {await papersRepo.getPaper(pID)});
//   console.log("P ARR: ", await papersArray[0]);
  // create new Sessions 
  newSessions = newSessions.map((ses) => {ses = {...ses, schID : scheduleID}; return ses})
//   console.log("NEW SESS: ",newSessions);

  const createdSessions = newSessions.map(async (sessObj) => { return await sessionRepo.addSession(sessObj)})
//   console.log("C in: ", (await createdSessions[0]).sesID );

  // now for each paper we associate it with its session
  let updatedPapers = [];
  for (let index = 0; index < newPaperIDs.length; index++) {
    
    updatedPapers.push(await papersRepo.updatePaperSessID(newPaperIDs[index], (await createdSessions[index]).sesID))
  }
  createdSessions.forEach(element => {
    // console.log( element);
  });
  // now we update the schedule
  const finalSched = await scheduleRepo.updateScheduleSessions(scheduleID,createdSessions);

}

async function main() {
  try {
    //try to get all the dates from the schedule object
    // console.log(await scheduleRepo.getSchedules());

    // console.log(await locationRepo.getLocation("1"));

   

    const paperIDsArray = ['555','444'];


    const sessions = [{
      title: "TEST 1",
      locationID: "1",
      fromTime: "12:00:00",
      endTime: "14:00:00",
    }, 
    {
        title: "TEST 2",
    locationID: "2",
    fromTime: "12:00:00",
    endTime: "14:00:00",
  }
];

    const newTEmp = {...sessions[0], schID : "55"}
    // console.log("AA: ",newTEmp);
    createSchedule("2023-08-05",sessions,paperIDsArray)
    // scheduleRepo.addSchedule();
  } catch (err) {
    console.log(err);
    return { err: err.message };
  }
}

main();
