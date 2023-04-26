import {fs} from '/fs-extra'
// // Imports
// const papersUrl = "../../papers.json"; 
const usersJson = '../json/users.json';
const institutionsJson = '../json/institutions.json';
const papersJson = '../json/papers.json';


let papersloc = null;
let usersloc = null;

//for testing purposes
let paperAuthors=  [

    {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@organizer.com",
        "password": "password123",
        "role": "organizer"
      },
      {
        "id": 2,
        "first_name": "Jane",
        "last_name": "Doe",
        "email": "janedoe@organizer.com",
        "password": "password123",
        "role": "organizer"
      },
      {
        "id": 3,
        "first_name": "Bob",
        "last_name": "Smith",
        "email": "bobsmith@reviewer.com",
        "password": "password123",
        "role": "reviewer"
      },

]

let currentLogedIn


const form = document.querySelector("#submitForm");
let institutionsList = document.querySelectorAll(".institutions");
const addButton = document.querySelector('.addAuthorBt')
const authorsList = document.querySelector('.authorsList')
// addButton.addEventListener('click',addAuthor)
// const password = document.querySelector("#password");
// const loginButton = document.querySelector("#login");


//Loop event listener for all authors (through the institutionsList)
institutionsList.forEach(institution => institution.addEventListener('focus',loadInstitutions))
document.querySelector(".institutions").addEventListener('focus',loadInstitutions)

const mainContent = document.getElementById('main-content');
const presenterList = document.querySelector('#presenter')
presenterList.addEventListener('focus',loadPresenters)
// const submitButton = document.querySelector('#submitButton')
form.addEventListener('submit', submitForm)


//PERFECTO
async function loadInstitutions() {
    //gotta take into consideration if one author or multiple >> by default consider multiple

    const institutions  = await (await fetch(institutionsJson)).json();
    // console.log(institutions);
    let instHTML=''
    // let instNames = institutions.map(inst=> inst.name)
    
    institutions.forEach(inst=>
        instHTML+=`
        <option value="${inst.code}">${inst.name}</option>
        `
        )
        //loop through all authors & give each one full list of institutions
        institutionsList.forEach( each =>each.innerHTML=instHTML)

}

//PERFECTO
function addAuthor() {
    const authorNumber = document.querySelectorAll('.author').length+1
    let authorHTML =`
    <div class="author" id="${authorNumber}">
        <legend for="author${authorNumber}">Author ${authorNumber}</legend>

        <label for="authorFirstName"> First name:</label>
        <input type="text" name="author${authorNumber}FirN" id="author${authorNumber}FirN">

        <label for="authorLastName"> Last name:</label>
        <input type="text" name="author${authorNumber}LasN" id="author${authorNumber}LasN">

        <label for="email"> Email:</label>
        <input type="email" class="email" name="auth${authorNumber}Email" id="auth${authorNumber}Email">

        <label for="institutions"> Affiliation:</label>
        <select name="institutions" class="institutions">
        <option value="" disabled selected >Select your institution</option>
            <!-- here to uplaod the institutions -->
        </select>
        <br>

        <div class="endButtons">
            <input 
             id="addButton-${authorNumber}"
            type="button" class="btn submit-btn addAuthorBt" onclick="addAuthor()" name="addAuthorBt" value="Add Author">
            <input 
            id="deleteButton-${authorNumber}" 
            type="button" class="btn submit-btn DeleteAuthorBt" onclick="deleteAuthor(${authorNumber})" name="DeleteAuthorBt" value="Remove Author">
        </div>
        
    </div>
    `
    authorsList.innerHTML+=authorHTML

    //should update the institutionsList to "observe" the new added author & addEventListener
    //PERFECTO
    institutionsList = document.querySelectorAll(".institutions");
    institutionsList.forEach(institution => institution.addEventListener('focus',loadInstitutions))

}

//PERFECTO, but blem when deleting a previous one > number not re-set
function deleteAuthor(authorNumber) {
    const currentauthors = Array.from(document.querySelectorAll('.author'))
    //Since a paper can't have 0 authors
    if (currentauthors.length>1) {
        const toDeleteAuthor = currentauthors.filter(author=>author.id==(authorNumber).toString())
        toDeleteAuthor[0].innerHTML=''
    }
    // else{
    //     console.log("NOP");
    // }
}

//PERFECTO
function loadPresenters() {
    const authorsNumber = document.querySelectorAll('.author').length
    let testPresenters=[]
    for (let index = 1; index <= authorsNumber; index++) {
        let fname = document.querySelector(`#author${index}FirN`)
        let lname = document.querySelector(`#author${index}LasN`)
        let pres = {
            first_name: fname.value,
            last_name: lname.value

        }
        testPresenters[index-1]=pres
    }
    // console.log("test", testPresenters);
    //save actual authors in the paperAuthors

    //then load the paperAuthor

    //but gotta make sure to change paperAuthor if any change occurs (so don't validate a presenter that has been deleted)
    //maybe include it as a check statement when submitting
    //if false reset presenter to null
    const presenters  = testPresenters
    let presentHTML=''
    // let presentNames = presentitutions.map(present=> present.name)
    // console.log(presentNames);

    presenters.forEach(present=>
        presentHTML+=`
        <option value="${present.id}">${present.first_name} ${present.last_name}</option>
        `
        )
        presenterList.innerHTML=presentHTML
}




async function submitForm(event) {
    event.preventDefault()
    //why this papers??? what's the relation with institutionsJson
    const papers  = await (await fetch(papersJson)).json();
    console.log(papers.length);
    const paperTitle=document.querySelector('#title')
    const paperAbstract = document.querySelector('#paper-abstract')
    const paperPresenterID = document.querySelector('#presenter')
    const paperPdfLink = document.querySelector('#file')
    console.log(paperPdfLink.value);
    
    //save authors in paperAuthors (only their id???)
    const authorsID= await (saveAuthors())
    console.log(authorsID);
    let newPaper = {
        paperID: papers.length+1,
        title: paperTitle.value,
        abstract: paperAbstract.value,
        authors: authorsID,
        //authors
        presenterID: paperPresenterID.value,
        pdfLink: paperPdfLink.value
        //reviews are added on the fly when done, no need to include them now
        
    }
    //save this new paper in the JSON file

    // const fs = require('fs')
    const paper = JSON.stringify(newPaper)
    await fs.writeJSON('papersJson',newPaper)
    // => {
    //     if (err) {
    //       throw err
    //     }
    //     //display confirmation message
    //     console.log('JSON data is saved.')
    //   })

      
}

//PERFECTO
//in typical scenario, would check: full name & email
async function saveAuthors() {
    //get the number of authors
    const authorEmail = document.querySelectorAll('.email')
    const authorsEmails = []
    for (let index = 0; index < authorEmail.length; index++) {
        authorsEmails[index]= authorEmail[index].value  
    }
    console.log(authorsEmails);
    const users  = await (await fetch(usersJson)).json();//users is an array

    let authorsID =[]

    //looping for each email
    for (let index = 0; index < authorsEmails.length; index++) {
        let id=0
        let userIndex=0
       
        //loop through all authors & save them in an array: only their IDs >> should 
        while (userIndex<users.length) {
            // compare submitted email with users.json's emails
            if (users[userIndex].email==authorsEmails[index]) {
                //check if users is an array (starting from 0)
                id = userIndex+1
                authorsID[index]=id
            }
            userIndex+=1
        }

        if (id==0) {
            console.log("email not found");
            return false
        }
    }
    return authorsID

    
}

