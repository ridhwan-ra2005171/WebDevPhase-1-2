const usersJson = "../../json/users.json";
let currUserID = parseInt(localStorage.currentUserID);
console.log(currUserID);

// add the style sheet of the navbar to the html files
const styleLink = '<link rel="stylesheet" href="/Navbar/navbar.css">';
document.head.insertAdjacentHTML("beforeend", styleLink);
// console.log(document.head.innerHTML);
// variables 
let users = [];
let currUser = null;


loadNav();
async function loadNav() {
  // get the users from the json file
  users = await (await fetch(usersJson)).json();
  // find the user from their id
  currUser = users.find((u) => u.id === currUserID);

  html = `
    <header>
        <nav class="nav-bar">
            <div class="logo">
                <img src="../../img/ConfPlus logo.png" alt="Conf Plus Logo">
            </div>
            <ul>
                <li><a id="home" class="nav-link grey" href="/mainpage/homepage.html">Home</a></li>
                ${getNavLink(currUser)}
                <li><a id="help" class="nav-link grey" href="#">Help</a></li>
            </ul>
            <a id="username" href="#" onclick="getUserDetails()"><i class="fa fa-user"></i> ${currUser.first_name} ${currUser.last_name}</a>
        </nav>
    </header>`;
  // inject the navbar in the body of the html
  document.body.insertAdjacentHTML("afterbegin", html);
}

function getNavLink(currUser) {
  const role = currUser.role;
  let link = null;
  switch (role) {
    case "organizer":
        link = `
        |<li id="middle"><a class="nav-link grey" href="/Use Case 4/conferenceSch.html">Edit Schedules</a></li>
        |<li id="middle"><a class="nav-link grey" href="/Use Case 4/addSession.html">Add Schedule</a></li>|`
      break;
    case "reviewer":
        link = `|<li><a class="nav-link grey" href="/Use Case 3/reviewPapers/reviewPapers.html">Review Papers</a></li>|`

      break;
    case "author":
        link = `|<li><a class="nav-link grey" href="/Use Case 2/submit.html">Submit Paper</a></li>|`
      break;

    default:
      break;
  }
  return link;
}

async function getUserDetails() {
  let result = await swal({
      title: `Hi, ${currUser.first_name} ${currUser.last_name}!`,
      text: `Email: ${currUser.email}`,
      buttons: "Log out",

    });
  // console.log("RES: ",result);
  //   // Confirmation of review submission
  //  = await swal({
  //   title: "Your Review has been Submitted Successfully!",
  //   icon: "success",
  //   buttons: "Ok",
  //   closeOnClickOutside: false,
  // });

  if (result === true) {
    localStorage.removeItem("currentUserID")
    location.href = "/mainpage/homepage.html";
  }

}

