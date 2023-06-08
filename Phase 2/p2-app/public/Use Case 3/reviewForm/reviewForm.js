import * as reviewServices from "../../js/services/review-services.js";

// add sweet alert script to the body
document.body.insertAdjacentHTML(
  "beforebegin",
  '<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>'
);

// global variables
const USER_ID = parseInt(localStorage.currentUserID);
let currentReview = {};
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
  currentReview = await reviewServices.getReview(localStorage.reviewAtm);
  // console.log(currentReview);

  // check if there is previos review for this paper
  if (currentReview.paperStrength != "") {
    // Add the data to the form
    document.querySelector(
      `input[value="${currentReview.overallEvaluation}"][name="evaluation"]`
    ).checked = true;
    document.querySelector(
      `input[value="${currentReview.paperContribution}"][name="contribution"]`
    ).checked = true;
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
  const _evaluation = document.querySelector(
    'input[name="evaluation"]:checked'
  ).value;
  const _contribution = document.querySelector(
    'input[name="contribution"]:checked'
  ).value;
  const _strengths = document.querySelector("#paper-strengths").value;
  const _weaknesses = document.querySelector("#paper-weaknesses").value;
  // console.log(weaknesses);

  const newReview = {
    reviewID: currentReview.reviewID,
    overallEvaluation: parseInt(_evaluation),
    paperContribution: parseInt(_contribution),
    paperStrength: _strengths,
    paperWeaknesses: _weaknesses,
    paperID: currentReview.paperID,
    reviewerId: currentReview.reviewerId,
  };
  console.log("STORE: ", newReview);

  // Confirmation of review submission
  let result = await swal({
    title: "Your Review has been Submitted Successfully!",
    icon: "success",
    buttons: "Ok",
  });

  if (result === true) {
    // PRISMA ALERT
    const updatedReview = await reviewServices.updateReview(currentReview.reviewID,newReview)
    location.href = "../reviewPapers/reviewPapers.html";
  }
}

async function returnToPrevPage(e) {
  e.preventDefault();
  // if (submitClicked === false) {
  let result = await swal({
    title: "Your changes will not be saved!",
    dangerMode: true,
    icon: "error",
    buttons: ["Cancel", "Proceed"],
  });
  if (result === true) {
    location.href = "../reviewPapers/reviewPapers.html";
  }
}
