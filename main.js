var newActivityForm = document.querySelector("form");
var buttonContainer = document.querySelector("#activity-button-container");
var activeButton;
var studyButton = document.querySelector("#study-button");
var meditateButton = document.querySelector("#meditate-button");
var exerciseButton = document.querySelector("#exercise-button");
var startBtn = document.getElementById("start-button");
var newActivity;
var activityArray = [];
var chosenActivity;
var goal;
var minutes;
var seconds;

buttonContainer.addEventListener("click", changeButtonStyle);
startBtn.addEventListener("click", checkForm);

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

  newActivity = new Activity(chosenActivity, goal, minutes, seconds);
  activityArray.push(newActivity);


  var prettyMinutes = minutes < 10 ? `0${minutes}` : minutes; 
  var prettySeconds = seconds < 10 ? `0${seconds}` : seconds;
  document.querySelector(".left-side-box h1").innerText = "Current Activity";
  document.getElementById("new-activity-section").innerHTML = "";
  document.getElementById("new-activity-section").innerHTML = `
    <p id="timer-goal">${goal}</p>
    <div id="timer-div">
      <span id="timer-min">${prettyMinutes}</span> <span>:</span> <span id="timer-sec">${prettySeconds}</span>
    </div>
    <button id="timer-start-button">START</button>
  `;
  var timerStartBtn = document.getElementById("timer-start-button");

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

  timerStartBtn.addEventListener("click", function () {
    timerStartBtn.innerText = 'In Progress'
    timerStartBtn.disabled = true;
    var intervalId = setInterval(function () {
      newActivity.countdown(timerStartBtn, intervalId);
    }, 1000);
    console.log('Interval Id:' ,intervalId);
  });
}
