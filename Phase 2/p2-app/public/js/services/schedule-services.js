//we use API URL here

// import { POST } from '/api/schedules'
// import { headers } from "next/dist/client/components/headers";

const API_URL ="/api/schedules";

//i made this so I can grab the schedules (line 7) from schedule object
export async function getSchedules() {
    let response = [];
    response = await  fetch(API_URL)
    const schedules = await response.json() 
    return schedules;
}

export async function addSchedule(newSch){
    return await fetch(API_URL,
        {
            method:POST,
            headers:{'Content-Type':'application/json',},
            body: JSON.stringify(newSch)
        });
}