// import {fs} from '/fs-extra'
// // Imports
// const papersUrl = "../../papers.json"; 
const usersJson = '../json/users.json';
const institutionsJson = '../json/institutions.json';
const papersJson = '../json/papers.json';

let papers=[]
localStorage.setItem("papers",JSON.stringify(papers))

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
// document.querySelector(".institutions").addEventListener('focus',loadInstitutions)

const mainContent = document.getElementById('main-content');
const presenterList = document.querySelector('#presenter')
presenterList.addEventListener('focus',loadPresenters)
// const submitButton = document.querySelector('#submitButton')
form.addEventListener('submit', submitForm)


//PERFECTO
async function loadInstitutions() {
    //gotta take into consideration if one author or multiple >> by default consider multiple
// console.log("check");
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
async function loadPresenters() {
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

    //adding the id of the presenter


    // console.log("test", testPresenters);
    //save actual authors in the paperAuthors

    //then load the paperAuthor

    //but gotta make sure to change paperAuthor if any change occurs (so don't validate a presenter that has been deleted)
    //maybe include it as a check statement when submitting
    //if false reset presenter to null
    const presentersID  = await (findUserByName(testPresenters) )
    let presenters=[]
    for (let index = 0; index < testPresenters.length; index++) {
       presenters[index]=testPresenters[index]
       presenters[index].id=presentersID[index]
        
    }
    let presentHTML=''
    // let presentNames = presentitutions.map(present=> present.name)
    // console.log(presentNames);
console.log("presenters: ",presenters);
    presenters.forEach(present=>
        presentHTML+=`
        <option value="${present.id}">${present.first_name} ${present.last_name}</option>
        `
        )
        presenterList.innerHTML=presentHTML
}

//gets an array of user obj{fname,lname}
async function findUserByName(array) {
    const users  = await (await fetch(usersJson)).json();//users is an array

    let authorsID =[]

    //looping for each email
    for (let index = 0; index < array.length; index++) {
        let id=0
        let userIndex=0
       
        //loop through all authors & save them in an array: only their IDs >> should 
        while (userIndex<users.length) {
            // compare submitted email with users.json's emails
            if (users[userIndex]["first_name"]==array[index].first_name) {
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
    const reviewersArray = await getRole("reviewer")
    console.log("reviewers",reviewersArray);
    const reviewer1 = reviewersArray[Math.floor(Math.random()*reviewersArray.length)]
    let reviewer2 = reviewersArray[Math.floor(Math.random()*reviewersArray.length)]
console.log("rev1", reviewer1);
console.log("rev2", reviewer2);
    //in case reviewer1==reviewer2 
    while (reviewer1==reviewer2) {
    reviewer2 = reviewersArray[Math.floor(Math.random()*reviewersArray.length)]
        // console.log("check");
}
    const reviewArr = [
        {
            "reviewerID": reviewer1
        },
        {
            "reviewerID": reviewer2

        }      
    ]

    let newPaper = {
        paperID: papers.length+1,
        title: paperTitle.value,
        abstract: paperAbstract.value,
        authors: authorsID,
        //authors
        presenterID: paperPresenterID.options[paperPresenterID.selectedIndex].value,
        pdfLink: paperPdfLink.value,
        //reviews are added on the fly when done, no need to include them now
        review: reviewArr,
        
    }

    console.log(paperPresenterID);
    //can add a checker to check if these authors already submitted a paper before, or any other constraint (title name...etc)
    //save paper in localStorage
    let papersArray = JSON.parse(localStorage.getItem("papers"))
    console.log(papersArray);
    papersArray.push(newPaper)
    localStorage.setItem("papers",JSON.stringify(papersArray))
window.location.href='../Main website/homepage.html'
    //save this new paper in the JSON file



    // const fs = require('fs')
    // const paper = JSON.stringify(newPaper)
    // await fs.writeJSON('papersJson',newPaper)
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
//can make it dynamic to accept email or name as parameters
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

//PERFECTO
//return an array or role's ID (more general)
 async function getRole(userRole) {
    const users  = await (await fetch(usersJson)).json();//users is an array
// console.log(userRole);
    let roleID =[]
    let roleIndex=0
    //looping for each email
    for (let index = 0; index < users.length; index++) {

        // console.log("checkGET",users[index][role]);
        // console.log("checkGET",users[index].role);
        // console.log("checkGETid",users[index].id);
            if (users[index].role==userRole) {
                console.log("true");
                // do so, so we don't have empty spaces
                roleID[roleIndex]=users[index].id
                roleIndex += 1
            }
        }
            return roleID
        
    }

