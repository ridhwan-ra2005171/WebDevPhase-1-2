// Commonly used URLS 
let usersUrl = "../../json/users.json";
// assuming we have the gloabl variable USER_ID
// we set it to 7 for testing sake only
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
  // console.log(papers);
  assignedPapers = papers.filter((paper) =>
    getPaperOfReviewer(paper, USER_ID)
  );
  assignedPapers.forEach(p => console.log(p.authors));

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

  return `
  <div class="card">
      <a href="#" onclick="loadPage('../reviewPaper/reviewPaper.html',${paper.paperID})">
          <h2 id="paper-title">${paper.title}</h2>
      </a>
      
      <section class="abstract-container">
        <a id="abstract-link" href="#" >
          <h3>Abstract <i id="caret-icon" class="fa fa-caret-up"></i></h3>  
        </a>
      </section>
        <p id="abstract-content" class="abstract-content">${paper.abstract}</p>
        <p id="paper-authors">${paper.authors.map(authorID => getAuthorName(authorID)).join(",&nbsp &nbsp")}</p> 

  </div>`;
}


function getAuthorName(authorID) {
  const users = JSON.parse(localStorage.usersloc);
  const foundAuthor = users.find(user=> user.id === authorID)
  return `${foundAuthor.first_name} ${foundAuthor.last_name}`;
}

console.log(getAuthorName(17));