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

  console.log(this.totalSecondsLeft);
  var minLeft = Math.floor(this.totalSecondsLeft / 60);
  var secLeft = this.totalSecondsLeft % 60;
  minLeft < 10 ? document.getElementById("timer-min").innerText = `0${minLeft}`: document.getElementById("timer-min").innerText = minLeft;
  secLeft < 10 ? document.getElementById("timer-sec").innerText = `0${secLeft}` : document.getElementById("timer-sec").innerText = secLeft;
  this.totalSecondsLeft--;

  if(this.totalSecondsLeft === -1){
    this.stopCountdown(startButton, intervalId);
    return 'timer done';
  }
}

  stopCountdown(startButton, intervalId){
    clearInterval(intervalId);
    startButton.innerText = 'Complete';
    alert('timer done!');
  }

  markComplete() {}

  saveToStorage() {
    localStorage.setItem(this.id.toString() ,JSON.stringify(this));
  }
}
