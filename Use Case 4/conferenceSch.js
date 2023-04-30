// Commonly used URLs
let usersUrl = "../../json/users.json"; //so we can get the presenters
// import { loadToForm } from "./addSession";


//Here we will import json file for presenter + paper
//also the conference
let mySchedules = [];
let usersloc = [];
let schDates =[];
// export default schDates;
const schedulesContainer = document.querySelector(".schedules");

//to check if i can fetch the schedules: =====================================
fetch("../json/schedules.json")
  .then((response) => response.json())
  .then((data) => showInfo(data));

function showInfo(data) {
  console.table(data);
  console.log(data[0].sessions[1].title);
}
//============================================================================

async function loadPage() {
  const mainContent = document.querySelector("main-content");
  const page = await fetch("../json/schedules.json");
  const pageHTMLContent = await page.text();
  mainContent.innerHTML = pageHTMLContent;

  // form= document.querySelector("#add-schedule-form");

  // form.addEventListert("submit", addSchedule)
}
//===========================================================================
//loadSchedules:
async function loadSchedules() {
  mySchedules = await (await fetch("../json/schedules.json")).json();
  users = await (await fetch(usersUrl)).json();
  localStorage.setItem("usersloc", JSON.stringify(users));

  usersloc = JSON.parse(localStorage.usersloc);


  if  (!localStorage.mySchedules) { //if the recipes dont exist in local storage, load from the URL
    mySchedules = await (await fetch("../json/schedules.json")).json();
    localStorage.setItem("mySchedules", JSON.stringify(mySchedules));
    schedulesContainer.innerHTML = mySchedules
      .map((sch) => scheduleToHTML(sch))
      .join("");
  } else { // else display the recipes cards in the main using localStorage myRecipes array
    mySchedules = JSON.parse(localStorage.mySchedules); //make from string to object
    console.log("sc: ", mySchedules);
   schedulesContainer.innerHTML = mySchedules
    .map((schedule) => scheduleToHTML(schedule))
    .join(""); // join('') is used to get rid of comma that appears between the objects
  }
  // console.log(schedulesContainer.innerHTML);


  // if (localStorage.mySchedules) {
  //   mySchedules = await fetch("../json/schedules.json").then((response) =>
  //   response.json()
  // );
  // localStorage.setItem("mySchedules", JSON.stringify(mySchedules));
  // // console.log(localStorage.mySchedules);
  // // mySchedules = JSON.parse(localStorage.mySchedules);
  // // schedulesContainer.innerHTML = mySchedules
  //   // .map((schedule) => scheduleToHTML(schedule))
  //   // .join("");
  // }

  // mySchedules = JSON.parse(localStorage.mySchedules);
  // schedulesContainer.innerHTML = mySchedules
  //   .map((schedule) => scheduleToHTML(schedule))
  //   .join("");

  //   console.log(mySchedules);

  // Add if statement to check if mySchedules exist in local Storage
}

//this is to load each session objects, since it is an array itself inside the json
function loadSessions(session) {
  // console.log("ses: ",session);
  // find presenter from usersloc in local Storage
  const presenter = usersloc.find(
    (pres) => pres.id === parseInt(session.presenterID)
  );
  // console.log("users: ", usersloc);
  const presenterDetails = `${presenter.first_name} ${presenter.last_name}`; // a stringf of presenter's full name
  return `
  <tr>
          <td>${session.fromTime}-${session.endTime}</td>
          <td>${session.title}</td>
          <td>${presenterDetails}</td>
          <td>${session.location}</td>
        </tr>
  `;
}
// onclick="handleUpdateSchedule(${schedule.schID})"

function scheduleToHTML(schedule) {
  // console.log("sched: ", schedule);
  return `
  <div class="conf-card">
    <div class="card-header">
      <a href="#" class="confDateLabel"><h4>${schedule.date}</h4></a>
      <button id="update-btn" class="update-btn" onclick="handleUpdateSchedule(${schedule.schID})">Update Schedule</i></button>
      <button id="delete-btn" class="delete-btn" onclick="handleDeleteSchedule(${schedule.schID})"> <i class="fa fa-trash"></i></button>

    </div>
  <table style="text-align: center;">
      <thead>
        <tr>
          <th>Time</th>
          <th>Title</th>
          <th>Presenter</th>
          <!-- <th>Paper</th> -->
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
      ${schedule.sessions.map((session) => loadSessions(session)).join("")}
      </tbody>
      </table>
  </div>  
  `;
}

//Add schedule: ===========================================


function addSchedule(e) {
  e.preventDefault();
  const newSchedule = formToObject(e.target);
  newSchedule.id = Date.now();
  mySchedules.push(newSchedule);
  //to check:
  console.log("NEW: ",newSchedule);

  localStorage.mySchedules = JSON.stringify(mySchedules); //just to store in the local storage

  // window.location.href = "conferenceSch.html";
}
// addSchedule();

//from todoList app, we used this in the addSchedule
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



//=============================================
//DeleteButton
function handleDeleteSchedule(schedID){
  // e.preventDefault()

  console.log("SEDEA: ",schedID);
  const schedules = JSON.parse(localStorage.mySchedules);
  // Index of schedule to be deleted
  const schedIndex = schedules.findIndex(sched => sched.schID == schedID )
  // delete schedule from array
  schedules.splice(schedIndex,1);
  // store in local storage updated array
  localStorage.setItem("mySchedules",JSON.stringify(schedules))
  // load page again
  loadSchedules();
}

//=============================================

//===USE CASE 5 date filter:
const dateJson = "../json/conference-dates.json";
const dateDL = document.querySelector("#sortByDate");
// dateDL.addEventListener('click',dateLoader)

// let schDates = JSON.parse(localStorage.schDates);


async function dateLoader() {
  // const dates = await (await fetch(dateJson)).json(); //dont delete this we need for web api
    
  // schDates = await(await fetch(dateJson)).json();
  // localStorage.setItem("schDates",JSON.stringify(schDates))  

  if(!localStorage.schDates){//get from json file
    schDates = await(await fetch(dateJson)).json();
  localStorage.setItem("schDates",JSON.stringify(schDates))

  }else{ //get from local storage if exist
    schDates = JSON.parse(localStorage.schDates);
  }
  console.log("lcl dates:",schDates)

  let instHTML = '<option value="all" >Show All Conferences</option>';
  schDates.forEach(
    (date) =>
      (instHTML += `
    <option value="${date.confDate}">${date.confDate}</option>
    `)
  );
  dateDL.innerHTML = instHTML;
}

dateLoader();

function handleSortDate() {
  var selectedDate = document.getElementById("sortByDate").value;
  console.log(selectedDate); //its returning the selected date, we can use it to compare.
  //I will try comparing the dates string:

  const customDate = mySchedules.filter((schedule) =>
    schedule.date.includes(selectedDate)
  );

  //to check if filtering work:
  console.log("custom date: ", customDate);
  // console.log("all date locale:", schDates)

  if (selectedDate == "all") {
    loadSchedules();
  } else {
    schedulesContainer.innerHTML = customDate
      .map((schedule) => scheduleToHTML(schedule))
      .join("");
  }
}


  //-----------------------------------------------------------------------------------------------------
  //Update Conference is triggered here and will be passed to addSession

//This section is for the update
// updateSchedule()

async function handleUpdateSchedule(schedID){

  const schedules = JSON.parse(localStorage.mySchedules);
  // Index of schedule to be deleted
  const schedIndex = schedules.findIndex(sched => sched.schID == schedID )
  // delete schedule from array
  console.log("index of selected schedule:", schedIndex);
  console.log(mySchedules[schedIndex]);
  // let tempObj = mySchedules[schedIndex];
  //store to localstorage
  localStorage.setItem("tempSchdule",JSON.stringify(mySchedules[schedIndex]))

  // store a state variable that checks if the update button was clicked
  // it will be used in addSession.js
  localStorage.setItem("updateState","updateClicked")

  window.location.href = "/Use Case 4/addSession.html"
  //we will pass this object from array selected
  
  // loadToForm(mySchedules[schedIndex]); //we load this object to the form

}




// function saveUpdate(e) {
//   e.preventDefault();
//   const updatedRecipe = formToObject(e.target);

//   // first find the object from its ID
//   const index = myRecipes.findIndex((r) => r.id === updatedRecipe.id);
//   myRecipes[index] = updatedRecipe;

//   localStorage.myRecipes = JSON.stringify(myRecipes); // store the myRecipes in local storage
//   window.location.href = "index.html"; // return back to the home after submitting
// }






























