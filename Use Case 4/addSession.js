let myLocations = [];
// Go-back button
const backBtn = document.querySelector("#go-back");

backBtn.addEventListener("click", returnToPrevPage);

async function returnToPrevPage(e) {
  e.preventDefault();
  // if (submitClicked === false) {
  let result = await swal({
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
      <select name="paper-${counter}" id="paper" onchange=""> 
        <option value="" selected disabled>-Select Paper-</option> 
      </select> 
      <label>Select Presenter:</label> 
      <select name="presenter-${counter}" id="presenter" onchange=""> 
        <option value="" selected disabled>-Select Presenter-</option> 
      </select> 
      <label>Select Location:</label> 
      <select 
        name="location-${counter}" 
        id="location-${counter}" 
        onload="handleLocationChange(location-${counter})"> 
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
            type="button" class="btn submit-btn DeleteAuthorBt" onclick="deleteSession('sessionform-${counter}')" name="deleteSessBtn" value="Remove Session">
    </div>
  </fieldset>`;

  let form = document.querySelector("#session-form");
  // Convert the html text to DOM element
  let sessForm = new DOMParser().parseFromString(html, "text/html");
  sessForm = sessForm.body.firstChild; // get the session filedset
  console.log(sessForm);
  // add the html to the form

  form.appendChild(sessForm);

  // We have to call the function that populate the dropdown list here (in loadSession function)
  // const locationList = document.querySelectorAll('#location-1')
  // locationList.addEventListener('load', handleLocationChange)
  handleLocationChange(`location-${counter}`);
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
  console.table(data);
  console.log(data[0].building, "-", data[0].room); //should return female engineering c07-145
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
  const paperList = document.querySelector(`#${paperListID}`); // find the list

}


//load presenter========================================
