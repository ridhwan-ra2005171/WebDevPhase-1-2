// Commonly used URLs
let usersUrl = "../../json/users.json"; //so we can get the presenters

//Here we will import json file for presenter + paper
//also the conference
let mySchedules = [];
let usersloc = [];
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
  // mySchedules = await (await fetch("../json/schedules.json")).json();
  users = await (await fetch(usersUrl)).json();
  localStorage.setItem("usersloc", JSON.stringify(users));

  usersloc = JSON.parse(localStorage.usersloc);

  mySchedules = await fetch("../json/schedules.json").then((response) =>
    response.json()
  );

  localStorage.setItem("mySchedules", JSON.stringify(mySchedules));
  schedulesContainer.innerHTML = mySchedules
    .map((schedule) => scheduleToHTML(schedule))
    .join("");

  // Add if statement to check if mySchedules exist in local Storage
}

//this is to load each session objects, since it is an array itself inside the json
function loadSessions(session) {
  // find presenter from usersloc in local Storage
  const presenter = usersloc.find((pres) => pres.id === parseInt(session.presenterID));
  const presenterDetails = `${presenter.first_name} ${presenter.last_name}` // a stringf of presenter's full name
  return `
  <tr>
          <td>${session.fromTime}-${session.endTime}</td>
          <td>${session.title}</td>
          <td>${presenterDetails}</td>
          <td>${session.location}</td>
        </tr>
  `;
}

function scheduleToHTML(schedule) {
  // console.log("sched: ", schedule);
  return `
  <div class="conf-card">
  <a href="#"><h4>${schedule.date}</h4></a>
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

//Add schedule:
function addSchedule(e) {
  e.preventDefault();
  const newSchedule = formToObject(e.target);
  newSchedule.id = Date.now();
  mySchedules.push(newSchedule);
  //to check:
  console.log(mySchedules);

  localStorage.mySchedules = JSON.stringify(mySchedules); //just to store in the local storage

  window.location.href = "conferenceSch.html";
}

//Add Session:

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


//===USE CASE 5 date filter:
const dateJson = '../json/conference-dates.json';
const dateDL= document.querySelector("#sortByDate");
// dateDL.addEventListener('click',dateLoader)

async function dateLoader(){
  const dates  = await (await fetch(dateJson)).json();
  let instHTML='<option value="all" selected disabled >Select Conference Date</option> <option value="all" >Show All</option>'
  dates.forEach(date=>
    instHTML+=`
    <option value="${date.confDate}">${date.confDate}</option>
    `
    )
    dateDL.innerHTML=instHTML
}

dateLoader()

function handleSortDate(){
  var selectedDate = document.getElementById("sortByDate").value;
  console.log(selectedDate); //its returning the selected date, we can use it to compare.
  //I will try comparing the dates string:

  
      const customDate = mySchedules.filter(schedule => schedule.date.includes(selectedDate));

      //to check if filtering work:
      console.log("custom date: ",customDate);
      if(selectedDate == 'all'){
        loadSchedules();
      }else{
        schedulesContainer.innerHTML = customDate
    .map((schedule) => scheduleToHTML(schedule))
    .join("");
      }
      
      
      // showBooks(customDate);
}
