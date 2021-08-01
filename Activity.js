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

  countdown() {
    if(this.distance === -1){
      this.stopCountdown();
      return 'timer done'
    }
    console.log(this.distance);
    var minLeft = Math.floor(this.distance / 60);
    var secLeft = this.distance % 60;
    document.getElementById("timer-min").innerText = minLeft;
    document.getElementById("timer-sec").innerText = secLeft;
    this.distance--;
  }

  stopCountdown(){
      clearInterval(1);
      alert('timer done!');
  }

  markComplete() {}

  saveToStorage() {}
}
