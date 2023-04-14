
var counter= 1;
async function addMoreSession(){
    counter+=1
    html= '<fieldset id="sessionform'+counter+'" class="sessionform1">\
    <legend>Create Sessions</legend>\
        <label>Select Paper:</label>\
      <select name="paper'+counter+'" id="paper" onchange="">\
        <option value="" selected disabled>-Select Paper-</option>\
      </select>\
      <br />\
      <label>Select Presenter:</label>\
      <select name="presenter'+counter+'" id="presenter" onchange="">\
        <option value="" selected disabled>-Select Presenter-</option>\
      </select>\
      <br />\
      <label>Select Location:</label>\
      <select\
        name="location'+counter+'"\
        id="location"\
        aria-placeholder="Hello"\
        onchange=""\
      >\
        <option value="" selected disabled>-Select Presenter-</option>\
      </select>\
      <br />\
      <br />\
      <div class="timeform">\
        <label for="fromTime"\
          >Start Time: <input type="time" name="fromTime'+counter+'" id="fromTime"\
        /></label>\
        <label for="endTime"\
          >End Time: <input type="time" name="endTime'+counter+'" id="endTime" />\
        </label>\
      </div>\
      <input \
            id="deleteButton-'+counter+'" \
            type="button" class="btn submit-btn DeleteAuthorBt" onclick="deleteSession('+counter+')" name="deleteSessBtn" value="Remove Session">\
    </div>\
  </fieldset>\
  <br />\
    '
   
    var form = await document.getElementById('schedForm')
    form.innerHTML+=html;
    console.log(counter);
}


function deleteSession(sessionNumber) {
  console.log("deleteSession called", sessionNumber); //the ID works but the innerHTML doesnt
  // const currentSession = Array.from(document.querySelectorAll('#sessionform1'))
  const currentSession = document.getElementsByClassName('sessionform1')
  console.log(currentSession.length);
  console.log(currentSession);

  //Since a schedule can't have 0 sessions
  if (currentSession.length>1) {
    console.log('aaa');
      const toDeleteSession = currentSession.filter(author=>author.id==(sessionNumber).toString())
      console.log('YES: ',toDeleteSession);
      // toDeleteSession[0].innerHTML=''
  }
  else{
      console.log("NOP");
  }
}