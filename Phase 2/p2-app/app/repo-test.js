import scheduleRepo from "../app/api/schedules/schedule-repo.js"
//to use repo-test u need type:module in the package.Json
async function main(){

    try{

        //try to get all the dates from the schedule object
        console.log(await scheduleRepo.getSchedules());


    }catch(err){
        console.log(err);
        return {err: err.message}
    }



}

main();
