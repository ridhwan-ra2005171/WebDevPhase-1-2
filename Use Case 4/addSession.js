
//=========================
//THIS IS JUST TO ADD MORE SESSION INSIDE SCHEDULE
var counter= 1;
async function addMoreSession(){
    counter+=1
    html= '<fieldset id="sessionform1">\
    <legend>Create Sessions</legend>\
    <div class="session-form'+counter+'>\
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
    </div>\
  </fieldset>\<br />\<br />\
    '
   
    var form = await document.getElementById('schedForm')
    form.innerHTML+=html;
    console.log(counter);
}