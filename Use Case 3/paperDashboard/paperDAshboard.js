// Commonly used URLS
let usersUrl = "../../json/users.json";
// assuming we have the gloabl variable USER_ID
// we set it to 12 for testing sake only
const USER_ID = 12;
// global variables
// const users = [];
// Elements from html
const cardList = document.querySelector("#card-list");
const body = document.querySelector("body-content");
const abstractLinks = document.querySelectorAll("#abstract-link");

// console.log(abstractLinks);
// abstractLinks.forEach(e => e.addEventListener('click', function test(event) {

// console.log('box clicked', e);
// e.setAttribute('style', 'color: yellow;')}));

// abstractContents.forEach(element => {
// console.log(element);
// if (element.style.display === "none") {
// element.style.display = "block";
// // caretIcon.className = "fa fa-caret-up";
// } else {
// element.style.display = "none";
// // caretIcon.className = "fa fa-caret-down";
// }
// });

// event listeners
// abstractLinks.forEach(link => link.addEventListener('click',showAbstract));

// console.log(cardList);
async function displayPapers(papersUrl) {
  users = await (await fetch(usersUrl)).json();
  localStorage.setItem("usersloc", JSON.stringify(users));

  // check if papers belonging to this current reviewer are in local storage
  // if (!localStorage.papersloc || (parseInt(localStorage.papersloc[0].pid) !== parseInt(USER_ID))) {
  if (!localStorage.papersloc) {
    console.log("The papers are nt in lcoal storge");
    // if the papers dont exist in the local storage,
    papers = await (await fetch(papersUrl)).json(); // fetch the papers
    localStorage.setItem("papersloc", JSON.stringify(papers)); // add papers to local storage

    console.log("papers", papers);

    // get only papers that belong to the current reviewer using the global USER_ID
    // console.log(papers);
    assignedPapers = papers.filter((paper) =>
      getPaperOfReviewer(paper, USER_ID)
    );
    // assignedPapers.forEach((p) => console.log(p.authors));

    localStorage.setItem("assignedPapers", JSON.stringify(assignedPapers));
    assignedPapers = JSON.parse(localStorage.assignedPapers);
    cardList.innerHTML = assignedPapers
      .map((paper) => cardTemplate(paper))
      .join("");
  } else {
    // papersloc array exists in the local storage, retrieve it
    assignedPapers = JSON.parse(await localStorage.assignedPapers);
    cardList.innerHTML = assignedPapers
      .map((paper) => cardTemplate(paper))
      .join("");
  }
}

function getPaperOfReviewer(paper, reviewerId) {
  if (paper.review.find((elem) => elem.reviewerID === reviewerId)) return paper;
}

async function loadPage(pageUrl, paperId) {
  // console.log("hiiiii  ",paperId);
  localStorage.setItem("paperAtm", JSON.stringify(paperId));

  console.log(localStorage.paperAtm);
  window.location.href = pageUrl;
  const page = await fetch(pageUrl);
  body.innerHTML = page.text();

  const mainContent = document.querySelector("#main-content");
  const pageHTMLContent = await page.text();
  mainContent.innerHTML = pageHTMLContent;
}

function showAbstract(e) {
  // e.preventdefault();
  const abstractContents = document.querySelectorAll("#abstract-content");
  // const caretIcons = document.querySelectorAll("#caret-icon");

  // abstractContents.forEach(element => {
  // console.log(element);
  // if (element.style.display === "none") {
  // element.style.display = "block";
  // // caretIcon.className = "fa fa-caret-up";
  // } else {
  // element.style.display = "none";
  // // caretIcon.className = "fa fa-caret-down";
  // }
  // });
}

// function to get names of authors using their IDs. This function is used in cardTemplate()
function getAuthorName(authorID) {
  const users = JSON.parse(localStorage.usersloc);
  const foundAuthor = users.find((user) => user.id === authorID);
  return `${foundAuthor.first_name} ${foundAuthor.last_name}`;
}

// HTML for the paper card
function cardTemplate(paper) {

  return `
<div class="card">
  <a href="#"  class="link">
    <h2 id="paper-title">${paper.title}</h2>
  </a>

  <section class="authors-container">
    <h3>Authors:</h3>
    <p id="paper-authors">
      ${paper.authors
        .map((authorID) => getAuthorName(authorID))
        .join(",&nbsp &nbsp")}</p>
  </section>

  <section class="abstract-container">
    <a id="abstract-link" href="#" class="link">
      <h3>Abstract <i id="caret-icon" class="fa fa-caret-up"></i></h3>
    </a>
    <p id="abstract-content" class="abstract-content">${paper.abstract}</p>
  </section>
  <footer id="card-footer" class="card-footer">
    <a id="download-link" class="download-link link">Download Paper &nbsp<i class="fa fa-arrow-down"></i></a>
    <button id="reviewButton" class="btn reviewButton" onclick="loadPage('../reviewPaper/reviewPaper.html','${paper.paperID}')">Review</button>
  </footer>
</div>`;
}
