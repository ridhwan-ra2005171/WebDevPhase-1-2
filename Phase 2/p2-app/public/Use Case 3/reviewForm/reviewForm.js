import * as reviewServices from '../../js/services/review-services.js'

// add sweet alert script to the body
document.body.insertAdjacentHTML('beforebegin','<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>')
// console.log(document.body.innerHTML);
// assuming we have the global variable USER_ID
// we set it to 12 for testing purpose only
// global variables
// const USER_ID = 8;
const USER_ID = parseInt(localStorage.currentUserID);

// console.log("USER ID: ",USER_ID);
const reviewerID = USER_ID;
let submitClicked = false; // this is to check if the submit button was clicked

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

// buttons
const backBtn = document.querySelector("#go-back");
const submitBtn = document.querySelector("#submit");

// Event listeners for buttons
backBtn.addEventListener("click", returnToPrevPage);
form.addEventListener("submit", storeForm);


async function loadToForm() {
  // PRISMA ALERT
  // get the review (if there is) from prisma
  const currentReview = await reviewServices.getReview(USER_ID,localStorage.paperAtm)

  // check if there is previuos review for this paper
  if ((currentReview) != null) {
    // Add the data to the form
    document.querySelector(`input[value="${currentReview.overallEvaluation}"][name="evaluation"]`).checked = true;
    document.querySelector(`input[value="${currentReview.paperContribution}"][name="contribution"]`).checked = true;
    document.querySelector("#paper-strengths").value =
      currentReview.paperStrength;
    document.querySelector("#paper-weaknesses").value =
      currentReview.paperWeaknesses;

  }
}

loadToForm();

// Dealing with the form
async function storeForm(e) {
  e.stopPropagation();
  e.preventDefault();
  
  // form inputs retrieval
  const evaluation = document.querySelector(
    'input[name="evaluation"]:checked'
  ).value;
  const contribution = document.querySelector(
    'input[name="contribution"]:checked'
  ).value;
  const strengths = document.querySelector("#paper-strengths").value;
  const weaknesses = document.querySelector("#paper-weaknesses").value;
    console.log(weaknesses);
  const newReview = {
    reviewerID: reviewerID,
    evaluation: evaluation,
    contribution: contribution,
    strengths: strengths,
    weaknesses: weaknesses,
  };
  console.log("STORE: ",reviewedPaper);

  // store the reviewPaper in the papers.json

  //First get the papers list from local storage
  const papers = JSON.parse(localStorage.papersloc);

  // get the paper ID from local storage
  const targetPaperID = parseInt(JSON.parse(localStorage.paperAtm));
  // console.log(targetPaperID);

  // find the index of paper first
  const paperIndex = papers.findIndex(
    (paper) => paper.paperID === targetPaperID
  );
  // console.log(papers[paperIndex]);

  // find the index inside the review array that exists in targetPaper, so that we can replace the old review with the new one
  const reviewIndex = papers[paperIndex].review.findIndex(
    (review) => review.reviewerID === reviewerID
  );
  // console.log(papers[paperIndex].review[reviewIndex]);

  // now replace the old review with the new review aka reviewedPaper
  papers[paperIndex].review[reviewIndex] = reviewedPaper;

  //save into localStorage
  localStorage.papersloc = JSON.stringify(papers);

  // Confirmation of review submission
  let result = await swal({
    title: "Your Review has been Submitted Successfully!",
    icon: "success",
    buttons: "Ok",
    closeOnClickOutside: false,
  });

  if (result === true) {
    location.href = "../reviewPapers/reviewPapers.html";
  }
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

async function returnToPrevPage(e) {
  e.preventDefault();
  // if (submitClicked === false) {
  let result = await swal({
    title: "Your changes will not be saved!",
    dangerMode: true,
    icon: "error",
    buttons: ["Cancel","Proceed"],
  });
  if (result === true) {
    location.href = "../reviewPapers/reviewPapers.html";
  }
}
