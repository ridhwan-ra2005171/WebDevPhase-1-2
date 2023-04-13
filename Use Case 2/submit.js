// // Imports
// const papersUrl = "../../papers.json"; 
const usersJson = "users.json";
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
const institutionsList = document.querySelector("#institutions");
const addButton = document.querySelector('.addAuthorBt')
const authorsList = document.querySelector('.authorsList')
// addButton.addEventListener('click',addAuthor)
// const password = document.querySelector("#password");
// const loginButton = document.querySelector("#login");

// form.addEventListener('submit',submit)

institutionsList.addEventListener('click',loadInstitutions)
const mainContent = document.getElementById('main-content');
const presenterList = document.querySelector('#presenter')
presenterList.addEventListener('click',loadPresenters)
// const submitButton = document.querySelector('#submitButton')
form.addEventListener('submit', submitForm)

async function loadInstitutions() {
    const institutions  = await (await fetch(institutionsJson)).json();
    // console.log(institutions);
    let instHTML=''
    // let instNames = institutions.map(inst=> inst.name)
    // console.log(instNames);

    institutions.forEach(inst=>
        instHTML+=`
        <option value="${inst.code}">${inst.name}</option>
        `
        )
    institutionsList.innerHTML=instHTML

}

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
        <input type="email" name="auth${authorNumber}Email" id="auth${authorNumber}Email">

        <label for="institutions"> Affiliation:</label>
        <select name="institutions" id="institutions">
        <option value="" disabled selected>Select your institution</option>
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
}

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
    const papers  = await (await fetch(institutionsJson)).json();
    console.log(papers.length);

    const paperTitle=document.querySelector('#title')
    const paperAbstract = document.querySelector('#paper-abstract')
    const paperPresenterID = document.querySelector('#presenter')
    const paperPdfLink = document.querySelector('#file')
    
    //save authors in paperAuthors (only their id???)
    saveAuthors()

    let newPaper = {
        paperID: papers.length+1,
        title: paperTitle.value,
        abstract: paperAbstract.value,
        //authors
        presenterID: paperPresenterID.value,
        pdfLink: paperPdfLink.value
        //reviews are added on the fly when done

    }
    //save this new paper in the JSON file

    //display confirmation message

}

function saveAuthors() {
    
}

