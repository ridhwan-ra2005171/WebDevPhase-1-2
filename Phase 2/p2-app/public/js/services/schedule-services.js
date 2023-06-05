//we use API URL here

const API_URL ="/api/schedules";

//i made this so I can grab the date (line 7) from schedule object
export async function getAllDates() {
    let response = [];
    response = await  fetch(API_URL)
    const dates = await response.json() 
    return dates;
}