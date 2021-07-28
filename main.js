var newActivityForm = document.querySelector("form");
var threeButtons = document.querySelector("#activity-button-container");
var activeButton;
newActivityForm.addEventListener("click", categoryHandler);

function changeButton(event) {
  event.preventDefault();
  if (activeButton) threeButtons.children.classList.remove("clickedButton");
  activeButton = event.target;
  activeButton.classList.add("clickedButton");
  buttonImg = activeButton.children[0];
  switch (activeButton.id) {
    case "study-button":
      buttonImg.src = "assets/study-active.svg";
      break;
    case "meditate-button":
      buttonImg.src = "assets/meditate-active.svg";
      break;
    case "exercise-button":
      buttonImg.src = "assets/exercise-active.svg";

    default:
      break;
  }
}

function categoryHandler(event) {
  event.preventDefault();

  switch (event.target.id) {
    case "study-button":
      event.target.children[0].src = "assets/study-active.svg";
      activeButton = event.target;

      break;

    case "meditate-button":
      event.target.children[0].src = "assets/meditate-active.svg";
      break;

    case "exercise-button":
      event.target.children[0].src = "assets/exercise-active.svg";

      break;

    case "start-button":
      console.log("start");
      break;

    default:
      break;
  }
}
