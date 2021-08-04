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

  countdown(timer) {
    this.totalSecondsLeft--;
    console.log("seconds left", this.totalSecondsLeft);
    // console.log("Interval Id:", intervalId);
    var minLeft = Math.floor(this.totalSecondsLeft / 60);
    var secLeft = this.totalSecondsLeft % 60;
    minLeft < 10
      ? (document.getElementById("timer-min").innerText = `0${minLeft}`)
      : (document.getElementById("timer-min").innerText = minLeft);
    secLeft < 10
      ? (document.getElementById("timer-sec").innerText = `0${secLeft}`)
      : (document.getElementById("timer-sec").innerText = secLeft);
    if (this.totalSecondsLeft === 0) {
      clearInterval(timer);
      document.getElementById('timer-div').innerText = `Well done!`
      logActivityBtnContainer.hidden = false;
      timerStartBtn.innerText = "COMPLETE!";
      this.markComplete();
    }
  }

  markComplete() {
    this.completed = true;
    
  }

  saveToStorage() {
    console.log(this.category);
    timerView.classList.add("hidden");
    createNewFormButton.hidden = false;
    localStorage.setItem(this.id.toString(), JSON.stringify(this));
    var newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerHTML = `
    <div class="${this.category}-ind"></div>
    <p class="cardtext"><b>${this.category}</b></p>
    <p class="cardtext">${this.minutes} MIN ${this.seconds} SECONDS</p>
    <p class="cardtext">${this.description}</p>
    `;
    noActivitiesLogged.hidden = true;
    document.getElementById("record-section").appendChild(newCard);
  }
}