import * as services from '../js/services/recipe-services.js';
import * as schServices from '../js/services/schedule-services.js'

// Commonly used URLs
let usersUrl = "../../json/users.json"; //so we can get the presenters
// import { loadToForm } from "./addSession";

//Here we will import json file for presenter + paper
//also the conference
let mySchedules = [];
const tempSch = await schServices.getSchedules(); //grabbing the schedules from prisma
console.log("tempSch:",tempSch);
const tempSession = await  tempSch.map(sch => sch.sessions);  //this just grabs the dates from the schedules
console.log("sessions:", tempSession) //rn the sessions are undefined somehow


let usersloc = [];
let users = [];
// export default schDates;
// schDates = JSON.parse(localStorage.schDates); //make from string to object
document.body.addEventListener('load',loadSchedules())
const schedulesContainer = document.querySelector(".schedules");


//----------------------------------------------------------------------------
// testing prisma DELETE LATER!!!
document.querySelector("#button-test").addEventListener('click',async () => {
  document.querySelector("#div-test").innerHTML =await ok();

})

async function ok() {
  // let recipes = await services.getRecipes();
  let recipes = await schServices.getAllDates();
  console.log(recipes);
  return recipes;}

// schedulesContainer.innerHTML = "GI"
//-------------------------------------------------------------------------------


//to check if i can fetch the schedules: =====================================
// fetch("../json/schedules.json")
//   .then((response) => response.json())
//   .then((data) => showInfo(data));

function showInfo(data) {
  console.table(data);
  console.log(data[0].sessions[1].title);
}

const currentUserID = localStorage.currentUserID;

function checkLoggedIn() {
  if (currentUserID) {
    console.log("USER IS LOGGED IN");

    var script = document.createElement("script");
    script.setAttribute("src", "/Navbar/navbar.js");
    document.head.appendChild(script);
    console.log("Head: ", document.head.innerHTML);
    document.querySelector("#temp-nav").remove()

  } else {
    console.log("NOT LOGGED IN YET");
    

  }
}
checkLoggedIn();

//============================================================================

async function loadPage() {
  const mainContent = document.querySelector("main-content");
  // const page = await fetch("../json/schedules.json");
  // const page = mySchedules;
  const page = tempSch;

  const pageHTMLContent = await page.text();
  mainContent.innerHTML = pageHTMLContent;

  // form= document.querySelector("#add-schedule-form");

  // form.addEventListert("submit", addSchedule)
}
//===========================================================================
//loadSchedules:
async function loadSchedules() {
  // mySchedules = await (await fetch("../json/schedules.json")).json();
  users = await (await fetch(usersUrl)).json();
  localStorage.setItem("usersloc", JSON.stringify(users));

  usersloc = JSON.parse(localStorage.usersloc);

  if  (!localStorage.mySchedules) { //if the recipes dont exist in local storage, load from the URL
    mySchedules = await (await fetch("../json/schedules.json")).json();
    localStorage.setItem("mySchedules", JSON.stringify(mySchedules));
    // schedulesContainer.innerHTML = mySchedules
      // .map((sch) => scheduleToHTML(sch))
      // .join("");
  } else { // else display the recipes cards in the main using localStorage myRecipes array
    mySchedules = JSON.parse(localStorage.mySchedules); //make from string to object
    console.log("sc: ", mySchedules);
    //---------------------------------------------------------------------------
    //change mySchedules to tempSch later
  //  schedulesContainer.innerHTML = mySchedules
  //   .map((schedule) => scheduleToHTML(schedule))
  //   .join(""); // join('') is used to get rid of comma that appears between the objects

  schedulesContainer.innerHTML = tempSch
    .map((schedule) => scheduleToHTML(schedule))
    .join(""); // join('') is used to get rid of comma that appears between the objects
  }
  // console.log(schedulesContainer.innerHTML);
  dateLoader();
}

//this is to load each session objects, since it is an array itself inside the json
function loadSessions(session) {
  console.log("sessions passed: ",session);
  const sesTitle = session.map(sch => sch.title);
  // console.log(sesDate);

  const sesfromTime = session.map(sch => sch.fromTime);


  const sesendTime = session.map(sch => sch.endTime);


  //for location, need to map or atleast get the locations list
  const seslocation = session.map(sch => sch.location);
  console.log(seslocation);

  
  // find presenter from usersloc in local Storage
  const presenter = usersloc.find(
    (pres) => pres.id === parseInt(session.presenterID)
  );
  // [we need to load presenters( do it later )]
  //  <td>${presenterDetails}</td>    ADD THIS UNDER SESSION.TITLE
  // const presenterDetails = `${presenter.first_name} ${presenter.last_name}`; // a stringf of presenter's full name

  //   <td>${seslocation.building} | ${seslocation.room}</td>   ADD THIS UNDER SESSION.TITLE

  return `
  <tr>
          <td>${sesfromTime}-${sesendTime}</td>
          <td>${sesTitle}</td>
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
      ${tempSession.map((session) => loadSessions(session)).join("")}
      </tbody>
      </table>
  </div>  
  `;
}

//Add schedule: ===========================================

// function addSchedule(e) {
//   e.preventDefault();
//   const newSchedule = formToObject(e.target);
//   newSchedule.id = Date.now();
//   mySchedules.push(newSchedule);
//   //to check:
//   console.log("NEW: ",newSchedule);

//   localStorage.mySchedules = JSON.stringify(mySchedules); //just to store in the local storage

//   // window.location.href = "conferenceSch.html";
// }
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
// function handleDeleteSchedule(schedID){
//   // e.preventDefault()

//   console.log("SEDEA: ",schedID);
//   const schedules = JSON.parse(localStorage.mySchedules);
//   // Index of schedule to be deleted
//   const schedIndex = schedules.findIndex(sched => sched.schID == schedID )
//   // delete schedule from array
//   schedules.splice(schedIndex,1);
//   // store in local storage updated array
//   localStorage.setItem("mySchedules",JSON.stringify(schedules))
//   // load page again
//   loadSchedules();
// }

//=============================================

//===USE CASE 5 date filter:
const dateJson = "../json/conference-dates.json";
const dateDL = document.querySelector("#sortByDate");
// dateDL.addEventListener('click',dateLoader)

// let schDates = JSON.parse(localStorage.schDates);

async function dateLoader() {
  // const tempSchDates =   await  mySchedules.map(sch => sch.date);
  const tempSch = await schServices.getSchedules(); //grabbing the schedules from prisma
  const tempSchDates = await  tempSch.map(sch => sch.date);  //this just grabs the dates from the schedules

  // const tempSchDates =   await schedServices.getAllDates();
  console.log("tempSchdates: ", tempSchDates);

  let instHTML = '<option value="all" >Show All Conferences</option>';
  tempSchDates.forEach(
    (date) =>
      (instHTML += `
    <option value="${date}">${date}</option>
    `)
  );
  dateDL.innerHTML = instHTML;
}

// dateLoader();

function sortdateHandler() {
  var selectedDate = document.getElementById("sortByDate").value;
  console.log(selectedDate); //its returning the selected date, we can use it to compare.
  //I will try comparing the dates string:


  //251 here just compare the schedule dates object with selected
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

function testhandler(){
  console.log("I am called");
}

