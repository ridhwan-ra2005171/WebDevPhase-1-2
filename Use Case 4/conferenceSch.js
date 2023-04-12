//Here we will import json file for presenter + paper
//also the conference

let mySchedules= [];
const schedulesContainer = document.querySelector("#schedules");


//to check if i can fetch the schedules: =====================================
fetch("../json/schedules.json").then(response => response.json()).then(data => showInfo(data));

function showInfo(data){
  console.table(data)
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
      .map((scheduleId) => scheduleToHTML(scheduleId))
      .join("");
}

function scheduleToHTML(schedule){
  return `
  <div class="conf-card">
  <a href="#"><h4>${schedule.Date}</h4></a>
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
        <tr>
          <td>12:00 -14:00</td>
          <td>${schedule.sessions.title}</td>
          <td>${schedule.sessions.presenterID}</td>
          <!-- <td>PaperTrusting Decentralised Knowledge Graphs and Web Data</td> -->
          <td>${schedule.sessions.location}</td>
        </tr>
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