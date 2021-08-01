var leftBox = document.querySelector(".left-side-box");
var newActivityForm = document.querySelector("form");
var buttonContainer = document.querySelector("#activity-button-container");
var activeButton;
var studyButton = document.querySelector("#study-button");
var meditateButton = document.querySelector("#meditate-button");
var exerciseButton = document.querySelector("#exercise-button");
var startBtn = document.getElementById("start-button");

buttonContainer.addEventListener("click", changeButtonStyle);
startBtn.addEventListener("click", function () {
  checkForm();
  displayTimer();
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
  var chosenActivity = activeButton.value;
  var goal = document.getElementById("goal-input").value;
  var minutes = document.getElementById("min-input").value;
  var seconds = document.getElementById("sec-input").value;

  var newActivity = new Activity(chosenActivity, goal, minutes, seconds);

  document.querySelector(".left-side-box h1").innerText = "Current Activity";
  document.getElementById("new-activity-section").innerHTML = "";
  document.getElementById("new-activity-section").innerHTML = `
    <p id="timer-goal">${goal}</p>
    <div id="timer-div">
      <span id="timer-min">${minutes}</span> <span>:</span> <span id="timer-sec">${seconds}</span>
    </div>
    <button id="timer-start-button"> START </button>
  `;
  var startBtn = document.getElementById("timer-start-button");

  switch (activeButton.id) {
    case "study-button":
      startBtn.setAttribute("style", "border-color:#b3fd78; ");
      break;
    case "meditate-button":
      startBtn.setAttribute("style", "border-color:#c278fd;");
      console.log("meditate color applied");
      break;
    case "exercise-button":
      startBtn.setAttribute("style", "border-color:#fd8078;");
      console.log("study color applied");
    default:
      break;
  }
}
