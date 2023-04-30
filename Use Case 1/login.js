// // Imports
// const papersUrl = "../../papers.json";
const usersJson = "users.json";

let papersloc = null;
let usersloc = null;

let currentLogedIn;

const form = document.querySelector("#loginForm");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const loginButton = document.querySelector("#login");

form.addEventListener("submit", login);

const mainContent = document.getElementById("main-content");

//to Edit
async function loadPage(pageUrl) {
  let page = await fetch(pageUrl);
  let pageHTMLContent = await page.text();
  mainContent.innerHTML = pageHTMLContent;

  if (pageUrl == "/Use Case 4/reviewPaper/reviewPaper.html") {
    divRecipes = document.querySelector("#recipes");
    loadRecipes();
  }

  if (pageUrl == "edit_page.html") {
    form = document.querySelector("#add-recipe-form");
    form.addEventListener("submit", addRecipe);
  }
}

function getFormData(form) {
  const formData = new FormData(form);
  console.log(Object.fromEntries(formData.entries()));
  return Object.fromEntries(formData.entries());
}

function login(event) {
  event.preventDefault();
  const userTocheck = getFormData(form);
  currentLogedIn = findUser(userTocheck);

  switch (currentLogedIn.role) {
    case "reviewer":
      loadPage("review.html");
      break;
    case "organizer":
      loadPage("scheduleEdit.html");
      break;
    default: //author
      loadPage("submit.html");
      break;
  }
}

//gets name about user > returns its id
//should check also password
async function findUser(userTocheck) {
  // const users = await getData(usersJson);
  // console.log(email);
  const users = await (await fetch(usersJson)).json();
  // console.log(users);
  const user = users.find((user) => user["email"] == userTocheck.email);
  if (user !== undefined) {
    if (user.password == userTocheck.password) {
      // Added my Mohamad Allaham - store the user ID in local storage to be accessed by other js files
      localStorage.setItem("currentUserID", JSON.stringify(user.id));
      console.log("loc: ", localStorage.currUserID);
      //---------------------------------------------------------
      console.log(user.id);
      return user.id;
    } else {
      //better if it's an html response
      password.value = null;
      swal({
        title: "No email and password combination found, please try again",
        icon: "error",
        buttons: "Ok",
        closeOnClickOutside: false,
      });
    //   prompt("No email and password combination found, please try again");
    }
  // } else {
  //   //better if it's an html response
  //   password.value = null;
  //   swal({
  //       title: "No email and password combination found, please try again",
  //       icon: "error",
  //       buttons: "Ok",
  //       closeOnClickOutside: false,
  //     });
  //   // prompt("No email and password combination found, please try again");
  // }
  }
}
//load paper data into page
// async function getPapers(){
//     const papers = await getData(papersUrl);
// //  console.log(papers[1].title);
// // paperTitle.innerHTML = papers[0].title;

// }
// getPapers()

// Event listeners for buttons
// backBtn.addEventListener('click',returnToPage)
// cancelBtn.addEventListener('click',cancelReview)

// // The event listener functions
// async function returnToPage(e) {
//     e.preventDefault();
//     // swal("Are you sure you want to cancel?","","warning",{ buttons: ["Yes","No"],));

//     let result = await swal({
//         title: "Your changes will not be saved!",
//         dangerMode: true,
//         icon:"error",
//         buttons: ["Cancel", "Proceed"],
//       });

//     // console.log(result);
//     if (result === true) {
//         location.href = "../paperDashboard/paperDashboard.html"
//     }
// }

// async function cancelReview(e) {
//     e.preventDefault();
//     // alert("Are you sure you want to cancel?")
//     let result = await swal({
//         title: "Are you sure you want to cancel?",
//         icon:"warning",
//         buttons: ["No, stay", "Yes, cancel"],
//       });

//     // console.log(result);
//     if (result === true) {
//         location.href = "../paperDashboard/paperDashboard.html"
//     }
// }
