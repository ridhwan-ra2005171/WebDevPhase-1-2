import * as reviewServices from "../../js/services/review-services.js";

const USER_ID = parseInt(localStorage.currentUserID);

// Elements from html
const forReviewList = document.querySelector("#for-review-list");

async function displayPapers() {
  const assignedPapers = await reviewServices.getPapersOfReviewer(USER_ID);
  forReviewList.innerHTML = assignedPapers
    .map((paper) => cardTemplate(paper))
    .join("");

  // Event handler for the hiding and unhidnig of the Abstract body
  const abstractLinks = document.querySelectorAll("#abstract-links");
  // abstractLinks.forEach(e => console.log(e.id));
  abstractLinks.forEach((a) => a.addEventListener("click", hideAbstract));

  const reviewButtons = document.querySelectorAll("#reviewButton");
  // abstractLinks.forEach(e => console.log(e.id));
  reviewButtons.forEach((a) => a.addEventListener("click", redirectReviewForm));
}
displayPapers();
// Hide and Unhide the abstract body
async function hideAbstract(e) {
  e.preventDefault();
  const sectionTag = e.target.parentElement.parentElement; // find the parent/container that has a tag
  const caretIcon = sectionTag.querySelector("#caret-icon"); // find the i tag from the parent
  const abstractBody = sectionTag.querySelector("p"); // find the p tag from the parent
  if (abstractBody.style.display === "none") {
    abstractBody.style.display = "block";
    caretIcon.className = "fa fa-caret-up";
  } else {
    abstractBody.style.display = "none";
    caretIcon.className = "fa fa-caret-down";
  }
}

async function redirectReviewForm(e) {
  const paperIdParam = e.target.parentNode.parentNode.id;
  // console.log(paperIdParam);
  localStorage.setItem("paperAtm", JSON.stringify(paperIdParam));
  window.location.href = "../reviewForm/reviewForm.html";
}

async function helpHandler(e) {
  e.preventDefault;
  let result = await swal({
    text: `-To View Paper:
    Click on the "Dowload Paper" link, a new tab displaying the pdf will open.
    
    -To Donwload a Paper:
    Right-Click on the "Download Paper" link and choose Save/Save as.

    -To View Paper Abstract:
    Click on the "Abstract" title. Clicking again will hide/unhide the paper's abstract`,
  });
}

// HTML for the paper card
function cardTemplate(paper) {
  // const link = null;
  // link = "https://www.africau.edu/images/default/sample.pdf";

  return `
<div class="card" id=${paper.paperID}>

  <h2 class="static">${paper.title}</h2>
  
  <section class="authors-container">
    <h3 class="static">Authors:</h3>
    <p id="paper-authors">
      ${paper.authors
        .map((a) => `${a.first_name} ${a.last_name}`)
        .join(",&nbsp &nbsp")}</p>
  </section>

  <section class="abstract-container">
    <a id="abstract-links" href="#" class="purple-link link">
      <h3 class="static">Abstract <i id="caret-icon" class="fa fa-caret-down"></i></h3>
    </a>
    <p id="abstract-content" class="abstract-content smalldesc" style="display: none;">${
      paper.abstract
    }</p>
  </section>

  <footer id="card-footer" class="card-footer">
    <a href="${
      paper.pdfLink
    }" id="download-link" class="pink-link link" title="Right-click and hit Save to download PDF" download target="_blank">Download Paper &nbsp<i class="fa fa-arrow-down"></i></a>
    <button id="reviewButton" class="btn reviewButton">Review</button>
  </footer>

</div>`;
}
