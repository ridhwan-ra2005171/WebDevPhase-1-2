import scheduleRepo from "../app/api/schedules/schedule-repo.js"
import locationRepo from "./api/locations/location-repo.js";
//to use repo-test u need type:module in the package.Json
async function main(){

    try{

        //try to get all the dates from the schedule object
        console.log(await scheduleRepo.getSchedules());

        console.log(await locationRepo.getLocation(1))



        // newSchedule={
        //     "date": "2023-08-05"
        //     "sessions" : array here
        // }
           
        scheduleRepo.addSchedule();








    }catch(err){
        console.log(err);
        return {err: err.message}
    }



}

main();
