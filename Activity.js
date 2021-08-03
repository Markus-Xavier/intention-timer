class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category;
    this.description = description;
    this.minutes = parseInt(minutes);
    this.seconds = parseInt(seconds);
    this.completed;
    this.id = Date.now();
    this.totalSecondsLeft = this.minutes * 60 + this.seconds;
  }

  countdown(startButton, intervalId) {
    console.log("seconds left", this.totalSecondsLeft);
    var minLeft = Math.floor(this.totalSecondsLeft / 60);
    var secLeft = this.totalSecondsLeft % 60;
    minLeft < 10
      ? (document.getElementById("timer-min").innerText = `0${minLeft}`)
      : (document.getElementById("timer-min").innerText = minLeft);
    secLeft < 10
      ? (document.getElementById("timer-sec").innerText = `0${secLeft}`)
      : (document.getElementById("timer-sec").innerText = secLeft);
    this.totalSecondsLeft--;

    if (this.totalSecondsLeft === -1) {
      this.stopCountdown(startButton, intervalId);
      return "Timer done";
    }
  }

  stopCountdown(startButton, intervalId) {
    clearInterval(intervalId);
    startButton.innerText = "COMPLETE!";
    alert("Timer done!");
    this.markComplete();
  }

  markComplete() {
    this.completed = true;
  }

  saveToStorage() {
    console.log("im working");
    localStorage.setItem(this.id.toString(), JSON.stringify(this));
    var newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerHTML = `
    <div class="indicator"></div>
    <p class="cardtext"><b>${this.category}</b></p>
    <p class="cardtext">${this.minutes} MIN ${this.seconds} SECONDS</p>
    <p class="cardtext">${this.description}</p>
    `;
    document.getElementById("record-section").innerHTML = "";
    document.getElementById("record-section").appendChild(newCard);

    console.log(this.category);
    switch (this.category) {
      case "study":
        document.querySelector(".indicator").classList.add("study-ind");
        break;
      case "meditate":
        document.querySelector(".indicator").classList.add("meditate-ind");
        break;
      case "study":
        document.querySelector(".indicator").classList.add("exercise-ind");
        break;

      default:
        break;
    }
  }
}
