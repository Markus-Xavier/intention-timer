var newActivityForm = document.querySelector("form");
var buttonContainer = document.querySelector("#activity-button-container");
var activeButton;
var studyButton = document.querySelector("#study-button");
var meditateButton = document.querySelector("#meditate-button");
var exerciseButton = document.querySelector("#exercise-button");
var startBtn = document.getElementById("start-button");

buttonContainer.addEventListener("click", changeButtonStyle);
startBtn.addEventListener("click", submitForm);

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

function createNewActivity() {
  if (activeButton === undefined) {
    alert("Please select an activity category");
  }
  var chosenActivity = activeButton.value;
  var goal = document.getElementById("accomplish-goal").value;
  var minutes = document.getElementById("minutes".value);
  var seconds = document.getElementById("seconds").value;

  var newActivity = new Activity(chosenActivity, goal, minutes, seconds);
  console.log("💎 ~ createNewActivity ~ newActivity", newActivity);
}

function submitForm(event) {
  event.preventDefault;
  createNewActivity();
}
