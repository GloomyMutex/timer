class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    // Storing a reference to arguments in case we need to work with them in the future
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    // Listens for the start button to be clicked since constructed
    // As a regular function the value of `this` would be equal to the button (don't want)
    // As an arrow function `this` is called from the constructor which makes it refer to the class instance (want)
    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }

  // Uses an advanced rule of JS called class property syntax (behind the scenes this arrow function is actually in the constructor)
  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    // Running manually first so the timer starts immediatly instead of being delayed by the interval
    this.tick();
    // In order to share information across methods it should be assigned as an instance variable
    this.interval = setInterval(this.tick, 20);
  };

  pause = () => {
    clearInterval(this.interval);
  };

  tick = () => {
    // The getter function acts as an instance variable so that is why you don't need parenthesis (automatically invoked)
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      // The setter function acts as an instance variable and whatever is assigned to it is automatically provided as the argument
      this.timeRemaining = this.timeRemaining - 0.02; // Matches up with the interval of 20 milliseconds
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };

  // JS class getter function
  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  // JS class setter function
  set timeRemaining(time) {
    // Rounded to 2 decimal places
    this.durationInput.value = time.toFixed(2);
  }
}
