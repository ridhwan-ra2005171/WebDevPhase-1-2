// Imports
const papersUrl = "../../papers.json";
const usersUrl = "../../users.json";

let papersloc = null;
let usersloc = null;
// elements
const paperCont = document.querySelector("#paper-cont");
// console.log(paperCont);

//load data into/from local storage
async function getData() {
  papers = await (await fetch(papersUrl)).json();
  users = await (await fetch(usersUrl)).json();
  // let test = users.filter((index, user) => user.id === (papers[index].authors[index]));
  test = users.find((u) => {
    if (papers[0].authors.includes(u.id)) {
      // return `${u.last_name}, ${u.first_name}`;
      return 4;
    }
  });

  console.log(test);
  // if (!localStorage.papersloc) {
  // if the recipes dont exist in the local storage, create one and set
  // i declared recipes as global variable in line 7
  // papersloc  = await (await fetch(papersUrl)).json();
  // localStorage.setItem("papersloc", JSON.stringify(papersloc));
  // papersloc = JSON.parse(localStorage.papersloc);
  // recipesContainer.innerHTML = papersloc
  //   .map((p) => cardTemplate(p))
  //   .join("");
  //   } else {
  // recipe array exists in the local storage, retrieve it
  // papersloc = JSON.parse(localStorage.papersloc);
  // paperTitle.innerHTML
  // paperCont.innerHTML = papersloc
  //   .map((recipe) => recipeToHTML(recipe))
  //   .join("");
  //   }
}

// call load data
// getData()

// const test = papers[0].authors;
// console.log(papers);

// Paper Elements
const paperTitle = document.querySelector("#title");
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

// Event listeners for buttons
backBtn.addEventListener("click", returnToPrevPage);
cancelBtn.addEventListener("click", cancelReview);

//load paper
async function laodPaper() {
  papers = await (await fetch(papersUrl)).json();
  users = await (await fetch(usersUrl)).json();

  const reviewPaper = papers.find(
    (p) => p.pid === parseInt(localStorage.paperAtm)
  );

  const authorsObjects = users.filter((o1) => reviewPaper.authors.find((o2) => o1.id === o2));
  let authorsNames = authorsObjects.map((author) => {
    return `${author.first_name} ${author.last_name}`;
  });
  console.log(authorsNames.join("; "));

  // console.log(reviewPaper);
  paperTitle.innerHTML = reviewPaper.title;
  paperAuthors.innerHTML = authorsNames.join("; ");
//   console.log("Me");
//   let result = users.filter((o1) => {
    // reviewPaper.authors.find((o2) => o1.id === o2);
    // return `${o1.first_name} ${o1.last_name}`;
//   });

  
//   console.log(result);

 


  // console.log(getAuthorName());
}

laodPaper();

function getAuthorName(userId, authorId) {
  let result = users.filter((o1) =>
    reviewPaper.authors.find((o2) => o1.id === o2)
  );
  result = result.forEach((author) => {
    return `${author.first_name} ${author.last_name}`;
  });
  console.log(result);
}

// getAuthorName()
// //load paper data into page
// async function getPapers(){
//     const papers = await getData(papersUrl);
// //  console.log(papers[1].title);
// // paperTitle.innerHTML = papers[0].title;
// }

// getPapers()

// The event listener functions
// return to previous page
async function returnToPrevPage(e) {
  e.preventDefault();
  // swal("Are you sure you want to cancel?","","warning",{ buttons: ["Yes","No"],));

  let result = await swal({
    title: "Your changes will not be saved!",
    dangerMode: true,
    icon: "error",
    buttons: ["Cancel", "Proceed"],
  });

  // console.log(result);
  if (result === true) {
    location.href = "../paperDashboard/paperDashboard.html";
  }
}

async function cancelReview(e) {
  e.preventDefault();
  // alert("Are you sure you want to cancel?")
  let result = await swal({
    title: "Are you sure you want to cancel?",
    icon: "warning",
    buttons: ["No, stay", "Yes, cancel"],
  });

  // console.log(result);
  if (result === true) {
    location.href = "../paperDashboard/paperDashboard.html";
  }
}
