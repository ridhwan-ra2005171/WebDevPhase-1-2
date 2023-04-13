//Here we will import json file for presenter + paper
//also the conference

let mySchedules= [];
const schedulesContainer = document.querySelector("#schedules");


//to check if i can fetch the schedules: =====================================
fetch("../json/schedules.json").then(response => response.json()).then(data => showInfo(data));

function showInfo(data){
  console.table(data)
  console.log(data[0].sessions[1].title)
}
//============================================================================

async function loadPage(){
    const mainContent = document.querySelector("main-content");
    const page = await fetch("../json/schedules.json");
    const pageHTMLContent =  await page.text();
    mainContent.innerHTML = pageHTMLContent;


    // form= document.querySelector("#add-schedule-form");

    // form.addEventListert("submit", addSchedule)
}
//===========================================================================
//loadSchedules:
async function loadSchedules() {
  // mySchedules = await (await fetch("../json/schedules.json")).json();
 mySchedules = await fetch("../json/schedules.json").then(response => response.json())

  localStorage.setItem("mySchedules", JSON.stringify(mySchedules));
    schedulesContainer.innerHTML = mySchedules
      .map((schedule) => scheduleToHTML(schedule))
      .join("");
}

function loadSessions(session){
  return `
  <tr>
          <td>${session.fromTime}-${session.endTime}</td>
          <td>${session.title}</td>
          <td>${session.presenterID}</td>
          <!-- <td>PaperTrusting Decentralised Knowledge Graphs and Web Data</td> -->
          <td>${session.location}</td>
        </tr>
  `
}

function scheduleToHTML(schedule){
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
      ${schedule.map(session => loadSessions(session))}
      </tbody>
      </table>
</div>
  
  `
}


//Add schedule:
function addSchedule(e){
    e.preventDefault();
    const newSchedule = formToObject(e.target);
    newSchedule.id = Date.now();
    mySchedules.push(newSchedule);
    //to check:
    console.log(mySchedules);

    localStorage.mySchedules = JSON.stringify(mySchedules);//just to store in the local storage

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