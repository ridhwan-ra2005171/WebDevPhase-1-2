// import {fs} from '/fs-extra'
// // Imports

// const { getReviewer } = require("@/app/api/app-repo");

// const papersUrl = "../../papers.json"; 
const usersJson = '../json/users.json';
const institutionsJson = '../json/institutions.json';
const papersJson = '../json/papers.json';

// let papers=[]
// localStorage.setItem("papers",JSON.stringify(papers))

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



async function getInstitutions() {
    const API_URL= `/api/institutions/`;
  
  const response = await fetch(API_URL,{ cache: "force-cache" });
  // console.log("TESTCHECK!!getUser: ",response);
  const institutions= await response.json()
  console.log("TESTCHECK!!getinstitutionsGETinstitutions: ",institutions);
  return institutions
  }


//PERFECTOOO
async function loadInstitutions() {
    //gotta take into consideration if one author or multiple >> by default consider multiple
// console.log("check");
    const institutions  = await getInstitutions()
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
    console.log("testPresenters: ",testPresenters);
    console.log("testPresenters: ",testPresenters);
    const presentersID  = await (findUserByName(testPresenters) )
    console.log("presentersIDpresentersID: ",presentersID);
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

async function getAuthors() {
    const API_URL= `/api/authors/`;
  
  const response = await fetch(API_URL);
  // console.log("TESTCHECK!!getUser: ",response);
  const authors= await response.json()
  console.log("TESTCHECK!!getauthorsGETauthors: ",authors);
  return authors
  }

//gets an array of user obj{fname,lname}
async function findUserByName(array) {
    console.log("findUserByNameINPUT: ",array);
    const authors = await getAuthors()
    // const users  = await (await fetch(usersJson)).json();//users is an array
console.log("findUserByNameauthors: ",authors);
    let authorsID =[]

    //looping for each email
    for (let index=0;index<array.length;index++) {

        const authorFound = authors.find(
        el=> el['first_name']==array[index]['first_name'] &&
        el['last_name']==array[index]['last_name'] )

        if (authorFound) {
            authorsID[index]=authorFound['id']
        }
     
    }

        //loop through all authors & save them in an array: only their IDs >> should 
    //     while (userIndex<users.length) {
    //         // compare submitted email with users.json's emails
    //         if (users[userIndex]["first_name"]==array[index].first_name) {
    //             //check if users is an array (starting from 0)
    //             id = userIndex+1
    //             authorsID[index]=id
    //         }
    //         userIndex+=1
    //     }

    //     if (id==0) {
    //         console.log("email not found");
    //         return false
    //     }
    return authorsID
    }




async function getReviewers(){
    const API_URL= `/api/reviewers/`;
  
    const response = await fetch(API_URL);
    // console.log("TESTCHECK!!getUser: ",response);
    const reviewers= await response.json()
    console.log("TESTCHECK!!getreviewersGETreviewers: ",reviewers);
    return reviewers

}


async function getPapers(){
    const API_URL= `/api/papers/`;
  
    const response = await fetch(API_URL);
    // console.log("TESTCHECK!!getUser: ",response);
    const papers= await response.json()
    console.log("TESTCHECK!!getpapersGETpapers: ",papers);
    return papers

}

async function addPaper(toAdd) {
    const url = '/api/papers/';
    console.log(url);
    console.log(toAdd);
    console.log(JSON.stringify(toAdd));
    try {
        // log(''); // Clear any error message displayed on the screen
        const result= await fetch(url, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toAdd)
        });
        return result
    } catch (e) {
        console.log(e)
    }
}



async function submitForm(event) {
    //create new PAPER
    //add it to its authors
    //create 2 reviews (one is auto, need just to add ONE)

    event.preventDefault()
    //why this papers??? what's the relation with institutionsJson


    //PHASE1
    // const papers  = await (await fetch(papersJson)).json();
    // console.log(papers.length);
    
    // const papers  = await getPapers();
    // console.log("papers lenght: ",papers.length);

    const paperTitle=document.querySelector('#title')
    const paperAbstract = document.querySelector('#paper-abstract')
    const paperPresenterID = document.querySelector('#presenter')
    const paperPdfLink = document.querySelector('#file')
    console.log(paperPdfLink.value);
    
    //save authors in paperAuthors (only their id???)
    const authorsID= await (saveAuthors())
    console.log(authorsID);


    const reviewersArray = await getReviewers()
    console.log("reviewers",reviewersArray);
    const reviewer1 = reviewersArray[Math.floor(Math.random()*reviewersArray.length)].reviewerId
    let reviewer2 = reviewersArray[Math.floor(Math.random()*reviewersArray.length)].reviewerId
console.log("rev1", reviewer1);
console.log("rev2", reviewer2);
    //in case reviewer1==reviewer2 
    while (reviewer1==reviewer2) {
    reviewer2 = reviewersArray[Math.floor(Math.random()*reviewersArray.length)]
        // console.log("check");
}

    //PHASE1
    // const reviewArr = [
    //     {
    //         "reviewerID": reviewer1
    //     },
    //     {
    //         "reviewerID": reviewer2

    //     }      
    // ]

    console.log("paperPresenterID: ",paperPresenterID.options[paperPresenterID.selectedIndex] );
    console.log("paperPresenterID: ",paperPresenterID.options[paperPresenterID.selectedIndex].value );

    let newPaper = {
        //PHASE1
        // paperID: papers.length+1,
        title: paperTitle.value,
        abstract: paperAbstract.value,
        // authors: authorsID,
        //authors
        presenterID: parseInt(paperPresenterID.options[paperPresenterID.selectedIndex].value),
        pdfLink: paperPdfLink.value,
        //reviews are added on the fly when done, no need to include them now

        //PHASE1
        // review: reviewArr,  
    }
    const toAdd= [newPaper,reviewer1,reviewer2]
    console.log("check: toAdd: ",toAdd);
    const newAddedPaper = await addPaper(toAdd)

    //why not showing??
    console.log("check: newAddedPaper: ",newAddedPaper);

    swal({
        title: "Paper submitted!",
        text: "The paper has been added to the database",
        icon: "success",
        button: "Good",
      });
    //can add a checker to check if these authors already submitted a paper before, or any other constraint (title name...etc)
    //save paper in localStorage
    // let papersArray = JSON.parse(localStorage.getItem("papers"))
    // console.log(papersArray);
    // papersArray.push(newPaper)
    // localStorage.setItem("papers",JSON.stringify(papersArray))
// window.location.href='../Main website/homepage.html'
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
    // const users  = await (await fetch(usersJson)).json();//users is an array
    const users = await getAuthors()
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

