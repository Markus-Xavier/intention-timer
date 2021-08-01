class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category;
    this.description = description;
    this.minutes = parseInt(minutes);
    this.seconds = parseInt(seconds);
    this.completed;
    this.id = Date.now();
  }

  countdown() {
    var distance = this.minutes * 60 + this.seconds;
    var minLeft = Math.floor(distance / 60);
    var secLeft = distance % 60;
    document.getElementById("timer-min").innerText = minLeft;
    document.getElementById("timer-sec").innerText = secLeft;
    distance--;
    // console.log(distance);
  }

  markComplete() {}

  saveToStorage() {}
}
