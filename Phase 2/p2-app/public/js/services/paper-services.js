

//get all papers for DL:
export async function getPapers(){
    let response = [];
    response = await  fetch("/api/paperLists")
    const paperList = await response.json() 
    return paperList;
}