import scheduleRepo from "../app/api/schedules/schedule-repo.js"

async function main(){

    try{

        //try to get all the dates from the schedule object
        console.log(await scheduleRepo.getAllDates());


    }catch(err){
        console.log(err);
        return {err: err.message}
    }



}

main();
