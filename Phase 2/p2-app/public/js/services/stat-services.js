const API_URL ="/api/statistics";


export async function getStats() {
    let response = [];
    response = await  fetch(API_URL)
    const statistics = await response.json() 
    return statistics;
}