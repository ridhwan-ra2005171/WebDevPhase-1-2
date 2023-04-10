// Commonly used URLS 
let usersUrl = "../../users.json";

// assuming we have the gloabl variable USER_ID
// we set it to 7 for testing sake only
const USER_ID = 12;

// Elements from html
const cardList = document.querySelector("#card-list");
const body = document.querySelector("body-content")


// console.log(cardList);
async function displayPapers(papersUrl) {
  // window.location = "../reviewPaper/reviewPaper.html";
  users  = await (await fetch(usersUrl)).json();
  localStorage.setItem('usersloc',JSON.stringify(users));
  // console.log(localStorage.usersloc);
  // check if papers belonging to this current reviewer are in local storage
  // if (!localStorage.papersloc || (parseInt(localStorage.papersloc[0].pid) !== parseInt(USER_ID))) {
  // if the papers dont exist in the local storage,
  papers = await (await fetch(papersUrl)).json();
  // get only papers that belong to the current reviewer using the global USER_ID
  console.log(papers);
  assignedPapers = papers.filter((paper) =>
    getPaperOfReviewer(paper, USER_ID)
  );
  console.log(assignedPapers);

  localStorage.setItem("assignedPapers", JSON.stringify(assignedPapers));
  assignedPapers = JSON.parse(localStorage.assignedPapers);
  cardList.innerHTML = assignedPapers
    .map((paper) => cardTemplate(paper))
    .join("");

  // } else {
  // recipe array exists in the local storage, retrieve it
  // papersloc = JSON.parse(localStorage.papersloc);
  // // paperTitle.innerHTML
  // cardList.innerHTML = papersloc
  //   .map((p) => recipeToHTML(p))
  //   .join("");
  // }
}

function getPaperOfReviewer(paper, reviewerId) {
  if (paper.reviewers.find((id) => id === reviewerId))
    // console.log(paper.reviewers.find(id => id===7 ));
    return paper;
}

async function loadPage(pageUrl,paperId) {
  localStorage.setItem('paperAtm',String(paperId))
  console.log(localStorage.paperAtm);
  window.location.href = pageUrl;
  // const page = await fetch(pageUrl);
  // body.innerHTML = page.text();


  // const mainContent = document.querySelector("#main-content");
  // const pageHTMLContent = await page.text();
  // mainContent.innerHTML = pageHTMLContent;
}

function cardTemplate(paper) {
  // return `<div class="card">
  //         <a href="#" onclick="loadPage('../reviewPaper/reviewPaper.html',this.id)">
  //             <h4 id="title-cont">${paper.title}</h4>
  //         </a>
  //         <p id="abstract-container" class="abstract-container">
  //           ${paper.abstract}
  //         </p>
  //         <p>${paper.filter()}</p>
  //         <p>dd-MM-yyyy . HH:MM</p>
  //       </div>`;
  return `
  <div class="card">
      <a href="#" onclick="loadPage('../reviewPaper/reviewPaper.html',${paper.pid})">
          <h3 id="paper-title">${paper.title}</h3>
      </a>
      <!-- <p class="abstract-container">Abstract Abstract Abstract Abstract
          Abstract Abstract Abstract Abstract
          Abstract Abstract Abstract Abstract
          Abstract Abstract Abstract Abstract
          Abstract Abstract Abstract Abstract
      </p> -->
      <p id="paper-authors">${paper.authors.filter(auth => {auth}).join(";")}</p>
      <p id="paper-date">${paper.date}</p>
      <!-- <i class="fa fa-"></i> -->
  </div>`;
}
