let myLocations = [];
schDates = JSON.parse(localStorage.schDates); //fetching my localstorage for dates

let mySchedules = JSON.parse(localStorage.mySchedules); //fetching my localstorage for schedules

let tempSchdule= JSON.parse(localStorage.tempSchdule); //fetching local for update

// console.log("fetched sch;", tempSchdule)

// Go-back button
const backBtn = document.querySelector("#go-back");

backBtn.addEventListener("click", returnToPrevPage);

//This method is to return to the main page after modifying/ adding
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
    localStorage.removeItem("updateState")
    location.href = "/Use Case 4/conferenceSch.html";
  }
}


let counter = 1;

//Here will be for the button: 'Submit Conference Schedule'
const submitButton = document.querySelector("#submitConfBtn");



// We are gonna use this state variable to check if the update button was clicked 
const state = localStorage.updateState
console.log(state);
if (state == "updateClicked") {
//  console.log("update clicked");
 loadAllSessions()
 submitButton.addEventListener("click",updateSession)

} else {
  loadSessionForm(1);
  submitButton.addEventListener("click",submitSession)  
}
// clear the state from local storage inside the go back function (line 27)


// load session form first. WE CALL THIS FUNCTION IN THE HTML body TAG in THE HTML FILE

// loadSessionForm(counter);
async function loadSessionForm(counter) {
  const html = `<fieldset id="sessionform-${counter}" class="sessionform"> 
    <legend>Create Sessions</legend> 
    <label>Enter Session Title:
      <input type="text" name="title-${counter}" id="title-${counter}" placeholder="ENTER SESSION TITLE">  
    </label> 
        <label>Select Paper:
      <select name="paper-${counter}" id="paper-${counter}" onchange="loadPresenters('presenter-${counter}','#paper-${counter}')"> 
        <option value="" selected disabled>-Select Paper-</option> 
      </select> 
      </label> 
      <label>Select Presenter:
      <select name="presenter-${counter}" id="presenter-${counter}"> 
        <option value="" selected disabled>-Select Presenter-</option> 
      </select> 
      </label> 
      <label>Select Location:
      <select name="location-${counter}" id="location-${counter}"> 
      </select> 
      </label> 
      <div class="timeform"> 
        <label for="fromTime" 
          >Start Time: <input type="time" name="fromTime-${counter}" id="fromTime-${counter}" 
        /></label> 
        <label for="endTime" 
          >End Time: <input type="time" name="endTime-${counter}" id="endTime-${counter}" /> 
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
  // loadPresenters('presenter-${counter}','#paper-${counter}')
  loadAcceptedPapers(`paper-${counter}`);
  handleLocationChange(`location-${counter}`);
  loadToForm(tempSchdule,counter);
}

//event listerner to get conference date-------->
// Get the date input element
var dateInput = document.getElementById("cDate");
let formattedDate; //we store date selected here
//This function will return date
function getDateFiltered() {
  var selectedDate = dateInput.value;
  // console.log("original date", selectedDate)
  // Split the date string by hyphens
  var parts = selectedDate.split("-"); //by default its separated by --

  // Rearrange the parts to form the desired date format
  //we want to match it with the json file like dd/mm/yyyy
  var formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];

  // Output the formatted date to the console
  // console.log("Formatted date:", formattedDate);
  return formattedDate;
}

// Add an input event listener to the date input
// dateInput.addEventListener("input", function () {
//   // Get the selected date value
//   var selectedDate = dateInput.value;

//   // Split the date string by hyphens
//   var parts = selectedDate.split("-"); //by default its separated by --

//   // Rearrange the parts to form the desired date format
//   //we want to match it with the json file like dd/mm/yyyy
//   var formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];

//   // Output the formatted date to the console
//   console.log("Formatted date:", formattedDate);
//   // console.log("testing deez dates:",schDates)
// });

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

async function handleLocationChange(locationListID) {
  const locationJson = "/json/locations.json";
  const locations = await (await fetch(locationJson)).json();

  const locationList = document.querySelector(`#${locationListID}`); // find the list
  // console.log("SMTH: ", locationList);
  let locHTML = `<option value="" selected disabled>-Select Location-</option>`;

  locations.forEach(
    (loc) =>
      (locHTML += `
        <option value="${loc.id}">${loc.building} - ${loc.room}</option>
        `)
  );
  locationList.innerHTML = locHTML;
}

//load paper========================================
//we need to filter accepted papers here
function loadAcceptedPapers(paperListID) {
  // Get all papers from local storage
  papersloc = JSON.parse(localStorage.papersloc);
  // console.log("1: ", papersloc);
  // Find the reviewed papers only
  reviewedPapers = papersloc.filter((paper) => {
    if (
      paper.review
        .map((rev) => Object.keys(rev).length)
        .reduce((rev) => rev > 1)
    )
      return paper;
  });
  // console.log("2: ", reviewedPapers);
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
  // console.log("3: ", papersEvaluationAvg);

  // Find accepted papers
  // HINT change the 2 to 0 to see if it works ---------------------^
  acceptedPapers = papersEvaluationAvg
    .filter((paper) => paper[1] >= 2)
    .map((paper) => paper[0]);
  // console.log("4: ", acceptedPapers);

  const paperList = document.querySelector(`#${paperListID}`); // find the list
  // console.log("SMTH: ", paperList);
  let listHTML = `<option value="" selected disabled>-Select Paper-</option>`;

  if (acceptedPapers.length === 0) {
    // if there is no accepted papers, break outta the function
    console.log("There are no accepted papers");
    return;
  }
  // acceptedPapers.forEach((p) => console.log(p));
  acceptedPapers.forEach(
    (paper) =>
      (listHTML += `
        <option value="${paper.paperID}">${paper.title}</option>
        `)
  );
  paperList.innerHTML = listHTML;
  // console.log(listHTML);
  // array of papers which have 2 reviews submitted
  // reviewedPapers = paperReviewsArray.filter()
  // console.log("3: ",reviewedPapers);
}

//load presenter========================================

async function loadPresenters(presenterListID, paperListID) {
  
  console.log("loadPresenters called ");
  // get the selected paper ID from the dropdown menu
  const selectedPaperID = await document.querySelector(paperListID).value;
  // if (!selectedPaper) {
  //   return;
  // }
  // console.log("PAPER: ",selectedPaperID);
  // get all papers from local storage
  papersloc = JSON.parse(localStorage.papersloc);
  // get the selected paper object
  const selectedPaper = papersloc.find(
    (paper) => paper.paperID == selectedPaperID
  );
  // console.log(selectedPaper.authors);

  //try to get authors to be loaded in select presenter
  const presentersIDs = selectedPaper.authors;

  // Get all users from local storage
  usersloc = JSON.parse(localStorage.usersloc);
  // find the presenters objects from presentersIDs
  const presenters = presentersIDs.map((presID) =>
    usersloc.find((user) => +user.id === +presID)
  );

  // console.log("PRES: ",presenters);

  const presenterList = document.querySelector(`#${presenterListID}`);
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

function formToObject(form) {
  const formData = new FormData(form);
  console.log(formData);
  const data = {}; //data object
  for (const [key, value] of formData) {
    data[key] = value;
  }
  console.log(data);
  return data;
}

//here to add new dates to localstorage (later to json)
function addDateSch(dateSelected) {
  console.log("addDate called");
  // console.log(dateSelected);
  // console.log(schDates);
  // e.preventDefault();
  const newDateObject = { id: Date.now(), confDate: dateSelected };
  schDates.push(newDateObject);
  localStorage.setItem("schDates", JSON.stringify(schDates)); //to save it again to local storage.

  // console.log("After:", schDates);

  // const newDate = formToObject(e.target)
  // newDate.id = Date.now(); //new id for date
  // newDate.confDate = dateSelected;
  // schDates.push(newDate);
  // console.log("after: ",schDates); //this is to see if added
}

//---------------------------------------------------------------------------------
//THESE WILL BE USED TO ADD SCHEDULE
async function addSession(counterParam) {
  console.log("addSession is called");

  const myTitleText = await document.querySelector(`#title-${counterParam}`);
  const myTitleSelected = myTitleText.value;

  const myPaperSelect = await document.querySelector(`#paper-${counterParam}`);
  const paperSelected = myPaperSelect.value;
  // console.log("selected paper= ", paperSelected);

  const myPresenterSelect = await document.querySelector(
    `#presenter-${counterParam}`
  );
  const presenterSelected = myPresenterSelect.value;
  // console.log("selected presenter= ", presenterSelected);

  const myLocationSelect = await document.querySelector(
    `#location-${counterParam}`
  );
    // get location from the json file
  const locations = await(await fetch("/json/locations.json")).json();
  // console.log("Loc: ",locations);
  const locationID = myLocationSelect.value;
  const locationSelected = locations.find(loc => loc.id == locationID);
  // console.log("selected location= ", locationSelected);

  const myStartTime = await document.querySelector(`#fromTime-${counterParam}`);
  const startTimeSelected = myStartTime.value;
  // console.log("selected ST= ", startTimeSelected);

  const myEndTime = await document.querySelector(`#endTime-${counterParam}`);
  const endTimeSelected = myEndTime.value;
  // console.log("selected ET= ", endTimeSelected);

  sessionObj = {
    sesID: Date.now(),
    title: myTitleSelected, //we assume paper is the title
    location: locationSelected,
    paperID: paperSelected,
    presenterID: presenterSelected,
    fromTime: startTimeSelected,
    endTime: endTimeSelected,
  };
  console.log("SESS obj: ", sessionObj);

  // console.log("mysession function: ",mySessions);
  return sessionObj;
}

async function collectSessions() {
  let mySessions = [];

  //we start from 0
  for (let index = 1, i=0; index <= counter; index++,i++) {
    const sess = await addSession(index);
    //the index points to the (form session number)
    //whereas the i points to the array in the sessions
    mySessions[i] = sess;
    console.log("SESS: ", sess);
  }

  return mySessions;
}


async function submitSession(event) {
  event.preventDefault();
  console.log("Submit button clicked!");
  //FIRST WE STORE NEW DATES:==============================================
  // console.log(getDateFiltered()); //to see if i can get date
  addDateSch(getDateFiltered());

  // console.log(counter);
  //Now we try to store the whole schedule:

  // console.log("monkey session: ",addSession);

  let tempCounter = counter;

  const newScheduleObject = {
    schID: Date.now(),
    date: getDateFiltered(),
    sessions: await collectSessions(),
  };

  mySchedules.push(newScheduleObject);
  localStorage.setItem("mySchedules", JSON.stringify(mySchedules)); //to save it again to
  window.location.href = "/Use Case 4/conferenceSch.html"
  // loadSchedules();
}



//THERE IS ISSUE HERE!!!!
//this is basically turning the schedule object to form, so it autofills the form so we can update it
async function loadToForm(date,session,counterParam) {
  // console.log(form);

  //  console.log("SES LOCACA: ",session.location);

    const myTitleText = await document.querySelector(`#title-${counterParam}`);
    myTitleText.value = session.title

    const myPaperSelect = await document.querySelector(`#paper-${counterParam}`);
    myPaperSelect.value = session.paperID;
    loadPresenters(`presenter-${counterParam}`,`#paper-${counterParam}`)    
    // console.log("PID: ",session.paperID);

  // console.log(myPaperSelect.value);

  // console.log("selected paper= ", paperSelected);

  const myPresenterSelect = await document.querySelector(
    `#presenter-${counterParam}`
  );
  myPresenterSelect.value = session.presenterID;
  // console.log("PRES: ", session.presenterID);
  // const presenterSelected = myPresenterSelect.value;
  // console.log("selected presenter= ", presenterSelected);

  const myLocationSelect = await document.querySelector(
    `#location-${counterParam}`
  );
  // myLocationSelect.value = '2';

  // myLocationSelect.value = String(session.location.id);
  // console.log("Ses loc:",String(session.location.id));
  // console.log("select loc: ",myLocationSelect);
  // const locationSelected = myLocationSelect.value;
  // console.log("selected location= ", myLocationSelect);

  const myStartTime = await document.querySelector(`#fromTime-${counterParam}`);
  myStartTime.value = session.fromTime;
  // const startTimeSelected = myStartTime.value;
  // console.log("selected ST= ", startTimeSelected);

  const myEndTime = await document.querySelector(`#endTime-${counterParam}`);
  myEndTime.value = session.endTime
  // const endTimeSelected = myEndTime.value;
  // console.log("selected ET= ", endTimeSelected);

  // console.log("COUNT: " ,counterParam);
}
 
function loadAllSessions(){
  const SessCounter = tempSchdule.sessions.length;
  // console.log();

  counter = SessCounter;
  const date = tempSchdule.date; //we need to convert this date to the original format
  var parts = date.split("/"); //by default its separated by --
  // Rearrange the parts to form the desired date format
  //we want to match it original date format yyyy-mm-dd
  var formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
  // console.log("conf date:",formattedDate);
  const dateInput =  document.querySelector('#cDate')
  dateInput.value =  formattedDate;


  // console.log("LENGTH: ",SessCounter); //counting no of sessions
  for (let index = 1; index <= SessCounter; index++) {
    // if (index > 1) 
    loadSessionForm(index)
    const tempSession = tempSchdule.sessions[index-1];    
    // const tempSession = tempSchdule.sessions[index-1];
    loadToForm(formattedDate,tempSession,index);
    // console.log("Ses Loc: ",tempSession.location);
    // console.log("tempSess: ",tempSession + "Count: "+index);
    // console.log(index);
  
  }
  // removeLastSess()
}

async function updateSession(event) {
  // console.log("ISHAA: ",await collectSessions());
  // event.preventDefault();
  console.log("Submit button clicked! FOR UPDATE");
  //FIRST WE STORE NEW DATES:==============================================
  console.log("NINJA: ",getDateFiltered()); //to see if i can get date
  // addDateSch(getDateFiltered());

  // console.log(counter);
  //Now we try to store the whole schedule:

  // console.log("monkey session: ",addSession);

  let tempCounter = counter;
 

  console.log("IAM HERE");

  // const newSessions =  collectSessions();
  // console.log("asd: ", newSessions);
  const newScheduleObject = await{
    schID: tempSchdule.schID,
    date: await getDateFiltered(),
    sessions: await collectSessions()
  }
  console.log("IAM HERE 2");

  // console.log("Look 3 times: ", newScheduleObject);
  const index = mySchedules.findIndex(sched => sched.schID ==  tempSchdule.schID);
  console.log("index: ",index);

  console.log("-=-=-=-=-=-=-=-=--=-=-=--=-=");
  mySchedules[index] = newScheduleObject;
  // const temp = await  mySchedules[index].sessions;
  console.log("HVVVVVVVV: ", mySchedules[index].sessions);
  console.log("-=-=-=-=-=-=-=-=--=-=-=--=-=");

  localStorage.setItem("mySchedules", JSON.stringify(mySchedules)); //to save it again to
}

