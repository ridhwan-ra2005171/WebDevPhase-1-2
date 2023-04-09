// Imports
const papersUrl = "../../papers.json"; 
const usersUrl = "../../users.json";

async function getData(url) {
    const data  = await (await fetch(url)).json();
    // console.log(data);
    return data;
}






// Paper Elements
const paperTitle = document.querySelector("#title");
// paperTitle.innerHTML = "Hi";
const paperAuthors = document.querySelector("#authors");
const paperPresenter = document.querySelector("#presenter");
const paperAbstract = document.querySelector("#abstract");
// Form Objects
const evaluation = document.querySelector("#evaluation");
const contribution = document.querySelector("#contribution");
const strengths = document.querySelector("#paper-strengths");
const weakness = document.querySelector("#paper-weakness");
// buttons
const backBtn = document.querySelector("#go-back");
const cancelBtn = document.querySelector("#cancel");
const submitBtn = document.querySelector("#submit");

//load paper data into page
async function getPapers(){
    const papers = await getData(papersUrl);
//  console.log(papers[1].title);
paperTitle.innerHTML = papers[0].title;

}
getPapers()

// Event listeners for buttons
backBtn.addEventListener('click',returnToPage)
cancelBtn.addEventListener('click',cancelReview)

// The event listener functions
async function returnToPage(e) {
    e.preventDefault();
    // swal("Are you sure you want to cancel?","","warning",{ buttons: ["Yes","No"],));

    let result = await swal({
        title: "Your changes will not be saved!",
        dangerMode: true,
        icon:"error",
        buttons: ["Cancel", "Proceed"],
      });

    // console.log(result);
    if (result === true) {
        location.href = "../paperDashboard/paperDashboard.html"
    }
}

async function cancelReview(e) {
    e.preventDefault();
    // alert("Are you sure you want to cancel?")
    let result = await swal({
        title: "Are you sure you want to cancel?",
        icon:"warning",
        buttons: ["No, stay", "Yes, cancel"],
      });
      
    // console.log(result);
    if (result === true) {
        location.href = "../paperDashboard/paperDashboard.html"
    } 
}

