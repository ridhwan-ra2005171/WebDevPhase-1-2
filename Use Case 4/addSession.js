let myLocations = [];
// Go-back button
const backBtn = document.querySelector("#go-back");

backBtn.addEventListener("click", returnToPrevPage);

async function returnToPrevPage(e) {
  e.preventDefault();
  // if (submitClicked === false) {
  let result = await swal({
    //just using sweet alert
    title: "Your changes will not be saved!",
    dangerMode: true,
    icon: "error",
    buttons: ["Cancel", "Proceed"],
  });
  if (result === true) {
    location.href = "./conferenceSch.html";
  }
}

// load session form first. WE CALL THIS FUNCTION IN THE HTML body TAG in THE HTML FILE
let counter = 1;
// loadSessionForm(counter);
async function loadSessionForm(counter) {
  const html = `<fieldset id="sessionform-${counter}" class="sessionform"> 
    <legend>Create Sessions</legend> 
        <label>Select Paper:</label> 
      <select name="paper-${counter}" id="paper-${counter}" onchange=""> 
        <option value="" selected disabled>-Select Paper-</option> 
      </select> 
      <label>Select Presenter:</label> 
      <select name="presenter-${counter}" id="presenter-${counter}" onchange=""> 
        <option value="" selected disabled>-Select Presenter-</option> 
      </select> 
      <label>Select Location:</label> 
      <select name="location-${counter}" id="location-${counter}"> 
      </select> 
      <div class="timeform"> 
        <label for="fromTime" 
          >Start Time: <input type="time" name="fromTime-${counter}" id="fromTime" 
        /></label> 
        <label for="endTime" 
          >End Time: <input type="time" name="endTime-${counter}" id="endTime" /> 
        </label> 
      </div> 
      <input  
            id="deleteButton-${counter}"  
            type="button" class="btn delete-btn submit-btn" onclick="deleteSession('sessionform-${counter}')" name="deleteSessBtn" value="Remove Session">
    </div>
  </fieldset>`;

  let form = document.querySelector("#session-form");
  // Convert the html text to DOM element
  let sessForm = new DOMParser().parseFromString(html, "text/html");
  sessForm = sessForm.body.firstChild; // get the session filedset
  // console.log(sessForm);
  // add the html to the form

  form.appendChild(sessForm);

  // get paper value
  // const paperTitle = document.querySelector(`#paper-${counter}`);
  
  // console.log("i like men:",paperTitle.value);

  // We have to call the function that populate the dropdown list here (in loadSession function)
  // const locationList = document.querySelectorAll('#location-1')
  // locationList.addEventListener('load', handleLocationChange)
  handleLocationChange(`location-${counter}`);
  loadAcceptedPapers(`paper-${counter}`);
  loadPresenters(`presenter-${counter}`,`#paper-${counter}`);
}

// Event listener to the add more sessions button ---------------
const addSessionBtn = document.querySelector("#addSessionBtn");
addSessionBtn.addEventListener("click", addMoreSession);

function addMoreSession(e) {
  e.preventDefault();
  loadSessionForm((counter += 1)); //this is where we increment, so we can move to the next session
}
//----------------------------------------------------------------

function deleteSession(sessionFormID) {
  // console.log("deleteSession called", sessionFormID); //the ID works but the innerHTML doesnt
  const currentSession = document.querySelector("#session-form");
  // console.log("SESS-ID: ", sessionFormID);
  // console.log("CURR-SESS: ", currentSession.childNodes.length);

  //Since a schedule can't have 0 sessions, check if the schedule has more than 1 session
  if (currentSession.childNodes.length > 1) {
    // get the session form to delete
    const toDeleteSession = document.querySelector(`#${sessionFormID}`);
    // remove the session form from the html
    currentSession.removeChild(toDeleteSession);
    // console.log(11);
    // console.log("SESS TO DELETE: ", toDeleteSession);
  }
}

//load Location==========================================

// checking if i can fetch location:-----
fetch("../json/locations.json")
  .then((response) => response.json())
  .then((data) => showInfo(data));

function showInfo(data) {
  // console.table(data);
  // console.log(data[0].building, "-", data[0].room); //should return female engineering c07-145
}
//================

const locationJson = "../json/locations.json";

async function handleLocationChange(locationListID) {
  const locations = await (await fetch(locationJson)).json();

  const locationList = document.querySelector(`#${locationListID}`); // find the list
  // console.log("SMTH: ", locationList);
  let locHTML = `<option value="" selected disabled>-Select Location-</option>`;

  locations.forEach(
    (loc) =>
      (locHTML += `
        <option value="${loc.id}">${loc.building}-${loc.room}</option>
        `)
  );
  locationList.innerHTML = locHTML;
}

//load paper========================================
//we need to filter accepted papers here
function loadAcceptedPapers(paperListID) {
  // Get all papers from local storage
  papersloc = JSON.parse(localStorage.papersloc);
  console.log("1: ", papersloc);
  // Find the reviewed papers only
  reviewedPapers = papersloc.filter((paper) => {
    if (
      paper.review
        .map((rev) => Object.keys(rev).length)
        .reduce((rev) => rev > 1)
    )
      return paper;
  });
  console.log("2: ", reviewedPapers);
  // console.log("P5: ", (papersloc[4].review.map(rev => Object.keys(rev).length)).reduce(rev => rev > 1));

  if (reviewedPapers.length === 0) {
    // if there is no reviews, break outta the function
    console.log("There are no reviewed papers");
    return;
  }

  // acceptedPapers = reviewedPapers.map(paper => [paper,paper.review.map(rev => rev.evaluation)])
  // acceptedPapers = reviewedPapers.map(paper => paper.review.map(rev => rev.evaluation))
  // Find the each papers' average evaluation and store the paper and avg eval in an array [paper, avg]
  papersEvaluationAvg = reviewedPapers.map((paper) =>
    paper.review
      .map((rev) => rev.evaluation)
      .reduce((a, b) => [paper, (parseInt(a) + parseInt(b)) / 2])
  );
  console.log("3: ", papersEvaluationAvg);

  // Find accepted papers
  // HINT change the 2 to 0 to see if it works ---------------------^
  acceptedPapers = papersEvaluationAvg
    .filter((paper) => paper[1] >= 2)
    .map((paper) => paper[0]);
  console.log("4: ", acceptedPapers);

  const paperList = document.querySelector(`#${paperListID}`); // find the list
  // console.log("SMTH: ", paperList);
  let listHTML = `<option value="" selected disabled>-Select Paper-</option>`;

  if (acceptedPapers.length === 0) {
    // if there is no accepted papers, break outta the function
    console.log("There are no accpeted papers");
    return;
  }
  acceptedPapers.forEach((p) => console.log(p));
  acceptedPapers.forEach(
    (paper) =>
      (listHTML += `
        <option value="${paper.title}">${paper.title}</option>
        `)
  );
  paperList.innerHTML = listHTML;
  // console.log(listHTML);
  // array of papers which have 2 reviews submitted
  // reviewedPapers = paperReviewsArray.filter()
  // console.log("3: ",reviewedPapers);
}

//load presenter========================================

async function loadPresenters(presenterListID,paperListID) {
  //try to get authors to be loaded in select presenter


  // Get all users from local storage
  usersloc = JSON.parse(localStorage.usersloc);
  // Get all papers from local storage
  // load the file reviewPapers.html first to get access to the papersloc
  papersloc = JSON.parse(localStorage.papersloc);
  // console.log("1: ", papersloc);

  // find the presenters IDs from the paper objects
  const presentersIDs = papersloc.map(paper => paper.presenterID);
  // console.log("PRES IDS: ",presentersIDs);

  // const authors = usersloc.authors;
  // console.log(authors);

  // find the presenters objects from presentersIDs
  const presenters = presentersIDs.map(presID => usersloc.find(user => +user.id === +presID))

  // console.log("PRES: ",presenters);

  const presenterList = document.querySelector(`#${presenterListID}`) 
  // const locationList = document.querySelector(`#${locationListID}`); // find the list
  // console.log("SMTH: ", locationList);
  let presHTML = `<option value="" selected disabled>-Select Presenter-</option>`;

  presenters.forEach(
    (pres) =>
      (presHTML += `
        <option value="${pres.id}">${pres.first_name}-${pres.last_name}</option>
        `)
  );
  presenterList.innerHTML = presHTML;
}
