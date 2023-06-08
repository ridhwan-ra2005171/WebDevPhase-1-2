



export async function getUser(userTocheck) {
    const API_URL= `/api/users/${userTocheck.email}`;
const response = await fetch(API_URL);
const user= await response.json()
return user
}