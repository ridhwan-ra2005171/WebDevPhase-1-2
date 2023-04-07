// Paper Elements
const paperTitle = document.querySelector("#title");
// paperTitle.innerHTML = "Hi";
const paperAuthors = document.querySelector("#authors");
const paperPresenter = document.querySelector("#presenter");
const paperAbstract = document.querySelector("#abstract");
// Form Objects
const evaluation = document.querySelector("#evaluation");
const contribution = document.querySelector("#contribution");
const strengths = document.querySelector("#paper-strengths");
const weakness = document.querySelector("#paper-weakness");
// buttons
const backBtn = document.querySelector("#go-back");
const cancelBtn = document.querySelector("#cancel");
const submitBtn = document.querySelector("#submit");

// Event listeners for buttons
backBtn.addEventListener('click',returnToPage)
cancelBtn.addEventListener('click',cancelReview)

// The event listenr functions
function returnToPage(e) {
    e.preventDefault();
    // swal("Hello world!");

    // window.location.href = "../paperDashboard/paperDashboard.html"; // return back to review paper dashboard
}

function cancelReview(e) {
    // const confirm = confirm("Are you sure you want to cancel?")
    
    let confirmation;
    swal({
        title: "Are you sure you want to cancel?",
        icon: "warning",
        button: "Yes, cancel",
      })
      .then((value) => {console.log(value);});
    ;

    // console.log(confirmation);
    if (confirmation === 1) {
        // console.log('You pressed ok, cancelled:');
    } else {
        console.log('not cancelled');
    }
    // returnToPage(e);
}

