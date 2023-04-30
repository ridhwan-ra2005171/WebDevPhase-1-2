// Commonly used URLS
let usersUrl = "/json/users.json";
// add sweet alert script to the body
// document.body.appendChild('<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>')
// console.log(document.body.innerHTML);

// assuming we have the global variable USER_ID
// we set it to 12 for testing sake only
// const USER_ID = 8;
const USER_ID = localStorage.currentUserID

// localStorage.setItem("USER_ID",USER_ID);


const reviewerID = USER_ID;

// global variables
// const users = [];

// Elements from html
const forReviewList = document.querySelector("#for-review-list");
// const body = document.querySelector("body-content");

async function displayPapers(papersUrl) {
  users = await (await fetch(usersUrl)).json();
  localStorage.setItem("usersloc", JSON.stringify(users));

  // check if papers belonging to this current reviewer are in local storage
  // if (!localStorage.papersloc || (parseInt(localStorage.papersloc[0].pid) !== parseInt(USER_ID))) {
  // if (!localStorage.papersloc) {
  // console.log("The papers are nt in lcoal storge");

  // if the papers don't exist in the local storage,
  if (!localStorage.papersloc) {
    // if local storage doesn't have papersloc
    papers = await (await fetch(papersUrl)).json(); // fetch the papers
    localStorage.setItem("papersloc", JSON.stringify(papers)); // add papers to local storage
  }

  // get the papers from local storage
  papersloc = JSON.parse(localStorage.papersloc);
  // console.log("papers", papersloc);

  // get the papers that belong to the current reviewer, using the global variable USER_ID

  assignedPapers = null;
  // check if the lcoal stoarge has assigned papers or not
  // if (!localStorage.assignedPapers) {
    assignedPapers = papersloc.filter((paper) =>
      getPaperOfReviewer(paper, USER_ID)
    );
    localStorage.setItem("assignedPapers", JSON.stringify(assignedPapers));
  // } else {
    // assignedPapers = JSON.parse(localStorage.assignedPapers);
  // }

  // console.log('Assigned papers: ',assignedPapers);

  //load the papers that need reviewing
  // forReviewArray = assignedPapers.map(rev => (rev))
  // forReviewList.innerHTML = forReviewArray
  //   .map((paper) => cardTemplate(paper))
  //   .join("");

  assignedPapers = JSON.parse(localStorage.assignedPapers);
  forReviewList.innerHTML = assignedPapers
    .map((paper) => cardTemplate(paper))
    .join("");

  // } else {

  // papersloc array exists in the local storage, retrieve it
  // assignedPapers = JSON.parse(await localStorage.assignedPapers);
  // console.log(loc);
  // forReviewList.innerHTML = assignedPapers
  //   .map((paper) => cardTemplate(paper))
  //   .join("");

  //  displayNoneReviewedPapers(assignedPapers);
  // }

  // Event handler for the hiding and unhidnig of the Abstract body
  const abstractLinks = document.querySelectorAll("#abstract-links");
  // abstractLinks.forEach(e => console.log(e.id));
  console.log(abstractLinks);

  let a = abstractLinks.forEach((a) => a.addEventListener("click", hideAbstract));
  
}

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

// async function displayNoneReviewedPapers(assignedPapers) {
//     // forReviewList.innerHTML = assignedPapers

//     let  reviews = assignedPapers.map((paper) =>
//     {return paper.review.find(review => review.reviewerID === reviewerID)}
//     );

//     // console.log(Object.keys(reviews[0]).length );
//     console.log("MEEE " , reviews);
// }

// function displayReviewedPapers(assignedPapers) {

//   console.log(4);
// }

// function checkReviewd(review) {
//   console.log(review);
//   if (Object.keys(review).length > 1) {
//     console.log(Object.keys(review).length);
//     return review;
//   }
// }

function getPaperOfReviewer(paper, reviewerId) {
  if (paper.review.find((elem) => elem.reviewerID === reviewerId)) return paper;
}

async function loadPage(pageUrl, paperId) {
  // console.log("hiiiii  ",paperId);
  localStorage.setItem("paperAtm", JSON.stringify(paperId));

  // console.log(localStorage.paperAtm);
  window.location.href = pageUrl;
  // const page = await fetch(pageUrl);
  // document.body.innerHTML = page.text();

  // const mainContent = document.querySelector("#main-content");
  // const pageHTMLContent = await page.text();
  // console.log(pageHTMLContent);

  // console.log(11);
  // mainContent.innerHTML = pageHTMLContent;
}

// function to get names of authors using their IDs. This function is used in cardTemplate()
function getAuthorName(authorID) {
  const users = JSON.parse(localStorage.usersloc);
  const foundAuthor = users.find((user) => user.id === authorID);
  return `${foundAuthor.first_name} ${foundAuthor.last_name}`;
}

// Help button 
helpButton.addEventListener('click',helpHandler)

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
<div class="card">

  <h2 class="static">${paper.title}</h2>
  
  <section class="authors-container">
    <h3 class="static">Authors:</h3>
    <p id="paper-authors">
      ${paper.authors
        .map((authorID) => getAuthorName(authorID))
        .join(",&nbsp &nbsp")}</p>
  </section>

  <section class="abstract-container">
    <a id="abstract-links" href="#" class="purple-link link">
      <h3 class="static">Abstract <i id="caret-icon" class="fa fa-caret-down"></i></h3>
    </a>
    <p id="abstract-content" class="abstract-content smalldesc" style="display: none;">${paper.abstract}</p>
  </section>

  <footer id="card-footer" class="card-footer">
    <a href="${paper.pdfLink}" id="download-link" class="pink-link link" title="Right-click and hit Save to download PDF" download target="_blank">Download Paper &nbsp<i class="fa fa-arrow-down"></i></a>
    <button id="reviewButton" class="btn reviewButton" onclick="loadPage('../reviewForm/reviewForm.html','${
      paper.paperID
    }')">Review</button>
  </footer>

</div>`;
}

// async function l(params) {
  

// console.log(await document.body.innerHTML);
// }
// l()