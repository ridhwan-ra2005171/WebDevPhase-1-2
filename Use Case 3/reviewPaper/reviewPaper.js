// Imports
const papersUrl = "../../papers.json";
const usersUrl = "../../users.json";

// assuming we have the global variable USER_ID
// we set it to 12 for testing purpose only
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
// console.log(form);

// buttons
const backBtn = document.querySelector("#go-back");
const submitBtn = document.querySelector("#submit");

// Event listeners for buttons
backBtn.addEventListener("click", returnToPrevPage);
form.addEventListener("submit", storeForm);

//load paper
// async function laodPaper() {
//   papers = await (await fetch(papersUrl)).json();
//   users = await (await fetch(usersUrl)).json();

//   // const reviewPaper = papers.find(
//   //   (p) => p.paperID === parseInt(localStorage.paperAtm)
//   // );

//   // // getting authors names
//   // const authObjects = users.filter((o1) =>
//   //   reviewPaper.authors.find((o2) => parseInt(o1.id) === parseInt(o2))
//   // );
//   // let authNames = authObjects.map((author) => {
//   //   return `${author.first_name} ${author.last_name}`;
//   // });

//   //getting presenter names
//   //   const presObjects = users.filter((o1) => parseInt(o1.id) === parseInt(reviewPaper.presenter));
//   //   let presName = presObjects.map((pres) => {
//   //     return `${pres.first_name} ${pres.last_name}`;
//   //   });

//   // changing the HTML accordingly
//   paperTitle.innerHTML = reviewPaper.title;
//   paperAuthors.innerHTML = authNames.join("; ");
//   paperAbstract.innerHTML = reviewPaper.abstract;
// //   paperPresenter.innerHTML = presName;
// }

// laodPaper();


// The event listener functions :::::::::::::::::::::::::::::::::::
// return to previous page

// Alerts using sweet alert ==================================
async function returnToPrevPage(e) {
  e.preventDefault();
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
  const evaluation = document.querySelector('input[name="evaluation"]:checked').value;
  const contribution = document.querySelector('input[name="contribution"]:checked').value;
  const strengths = document.querySelector("#paper-strengths").value;
  const weaknesses = document.querySelector("#paper-weakness").value;

  console.log("Eval: ", evaluation);
  console.log("Cont: ", contribution)

  const reviewedPaper = {
      "reviewerID": USER_ID,
      "evaluation": evaluation,
      "contribution": contribution,
      "strengths": strengths,
      "waknesses": weaknesses
  };

  // store the reviewPaper in the papers.json
  console.log(reviewedPaper);
  const papers = localStorage.papersloc;

  // get the paper ID from local storage
  const paperID = parseInt(JSON.parse(localStorage.paperAtm));
  console.log(paperID);
  console.log(parseInt(paperID));
  
  // find the index inside the review array that exists in paper object

  // Confirmation of review submission
    // let result = await swal({
    //   title: "Your Review has been Submitted Successfully!",
    //   icon: "success",
    //   buttons: "Ok",
    //   closeOnClickOutside: false,
    // });
  
    // if (result === true) {
    //   // location.href = "../paperDashboard/paperDashboard.html";
    // }


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
