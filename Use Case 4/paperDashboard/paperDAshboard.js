const cardList = document.querySelector("#card-list")
// console.log(cardList);
async function displayPapers() {

  // window.location = "../reviewPaper/reviewPaper.html";
  
    if (!localStorage.papersloc) {
        // if the recipes dont exist in the local storage, create one and set
        // i declared recipes as global variable in line 7
        papersloc  = await (await fetch(papersUrl)).json();
        localStorage.setItem("papersloc", JSON.stringify(papersloc));
        papersloc = JSON.parse(localStorage.papersloc);
        cardList.innerHTML = papersloc
          .map((p) => cardTemplate(p))
          .join("");
      } else {
        // recipe array exists in the local storage, retrieve it
        papersloc = JSON.parse(localStorage.papersloc);
        // paperTitle.innerHTML 
        cardList.innerHTML = papersloc
          .map((p) => recipeToHTML(p))
          .join("");
      }
}

function cardTemplate(paper) {
  return `<div class="card">
          <a href="#" onclick="loadPage('../reviewPaper/reviewPaper.html',this.id)">
              <h4 id="title-cont">${paper.title}</h4>
          </a>
          <p id="abstract-container" class="abstract-container">
            ${paper.abstract}
          </p>
          <p>${paper.filter()}</p>
          <p>dd-MM-yyyy . HH:MM</p>
        </div>`;
}
