//Here we will import json file for presenter + paper
//also the conference

//Lists of schedules:
let mySchedules= [];

async function loadPage(pageUrl){
    const mainContent = document.querySelector("");
    const page = await fetch();
    const pageHTMLContent =  await page.text();
    mainContent.innerHTML = pageHTMLContent;


    form= document.querySelector("#add-conference-form");

    form.addEventListert("submit", addSchedule)
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

//from todoList app, we used this in the addRecipe
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