//we use API URL here

const API_URL ="/api/schedules";

//i made this so I can grab the schedules (line 7) from schedule object
export async function getSchedules() {
    let response = [];
    response = await  fetch(API_URL)
    const schedules = await response.json() 
    return schedules;
}