// Commonly used URLS 
let usersUrl = "../../json/users.json";
// assuming we have the gloabl variable USER_ID
// we set it to 7 for testing sake only
const USER_ID = 7;

// Elements from html
const cardList = document.querySelector("#card-list");
const body = document.querySelector("body-content");
const abstractLinks = document.querySelectorAll("#abstract-link");

console.log(abstractLinks);
abstractLinks.forEach(e => e.addEventListener('click', function test(event) {

  console.log('box clicked', e);
  e.setAttribute('style', 'color: yellow;')}));

// abstractContents.forEach(element => {
//       console.log(element);
//     if (element.style.display === "none") {
//       element.style.display = "block";
//       // caretIcon.className = "fa fa-caret-up";
//     } else {
//       element.style.display = "none";
//       // caretIcon.className = "fa fa-caret-down";
//     }
//   });


// event listeners
// abstractLinks.forEach(link => link.addEventListener('click',showAbstract));

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
  // cardList.innerHTML = assignedPapers
  //   .map((paper) => cardTemplate(paper))
  //   .join("");

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
  if (paper.review.find((elem) => elem.reviewerID === reviewerId))
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

 function showAbstract(e) {
  // e.preventdefault();
  const abstractContents =  document.querySelectorAll("#abstract-content");
  // const caretIcons =  document.querySelectorAll("#caret-icon");

//   abstractContents.forEach(element => {
//     console.log(element);
//   if (element.style.display === "none") {
//     element.style.display = "block";
//     // caretIcon.className = "fa fa-caret-up";
//   } else {
//     element.style.display = "none";
//     // caretIcon.className = "fa fa-caret-down";
//   }
// });
}

//This is for card template html replacement
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
          <h2 id="paper-title">${paper.title}</h2>
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
