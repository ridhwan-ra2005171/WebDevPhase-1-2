// Imports
const papersUrl = "../../papers.json";
const usersUrl = "../../users.json";

// assuming we have the gloabl variable USER_ID
// we set it to 7 for testing purpose only
const USER_ID = 12;

// elements
const paperCont = document.querySelector("#paper-cont");
// console.log(paperCont);

// Paper Elements
const paperTitle = document.querySelector("#title");
const paperAuthors = document.querySelector("#authors");
const paperPresenter = document.querySelector("#presenter");
const paperAbstract = document.querySelector("#abstract");
// Form
const form = document.querySelector("#myForm");
console.log(form);
// Form Objects
const evaluation = document.querySelector('input[name="evaluation"]:checked');
// const eval = document.querySelector("")
// console.log(evaluation);
const contribution = document.querySelector(
  'input[name="contribution"]:checked'
);
const strengths = document.querySelector("#paper-strengths");
const weakness = document.querySelector("#paper-weakness");
// buttons
const backBtn = document.querySelector("#go-back");
const cancelBtn = document.querySelector("#cancel");
const submitBtn = document.querySelector("#submit");

// Event listeners for buttons
backBtn.addEventListener("click", returnToPrevPage);
cancelBtn.addEventListener("click", cancelReview);
form.addEventListener("submit", storeForm);

//load paper
async function laodPaper() {
  papers = await (await fetch(papersUrl)).json();
  users = await (await fetch(usersUrl)).json();

  const reviewPaper = papers.find(
    (p) => p.pid === parseInt(localStorage.paperAtm)
  );

  // getting authors names
  const authObjects = users.filter((o1) =>
    reviewPaper.authors.find((o2) => parseInt(o1.id) === parseInt(o2))
  );
  let authNames = authObjects.map((author) => {
    return `${author.first_name} ${author.last_name}`;
  });

  //getting presenter names
  //   const presObjects = users.filter((o1) => parseInt(o1.id) === parseInt(reviewPaper.presenter));
  //   let presName = presObjects.map((pres) => {
  //     return `${pres.first_name} ${pres.last_name}`;
  //   });

  // changing the HTML accordingly
  paperTitle.innerHTML = reviewPaper.title;
  paperAuthors.innerHTML = authNames.join("; ");
  paperAbstract.innerHTML = reviewPaper.abstract;
//   paperPresenter.innerHTML = presName;
}

laodPaper();


// The event listener functions :::::::::::::::::::::::::::::::::::
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

  if (result === true) {
    location.href = "../paperDashboard/paperDashboard.html";
  }
}

// Dealing with the form
async function storeForm(e) {
  e.stopPropagation();
  e.preventDefault();

  const evaluation = document.querySelector('input[name="evaluation"]:checked');
  const contribution = document.querySelector(
    'input[name="contribution"]:checked'
  );

  const reviewedPaper = {
    pid: parseInt(localStorage.paperAtm),
    revid: USER_ID,
    evaluation: +evaluation.value,
    contribution: +contribution.value, // this is equavelant to parseInt(cont..)
    strengths: strengths.value,
    weakness: weakness.value,
  };

  // The storing objects in json file is for testing only!
  // the objects should be stored in localStorage
//   const reviewedPapers = localStorage.reviewedPapers;
//   if (!localStorage.reviewedPapers) {
//     localStorage.setItem('reviewedPapers')
//   } else {
//   }
//   localStorage.setItem("reviewedPapers");
}

//||||||||||||||||||||||"""""""""""":::::::::::::::::::::::::::::::::::::::::

//load data into/from local storage
// async function getData() {
//   papers = await (await fetch(papersUrl)).json();
//   users = await (await fetch(usersUrl)).json();
// let test = users.filter((index, user) => user.id === (papers[index].authors[index]));
//   test = users.find((u) => {
//     if (papers[0].authors.includes(u.id)) {
//       // return `${u.last_name}, ${u.first_name}`;
//       return 4;
//     }
//   });

//   console.log(test);
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
// }

// call load data
// getData()

// const test = papers[0].authors;
// console.log(papers);
