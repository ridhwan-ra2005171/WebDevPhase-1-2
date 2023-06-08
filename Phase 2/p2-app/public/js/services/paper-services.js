

//get all papers for DL:
export async function getPapers(){
    let response = [];
    response = await  fetch("/api/paperLists")
    const paperList = await response.json() 
    return paperList;
}

//get paper by id (for adding)
export async function getPaper(paperID) {
    const data = await fetch(`/api/paperLists/${paperID}`)
    // let response = [];
    // response = await fetch(API_URL)
    const paper = await data.json() 
    return paper;
}