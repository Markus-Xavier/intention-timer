var newActivityForm = document.querySelector("form");
var buttonContainer = document.querySelector("#activity-button-container");
var activeButton;
var studyButton = document.querySelector("#study-button");
var meditateButton = document.querySelector("#meditate-button");
var exerciseButton = document.querySelector("#exercise-button");
var startActivityBtn = document.getElementById("start-button");
var timerView = document.getElementById("timerView");
var timerStartBtn = document.getElementById("timer-start-button");
var createNewFormButton = document.querySelector('#create-new-form-button')
var logActivityBtnContainer = document.querySelector('#log-activity-container');
var logActivityBtn = document.getElementById("log-activity-button");
var noActivitiesLogged = document.getElementById("no-activities-logged");
var newActivity;
var activityArray = [];
var chosenActivity;
var goal;
var minutes;
var seconds;

window.addEventListener('load', displaySavedActivities);
buttonContainer.addEventListener("click", changeButtonStyle);
startActivityBtn.addEventListener("click", checkForm);
createNewFormButton.addEventListener("click", showActivityForm);
logActivityBtn.addEventListener("click", function(){
  newActivity.saveToStorage();
});


function setButtonStyleDefault() {
  studyButton.classList.remove("clickedStudyButton");
  meditateButton.classList.remove("clickedMeditateButton");
  exerciseButton.classList.remove("clickedExerciseButton");
  studyButton.children[0].src = "assets/study.svg";
  meditateButton.children[0].src = "assets/meditate.svg";
  exerciseButton.children[0].src = "assets/exercise.svg";
}

function changeButtonStyle(event) {
  event.preventDefault();
  if (event.target.tagName === "IMG") {
    activeButton = event.target.parentNode;
  } else if (event.target.tagName === "BUTTON") {
    activeButton = event.target;
  }

  setButtonStyleDefault();

  var buttonImg = activeButton.children[0];
  switch (activeButton.id) {
    case "study-button":
      buttonImg.src = "assets/study-active.svg";
      activeButton.classList.add("clickedStudyButton");
      break;
    case "meditate-button":
      buttonImg.src = "assets/meditate-active.svg";
      activeButton.classList.add("clickedMeditateButton");
      break;
    case "exercise-button":
      buttonImg.src = "assets/exercise-active.svg";
      activeButton.classList.add("clickedExerciseButton");

    default:
      break;
  }
}

function checkForm() {
  var isButtonChosen = Boolean(activeButton);
  var isGoalValid = document.getElementById("goal-input").checkValidity();
  var isMinutesValid = document.getElementById("min-input").checkValidity();
  var isSecondsValid = document.getElementById("sec-input").checkValidity();
  if (isButtonChosen === false) {
    alert("Please select an activity");
  }
  if (isButtonChosen && isGoalValid && isMinutesValid && isSecondsValid) {
    displayTimer();
  }
}

function displayTimer() {
  chosenActivity = activeButton.value;
  goal = document.getElementById("goal-input").value;
  minutes = document.getElementById("min-input").value;
  seconds = document.getElementById("sec-input").value;

  newActivityForm.classList.add("hidden");
  newActivityForm.reset();
  timerView.classList.remove("hidden");
  document.getElementById("timer-goal").innerText = '';
  document.getElementById("timer-min").innerText = '';
  document.getElementById("timer-sec").innerText = '';
  logActivityBtnContainer.hidden = true;
  setButtonStyleDefault();

  newActivity = new Activity(chosenActivity, goal, minutes, seconds);
  // activityArray.push(newActivity);

  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  document.querySelector(".left-side-box h1").innerText = "Current Activity";
  document.getElementById("timer-goal").innerText = goal;
  document.getElementById("timer-min").innerText = minutes;
  document.getElementById("timer-sec").innerText = seconds;

  switch (activeButton.id) {
    case "study-button":
      timerStartBtn.setAttribute("style", "border-color:#b3fd78; ");
      break;
    case "meditate-button":
      timerStartBtn.setAttribute("style", "border-color:#c278fd;");
      break;
    case "exercise-button":
      timerStartBtn.setAttribute("style", "border-color:#fd8078;");
    default:
      break;
  }
}

timerStartBtn.addEventListener("click", function () {
  timerStartBtn.innerText = "In Progress";
  timerStartBtn.disabled = true;
  var timer = setInterval(function () {
    newActivity.countdown(timer);
  }, 1000);
});

function showActivityForm() {
  createNewFormButton.hidden = true;
  newActivityForm.classList.remove("hidden");
  timerStartBtn.disabled = false;
  timerStartBtn.innerText = "START";
  document.getElementById("log-activity-button").hidden = true;
}

function displaySavedActivities() {
  for(var i = 0; i < localStorage.length; i++) {
    var savedActivity = JSON.parse(localStorage.getItem(localStorage.key(i)));
    var newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerHTML = `
    <div class="${savedActivity.category}-ind"></div>
    <p class="cardtext"><b>${savedActivity.category}</b></p>
    <p class="cardtext">${savedActivity.minutes} MIN ${savedActivity.seconds} SECONDS</p>
    <p class="cardtext">${savedActivity.description}</p>
    `;
    noActivitiesLogged.hidden = true;
    document.getElementById("record-section").appendChild(newCard);
  }
}
