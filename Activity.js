class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category;
    this.description = description;
    this.minutes = parseInt(minutes);
    this.seconds = parseInt(seconds);
    this.completed;
    this.id = Date.now();
    this.distance = this.minutes * 60 + this.seconds;
  }

  countdown(startButton) {
    if(this.distance === -1){
      this.stopCountdown(startButton);
      return 'timer done';
    }
    console.log(this.distance);
    var minLeft = Math.floor(this.distance / 60);
    var secLeft = this.distance % 60;
    minLeft < 10 ? document.getElementById("timer-min").innerText = `0${minLeft}`: document.getElementById("timer-min").innerText = minLeft;
    secLeft < 10 ? document.getElementById("timer-sec").innerText = `0${secLeft}` : document.getElementById("timer-sec").innerText = secLeft;
    this.distance--;
  }

  stopCountdown(startButton){
    clearInterval(1);
    startButton.innerText = 'Complete';
    alert('timer done!');
  }

  markComplete() {}

  saveToStorage() {}
}
