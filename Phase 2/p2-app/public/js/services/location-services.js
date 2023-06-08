//we use API URL here

// const API_URL ="/api/locations/[id]";

//i made this so I can grab the schedules (line 7) from schedule object
export async function getLocation(locID) {
    const data = await fetch(`/api/locations/${locID}`)
    // let response = [];
    // response = await fetch(API_URL)
    const location = await data.json() 
    return location;
}

//get all locations:
export async function getLocations(){
    let response = [];
    response = await  fetch("/api/locations")
    const locations = await response.json() 
    return locations;
}


// const API_URL ="/api/schedules";

// //i made this so I can grab the schedules (line 7) from schedule object
// export async function getSchedules() {
//     let response = [];
//     response = await  fetch(API_URL)
//     const schedules = await response.json() 
//     return schedules;
// }