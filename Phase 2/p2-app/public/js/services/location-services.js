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