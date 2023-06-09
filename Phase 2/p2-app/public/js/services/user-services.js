//we use API URL here
const API_URL ="/api/users";

//i made this so I can grab the schedules (line 7) from schedule object
export async function getUsers() {
    let response = [];
    response = await  fetch(API_URL)
    const data = await response.json() 
    return data;
}

export async function getOneUser(id) {
    let response = [];
    id= parseInt(id);
    response = await  fetch(`${API_URL}/${id}`)
    const data = await response.json() 
    return data;
}